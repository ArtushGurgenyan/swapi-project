import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../hooks/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      console.log("You authoirzed:", user.email);
      navigate("/characters");
    } catch (error) {
      console.error("Error authorized:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md px-8 py-10">
        <div className="mb-4">
          <p className="text-gray-600 text-center">
            Sign in with one of the following providers
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleGoogleLogin}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full flex items-center space-x-2"
            >
              <FaGoogle />
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
