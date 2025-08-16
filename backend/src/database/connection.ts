import { Sequelize } from "sequelize";

const sequelize = new Sequelize('myduelo','root', 'root',{
    host: 'localhost',
    dialect: "mysql"
})
export default sequelize;