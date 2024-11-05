import LoginForm from "@/Components/Login/LoginForm";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/Schema/formSchema";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { z } from "zod";

interface Form {
  email: string;
  password: string;
}

const Login = () => {
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
  });

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value.trim();
    setfromdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = () => {
    setloading(true);
    try {
      userSchema.parse(formdata);
      setErrors({});
      const form = new FormData();
      form.append("email", formdata.email);
      form.append("password", formdata.password);
      form.append("image", image);

      //make api call and submit

      // if(response.success){
      //   setLogin(true);
      // }
    } catch (error) {
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
              <Button className="text-white flex gap-2 bg-slate-800 w-[70%] py-1 px-4">
                <img src="./google.png" className="w-4" />
                Google
              </Button>
              <Button className="text-white flex gap-2 bg-slate-800 w-[70%] py-1 px-4">
                <img src="./facebook.png" className="w-4" />
                Facebook
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
                  placeholder="enter Your Email or Username"
                  className="py-2 px-3 placeholder:text-slate-700 bg-transparent border-slate-700 focus-within:outline-none rounded-lg border text-white w-[85%] md:w-full"
                  onChange={changehandler}
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
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
                  placeholder="enter Your Password"
                  className="py-2 px-3 placeholder:text-slate-700 bg-transparent focus-within:outline-none rounded-lg border text-white border-slate-700 w-[85%] md:w-full"
                  onChange={changehandler}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <span className="text-white mb-2">Profile Picture</span>
              {previewimge ? (
                <div className="bg-transparent border-slate-700 focus-within:outline-none rounded-lg border text-white w-full h-40 flex justify-center items-center">
                  <img src={previewimge} alt="profileimage" />
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="bg-transparent border-slate-700 focus-within:outline-none rounded-lg border text-white w-full h-40 flex justify-center items-center"
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
