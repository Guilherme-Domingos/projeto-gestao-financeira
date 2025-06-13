import express, { Express, Router } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger/swaggerConfig";

export class ApiExpress {
    private app: Express;    
    constructor(routes: Router[]) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        // Configuração do Swagger
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        
        // Rota para obter o JSON do Swagger
        this.app.get('/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });

        // Rota para a página inicial que redireciona para a documentação
        this.app.get('/', (req, res) => {
            res.redirect('/api-docs');
        });

        // Rotas da aplicação
        for (const router of routes) {
            this.app.use(router);
        }
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`API Documentation available at http://localhost:${port}/api-docs`);
        });
    }
}