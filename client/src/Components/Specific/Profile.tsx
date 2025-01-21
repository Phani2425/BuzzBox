import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/main";

import { AtSign, Calendar, LucideIcon, User2Icon } from "lucide-react";
import moment from "moment";
import { useSelector } from "react-redux";

const Profile = () => {
 
  const {user} = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col gap-[2rem] items-center py-5">
      <Avatar className="w-40 h-40">
        <AvatarImage src={user.profilePic} />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>

      <ProfileCard heading={"bio"} text={user.bio} />
      <ProfileCard heading={"UserName"} text={user.userName} Icon={AtSign} />
      <ProfileCard
        heading={"Email"}
        text={user.email}
        Icon={User2Icon}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment(user.createdAt).fromNow()}
        Icon={Calendar}
      />
    </div>
  );
};

const ProfileCard = ({
  text,
  Icon,
  heading,
}: {
  text: string;
  Icon?: LucideIcon;
  heading: string;
}) => {
  return (
    <div className="flex gap-4 items-start">
      {Icon && <Icon size={20} className="mt-1" />}
      <div className="flex flex-col gap-1 text-center">
        <p>{text}</p>
        <p className="text-gray-500">{heading}</p>
      </div>
    </div>
  );
};

export default Profile;
