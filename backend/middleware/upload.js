import multer from "multer";
import path from "path";
import fs from "fs";

const tmpDir = path.resolve("tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    try {
      const { developer_id, developer_name } = req.query;

      if (!developer_id || !developer_name) {
        return cb(
          null,
          Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            "-" +
            file.originalname
        );
      }

      const safeName = developer_name.replace(/\s+/g, "_");

      const finalName = `${developer_id}-${safeName}-${file.originalname}`;

      const userFiles = fs
        .readdirSync(tmpDir)
        .filter((f) => f.startsWith(`${developer_id}-${safeName}-`));

      userFiles.forEach((f) => {
        const oldPath = path.join(tmpDir, f);
        try {
          fs.unlinkSync(oldPath);
          console.log(`Arquivo antigo removido: ${oldPath}`);
        } catch (error) {
          console.warn(`Erro ao remover arquivo antigo ${oldPath}: `, error);
        }
      });

      cb(null, finalName);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage });

export default upload;
