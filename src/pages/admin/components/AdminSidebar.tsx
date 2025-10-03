import { Home, Users, DollarSign, Upload, Download, UserCheck, Settings, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AdminSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ currentSection, onSectionChange }: AdminSidebarProps) {
  const { open } = useSidebar();

  const menuItems = [
    { title: 'Dashboard', section: 'dashboard', icon: Home },
    { title: 'Manage Users', section: 'users', icon: Users },
    { title: 'Manage Deposits', section: 'deposits', icon: DollarSign },
    { title: 'Manage Withdrawal', section: 'withdrawal', icon: Upload },
    { title: 'Manage KYC', section: 'kyc', icon: UserCheck },
    { title: 'Settings', section: 'settings', icon: Settings },
  ];

  return (
    <Sidebar className={open ? 'w-64' : 'w-16'} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <div className="p-4 border-b">
          {open ? (
            <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.section)}
                    className={`w-full justify-start ${
                      currentSection === item.section
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {open && <span className="ml-3">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
