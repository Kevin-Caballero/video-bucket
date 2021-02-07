import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import videoRoutes from '../routes/video.routes';
import dbConnect from '../database/database'

class App {
    private app: Application;

    constructor(port?: number | string) {
        this.app = express();
        this.setSettings(port);
        this.listen();
    }

    setSettings(port?: number | string) {
        this.app.set('port', process.env.PORT ?? port ?? 3000);

        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());

        dbConnect()

        this.app.use('/api', videoRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`SERVER ON: http://localhost:${this.app.get('port')}`);
    }
}

export default App;