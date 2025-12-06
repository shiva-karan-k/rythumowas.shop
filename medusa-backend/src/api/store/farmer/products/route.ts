import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { FarmerProduct } from "../../../../models/farmer-product";

export default async (req: Request, res: Response) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const farmerProductRepo = manager.getRepository(FarmerProduct);
  
  // Get farmer ID from authenticated user
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Get all products for this farmer
    const products = await farmerProductRepo.find({
      where: { farmer: { user_id: userId } },
      relations: ["product", "farmer"],
      order: { created_at: "DESC" },
    });
    
    res.json({ products });
  } else if (req.method === "POST") {
    // Create new product for farmer
    const productData = req.body;
    const farmerProduct = farmerProductRepo.create(productData);
    const result = await farmerProductRepo.save(farmerProduct);
    res.json({ product: result });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
