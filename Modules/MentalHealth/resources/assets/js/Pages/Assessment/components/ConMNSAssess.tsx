import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { GraduationCap, MapPin, School, Stethoscope, StickyNote, Syringe } from 'lucide-react';
import React, { useEffect } from 'react';
import categoriesData from '../../json/categories.json';

type GroupedItems = {
    pres_comp_label: string;
    pres_comp_item: string[];
    gen_heal_hist_label: string;
    gen_heal_hist_item: string[];
    mns_hist_label: string;
    mns_hist_item: string[];
    fam_hist_mns_cond_label: string;
    fam_hist_mns_cond_item: string[];
    [key: string]: string | string[];
};

interface Props {
    data: Record<string, GroupedItems[]>;
    setMNSData: React.Dispatch<React.SetStateAction<Record<string, GroupedItems[]>>>;
    setMNSDataFormatted?: (formatted: Record<string, string>) => void;
    selfHarmData: {
        school_name: string;
        grade_year: string;
        place_inci: string;
        self_sui_means: string;
        self_sui_remarks: string;
    };

    setSelfHarmData: React.Dispatch<
        React.SetStateAction<{
            school_name: string;
            grade_year: string;
            place_inci: string;
            self_sui_means: string;
            self_sui_remarks: string;
        }>
    >;
}


