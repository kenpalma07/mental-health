import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Clipboard, Heart, Stethoscope, User } from 'lucide-react';
import React from 'react';

const steps = [
    { label: 'Physical Health', icon: User },
    { label: 'Conduct Assessment', icon: Clipboard },
    { label: 'Manage Assessment', icon: Heart },
    { label: 'Diagnosis and Medicine', icon: Stethoscope },
    { label: 'Schedule Next Visit', icon: Calendar },
    { label: 'Treatment Plan', icon: Stethoscope },
];

interface StepperProps {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, setCurrentStep }) => {
    return (
        <div className="relative flex w-full items-center py-4">
            <div className="absolute top-1/2 right-0 left-0 z-0 border-t-2 border-gray-300" />
            {steps.map((step, index) => (
                <div key={index} className="relative flex flex-1 flex-col items-center">
                    <Button
                        type="button"
                        onClick={() => setCurrentStep(index)}
                        className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-200 ease-in-out',
                            currentStep === index
                                ? 'border-black bg-black text-white' // Active step styles
                                : currentStep > index
                                  ? 'border-gray-400 bg-gray-400 text-white' // Completed steps are gray
                                  : 'border-gray-300 bg-white text-gray-400 hover:bg-gray-100 hover:text-black',
                            'z-10',
                        )}
                    >
                        <step.icon
                            size={24}
                            className={cn(
                                currentStep === index ? 'text-white' : currentStep > index ? 'text-gray-500' : 'text-gray-400',
                                'transition-all duration-200 hover:text-black',
                            )}
                        />
                    </Button>
                    <span className={cn('mt-1 text-center text-xs', currentStep === index ? 'font-semibold text-black' : 'text-gray-400')}>
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
