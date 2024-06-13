const express = require("express");
const multer = require("multer");
const stream = require("stream");
const { validationResult, check } = require("express-validator");
const unzipFile = require("../../unzip");
const { createZimFile } = require("../../zimWriters");
const path = require("path");
const tempDir = process.env.TEMP_DIR || "temp"; // Fallback to "temp" if TEMP_DIR is not set
const uploadDir = process.env.UPLOAD_DIR || "uploads"; // Fallback to "uploads" if UPLOAD_DIR is not set
const fs = require("fs");
require("events").EventEmitter.defaultMaxListeners = 20;

const upload = multer({ dest: uploadDir }); // Use UPLOAD_DIR for Multer destination

const routes = express.Router();

function escapeHtml(unsafe) {
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

routes.post(
  "/upload",
  upload.single("inputFile"),
  [
    // checks if inputFile is not empty
    check("inputFile").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("inputFile is required");
      }
      return true;
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    try {
      const timestamp = Date.now(); // Get the current timestamp
      console.log("timestamp", timestamp);
      const sourceDirectory = path.resolve(
        tempDir, // Use TEMP_DIR for the temporary directory
        String(timestamp)
      );
      fs.mkdirSync(sourceDirectory, { recursive: true }); // Ensure the directory exists

      // Create a subdirectory named 'html' inside the sourceDirectory
      const htmlDirectory = path.join(sourceDirectory, 'html');
      fs.mkdirSync(htmlDirectory, { recursive: true }); // Ensure the html directory exists
      
      await unzipFile(req.file, htmlDirectory);
      console.log("source Directory", sourceDirectory);
      console.log("html Directory", htmlDirectory);

      // Extract the filename without the extension
      const filename = path.parse(req.file.originalname).name;
      console.log("filename", filename);

      // Use the filename for the output file, but change the extension to .zim
      const outputFile = `${filename}.zim`;

      const zimFilePath = path.join(sourceDirectory, outputFile);
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

      // ./zimwriterfs --welcome=index.html --illustration=illustration.png \
      // --language=fra --title=foobar --description=mydescription --creator=Wikipedia \
      // --publisher=Kiwix ./my_project_html_directory my_project.zim

      // Set the Content-Disposition header to make the browser download the file
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${outputFile}`
      );

      // Create a read stream for the ZIM file and pipe it to the response
      const zimFileReadStream = fs.createReadStream(zimFilePath);
      zimFileReadStream.pipe(res);

      // Cleanup after sending the file
      // zimFileReadStream.on("end", () => {
      //   try {
      //     console.log("File stream ended. Cleaning up...");
      //     fs.unlink(zimFilePath, (err) => { // Use async version for non-blocking operation
      //       if (err) console.error("Error deleting ZIM file:", err);
      //       else console.log(`${zimFilePath} was deleted.`);
      //     });
      //     fs.rmdir(sourceDirectory, { recursive: true }, (err) => { // Use async version for non-blocking operation
      //       if (err) console.error("Error deleting source directory:", err);
      //       else console.log(`${sourceDirectory} was deleted.`);
      //     });
      //     console.log("Cleanup successful.");
      //   } catch (cleanupErr) {
      //     console.error("Error during cleanup:", cleanupErr);
      //   }
      // });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Error uploading and unzipping the file.",
        error: err.message,
      });
    }
  }
);

module.exports = routes;
