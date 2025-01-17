import LoginForm from "@/Components/Login/LoginForm";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/Schema/formSchema";
import { connectToApi } from "@/Service/apiConnector";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { z } from "zod";
import { authEndpoints } from "@/Service/apis";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useDispatch } from "react-redux";
import {setUser, setToken} from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider ,githubProvider} from "@/utils/firebase";
import { signInWithPopup } from "firebase/auth";

interface Form {
  email: string;
  password: string;
  userName: string;
}

const Login = () => {
  const { toast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setimage] = useState("");
  const [previewimge, setpreviewimage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setloading] = useState(false);

  const [login, setLogin] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setimage(acceptedFiles[0]);
    setpreviewimage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [formdata, setfromdata] = useState<Form>({
    email: "",
    password: "",
    userName: "",
  });

  const [userNameUnique, setUserNameUnique] = useState<boolean>(false);

  //function that will get called when user stops typing for some seconds
  //deboucing

  const checkUserName = async () => {
    try {
      const response = await connectToApi("POST", authEndpoints.userName, {
        userName: formdata.userName,
      });
      if (response && response.data.message === "username is already taken") {
        setUserNameUnique(false);
        setErrors((prev) => {
          return { ...prev, userName: "username already exists" };
        });
      } else if (response && response.data.message === "username is unique") {
        setErrors((prev) => {
          return { ...prev, userName: "" };
        });
        setUserNameUnique(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //implementing debouncing for api call only when user stops typing for some seconds
  useEffect(() => {
    if (formdata.userName.length < 3) {
      setUserNameUnique(false);
      setErrors((prev) => {
        return { ...prev, userName: "" };
      });
      return;
    }
    const timeoutId = setTimeout(() => {
      checkUserName();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [formdata.userName]);

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value.trim();
    setfromdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async () => {
    setloading(true);
    try {
      userSchema.parse(formdata);
      setErrors({});
      const form = new FormData();
      form.append("email", formdata.email);
      form.append("password", formdata.password);
      form.append("image", image);
      if (userNameUnique) {
        form.append("userName", formdata.userName);
      } else {
        throw new Error("Username is not unique");
      }

      //make api call and submit
      const response = await connectToApi("POST", authEndpoints.signup, form);

      if (response && response.data) {
        setLogin(true);
        toast({
          description: "Account Created Successfully",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast({
        title: "Account Creation Failed",
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try again</ToastAction>,
      });
      if (error instanceof z.ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach(({ path, message }) => {
          validationErrors[path[0]] = message; // Map errors to field names
        });
        setErrors(validationErrors);
      }
    } finally {
      setloading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const { displayName, email, photoURL } = user;

      const response = await connectToApi("POST", authEndpoints.oauth , {
        email,
        userName: displayName,
        profilePic: photoURL,
      });

      if (response) {
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.token));
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate('/');
      }
    } catch (err) {
      console.error("Error signing in with Google", err);
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const { user } = result;
      const { displayName, email, photoURL } = user;

      const response = await connectToApi("POST", authEndpoints.oauth, {
        email,
        userName: displayName,
        profilePic: photoURL,
      });

      if (response) {
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.token));
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate('/');
      }
    } catch (err) {
      console.error("Error signing in with GitHub", err);
      toast({
        title: "Error",
        description: "Failed to sign in with GitHub",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="h-screen w-screen bg-[url('./bg.png')] flex justify-center items-center">
      {login ? (
        <LoginForm setLogin={setLogin} />
      ) : (
        <div
          className="bg-slate-900 border-2  border-slate-600 w-[85%] sm:w-[50%] md:w-[30%] h-fit rounded-xl shadow-lg flex p-5 flex-col gap-3
     items-center"
        >
          <div className="flex gap-5 flex-col">
            <h1 className="font-bold text-3xl text-white text-center">
              Create an Account
            </h1>
            <div className="flex gap-2 items-center">
              <Button
                className="text-white flex gap-2 bg-slate-800 w-[70%] py-1 px-4"
                onClick={signInWithGoogle}
              >
                <img src="./google.png" className="w-4" />
                Google
              </Button>
              <Button
                className="text-white flex gap-2 bg-slate-800 w-[70%] py-1 px-4"
                onClick={signInWithGithub}
              >
                <img src="./github-logo.png" className="w-5" />
                GitHub
              </Button>
            </div>
          </div>

          <div className="flex justify-between w-full items-center ">
            <hr className="w-[40%] border border-slate-700" />
            <span className="font-bold text-slate-700">OR</span>
            <hr className="w-[40%] border border-slate-700" />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row md:flex-col gap-2">
              <div className="flex flex-col gap-2 items-start">
                <label className="text-white" htmlFor="email">
                  Email<span className="text-pink-800">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formdata.email}
                  placeholder="Email"
                  className="py-2 px-3 placeholder:text-slate-700 bg-transparent border-slate-700 focus-within:outline-none rounded-lg border text-white w-[85%] md:w-full"
                  onChange={changehandler}
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>

              <div className="flex w-full justify-between  gap-2">
                <div className="flex flex-col gap-2 items-start">
                  <label className="text-white" htmlFor="userName">
                    UserName<span className="text-pink-800">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={formdata.userName}
                    placeholder="userName"
                    className="py-2 px-3 placeholder:text-slate-700 bg-transparent focus-within:outline-none rounded-lg border text-white border-slate-700 w-[85%] md:w-full"
                    onChange={changehandler}
                  />
                  {errors.userName && (
                    <p className="text-red-600">{errors.userName}</p>
                  )}
                  {userNameUnique && (
                    <p className="text-green-600">UserName is Unique</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 items-start">
                  <label className="text-white" htmlFor="password">
                    Password<span className="text-pink-800">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formdata.password}
                    placeholder="Password"
                    className="py-2 px-3 placeholder:text-slate-700 bg-transparent focus-within:outline-none rounded-lg border text-white border-slate-700 w-[85%] md:w-full"
                    onChange={changehandler}
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <span className="text-white mb-2">Profile Picture</span>
              {previewimge ? (
                <div className="bg-transparent border-slate-700 focus-within:outline-none rounded-lg border text-white w-full h-40 flex justify-center items-center">
                  <img
                    src={previewimge}
                    alt="profileimage"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="bg-transparent border-slate-700 focus-within:outline-none rounded-lg border text-white w-full h-32 flex justify-center items-center"
                >
                  <input {...getInputProps()} id="image" />
                  {isDragActive ? (
                    <p className="text-yellow-600 text-sm">
                      Drop the files here ...
                    </p>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-4">
                      <FiUploadCloud size={23} className="text-yellow-600" />
                      <p className="text-yellow-600 text-sm text-center">
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              className="w-full bg-blue-700 hover:bg-blue-800"
              onClick={submitHandler}
            >
              {loading ? (
                <div className="custom-loader"></div>
              ) : (
                "Create Account"
              )}
            </Button>

            <span className="text-slate-300 text-center">
              Already have an Account?{" "}
              <span
                className="text-blue-700 font-bold cursor-pointer hover:text-blue-600 "
                onClick={() => setLogin(true)}
              >
                {" "}
                Login
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
