import { useState } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";

function App() {
  const [payload, setPayload] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.form[0].value);
    console.log(e.target.form[1].value);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: e.target.form[0].value,
      password: e.target.form[1].value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
      requestOptions
    )
      .then((response) => response.text())
      .then((token) => setPayload(jwtDecode(token)))
      .catch((error) => console.error(error));
  };
  return (
    <>
      {payload && <h3>{payload._id}</h3>}
      <h1>Login</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div>
          <label htmlFor="emailInput">Email:</label>
          <input type="email" id="emailInput" />
        </div>

        <div>
          <label htmlFor="passwordInput">Password:</label>
          <input type="password" id="passwordInput" />
        </div>
        <button type="submit" onClick={handleSubmit}>
          SUBMIT
        </button>
      </form>
    </>
  );
}

export default App;
