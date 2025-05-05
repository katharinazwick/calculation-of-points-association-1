import pg from "pg";

const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "DLRGWachdienst",
    password: "01042024Kz",
    port: 5432,
});

export default pool;