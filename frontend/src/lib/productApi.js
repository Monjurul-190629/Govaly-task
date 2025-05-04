import axios from "axios";

const API_URL = 'https://govaly-task-production.up.railway.app/api/products';

// Optional simple in-memory cache
let cachedData = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

const getProducts = async () => {
    const now = Date.now();

    // Return cached data if within the cache duration
    if (cachedData && now - lastFetch < CACHE_DURATION) {
        return cachedData;
    }

    try {
        const { data } = await axios.get(API_URL, {
            timeout: 5000, // 5 seconds timeout
            headers: {
                'Accept': 'application/json',
            },
        });

        // Cache result
        cachedData = data;
        lastFetch = now;

        return data;
    } catch (err) {
        console.error("Error fetching products:", err.message);
        return null;
    }
};

export default getProducts;
