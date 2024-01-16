// middlewareValidation.js 
// MIDDLEWARE-------------------------------------------------------------------------------
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'eriyfbercbieobu3hrurebuberHBububUOBUOUBuo3728u'


export const middlewareValidation = (req,res,next) =>{
    // get token from header
        const token = JSON.parse(req.headers['x-access-token']);
        // console.log(token.token)
    
        // verify token
        jwt.verify(token.token, JWT_SECRET, (error) => {
            if (error) {
                return res.status(401).json({ status: 'error', message: 'Token tidak valid' });
            } else {
                next();
            }
        });
    }
    
export default middlewareValidation