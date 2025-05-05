import express from "express";
import pool from "../database.js";

const router = express.Router();

router.post("/add-people", async (req, res) => {
    const {name} = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO person (name) VALUES ($1) RETURNING *",
            [name],
        )
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Speichern!"});
    }
});

router.get("/get-people", async (req, res) => {
    try {
        await pool.query("UPDATE person p SET totalscore = (SELECT COUNT(*) FROM participation gp WHERE gp.personId = p.id )");

        await pool.query(`UPDATE person p
                          SET partialscore = totalscore + COALESCE((SELECT SUM(c.price)
                                                                    FROM purchase cp
                                                                             JOIN cloth c ON cp.clothId = c.id
                                                                    WHERE cp.personId = p.id), 0) `);
        const result = await pool.query("SELECT name, totalscore, partialscore FROM person ORDER BY name ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Abrufen der Daten!"});
    }
});

export default router;