import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/main";
import { Calendar, LucideIcon, Mail, Quote } from "lucide-react";
import moment from "moment";
import { useSelector } from "react-redux";

interface ProfileCardProps {
  heading: string;
  text: string;
  Icon: LucideIcon;
}

const ProfileCard = ({ heading, text, Icon }: ProfileCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className="group flex items-center gap-6 py-4 border-b border-white/5 last:border-0"
  >
    <div className="transition-all duration-300 group-hover:scale-110">
      <Icon className="w-5 h-5 text-green-400/70 dark:text-[#00A3FF]/70" />
    </div>
    <div className="flex-1">
      <h3 className="text-xs uppercase tracking-wider text-gray-500/70 dark:text-gray-400/70 mb-1">
        {heading}
      </h3>
      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
        {text}
      </p>
    </div>
  </motion.div>
);

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="p-8 space-y-8  ">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-[#00A3FF]/20 blur-2xl" />
          <Avatar className="w-28 h-28 ring-2 ring-white/10">
            <AvatarImage src={user.profilePic} />
            <AvatarFallback className="bg-gradient-to-br from-green-400/50 to-[#00A3FF]/50">
              {user.userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-1"
        >
          {user.userName}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Active since {moment(user.createdAt).format('MMMM YYYY')}
        </motion.div>
      </motion.div>

      <div className="space-y-2">
        <ProfileCard heading="Bio" text={user.bio || "No bio yet"} Icon={Quote} />
        <ProfileCard heading="Email" text={user.email} Icon={Mail} />
        <ProfileCard 
          heading="Joined" 
          text={moment(user.createdAt).format('MMMM Do YYYY')} 
          Icon={Calendar}
        />
      </div>
    </div>
  );
};

export default Profile;