export const confirmationNecesary = function (orderNumber:string,text:string) {


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
            flex-direction: column;
            align-items: center;
            text-aling:center
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
            text-align: center;
            display: flex
            
        }
        
        .custom-btn {
            display: block;
            width: 100%;
            max-width: 650px; /* Igualar el ancho de la imagen */
            margin: 20px auto 0 auto; /* Centrar el botón y agregar margen superior */
            padding: 15px; /* Ajustar el padding según sea necesario */
            background-color: #FEE9EE ;
            color: white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: bold;
            border: 2px solid transparent;
            border-radius: 0.375rem; /* rounded-md */
            transition: background-color 0.3s ease;
            text-align: center;
        }
        
        .custom-btn:hover {
            background-color: rgba(157, 86, 122, 0.8); /* hover:bg-[#9d567a] hover:bg-opacity-80 */
        }
        
        .image img {
            width: 100%;
            max-width: 650px;
            display: block;
            margin: auto;
        }

    </style>
</head>
<body>
    <div class="container">
    
        <div class="content">
        <div>
        ${text}
        </div>
        
            <div class="image">
                <img src="https://grema-store-frontend.vercel.app/images/logologo.png" alt="Logo">
            </div>
            <div class="button">
                <a href="${process.env.URL_FRONT}confirm/${orderNumber}" class="custom-btn">
                    Click para confirmar
                </a>
            </div>
        </div>
    </div>
</body>
</html>`

    return {
        html: html
    }

} 