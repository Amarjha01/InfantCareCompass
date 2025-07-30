
const consultation = async (req,resp)=>{
console.log('conceltation');
resp.status(200).json({
    message:'welcome to conseltation page'
})
}

export default consultation;