import { Request, Response, NextFunction } from 'express';
import { cloudinaryUpload } from '../../utils/upload/cloudAry_config';

export const uploadImgManager = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let urlList: string[] = [];

    if (req.files && req.files.length !== 0) {
      // Asegúrate de que estás subiendo imágenes
      const files = req.files as Express.Multer.File[];
      const validFiles = files.filter(file => file.mimetype.startsWith('image/'));

      if (validFiles.length === 0) {
        return res.status(400).json({ message: 'No se encontraron imágenes válidas.' });
      }

      // Subir imágenes válidas a Cloudinary
      urlList = await cloudinaryUpload(validFiles);
      console.log(urlList);
    } else {
      urlList.push("https://res.cloudinary.com/denqtcsyy/image/upload/f_auto,q_auto/v1/users-profile/a0tysxy6wukagduank4k");
      console.log('No hay imágenes');
    }

    const body = req.body
    req.body = {
      ...body,
      imgs: urlList,
    };

    // Continuar con el siguiente middleware
    next();
  } catch (error) {
    console.error('Error subiendo archivos:', error);
    return res.status(500).json({ message: 'Error subiendo archivos.' });
  }
};