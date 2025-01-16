import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AdminLayout = () => {
  return (
    <div className="h-screen w-screen relative ">
      {/* navbar for admin dashboard */}
      <AdminNavBar />

      {/* body */}

      <div className="h-[calc(100%-64px)] absolute bottom-0 grid grid-cols-1 md:grid-cols-4 w-full">
        {/* sidebar */}
        <div className="hidden md:flex md:flex-col md:col-span-1 overflow-y-auto  border-r border-r-gray-800 p-4">
          sidebar
        </div>

        {/* main content */}
        <div className="col-span-1 md:col-span-3 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

const AdminNavBar = () => {
  return (
    <div className=" fixed top-0 left-0 right-0 w-full px-4 h-16 border-b border-b-gray-700 flex items-center ">
      <div className="flex justify-between items-center w-[95%] mx-auto">
        <h1 className="font-bold text-2xl  bg-gradient-to-r from-green-400 to-green-600 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text  text-transparent">
          BuzzBox Admin
        </h1>

        <Sheet>
          <SheetTrigger asChild>
            <div className="rounded-full p-2 border  hover:bg-gray-600/20 block md:hidden hover:border-gray-600 cursor-pointer ">
              <Menu size={20} />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
