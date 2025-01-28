import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Loaders = () => {
  const glassStyle = "bg-white/5 dark:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/5";
  
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white dark:bg-black">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[url('/pattern.svg')]" />

      {/* Gradient Orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute left-1/2 bottom-0 w-[800px] h-[800px] -translate-x-1/2 translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#00A3FF] dark:to-blue-600 rounded-full blur-[100px]"
      />

      <div className="container mx-auto p-4">
        {/* Navbar */}
        <div className={cn("h-16 mb-8 flex items-center justify-between px-4 rounded-xl", glassStyle)}>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-green-400 dark:text-[#00A3FF] drop-shadow-glow" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-9 rounded-full" />
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr_320px] gap-4 lg:gap-6">
          {/* Chat List */}
          <div className={cn("hidden md:block rounded-xl p-4 space-y-4", glassStyle)}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 dark:hover:bg-white/[0.02] transition-colors">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className={cn("rounded-xl p-4 flex flex-col min-h-[600px] md:min-h-[700px]", glassStyle)}>
            <div className="flex-1 space-y-6 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={cn(
                    "max-w-[70%] space-y-2 p-3 rounded-xl",
                    i % 2 === 0 
                      ? "bg-white/5 dark:bg-white/[0.02]" 
                      : "bg-green-400/10 dark:bg-[#00A3FF]/10"
                  )}>
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto p-4">
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>

          {/* Profile Section */}
          <div className={cn("hidden lg:block rounded-xl p-6", glassStyle)}>
            <div className="flex flex-col items-center space-y-6">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-4 w-full">
                <Skeleton className="h-6 w-40 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loaders;