import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/users/register`, userData);
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. please try again");
      }
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={registerUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={handlerInputChange}
            autoFocus
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handlerInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handlerInputChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={handlerInputChange}
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
