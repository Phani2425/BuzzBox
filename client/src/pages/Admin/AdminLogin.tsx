import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";
import { setAdmin } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setTheme } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    const admin = localStorage.getItem("Admin");
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

      if (secretKey === ADMIN_KEY) {
        localStorage.setItem("Admin", "true");
        dispatch(setAdmin(true));

        toast({
          description: "Admin Login Successful",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid Admin Key",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred",
        });
      }
    } finally {
      setLoading(false);
      setSecretKey("");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Nav Bar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          <span className="bg-gradient-to-r from-green-400 to-green-600 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text text-3xl font-bold text-transparent [text-shadow:0_0_15px_rgba(0,163,255,0.3)]">
            BuzzBox Admin
          </span>

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
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your admin secret key to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter Admin Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="bg-transparent border-gray-200 dark:border-zinc-800 focus:ring-green-500 dark:focus:ring-[#00A3FF]"
              />
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 dark:bg-[#00A3FF] dark:hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <div className="custom-loader"></div>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
