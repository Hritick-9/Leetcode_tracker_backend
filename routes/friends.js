import express from 'express';
import getRecentSubmissions from '../services/scrapeSubmissions.js';

const router = express.Router();

router.post('/submissions', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const data = await getRecentSubmissions(username);
    res.json({ submissions: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

export default router;
