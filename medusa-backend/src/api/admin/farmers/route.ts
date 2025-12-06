import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { Farmer } from "../../../models/farmer";

export default async (req: Request, res: Response) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const farmerRepo = manager.getRepository(Farmer);

  if (req.method === "GET") {
    const farmers = await farmerRepo.find({
      order: { created_at: "DESC" },
    });
    res.json({ farmers });
  } else if (req.method === "POST") {
    const farmerData = req.body;
    const farmer = farmerRepo.create(farmerData);
    const result = await farmerRepo.save(farmer);
    res.json({ farmer: result });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
