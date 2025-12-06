import { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";

export default (rootDirectory: string): Router | Router[] => {
  const router = Router();

  const storeCorsOptions = {
    origin: process.env.STORE_CORS?.split(",") || ["http://localhost:3000"],
    credentials: true,
  };

  const adminCorsOptions = {
    origin: process.env.ADMIN_CORS?.split(",") || ["http://localhost:7000", "http://localhost:9000"],
    credentials: true,
  };

  router.use(bodyParser.json());

  // Store routes
  router.use("/store", cors(storeCorsOptions));
  
  // Admin routes
  router.use("/admin", cors(adminCorsOptions));

  return router;
};
