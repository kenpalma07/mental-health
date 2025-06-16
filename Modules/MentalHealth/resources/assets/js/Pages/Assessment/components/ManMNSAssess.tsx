import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { FHUD } from '@/types';
import React from 'react';

type Group = {
    label: string;
    key: string;
    items?: string[];
    isTextarea?: boolean;
    showTextareaOn?: string;
    isSelect?: boolean;
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
                key: 'treat_avail',
                items: ['YES', 'NO'],
            },
            {
                label: 'Choices',
                key: 'treat_choice',
                items: ['Psychoeducation', 'Reduce stress and strengthen social support', 'Promote Exercise in daily activity'],
            },
        ],
    },
    {
        title: '2. Psychosocial Interventions',
        groups: [
            {
                label: 'Details',
                key: 'psycho_inter',
                isTextarea: true,
            },
        ],
    },
    {
        title: '3. Referrals',
        groups: [
            {
                label: 'Choices',
                key: 'ref_choice',
                items: ['Specialist', 'Mental Hospital'],
            },
            {
                label: 'Referred Facility',
                key: 'ref_fhud',
                isSelect: true,
            },
            {
                label: 'Reasons',
                key: 'ref_reason',
                isTextarea: true,
            },
        ],
    },
    {
        title: '4. Career and Family',
        groups: [
            {
                label: 'Choices',
                key: 'career_fam_choice',
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
                key: 'link_status',
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
                key: 'special_pop',
                items: ['Children and Adolescents', 'Older Adults', 'Pregnant or Breastfeeding woman'],
            },
        ],
    },
];

type Props = {
    data: Record<string, string[]>;
    setmanMNSData: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
    facilities: FHUD[];
};

const ManMNSAssess: React.FC<Props> = ({ data, setmanMNSData, facilities = [] }) => {
    // Determine if "Specialist" or "Mental Hospital" is selected
    const refChoice = data['ref_choice'] || [];
    const isSpecialist = refChoice.includes('Specialist');
    const isMentalHospital = refChoice.includes('Mental Hospital');

    // When "Specialist" is selected, clear ref_fhud
    React.useEffect(() => {
        if (isSpecialist) {
            setmanMNSData((prev) => {
                if (!prev.ref_fhud || prev.ref_fhud.length === 0) return prev;
                return { ...prev, ref_fhud: [] };
            });
        }
    }, [isSpecialist, setmanMNSData]);

    // When "Specialist" is selected OR both are unselected, clear ref_reason
    React.useEffect(() => {
        if (isSpecialist || (!isSpecialist && !isMentalHospital)) {
            setmanMNSData((prev) => {
                if (!prev.ref_reason || prev.ref_reason.length === 0) return prev;
                return { ...prev, ref_reason: [] };
            });
        }
    }, [isSpecialist, isMentalHospital, setmanMNSData]);

    const handleChange = (key: string, item: string) => {
        setmanMNSData((prev) => {
            const current = prev[key] || [];

            if (item === 'Others' && current.includes(item)) {
                return {
                    ...prev,
                    [key]: current.filter((i) => i !== item && !i.startsWith('OTHER:')),
                };
            }

            return {
                ...prev,
                [key]: current.includes(item) ? current.filter((i) => i !== item) : [...current, item],
            };
        });
    };

    const handleTextareaChange = (key: string, value: string) => {
        setmanMNSData((prev) => {
            const current = (prev[key] || []).filter((i) => !i.startsWith('OTHER:'));
            return {
                ...prev,
                [key]: [...current, `OTHER:${value}`],
            };
        });
    };

    const handleSelectChange = (key: string, value: string) => {
        setmanMNSData((prev) => ({
            ...prev,
            [key]: [value],
        }));
    };

    return (
        <div className="mt-2 w-full overflow-hidden rounded-lg border">
            <div className="flex w-full items-center bg-blue-500 px-4 py-3">
                <h6 className="w-full text-lg font-semibold text-white">
                    III. Manage MNS Assessment
                    <span className="text-sm text-white italic"> (refer to mhGAP-IG version 2.0 p.11)</span>
                </h6>
            </div>

            <div className="bg-gray-48 space-y-6 p-4">
                <Label className="mb-1 text-sm font-medium text-gray-600">Manage MNS Assessment</Label>
                {categories.map(({ title, groups }) => (
                    <div key={title}>
                        <div className="w-full rounded-md bg-gray-400 px-4 py-2">
                            <h4 className="inline-block font-semibold text-white">{title}</h4>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4">
                            {groups.map((group) => (
                                <div key={group.key} className="min-w-[250px] flex-1">
                                    <div className="mb-1 text-sm font-medium text-gray-600">{group.label}:</div>
                                    <div className="flex flex-col gap-2">
                                        {/* Checkboxes */}
                                        {!group.isTextarea &&
                                            !group.isSelect &&
                                            group.items?.map((item) => (
                                                <label key={item} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={data[group.key]?.includes(item) || false}
                                                        onCheckedChange={() => handleChange(group.key, item)}
                                                    />
                                                    <span>{item}</span>
                                                </label>
                                            ))}

                                        {/* Referred Facility Select */}
                                        {group.isSelect && group.key === 'ref_fhud' ? (
                                            <Select
                                                value={data[group.key]?.[0] || ''}
                                                onValueChange={(value) => handleSelectChange(group.key, value)}
                                                disabled={isSpecialist || !isMentalHospital}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Facility" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {facilities.map((facility) => (
                                                        <SelectItem key={facility.id} value={facility.facility_name}>
                                                            {facility.facility_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            group.isSelect && (
                                                <Select
                                                    value={data[group.key]?.[0] || ''}
                                                    onValueChange={(value) => handleSelectChange(group.key, value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {group.items?.map((item) => (
                                                            <SelectItem key={item} value={item}>
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )
                                        )}

                                        {/* Textarea input */}
                                        {group.isTextarea && (
                                            <Textarea
                                                className="w-full rounded border p-2"
                                                placeholder="Enter details..."
                                                value={data[group.key]?.[0] || ''}
                                                onChange={(e) =>
                                                    setmanMNSData((prev) => ({
                                                        ...prev,
                                                        [group.key]: [e.target.value],
                                                    }))
                                                }
                                            />
                                        )}

                                        {/* Conditional textarea for "Others" */}
                                        {group.showTextareaOn && data[group.key]?.includes(group.showTextareaOn) && (
                                            <Textarea
                                                className="mt-2 w-full rounded border p-2"
                                                placeholder="Please specify..."
                                                value={data[group.key]?.find((i) => i.startsWith('OTHER:'))?.replace('OTHER:', '') || ''}
                                                onChange={(e) => handleTextareaChange(group.key, e.target.value)}
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