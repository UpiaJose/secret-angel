import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';
import { Angel } from 'src/app/model/angel.interface';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/secret-angel/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  server.use(express.json()); // Middleware para analizar JSON en el cuerpo de la solicitud

  const generateRandomCode = (): string => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
  
    return randomCode;
  };

  const db: Angel[] = [
    {
      names: "Jhosmery",
      nameReal: "Jhosmery",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Jhoseimy",
      nameReal: "Jhoseimy",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Jhojanmy",
      nameReal: "Jhojanmy",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Alex/Alejandrina",
      nameReal: "Alex",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Mindalis/Mindalys/Mindy",
      nameReal: "Mindalis",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Enmanuel/Emmanuel/Manuel",
      nameReal: "Emmanuel",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Niña/Marícela/Marísela/Marisela/Maricela",
      nameReal: "Marícela/Niña",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Miguel/Jose/José/Jose Miguel/José Miguel",
      nameReal: "Miguel",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Marciana/Mama/La doña",
      nameReal: "Marciana",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Titi/Ñonga/Cristina",
      nameReal: "Cristina/Titi",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Cristal/María/Maria/Stephanie/María Stephanie/Maria Stephanie",
      nameReal: "Cristal",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Crisay/Nana",
      nameReal: "Crisay/Nana",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Shakespeare",
      nameReal: "Shakespeare",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Erik/Eriberto",
      nameReal: "Erik",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Eribel/Viki",
      nameReal: "Eribel",
      availability: true,
      code: generateRandomCode()
    },
    {
      names: "Lula",
      nameReal: "Lula",
      availability: true,
      code: generateRandomCode()
    }
  ];

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('/api/angels', (req, res) => {
    res.send(db);
  });
  server.put('/api/angels', (req, res) => {
    const angel = db.find(angel => angel.code === req.body.code);
    if (angel) {
      angel.availability = false;
      res.send(angel);
    } else {
      res.status(404).send('Tu Angelito no fue encontrado');
    }
  });
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';