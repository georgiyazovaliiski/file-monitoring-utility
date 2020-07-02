import * as sqlite from 'sqlite3'
const sql3 = sqlite.verbose();
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:')

export default sequelize