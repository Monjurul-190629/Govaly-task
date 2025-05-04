import axios from "axios";

// Optional: Simple in-memory cache to avoid repeated requests
let cachedResponse = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60; // 1 minute

const getBookedProduct = async () => {
  const now = Date.now();

  if (cachedResponse && now - lastFetchTime < CACHE_DURATION) {
    return cachedResponse;
  }

  try {
    const { data } = await axios.get(
      'https://govaly-task-production.up.railway.app/api/book-product',
      {
        timeout: 5000, // 5 seconds timeout
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    // Cache result
    cachedResponse = data;
    lastFetchTime = now;

    return data;
  } catch (err) {
    console.error("Error fetching booked products:", err.message);
    return null;
  }
};

export default getBookedProduct;
