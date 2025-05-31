// 연결할 mysql 정보. 쿼리를 처리하고 함수를 이용하여 데이터베이스와 연결하는 과정에서 async/await을 사용하므로 mysql2/promise에서 불러와야 한다.
import mysql from "mysql2/promise";

// 지금은 Auth기능이 없으므로 한 사람만을 위한 데이터베이스를 이용한다.
// 나중에 로그인 기능을 추가하고, 계정별 데이터베이스를 생성/이용하려면 아래 주석처리된 코드를 이용하자.

//the async await function which connects to the database using the credentials in the .env files
// const ConnectDB = async () => {

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: process.env.DB_WAITFORCONNECTIONS === "true",
    connectionLimit: process.env.DB_CONNECTIONLIMIT ? parseInt(process.env.DB_CONNECTIONLIMIT) : undefined,
    queueLimit: process.env.DB_QUEUELIMIT ? parseInt(process.env.DB_QUEUELIMIT) : undefined,
});

// // async await query which creates the database if it doesn't exist
//     await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``);
//     console.log(`Database ${process.env.DB_DATABASE} created or already exists.`);

//     // async await query which changes to the pool's database to the newly created database
//     await pool.query(`USE \`${process.env.DB_DATABASE}\``);
//     console.log(`Switched to database ${process.env.DB_DATABASE}`);

//     // async await query which creates the 'users' table if it doesn't exist and creates table for id, name, email
//     await pool.query(`CREATE TABLE IF NOT EXISTS \`${process.env.DB_TABLENAME}\` (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(50) NOT NULL,
//         email VARCHAR(100) NOT NULL UNIQUE,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`);
//     console.log(`${process.env.DB_TABLENAME} table created or already exists.`);
//     // returning pool to further add querys in the database we did till now
//     return pool;
// };

//exporting the function
// export default ConnectDB;
export default pool;
