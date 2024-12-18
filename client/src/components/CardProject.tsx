import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Slider } from "@/components/ui/slider";
import { Project } from "@/types/projectTypes";
import React, { useState } from "react";

interface CardObjectProps {
  project: Project;
}

const CardProject: React.FC<CardObjectProps> = ({ project }) => {
  const { title, description, image, current_amount, goal } = project;

  // State to track the slider value
  const [sliderValue, setSliderValue] = useState<number[]>([current_amount]);

  // Calculate the percentage of the slider
  const percentage = ((sliderValue[0] / goal) * 100).toFixed(0);

  return (
    <Card className="space-y-4 flex flex-col justify-between">
      <CardHeader className="flex gap-6 items-center">
        <div className="w-full h-[200px] overflow-hidden">
          <img
            src={image}
            className="object-cover w-full h-full"
            alt="project image"
          />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between space-y-2">
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          max={goal}
          step={1}
          className="w-full h-4"
          aria-label="Money Collected"
          disabled
          inverted
          asChild
        />
        <div className="text-lg flex justify-between">
          <span className="font-semibold">₪{current_amount}</span>
          <span className="font-semibold">₪{goal}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProject;
