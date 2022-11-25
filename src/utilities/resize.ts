import express from "express";
import fs from "fs";
import path from "path";
import resizeJPEG from "./resizeJPEG";
import resizePNG from "./resizePNG";

const checkParams = function (param: string, type: string = "string") {
  return (
    param != undefined &&
    param != null &&
    param != "" &&
    (type == "number" ? !isNaN(parseInt(param)) : true)
  );
};
const validateHeightWidth = (value: number): boolean => {
  return value > 0;
};
const validateFormat = (format: string): boolean => {
  return (
    format.toLowerCase() == "png" ||
    format.toLowerCase() == "jpg" ||
    format.toLowerCase() == "jpeg"
  );
};

const resize = async (req: express.Request, res: express.Response) => {
  if (
    checkParams(req.query.filename as string) &&
    checkParams(req.query.width as string, "number") &&
    checkParams(req.query.height as string, "number") &&
    checkParams(req.query.format as string, "number")
  )
    return res.send(
      `Error: Please check the URL parameters and enter valid parameters`
    );
  else if (!validateHeightWidth(parseInt(req.query.height as string)))
    return res.send(
      `Error: invalid height ${req.query.height}`
    );
  else if (!validateHeightWidth(parseInt(req.query.width as string)))
    return res.send(
      `Error: invalid width`
    );
  else if (!validateFormat(req.query.format as string))
    return res.send(
      `Error: the Format is unsupported`
    );

  const FileName = req.query.filename as string;
  const Width = parseInt(req.query.width as string);
  const Height = parseInt(req.query.height as string);

  let fileFormat = req.query.format as string;
  let fileExtension = "." + fileFormat;

 

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

  try {
    if (fileFormat === "jpeg") {
      await resizeJPEG(srcFilePath, Width, Height, dstFilePath);
    } else if (fileFormat === "png") {
      await resizePNG(srcFilePath, Width, Height, dstFilePath);
    }
  } catch (err) {
    res.send(`Error: error calling method resize` + fileFormat.toUpperCase());
  }

  res.sendFile(dstFilePath);
  return;
};

export default resize;
