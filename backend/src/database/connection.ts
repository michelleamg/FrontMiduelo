import { Sequelize } from "sequelize";

const sequelize = new Sequelize('miduelo','root', 'root',{

    host: 'localhost',
    dialect: "mysql"
})
export default sequelize;


//const sequelize = new Sequelize('myduelo','dev_user', 'P4ssw0rd-S3gur0!',{
    
//    host: 'localhost',
//    dialect: "mysql"
//})
//export default sequelize;