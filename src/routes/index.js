import { Router } from "express";
import apiRoutes from "./api/index.js";

const router = Router();

// Define the base route for API
router.use("/api", apiRoutes);

export default router;