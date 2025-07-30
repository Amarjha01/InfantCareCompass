// const backendDomain = "http://localhost:3000";
const backendDomain = "https://api.infantcarecompass.live";


const commnApiEndpoint = {
   register:{
    url:`${backendDomain}/api/signup`,
    method:'post'
   },
   signin:{
    url:`${backendDomain}/api/signin`,
    method:'post'
   },
   logout:{
    url:`${backendDomain}/api/logout`,
    method:'post'
   },
   doctorInfo:{
    url:`${backendDomain}/api/doctorinfo`,
    method:'get'
   },
}

export default commnApiEndpoint;