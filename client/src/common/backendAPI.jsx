
// const backendDomain = "http://localhost:5000";
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
   newsletter:{
    url:`${backendDomain}/api/subscribe-newsletter`,
    method:'post'
   },
}

export default commnApiEndpoint;