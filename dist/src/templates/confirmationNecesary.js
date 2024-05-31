"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmationNecesary = void 0;
const confirmationNecesary = function () {
    const html = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agradecimiento</title>
        <style>
            .container {
                max-width: 1400px;
                margin: auto;
                padding: 40px 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .content {
                text-align: center;
            }
            
            .text h2 {
                margin-bottom: 20px;
                font-size: 2rem;
                color: #9B5176;
            }
            
            .text span {
                border-bottom: 8px solid #9B5176;
                font-weight: bold;
            }
            
            .button {
                text-align-last: center;
                display: block;
                
            }
            
            .btn {
                font-size:large;
                padding: auto;
                background-color: #ebe8e8;
                color: #9B5176;
                text-decoration: none;
                font-weight: bold;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            
            .btn:hover {
                background-color: #cbcbcb;
            }
            
            
            .image img {
                
                width: 650px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div>
                
                <div class="image">
                    <img src="https://grema-store-frontend.vercel.app/images/logologo.png" alt="">
                </div>
                <div class="button">
                    <a href="/" class="btn">Haz clic para confirmar orden</a>
                </div>
            </div>
        
        </div>
    </body>
    </html>`;
    return {
        html: html
    };
};
exports.confirmationNecesary = confirmationNecesary;
//# sourceMappingURL=confirmationNecesary.js.map