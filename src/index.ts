import app from "./app";
import { connectDB } from "./db";
require("dotenv").config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

connectDB();
