import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import zimCreatorRoute from './src/routes/zimCreatorRoute';

const app = express();

/**
 * CORS configuration to allow requests from any origin.
 */
const corsOptions = {
    origin: '*', // Allows all origins
    optionsSuccessStatus: 200 // For legacy browsers (IE11, various SmartTVs) that choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(zimCreatorRoute);

/**
 * Defines the port on which the server will run, using the PORT environment variable or defaulting to 3500.
 */
const port = process.env.PORT || 3500; // Use the environment-assigned port or 3500 if not defined

/**
 * Starts the server on the specified port and logs a message to the console.
 */
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/**
 * Basic route at the root that responds with a 'Hello World!' message.
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

/**
 * Middleware to handle errors, logging the error and sending a generic error response.
 * @param err - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The function to pass control to the next middleware.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;