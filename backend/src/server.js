import express from "express";
import cors from "cors";
import peopleRouter from "./routes/people.js";
import guarddutyRouter from "./routes/guardduty.js";
import guardduty_peopleRouter from "./routes/guardduty_people.js";
import clothRouter from "./routes/cloth.js";
import cloth_peopleRouter from "./routes/cloth_people.js";
import entry_clothRouter from "./routes/entry_cloth.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", peopleRouter);
app.use("/api", guarddutyRouter);
app.use("/api", guardduty_peopleRouter);
app.use("/api", clothRouter);
app.use("/api", cloth_peopleRouter);
app.use("/api", entry_clothRouter);

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});



//summenfunkton sql js agrugate zählen nicht jedes mal agregatfunction
