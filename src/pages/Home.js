export default function Home({ setPage }) {
  return (
    <div>
      <h2>Welcome to Daycare Waitlist System</h2>
      <p>Please login or register to continue</p>

      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("register")}>Register</button>
    </div>
  );
}