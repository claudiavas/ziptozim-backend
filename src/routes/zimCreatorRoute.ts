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

const upload = multer({ 
  dest: uploadDir,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB limit
    fieldSize: 500 * 1024 * 1024, // 500 MB limit
    files: 1, // Only one file allowed
    fields: 7 // Only 7 fields allowed
  } }); // Use UPLOAD_DIR for Multer destination

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
 * Validates the request before creating a ZIM file using express-validator.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */
function validateRequest(req: Request, res: Response, next: NextFunction) {
  [
    check("inputFile").custom((value, { req }) => {
      if (!(req as Request).file) {
        throw new Error("inputFile is required");
      }
      return true;
    }),
    check("welcomePage").notEmpty().withMessage("welcomePage is required"),
    check("favicon").isURL().withMessage("favicon must be a valid URL"),
    check("language").notEmpty().withMessage("language is required"),
    check("title").isLength({ min: 3 }).withMessage("title must be at least 3 characters long"),
    check("description").notEmpty().withMessage("description is required"),
    check("creator").notEmpty().withMessage("creator is required"),
    check("publisher").notEmpty().withMessage("publisher is required"),
  ].forEach(validation => validation.run(req));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

/**
 * Route for handling POST requests to '/zimWriter'. It processes the uploaded file to create a ZIM file.
 * The route uses multer for handling file uploads, express-validator for input validation, and custom
 * logic for generating the ZIM file.
 */
routes.post(
  "/createZim",
  upload.single("inputFile"), // multer middleware
  
  validateRequest, // Call the validateRequest middleware to validate the data received in the request
  
  async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    try {
  
      // Unzip the uploaded file to a temporary directory
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