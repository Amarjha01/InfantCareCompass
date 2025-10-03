const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const commnApiEndpoint = {
   register:{
    url:`${API_BASE_URL}/api/signup`,
    method:'post'
   },
   signin:{
    url:`${API_BASE_URL}/api/signin`,
    method:'post'
   },
   logout:{
    url:`${API_BASE_URL}/api/logout`,
    method:'post'
   },
   doctorInfo:{
    url:`${API_BASE_URL}/api/doctorinfo`,
    method:'get'
   },
   submitQuestion:{
    url:`${API_BASE_URL}/api/questions`,
    method:'post'
   },
   getQuestions:{
    url:`${API_BASE_URL}/api/questions`,
    method:'get'
   },
   newsletter:{
    url:`${API_BASE_URL}/api/subscribe-newsletter`,
    method:'post'
   },
   getUserInfo:{
    url:`${API_BASE_URL}/api/user/me`,
    method:'get'
   }
}

export default commnApiEndpoint;