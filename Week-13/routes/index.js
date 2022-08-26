import express from "express";
import axios from "axios";
import { BASE_URL, KEY } from "../env.js";

const router = express.Router();

router.get("/cityForecast", async (req, res) => {
  try {
    const locations = req.query.location.split(",");
    let forecastPromises = [];

    locations.forEach((loc) => {
      const result = axios.get(
        `${BASE_URL}/current.json?key=${KEY}&q=${loc}&aqi=yes`
      );
      forecastPromises.push(result);
    });

    let finalForecasts = [];

    Promise.all(forecastPromises).then((forecasts) => {
      forecasts.forEach((forecast) => {
        finalForecasts.push(forecast.data);
      });
      res.json({ result: finalForecasts });
    });
  } catch (e) {
    res.json({
      message: "Something went wrong",
      error: e,
    });
  }
});

router.get("/daysForecast", async (req, res) => {
  try {
    const days = req.query.days;
    const location = req.query.location;
    if (days > 10) days = 10;
    else if (!days) days = 1;
    const result = await axios.get(
      `${BASE_URL}/forecast.json?key=${KEY}&q=${location}&days=${days}`
    );
    res.json({ message: "Success", result: result.data });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
    });
  }
});

export default router;
