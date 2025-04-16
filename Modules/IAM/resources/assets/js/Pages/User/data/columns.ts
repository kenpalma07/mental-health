import type { ColumnDef } from '@tanstack/vue-table';
import type { User } from './schema';

import { Checkbox } from '@/components/ui/checkbox';
import DataTableColumnHeader from '@/Custom/components/DataTableColumnHeader.vue';
import { h } from 'vue';
import DataTableRowActions from '../partials/DataTableRowActions.vue';

export const columns: ColumnDef<User>[] = [
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
        accessorKey: 'full_name',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column: column,
                title: 'Full Name',
            }),
        //cell: ({ row }) => h('div', { class: 'capitalize' }, () => row.getValue('name')),
    },
    {
        accessorKey: 'username',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column: column,
                title: 'Username',
            }),
        //cell: ({ row }) => h('div', { class: 'capitalize' }, () => row.getValue('guard_name')),
    },
    {
        accessorKey: 'email',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column: column,
                title: 'Email',
            }),
        //cell: ({ row }) => h('div', { class: 'capitalize' }, () => row.getValue('guard_name')),
    },
    {
        id: 'actions',
        cell: ({ row }) => h(DataTableRowActions, { row }),
    },
];
