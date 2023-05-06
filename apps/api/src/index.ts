import api from "./api.mts";

const port = process.env.PORT || 3000;

api.listen(port, () => {
  console.log(`Running on ${port}`);
});
