import { spawn } from 'child_process';
import path from 'path';

// Path to the zimwriterfs executable
let zimwriterfsPath: string = path.join(__dirname, '..', 'bin', 'zimwriterfs');

/**
 * Creates a ZIM file from the specified source directory.
 * 
 * @param sourceDirectory - The directory containing the files to be included in the ZIM file.
 * @param zimFilePath - The path where the ZIM file will be saved.
 * @param welcomePage - The path to the welcome page relative to the sourceDirectory.
 * @param illustration - The path to the illustration image relative to the sourceDirectory.
 * @param language - The language of the content in the ZIM file.
 * @param title - The title of the ZIM file.
 * @param description - A description of the ZIM file content.
 * @param creator - The creator of the ZIM file content.
 * @param publisher - The publisher of the ZIM file.
 * @returns A promise that resolves if the ZIM file is created successfully, or rejects with an error.
 */
export function createZimFile(
  sourceDirectory: string,
  zimFilePath: string,
  welcomePage: string,
  illustration: string,
  language: string,
  title: string,
  description: string,
  creator: string,
  publisher: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    
    // Command arguments for zimwriterfs
    const command: string[] = [
      `--welcome=${welcomePage}`,
      `--illustration=${illustration}`,
      `--language=${language}`,
      `--title="${title}"`,
      `--description="${description}"`,
      `--creator=${creator}`,
      `--publisher=${publisher}`,
      sourceDirectory,
      zimFilePath
    ];
    console.log("Zimwriterfs command", command);

    // Spawn the zimwriterfs process
    const zimwriterfs = spawn(zimwriterfsPath, command);

    let stderrData = '';

    // Log stdout data
    zimwriterfs.stdout.on('data', (data: Buffer) => {
      console.log(`stdout: ${data}`);
    });

    // Log stderr data
    zimwriterfs.stderr.on('data', (data: Buffer) => {
      stderrData += data.toString();
      console.error(`stderr: ${data}`);
    });

    // Handle process exit
    zimwriterfs.on('close', (code: number) => {
      console.log(`child process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(stderrData));
      } else {
        resolve();
      }
    });
  });
}