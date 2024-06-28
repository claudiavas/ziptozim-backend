import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { validationResult, check } from "express-validator";
import unzipFile from '../utils/unzip'
import { createZimFile } from "../controllers/zimCreator";
import path from "path";
import fs from "fs";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

const tempDir: string = process.env.TEMP_DIR || "temp"; // Fallback to "temp" if TEMP_DIR is not set
const uploadDir: string = process.env.UPLOAD_DIR || "uploads"; // Fallback to "uploads" if UPLOAD_DIR is not set

const upload = multer({ dest: uploadDir }); // Use UPLOAD_DIR for Multer destination

const routes = express.Router();

/**
 * Escapes HTML characters in a string.
 * @param unsafe The string to escape.
 * @returns The escaped string.
 */
function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== "string") {
    return "";
  }
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Route for handling POST requests to '/zimWriter'. It processes the uploaded file to create a ZIM file.
 * The route uses multer for handling file uploads, express-validator for input validation, and custom
 * logic for generating the ZIM file.
 */
routes.post(
  "/createZim",
  upload.single("inputFile"),
  [
    // checks if inputFile is not empty
    check("inputFile").custom((value, { req }) => {
      if (!(req as Request).file) {
        throw new Error("inputFile is required");
      }
      return true;
    }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    try {
  
      const { sourceDirectory, htmlDirectory } = await unzipFile(req.file, tempDir);
      console.log("source Directory", sourceDirectory);
      console.log("html Directory", htmlDirectory);

      // Extract the filename without the extension
      const filename: string = path.parse(req.file.originalname).name;
      console.log("filename", filename);

      // Use the filename for the output file, but change the extension to .zim
      const outputFile: string = `${filename}.zim`;

      const zimFilePath: string = path.join(sourceDirectory, outputFile);
      console.log("Zim File Path", zimFilePath);

      console.log("Preparando para crear archivo ZIM...");

      try { 
        await createZimFile(
          htmlDirectory,
          zimFilePath,
          escapeHtml(req.body.welcomePage),
          escapeHtml(req.body.favicon),
          escapeHtml(req.body.language),
          escapeHtml(req.body.title),
          escapeHtml(req.body.description),
          escapeHtml(req.body.creator),
          escapeHtml(req.body.publisher)
        );
        console.log("Archivo ZIM creado exitosamente.");
        // Continuar con el resto del código después de la creación del archivo ZIM
      } catch (error) {
        console.error("Error al crear el archivo ZIM:", error);
        // Manejar el error adecuadamente
      }

      // Set the Content-Disposition header to make the browser download the file
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${outputFile}"`
      );

      // Create a read stream for the ZIM file and pipe it to the response
      const zimFileReadStream = fs.createReadStream(zimFilePath);
      zimFileReadStream.pipe(res);

      // Cleanup after sending the file
      zimFileReadStream.on("end", () => {
        try {
          console.log("File stream ended. Cleaning up...");
          fs.unlink(zimFilePath, (err) => { // Use async version for non-blocking operation
            if (err) console.error("Error deleting ZIM file:", err);
            else console.log(`${zimFilePath} was deleted.`);
          });
          fs.rmdir(sourceDirectory, { recursive: true }, (err) => { // Use async version for non-blocking operation
            if (err) console.error("Error deleting source directory:", err);
            else console.log(`${sourceDirectory} was deleted.`);
          });
          console.log("Cleanup successful.");
        } catch (cleanupErr) {
          console.error("Error during cleanup:", cleanupErr);
        }
      });
    } catch (err) {
      console.error(err);
      let errorMessage = "An unknown error occurred";
      // Perform a type check to safely access err.message
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      res.status(500).send({
        message: "Error uploading and unzipping the file.",
        error: errorMessage
      });
    }
  }
);

export default routes;