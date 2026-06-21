import { getAllMachines } from "../models/machine.js";
import { getRoomsByType } from "../models/room.js";
import { getReservationsByRoom } from "../models/reservation.js";
import { getAllMessages } from "../models/chat.js";
import * as reservationModel from "../models/reservation.js";
import { setFlash, getFlash } from "../utils.ts";


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
        showNav: true,
        user: req.user
    });
}

export async function showWaschmaschinen(req, res) {
    const machines = await getAllMachines();

    res.render("waschmaschinen", {
        title: "Waschmaschinen",
        showNav: true,
        pageNav: true,
        machines,
        user: req.user
    });
}

export async function showMusikraum(req, res) {
    const userId = req.user.user_id;

    const rooms = await getRoomsByType("music");
    const musikraum = rooms[0];

    const reservations = await reservationModel.getReservationsByRoomForUser(
        musikraum.room_id,
        userId
    );

    const flash = getFlash(req, res);

    res.render("musikraum", {
        title: "Musikraum",
        showNav: true,
        pageNav: true,
        room: musikraum,
        reservations,
        flash,
        user: req.user
    });
}

export async function showPartyraum(req, res) {
    const userId = req.user.user_id;
    
    const rooms = await getRoomsByType("party");
    const partyraum = rooms[0];

    const flash = getFlash(req, res);
    
    const reservations = await reservationModel.getReservationsByRoomForUser(
        partyraum.room_id,
        userId
    );

    res.render("partyraum", {
        title: "Partyraum",
        showNav: true,
        pageNav: true,
        room: partyraum,
        reservations,
        flash,
        user: req.user
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

export async function createRoomReservation(req, res) {
    const userId = req.user.user_id;
    const roomId = Number(req.params.roomId);

    const { datum, startzeit, endzeit } = req.body;

    await reservationModel.createReservation(
        userId,
        roomId,
        datum,
        startzeit,
        endzeit
    );

    setFlash(res, "Reservierung wurde angefragt. Bitte warten Sie auf Admin-Bestätigung.");

    res.redirect(req.get("Referer") || "/dashboard");
}

export async function deleteRoomReservation(req, res) {
    const reservationId = Number(req.params.id);

    await reservationModel.deleteReservation(reservationId);

    res.redirect(req.get("Referer") || "/dashboard");
}

export async function showEditReservation(req, res) {
    const userId = req.user.user_id;
    const reservationId = Number(req.params.id);

    const reservation = await reservationModel.getReservationForUser(
        reservationId,
        userId
    );

    if (!reservation) {
        return res.redirect("/dashboard");
    }

    res.render("reservation-edit", {
        title: "Reservierung bearbeiten",
        showNav: true,
        pageNav: true,
        reservation
    });
}

export async function updateRoomReservation(req, res) {
    const userId = req.user.user_id;
    const reservationId = Number(req.params.id);

    const { datum, startzeit, endzeit } = req.body;

    await reservationModel.updateReservation(
        reservationId,
        userId,
        datum,
        startzeit,
        endzeit
    );

    res.redirect(req.get("Referer") || "/dashboard");
}

export function showRegister(req, res) {
    const flash = getFlash(req, res);

    res.render("registrieren", {
        title: "Registrieren",
        showNav: false,
        flash
    });
}