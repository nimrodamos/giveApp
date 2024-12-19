import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Slider } from "@/components/ui/slider";
import { Project } from "@/types/projectTypes";
import React from "react";

interface CardObjectProps {
  project: Project;
}

const CardProject: React.FC<CardObjectProps> = ({ project }) => {
  const { title, description, image, current_amount, goal } = project;

  // חישוב אחוזים עם בדיקה למניעת NaN
  const percentage =
    goal > 0 ? ((current_amount / goal) * 100).toFixed(0) : "לא זמין";

  return (
    <Card
      className="space-y-4 flex flex-col justify-between h-[520px] motion-preset-expand 
             hover:scale-105 hover:shadow-lg transition-transform duration-300 bg-gradient-to-b from-background to-card border border-border rounded-xl overflow-hidden"
    >
      {/* Header */}
      <CardHeader className="relative">
        <div className="relative w-full h-[200px] overflow-hidden">
          <img
            src={image || "https://via.placeholder.com/600x400"}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
            alt="project image"
          />
        </div>
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full shadow-lg">
          {percentage !== "לא זמין" ? `${percentage}% גויס` : percentage}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col justify-between space-y-4 p-4">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </div>
        <div className="space-y-2">
          <Slider
            value={[current_amount || 0]}
            max={goal || 1}
            className="w-full h-4 bg-muted rounded-full"
            aria-label="Money Collected"
            disabled
            inverted
            asChild
          />
          <div className="flex justify-between text-sm font-semibold">
            <span>₪{current_amount}</span>
            <span>₪{goal}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProject;
