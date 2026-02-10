import fetch from "node-fetch";

// --- CONFIG ---
const API_KEY = process.env.ROBLOX_API_KEY;  // GitHub secret
const UNIVERSE_ID = 5953980111;             // Your universe ID
const DATASTORE_NAME = "GlobalRBLXPrices_v2";

// Example price fetch — replace with Alpha Vantage API
async function getLatestPrice() {
    // Fake price for demo
    return {
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        price: Math.random() * 100
    };
}

// Save to Roblox Open Cloud OrderedDataStore
async function savePrice(entry) {
    const url = `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/ordered/entries`;

    const payload = {
        datastoreName: DATASTORE_NAME,
        entry: {
            value: Date.now(),      // timestamp as value
            metadata: entry
        }
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("Roblox API response:", data);

        if (!res.ok) {
            throw new Error(`Failed to save: ${res.status} ${JSON.stringify(data)}`);
        }

        console.log("✅ Price saved:", entry);
    } catch (err) {
        console.error("❌ Error saving price:", err);
        process.exit(1); // fail workflow if error
    }
}

async function main() {
    console.log("Fetching latest price...");
    const latestPrice = await getLatestPrice();
    console.log("Fetched price:", latestPrice);

    await savePrice(latestPrice);
}

main();
