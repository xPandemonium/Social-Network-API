import express from 'express';
import connectDB from './connections/db_connection.js';
import routes from './routes/index.js';

// Connect to MongoDB
await connectDB()

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});