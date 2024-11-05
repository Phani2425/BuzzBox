import { MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react'

interface props {
    isMobileMenuOpen:boolean;
    setIsMobileMenuOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar:React.FC<props> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/50 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4">
        <div className="hidden md:flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-[#00A3FF] [filter:drop-shadow(0_0_8px_rgba(0,163,255,0.5))]" />
          <span className=" bg-gradient-to-r from-[#00A3FF] to-blue-600 bg-clip-text text-3xl font-bold text-transparent [text-shadow:0_0_15px_rgba(0,163,255,0.3)]">
            BuzzBox
          </span>
        </div>

        <button
          className="md:hidden  p-2 bg-white/10 rounded-full text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#00A3FF] [box-shadow:0_0_8px_rgba(0,163,255,0.5)]" />
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
