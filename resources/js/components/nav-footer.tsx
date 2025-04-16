import * as React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';

interface SubItem {
    title: string;
    href: string;
  }
  
  interface MenuItem {
    title: string;
    icon?: React.ElementType
    isActive?: boolean
    items: SubItem[]
  }

interface SidebarGroupMenuProps {
    items: MenuItem[]
    className?: string
  }

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroupMenuProps> & {
    items: NavItem[];
}) {
    return (
        <SidebarMenu className={className}>
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <Collapsible key={item.title} defaultOpen={item.isActive} className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items.map((sub) => (
                                        <SidebarMenuSubItem key={sub.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={sub.href}>
                                                    <span>{sub.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                );
            })}
        </SidebarMenu>
    );
}
