// backend/routes/query.mjs
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = express.Router();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

router.post('/query', async (req, res) => {
  const { prompt, model = 'gpt-4' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: model === 'gpt-3.5' ? 'gpt-3.5-turbo' : 'gpt-4-0125-preview',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to call OpenAI API' });
  }
});

export default router;