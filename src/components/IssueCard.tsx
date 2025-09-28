import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Calendar, Camera } from "lucide-react";

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "pending" | "in-progress" | "resolved";
  createdAt: string;
  imageUrl?: string;
}

interface IssueCardProps {
  issue: Issue;
}

const getStatusColor = (status: Issue["status"]) => {
  switch (status) {
    case "pending":
      return "bg-pending text-pending-foreground";
    case "in-progress":
      return "bg-in-progress text-in-progress-foreground";
    case "resolved":
      return "bg-resolved text-resolved-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: Issue["status"]) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "in-progress":
      return "In Progress";
    case "resolved":
      return "Resolved";
    default:
      return "Unknown";
  }
};

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <Card className="group hover:shadow-professional-lg transition-all duration-300 border-border bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-foreground leading-tight">
            {issue.title}
          </h3>
          <Badge className={`${getStatusColor(issue.status)} ml-2 flex-shrink-0`}>
            {getStatusLabel(issue.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image if available */}
        {issue.imageUrl && (
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <img
              src={issue.imageUrl}
              alt={`Issue: ${issue.title}`}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1">
              <Camera className="w-4 h-4 text-foreground" />
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {issue.description}
        </p>

        {/* Location and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;