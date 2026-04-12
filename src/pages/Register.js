import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export default function Register({ setPage }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const [register] = useMutation(REGISTER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await register({ variables: form });

      localStorage.setItem("token", res.data.register.token);
      localStorage.setItem("username", res.data.register.user.username);
      localStorage.setItem("email", res.data.register.user.email);

      setPage("dashboard");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit">Register</button>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <br /><br />
      <button type="button" onClick={() => setPage("home")}>
        Back
      </button>
    </form>
  );
}