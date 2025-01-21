import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
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
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { User } from "@/Types/types";
import UserItemForGroup from "@/Components/Shared/UserItemForGroup";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/main";
import {
  useAddMembersMutation,
  useDeleteGroupMutation,
  useGetAllGroupQuery,
  useLazyGetMyFriendsQuery,
  useLeaveGroupMutation,
  useRemoveMembersMutation,
  useRenameGroupMutation,
} from "@/redux/rtkQueryAPIs";
import GroupAvatar from "@/Components/Shared/GroupAvatar";
import Newgroup from "@/Components/Navbar/Newgroup";

interface groupinterface {
  _id: string;
  name: string;
  grpAvatar: string[];
  members: User[];
  creator: string;
}

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [groupShown, setGroupShown] = useState<groupinterface[] | null>(null);
  const navigate = useNavigate();
  // geting the user from redux store
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    data: groups,
    isLoading,
    refetch,
    error,
    isError,
  } = useGetAllGroupQuery();

  const { toast } = useToast();
  // state variable for newGroup modal
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);

  useEffect(() => {
    if (groups?.allgroups) {
      setGroupShown(groups.allgroups);
    }
  }, [groups]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setGroupShown(groups?.allgroups);
    } else {
      const searchedGroups = groups.allgroups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setGroupShown(searchedGroups);
    }
  }, [searchQuery, groups]);

  // const getAllgroups = async () => {
  //   try {
  //     await getAllGroups().then((res) => {
  //       console.log(res.data.allgroups);
  //       setgroups(res.data.allgroups);
  //       setGroupShown(res.data.allgroups);
  //     });
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       toast({
  //         variant: "destructive",
  //         title: `Error-${err.message}`,
  //       });
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "Error- Something went wrong",
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    refetch();
  }, [showNewGroupModal]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: `${error}`,
    });
  }

  const selectedGroupDetails = groups?.allgroups.find(
    (g) => g._id === selectedGroup
  );
  const isGroupAdmin = selectedGroupDetails?.creator === user._id;

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
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {groupShown &&
            groupShown.length > 0 &&
            groupShown.map((group) => (
              <Sheet key={group._id}>
                <SheetTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg cursor-pointer border border-transparent
                    hover:bg-gray-100 dark:hover:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <GroupAvatar avatars={group.grpAvatar} />
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
                  <GroupDetails group={group} isAdmin={isGroupAdmin} />
                </SheetContent>
              </Sheet>
            ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <Button
            className="w-full bg-green-500 hover:bg-green-600 dark:bg-[#00A3FF] dark:hover:bg-blue-600"
            onClick={() => {
              setShowNewGroupModal(true);
            }}
          >
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
            />
            <Button
              className="w-full bg-green-500 hover:bg-green-600 dark:bg-[#00A3FF] dark:hover:bg-blue-600"
              onClick={() => {
                setShowNewGroupModal(true);
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              New Group
            </Button>
          </div>

          {/* Groups List - Scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="space-y-2">
              {groupShown &&
                groupShown.length > 0 &&
                groupShown.map((group) => (
                  <motion.div
                    key={group._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 
              ${
                selectedGroup === group._id
                  ? "bg-green-500/10 dark:bg-[#00A3FF]/10 border-green-500 dark:border-[#00A3FF]"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-900"
              }
              border border-transparent`}
                    onClick={() => setSelectedGroup(group._id)}
                  >
                    <div className="flex items-center gap-3">
                      <GroupAvatar avatars={group.grpAvatar} />

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
              refetch={refetch}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a group to view details
            </div>
          )}
        </div>
      </div>
      {showNewGroupModal && (
        <Newgroup
          isOpen={showNewGroupModal}
          onClose={() => {
            setShowNewGroupModal(false);
          }}
        />
      )}
    </div>
  );
};

const GroupDetails = ({
  group,
  isAdmin,
  refetch,
}: {
  group: groupinterface;
  isAdmin: boolean;
  refetch?: () => QueryActionCreatorResult<any> ;
}) => {
  const [leaveGroup] = useLeaveGroupMutation();
  const [removeMember] = useRemoveMembersMutation();
  const [deleteGroup] = useDeleteGroupMutation();

  //we will crate some state variables for showing the modals for  different actions in the page
  //like add member, remove member, rename group, delete group

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showRenameGroupModal, setShowRenameGroupModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);

  const { toast } = useToast();
  const [memberToBeRemoved, setMemberToBeRemoved] = useState<string | null>(
    null
  );

  //this is the function which will be called when a member is removed or added to refetch chats

  //we will create the functions for the confirmation of the different actions
  const removeConfirm = async () => {
    try {
      //we will send the request to the server to remove the member
      await removeMember({
        members: [memberToBeRemoved],
        chatId: group._id,
      }).then(() => {
        refetch();
        toast({
          title: "Member Removed",
          description: "Selected member has been removed from the group",
        });
        setShowRemoveMemberModal(false);
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error Removing Member",
          description: `${err.message}`,
        });
      } else {
        toast({
          title: "Error Removing Member",
          description: "unknown error occured",
        });
      }
    }
  };
  const deleteConfirm = async () => {
    //we will send the request to the server to delete the group
    await deleteGroup(group._id).then(() => {
      refetch();
      toast({
        title: "Group Deleted",
        description: "Group has been deleted",
      });
    });
    //and then we will close the modal
    setShowDeleteGroupModal(false);
  };
  const leaveConfirm = async () => {
    //we will send the request to the server to leave the group
    await leaveGroup(group._id).then(() => {
      refetch();
      toast({
        title: "Left Group",
        description: "You have left the group",
      });
    });
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
          <GroupAvatar avatars={group.grpAvatar} />
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
                    setShowRenameGroupModal(true);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Rename Group
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
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
              key={member._id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.profilePic}
                  alt={member.userName}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-800 dark:text-gray-200">
                  {member.userName}
                </span>
              </div>
              {isAdmin && member._id !== group.creator && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => {
                    setMemberToBeRemoved(member._id);
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
          currentGroupDetail={group}
          refetch={refetch}
        />
      )}
      {showAddMemberModal && (
        <AddMemberModal onClose={setShowAddMemberModal} refetch={refetch} group={group} />
      )}
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

const RenameGroupModal = ({ onClose, currentGroupDetail,refetch }) => {
  const clickRef = useRef(null);

  const clcikHandler = (e: React.MouseEvent) => {
    if (e.target !== clickRef.current) {
      onClose(false);
    }
    return;
  };

  const [newGroupName, setNewgroupName] = useState("");
  const [loading, setloading] = useState(false);
  const [renameGroup] = useRenameGroupMutation();
  const { toast } = useToast();

  const chageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewgroupName(e.target.value);
  };

  const submitHandler = async () => {
    if (
      newGroupName.trim() === "" ||
      newGroupName.trim() === currentGroupDetail.name
    ) {
      return;
    } else {
      try {
        setloading(true);
        //we will send the request to the server to rename the group
        await renameGroup({
          chatId: currentGroupDetail._id,
          name: newGroupName,
        }).then(() => {
          refetch();
          toast({
            title: "Group Renamed",
            description: "Group name has been updated",
          });
          onClose(false);
        });
        //and then we will close the modal
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: "Error Renaming Group",
            description: `${err.message}`,
          });
        } else {
          toast({
            title: "Error Renaming Group",
            description: "unknown error occured",
          });
        }
      } finally {
        setloading(false);
      }
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
            <Button onClick={submitHandler} disabled={loading}>
              Rename
            </Button>
            <Button
              variant="destructive"
              disabled={loading}
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommonModal = ({ heading, desc, confirm, onClose } : {
  heading: string;
  desc: string;
  confirm: () => void;
  onClose: (val: boolean) => void;
}) => {
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

const AddMemberModal = ({ onClose,refetch,group } :{
  onClose: (val: boolean) => void;
  refetch: () => QueryActionCreatorResult<any> ;
  group: groupinterface;
}) => {
  const clickRef = useRef(null);
  const [membersToBeAdded, setMembersToBeAdded] = useState<string[]>([]);
  const [users, setusers] = useState<User[]>([]);
  const [usersShown, setUsersShown] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [addMember] = useAddMembersMutation();
  const [getMyFriends] = useLazyGetMyFriendsQuery();

  const fetchFriends = async () => {
    await getMyFriends().then((res) => { 
     setusers(res.data.users);
     setUsersShown(res.data.users);
    } )
  }

  useEffect(() => {
    fetchFriends();
  },[])

  const addMemberHandler = (id:string) => {
    if (!membersToBeAdded.includes(id)) {
      setMembersToBeAdded([...membersToBeAdded, id]);
    }
    return;
  };

  const removeMemberHandler = (id:string) => {
    if (membersToBeAdded.includes(id)) {
      const newMembers = membersToBeAdded.filter((member) => member !== id);
      setMembersToBeAdded(newMembers);
    }
    return;
  };

  const isMemberSelected = (id:string) => {
    return membersToBeAdded.includes(id);
  };

  const submitHandler = async() => {
    if (membersToBeAdded.length === 0) {
      onClose(false);
      return;
    }
    //we will send the request to the server to add the members to the group
   await addMember({members:membersToBeAdded,chatId:group._id }).then(() => {
      refetch();
      toast({
        variant: "default",
        description: `${membersToBeAdded.length} new members added to the Group`,
      });
      onClose(false);
   }).catch((err) => {
    if (err instanceof Error) {
      toast({
        variant: "destructive",
        title: `Error-${err.message}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error- Something went wrong",
      });
    }
   })

 
  };

  const clcikHandler = (e: React.MouseEvent) => {
    if (e.target !== clickRef.current) {
      onClose(false);
    }
    return;
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      fetchFriends();
      return;
    }

    const newUsers = users.filter((user) =>
      user.userName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setusers(newUsers);
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

          <div className="flex flex-col gap-6">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={searchHandler}
              className="bg-transparent"
            />

            <div className="flex flex-col gap-4 h-52 scrollbar-hide overflow-y-auto ">
              {usersShown && usersShown.length > 0 ? (
                usersShown.map((user) => (
                  <UserItemForGroup
                    key={user._id}
                    user={user}
                    Addhandler={addMemberHandler}
                    Removehandler={removeMemberHandler}
                    handlerLoading={isMemberSelected(user._id)}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">No Friends found</p>
                </div>
              )}
            </div>
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
