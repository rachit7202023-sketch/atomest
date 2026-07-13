import express from 'express';
import cors from 'cors';
import generateKitHandler from '../api/generate-kit.js';
import waitlistHandler from '../api/waitlist.js';
import processCandidatesHandler from '../api/process-candidates.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));

// Helper to adapt Express req/res to Vercel signature
const createVercelAdapter = (handler: any) => async (req: express.Request, res: express.Response) => {
  try {
    // Vercel handlers expect req.body to be parsed, which express.json() does.
    // They also use res.status().json() which Express supports natively.
    await handler(req, res);
  } catch (err) {
    console.error("API Server Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.end();
    }
  }
};

app.post('/api/generate-kit', createVercelAdapter(generateKitHandler));
app.options('/api/generate-kit', createVercelAdapter(generateKitHandler));

app.post('/api/waitlist', createVercelAdapter(waitlistHandler));
app.options('/api/waitlist', createVercelAdapter(waitlistHandler));

app.post('/api/process-candidates', createVercelAdapter(processCandidatesHandler));
app.options('/api/process-candidates', createVercelAdapter(processCandidatesHandler));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});
