import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

 const sequelize = new Sequelize('miduelo', 'Michelle', 'hD*F9jBw@U6dS6Ym', {
    host: '52.188.186.87',
    dialect: "mysql",
    port: 3306, 
    dialectOptions: {
        connectTimeout: 60000 
     },
    pool: {
         max: 5,
         min: 0,
         acquire: 60000,
         idle: 10000
    }
 });

 // ✅ AGREGA ESTA LÍNEA - EXPORTACIÓN CORRECTA
 export default sequelize;


// // Cargar variables de entorno
// dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME || 'miduelo',
//     process.env.DB_USER || 'Rodrigo',
//     process.env.DB_PASSWORD || '',
//     {
//         host: process.env.DB_HOST || 'localhost',
//         port: parseInt(process.env.DB_PORT || '3306'),
//         dialect: "mysql",
//         dialectOptions: {
//             connectTimeout: 60000, // 60 segundos
//             // Si necesitas SSL (común en Azure):
//             // ssl: {
//             //     require: true,
//             //     rejectUnauthorized: false
//             // }
//         },
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         },
//         logging: process.env.NODE_ENV === 'development' ? console.log : false
//     }
// );

// // Función para probar la conexión
// sequelize.authenticate()
//     .then(() => {
//         console.log('✅ Conexión a MySQL establecida correctamente');
//         console.log(`📍 Host: ${process.env.DB_HOST}`);
//         console.log(`🗄️  Base de datos: ${process.env.DB_NAME}`);
//     })
//     .catch((error) => {
//         console.error('❌ Error al conectar con MySQL:', error);
//     });

// export default sequelize;