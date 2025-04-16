import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <NavItemWithSub key={item.title} item={item} currentPath={page.url} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function NavItemWithSub({ item, currentPath }: { item: NavItem; currentPath: string }) {
    const hasChildren = item.items && item.items.length > 0;
    const [open, setOpen] = useState(false); // always closed by default

    const isActive = item.href === currentPath;

    const toggle = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault(); // prevent default link if it has submenu
            setOpen(!open);
        }
    };

    return (
        <>
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={{ children: item.title }}
                    onClick={toggle}
                >
                    <Link
                        href={item.href}
                        prefetch
                        className="flex items-center justify-between w-full"
                    >
                        <div className="flex items-center gap-2">
                            {item.icon && <item.icon className="w-4 h-4" />}
                            <span>{item.title}</span>
                        </div>
                        {hasChildren && (
                            <span className="ml-auto">
                                {open ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </span>
                        )}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            {hasChildren && open && (
                <div className="pl-6 space-y-1">
                    {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={subItem.href === currentPath}
                                tooltip={{ children: subItem.title }}
                            >
                                <Link href={subItem.href} prefetch>
                                    <span>{subItem.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </div>
            )}
        </>
    );
}
