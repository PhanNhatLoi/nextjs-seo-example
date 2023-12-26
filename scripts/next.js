require("dotenv").config();
const next = require("next");
const http = require("http");
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Sử dụng Promise để đóng kết nối
const gracefulShutdown = () => {
  return mongoose.connection
    .close()
    .then(() => {
      console.log("MongoDB connection closed");
    })
    .catch((err) => {
      console.error("Error closing MongoDB connection:", err);
    });
};

// Đóng kết nối khi ứng dụng kết thúc (Ctrl+C)
process.on("SIGINT", () => {
  gracefulShutdown().then(() => process.exit(0));
});

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    // Handle API routes
    if (req.url.startsWith("/api")) {
      // Your API handling logic here
    } else {
      // Handle Next.js routes
      return app.getRequestHandler()(req, res);
    }
  });
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
