import jwt from 'jsonwebtoken';


async function authtoken(req,res,next) {
    try {
        const authheader = req.headers.authorization || req.headers.token;
        if(!authheader){
           return res.status(401).json({
                message:'Authorization token missing. Please login.'
            })
        }
            
        const token = authheader.startsWith('Bearer ') ? authheader.split(" ")[1] : authheader

            jwt.verify(token,process.env.TOKEN_SECRET_KEY,(err,decoded) => {

                if (err) {
                    console.error("token veryfication error:", err);
                    return res.status(401).json({
                        message:'Invalid or expired token. Please login again.'
                    })
                   }
                else{
                    
                 req.id = decoded?.tokendata.id;

                     if (!req.id) {
                     return res.status(403).json({ message: 'Token is missing user ID.' });
                      } else {

                         console.log('id:',req.id)
                          next();
                       }
                     }
                                   
            })
        

    } catch (error) {
        res.status(400).json({
            message: error.message || error, // Log the error message instead of the whole error object
            data : [],
            error: true,
            success: false,
          });
    }
}
export default authtoken;