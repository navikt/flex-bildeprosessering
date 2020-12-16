import express from 'express'
import cors from 'cors'
import multer from 'multer'
import winston from 'winston'

import { prosesser } from './prosesser'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
})

const app = express()
const port = 8080 // default port to listen
const corsOrigin = process.env.ALLOWED_ORIGINS || 'http://localhost:4116'

const storage = multer.memoryStorage() // Filer fjernes automatisk, her har vi ikke kontroll og mange/store request kan fylle minne
const upload = multer({
    storage,
    limits: {
        files: 1,
        fileSize: 1024 * 1024 * 10
    }
})

const corsOptions = {
    origin: corsOrigin,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: 'POST',
    allowedHeaders: [
        'Access-Control-Allow-Methods', 'Content-Type', 'Access-Control-Allow-Origin'
    ]
}
const corsHandler = cors(corsOptions)

app.post('/prosesser',
    upload.single('file'),
    corsHandler,
    async (req, res) => {
        if (req.file === undefined) {
            logger.log('error', 'mottok ikke data')
            res.sendStatus(500)
            return
        }
        logger.log('info', 'Mottok data: ' + req.file.size + ' bytes ' + req.file.mimetype)
        try {
            const img = await prosesser(req.file.buffer)
            res.set('Content-Type', 'image/jpg')
            res.send(img)
            logger.log('info', 'Sendte tilbake: ' + img.byteLength + ' bytes jpg')
        } catch (reason) {
            logger.log('error', reason.message)
            res.sendStatus(500)
        }
    })


app.listen(port, () => {
    logger.log('info', `server started at port ${port}`)
})
