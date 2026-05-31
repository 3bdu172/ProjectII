import { getAllMachines } from "../models/machine.js";
import { getRoomsByType } from "../models/room.js";
import { getReservationsByRoom } from "../models/reservation.js";
import { getAllMessages } from "../models/chat.js";


export const dashboardSections = [
    {
        title: "Waschmaschinen",
        description: "Hier sieht man den Status der Waschmaschinen.",
        url: "/waschmaschinen",
        buttonText: "Anzeigen"
    },
    {
        title: "Musikraum",
        description: "Hier kann man den Musikraum reservieren.",
        url: "/musikraum",
        buttonText: "Reservieren"
    },
    {
        title: "Partyraum",
        description: "Hier kann man den Partyraum reservieren.",
        url: "/partyraum",
        buttonText: "Reservieren"
    }
];


export function showStart(req, res) {
    res.render("startseite", {
        showNav: false
    });
}

export function showDashboard(req, res) {
    res.render("dashboard", {
        dashboardSections: dashboardSections,
        showNav: true
    });
}

export async function showWaschmaschinen(req, res) {
    const machines = await getAllMachines();

    res.render("waschmaschinen", {
        title: "Waschmaschinen",
        showNav: true,
        pageNav: true,
        machines
    });
}

export async function showMusikraum(req, res) {
    const rooms = await getRoomsByType("music");
    const musikraum = rooms[0];

    const reservations = await getReservationsByRoom(musikraum.room_id);

    res.render("musikraum", {
        title: "Musikraum",
        showNav: true,
        room: musikraum,
        reservations
    });
}

export async function showPartyraum(req, res) {
    const rooms = await getRoomsByType("party");
    const partyraum = rooms[0];

    const reservations = await getReservationsByRoom(partyraum.room_id);

    res.render("partyraum", {
        title: "Partyraum",
        showNav: true,
        room: partyraum,
        reservations
    });
}

export async function showChat(req, res) {
    const messages = await getAllMessages();

    res.render("chat", {
        title: "Wohnheim Chat",
        showNav: true,
        messages
    });
}