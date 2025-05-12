import { Textarea } from '@/components/ui/textarea';
import React, { useEffect } from 'react';

interface Props {
    data: {
        assessment: string;
        management: string;
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            assessment: string;
            management: string;
        }>
    >;
    errors?: {
        assessment?: string;
        management?: string;
    };
}

const AssessPhyHealth: React.FC<Props> = ({ data, setData, errors = {} }) => {
    useEffect(() => {
        console.log('AssessPhyHealth data:', data);
    }, [data]);

    return (
        <div className="mt-2 w-full overflow-hidden rounded-lg border">
            <div className="flex w-full items-center bg-blue-500 px-4 py-3">
                <h6 className="w-full text-lg font-semibold text-white">
                    I. Assess Physical Health
                    <span className="text-sm text-white italic"> (refer to mhGAP-IG version 2.0p. 8)</span>
                </h6>
            </div>

            <div className="bg-gray-48 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label htmlFor="assessment" className="mb-1 text-sm font-medium text-gray-600">
                            Assessment of Physical Health
                        </label>
                        <Textarea
                            id="assessment"
                            value={data.assessment}
                            onChange={(e) => setData((prev) => ({ ...prev, assessment: e.target.value }))}
                            rows={6}
                            className={`w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${errors.assessment ? 'border-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="Enter assessment..."
                        />
                        {errors.assessment && <span className="mt-1 text-xs text-red-500">{errors.assessment}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="management" className="mb-1 text-sm font-medium text-gray-600">
                            Management of Physical Health
                        </label>
                        <Textarea
                            id="management"
                            value={data.management}
                            onChange={(e) => setData((prev) => ({ ...prev, management: e.target.value }))}
                            rows={6}
                            className={`w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${errors.management ? 'border-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="Enter management notes..."
                        />
                        {errors.management && <span className="mt-1 text-xs text-red-500">{errors.management}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessPhyHealth;
