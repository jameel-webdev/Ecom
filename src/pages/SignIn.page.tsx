// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
// import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducer/userReducer";
import { responseToast } from "../utils/features";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [newuser, setNewUser] = useState(false);
  const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
  const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;
  const [login] = useLoginMutation();
  const loginHandler = async () => {
    try {
      const res = await login({
        name,
        email,
        photo: gender === "male" ? maleProfilePic : femaleProfilePic,
        _id: uuid(),
        gender,
        role: "user",
        dob,
      });
      if ("data" in res) {
        dispatch(userExist(res.data.newUser));
        responseToast(res, navigate, "/");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("SignIn failed");
    }
  };

  return (
    <div className="signin">
      <button onClick={() => setNewUser(!newuser)}>
        {newuser ? "OldUser" : "NewUser"}
      </button>

      {newuser ? (
        <main>
          <h1 className="heading">SignIn with Email</h1>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Choose Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <button onClick={loginHandler}>
              <span>Sign in</span>
            </button>
          </div>
        </main>
      ) : (
        <main>
          <h1 className="heading">SignIn with Email</h1>
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button onClick={loginHandler}>
              <span>Sign in</span>
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default SignIn;
