const express = require('express');
const router = express.Router();

// Mock payment link URLs for demonstration
const paymentLinks = {
  paypal: 'https://www.paypal.com/pay',
  moov: 'https://www.moov.com/pay',
  orange: 'https://www.orange.com/pay',
  mtn: 'https://www.mtn.com/pay'
};

// Endpoint to get payment link by provider
router.get('/:provider', (req, res) => {
  const provider = req.params.provider.toLowerCase();
  if (paymentLinks[provider]) {
    res.json({ url: paymentLinks[provider] });
  } else {
    res.status(404).json({ error: 'Payment provider not supported' });
  }
});

module.exports = router;
