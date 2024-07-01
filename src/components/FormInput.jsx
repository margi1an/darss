import React from "react";

function FormInput({ name, labelText, type }) {
  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text capitalize">{labelText}</span>
        </div>
        <input 
          type={type}
          name={name}
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>{" "}
    </>
  );
}

export default FormInput;
