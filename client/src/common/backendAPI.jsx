const backendDomain = "http://localhost:5000";

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
   submitQuestion:{
    url:`${backendDomain}/api/questions`,
    method:'post'
   },
   getQuestions:{
    url:`${backendDomain}/api/questions`,
    method:'get'
   },
   newsletter:{
    url:`${backendDomain}/api/subscribe-newsletter`,
    method:'post'
   },
}

export default commnApiEndpoint;