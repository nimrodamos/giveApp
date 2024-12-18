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
  const { title, description, current_amount, goal } = project;
  return (
    <Card className="space-y-4 h-[300px] flex flex-col justify-between">
      <CardHeader className="flex gap-6">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between space-y-2">
        <Slider
          defaultValue={[0]}
          value={[current_amount]}
          max={goal}
          step={1}
          className="w-full h-4"
          aria-label="Money Collected"
          disabled
          inverted
        ></Slider>
        <div className="text-lg flex flex-row-reverse justify-between">
          <span className="font-semibold">₪{current_amount}</span>
          <span className="font-semibold">₪{goal}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProject;
