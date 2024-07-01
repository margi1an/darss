//rrd
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Login, Register } from "./pages";
import MainLayout from "./layouts/MainLayout";
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { ProtectedRoutes } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { login, isAuthChange } from "./app/userSlice";
import About from "./pages/About";
import Products from "./pages/Products";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthReady } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout></MainLayout>
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path:'/about',
          element: <About></About>
        },
        {
          path:'/products',
          element: <Products></Products>
        }
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/"></Navigate> : <Login></Login>,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/"></Navigate> : <Register></Register>,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange());
    });
  }, []);
  return (
    <>{isAuthReady && <RouterProvider router={routes}></RouterProvider>}</>
  );
}

export default App;
