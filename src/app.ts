import "dotenv/config";
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.route";
import bookRoutes from "./routes/book.route";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(cors())
app.use(adminRoutes);
app.use(bookRoutes);
console.log('Database connected successfully');