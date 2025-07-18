import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';

export default function PhilHealthInfo() {
    return (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <div className="space-y-3">
                <div className="flex items-center gap-1">
                    <Pencil className="h-4 w-4 text-green-600" />
                    <h2 className="text-md font-semibold">PHILHEALTH INFO</h2>
                </div>
                <hr />

                {/* Philhealth Member */}
                <div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="phic_member" className="w-49 text-sm font-medium text-red-500">
                            Philhealth Member?:
                        </Label>

                        <label className="flex items-center gap-1 text-sm text-red-500">
                            <input
                                type="radio"
                                name="phic_member"
                                value="N"
                                className="accent-black-600"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
