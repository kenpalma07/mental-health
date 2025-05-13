import { Textarea } from '@/components/ui/textarea';
import React, { useEffect } from 'react';

interface Props {
    data: {
        assessment_physical_health: string;
        management_physical_health: string;
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            assessment_physical_health: string;
            management_physical_health: string;
        }>
    >;
    errors?: {
        assessment_physical_health?: string;
        management_physical_health?: string;
    };
}

const AssessPhyHealth: React.FC<Props> = ({ data, setData, errors = {} }) => {
    useEffect(() => {
        // console.log('AssessPhyHealth data:', data);
    }, [data]);

    return (
        <div className="mt-2 w-full overflow-hidden rounded-lg border">
            <div className="flex w-full items-center bg-blue-500 px-4 py-3">
                <h6 className="w-full text-lg font-semibold text-white">
                    I. Assess Physical Health
                    <span className="text-sm text-white italic"> (refer to mhGAP-IG version 2.0 p. 8)</span>
                </h6>
            </div>

            <div className="bg-gray-48 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label htmlFor="assessment_physical_health" className="mb-1 text-sm font-medium text-gray-600">
                            Assessment of Physical Health
                        </label>
                        <Textarea
                            id="assessment_physical_health"
                            value={data.assessment_physical_health}
                            onChange={(e) => setData((prev) => ({ ...prev, assessment_physical_health: e.target.value }))}
                            rows={6}
                            className={`w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${errors.assessment_physical_health ? 'border-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="Enter assessment..."
                        />
                        {errors.assessment_physical_health && (
                            <span className="mt-1 text-xs text-red-500">{errors.assessment_physical_health}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="management_physical_health" className="mb-1 text-sm font-medium text-gray-600">
                            Management of Physical Health
                        </label>
                        <Textarea
                            id="management_physical_health"
                            value={data.management_physical_health}
                            onChange={(e) => setData((prev) => ({ ...prev, management_physical_health: e.target.value }))}
                            rows={6}
                            className={`w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${errors.management_physical_health ? 'border-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="Enter management notes..."
                        />
                        {errors.management_physical_health && (
                            <span className="mt-1 text-xs text-red-500">{errors.management_physical_health}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessPhyHealth;
