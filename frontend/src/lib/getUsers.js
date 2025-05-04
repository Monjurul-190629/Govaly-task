const { default: axios } = require("axios")



const getUsers = async () => {
    try {
        const result = await axios.get('https://govaly-task-production.up.railway.app/api/users');
        return result.data;
    }
    catch(err){
        console.log(`Error : ${err}`)
    }
}


export default getUsers;