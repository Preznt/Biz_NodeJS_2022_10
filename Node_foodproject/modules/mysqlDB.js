import mysql from "mysql2";

const mysqlConfig = {
  host: "localhost",
  port: "3307",
  user: "root",
  database: "fooddb",
  password: "!Biz8080",
};

const mysqlConn = mysql.createConnection(mysqlConfig);

export default mysqlConn;
