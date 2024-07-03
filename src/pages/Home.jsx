import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { FormInput, FormCheckbox } from "../components";
import { Form, useActionData } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc , deleteDoc , doc } from "firebase/firestore";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  return { title, completed };
};

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data: todos } = useCollection("todos", ["uid", "==", user.uid]);
  const userData = useActionData()

  useEffect(() => {
    if(userData) {
      const newDoc = {
        ...userData,
        uid:user.uid
      }
      if(addDoc(collection(db , 'todos') , newDoc)) {
        toast.success("Todo Added Successfully ✋😀")
      }
    }
  } , [userData])

  const deleteDocument = (id) => {
    if( deleteDoc(doc(db , 'todos' , id))){
      toast.success('Todo Deleted Successfully ✋😀')
    }
    }
  return (
    <div className="align-elements">
      <div className="grid grid-cols-2">
        <div>
          {todos &&
            todos.map((todo) => {
              return (
                <div key={todo.id} className=" shadow-xl mr-28 bg-slate-600 text-slate-50 text-2xl rounded p-3 mt-9 flex mb-3 gap-3 align-center justify-between">
                  <h3>{todo.title}</h3>
                  <button onClick={() => deleteDocument(todo.id)} className="btn btn-error text-slate-50">Delete</button>
                </div>
              );
            })}
        </div>
        <div className="pt-10">
          <Form
            className="flex flex-col items-center gap-5 card bg-base-100 w-96 shadow-xl p-5"
            method="post"
          >
            <h1 className="text-3xl font-semibold">Add New Todo</h1>
            <FormInput type="text" name="title" labelText="title"></FormInput>
            <FormCheckbox name="completed"></FormCheckbox>
            <div className="w-full">
              <button className="btn btn-primary btn-block">Add</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Home;
