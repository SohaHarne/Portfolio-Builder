import express from "express";
import Profile from "../models/profile.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;