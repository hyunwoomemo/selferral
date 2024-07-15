import { createPool } from "mysql2";

const pool = createPool({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

pool.getConnection((err, conn) => {
  if (err) console.log("Error connecting to db...");
  else console.log("Connected to db...!");
  conn.release();
});

const executeQuery = (query, arrParams) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("Error getting connection from pool");
        return reject(err);
      }

      conn.query(query, arrParams, (err, data) => {
        conn.release(); // 사용 후 반드시 연결 해제

        if (err) {
          console.log("Error in executing the query");
          return reject(err);
        }

        resolve(data);
      });
    });
  });
};

export default executeQuery;
