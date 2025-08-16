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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// File: src/models/server.ts
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user")); // Importa el router directamente
const paciente_1 = __importDefault(require("../routes/paciente")); // Importa el router directamente
const user_2 = require("./user");
const paciente_2 = require("./paciente");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
    midlewares() {
        this.app.use(express_1.default.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes
        // Puedes añadir otros middlewares aquí, como CORS, etc.
    }
    // Método para configurar las rutas
    routes() {
        this.app.use(user_1.default); // Usa el router importado
        this.app.use(paciente_1.default); // Usa el router importado
    }
    // Método para iniciar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutándose en el puerto: ${this.port}`);
        });
    }
    // Método para conectar a la base de datos
    connetionBaseDatos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await sequelize.authenticate(); // Descomenta si quieres probar la conexión
                yield user_2.User.sync({ force: false }); // ¡CUIDADO! 'force: true' borra y recrea la tabla en cada inicio.
                // Para desarrollo, 'force: true' puede ser útil, pero en producción
                // o si ya tienes datos, usa 'force: false' o migraciones.
                yield paciente_2.Paciente.sync({ force: false });
                console.log('Conexión a la base de datos exitosa.');
            }
            catch (error) {
                console.error('Error de conexión a la base de datos:', error);
                // Considera salir del proceso o manejar el error de forma más robusta
            }
        });
    }
}
exports.default = Server;
