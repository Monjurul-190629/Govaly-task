import axios from "axios";

const API_URL = 'https://govaly-task-production.up.railway.app/api/users';

// Optional: Simple in-memory cache for a specific user
let cachedUserData = {};
const CACHE_DURATION = 60 * 1000; // 1 minute

const getUserById = async (id) => {
    if (!id) {
        console.error("Invalid user ID provided.");
        return null;
    }

    const now = Date.now();

    // Return cached data if the user is already fetched within the cache duration
    if (cachedUserData[id] && now - cachedUserData[id].lastFetch < CACHE_DURATION) {
        return cachedUserData[id].data;
    }

    try {
        const { data } = await axios.get(`${API_URL}/${id}`, {
            timeout: 5000, // 5 seconds timeout
            headers: {
                'Accept': 'application/json',
            },
        });

        // Cache the result
        cachedUserData[id] = {
            data,
            lastFetch: now,
        };

        return data;
    } catch (err) {
        console.error(`Error fetching user by ID (${id}):`, err.message);
        return null;
    }
};

export default getUserById;
