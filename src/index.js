import dotenv from "dotenv";
import connectDB from "./db/database.js";
import { app } from "./app.js";

dotenv.config({
   path: "./.env",
});

const port = process.env.PORT || 8000;

connectDB()
   .then(() => {
      console.log(`Connection is successfully done`);
      app.on('error', (err) => {
         console.log(`Server is failed to connect:${err}`)
      })
      app.listen(port, () => {
         console.log(`Server is connected on port : ${port}`);
      })
   })
   .catch((error) => {
      console.log("Error: connection is failed");
   });
