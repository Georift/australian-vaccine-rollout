import * as d3 from "d3";
import dateFns from "date-fns";
import fs from "fs";

const csvData = d3.csvParse(fs.readFileSync("./vaccinations.csv").toString());

const parseNumber = (str) =>
  typeof str === "string" && str.length > 1
    ? Number(str.replace(/,/g, ""))
    : null;

const parsedCsv = csvData.map((row) => ({
  date: dateFns.parse(row.Date, "dd/MM/yyyy", new Date()),
  state: row.State,
  cumulativeDoses: parseNumber(row["Cumulative doses"]),
  newDoses: parseNumber(row["New doses"]),
  cumulativeFirstDose: parseNumber(row["Dose1"]),
  newFirstDose: parseNumber(row["Dose1 daily doses"]),
  cumulativeSecondDose: parseNumber(row["Dose2"]),
  newSecondDose: parseNumber(row["Dose2 daily doses"]),
}));

fs.writeFileSync("./vaccinations.json", JSON.stringify(parsedCsv, null, 2));
