const { default: axios } = require("axios")


const getUserById = async (id) => {
    try {
        const result = await axios.get(`https://govaly-task-production.up.railway.app/api/users/${id}`);
        return result.data;
    }
    catch(err){
        console.log(`Error : ${err}`)
    }
}


export default getUserById;