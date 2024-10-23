// import { createPool } from "mysql2";

// // Create a singleton pool
// let pool;

// if (!pool) {
//   pool = createPool({
//     host: process.env.NEXT_PUBLIC_DB_HOST,
//     user: process.env.NEXT_PUBLIC_DB_USER,
//     password: process.env.NEXT_PUBLIC_DB_PASSWORD,
//     database: process.env.NEXT_PUBLIC_DB_DATABASE,
//     port: 3306,
//     connectionLimit: 10,
//     waitForConnections: true,
//     queueLimit: 0,
//   });

//   pool.getConnection((err, conn) => {
//     if (err) {
//
//     } else {
//
//       conn.release();
//     }
//   });
// }

// const executeQuery = (query, arrParams) => {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, conn) => {
//       if (err) {
//
//         return reject(err);
//       }

//       conn.query(query, arrParams, (err, data) => {
//         // Ensure the connection is released even if there's an error
//         conn.release();

//         if (err) {
//
//           return reject(err);
//         }

//         resolve(data);
//       });
//     });
//   });
// };

// export default executeQuery;
