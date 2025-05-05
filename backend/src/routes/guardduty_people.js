import express from "express";
import pool from "../database.js";

const router = express.Router();


router.get("/get-entry/people", async (req, res) => {
    try {
        const result = await pool.query("SELECT gd.date, ARRAY_AGG(p.name) AS people FROM duty gd JOIN participation gp ON gd.id = gp.dutyId JOIN person p ON gp.personId = p.id GROUP BY gd.date ORDER BY gd.date DESC ");

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Abrufen der Daten!"});
    }
});

export default router;
