const dashboardSections = [
    {
        title: "Waschmaschinen",
        textBefore: "Hier sieht man den Status der",
        linkText: "Waschmaschinen",
        url: "/waschmaschinen",
        textAfter: "."
    },
    {
        title: "Musikraum",
        textBefore: "Hier kann man den",
        linkText: "Musikraum",
        url: "/musikraum",
        textAfter: "reservieren."
    },
    {
        title: "Partyraum",
        textBefore: "Hier kann man den",
        linkText: "Partyraum",
        url: "/partyraum",
        textAfter: "reservieren."
    }
];

const machines = [
    {
        name: "Anne",
        status: "BELEGT 0:35 h",
        statusClass: "occupied"
    },
    {
        name: "Fredy",
        status: "BELEGT 0:02 h",
        statusClass: "occupied"
    },
    {
        name: "Marta",
        status: "BELEGT 0:13 h",
        statusClass: "occupied"
    },
    {
        name: "Jakub",
        status: "FREI",
        statusClass: "free"
    },
    {
        name: "Max",
        status: "FREI",
        statusClass: "free"
    },
    {
        name: "Zoja",
        status: "BELEGT 0:38 h",
        statusClass: "occupied"
    }
];

export function showStart(req, res) {
    res.render("startseite", {
        layout: "main",
        title: "Startseite",
        showNav: false
    });
}

export function showDashboard(req, res) {
    res.render("dashboard", {
        layout: "main",
        title: "Dashboard",
        sections: dashboardSections,
        showNav: true
    });
}

export function showWaschmaschinen(req, res) {
    res.render("waschmaschinen", {
        layout: "main",
        title: "Waschmaschinen",
        machines: machines,
        showNav: true
    });
}

export function showMusikraum(req, res) {
    res.render("musikraum", {
        layout: "main",
        title: "Musikraum",
        showNav: true
    });
}

export function showPartyraum(req, res) {
    res.render("partyraum", {
        layout: "main",
        title: "Partyraum",
        showNav: true
    });
}

export function showChat(req, res) {
    res.render("chat", {
        layout: "main",
        title: "Wohnheim Chat",
        showNav: true
    });
}