import express from "express";
const app = express();
// parse incoming requests data as JSON
app.use(express.json());
// define a route handler for the root path
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" });
});
// start the server on port 3000
app.listen(3000, () => {
    console.log("PORT 3000");
});
