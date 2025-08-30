import dotenv from 'dotenv'
import app from './app.js'
import { initDB } from './src/config/db.config.js'

dotenv.config();

console.log("Enviroment loaded, NODE_ENV:", process.env.NODE_ENV);

const PORT = process.env.PORT || 2026;

const startServer = () => {
    console.log('Starting Server');
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    }).on('error', (error) => {
        console.error('Error starting server:', error);
        process.exit(1);
    });
}

const init = async () => {
    console.log('Initializing Application...');
    try {
        await initDB();
        startServer();
    } catch (error) {
        console.error('Failed to connect database');
        process.exit(1);
    }
}

init().catch(error => {
    console.error('Fatal error during initialization:', error);
    process.exit(1);
});