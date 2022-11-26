"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("../../utilities/resize"));
var images = express_1.default.Router();
images.get("/", function (req, res) {
    (0, resize_1.default)(req, res);
});
exports.default = images;
