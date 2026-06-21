import * as store from "../store.ts";
import { setFlash, getFlash } from "../utils.ts";

export function showRegister(req, res) {
    const flash = getFlash(req, res);

    res.render("registrieren", {
        title: "Registrieren",
        showNav: false,
        flash
    });
}
export function showLogin(req, res) {
    const flash = getFlash(req, res);

    res.render("login", {
        title: "Login",
        showNav: false,
        flash
    });
}

export async function registerUser(req, res) {
    const { login, firstname, lastname, password, password2 } = req.body;

    if (!login || !firstname || !lastname || !password || !password2) {
        setFlash(res, "Bitte füllen Sie alle Pflichtfelder aus.");
        return res.redirect("/register");
    }

    const existingUser = await store.getUserByLogin(login);

    if (existingUser) {
        setFlash(res, "Dieser Login-Name ist bereits vergeben.");
        return res.redirect("/register");
    }

    if (password.length < 8) {
        setFlash(res, "Das Passwort muss mindestens 8 Zeichen lang sein.");
        return res.redirect("/register");
    }

    if (password !== password2) {
        setFlash(res, "Die Passwörter stimmen nicht überein.");
        return res.redirect("/register");
    }

    const passwordHash = Bun.password.hashSync(password);

    await store.createUser(
        login,
        firstname,
        lastname,
        passwordHash
    );

    setFlash(res, "Registrierung erfolgreich. Sie können sich jetzt einloggen.");
    res.redirect("/login");
}

export async function loginUser(req, res) {
    const { login, password } = req.body;

    if (!login || !password) {
        setFlash(res, "Bitte Login-Name und Passwort eingeben.");
        return res.redirect("/login");
    }

    const user = await store.checkCredentials(login, password);

    if (!user) {
        setFlash(res, "Login-Name oder Passwort ist falsch.");
        return res.redirect("/login");
    }

    res.cookie("user_id", String(user.user_id), {
        httpOnly: true,
        path: "/"
    });

    res.redirect("/dashboard");
}

export function logoutUser(req, res) {
    res.clearCookie("user_id", {
        path: "/"
    });

    res.redirect("/login");
}