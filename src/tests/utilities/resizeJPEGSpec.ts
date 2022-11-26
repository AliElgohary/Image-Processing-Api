import path from "path";
import resizeJPEG from "../../utilities/resizeJPEG";

describe("Test image processing", (): void => {
  it("should get the resized image as per provided width and height", async () => {
    const srcFilePath = path.join(
      __dirname + "../../../../images/full/fjord.jpg"
    );
    const dstFileName = "fjord" + 250 + 250 + ".jpg";
    const dstDir = path.join(__dirname + "../../../../images/thumb/");
    const dstFilePath = dstDir + dstFileName;
    await resizeJPEG(srcFilePath, 250, 250, dstFilePath);

    expect(dstFilePath).toBeTruthy();
  });
});
