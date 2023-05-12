import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true, //ye basically krte he hum ...jab hume cookie wagera set krni he
    //ya hume request ke sath me cookie send krni he..ye agar falsed rahega to koi vi cookie send nai hogi aur client me vi cookie set nai kr payega
    
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json', //server ko bta raha u ki hum json data sirf accept kr sakte he
    },
});

// List of all the endpoints
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const  activate=(data)=>api.post('/api/activate',data);
export const  logout=()=>api.post('/api/logout');
export const createRoom=(data)=>api.post('/api/rooms',data)
export const getAllRooms=()=>api.get('/api/rooms')



//interceptor

api.interceptors.response.use((config)=>{
    return config
},async(err)=>{

    const originalRequest=err.config;
    if( originalRequest.response.status===401 && originalRequest.config._isRetry){
        originalRequest._isRetry=true;
        try{
       const response=await axios.get("http://localhost:5000/api/refresh",{
        withCredentials:true
       })


       return api.request(originalRequest)
        }
        catch(err){
console.log(err)
        }



    }
    throw err;
})










export default api;


//react me .env me har nam "REACT_APP " se suru hona chaiye
