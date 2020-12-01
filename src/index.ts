import express from "express";
import cors from 'cors';
import sharp from 'sharp';
import multer from 'multer';

const app = express();
const port = 8080; // default port to listen

const storage = multer.memoryStorage(); // TODO: Test at dette bare er et mellomlager
const upload = multer({
    storage,
    limits: {
        files: 1,
        fileSize: 1024 * 1024 * 10
    }
});

// TODO: Sett opp CORS og https
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    allowedHeaders: [
        'Access-Control-Allow-Methods', 'POST', 'Content-Type'
    ]
}
const corsHandler = cors(corsOptions)

app.post("/prosesser",
    upload.single('file'),
    corsHandler,
    async (req, res) => {
        console.log('Mottok data: ' + req.file.size + ' bytes ' + req.file.mimetype)

        /*
        sharp(req.file.buffer)
            .resize({ width: 50 })
            .toBuffer()
            .then(data => {
                res.send(data)
                console.log('Clone size: ' + data.byteLength + ' bytes ')
            })

         */

        sharp(req.file.buffer)
            .resize(600, 1200, {
                fit: sharp.fit.inside,          // Beholder ratio, men går ikke over høyde eller bredde
            })
            .toFormat('jpg', {
                quality: 100
            })
            .toBuffer()
            .then((img) => {
                res.send(img)
                console.log('Sendte tilbake: ' + img.byteLength + ' bytes jpg')
            })
            .catch((reason) => {
                console.log('Feil: ' + reason.message)
                res.status(500)
            })
    })

// start the Express server
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})
