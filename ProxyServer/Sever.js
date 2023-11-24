const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const CLIENT_ID = "1bf22324de569479bbfb";
const client_SECRET = process.env.client_secret;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/gettoken", (req, res) => {
  // client_id, client_sec, code
  const { code } = req.query;
  fetch(
    `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${client_SECRET}&code=${code}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((re) => re.json())
    .then((data) => res.json(data))
    .catch((error) => {
      console.error("Error fetching GitHub token:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


app.get("/getUserdata",(req,res)=>{
  fetch(`https://api.github.com/user`,{
    method:"GET",
    headers:{
      'Authorization':req.get("Authorization")
    }
  }).then(res=>res.json())
  .then(data=>res.json(data))
  .catch(err=>console.log(err))
})

app.listen(4000, () => {
  console.log("Proxy running at http://localhost:4000");
});
