

export function loginUser(req, res) {
    res.render("login", {
        layout: "main",
        title: "Login",
        showNav: false
    });
}

export function registerUser(req, res) {
    res.render("registrieren", {
        layout: "main",
        title: "Registrieren",
        showNav: false
    });
}