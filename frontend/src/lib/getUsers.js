import axios from "axios";

const API_URL = 'https://govaly-task-production.up.railway.app/api/users';

// Optional simple in-memory cache
let cachedUsers = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

const getUsers = async () => {
    const now = Date.now();

    // Return cached users if within the cache duration
    if (cachedUsers && now - lastFetchTime < CACHE_DURATION) {
        return cachedUsers;
    }

    try {
        const { data } = await axios.get(API_URL, {
            timeout: 5000, // 5 seconds timeout
            headers: {
                'Accept': 'application/json',
            },
        });

        // Cache result
        cachedUsers = data;
        lastFetchTime = now;

        return data;
    } catch (err) {
        console.error("Error fetching users:", err.message);
        return null;
    }
};

export default getUsers;
