import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('monitoring', 'root', '', {
    dialect: 'sqlite',
    storage: process.cwd()+"/src/db/monitoring.sqlite",
    dialectOptions: {
        // Your sqlite3 options here
    }
})

export default sequelize