import jwt from 'jsonwebtoken'
import 'dotenv/config';

//verify incoming JWT token is valid one
function jwtVerify (req, res, next) {
    console.log(req.url);
    if (req.url == 'login' || req.url == 'signup') {
        next();
        return;
    }

    let authorization = req.headers.authorization;
    if (!authorization) {
        res.status(403).send('No token provided');
        return;
    }
    const token = authorization.split(' ')[1];

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