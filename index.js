const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 5000;


const MONGODB_URI = 'mongodb+srv://tyagiaakashmypc345:TZTaP0ZX3ceXGEL9@cluster0.3emlqz1.mongodb.net/' // Replace with your MongoDB connection string

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use('/api/questions', questionRoutes);
if(process.env.NODE_ENV !== 'production')
{
  app.use(express.static(("client/dist")))
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
