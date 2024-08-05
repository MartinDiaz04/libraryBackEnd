import "dotenv/config";
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.route";
import bookRoutes from "./routes/book.route";
import { checkDbConnection } from "./utils/checkDbConnection";

checkDbConnection();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(cors())
app.use(adminRoutes);
app.use(bookRoutes);

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
})