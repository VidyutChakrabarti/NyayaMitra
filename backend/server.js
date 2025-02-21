import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

const app = express();

// Initialize Neo4j connection
const driver = neo4j.driver(
    `neo4j+s://${process.env.AURA_INSTANCEID}.databases.neo4j.io`,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

// Test Neo4j connection on startup
async function checkNeo4jConnection() {
    const session = driver.session();
    try {
        await session.run("RETURN 1");
        console.log("✅ Connected to Neo4j successfully!");
    } catch (error) {
        console.error("❌ Failed to connect to Neo4j:", error.message);
    } finally {
        await session.close();
    }
}

checkNeo4jConnection(); // Run the check when server starts

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Route to check database status
app.get("/neo4j-status", async (req, res) => {
    const session = driver.session();
    try {
        await session.run("RETURN 1");
        res.status(200).json({ message: "Neo4j is connected!" });
    } catch (error) {
        res.status(500).json({ message: "Neo4j connection failed!", error: error.message });
    } finally {
        await session.close();
    }
});

// Start the server
app.listen(8501, () => {
    console.log("Server initiated.");
});
