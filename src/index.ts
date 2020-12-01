import express from "express";
import cors from 'cors';
import sharp from 'sharp';
import multer from 'multer';

const app = express();
const port = 8080; // default port to listen

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        files: 1,
        fileSize: 1024 * 1024 * 10
    }
});

/*
// TODO: Sett opp CORS og https
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    allowedHeaders: [
        'Access-Control-Allow-Methods', 'POST', 'Content-Type'
    ]
}
const detteErLov = cors(corsOptions)
app.options("/prosesser", detteErLov)
*/

app.post("/prosesser", upload.single('file'), async ( req, res ) => {
    console.log('Mottok data: ' + req.file.mimetype)

    sharp(req.file.buffer)
        .jpeg()
        .toBuffer((e, b) => {
            res.send(b)
        })

    // res.sendStatus(200)
} )

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} )
