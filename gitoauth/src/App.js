import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function App() {
  const client_id = "1bf22324de569479bbfb";
  const [rerander, setrerander] = useState(false);
  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const code = urlParams.get("code");
    console.log(code);

    const getaccessToken = () => {
      fetch(`http://localhost:4000/gettoken?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("accessToken", data.access_token);
          //  localStorage.setItem("accessToken",data.access_token)
          setrerander(!rerander);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (code && localStorage.getItem("accessToken") === null) {
      getaccessToken(); // Call the function here
    }
  }, []); // Empty dependency array to run the effect only once

  const getUserData = () => {
    fetch(`http://localhost:4000/getUserdata`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleclick = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    );
  };

  return (
    <div className="App">
      {localStorage.getItem("accessToken") ? (
        <>
          <h2>We have the access token</h2>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              setrerander(!rerander);
            }}
          >
            Logout
          </button>
          <h3>GET THE USER DATA</h3>
          <button onClick={getUserData}>GET USER DETAILS</button>
        </>
      ) : (
        <>
          <button onClick={handleclick}>Login With Github</button>
        </>
      )}
    </div>
  );
}

export default App;
