import { useSelector , useDispatch } from "react-redux";
import './Navbar.css'
import { NavLink } from "react-router-dom";


//firebase
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { logout } from "../app/userSlice";

function Navbar() {
  const dispatch = useDispatch()
  const handleOut = async () => {
    try {
      const out = await signOut(auth);
      toast.success("LogOut successfully ✔✋");
      dispatch(logout())
    } catch (error) {
      toast.error('LogOut failed ✋')
    }
  };

  const { user } = useSelector((state) => state.user);
  return (
    <header className="bg-base-200">
      <nav className="navbar align-elements">
        <div className="navbar-start">
          <h1 className="text-3xl font-bold">My Todo</h1>
        </div>
        <div className="navbar-center flex gap-3">
          <NavLink className="btn " to = '/'>Home</NavLink>
          <NavLink className="btn " to = '/about'>About</NavLink>
          <NavLink className="btn " to = '/products'>Products</NavLink>
        </div>
        <div className="navbar-end">
          <div className="flex gap-4 items-center">
            <h4>hi ✋ {user.displayName}</h4>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                <img
                  className=""
                  src={
                    user.photoURL
                      ? user.photoURL
                      : `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                  }
                  alt=""
                />
              </div>
            </div>
            <button onClick={handleOut} className="btn btn-primary">
              Logout ✋
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
