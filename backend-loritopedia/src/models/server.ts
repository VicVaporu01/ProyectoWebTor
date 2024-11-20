import express, {Application} from 'express';
import morgan from 'morgan';
import routesParrot from "../routes/parrot";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/api/parrots', routesParrot);
    }
}

export default Server;