import {
  MessageSquare,
  Search,
  UserPlus,
  Users,
  Menu,
  X,
  BellDotIcon,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { lazy, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/main";
import { setToken, setUser } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Searchcomp = lazy(() => import("../Navbar/Search"));
const NewGroup = lazy(() => import("../Navbar/Newgroup"));
const Notification = lazy(() => import("../Navbar/Notifications"));

interface props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<props> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setTheme } = useTheme();

  const [isSearch, setisSearch] = useState<boolean>(false);
  const [isNewGroup, setisNewGroup] = useState<boolean>(false);
  const [isNotification, setisNotification] = useState<boolean>(false);

  const searchhandler = () => {
    setisSearch((prev) => !prev);
  };
  const newgrouphandler = () => {
    setisNewGroup((prev) => !prev);
  };
  const notificationhandler = () => {
    setisNotification((prev) => !prev);
  };

  //handlers
  const logOutHandler = () => {
    toast({
      description: "Logged Out",
    });
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-b-gray-300 dark:border-zinc-800 bg-white dark:bg-black/50 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-1 md:px-4">
        <div className="hidden md:flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-green-400 dark:text-[#00A3FF] [filter:drop-shadow(0_0_8px_rgba(0,163,255,0.5))]" />
          <span className="bg-gradient-to-r from-green-400 to-green-600 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text text-3xl font-bold text-transparent [text-shadow:0_0_15px_rgba(0,163,255,0.3)]">
            BuzzBox
          </span>
        </div>

        <button
          className="md:hidden p-2 bg-white/10 rounded-full text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          {/* button for light and dark mode */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 "
                  onClick={searchhandler}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={newgrouphandler}
                  className="hidden md:flex items-center justify-center text-zinc-400  "
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="sr-only">Create Group</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create Group</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400"
                  onClick={() => {
                    navigate("/group");
                  }}
                >
                  <Users className="h-5 w-5" />
                  <span className="sr-only">Manage Groups</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage Groups</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400"
                  onClick={notificationhandler}
                >
                  <BellDotIcon />
                  <span className="sr-only">Notification</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notification</p>
              </TooltipContent>
            </Tooltip>

            {/* <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400"
                    >
                      <LogOut />
                      <span className="sr-only">Logout</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip> */}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400">
                  <LogOut />
                  <span className="sr-only">Logout</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Are you Sure?</DialogTitle>
                  <DialogDescription>
                    Do you really want to logout from the application?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="px-3"
                    onClick={logOutHandler}
                  >
                    Logout
                  </Button>

                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="px-3"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  {" "}
                  <Avatar>
                    <AvatarImage src={user?.profilePic} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User Profile</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>User Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            {isSearch && (
              <Searchcomp
                isOpen={isSearch}
                onClose={() => setisSearch(false)}
              />
            )}
          </Suspense>
        }
        {
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            {isNewGroup && (
              <NewGroup
                isOpen={isNewGroup}
                onClose={() => setisNewGroup(false)}
              />
            )}
          </Suspense>
        }
        {
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            {isNotification && (
              <Notification
                isOpen={isNotification}
                onClose={() => setisNotification(false)}
              />
            )}
          </Suspense>
        }
      </div>
    </header>
  );
};

export default Navbar;
