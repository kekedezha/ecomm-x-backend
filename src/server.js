import app from "./index.js"; // Import Express app
import "dotenv/config"; // Initialize .env variables from .env file

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT}! Initial set up for backend server.`
  );
});

export default server; // Export the server for testing cleanup
