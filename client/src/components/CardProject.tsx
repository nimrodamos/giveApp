import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Slider } from "@/components/ui/slider";

const CardProject = () => {
  return (
    <>
      <Card className="h-40">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full"
              aria-label="Money Collected"
              disabled
            ></Slider>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full"></CardContent>
      </Card>
    </>
  );
};

export default CardProject;
