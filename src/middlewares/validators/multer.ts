import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';

// Configuración de Multer
let listNames:[]
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/img/uploads')); // Ajusta el directorio según sea necesario
  },
  filename: (req, file, cb) => {
    const order = req.body.orderId
    const nameArchive = `${order}-${file.originalname}`

    
    cb(null,nameArchive );
  }
  
});

// Filtro para validar el tipo de archivo
const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  // Aceptar imágenes y PDF
  if (file.mimetype.endsWith('.png') || file.mimetype.endsWith('.jpg') || file.mimetype.endsWith('.jpeg') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ 
  storage: storage ,
  limits: {
    fileSize: 1024 * 1024 * 200 // Limite de tamaño de archivo: 200MB
  },
  // fileFilter: fileFilter

});

// Middleware para manejo de archivos
export const archivesManager = (req: Request, res: Response, next: NextFunction) => {
  upload.array('files')(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // Error generado por Multer
      return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      // Error genérico
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Continuar con el siguiente middleware
    next();
  });
};