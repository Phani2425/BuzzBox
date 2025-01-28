
  interface AdminNavItem {
    name: string;
    path: string;
    iconName: string;
  }
  
  export const AdminNavBarTabs: AdminNavItem[] = [
    {
      name: "Dashboard",
      path: '/admin/dashboard',
      iconName: 'Gauge'
    },
    {
      name: "Users",
      path: '/admin/dashboard/users',
      iconName: 'Users'
    },
    {
      name: "Groups",
      path: '/admin/dashboard/groups',
      iconName: 'MessageSquare'
    },
    {
      name: "Messages",
      path: '/admin/dashboard/messages',
      iconName: 'MessageCircleMore'
    },
    {
      name: "Settings",
      path: '/admin/dashboard/settings',
      iconName: 'Settings'
    }
  ];