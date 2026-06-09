import express from "express";
import Profile from "../models/profile.js";


const router = express.Router();

// ✅ ADD EDUCATION (correct + safe)
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updated = await Profile.findOneAndUpdate(
      { userId },
      { $push: { education: req.body } },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET EDUCATION
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId });

    res.json(profile?.education || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ADD EXPERIENCE
router.put("/experience/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updated = await Profile.findOneAndUpdate(
      { userId },
      { $push: { experience: req.body } },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/experience/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId });

    res.json(profile?.experience || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:userId/:index", async (req, res) => {
  try {
    const { userId, index } = req.params;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    profile.education.splice(index, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// ADD EXPERIENCE
router.put("/experience/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updated = await Profile.findOneAndUpdate(
      { userId },
      { $push: { experience: req.body } },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET EXPERIENCE
router.get("/experience/:userId", async (req, res) => {
  try {
    console.log("Experience route hit");
    console.log(req.params.userId);

    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    console.log(profile);

    res.json(profile?.experience || []);
  } catch (err) {
    console.log("GET EXPERIENCE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// DELETE EXPERIENCE
router.delete("/experience/:userId/:index", async (req, res) => {
  try {
    const { userId, index } = req.params;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    profile.experience.splice(index, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.put("/project/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updated = await Profile.findOneAndUpdate(
      { userId },
      { $push: { projects: req.body } },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/project/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    res.json(profile?.projects || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/project/:userId/:index", async (req, res) => {
  try {
    const { userId, index } = req.params;

    const profile = await Profile.findOne({ userId });

    profile.projects.splice(index, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/skill/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updated = await Profile.findOneAndUpdate(
      { userId },
      {
        $push: {
          skills: req.body.skill,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.get("/skill/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    res.json(profile?.skills || []);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.delete("/skill/:userId/:index", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    if (!profile) {
      return res.json({
        skills: [],
      });
    }

    profile.skills.splice(
      Number(req.params.index),
      1
    );

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.put("/certificate/:userId", async (req, res) => {
  console.log("CERTIFICATE ROUTE HIT");
console.log(req.params.userId);
console.log(req.body);
  try {
    const updated = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $push: {
          certificates: {
            url: req.body.fileName,
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.get("/certificate/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    res.json(profile?.certificates || []);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.delete(
  "/certificate/:userId/:index",
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        userId: req.params.userId,
      });

      profile.certificates.splice(
        Number(req.params.index),
        1
      );

      await profile.save();

      res.json(profile);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

export default router;