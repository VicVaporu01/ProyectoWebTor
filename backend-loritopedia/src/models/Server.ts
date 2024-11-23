import express, {Application} from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routesParrot from "../routes/ParrotRoutes";
import routesUser from "../routes/UserRoutes";
import {connectDB} from "../db/DBConnection";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.connectDatabase();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.middlewares();
        this.routes();
    }

    private async connectDatabase() {
        await connectDB();
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors({
            credentials: true,
            origin: ["http://localhost:4200"]
        }));
    }

    private routes() {
        this.app.use("/api/users", routesUser);
        this.app.use('/api/parrots', routesParrot);
    }
}

export default Server;