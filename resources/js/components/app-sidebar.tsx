import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FileBarChart2, Folder, LayoutGrid, MonitorDot } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Mental Health',
        href: '#',
        icon: MonitorDot,
        isActive: true,
        items: [
            { title: 'Patient List',  href: '/patients' },
            { title: 'Add Patient',  href: '/patients/create' },
            { title: 'Consultations', href: '/patients/consultations' },
        ],
    },
    {
        title: 'Reports',
        href: '#',
        icon: FileBarChart2,
        isActive: true,
        items: [
            { title: 'Consultation LogBooks', href: '/mentalhealth/conLogBook' },
            { title: 'Monthly Reports', href: '/mentalhealth/monthReports' },
            { title: 'Quarterly Reports', href: '/mentalhealth/quartReports' },
            { title: 'Annually Reports', href: '/mentalhealth/AnnulReports' },
        ],
    },

    {
        title: 'Other Reports',
        href: '#',
        icon: FileBarChart2,
        isActive: true,
        items: [
            { title: 'Other One', href: '/others' },
            { title: 'Other Two', href: '/other/othertwo' },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Identity Access Mgmt',
        href: '#',
        icon: Folder,
        isActive: true,
        items: [
            { title: 'Users', href: '/iam/users' },
            { title: 'Roles', href: '/iam/roles' },
            { title: 'Permissions', href: '/iam/permissions' },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
