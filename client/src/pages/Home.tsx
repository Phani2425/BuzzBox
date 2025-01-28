import AppLayout from "@/Components/Layout/AppLayout";
import { MessageSquare, UserPlus, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Home:React.FC = () => {


  const features = [
    {
      icon: MessageSquare,
      title: "Real-Time Chat",
      description:
        "Instantly connect and chat with friends with real-time messaging",
    },
    {
      icon: UserPlus,
      title: "Group Conversations",
      description:
        "Create groups and stay connected with multiple friends at once",
    },
    {
      icon: Shield,
      title: "Secure Communication",
      description: "Your messages are protected with end-to-end encryption",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };


  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <p className="font-semibold text-xl mb-12 text-center bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text text-transparent animate-pulse">
        Select a friend to chat
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 rounded-xl backdrop-blur-sm 
              bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800
              hover:shadow-xl transition-all duration-300
              hover:border-green-400 dark:hover:border-[#00A3FF]"
          >
            <feature.icon
              className="w-12 h-12 mb-4 text-green-400 dark:text-[#00A3FF]
                [filter:drop-shadow(0_0_8px_rgba(0,163,255,0.5))]"
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      
    </div>
  );
};

export default () => (
  <AppLayout>
    <Home />
  </AppLayout>
);
