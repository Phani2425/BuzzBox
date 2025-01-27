import { useGetStatsQuery } from "@/redux/rtkQueryAPIs";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  MessagesSquare,
  UsersRound,
  Loader2
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function AdminDashboard() {
  const [selectedWeek, setSelectedWeek] = useState("0");
  const { data: statsData, isLoading, error } = useGetStatsQuery(selectedWeek);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load dashboard stats
      </div>
    );
  }

  const { stats } = statsData;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = days.map((day, index) => ({
    name: day,
    Users: stats.ArrayForUser[index],
    Chats: stats.ArrayForChat[index],
    Messages: stats.ArrayForMessage[index],
  }));

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide">
       <div className="container mx-auto p-6 space-y-8 pb-20">
      {/* Week Selector */}
      <div className="flex justify-end sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2">
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Current Week</SelectItem>
            <SelectItem value="1">Last Week</SelectItem>
            <SelectItem value="2">Two Weeks Ago</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.userCount}</h3>
                <p className="text-xs text-green-500">+{stats.userCreated} this week</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Chats</p>
                <h3 className="text-2xl font-bold">{stats.chatCount}</h3>
                <p className="text-xs text-green-500">+{stats.chatCreated} this week</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-full">
                <MessagesSquare className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Messages</p>
                <h3 className="text-2xl font-bold">{stats.messageCount}</h3>
                <p className="text-xs text-green-500">+{stats.messageCreated} this week</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-full">
                <UsersRound className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Groups</p>
                <h3 className="text-2xl font-bold">{stats.groupCount}</h3>
                <p className="text-xs text-green-500">+{stats.chatCreated} this week</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
          <h3 className="text-lg font-semibold mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Users" stroke="#3b82f6" />
              <Line type="monotone" dataKey="Chats" stroke="#22c55e" />
              <Line type="monotone" dataKey="Messages" stroke="#a855f7" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
      </div>
    </div>
  );
}