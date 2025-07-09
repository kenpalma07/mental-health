import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Pencil, UserPlus } from 'lucide-react';
import { useState } from 'react';

type Props = {
    mother_firstname: string;
    onChange: (
        field: | 'mot_fname', value: string,
    ) => void;
    errors?: {
        mot_fname?: string;
    }
}

export function ParentsInformation({ mother_firstname, onChange, errors }: Props) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
            
        </div>
    );
}