import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/mongo";
import adminRoutes from "./routes/admin.route";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(cors())
app.use(adminRoutes);
db().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});