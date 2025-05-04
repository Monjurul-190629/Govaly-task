import axios from 'axios';

const getProductById = async (id) => {
    if (!id) {
        console.error("Invalid product ID provided.");
        return null;
    }

    try {
        const { data } = await axios.get(
            `https://govaly-task-production.up.railway.app/api/products/${id}`,
            {
                timeout: 5000, // 5 seconds timeout
                headers: {
                    'Accept': 'application/json',
                },
            }
        );
        return data;
    } catch (err) {
        console.error(`Error fetching product by ID (${id}):`, err.message);
        return null;
    }
};

export default getProductById;
