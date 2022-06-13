// psql --host=ec2-63-34-153-52.eu-west-1.compute.amazonaws.com --port=5432 --username=azpqezrxmrhtox --password --dbname=d6hh7qahd7pjp8
// password: c39f973b8b27d46d209ec590790fa2fcadfc835e0a44961d7a00628951cb9492
import * as pg from "pg";

const {Pool} = pg;

const pool = new Pool({
    connectionString: "postgres://azpqezrxmrhtox:c39f973b8b27d46d209ec590790fa2fcadfc835e0a44961d7a00628951cb9492@ec2-63-34-153-52.eu-west-1.compute.amazonaws.com:5432/d6hh7qahd7pjp8",
    ssl: {
        rejectUnauthorized: false,
    }
});
export default pool;
