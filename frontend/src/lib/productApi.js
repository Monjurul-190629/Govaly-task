import axios from "axios";

const getProducts = async () => {
    try{
        const result = await axios.get('http://localhost:5000/api/products');
        return result.data;
    }
    catch(err) {
        console.log(err)
    }
}

export default getProducts;