import jwt from 'jsonwebtoken';

const isAdmin=async(req,res,next)=>{
    const role = req.tokendata?.role;
    if(role.toLowerCase()=='admin' ) return next();
    else{
        return res.status(403).json("Access denied");
    }
}
export default isAdmin; 