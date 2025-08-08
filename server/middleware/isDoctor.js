const isDoctor = async(req,res,next)=>{
    const role = req.tokendata?.role;
    if(role.toLowerCase()==='doctor'){
        return next();
    }else{
        return res.status(403).json("Access denied");
    }
}

export default isDoctor;