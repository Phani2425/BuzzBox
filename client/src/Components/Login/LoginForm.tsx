import { Button } from '@/components/ui/button';
import { userSchema } from '@/Schema/formSchema';
import React, { useState } from 'react'
import {z} from 'zod'

interface loginProp {
    setLogin : React.Dispatch<React.SetStateAction<boolean>>
}

interface loginForm {
    email:string;
    password:string
}

const LoginForm:React.FC<loginProp> = ({setLogin}) => {

    const [loginform,setloginform] = useState<loginForm>({email:"",password:""});
    const [loading,setloading] = useState<boolean>(false);
    const [errors,setError] = useState<Record<string,string>>({})

    const submitHandler = () => {
        setloading(true);
        try{

            //parsing the login form with the zod schema we created
            userSchema.parse(loginform);
            setError({});
            //now make api call for login by ppassing it the loginform as body
            

        }catch(error){
            if (error instanceof z.ZodError) {
                const validationErrors: Record<string, string> = {};
                error.errors.forEach(({ path, message }) => {
                  validationErrors[path[0]] = message; // Map errors to field names
                });
                setError(validationErrors);
              }

        }finally{
           setloginform({email:"",password:""});
           setloading(false);
        }
    }

  const changehandler = (e:React.ChangeEvent<HTMLInputElement>) => {
       const {name} = e.target;
       const value=  e.target.value.trim();
       setloginform((prev) => {return  {...prev,[name]:value}})
  }

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
                  value={loginform.password}
                  placeholder="enter Your Password"
                  className="py-2 px-3 placeholder:text-slate-700 bg-transparent focus-within:outline-none rounded-lg border text-white border-slate-700 w-[85%] md:w-full"
                  onChange={changehandler}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
            </div>


            <Button
              className="w-full bg-blue-700 hover:bg-blue-800"
              onClick={submitHandler}
            >
              {loading ? (
                <div className="custom-loader"></div>
              ) : (
                "Login"
              )}
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
  )
}

export default LoginForm