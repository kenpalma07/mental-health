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
import { FileBarChart2, Folder, Cog, LayoutGrid, MonitorDot, AlertOctagonIcon } from 'lucide-react';
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
            { title: 'Consultations', href: '/consultations' },
            { title: 'Assessment', href: '/assessment' },
        ],
    },

    {
        title: 'Forms',
        href: '#',
        icon: Folder,
        isActive: true,
        items: [
            { title: '(ITR)-Individual Treatment Record', href: '/others' },
            { title: 'Medical Abstract', href: '/other/othertwo' },
            { title: 'Treatment Card', href: '/other/othertwo' },
            { title: 'Referral Forms', href: '/other/othertwo' },
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
        title: 'Reference',
        href: '#',
        icon: Cog,
        isActive: true,
        items: [
            { title: 'FHUD', href: '/reference/fhud' },
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
