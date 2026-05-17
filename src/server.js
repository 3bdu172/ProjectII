import express from "express";
import start from "./support.js";
import { engine } from "express-handlebars";

import { loginUser, registerUser } from "./controllers/user.js";

import {
    showStart,
    showDashboard,
    showWaschmaschinen,
    showMusikraum,
    showPartyraum,
    showChat
} from "./controllers/pages.js";

const app = express();
const port = 8080;

app.engine("handlebars", engine({
    layoutsDir: "./static/a04/views/layouts",
    partialsDir: "./static/a04/views/partials",
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");
app.set("views", "./static/a04/views");

app.use(express.static("static"));


app.get("/startseite", showStart);
app.get("/login", loginUser);
app.get("/registrieren", registerUser);
app.get("/dashboard", showDashboard);
app.get("/waschmaschinen", showWaschmaschinen);
app.get("/musikraum", showMusikraum);
app.get("/partyraum", showPartyraum);
app.get("/chat", showChat);

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});