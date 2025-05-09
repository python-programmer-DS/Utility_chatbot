import { Router } from 'express';
import { tenants } from '../config/tenants';
import { fetchCopilotToken } from '../utils/fetchToken';

const router = Router();

router.get('/', (req, res) => {
  void (async () => {
    const tenantId = req.query.tenant as string;
    const config = tenants[tenantId];

    if (!tenantId || !config) {
      return res.status(400).json({ error: 'Invalid or missing tenant' });
    }

    try {
      const token = await fetchCopilotToken(config.tokenUrl);
      return res.json({ token });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch token' });
    }
  })();
});

export default router;
