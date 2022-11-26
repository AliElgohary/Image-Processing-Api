import sharp from "sharp";

const resizeJPEG = async (
  srcFilePath: string,
  Width: number,
  Height: number,
  dstFilePath: string
) => {
  await sharp(srcFilePath)
    .resize(Width, Height)
    .toFormat("jpeg")
    .toFile(dstFilePath);
};

export default resizeJPEG;
