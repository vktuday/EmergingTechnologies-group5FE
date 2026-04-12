import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";

const CURRENT_USER = gql`
  query {
    currentUser {
      username
      email
      role
    }
  }
`;

const ADD_REQUEST = gql`
  mutation AddRequest(
    $parentName: String!
    $childName: String!
    $childAge: Int!
    $startDate: String!
    $location: String!
  ) {
    addRequest(
      parentName: $parentName
      childName: $childName
      childAge: $childAge
      startDate: $startDate
      location: $location
    ) {
      id
      parentName
      childName
      childAge
      startDate
      location
    }
  }
`;

export default function Dashboard({ setPage }) {
  const { loading, error, refetch } = useQuery(CURRENT_USER);

  const [addRequest] = useMutation(ADD_REQUEST);

  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    startDate: "",
    location: "",
  });

  const [submittedRequest, setSubmittedRequest] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await refetch();

        if (result.data?.currentUser) {
          setUsername(result.data.currentUser.username);
          setEmail(result.data.currentUser.email);

          localStorage.setItem("username", result.data.currentUser.username);
          localStorage.setItem("email", result.data.currentUser.email);
        }
      } catch (err) {
        localStorage.clear();
        setPage("login");
      }
    };

    fetchUser();
  }, [refetch, setPage]);

  useEffect(() => {
  if (!localStorage.getItem("token")) {
    setPage("login");
  }
}, [setPage]);

  if (loading && !username) return <p>Loading...</p>;

  if (error) {
    localStorage.clear();
    setPage("login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addRequest({
        variables: {
          parentName: formData.parentName,
          childName: formData.childName,
          childAge: parseInt(formData.childAge),
          startDate: formData.startDate,
          location: formData.location,
        },
      });

      
      setSubmittedRequest(res.data.addRequest);

      setFormData({
        parentName: "",
        childName: "",
        childAge: "",
        startDate: "",
        location: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error submitting request");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Welcome, {username}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Status:</strong> Logged in successfully</p>

      <div style={styles.card}>
        <h3>Daycare Waitlist Request Form</h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="parentName" placeholder="Parent Name" value={formData.parentName} onChange={handleChange} required style={styles.input} />
          <input name="childName" placeholder="Child Name" value={formData.childName} onChange={handleChange} required style={styles.input} />
          <input type="number" name="childAge" placeholder="Child Age" value={formData.childAge} onChange={handleChange} required style={styles.input} />
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required style={styles.input} />
          <input name="location" placeholder="Preferred Location" value={formData.location} onChange={handleChange} required style={styles.input} />

          <button type="submit" style={styles.button}>
            Submit Request
          </button>
        </form>
      </div>

      {submittedRequest && (
        <div style={styles.resultCard}>
          <h3>Submitted Request</h3>
          <p><strong>Parent Name:</strong> {submittedRequest.parentName}</p>
          <p><strong>Child Name:</strong> {submittedRequest.childName}</p>
          <p><strong>Child Age:</strong> {submittedRequest.childAge}</p>
          <p><strong>Preferred Start Date:</strong> {submittedRequest.startDate}</p>
          <p><strong>Preferred Location:</strong> {submittedRequest.location}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "20px auto", padding: "20px" },
  card: { marginTop: "20px", padding: "20px", borderRadius: "10px", backgroundColor: "#f4f8fb" },
  resultCard: { marginTop: "20px", padding: "20px", borderRadius: "10px", backgroundColor: "#eefaf0" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc" },
  button: { padding: "10px", borderRadius: "6px", border: "none", backgroundColor: "#3498db", color: "#fff" },
};