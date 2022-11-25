import express from "express";
import fs from "fs";
import path from "path";
import resizeJPEG from "./resizeJPEG";
import resizePNG from "./resizePNG";

const resize = async (req: express.Request, res: express.Response) => {
  if (
    req.query.filename === undefined ||
    req.query.width === undefined ||
    req.query.height === undefined
  ) {
    res.send(
      `Error: Please check the URL parameters and enter valid parameters`
    );
    return;
  }

  const FileName = req.query.filename as string;
  const Width = parseInt(req.query.width as string);
  const Height = parseInt(req.query.height as string);

  let fileFormat = req.query.format as string;
  let fileExtension = "." + fileFormat;

  // If no file format is specified consider jpeg as default
  if (fileFormat === undefined) {
    fileFormat = "jpeg";
    fileExtension = ".jpg";
  }

  const srcFilePath: string = path.join(
    __dirname + "../../../images/full/" + FileName + fileExtension
  );

  if (isNaN(Width) || isNaN(Height)) {
    res.send(`Error: Please enter valid number for width and height`);
    return;
  }

  const dstFileName: string = FileName + Width + Height + fileExtension;
  const dstDir: string = path.join(__dirname + "../../../images/thumb/");
  const dstFilePath: string = dstDir + dstFileName;

  console.log(dstFilePath);

  try {
    try {
      fs.accessSync(srcFilePath, fs.constants.F_OK);
      console.log(`Requested file presents in full dir`);
    } catch (err) {
      res.send(`Error: Requested file is not present in full dir`);
      return;
    }

    try {
      fs.accessSync(dstFilePath, fs.constants.F_OK);
      // File exists. Display the resized image
      console.log(`Resized file present in the thumb dir`);

      res.sendFile(dstFilePath);
      return;
    } catch (err) {
      console.log(`No resized file found`);
    }

    try {
      fs.accessSync(dstDir, fs.constants.F_OK);
      console.log(`Thumb dir found`);
    } catch (err) {
      try {
        fs.mkdirSync(dstDir);
      } catch (err) {
        res.send(`Error: Failed to create dir`);
        return;
      }
    }

    console.log(`Calling Sharp for resizing, format : ${fileFormat}`);

    if (fileFormat === "jpeg") {
      await resizeJPEG(srcFilePath, Width, Height, dstFilePath);
    } else if (fileFormat === "png") {
      await resizePNG(srcFilePath, Width, Height, dstFilePath);
    }

    res.sendFile(dstFilePath);
    return;
  } catch (err) {
    console.log(err);
  }
};

export default resize;
