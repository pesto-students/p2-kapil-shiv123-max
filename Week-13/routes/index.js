import express from "express";
import axios from "axios";
import { BASE_URL, KEY } from "../env.js";
import { daysDifference } from "../utils.js";

const router = express.Router();

// API endpoint to see current weather forecast of a particular city
router.get("/currentForecast", (req, res) => {
  try {
    const location = req.body.location;
    if (!location) {
      return res.status(400).json({
        message: "Please provide a city",
      });
    }

    const result = axios.get(
      `${BASE_URL}/current.json?key=${KEY}&q=${location}&aqi=yes`
    );

    result.then((forecast) => {
      res.status(200).json({
        message: "Success",
        result: forecast.data,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
});

// API endpoint to see weather forecast of multiple cities at one time
router.get("/multipleCityForecast", async (req, res) => {
  try {
    const locations = req.body.location;
    const page = req.body.page;
    const itemsPerPage = req.body.pageSize;
    const filterCity = req.body.filterCity;

    if (locations.length <= 1) {
      return res.status(400).json({
        message: "Please provide more than one cities.",
      });
    }
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

      // pagination of data
      if (page && itemsPerPage) {
        const paginatedResult = finalForecasts.slice(
          page * itemsPerPage - itemsPerPage,
          page * itemsPerPage
        );

        return res.status(200).json({
          length: paginatedResult.length,
          result: paginatedResult,
        });
      }

      // filtering the data by city name
      res.status(200).json({
        length: filterCity ? 1 : finalForecasts.length,
        result: filterCity
          ? finalForecasts.filter((item) => item.location.name === filterCity)
          : finalForecasts,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
});

// API endpoint to see weather for X days 0<=X<=10
router.get("/daysForecast", (req, res) => {
  try {
    const days = req.body.days;
    const location = req.body.location;
    if (!location) {
      return res.status(400).json({
        message: "Please provide a city",
      });
    }
    if (days > 10 || !days) {
      return res.status(400).json({
        message:
          "You can only view weather in the range of next 0-10 days. To see more future forecast, visit the /dateForecast endpoint.",
      });
    }
    const result = axios.get(
      `${BASE_URL}/forecast.json?key=${KEY}&q=${location}&days=${days}`
    );
    result.then((finalResult) => {
      res
        .status(200)
        .json({ message: "Success", result: finalResult.data.forecast });
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
});

// API Endpoint t0 see weather forecast of any future date in range of 14 days to 300 days
router.get("/dateForecast", (req, res) => {
  try {
    const location = req.body.location;
    if (!location) {
      return res.status(400).json({
        message: "Please provide the city",
      });
    }
    const date = req.body.date;
    const formattedDate = date.split("-").reverse().join("-");
    let daysDiff = daysDifference(date);
    if (daysDiff < 14) {
      return res.status(400).json({
        message:
          "Please choose a date between 14 days and 300 days from the present day. To see the weather forecast for the next 10 days visit the /daysForecast endpoint",
      });
    }
    const forecastPromise = axios.get(
      `${BASE_URL}/future.json?key=${KEY}&q=${location}&dt=${formattedDate}`
    );

    forecastPromise.then((forecast) => {
      res.status(200).json({ message: "Success", result: forecast.data });
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
});

export default router;
