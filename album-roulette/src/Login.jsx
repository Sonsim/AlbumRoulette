import { useState } from "react";
import RegisterNew from "./Register";
import axios from "axios";
import { createHash } from "crypto";
import { useNavigate } from "react-router-dom";
import Background from "./Background";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [NewUser, setNewUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [IsInvalid, setIsInvalid] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo((values) => ({
      ...values,
      [name]: value,
    }));
  };
  const Login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5174/api/get/user-login", {
        user: userInfo.username,
        pass: hashpassword(userInfo.password),
      })
      .then((response) => {
        if (
          response.data.recordset.length > 0 &&
          response.data.recordset.length < 2
        ) {
          setLoggedIn(response.data.recordset[0].Username);
          localStorage.setItem("user", response.data.recordset[0].Username);
          localStorage.setItem("userID", response.data.recordset[0].UserId);
          navigate("/home");
        } else {
          console.log("Får ingen token");
          setIsInvalid(true);
        }
      });
  };
  const HandleRegister = () => {
    setNewUser(true);
  };

  const hashpassword = (string) => {
    return createHash("sha256").update(string).digest("hex");
  };

  return (
    <>
      {!NewUser ? (
        <div className="flex items-center justify-center h-5/6 relative z-30">
          <div className="flex flex-col items-center justify-center h-72 w-72  rounded-lg mt-10 bg-white shadow-2xl relative z-30">
            <form className="flex flex-col">
              <label className="text-black">Username:</label>{" "}
              <input
                name="username"
                type="text"
                className=""
                onChange={handleChange}
              />
              <label className="text-black">Password:</label>
              <input
                name="password"
                type="password"
                className=""
                onChange={handleChange}
              />
              {IsInvalid ? (
                <p className="text-red-600">Invalid Username or Password</p>
              ) : (
                <p></p>
              )}
              <button
                className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-48 ml-5 my-1 hover:bg-green-700"
                onClick={HandleRegister}
              >
                New User?
              </button>
              <button
                className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-48 ml-5 my-1 hover:bg-green-700"
                onClick={Login}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <RegisterNew
          hashFunction={hashpassword}
          setLogg={setLoggedIn}
          newuser={NewUser}
          setnewuser={setNewUser}
        />
      )}
    </>
  );
}