const ConMNSAssess: React.FC<Props> = ({ data, setMNSData, setMNSDataFormatted, selfHarmData, setSelfHarmData }) => {
    const [openModal, setOpenModal] = React.useState(false);

    useEffect(() => {
        console.log('Loaded MNS Data:', data);
        console.log('Loaded Self Harm Data:', selfHarmData);
    }, [data, selfHarmData]);

    useEffect(() => {
        if (setMNSDataFormatted) {
            const result: Record<string, string> = {};

            categoriesData.forEach(({ key, columnPrefix }) => {
                const groups = data[key];
                if (groups && groups.length > 0) {
                    const allItems: string[] = [];
                    let firstLabel = '';

                    groups.forEach((group) => {
                        firstLabel = group[`${columnPrefix}_label` as keyof GroupedItems] as string;
                        allItems.push(...(group[`${columnPrefix}_item` as keyof GroupedItems] as string[]));
                    });

                    result[`${columnPrefix}_label`] = firstLabel;
                    result[`${columnPrefix}_item`] = allItems.join(', ');
                }
            });

            setMNSDataFormatted(result);
        }
    }, [data, setMNSDataFormatted]);

    const handleChange = (categoryKey: string, label: string, item: string, columnPrefix: string) => {
        const itemColumn = `${columnPrefix}_item`;
        const labelColumn = `${columnPrefix}_label`;

        setMNSData((prev) => {
            const existing = prev[categoryKey] || [];
            const groupIndex = existing.findIndex((g) => g[labelColumn] === label);
            const updatedGroups = [...existing];

            if (groupIndex === -1) {
                updatedGroups.push({ [labelColumn]: label, [itemColumn]: [item] } as GroupedItems);
            } else {
                const group = updatedGroups[groupIndex];
                const itemsArray = Array.isArray(group[itemColumn]) ? (group[itemColumn] as string[]) : [];
                const itemIndex = itemsArray.findIndex((i) => i === item);
                if (itemIndex === -1) {
                    itemsArray.push(item);
                } else {
                    itemsArray.splice(itemIndex, 1);
                    if (itemsArray.length === 0) {
                        updatedGroups.splice(groupIndex, 1);
                    }
                }
                group[itemColumn] = itemsArray;
            }

            return {
                ...prev,
                [categoryKey]: updatedGroups,
            };
        });
    };

    const isChecked = (categoryKey: string, label: string, item: string, columnPrefix: string) => {
        return !!data[categoryKey]?.some(
            (g) => g[`${columnPrefix}_label`] === label && Array.isArray(g[`${columnPrefix}_item`]) && g[`${columnPrefix}_item`].includes(item),
        );
    };

    return (
        <div className="mt-2 w-full overflow-hidden rounded-lg border">
            <div className="bg-gray-48 space-y-6 p-4">
                <Label htmlFor="assessment" className="mb-1 text-sm font-medium text-gray-600">
                    Conduct MNS Assessment
                </Label>
                {categoriesData.map(({ title, key, columnPrefix, groups }) => (
                    <div key={key}>
                        <div className="w-full rounded-md bg-gray-400 px-4 py-2">
                            <h4 className="font-semibold text-white">{title}</h4>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4">
                            {groups.map((group, groupIndex) => {
                                const typedGroup = group as GroupedItems;
                                const label = typedGroup[`${columnPrefix}_label` as keyof GroupedItems] as string;
                                const items = typedGroup[`${columnPrefix}_item` as keyof GroupedItems] as string[];

                                return (
                                    <div key={groupIndex} className="min-w-[250px] flex-1">
                                        <div className="mb-1 text-sm font-medium text-gray-600">{label}:</div>
                                        <div className="flex gap-4">
                                            {[items.slice(0, 5), items.slice(5)].map((chunk, idx) => (
                                                <div key={idx} className="flex flex-col gap-2">
                                                    {chunk.map((item) => {
                                                        const checked = isChecked(key, label, item, columnPrefix);
                                                        const isSelfHarm =
                                                            key === 'presenting_complaint' && label === 'Depression' && item === 'Act of self-harm';

                                                        return (
                                                            <div key={item} className="flex items-center gap-2">
                                                                <Checkbox
                                                                    checked={!!checked}
                                                                    onCheckedChange={() => handleChange(key, label, item, columnPrefix)}
                                                                />
                                                                <span>{item}</span>

                                                                {isSelfHarm && checked && (
                                                                    <Dialog open={openModal} onOpenChange={setOpenModal}>
                                                                        <DialogTrigger asChild>
                                                                            <Button variant="outline" size="sm" className="ml-2">
                                                                                <Stethoscope className="h-4 w-4" />
                                                                                Add Data
                                                                            </Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent forceMount>
                                                                            <DialogHeader>
                                                                                <DialogTitle>Self-harm Details</DialogTitle>
                                                                                <DialogDescription>
                                                                                    Please fill in the following information related to the self-harm
                                                                                    incident.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="grid gap-3 py-2">
                                                                                {/* School */}
                                                                                <div className="flex items-center gap-2">
                                                                                    <School className="h-4 w-4 text-gray-500" />
                                                                                    <Input
                                                                                        placeholder="School"
                                                                                        name="school_name"
                                                                                        value={selfHarmData.school_name}
                                                                                        onChange={(e) =>
                                                                                            setSelfHarmData({
                                                                                                ...selfHarmData,
                                                                                                school_name: e.target.value,
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                </div>

                                                                                {/* Year/Grade */}
                                                                                <div className="flex items-center gap-2">
                                                                                    <GraduationCap className="h-4 w-4 text-gray-500" />
                                                                                    <Input
                                                                                        placeholder="Year/Grade"
                                                                                        name="grade_year"
                                                                                        value={selfHarmData.grade_year}
                                                                                        onChange={(e) =>
                                                                                            setSelfHarmData({
                                                                                                ...selfHarmData,
                                                                                                grade_year: e.target.value,
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                </div>

                                                                                {/* Place of Incidence */}
                                                                                <div className="flex items-center gap-2">
                                                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                                                    <Input
                                                                                        placeholder="Place of Incidence"
                                                                                        name="place_inci"
                                                                                        value={selfHarmData.place_inci}
                                                                                        onChange={(e) =>
                                                                                            setSelfHarmData({
                                                                                                ...selfHarmData,
                                                                                                place_inci: e.target.value,
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                </div>

                                                                                {/* Means of Suicide */}
                                                                                <div className="flex items-center gap-2">
                                                                                    <Syringe className="h-4 w-4 text-gray-500" />
                                                                                    <Input
                                                                                        placeholder="Means of Suicide"
                                                                                        name="self_sui_means"
                                                                                        value={selfHarmData.self_sui_means}
                                                                                        onChange={(e) =>
                                                                                            setSelfHarmData({
                                                                                                ...selfHarmData,
                                                                                                self_sui_means: e.target.value,
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                </div>

                                                                                {/* Remarks (Status: Attempted / Completed) */}
                                                                                <div className="flex items-center gap-2">
                                                                                    <StickyNote className="h-4 w-4 text-gray-500" />
                                                                                    <Select
                                                                                        value={selfHarmData.self_sui_remarks}
                                                                                        onValueChange={(value) =>
                                                                                            setSelfHarmData({
                                                                                                ...selfHarmData,
                                                                                                self_sui_remarks: value,
                                                                                            })
                                                                                        }
                                                                                    >
                                                                                        <SelectTrigger className="w-full rounded-md border p-2">
                                                                                            <SelectValue placeholder="Select Status" />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectItem value="Attempted">Attempted</SelectItem>
                                                                                            <SelectItem value="Completed">Completed</SelectItem>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                </div>
                                                                            </div>

                                                                            <Button
                                                                                onClick={() => {
                                                                                    document.activeElement instanceof HTMLElement &&
                                                                                        document.activeElement.blur();
                                                                                    setOpenModal(false);
                                                                                }}
                                                                                className="mx-auto mt-4 flex w-30 items-center justify-center gap-2"
                                                                            >
                                                                                <Stethoscope className="h-4 w-4" />
                                                                                Save Details
                                                                            </Button>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConMNSAssess;
