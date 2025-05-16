import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useEffect } from 'react';
import categoriesData from '../json/categories.json';

type GroupedItems = {
  pres_comp_label: string;
  pres_comp_item: string[];
  gen_heal_hist_label: string;
  gen_heal_hist_item: string[];
  mns_hist_label: string;
  mns_hist_item: string[];
  fam_hist_mns_cond_label: string;
  fam_hist_mns_cond_item: string[];
};

type Props = {
  data: Record<string, GroupedItems[]>;
  setMNSData: React.Dispatch<React.SetStateAction<Record<string, GroupedItems[]>>>; 
  setMNSDataFormatted?: (formatted: Record<string, string>) => void; 
};

const ConMNSAssess: React.FC<Props> = ({ data, setMNSData, setMNSDataFormatted }) => {
  useEffect(() => {
    if (setMNSDataFormatted) {
      const result: Record<string, string> = {};

      categoriesData.forEach(({ key, columnPrefix }) => {
        const groups = data[key];
        if (groups && groups.length > 0) {
          const allItems: string[] = [];
          let firstLabel = '';

          groups.forEach((group) => {
            firstLabel = group[`${columnPrefix}_label`];
            allItems.push(...group[`${columnPrefix}_item`]);
          });

          result[`${columnPrefix}_label`] = firstLabel;
          result[`${columnPrefix}_item`] = allItems.join(', ');
        }
      });

      setMNSDataFormatted(result); // Format and set the data
    }
  }, [data, setMNSDataFormatted]);

  const handleChange = (categoryKey: string, label: string, item: string, columnPrefix: string) => {
    const itemColumn = `${columnPrefix}_item`; // Mapping to the corresponding item column
    const labelColumn = `${columnPrefix}_label`; // Mapping to the corresponding label column

    setMNSData((prev) => {
      const existing = prev[categoryKey] || [];
      const groupIndex = existing.findIndex((g) => g[labelColumn] === label);
      const updatedGroups = [...existing];

      if (groupIndex === -1) {
        updatedGroups.push({ [labelColumn]: label, [itemColumn]: [item] });
      } else {
        const group = updatedGroups[groupIndex];
        const itemIndex = group[itemColumn]?.findIndex((i) => i === item);

        if (itemIndex === -1) {
          group[itemColumn]?.push(item); // Add item to the list
        } else {
          group[itemColumn]?.splice(itemIndex, 1); // Remove item from the list
          if (group[itemColumn]?.length === 0) {
            updatedGroups.splice(groupIndex, 1); // Remove group if no items are left
          }
        }
      }

      return {
        ...prev,
        [categoryKey]: updatedGroups, // Update the state with the new group structure
      };
    });
  };

  const isChecked = (categoryKey: string, label: string, item: string, columnPrefix: string) => {
    return data[categoryKey]?.some(
      (g) => g[`${columnPrefix}_label`] === label && g[`${columnPrefix}_item`]?.includes(item)
    );
  };

  return (
    <div className="mt-2 w-full overflow-hidden rounded-lg border">
      <div className="flex w-full items-center bg-blue-500 px-4 py-3">
        <h6 className="w-full text-lg font-semibold text-white">
          II. Conduct an MNS Assessment
          <span className="text-sm italic"> (refer to mhGAP-IG version 2.0 p.9)</span>
        </h6>
      </div>
      <div className="space-y-6 bg-gray-48 p-4">
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
                const label = group[`${columnPrefix}_label`];
                const items = group[`${columnPrefix}_item`];

                return (
                  <div key={groupIndex} className="min-w-[250px] flex-1">
                    <div className="mb-1 text-sm font-medium text-gray-600">{label}:</div>
                    <div className="flex gap-4">
                      {[items.slice(0, 5), items.slice(5)].map((chunk, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                          {chunk.map((item) => (
                            <label key={item} className="flex items-center space-x-2">
                              <Checkbox
                                checked={isChecked(key, label, item, columnPrefix)}
                                onCheckedChange={() =>
                                  handleChange(key, label, item, columnPrefix)
                                }
                              />
                              <span>{item}</span>
                            </label>
                          ))}
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
