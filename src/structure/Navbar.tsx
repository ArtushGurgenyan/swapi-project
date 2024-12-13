import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(user?.photoURL);
  const handleLogOut = async () => {
    try {
      await user?.delete();
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="h-full w-72 bg-gray-800 text-white flex flex-col items-start p-4">
        <div className="flex flex-col items-center justify-center text-center mx-auto mt-10">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Logo"
              className="h-16 w-16 mb-4 rounded-full"
            />
          ) : null}
          <h1 className="text-white text-xl font-semibold">
            {user?.displayName}
          </h1>
        </div>
        <nav className="flex flex-col gap-4 w-full mt-20">
          <button className="w-full">
            <Link
              to="/characters"
              className="w-full block px-4 py-2 text-left rounded-md bg-gray-700 hover:bg-gray-600 transition"
            >
              Characters
            </Link>
          </button>
          <button className="w-full">
            <Link
              to="/favourites"
              className="w-full block px-4 py-2 text-left rounded-md bg-gray-700 hover:bg-gray-600 transition"
            >
              Favourites
            </Link>
          </button>
          <button
            onClick={handleLogOut}
            className="w-full block px-4 py-2 text-left rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            Log out
          </button>
        </nav>
      </div>
      <div className="h-full flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
