import express, { Request, Response } from "express";
import { AnyModel } from "../models/anyModel";
import { requireAuth } from "@vb430/common";

const router = express.Router();

// GET route to fetch documents by userId
router.get("/api/anymodel", requireAuth,async (req: Request, res: Response) => {
  
    if (!req.currentUser?.id) {
      return res.status(400).send({ error: "userId is required" });
    }
  
    try {
      // Find all documents with the specified userId
      const documents = await AnyModel.find({ userId:req.currentUser?.id });
  
      if (documents.length === 0) {
        return res.status(404).send({ error: "No documents found for this userId" });
      }
  
      res.status(200).send(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).send({ error: "An error occurred while fetching documents" });
    }
  });
  
  export { router as GetAnyModelRouter };