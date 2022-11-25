import sharp from 'sharp';

const resizePNG = async (
    srcFilePath: string,
    reqWidth: number,
    reqHeight: number,
    dstFilePath: string
) => {
    await sharp(srcFilePath)
        .resize(reqWidth, reqHeight)
        .toFormat('png')
        .toFile(dstFilePath);
};

export default resizePNG;
