import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

if (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL) {
  await import("./db/startAndSeedMemoryDB");
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hotels", async (req, res) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log("Connecting to MongoDB for hotels...");

  try {
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB for hotels!");
    const db = mongoClient.db();
    const collection = db.collection("hotels");
    const hotels = await collection.find().toArray();
    res.send(hotels);
  } catch (error) {
    console.error("Error connecting to MongoDB for hotels:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoClient.close();
  }
});

// New endpoint for countries
app.get("/countries", async (req, res) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log("Connecting to MongoDB for countries...");

  try {
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB for countries!");
    const db = mongoClient.db();
    const collection = db.collection("countries");
    const countries = await collection.find().toArray();
    res.send(countries);
  } catch (error) {
    console.error("Error connecting to MongoDB for countries:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoClient.close();
  }
});

// New endpoint for cities
app.get("/cities", async (req, res) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log("Connecting to MongoDB for cities...");

  try {
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB for cities!");
    const db = mongoClient.db();
    const collection = db.collection("cities");
    const cities = await collection.find().toArray();
    res.send(cities);
  } catch (error) {
    console.error("Error connecting to MongoDB for cities:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoClient.close();
  }
});

// Endpoint for fetching a specific hotel by ID
app.get("/hotels/:id", async (req, res) => {
  const { id } = req.params;
  const mongoClient = new MongoClient(DATABASE_URL);

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const collection = db.collection("hotels");
    const hotel = await collection.findOne({ _id: new ObjectId(id) });
    if (!hotel) return res.status(404).send("Hotel not found");
    res.send(hotel);
  } catch (error) {
    console.error(`Error fetching hotel with ID ${id}:`, error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoClient.close();
  }
});

// Endpoint for fetching a specific country by ID
app.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  const mongoClient = new MongoClient(DATABASE_URL);

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const collection = db.collection("countries");
    const country = await collection.findOne({ _id: new ObjectId(id) });
    if (!country) return res.status(404).send("Country not found");
    res.send(country);
  } catch (error) {
    console.error(`Error fetching country with ID ${id}:`, error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoClient.close();
  }
});

// Endpoint for fetching a specific city by ID
app.get("/cities/:id", async (req, res) => {
  const { id } = req.params;
  const mongoClient = new MongoClient(DATABASE_URL);

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const collection = db.collection("cities");
    const city = await collection.findOne({ _id: new ObjectId(id) });
    if (!city) return res.status(404).send("City not found");
    res.send(city);
  } catch (error) {
    console.error(`Error fetching city with ID ${id}:`, error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoClient.close();
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
