import * as React from "react";
import {
  AudioWaveform,
  CalendarIcon,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
  TimerIcon, // Import the TimerIcon
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { Calendar } from "@/components/ui/calendar"; // Import the calendar component

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Premium",
    },
  ],

  dashboard: [
    {
      name: "Dashboard",
      url: "/",
      icon: PieChart,
    },
    {
      name: "Menu",
      url: "/Tools",
      icon: Map,
    },
  ],
  navMain: [
    {
      title: "Tools",
      url: "/tools",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Excel",
          url: "/excel",
          icon: PieChart,
        },
        {
          title: "To Do",
          url: "/todo",
          icon: Map,
        },
        {
          title: "Pomodoro",
          url: "/pomodoro",
          icon: TimerIcon,
        },
      ],
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: CalendarIcon,
      isActive: false,
      items: [
        {
          title: "View Calendar",
          url: "/calendar",
          icon: CalendarIcon,
          content: <Calendar />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.dashboard} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
