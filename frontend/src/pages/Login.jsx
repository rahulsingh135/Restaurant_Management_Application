import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cLogo from "/cLogo.png";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", role: "" });

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setData(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.error("when fetching user data", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const showPwdIcon = () => {
    setShowPassword((prev) => !prev);
  };

  // const validEmail = "rahul";
  // const validPassword = "1234";

  const checkPwdUser = (email, password) => {
    return data.find(
      (user) =>
        (user.email === email || user.username === email) &&
        user.password === password
    );
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const user = checkPwdUser(email, password);
    if (user) {
      const loggedInUser = { name: user.name, role: user.role };

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("isLoggedIn", "true");

      onLogin();
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login bg-mainBg min-h-screen login flex justify-center items-center">
      <div className="bg-white shadow-md login-container border-l border-mainColor p-8 pt-8 pb-10 rounded-xl w-full max-w-sm ">
        <div className="flex justify-center">
          <img src={cLogo} alt="Logo" className="w-30 h-20" />
        </div>
        <h3 className="text-xl font-sans font-bold text-center text-mainColor p-3">
          Sign in to your account
        </h3>
        <form onSubmit={loginSubmit} className="space-y-6">
          <div className="relative w-full max-w-sm">
            <span className="absolute flex items-center text-gray-500 inset-y-0 pl-3">
              <FaUser />
            </span>
            <input
              type="text"
              value={email}
              onChange={handleEmail}
              className="border w-full pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-mainColor"
              placeholder="Username or email"
              required
            />
          </div>
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaLock />
            </span>
            <input
              type={showPassword ? "password" : "text"}
              value={password}
              onChange={handlePassword}
              placeholder="Password"
              required
              className="pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-mainColor rounded-md border"
            />
            <button
              type="button"
              onClick={showPwdIcon}
              className="absolute text-xl text-gray-500 flex items-center inset-y-0 right-0 pr-5"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="size-3 me-2" />
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="login-btn w-full rounded-md cursor-pointer bg-mainColor text-white py-2 rounded-2 hover:scale-103  transition-transform duration-200 "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
