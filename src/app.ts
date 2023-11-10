import express, { Application } from 'express';
import CarsHandler from './handlers/cars';
import uploadFileUtil from "./utils/uploadFile";
import fileUploadsCloudinary from "./utils/fileUploadsCloudinary";

const app: Application = express();
const PORT: number = 8081;

// Add middleware to get the body from the request
app.use(express.json());

// Init handlers
const usersHandler = new CarsHandler();

// Define routes
app.post(
  '/api/cars', 
  fileUploadsCloudinary.single('profile_picture_url'),
  usersHandler.createCar);

app.get('/api/cars', usersHandler.getCars);
app.get('/api/cars/:id', usersHandler.getCarsById);

app.patch(
  "/api/cars/:id",
  uploadFileUtil.single("profile_picture_url"),
  usersHandler.updateCarById
);

app.delete("/api/cars/:id", usersHandler.deleteCarById);


app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);  
});