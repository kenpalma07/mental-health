import type { ColumnDef } from '@tanstack/vue-table';
import type { Permission } from './schema';

import { Checkbox } from '@/components/ui/checkbox';
import DataTableColumnHeader from '@/Custom/components/DataTableColumnHeader.vue';
import { h } from 'vue';
import DataTableRowActions from '../partials/DataTableRowActions.vue';

export const columns: ColumnDef<Permission>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(Checkbox, {
                checked: table.getIsAllPageRowsSelected(),
                'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
                ariaLabel: 'Select all',
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                checked: row.getIsSelected(),
                'onUpdate:checked': (value) => row.toggleSelected(!!value),
                ariaLabel: 'Select row',
            }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column: column,
                title: 'Name',
            }),
        //cell: ({ row }) => h('div', { class: 'capitalize' }, () => row.getValue('name')),
    },
    {
        accessorKey: 'module',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column: column,
                title: 'Module',
            }),
        //cell: ({ row }) => h('div', { class: 'capitalize' }, () => row.getValue('name')),
    },
    {
        accessorKey: 'guard_name',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column: column,
                title: 'Guard Name',
            }),
        //cell: ({ row }) => h('div', { class: 'capitalize' }, () => row.getValue('guard_name')),
    },
    {
        id: 'actions',
        cell: ({ row }) => h(DataTableRowActions, { row }),
    },
];
