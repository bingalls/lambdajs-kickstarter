import { exec } from "child_process"; // spawn instead of exec for large data
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as favicon from "serve-favicon";

const app = express();
const domain = "localhost";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
};
const nodever = "nodejs12.x";
const port = 3010;

app.options("*", cors());
app.use(favicon(__dirname + "/favicon.ico"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: express.Request, res: express.Response) => {
  exec(
    `docker run --rm -v $PWD:/var/task:ro,delegated lambci/lambda:${nodever} ` +
      `get.handler '{"http": {"method": "get"}}' -p 9001:9001`,
    (error, stdout) => {
      if (error) {
        res.send(`<pre>error: ${error.message}</pre>`);
        return;
      }
      res.set(headers);
      res.send(`${stdout}`.replace(/\\"/g, '"'));
    }
  );
});

app.post("/", (req: express.Request, res: express.Response) => {
  const datetime = req.body.date.substr(0, 10); // trim time off the end
  exec(
    `docker run --rm -v $PWD:/var/task:rw,delegated lambci/lambda:${nodever} post.handler '` +
      `{"date": "${datetime}", "organizer": "${req.body.organizer}", "venue": "${req.body.venue}"}' -p 9001:9001`,
    (error, stdout) => {
      if (error) {
        res.send(`<pre>error: ${error.message}</pre>`);
        return;
      }
      res.set(headers);
      res.send(stdout);
    }
  );
});

app.listen(port, () => console.log(`http server at http://${domain}:${port}`));
