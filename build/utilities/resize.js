"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var resizeJPEG_1 = __importDefault(require("./resizeJPEG"));
var resizePNG_1 = __importDefault(require("./resizePNG"));
var checkParams = function (param, type) {
    if (type === void 0) { type = "string"; }
    return (param != undefined &&
        param != null &&
        param != "" &&
        (type == "number" ? !isNaN(parseInt(param)) : true));
};
var validateHeightWidth = function (value) {
    return value > 0;
};
var validateFormat = function (format) {
    return (format.toLowerCase() == "png" ||
        format.toLowerCase() == "jpg" ||
        format.toLowerCase() == "jpeg");
};
var resize = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var FileName, Width, Height, fileFormat, fileExtension, srcFilePath, dstFileName, dstDir, dstFilePath, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (checkParams(req.query.filename) &&
                    checkParams(req.query.width, "number") &&
                    checkParams(req.query.height, "number") &&
                    checkParams(req.query.format, "number"))
                    return [2 /*return*/, res.send("Error: Please check the URL parameters and enter valid parameters")];
                else if (!validateHeightWidth(parseInt(req.query.height)))
                    return [2 /*return*/, res.send("Error: invalid height " + req.query.height)];
                else if (!validateHeightWidth(parseInt(req.query.width)))
                    return [2 /*return*/, res.send("Error: invalid width")];
                else if (!validateFormat(req.query.format))
                    return [2 /*return*/, res.send("Error: the Format is unsupported")];
                FileName = req.query.filename;
                Width = parseInt(req.query.width);
                Height = parseInt(req.query.height);
                fileFormat = req.query.format;
                fileExtension = "." + fileFormat;
                srcFilePath = path_1.default.join(__dirname + "../../../images/full/" + FileName + fileExtension);
                if (isNaN(Width) || isNaN(Height)) {
                    res.send("Error: Please enter valid number for width and height");
                    return [2 /*return*/];
                }
                dstFileName = FileName + Width + Height + fileExtension;
                dstDir = path_1.default.join(__dirname + "../../../images/thumb/");
                dstFilePath = dstDir + dstFileName;
                console.log(dstFilePath);
                try {
                    fs_1.default.accessSync(srcFilePath, fs_1.default.constants.F_OK);
                    console.log("Requested file presents in full dir");
                }
                catch (err) {
                    res.send("Error: Requested file is not found");
                    return [2 /*return*/];
                }
                try {
                    fs_1.default.accessSync(dstFilePath, fs_1.default.constants.F_OK);
                    // File exists. Display the resized image
                    console.log("Resized file present in the thumb dir");
                    res.sendFile(dstFilePath);
                    return [2 /*return*/];
                }
                catch (err) {
                    console.log("No resized file found");
                }
                try {
                    fs_1.default.accessSync(dstDir, fs_1.default.constants.F_OK);
                    console.log("Thumb dir found");
                }
                catch (err) {
                    try {
                        fs_1.default.mkdirSync(dstDir);
                    }
                    catch (err) {
                        res.send("Error: Failed to create dir");
                        return [2 /*return*/];
                    }
                }
                console.log("Calling Sharp for resizing, format : " + fileFormat);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!(fileFormat === "jpeg" || fileFormat === "jpg")) return [3 /*break*/, 3];
                return [4 /*yield*/, resizeJPEG_1.default(srcFilePath, Width, Height, dstFilePath)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!(fileFormat === "png")) return [3 /*break*/, 5];
                return [4 /*yield*/, resizePNG_1.default(srcFilePath, Width, Height, dstFilePath)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                res.send("Error: error calling method resize" +
                    fileFormat.toUpperCase() +
                    ", " +
                    err_1);
                return [3 /*break*/, 7];
            case 7:
                res.sendFile(dstFilePath);
                return [2 /*return*/];
        }
    });
}); };
exports.default = resize;
