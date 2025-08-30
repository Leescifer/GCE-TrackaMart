import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: process.env.APP_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-Project-ID']
    }
));

app.use(express.json());

app.use(express.urlencoded(
    {
        extended: true
    }
));

app.use('/api/auth', authRouter)

app.use((req, res, next) => {
    res.status(400).json({
        error: 'Not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error'
    });
})

export default app;