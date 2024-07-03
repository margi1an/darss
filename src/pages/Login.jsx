import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";
import { getAuth , sendPasswordResetEmail } from "firebase/auth/cordova";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const [forgetPassword , setForgetPassword] = useState(true);
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      if (userData.email.trim() && userData.password?.trim()) {
        signInWithEmail(userData.email,userData.password);
      }
      if(!userData.email && !userData.password){
        toast.error('Email and Password is empty')
      }
      if(!userData.email.trim()){
        setErrors((prev) => {
          return {...prev , email : 'input-error'}
        })
      }
      if(!userData.password?.trim()){
        setErrors((prev) => {
          return {...prev , password : 'input-error'}
        })
      }
    }
    if(!forgetPassword  && userData){
      sendPasswordResetEmail(auth, userData.email.trim())
      .then(() => {
        toast.success('Send Link succesfully ! ✋😀')
        setForgetPassword(!forgetPassword)
      }) .catch(() => {
        toast.error('Something went wrong ! 😥')
      })
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-2 w-full min-h-screen">
      <div className='bg-[url("https://picsum.photos/1000/1200")] bg-center bg-cover bg-no-repeat'></div>
      <div className="grid bg-slate-50 place-items-center min-h-screen">
        <Form
          className="flex flex-col items-center gap-5 card bg-base-100 w-96 shadow-xl p-5"
          method="post"
        >
          <h1 className="text-5xl font-semibold">Login</h1>
          <FormInput
            type="email"
            name="email"
            labelText="email"
            status={errors.email}
          ></FormInput>
         { forgetPassword && <FormInput
            type="password"
            name="password"
            labelText="password"
            status={errors.password}
          ></FormInput>}
          <div className="w-full">
            {!isPending && (
              <button className="btn btn-primary btn-block">{forgetPassword ? 'Login' :'Send'}</button>
            )}
            {isPending && (
              <button disabled className="btn btn-primary btn-block">
                {forgetPassword ? 'Loading ...' :'Sending ...'}
              </button>
            )}
          </div>
          <div className="text-center">
            Already registered ?{" "}
            <Link className=" text-primary" to="/register">
              Register
            </Link>
          </div>
          <div className="text-center">
            <p>Forgot Password ? <button onClick={() => setForgetPassword(!forgetPassword)} className="btn btn-primary text-slate-50 btn-sm ml-3" type="btn">Change password</button></p>

          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
