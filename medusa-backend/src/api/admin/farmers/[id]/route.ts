import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { Farmer } from "../../../../models/farmer";

export default async (req: Request, res: Response) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const farmerRepo = manager.getRepository(Farmer);
  const { id } = req.params;

  if (req.method === "GET") {
    const farmer = await farmerRepo.findOne({ where: { id } });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.json({ farmer });
  } else if (req.method === "PUT") {
    const farmer = await farmerRepo.findOne({ where: { id } });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    farmerRepo.merge(farmer, req.body);
    const result = await farmerRepo.save(farmer);
    res.json({ farmer: result });
  } else if (req.method === "DELETE") {
    await farmerRepo.delete(id);
    res.json({ id, deleted: true });
  }
};
