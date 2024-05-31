"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = require("./src/routes/user.routes");
const category_routes_1 = require("./src/routes/category.routes");
const product_routes_1 = require("./src/routes/product.routes");
const filters_routes_1 = require("./src/routes/filters.routes");
const favorites_routes_1 = require("./src/routes/favorites.routes");
const shoppinCar_routes_1 = require("./src/routes/shoppinCar.routes");
const sendEmails_routes_1 = require("./src/routes/sendEmails.routes");
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
    preflightContinue: false,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json({ limit: '200mb' }));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'public/img/uploads'),
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
app.use((0, multer_1.default)({ storage }).array('images'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
let url_base = process.env.URL_API;
console.log(url_base);
app.use(url_base + 'user/', user_routes_1.router);
app.use(url_base + 'category/', category_routes_1.router);
app.use(url_base + 'product/', product_routes_1.router);
app.use(url_base + 'filters/', filters_routes_1.router);
app.use(url_base + 'favorities/', favorites_routes_1.router);
app.use(url_base + 'shopping/', shoppinCar_routes_1.router);
app.use(url_base + 'email/', sendEmails_routes_1.router);
const server = http_1.default.createServer(app);
let port = process.env.PORT;
if (!port) {
    process.exit(1);
}
const PORT = parseInt(port, 10);
server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000/');
});
//# sourceMappingURL=index.js.map