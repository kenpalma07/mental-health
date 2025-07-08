import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ethnicGroupsData from '../json/ethnic_groups.json';

type Props = {
  value: string; // current ethnic_code
  IndigenousGroup: string; // current Yes/No value
  onChange: (field: string, value: string) => void;
};

export function EthnicGroupCombobox({
  value,
  IndigenousGroup,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const ethnicGroups = ethnicGroupsData['Ethnic Group'];
  const selected = ethnicGroups.find((g) => String(g.code) === value)?.name;

  return (
    <div className="w-full space-y-2">
      {/* Indigenous Yes/No */}
      <div className="flex items-center gap-2">
        <Label
          htmlFor="IndigenousGroup"
          className="w-33 text-sm font-medium text-gray-700"
        >
          Indigenous:
        </Label>

        <label className="flex items-center gap-1 text-sm text-gray-700">
          <input
            type="radio"
            name="IndigenousGroup"
            value="N"
            checked={IndigenousGroup === 'N'}
            className="accent-blue-600"
            onChange={() => {
              onChange('IndigenousGroup', 'N');
              onChange('ethnic_code', '');
            }}
          />
          No
        </label>
        <label className="flex items-center gap-1 text-sm text-gray-700">
          <input
            type="radio"
            name="IndigenousGroup"
            value="Y"
            checked={IndigenousGroup === 'Y'}
            className="accent-blue-600"
            onChange={() => onChange('IndigenousGroup', 'Y')}
          />
          Yes
        </label>
      </div>

      {/* Ethnic Group Select - Visible only when Indigenous = Yes */}
      {IndigenousGroup === 'Y' && (
        <div className="flex items-center gap-2">
          <Label
            htmlFor="ethnic_code"
            className="w-30 text-sm font-medium text-gray-700"
          >
            Ethnic Group <span className="text-red-500">*</span>
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-94 justify-between text-dark-500"
              >
                {selected || 'Select ethnic group'}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search ethnic group..." />
                <CommandEmpty>No ethnic group found.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {ethnicGroups.map((item) => (
                    <CommandItem
                      key={item.code}
                      value={item.name}
                      onSelect={() => {
                        onChange('ethnic_code', String(item.code));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === String(item.code)
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
