import createExpressApp from "./config/express";
import http from "http";
import connectDB from "./config/database";

// Create express app
const app = createExpressApp();

// Create http server
const PORT = 8080;
const server = http.createServer(app);

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
