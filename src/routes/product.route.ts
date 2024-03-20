import express from "express";
import { isValidated, validateTokenMiddleware } from "../middlewares/validators/validators";
import { Product } from "../services/product.endpoint";
import multer from "multer";

export const router = express.Router()
const endpoint = new Product()

router.all('/create-product',  endpoint.createProduct)
router.all('/modify-product', endpoint.updateProduct)
router.all('/modify-product-status', endpoint.updateProductStatus)
router.all('/get-all',endpoint.getAllProduct)
router.all('/get-all-filters',endpoint.getAllFilters)


const storage = multer.diskStorage({
    destination: 'C:/Users/kvn-p/Documents/GitHub/grema_store_backend/src/uploads',
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Route for uploading multiple images
  router.post('/upload', upload.array('images', 5), (req, res) => {
    // 'images' should be the name attribute in your form input for multiple file uploads
    // req.files contains an array of uploaded files
  
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // const uploadedFiles = req.files.map((file:any) => {
    //   return {
    //     filename: file.filename,
    //     originalname: file.originalname,
    //     path: file.path
    //   };
    // });
  
    // You can process the uploaded files here (e.g., save to database, etc.)
  
    res.send('Files uploaded successfully.');
  });

