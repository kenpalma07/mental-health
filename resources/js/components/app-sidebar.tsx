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
import { FileBarChart2, Folder, LayoutGrid, MonitorDot, AlertOctagonIcon, Settings } from 'lucide-react';
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
            { title: 'Mental Assessment', href: '/patients' },
        ],
    },

    {
        title: 'Medical Records',
        href: '#',
        icon: Folder,
        isActive: true,
        items: [
            { title: 'Patient Medical Records', href: '/medrecords' },
        ],
    },
    {
        title: 'Reports',
        href: '#',
        icon: FileBarChart2,
        isActive: true,
        items: [
            { title: 'Mental Health Tracker', href: '/mhtracker' },
            { title: 'Mental Health Masterlist', href: '/reportmasterlist' },
            { title: 'Suicide Report (School Age)', href: '/reportschoolagesr' },
            { title: 'Suicide Report (Adults)', href: '/reportadultsr' },
        ],
    },
    {
        title: 'Notification',
        href: '#',
        icon: AlertOctagonIcon,
        isActive: true,
        items: [
            { title: 'Patient Schedule List', href: '/mentalhealth/conLogBook' },
            { title: 'Incoming Referrals', href: '/mentalhealth/monthReports' },
            { title: 'Outgoing Referrals', href: '/mentalhealth/quartReports' },
        ],
    },

];

const footerNavItems: NavItem[] = [
    {
        title: 'References',
        href: '#',
        icon: Settings,
        isActive: true,
        items: [
            { title: 'Migration Version', href: '/migration/version' },
            { title: 'FHUD', href: '/references/fhud' },
            { title: 'Employees', href: '/references/employees' },
            { title: 'Setup', href: '/references/setup' },
        ],
    },
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
