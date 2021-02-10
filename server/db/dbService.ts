import * as mysql from 'mysql';
import * as dotenv from 'dotenv';
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  // console.log('db ' + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getUsers() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users;';

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
export default DbService;
