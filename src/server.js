import express from "express";
import start from "./support.js";
import { engine } from "express-handlebars";

import { showRegister, registerUser, showLogin, loginUser, logoutUser } from "./controllers/user.js";
import * as store from "./store.ts";
import { setFlash } from "./utils.ts";

import {
    showStart,
    showDashboard,
    showWaschmaschinen,
    showMusikraum,
    showPartyraum,
    showChat,
    createRoomReservation,
    deleteRoomReservation,
    showEditReservation,
    updateRoomReservation
} from "./controllers/pages.js";

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    const depth = req.path.split("/").filter(Boolean).length;
    res.locals.base = depth === 0 ? "./" : "../".repeat(depth);
    next();
});

app.engine("handlebars", engine({
    layoutsDir: "./static/a04/views/layouts",
    partialsDir: "./static/a04/views/partials",
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");
app.set("views", "./static/a04/views");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));

async function requireLogin(req, res, next) {
    const user = await store.authenticateUser(req);

    if (!user) {
        setFlash(res, "Bitte melden Sie sich zuerst an.");
        return res.redirect("/login");
    }

    req.user = user;
    res.locals.user = user;

    next();
}


app.get("/", showStart);
app.get("/startseite", showStart);

app.get("/registrieren", showRegister);
app.get("/register", showRegister);
app.post("/register", registerUser);

app.get("/login", showLogin);
app.post("/login", loginUser);

app.post("/logout", logoutUser);

app.use(requireLogin);

app.get("/dashboard", showDashboard);
app.get("/waschmaschinen", showWaschmaschinen);
app.get("/musikraum", showMusikraum);
app.get("/partyraum", showPartyraum);
app.get("/chat", showChat);

app.post("/reservierungen/:roomId/create", createRoomReservation);
app.post("/reservierungen/:id/delete", deleteRoomReservation);
app.get("/reservierungen/:id/edit", showEditReservation);
app.post("/reservierungen/:id/edit", updateRoomReservation);

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});