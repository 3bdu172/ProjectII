import express from "express";
import start from "./support.js";

const app = express();
// middleware: serves all files below the `static` dir
app.use(express.static("static"));

start(app);
