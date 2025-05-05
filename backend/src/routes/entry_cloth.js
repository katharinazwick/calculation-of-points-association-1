import express from "express";
import pool from "../database.js";

const router = express.Router();

router.get(`/add-entry/cloth/:name`, async (req, res) => {
    const name = req.params.name
    try {
        let {rows} = await pool.query('SELECT id FROM person WHERE name = ($1)',
            [name]
        );
        const person_id = rows[0].person_id;

       const guarddutyResult = await pool.query(`SELECT g.date FROM duty g JOIN participation gp ON g.id = gp.dutyid WHERE gp.personid = ($1) ORDER BY g.date DESC`,
            [person_id]);
        guarddutyResult.rows.forEach((row) => {
            row.order = "Wachdienst";
            row.amount = 1;
            row.score = 0;
        })
        const clothResult = await pool.query(`SELECT cp.date, c.type, c.price FROM purchase cp JOIN cloth c ON cp.clothid = c.id  WHERE cp.personid = ($1) ORDER BY cp.date DESC `,
            [person_id]);
        clothResult.rows.forEach((row) => {
            row.score = 0;
        })
        const result = [...guarddutyResult.rows, ...clothResult.rows];
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Abrufen der Daten!"});
    }
});

export default router;
