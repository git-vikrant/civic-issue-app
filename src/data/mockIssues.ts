import { Issue } from "@/components/IssueCard";

export const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Broken streetlight on Main Street",
    description: "The streetlight at the intersection of Main Street and Oak Avenue has been out for over a week, creating a safety hazard for pedestrians and drivers during nighttime hours.",
    location: "Main Street & Oak Avenue",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2", 
    title: "Large pothole causing damage to vehicles",
    description: "A significant pothole has formed on Elm Street near the school zone. Multiple vehicles have reported tire damage from this road hazard.",
    location: "Elm Street, near Elementary School",
    status: "in-progress",
    createdAt: "2024-01-12T14:15:00Z",
  },
  {
    id: "3",
    title: "Park playground equipment needs repair",
    description: "The swing set at Riverside Park has broken chains and the slide has a crack that could be dangerous for children. Regular maintenance is needed.",
    location: "Riverside Park - Playground Area", 
    status: "resolved",
    createdAt: "2024-01-10T09:20:00Z",
  },
  {
    id: "4",
    title: "Graffiti on public building wall",
    description: "Vandalism has occurred on the side wall of the community center. The graffiti is visible from the main road and detracts from the neighborhood appearance.",
    location: "Community Center - East Wall",
    status: "pending",
    createdAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "5",
    title: "Clogged storm drain causing flooding",
    description: "The storm drain at the corner of Pine and Cedar is completely blocked with debris, causing water to pool during rain and creating flooding issues.",
    location: "Pine Street & Cedar Avenue",
    status: "in-progress", 
    createdAt: "2024-01-13T11:00:00Z",
  },
  {
    id: "6",
    title: "Overgrown vegetation blocking sidewalk",
    description: "Bushes and trees along Maple Street have grown onto the sidewalk, forcing pedestrians to walk in the street. Trimming is urgently needed.",
    location: "Maple Street, between 1st and 2nd Avenue",
    status: "pending",
    createdAt: "2024-01-16T08:30:00Z",
  }
];