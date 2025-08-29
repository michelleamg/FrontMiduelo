// File: src/models/server.ts
import express, { Application } from 'express';
import sequelize from '../database/connection'; // Asegúrate de que esta ruta sea correcta
import router from '../routes/psicologo'; // Importa el router directamente
import paciente from '../routes/paciente'; // Importa el router directamente
import agendaRoutes from '../routes/agenda';
import { Psicologo } from './psicologo';
import { Paciente } from './paciente';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3016';

        // 1. Conectar a la base de datos (puede ser asíncrono)
        this.connetionBaseDatos();

        // 2. Configurar middlewares (¡ANTES DE LAS RUTAS!)
        this.midlewares();

        // 3. Configurar las rutas
        this.routes(); // Renombrado a 'routes' para mayor claridad

        // 4. Iniciar el servidor
        this.listen();
    }

    // Método para configurar middlewares
    private midlewares() {
        this.app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes
        // Puedes añadir otros middlewares aquí, como CORS, etc.
        this.app.use(cors());
    }

    // Método para configurar las rutas
    private routes() {
        this.app.use(router); // Usa el router importado
        this.app.use(paciente); // Usa el router importado
        this.app.use(agendaRoutes);
    }

    // Método para iniciar el servidor
    private listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutándose en el puerto: ${this.port}`);
        });
    }

    // Método para conectar a la base de datos
    private async connetionBaseDatos() {
        try {
            // await sequelize.authenticate(); // Descomenta si quieres probar la conexión
            //await Psicologo.sync({ force: false }); // ¡CUIDADO! 'force: true' borra y recrea la tabla en cada inicio.
                                              // Para desarrollo, 'force: true' puede ser útil, pero en producción
                                              // o si ya tienes datos, usa 'force: false' o migraciones.
            await Psicologo.sync({ alter: true })
                .then(() => console.log("Tablas actualizadas"))
                .catch(err => console.error("Error al sincronizar", err));
            await Paciente.sync({ force: false });
            console.log('Conexión a la base de datos exitosa.');
        } catch (error) {
            console.error('Error de conexión a la base de datos:', error);
            // Considera salir del proceso o manejar el error de forma más robusta
        }
    }
}

export default Server;

