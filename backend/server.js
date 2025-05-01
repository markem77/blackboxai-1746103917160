const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('E-commerce backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
