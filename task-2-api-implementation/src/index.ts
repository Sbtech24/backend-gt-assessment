import express, { Request, Response, NextFunction } from 'express';
import taskRoutes from './routes/task.routes';
import dotenv from "dotenv"
import { AppDataSource } from './config/data-source';

dotenv.config()

const app = express();

// middleware to Parse JSON bodies
app.use(express.json());

app.use("/tasks",taskRoutes);




// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {

  res.status(500).json({ error: 'Internal server error' });
});

AppDataSource.initialize()
    .then(()=>{
        console.log('Database Connected')
        app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`)

})
    })
    .catch((err)=>{
        console.log('Error connecting to db',err)
    })


export default app;