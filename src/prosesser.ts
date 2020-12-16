import sharp from 'sharp'

export async function prosesser(bilde: Buffer): Promise<Buffer> {
    return sharp(bilde)
        .rotate()
        .resize(600, 1200, {
            fit: sharp.fit.inside
        })
        .toFormat('jpg', {quality: 80})
        .toBuffer()
}
