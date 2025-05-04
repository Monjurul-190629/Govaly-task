const axios = require('axios');  

const getProductById = async (id) => { 
    try {
        const result = await axios.get(`http://localhost:5000/api/products/${id}`);
        return result.data;
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
}

export default getProductById;
