import React from 'react';
import { User, Clipboard, Heart, Calendar, Stethoscope } from "lucide-react";
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

const steps = [
  { label: "Physical Health", icon: User },
  { label: "Conduct Assessment", icon: Clipboard },
  { label: "Manage Assessment", icon: Heart },
  { label: "Diagnosis and Medicine", icon: Stethoscope },
  { label: "Schedule Next Visit", icon: Calendar },
  { label: "Treatment Plan", icon: Stethoscope },
];

interface StepperProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="flex items-center relative w-full py-4">
      <div className="absolute top-1/2 left-0 right-0 border-t-2 border-gray-300 z-0" />
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center flex-1 relative">
          <Button
            type="button"
            onClick={() => setCurrentStep(index)}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-full border-4 transition-all ease-in-out duration-200",
              currentStep === index
                ? "bg-black text-white border-black" // Active step styles
                : currentStep > index
                ? "bg-gray-400 text-white border-gray-400" // Completed steps are gray
                : "bg-white text-gray-400 border-gray-300 hover:bg-gray-100 hover:text-black",
              "z-10"
            )}
          >
            <step.icon
              size={24}
              className={cn(
                currentStep === index
                  ? "text-white"
                  : currentStep > index
                  ? "text-gray-500"
                  : "text-gray-400",
                "transition-all duration-200 hover:text-black"
              )}
            />
          </Button>
          <span className={cn(
            "mt-1 text-xs text-center",
            currentStep === index ? "text-black font-semibold" : "text-gray-400"
          )}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
