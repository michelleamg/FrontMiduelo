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
// backend/test-azure-connection.ts
const connection_1 = __importDefault(require("./connection"));
function testAzureConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Probar autenticación
            yield connection_1.default.authenticate();
            console.log('✅ Conexión exitosa a Azure MySQL');
            // Listar tablas
            const [tables] = yield connection_1.default.query(`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'miduelo'
            ORDER BY TABLE_NAME
        `);
            console.log('\n📋 Tablas en Azure:');
            tables.forEach((table) => {
                console.log(`   - ${table.TABLE_NAME}`);
            });
            // Contar registros de psicólogos
            const [psicologos] = yield connection_1.default.query('SELECT COUNT(*) as total FROM psicologo');
            console.log(`\n👥 Psicólogos registrados: ${psicologos[0].total}`);
            // Contar pacientes
            const [pacientes] = yield connection_1.default.query('SELECT COUNT(*) as total FROM paciente');
            console.log(`👤 Pacientes registrados: ${pacientes[0].total}`);
            yield connection_1.default.close();
            console.log('\n Prueba completada exitosamente');
            process.exit(0);
        }
        catch (error) {
            console.error('Error:', error);
            process.exit(1);
        }
    });
}
testAzureConnection();
