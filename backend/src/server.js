import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Verbindung zur PostgreSQL-Datenbank
const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "DLRGWachdienst",
    password: "01042024Kz",
    port: 5432,
});

// API-Endpunkt zum Speichern der Daten
app.post("/add-people", async (req, res) => {
    const {name, point} = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO people (name,point) VALUES ($1,$2) RETURNING *",
            [name, point],
        )
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Speichern!"});
    }
});

//zweie tabelle
app.post("/add-entry", async (req, res) => {
    const {date, person_id} = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO guardduty (date,person_id) VALUES ($1,$2) RETURNING *",
            [date, person_id],
        )
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Speichern!"});
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

// API-Endpunkt zum Abrufen der gespeicherten Daten
app.get("/get-people", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM people ORDER BY name ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Abrufen der Daten!"});
    }
});

app.get("/get-entry", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM guardduty ORDER BY name ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Abrufen der Daten!"});
    }
});
/*app.get("/", (req, res) => {
    res.send("Server läuft!");
});*/

////////////////////////////////////////////////////
/*app.post("/addPeople-entry", async (req, res) => {
    const {date, person_id} = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO guardduty (date, person_id) VALUES ($1, $2) RETURNING *",
            [date, person_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Speichern!" });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

// API-Endpunkt zum Abrufen der gespeicherten Daten
app.get("/get-entr", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM guardduty ORDER BY date");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Abrufen der Daten!" });
    }
});*/
