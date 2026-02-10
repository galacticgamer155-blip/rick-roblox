// update-price.js
import fetch from "node-fetch";

// =====================
//  ⚡ CONFIG
// =====================
const API_KEY = process.env.ROBLOX_API_KEY; // store your key in GitHub secret or local env
const UNIVERSE_ID = "5953980111";
const DATASTORE_NAME = "GlobalRBLXPrices_v2";

// Example price data
const price = 73.45;
const now = new Date();
const timestamp = Math.floor(now.getTime() / 1000);

// =====================
//  ⚡ PAYLOAD
// =====================
const body = {
  datastoreName: DATASTORE_NAME,
  entry: {
    value: timestamp,
    metadata: {
      date: now.toISOString(),
      price: price
    }
  }
};

// =====================
//  ⚡ POST TO OPEN CLOUD
// =====================
async function postPrice() {
  try {
    const res = await fetch(
      `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/ordered/entries`,
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const text = await res.text();
    if (!res.ok) {
      console.error("Failed to save OrderedDataStore:", res.status, text);
      return;
    }

    console.log("Success! Response:", text);
  } catch (err) {
    console.error("Error posting price:", err);
  }
}

// Run it
postPrice();
