import { prosesser } from './prosesser'
import sharp from 'sharp'
import fs from 'fs'

// TODO: Flere eksempelbilder i andre formater, fra andre telefoner, osv.

test('heic-bilde fra iPhone skal bli til srgb jpg', async () => {
    const imageFile = fs.readFileSync('./resources/iPhone.heic')
    const unprocessedSharp = sharp(imageFile)
    const unprocessedMetadata = await unprocessedSharp.metadata()

    expect(unprocessedMetadata.format).toBe('heif')
    expect(unprocessedMetadata.space).toBe('srgb')
    expect(unprocessedMetadata.height).toBe(4032)
    expect(unprocessedMetadata.width).toBe(3024)
    expect(unprocessedMetadata.exif).toBeDefined()

    const processedImage = await prosesser(imageFile)
    // vi laster prosessert bilde inn i sharp igjen for å enkelt se på metadata osv.
    const processedSharp = sharp(processedImage) 
    const processedMetadata = await processedSharp.metadata()

    expect(processedMetadata.format).toBe('jpeg')
    expect(processedMetadata.space).toBe('srgb')

    expect(processedMetadata.height).toBeLessThan(unprocessedMetadata.height)
    expect(processedMetadata.width).toBeLessThan(unprocessedMetadata.width)
    expect(processedMetadata.exif).toBeUndefined()
})

test('heic-bilde fra Samsung skal bli til srgb jpg', async () => {
    const imageFile = fs.readFileSync('./resources/Samsung.heic')

    const unprocessedSharp = sharp(imageFile)
    const unprocessedMetadata = await unprocessedSharp.metadata()

    expect(unprocessedMetadata.format).toBe('heif')
    expect(unprocessedMetadata.space).toBe('srgb')
    expect(unprocessedMetadata.height).toBe(4032)
    expect(unprocessedMetadata.width).toBe(1908)
    expect(unprocessedMetadata.exif).toBeDefined()

    const processedImage = await prosesser(imageFile)
    const processedSharp = sharp(processedImage) 
    const processedMetadata = await processedSharp.metadata()

    expect(processedMetadata.format).toBe('jpeg')
    expect(processedMetadata.space).toBe('srgb')
    expect(processedMetadata.height).toBeLessThan(unprocessedMetadata.height)
    expect(processedMetadata.width).toBeLessThan(unprocessedMetadata.width)
    expect(processedMetadata.exif).toBeUndefined()
})

test('jpg-bilde fra Samsung skal bli til srgb jpg', async () => {
    const imageFile = fs.readFileSync('./resources/Samsung.jpg')
    const unprocessedSharp = sharp(imageFile)
    const unprocessedMetadata = await unprocessedSharp.metadata()

    expect(unprocessedMetadata.format).toBe('jpeg')
    expect(unprocessedMetadata.space).toBe('srgb')
    expect(unprocessedMetadata.height).toBe(4032)
    expect(unprocessedMetadata.width).toBe(1908)

    const processedImage = await prosesser(imageFile)
    const processedSharp = sharp(processedImage) 
    const processedMetadata = await processedSharp.metadata()

    expect(processedMetadata.format).toBe('jpeg')
    expect(processedMetadata.height).toBeLessThan(unprocessedMetadata.height)
    expect(processedMetadata.width).toBeLessThan(unprocessedMetadata.width)
    expect(processedMetadata.space).toBe('srgb')
})
