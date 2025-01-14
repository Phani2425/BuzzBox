import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AtSign, Calendar, LucideIcon, User2Icon } from "lucide-react";
import moment from "moment";

const Profile = () => {
  return (
    <div className="flex flex-col gap-[2rem] items-center py-5">
      <Avatar className="w-40 h-40">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <ProfileCard heading={"bio"} text={"kdvbvd,vb,c"} />
      <ProfileCard heading={"UserName"} text={"Phani2425"} Icon={AtSign} />
      <ProfileCard
        heading={"Name"}
        text={"Phani Bhusan Mohanty"}
        Icon={User2Icon}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment().fromNow()}
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
    <div className="flex gap-4 items-center">
      {Icon && <Icon className="text-white" />}
      <div className="flex items-center text-white text-center gap-4">
        <div className="flex flex-col gap-1">
          <p>{text}</p>
          <p className="text-gray-500">{heading}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
