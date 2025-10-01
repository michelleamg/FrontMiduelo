// backend/test-azure-connection.ts
import sequelize from './connection';

async function testAzureConnection() {
    try {
        // Probar autenticación
        await sequelize.authenticate();
        console.log('✅ Conexión exitosa a Azure MySQL');
        
        // Listar tablas
        const [tables] = await sequelize.query(`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'miduelo'
            ORDER BY TABLE_NAME
        `);
        
        console.log('\n📋 Tablas en Azure:');
        tables.forEach((table: any) => {
            console.log(`   - ${table.TABLE_NAME}`);
        });
        
        // Contar registros de psicólogos
        const [psicologos] = await sequelize.query(
            'SELECT COUNT(*) as total FROM psicologo'
        );
        console.log(`\n👥 Psicólogos registrados: ${(psicologos[0] as any).total}`);
        
        // Contar pacientes
        const [pacientes] = await sequelize.query(
            'SELECT COUNT(*) as total FROM paciente'
        );
        console.log(`👤 Pacientes registrados: ${(pacientes[0] as any).total}`);
        
        await sequelize.close();
        console.log('\n Prueba completada exitosamente');
        process.exit(0);
        
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testAzureConnection();