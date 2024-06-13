const express = require("express");
const multer = require("multer");
const stream = require("stream");
const upload = multer({ dest: "uploads/" })
const { validationResult, check } = require("express-validator");
const unzipFile = require("../../unzip");
const { createZimFile } = require("../../zimWriters");
const path = require("path");
const fs = require("fs");
const { escape } = require("querystring");
require("events").EventEmitter.defaultMaxListeners = 20;

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
        process.cwd(),
        "temp",
        String(timestamp)
      );
      fs.mkdirSync(sourceDirectory, { recursive: true }); // Ensure the directory exists
      await unzipFile(req.file, sourceDirectory);
      console.log("source Directory", sourceDirectory);

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
          sourceDirectory,
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
      zimFileReadStream.on("end", () => {
        try {
          console.log("File stream ended. Cleaning up...");
          //fs.unlinkSync(zimFilePath); // Delete the ZIM file
          //fs.rmdirSync(sourceDirectory, { recursive: true }); // Delete the temporary directory
          console.log("Cleanup successful.");
        } catch (cleanupErr) {
          console.error("Error during cleanup:", cleanupErr);
        }
      });
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
