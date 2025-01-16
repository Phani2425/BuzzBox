import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search,
  UserPlus,
  MoreVertical,
  Users,
  LogOut,
  ArrowLeft,
  Trash2,
  Edit,
  UserMinus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { User } from "@/Types/types";
import { Sampleusers } from "@/constants/sampleData";
import UserItemForGroup from "@/Components/Shared/UserItemForGroup";
import { useToast } from "@/hooks/use-toast"


const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const navigate = useNavigate();

  // Dummy user data (replace with Redux later)
  const currentUser = {
    id: "1",
    name: "John Doe",
    isAdmin: true,
  };

  // Sample data
  const groups = [
    {
      id: "1",
      name: "Project Team",
      creator: "1", // matches currentUser.id
      members: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        },
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Team",
      lastActive: "2 mins ago",
    },
    {
      id: "1",
      name: "Project Team",
      creator: "1", // matches currentUser.id
      members: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        },
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Team",
      lastActive: "2 mins ago",
    },
    {
      id: "1",
      name: "Project Team",
      creator: "1", // matches currentUser.id
      members: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        },
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Team",
      lastActive: "2 mins ago",
    },
    {
      id: "1",
      name: "Project Team",
      creator: "1", // matches currentUser.id
      members: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        },
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Team",
      lastActive: "2 mins ago",
    },
    {
      id: "1",
      name: "Project Team",
      creator: "1", // matches currentUser.id
      members: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        },
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Team",
      lastActive: "2 mins ago",
    },
    {
      id: "1",
      name: "Project Team",
      creator: "1", // matches currentUser.id
      members: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        },
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Team",
      lastActive: "2 mins ago",
    },
    {
      id: "1",
      name: "Project Team",
      creator: "1", // matches currentUser.id
      members: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        },
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Team",
      lastActive: "2 mins ago",
    },
  ];

  const selectedGroupDetails = groups.find((g) => g.id === selectedGroup);
  const isGroupAdmin = selectedGroupDetails?.creator === currentUser.id;

  const handleGroupAction = (
    action: "rename" | "delete" | "leave" | "addMember" | "removeMember"
  ) => {
    switch (action) {
      case "rename":
        console.log("Rename group");
        break;
      case "delete":
        console.log("Delete group");
        break;
      case "leave":
        console.log("Leave group");
        break;
      case "addMember":
        console.log("Add member");
        break;
      case "removeMember":
        console.log("Remove member");
        break;
    }
  };

  return (
    <div className="h-screen bg-white dark:bg-black">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text text-transparent">
              My Groups
            </h1>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent"
              prefix={<Search className="w-4 h-4 text-gray-500" />}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {groups.map((group) => (
            <Sheet key={group.id}>
              <SheetTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg cursor-pointer border border-transparent
                    hover:bg-gray-100 dark:hover:bg-zinc-900"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={group.avatar}
                      alt={group.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {group.name}
                      </h3>
                      <span>
                        <Users />
                        <p className="text-sm text-gray-500">
                          {" "}
                          {group.members.length} members
                        </p>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                <GroupDetails
                  group={group}
                  isAdmin={isGroupAdmin}
                  onAction={handleGroupAction}
                />
              </SheetContent>
            </Sheet>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <Button className="w-full bg-green-500 hover:bg-green-600 dark:bg-[#00A3FF] dark:hover:bg-blue-600">
            <UserPlus className="w-4 h-4 mr-2" />
            New Group
          </Button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex h-full relative z-0">
        {/* Left Sidebar */}
        <div className="w-[350px] border-r border-gray-200 dark:border-zinc-800 p-4 flex flex-col">
          {/* Header - Fixed */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#00A3FF] dark:to-blue-600 bg-clip-text text-transparent">
              My Groups
            </h1>
          </div>

          {/* Search and New Group - Fixed */}
          <div className="space-y-4 mb-6">
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent"
              prefix={<Search className="w-4 h-4 text-gray-500" />}
            />
            <Button className="w-full bg-green-500 hover:bg-green-600 dark:bg-[#00A3FF] dark:hover:bg-blue-600">
              <UserPlus className="w-4 h-4 mr-2" />
              New Group
            </Button>
          </div>

          {/* Groups List - Scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="space-y-2">
              {groups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 
              ${
                selectedGroup === group.id
                  ? "bg-green-500/10 dark:bg-[#00A3FF]/10 border-green-500 dark:border-[#00A3FF]"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-900"
              }
              border border-transparent`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={group.avatar}
                      alt={group.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {group.members.length} members
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 h-full">
          {selectedGroupDetails ? (
            <GroupDetails
              group={selectedGroupDetails}
              isAdmin={isGroupAdmin}
              onAction={handleGroupAction}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a group to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GroupDetails = ({ group, isAdmin, onAction }) => {
  //we will crate some state variables for showing the modals for  different actions in the page
  //like add member, remove member, rename group, delete group

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showRenameGroupModal, setShowRenameGroupModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);

  //we will create the functions for the confirmation of the different actions
  const removeConfirm = () => {
    //we will send the request to the server to remove the member
    //and then we will close the modal
    setShowRemoveMemberModal(false);
  };
  const deleteConfirm = () => {
    //we will send the request to the server to delete the group
    //and then we will close the modal
    setShowDeleteGroupModal(false);
  };
  const leaveConfirm = () => {
    //we will send the request to the server to leave the group
    //and then we will close the modal
    setShowLeaveGroupModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 h-full p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={group.avatar}
            alt={group.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {group.name}
            </h2>
            <p className="text-gray-500">Created on April 1, 2024</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isAdmin ? (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    onAction("rename");
                    setShowRenameGroupModal(true);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Rename Group
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onAction("addMember");
                    setShowAddMemberModal(true);
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Members
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => {
                    onAction("delete");
                    setShowDeleteGroupModal(true);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Group
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  onAction("leave");
                  setShowLeaveGroupModal(true);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Leave Group
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Members
          </h3>
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onAction("addMember");
                setShowAddMemberModal(true);
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Members
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {group.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-800 dark:text-gray-200">
                  {member.name}
                </span>
              </div>
              {isAdmin && member.id !== group.creator && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => {
                    onAction("removeMember");
                    setShowRemoveMemberModal(true);
                  }}
                >
                  <UserMinus className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showRenameGroupModal && (
        <RenameGroupModal
          onClose={setShowRenameGroupModal}
          currentGroupName={group.name}
        />
      )}
      {showAddMemberModal && <AddMemberModal onClose={setShowAddMemberModal} />}
      {showRemoveMemberModal && (
        <CommonModal
          heading="Remove Member"
          desc="Do you want to remove seleced member from the group? "
          confirm={removeConfirm}
          onClose={setShowRemoveMemberModal}
        />
      )}
      {showDeleteGroupModal && (
        <CommonModal
          heading="Delete group"
          desc="Do you want to permanently delete the group? "
          confirm={deleteConfirm}
          onClose={setShowDeleteGroupModal}
        />
      )}
      {showLeaveGroupModal && (
        <CommonModal
          heading="leave Group"
          desc="Do you want to leave the group? "
          confirm={leaveConfirm}
          onClose={setShowLeaveGroupModal}
        />
      )}
    </motion.div>
  );
};

export default Groups;

//Ok so we will create modal for performing different purpose where a modal will be for confirmation to delete group or leave the group or to remove membber where as other two will be one for the renaming the group and other for adding the member to the group

//Now we will create the modal for renaming the group

const RenameGroupModal = ({ onClose, currentGroupName }) => {
  const clickRef = useRef(null);

  const clcikHandler = (e: React.MouseEvent) => {
    if (e.target !== clickRef.current) {
      onClose(false);
    }
    return;
  };

  const [newGroupName, setNewgroupName] = useState("");

  const chageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewgroupName(e.target.value);
  };

  const submitHandler = () => {
    if (
      newGroupName.trim() === "" ||
      newGroupName.trim() === currentGroupName
    ) {
      return;
    } else {
      //we will send the request to the server to rename the group
      //and then we will close the modal
      onClose(false);
    }
  };

  return (
    <div
      onClick={clcikHandler}
      className=" h-full w-full absolute inset-0 backdrop-blur-md flex justify-center items-center z-10"
    >
      <div
        ref={clickRef}
        className="bg-white dark:bg-black p-6 rounded-lg border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 items-start">
          <p className="font-bold text-xl">Rename Group</p>
          <Label htmlFor="rename text-gray-400 ">Group Name</Label>
          <Input
            id="rename"
            placeholder="Enter new group name"
            onChange={chageHandler}
          />
          <div className="flex justify-start gap-4 ">
            <Button onClick={submitHandler}>Rename</Button>
            <Button variant="destructive" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommonModal = ({ heading, desc, confirm, onClose }) => {
  const clickRef = useRef(null);

  const clcikHandler = (e: React.MouseEvent) => {
    if (e.target !== clickRef.current) {
      onClose(false);
    }
    return;
  };

  return (
    <div
      onClick={clcikHandler}
      className=" h-full w-full absolute inset-0 backdrop-blur-md flex justify-center items-center z-10"
    >
      <div
        ref={clickRef}
        className="bg-white dark:bg-black p-6 rounded-lg border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 items-start">
          <p className="font-bold text-xl">{heading}</p>
          <p className="font-semibold text-gray-600 ">{desc}</p>
          <div className="flex justify-start gap-4 ">
            <Button onClick={confirm}>Confirm</Button>
            <Button variant="destructive" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddMemberModal = ({ onClose }) => {
  const clickRef = useRef(null);
  const [membersToBeAdded, setMembersToBeAdded] = useState([]);
  const [users, setusers] = useState<User[]>(Sampleusers);
  const { toast } = useToast()

  const addMemberHandler = (id ) => {
    if (!membersToBeAdded.includes(id)) {
      setMembersToBeAdded([...membersToBeAdded, id]);
    }
    return;
  };

  const removeMemberHandler = ( id ) => {
    if (membersToBeAdded.includes(id)) {
      const newMembers = membersToBeAdded.filter((member) => member !== id);
      setMembersToBeAdded(newMembers);
    }
    return;
  };

  const isMemberSelected = (id) => {
    return membersToBeAdded.includes(id);
  };

  const submitHandler = () => {
    if (membersToBeAdded.length === 0) {
      onClose(false);
      return;
    }
    //we will send the request to the server to add the members to the group
    //and then we will close the modal
    toast({
      variant: "success",
      description: `${membersToBeAdded.length} new members added to the Group`,
    });

    console.log("Members to be added are : ");
    membersToBeAdded.forEach((member) => {
      console.log(member);
    });
    
    onClose(false);
  };

  const clcikHandler = (e: React.MouseEvent) => {
    if (e.target !== clickRef.current) {
      onClose(false);
    }
    return;
  };

  return (
    <div
      onClick={clcikHandler}
      className=" h-full w-full absolute inset-0 backdrop-blur-md flex justify-center items-center z-10"
    >
      <div
        ref={clickRef}
        className="bg-white dark:bg-black p-6 rounded-lg border border-gray-700 w-[30%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 ">
          <p className="font-bold text-xl">Add Member</p>

          <div className="flex flex-col gap-4 ">
            {users &&
              users.map((user) => (
                <UserItemForGroup
                  key={user.id}
                  user={user}
                  Addhandler={addMemberHandler}
                  Removehandler={removeMemberHandler}
                  handlerLoading={isMemberSelected(user.id)}
                />
              ))}
          </div>

          <div className="flex justify-start gap-4 ">
            <Button onClick={submitHandler}>Add</Button>
            <Button variant="destructive" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
