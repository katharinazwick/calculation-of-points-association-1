import express from "express";
import pool from "../database.js";

const router = express.Router();

router.post("/add-cloth", async (req, res) => {
    const {clothTyp, score} = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO cloth (type,price) VALUES ($1,$2) RETURNING *",
            [clothTyp, score],
        )
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Speichern!"});
    }
});

router.get("/get-cloth", async (req, res) => {
    try {
        const result = await pool.query("SELECT type, price FROM cloth ORDER BY price ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Abrufen der Daten!"});
    }
});



export default router;