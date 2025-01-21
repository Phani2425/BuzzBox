import { Button } from "@/components/ui/button";
import { setToken, setUser } from "@/redux/slices/authSlice";
import { connectToApi } from "@/Service/apiConnector";
import { authEndpoints } from "@/Service/apis";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {api} from "@/redux/rtkQueryAPIs";

interface loginProp {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface loginForm {
  email: string;
  password: string;
}

const LoginForm: React.FC<loginProp> = ({ setLogin }) => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginform, setloginform] = useState<loginForm>({
    email: "",
    password: "",
  });
  const [loading, setloading] = useState<boolean>(false);

  const submitHandler = async () => {
    setloading(true);
    try {
      //now make api call for login by ppassing it the loginform as body
      const response = await connectToApi(
        "POST",
        authEndpoints.login,
        loginform
      );

      if (response) {
        console.log(response.data);
        toast({
          description: "Login Successfull",
        });
        Dispatch(setUser(response.data.user));
        Dispatch(setToken(response.data.token));
        Dispatch(api.util.resetApiState());
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid Email or Password",
      });
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    } finally {
      setloginform({ email: "", password: "" });
      setloading(false);
    }
  };

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value.trim();
    setloginform((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div
      className="bg-slate-900 border-2  border-slate-600 w-[85%] sm:w-[50%] md:w-[30%] h-fit rounded-xl shadow-lg flex p-5 flex-col gap-3
     items-center"
    >
      <div className="flex gap-5 flex-col">
        <h1 className="font-bold text-3xl text-white text-center">
          Login To Your Account
        </h1>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-start">
            <label className="text-white" htmlFor="email">
              Email<span className="text-pink-800">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginform.email}
              placeholder="enter Your Email or Username"
              className="py-2 px-3 placeholder:text-slate-700 bg-transparent border-slate-700 focus-within:outline-none rounded-lg border text-white w-full"
              onChange={changehandler}
            />
          </div> 

          <div className="flex flex-col gap-2 items-start">
            <label className="text-white" htmlFor="password">
              Password<span className="text-pink-800">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginform.password}
              placeholder="enter Your Password"
              className="py-2 px-3 placeholder:text-slate-700 bg-transparent focus-within:outline-none rounded-lg border text-white border-slate-700 w-full"
              onChange={changehandler}
            />
          </div>
        </div>

        <Button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white"
          onClick={submitHandler}
        >
          {loading ? <div className="custom-loader"></div> : "Login"}
        </Button>

        <span className="text-slate-300 text-center">
          Don't have an Account?{" "}
          <span
            className="text-blue-700 font-bold cursor-pointer hover:text-blue-600 "
            onClick={() => setLogin(false)}
          >
            {" "}
            SignUp
          </span>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
