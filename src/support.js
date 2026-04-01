export default function setup(app) {
  const port = 8080;
  const host = "0.0.0.0";

  // init
  process.env.NODE_ENV ||= "development";

  // route: always answers with 200 OK if healthy
  app.get("/health", (_req, res) => {
    res.status(200).type("text/plain").send("The server is up and running.");
  });

  // route: provide commit info
  app.get("/commit", (_req, res) => {
    res.status(200).type("text/plain").send(`
GIT_COMMIT_SHA    : ${process.env.GIT_COMMIT_SHA}
GIT_COMMIT_DATE   : ${process.env.GIT_COMMIT_DATE}
GIT_COMMIT_MESSAGE: ${process.env.GIT_COMMIT_MESSAGE}
      `);
  });

  // we may (and will) be running behind a reverse proxy
  app.set("trust proxy", true);

  // starts the listener
  app.listen(port, host);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Point your browser to: http://localhost:${port}`);

  // allows ^C to stop the server and handle the exit
  process.on("SIGINT", function () {
    console.log("Caught interrupt signal, exiting.");
    process.exit();
  });

  // docker sends a SIGTERM to stop a Container
  process.on("SIGTERM", function () {
    console.log("Caught termination signal, exiting.");
    process.exit();
  });
}
