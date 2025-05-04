const { default: axios } = require("axios")




const getBookedProduct = async () => {
    try{
        const result = axios.get('http://localhost:5000/api/book-product');
        return result.data;
    }
    catch(err){
        console.log(`Error : ${err}`)
    }
}

export  default getBookedProduct;