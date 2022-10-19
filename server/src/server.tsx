import express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { App } from "../../client/src/App";
import { contentHtml } from "./main";
require("dotenv").config();
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  const app = renderToString(<App />);

  const html = `
        <html lang="en">
        <head>
        <title>ІІТ Користувач ЦСК-1. Бібліотека підпису (java-скрипт)</title>
    <meta name="AUTHOR" content="Copyright JSC IIT. All rights reserved." />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="style.css">
    <script async type="text/JavaScript" src="JS/common.js"><\/script>
    <script async type="text/JavaScript" src="JS/euutils.js"><\/script>
    <script async type="text/JavaScript" src="JS/euscpt.js"><\/script>
    <script async type="text/JavaScript" src="JS/euscpm.js"><\/script>
    <script async type="text/javascript" src="JS/euscp.js"><\/script>
    
    <script async type="text/javascript" src="JS/qr/qrcodedecode.js"><\/script>
    <script async type="text/javascript" src="JS/qr/reedsolomon.js"><\/script>
    <script async type="text/javascript" src="JS/fs/Blob.min.js"><\/script>
    <script async type="text/javascript" src="JS/fs/FileSaver.js"><\/script>

    <script async type="text/JavaScript" src="JS/euscptest.js"><\/script>
    <script type="text/JavaScript">

      function onBodyLoad() {
        MM_preloadImages('Images/ButtonHover.png', 'Images/ButtonHover.png');
        pageLoaded();
      }
    </script>
        </head>
        <body onload="onBodyLoad()">
            ${contentHtml}
            <script async type="text/JavaScript">
            window.addEventListener("DOMContentLoaded", (event)=> {
              console.log(event);
                window.addEventListener('message', (event)=> {
                  console.log('From Parent!')
                  window.fileToSign = event.data.file
                });
            });
            </script>
        </body>
        </html>
    `;
  res.send(html);
});

app.use(express.static("./built"));

app.listen(PORT);
