import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { Farmer } from "../../../../models/farmer";

export default async (req: Request, res: Response) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const farmerRepo = manager.getRepository(Farmer);
  
  // Get farmer ID from authenticated user (implement auth middleware)
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    const farmer = await farmerRepo.findOne({ 
      where: { user_id: userId } 
    });
    
    if (!farmer) {
      return res.status(404).json({ message: "Farmer profile not found" });
    }
    
    res.json({ farmer });
  } else if (req.method === "PUT") {
    const farmer = await farmerRepo.findOne({ 
      where: { user_id: userId } 
    });
    
    if (!farmer) {
      return res.status(404).json({ message: "Farmer profile not found" });
    }
    
    farmerRepo.merge(farmer, req.body);
    const result = await farmerRepo.save(farmer);
    res.json({ farmer: result });
  }
};
