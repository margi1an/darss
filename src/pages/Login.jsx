import React, { useEffect } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();

  useEffect(() => {
    if (useActionData) {
      signInWithEmail(userData);
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-2 w-full min-h-screen">
      <div
        className='bg-[url("https://picsum.photos/1000/1200")] bg-center bg-cover bg-no-repeat'
      ></div>
      <div className="grid bg-slate-50 place-items-center min-h-screen">
        <Form
          className="flex flex-col items-center gap-5 card bg-base-100 w-96 shadow-xl p-5"
          method="post"
        >
          <h1 className="text-5xl font-semibold">Login</h1>
          <FormInput type="email" name="email" labelText="email"></FormInput>
          <FormInput
            type="password"
            name="password"
            labelText="password"
          ></FormInput>
          <div className="w-full">
            {!isPending && (
              <button className="btn btn-primary btn-block">Login</button>
            )}
            {isPending && (
              <button disabled className="btn btn-primary btn-block">
                Loading ....
              </button>
            )}
          </div>
          <div className="text-center">
            Already registered ?{" "}
            <Link className=" text-primary" to="/register">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
