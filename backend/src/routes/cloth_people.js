import express from "express";
import pool from "../database.js";

const router = express.Router();

router.post("/add-cloth/people", async (req, res) => {
    const {date, name, clothTyp} = req.body;
    try {
        const clothResult = await pool.query(
            'SELECT id FROM cloth WHERE type = ($1)',
            [clothTyp]
        );
        const peopleResult = await pool.query(
            'SELECT id FROM person WHERE name = ($1)',
            [name]
        );
        const clothId = clothResult.rows[0].cloth_id;
        const personId = peopleResult.rows[0].person_id;

        const result = await pool.query(
            'INSERT INTO purchase (date, clothid, personid) VALUES ($1, $2, $3) RETURNING *',
            [date, clothId, personId]
        );

        res.json(result.rows[0]);
    } catch
        (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Speichern!"});
    }
})

export default router;

