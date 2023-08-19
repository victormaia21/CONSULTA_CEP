import { Request } from "express";
import multer from "multer";
import path from "path";
import { File } from "buffer";

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    console.log(req)

    if (req.baseUrl.includes('usuarios')) {
      folder = "usuarios";
    } else if(req.baseUrl.includes('servicos')) {
      folder = 'serviços';
    }
    cb(null, `public/imagens/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|PNG)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(null, true);
  },
});

export { imageUpload };
