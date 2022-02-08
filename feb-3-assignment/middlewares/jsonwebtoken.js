import jwt from 'jsonwebtoken'
import 'dotenv/config';

//verify incoming JWT token is valid one
function jwtVerify (req, res, next) {

    console.log(req);

    let unprotectedRoutes = ['/api/login', '/api/signup','/','/signup','/login'];
    if (unprotectedRoutes.indexOf(req.url)> -1) {
        next();
        return;
    }

    let token = req.cookies.token;
    if (!token) {
        res.status(403).send('No token provided');
        return;
    }
    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if (err) {
            res.status(403).send(err);
        }
        else{
            console.log(decoded);
            req.userId = decoded.id;
            next();
        }
    });
}

export default jwtVerify;