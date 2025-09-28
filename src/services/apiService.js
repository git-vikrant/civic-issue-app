// src/services/apiService.js

const BASE_URL = 'http://localhost:8080/api';

class ApiService {
    constructor(token, setTokenCallback, setCurrentUserCallback) {
        this.token = token;
        this.setToken = setTokenCallback;
        this.setCurrentUser = setCurrentUserCallback;
    }

    clearToken = () => {
        this.token = null;
    }

    /**
     * Generic wrapper for making authenticated API calls.
     * Handles setting the Authorization header and unauthorized errors (401).
     */
    async authFetch(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            // Log out user if token is invalid or expired
            this.setToken(null);
            this.setCurrentUser(null);
            localStorage.removeItem('jwtToken');
            throw new Error("Unauthorized or session expired. Please log in again.");
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `API call failed with status: ${response.status}`);
        }

        return response.status === 204 ? null : response.json();
    }

    // --- User/Auth Endpoints ---

    async login(usernameOrEmail, password) {
        const payload = { usernameOrEmail, password };
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Login failed. Invalid credentials.');
        }

        const data = await response.json();
        const token = data.token;
        this.token = token;
        
        // After successful login, return the token
        return token;
    }

    // Note: The backend requires UserRegistrationDTO which includes username, email, and password
    async register(username, email, password) {
        const dto = { username, email, password };
        return this.authFetch('/users/register', {
            method: 'POST',
            body: JSON.stringify(dto),
            // No token needed for register, but authFetch handles headers
        });
    }

    async fetchCurrentUser() {
        // GET /api/users/me
        return this.authFetch('/users/me', { method: 'GET' });
    }
}

export default ApiService;