import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const categories = [
  {
    title: '1. Presenting complaint',
    groups: [
      {
        label: 'Depression',
        items: [
          'Low energy, fatigue, sleep problems',
          'Anxiety',
          'Persistent sadness',
          'Loss of interest',
          'Act of self-harm',
        ],
      },
      {
        label: 'Psychosis',
        items: [
          'Mark behavioral changes',
          'Agitated, aggressive behavior',
          'Hearing voices or seeing things',
          'Lack of realization',
        ],
      },
      {
        label: 'Dementia',
        items: [
          'Severe forgetfulness',
          'Loss of emotional control',
          'Apathy',
        ],
      },
      {
        label: 'Substance Abuse',
        items: [
          'Smell of alcohol, sedated, slurred speech',
          'Deterioration of social function',
          'Signs of chronic liver disease',
          'Problems with balance, working, coordinated movements',
        ],
      },
    ],
  },
  {
    title: '2. General Health History',
    groups: [
      {
        label: 'General Health History',
        items: [
          'Diabetes Mellitus',
          'Hypertension',
          'Asthma',
          'Heart Disease',
          'Thyroid problem',
          'Arthritis',
          'Cancer',
          'Others',
        ],
      },
    ],
  },
  {
    title: '3. MNS History',
    groups: [
      {
        label: 'MNS History',
        items: [
          'Depression',
          'Anxiety Disorder',
          'Bipolar',
          'Psychosis',
          'Alcohol Use',
          'Others',
        ],
      },
    ],
  },
  {
    title: '4. Family History of MNS condition',
    groups: [
      {
        label: 'Family History of MNS condition',
        items: [
          'Depression',
          'Anxiety',
          'Bipolar',
          'Psychosis',
        ],
      },
    ],
  },
];

type Props = {
  data: Record<string, string[]>;
  setMNSData: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

const ConMNSAssess: React.FC<Props> = ({ data, setMNSData }) => {
  const handleChange = (category: string, item: string) => {
    setMNSData((prev) => {
      const items = prev[category] || [];
      return {
        ...prev,
        [category]: items.includes(item)
          ? items.filter((i) => i !== item)
          : [...items, item],
      };
    });
  };

  return (
    <div className="rounded-lg border overflow-hidden mt-2 w-full">
      <div className="bg-blue-500 px-4 py-3 flex w-full items-center">
        <h6 className="text-lg font-semibold text-white w-full">
          II. Conduct an MNS Assessment
          <span className="text-sm italic text-white"> (refer to mhGAP-IG version 2.0p.9)</span>
        </h6>
      </div>

      <div className="bg-gray-48 p-4 space-y-6">
        {categories.map(({ title, groups }) => (
          <div key={title}>
            <div className="w-full bg-gray-400 py-2 px-4 rounded-md">
              <h4 className="font-semibold text-white inline-block">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {groups.map(({ label, items }) => (
                <div key={label} className="flex-1 min-w-[250px]">
                  <div className="text-sm font-medium text-gray-600 mb-1">{label}:</div>
                  <div className="flex gap-4">
                    {[items.slice(0, 5), items.slice(5)].map((chunk, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        {chunk.map((item) => (
                          <label key={item} className="flex items-center space-x-2">
                            <Checkbox
                              checked={data[label]?.includes(item) || false}
                              onCheckedChange={() => handleChange(label, item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConMNSAssess;
