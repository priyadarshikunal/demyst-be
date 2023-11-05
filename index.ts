import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import crypto from "crypto";
import cors from 'cors';
import { getSheetFromProvider } from "./sheet";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())
app.use(cors());

// Mock Database
// Create an empty table on server start
const db = new Map();

// Debug endpoint to VIEW the database from the client
app.get("/data", (req: Request, res: Response) => {
  res.json(Object.fromEntries(db));
});

// Debug endpoint to EMPTY the database from the client
app.get("/clean", (req, res) => {
  db.clear();
  res.json(Object.fromEntries(db));
});

// Application Routes
app.get("/accountingProviders", (req, res) => {
  res.json({
    providers: [
      { name: "Xero", id: "xero" },
      { name: "MYOB", id: "myob" },
    ],
  });
});

app.get("/init", (req: Request, res: Response) => {
  const uuid = crypto.randomUUID().toString();
  db.set(uuid, {});
  res.json({ id: uuid });
});

app.get("/balancesheet/:applicationId", (req, res) => {
  const applicationId = req.params["applicationId"]!;
  const loanAmount = req.query["loanAmount"]!;
  const businessId = req.query["businessId"]!;
  const accountingProvider = req.query["accountingProvider"]!;
  const application = db.get(applicationId);
  application.loanAmount=loanAmount;
  application.businessId = businessId;
  application.accountingProvider = accountingProvider;
  application.sheet = getSheetFromProvider(accountingProvider.toString());
  res.json(application.sheet);
});

app.get("/outcome/:applicationId", (req, res) => {
  const applicationId = req.params.applicationId;
  const application = db.get(applicationId)
  console.log(`Outcome for ${applicationId}`);
  // Apply rules to summarize the application

  // Mock a decision engine here
  res.json({ outcome: JSON.stringify(application)});
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
