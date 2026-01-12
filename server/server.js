import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
const app = express();

app.use(express.json());
dotenv.config();
// app.use(cors());

app.use(cors({
  origin: "*"
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/uploads", express.static(path.resolve("uploads")));



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







