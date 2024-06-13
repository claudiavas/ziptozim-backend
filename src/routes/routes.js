const express = require("express");
const multer = require("multer");
const stream = require("stream");
const upload = multer({ dest: "uploads/" });
const { body, validationResult } = require("express-validator");
const unzipFile = require("../../unzip");
const { createZimFile } = require("../../zimWriters");
const path = require("path");
const fs = require("fs");

const routes = express.Router();

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

routes.post("/upload", upload.single("inputFile"), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
    }    
    try {
        const timestamp = Date.now(); // Get the current timestamp
        const sourceDirectory = path.resolve(process.cwd(), "temp", String(timestamp));
        fs.mkdirSync(sourceDirectory, { recursive: true }); // Ensure the directory exists
        await unzipFile(req.file, sourceDirectory);
        console.log("source Directory", sourceDirectory);

        // Extract the filename without the extension
        const filename = path.parse(req.file.inputFile).name;

        // Use the filename for the output file, but change the extension to .zim
        const outputFile = `${filename}.zim`;

        const zimFilePath = path.join(sourceDirectory, outputFile);
        console.log("Zim File Path", zimFilePath);

        // Create a PassThrough stream to hold the ZIM file in memory
        const zimStream = new stream.PassThrough();
        console.log("PassThrough Zim", zimStream);

        // Pass the stream instead of a file path to createZimFile
        await createZimFile(
            zimFilePath,
            zimStream,
            escapeHtml(req.body.welcomePage),
            escapeHtml(req.body.favicon),
            escapeHtml(req.body.language),
            escapeHtml(req.body.title),
            escapeHtml(req.body.description),
            escapeHtml(req.body.creator),
            escapeHtml(req.body.publisher)
        );

        // Set the Content-Disposition header to make the browser download the file
        res.setHeader("Content-Disposition", `attachment; filename=${outputFile}`);
        
        // Send the ZIM file in the response
        zimStream.pipe(res);
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .send({
                message: "Error uploading and unzipping the file.",
                error: err.message,
            });
    }
});

module.exports = routes;