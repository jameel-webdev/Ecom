import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  //   const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
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
          <p>Already have an account?</p>
          <button>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
