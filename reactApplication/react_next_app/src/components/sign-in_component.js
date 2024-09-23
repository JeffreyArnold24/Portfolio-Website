import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (username, password) => {
    console.log("Reached 1")
    e.preventDefault();
    return (<p></p>);

    /*
    // Send the username and password to the API server
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log("Reached 2")
    if (response.ok) {
      // If login successful, mark the user as authenticated
      setIsAuthenticated(true);
    } else {
      // Display an error message if login fails
      setErrorMessage(data.message || "Login failed. Please try again.");
    }*/
  };

  if (isAuthenticated) {
    console.log("Authenticated")
    return <div>Login successful! Welcome, {username}!</div>;
  }
  /*console.log("Not Authenticated")
  return (
    <div>
      <h2>Sign In</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );*/
}