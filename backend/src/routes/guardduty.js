import express from "express";
import pool from "../database.js";

const router = express.Router();

router.post("/add-entry", async (req, res) => {
    const {date, newName} = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO duty (date) VALUES ($1) RETURNING *",
            [date],
        );
        const guardduty_id = result.rows[0].id;

        for (const name of newName) {
            //hier problem
            let personResult = await pool.query("SELECT id FROM person WHERE name = ($1)", [name]);
            let person_id;

            if (personResult.rows.length  === 0) {
                // Wenn die Person nicht existiert, dann anlegen
                const insertResult = await pool.query("INSERT INTO person (name) VALUES ($1) RETURNING *", [name]);
                person_id = insertResult.rows[0].id; // ID der neu eingefügten Person
            } else {
                person_id = personResult.rows[0].id; // ID der bereits vorhandenen Person
            }
            console.log(date, person_id);
            await pool.query("INSERT INTO participation (dutyId, personId) VALUES ($1, $2)", [guardduty_id, person_id]);
        }

        res.json();
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Fehler beim Speichern!"});
    }
});
export default router;