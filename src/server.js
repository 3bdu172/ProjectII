import express from "express";
import start from "./support.js";

const app = express();
const port = 8080;

// middleware: serves all files below the `static` dir
app.use(express.static("static"));

start(app, port);
