import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "@/redux/slices/authSlice";
import { connectToApi } from "@/Service/apiConnector";
import { authEndpoints } from "@/Service/apis";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { RootState } from "../../main";
import { useNavigate } from "react-router-dom";

const SetUserNameModal = () => {
  const [userName, setuserName] = useState("");
  const [userNameUnique, setUserNameUnique] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (userName.trim().length > 4) {
      const timeoutId = setTimeout(() => {
        checkUserName();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [userName]);

  const checkUserName = async () => {
    try {
      const response = await connectToApi("POST", authEndpoints.userName, {
        userName,
      });
      if (response && response.data.message === "username is unique") {
        setUserNameUnique(true);
      } else {
        setUserNameUnique(false);
      }
    } catch (error) {
      console.error("Error checking username", error);
    }
  };

  const submitHandler = async () => {
    try {
      const response = await connectToApi("POST", authEndpoints.setUserName, {
        userName,
        userId: user._id,
      });
      if (response) {
        dispatch(setUserName(true));
        toast({
          description: "Username set successfully",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error setting username", error);
      toast({
        title: "Error",
        description: "Failed to set username",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-md flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-700 p-6 rounded-lg w-96 flex flex-col gap-4 shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          Set Username
        </h1>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setuserName(e.target.value);
          }}
          type="text"
          className="w-full mt-4"
          placeholder="Enter Username"
          value={userName}
        />
        {userName.trim().length > 4 && (
          <span
            className={`${
              userNameUnique ? "text-green-500" : "text-red-500"
            } font-medium`}
          >
            {userNameUnique
              ? "Username is unique"
              : "Username is already taken"}
          </span>
        )}
        <Button
          onClick={submitHandler}
          disabled={!userNameUnique}
          className="w-full bg-green-500 hover:bg-green-600 dark:bg-[#00A3FF] dark:hover:bg-blue-600"
        >
          Set Username
        </Button>
      </motion.div>
    </div>
  );
};

export default SetUserNameModal;
