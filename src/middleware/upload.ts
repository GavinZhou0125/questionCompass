import { devConfig } from "../config/config";
import { v4 } from "uuid";
import multer from "multer";
import fileTable from "../model/fileTable";
import redisClient from "../cache";

export const storage = multer.diskStorage({
  destination: devConfig.upload.path,
  filename: async function(req, file, cb) {
    const fileName = file.originalname;
    const fileExt = fileName.substring(fileName.lastIndexOf("."));
    const SALT = v4();
    const newFileName = `${SALT}${fileExt}`;

    cb(null, newFileName);
  }
});

const upload = multer({ storage: storage });

export default upload;
