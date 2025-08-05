const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');
const User = require('./models/User');
const multer = require('multer');
const alertRoutes = require('./routes/alert');
const smsAlertRoutes = require('./routes/smsAlert');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

app.use('/api/alerts', alertRoutes);
app.use('/api/sms', smsAlertRoutes);

app.post('/api/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.listen(5000, async () => {
  console.log('Server running on port 5000');
  await sequelize.sync();
});