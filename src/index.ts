import express from 'express'
import winston from 'winston'
import bodyParser from 'body-parser'

import { prosesser } from './prosesser'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
})

const uploadOptions = {
    inflate: true,
    limit: '20Mb',
    type: '*/*'
}

const app = express()
app.use(bodyParser.raw(uploadOptions))
const port = 8080 // default port to listen

app.post('/prosesser', async (req, res) => {
    if (req.body === undefined) {
        logger.log('error', 'Mottok ikke data')
        res.sendStatus(500)
        return
    }
    logger.log('info', 'Mottok data')
    try {
        const img = await prosesser(req.body)
        res.set('Content-Type', 'image/jpg')
        res.send(img)
        logger.log('info', 'Sendte tilbake: ' + img.byteLength + ' bytes jpg')
    } catch (reason) {
        logger.log('error', reason.message)
        res.sendStatus(500)
    }
})

app.get('/is_alive', async (_, res) => {
    res.sendStatus(200)
})

app.listen(port, () => {
    logger.log('info', `server started at port ${port}`)
})
