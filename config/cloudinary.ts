import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dinzr4nmc", // TODO: Ganti dengan cloudname-mu
  api_key: "566287321414166", // TODO: Ganti dengan API Key-mu
  api_secret: "Aut93hG1oT-A2LV9RMNwJTEAvoo", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

export default cloudinary;