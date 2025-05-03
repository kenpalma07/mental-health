import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

// Define types
type Group = {
  label: string;
  items: string[];
  isTextarea?: boolean;
  showTextareaOn?: string;
};

type Category = {
  title: string;
  groups: Group[];
};

const categories: Category[] = [
  {
    title: '1. Treatment Plan',
    groups: [
      {
        label: 'Avail Treatment?',
        items: ['YES', 'NO'],
      },
      {
        label: 'Choices',
        items: [
          'Psychoeducation',
          'Reduce stress and strengthen social support',
          'Promote Exercise in daily activity',
        ],
      },
    ],
  },
  {
    title: '2. Physical Intervention',
    groups: [
      {
        label: 'Details',
        items: [],
        isTextarea: true,
      },
    ],
  },
  {
    title: '3. Referrals',
    groups: [
      {
        label: 'Choices',
        items: ['Specialist', 'Mental Hospital'],
      },
      {
        label: 'Reasons',
        items: [],
        isTextarea: true,
      },
    ],
  },
  {
    title: '4. Career and Family',
    groups: [
      {
        label: 'Choices',
        items: [
          'Informed Consent',
          'Give the person freedom of movement',
          'Avoid restraining the person',
          'Educate that the person needs to take prescribed medications',
          'Explain that the symptoms are due to mental-health condition',
          'Psychosis can be treated and that the person can recover',
        ],
      },
    ],
  },
  {
    title: '5. Link Status',
    groups: [
      {
        label: 'Choices',
        items: ['Employment', 'Education', 'Social Services', 'Housing', 'Others'],
        showTextareaOn: 'Others',
      },
    ],
  },
  {
    title: '6. Special Population',
    groups: [
      {
        label: 'Choices',
        items: [
          'Children and Adolescents',
          'Older Adults',
          'Pregnant or Breastfeeding woman',
        ],
      },
    ],
  },
];

type Props = {
  data: Record<string, string[]>;
  setmanMNSData: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

const ManMNSAssess: React.FC<Props> = ({ data, setmanMNSData }) => {
  const handleChange = (label: string, item: string) => {
    setmanMNSData((prev) => {
      const current = prev[label] || [];

      if (item === 'Others' && current.includes(item)) {
        return {
          ...prev,
          [label]: current.filter((i) => i !== item && !i.startsWith('OTHER:')),
        };
      }

      return {
        ...prev,
        [label]: current.includes(item)
          ? current.filter((i) => i !== item)
          : [...current, item],
      };
    });
  };

  const handleTextareaChange = (label: string, value: string) => {
    setmanMNSData((prev) => {
      const current = (prev[label] || []).filter((i) => !i.startsWith('OTHER:'));
      return {
        ...prev,
        [label]: [...current, `OTHER:${value}`],
      };
    });
  };

  return (
    <div className="rounded-lg border overflow-hidden mt-2 w-full">
      <div className="bg-blue-500 px-4 py-3 flex w-full items-center">
        <h6 className="text-lg font-semibold text-white w-full">
          III. Manage MNS Assessment
          <span className="text-sm italic text-white">
            {' '}
            (refer to mhGAP-IG version 2.0 p.11)
          </span>
        </h6>
      </div>

      <div className="bg-gray-48 p-4 space-y-6">
        {categories.map(({ title, groups }) => (
          <div key={title}>
            <div className="w-full bg-gray-400 py-2 px-4 rounded-md">
              <h4 className="font-semibold text-white inline-block">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {groups.map((group) => (
                <div key={group.label} className="flex-1 min-w-[250px]">
                  <div className="text-sm font-medium text-gray-600 mb-1">{group.label}:</div>
                  <div className="flex flex-col gap-2">
                    {/* Render checkboxes */}
                    {group.items.map((item) => (
                      <label key={item} className="flex items-center space-x-2">
                        <Checkbox
                          checked={data[group.label]?.includes(item) || false}
                          onCheckedChange={() => handleChange(group.label, item)}
                        />
                        <span>{item}</span>
                      </label>
                    ))}

                    {/* Always visible textarea */}
                    {group.isTextarea && (
                      <Textarea
                        className="mt-2 w-full p-2 border rounded"
                        placeholder="Enter details..."
                        value={data[group.label]?.[0] || ''}
                        onChange={(e) =>
                          setmanMNSData((prev) => ({
                            ...prev,
                            [group.label]: [e.target.value],
                          }))
                        }
                      />
                    )}

                    {/* Conditionally visible textarea when "Others" is selected */}
                    {group.showTextareaOn &&
                      data[group.label]?.includes(group.showTextareaOn) && (
                        <Textarea
                          className="mt-2 w-full p-2 border rounded"
                          placeholder="Please specify..."
                          value={
                            data[group.label]
                              ?.find((i) => i.startsWith('OTHER:'))
                              ?.replace('OTHER:', '') || ''
                          }
                          onChange={(e) => handleTextareaChange(group.label, e.target.value)}
                        />
                      )}
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

export default ManMNSAssess;
