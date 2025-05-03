import React from 'react';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  data: {
    assessment: string;
    management: string;
  };
  setData: React.Dispatch<React.SetStateAction<{
    assessment: string;
    management: string;
  }>>;
};

const AssessPhyHealth: React.FC<Props> = ({ data, setData }) => {
  return (
    <div className="rounded-lg border overflow-hidden mt-2 w-full">
      {/* Header */}
      <div className="bg-blue-500 px-4 py-3 flex w-full items-center">
        <h6 className="text-lg font-semibold text-white w-full">
          I. Assess Physical Health
          <span className="text-sm italic text-white"> (refer to mhGAP-IG version 2.0p. 8)</span>
        </h6>
      </div>

      {/* Grid layout */}
      <div className="bg-gray-48 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="assessment" className="text-sm font-medium text-gray-600 mb-1">
              Assessment of Physical Health
            </label>
            <Textarea
              id="assessment"
              value={data.assessment}
              onChange={(e) =>
                setData(prev => ({ ...prev, assessment: e.target.value }))
              }
              rows={6}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter assessment..."
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="management" className="text-sm font-medium text-gray-600 mb-1">
              Management of Physical Health
            </label>
            <Textarea
              id="management"
              value={data.management}
              onChange={(e) =>
                setData(prev => ({ ...prev, management: e.target.value }))
              }
              rows={6}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter management notes..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessPhyHealth;
