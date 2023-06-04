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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs = require("fs");
var apiUrl = 'https://api.gatcg.com/cards/search'; // Replace with your API endpoint URL
var downloadDirectory = './downloads'; // Replace with your desired directory path
function downloadImages() {
    return __awaiter(this, void 0, void 0, function () {
        var page, response, imageUrls, _i, _a, card, _loop_1, _b, _c, edition, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 10, , 11]);
                    // Make an API call to get the image URLs
                    // Create the download directory if it doesn't exist
                    if (!fs.existsSync(downloadDirectory)) {
                        fs.mkdirSync(downloadDirectory);
                    }
                    page = 1;
                    response = void 0;
                    _d.label = 1;
                case 1:
                    if (!(page == 1 || (response === null || response === void 0 ? void 0 : response.data.has_more))) return [3 /*break*/, 9];
                    return [4 /*yield*/, axios_1.default.get("".concat(apiUrl, "?page=").concat(page++))];
                case 2:
                    response = _d.sent();
                    imageUrls = response.data;
                    _i = 0, _a = imageUrls.data;
                    _d.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    card = _a[_i];
                    console.log("".concat(card.name, ":"));
                    _loop_1 = function (edition) {
                        var setDir, imagePath, imageUrl, imageResponse;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    setDir = "".concat(downloadDirectory, "/").concat(edition.set.prefix);
                                    if (!fs.existsSync(setDir)) {
                                        fs.mkdirSync(setDir);
                                    }
                                    imagePath = "".concat(setDir, "/").concat(edition.slug, ".jpg");
                                    if (fs.existsSync(imagePath)) {
                                        return [2 /*return*/, "continue"];
                                    }
                                    console.log("   ".concat(edition.slug));
                                    imageUrl = "https://ga-index-public.s3.us-west-2.amazonaws.com/cards/".concat(edition.slug, ".jpg");
                                    return [4 /*yield*/, axios_1.default.get(imageUrl, { responseType: 'stream' })];
                                case 1:
                                    imageResponse = _e.sent();
                                    imageResponse.data.pipe(fs.createWriteStream(imagePath));
                                    // Wait for the image to finish downloading
                                    return [4 /*yield*/, new Promise(function (resolve) { return imageResponse.data.on('end', resolve); })];
                                case 2:
                                    // Wait for the image to finish downloading
                                    _e.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b = 0, _c = card.result_editions;
                    _d.label = 4;
                case 4:
                    if (!(_b < _c.length)) return [3 /*break*/, 7];
                    edition = _c[_b];
                    return [5 /*yield**/, _loop_1(edition)];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _b++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [3 /*break*/, 1];
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _d.sent();
                    console.error('Error downloading images:', error_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
downloadImages();
