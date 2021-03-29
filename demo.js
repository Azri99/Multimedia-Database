const oracledb = require('oracledb');
require('dotenv').config();

async function initialize() {
  const dbConfig = process.env;
  const pool = await oracledb.createPool(dbConfig);
}
async function close() {
  await oracledb.getPool().close();
}

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

async function run(){
    try {
        await initialize();
        let result = await simpleExecute('select * from demo');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

run();
