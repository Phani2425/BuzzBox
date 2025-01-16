import React from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdminNavBarTabs } from "@/constants/sampleData";
import {
  Gauge,
  Users,
  MessageSquare,
  MessageCircleMore,
  Settings,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { setAdmin } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const iconMap = {
  Gauge,
  Users,
  MessageSquare,
  MessageCircleMore,
  Settings,
  LogOut,
};

const AdminLayout = () => {
  return (
    <div className="h-screen w-screen relative ">
      {/* navbar for admin dashboard */}
      <AdminNavBar />

      {/* body */}

      <div className="h-[calc(100%-64px)] absolute bottom-0 grid grid-cols-1 md:grid-cols-5 w-full">
        {/* sidebar */}
        <AdminSidebar />

        {/* main content */}
        <div className="col-span-1 md:col-span-4 p-4  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

const AdminNavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className=" fixed top-0 left-0 right-0 w-full px-4 h-16 border-b border-b-gray-700 flex items-center ">
      <div className="flex justify-between items-center w-[95%] mx-auto">
        <h1 className="font-bold text-2xl  bg-gradient-to-r from-green-400 to-green-600 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text  text-transparent">
          BuzzBox Admin
        </h1>

        <Sheet>
          <SheetTrigger asChild>
            <div className="rounded-full p-2 border  hover:bg-gray-600/20 block md:hidden hover:border-gray-600 cursor-pointer  ">
              <Menu size={20} />
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="border-b border-b-gray-600/60">
                <h1 className="font-bold text-2xl  bg-gradient-to-r from-green-400 to-green-600 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text  text-transparent text-start">
                  BuzzBox Admin
                </h1>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto scrollbar-hide h-full">
              <nav className="flex-1 px-2 space-y-1">
                {AdminNavBarTabs.map((item) => {
                  const Icon = iconMap[item.iconName];
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      onClick={() => setIsMobileMenuOpen(false)}
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                        isActive
                          ? "bg-green-500/10 dark:bg-[#00A3FF]/10 text-green-600 dark:text-[#00A3FF]"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900"
                      )}
                    >
                      <Icon
                        className={cn(
                          "flex-shrink-0 w-6 h-6 mr-3 transition-colors duration-200",
                          isActive
                            ? "text-green-600 dark:text-[#00A3FF]"
                            : "text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                        )}
                      />
                      <span className="flex-1">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              {/* Logout Button at Bottom */}
              <div className="p-4 mt-auto">
                <Link
                  className="flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-all duration-200"
                  onClick={() => {
                    localStorage.removeItem("Admin");
                    dispatch(setAdmin(false));
                    navigate("/");
                  }}
                >
                  <LogOut className="w-6 h-6 mr-3" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

// AdminSidebar component
const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex md:col-span-1 md:flex-col h-full bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-800">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto scrollbar-hide">
        <nav className="flex-1 px-2 space-y-1">
          {AdminNavBarTabs.map((item) => {
            const Icon = iconMap[item.iconName];
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                  isActive
                    ? "bg-green-500/10 dark:bg-[#00A3FF]/10 text-green-600 dark:text-[#00A3FF]"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900"
                )}
              >
                <Icon
                  className={cn(
                    "flex-shrink-0 w-6 h-6 mr-3 transition-colors duration-200",
                    isActive
                      ? "text-green-600 dark:text-[#00A3FF]"
                      : "text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                  )}
                />
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        {/* Logout Button at Bottom */}
        <div className="p-4 mt-auto">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-all duration-200"
            onClick={() => {
              localStorage.removeItem("Admin");
              dispatch(setAdmin(false));
              navigate("/");
            }}
          >
            <LogOut className="w-6 h-6 mr-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
