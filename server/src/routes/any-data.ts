import express, { Request, Response } from "express";
import { AnyModel } from "../models/anyModel";

const router = express.Router();

router.post("/api/anymodel", async (req: Request, res: Response) => {
  const { id, userId, ...otherFields } = req.body;

  if (id) {
    const updatedDocument = await AnyModel.findByIdAndUpdate(
      id,
      { userId, ...otherFields },
      { new: true, runValidators: true }
    );

    if (!updatedDocument) {
      return res.status(404).send({ error: "Document not found" });
    }

    res.status(200).send(updatedDocument);
  } else {
    // If `id` is not provided, create a new document
    const anyModelInstance = AnyModel.build({ userId, ...otherFields });
    await anyModelInstance.save();
    res.status(201).send(anyModelInstance);
  }
});

export { router as AnyModelRouter };
