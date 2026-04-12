import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [login] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await login({ variables: { email, password } });

      localStorage.setItem("token", res.data.login.token);
      localStorage.setItem("username", res.data.login.user.username);
      localStorage.setItem("email", res.data.login.user.email);

      setPage("dashboard");
    } catch (err) {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <br /><br />
      <button type="button" onClick={() => setPage("home")}>
        Back
      </button>
    </form>
  );
}