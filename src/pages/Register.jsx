import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useRegister } from "../hooks/useRegister";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  return { email, password, displayName, photoURL };
};

function Register() {
  const userData = useActionData();
  const { registerWithEmail, isPending } = useRegister();
  const [errors, setErrors] = useState({
    photoURL: "",
    email: "",
    password: "",
    displayName: "",
  });

  useEffect(() => {
    if (userData) {
      if (userData) {
        registerWithEmail(
          userData.email,
          userData.password,
          userData.displayName,
          userData.photoURL
        );
      }
      if (
        !userData.email &&
        !userData.password &&
        !userData.displayName &&
        !userData.photoURL
      ) {
        toast.error("All inputs are empty !!!");
      }
      if(!userData.displayName.trim()){
        setErrors((prev) => {
          return {...prev , displayName : 'input-error'}
        })
      }
      if(!userData.photoURL.trim()){
        setErrors((prev) => {
          return {...prev , photoURL : 'input-error'}
        })
      }
      if(!userData.email.trim()){
        setErrors((prev) => {
          return {...prev , email : 'input-error'}
        })
      }
      if(!userData.password.trim()){
        setErrors((prev) => {
          return {...prev , password : 'input-error'}
        })
      }
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-2 w-full min-h-screen">
      <div className='bg-[url("https://picsum.photos/1000/1200")] bg-center bg-cover bg-no-repeat'></div>
      <div className="grid place-items-center min-h-screen">
        <Form
          className="flex flex-col items-center gap-5 card bg-base-100 w-96 shadow-xl p-5"
          method="post"
        >
          <h1 className="text-5xl font-semibold"> Register</h1>
          <FormInput
            status={errors.displayName}
            type="displayName"
            name="displayName"
            labelText="displayName"
          ></FormInput>
          <FormInput
          status={errors.photoURL}
            type="url"
            name="photoURL"
            labelText="PhotoURL"
          ></FormInput>
          <FormInput status={errors.email} type="email" name="email" labelText="email"></FormInput>
          <FormInput
          status={errors.password}
            type="password"
            name="password"
            labelText="password"
          ></FormInput>
          <div className="w-full">
            {!isPending && (
              <button className="btn btn-primary btn-block">Register</button>
            )}
            {isPending && (
              <button disabled className="btn btn-primary btn-block">
                Registered ....
              </button>
            )}
          </div>
          <div className="text-center">
            Already Login ?{" "}
            <Link className=" text-primary" to="/login">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
