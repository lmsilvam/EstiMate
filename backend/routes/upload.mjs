// backend/routes/upload.mjs
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { estimateCost } from '../utils/estimateCost.mjs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  const model = req.body.model || 'gpt-4';
  const filePath = req.file.path;

  try {
    const rawText = await fs.readFile(filePath, 'utf-8');
    const estimate = estimateCost(rawText, model);
    await fs.unlink(filePath); // cleanup temp file
    res.json(estimate);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process file.' });
  }
});

export default router;