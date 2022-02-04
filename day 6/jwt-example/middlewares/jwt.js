import jwt from 'jsonwebtoken';

function verifyJWT(req,res,next) {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized');
        return;
    }

    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, VERY_SECRET_KEY,(err,decoded)=>{
        if (err) {
            res.status(401).send('Unauthorized');
            return;
        }
        else{
            next();
        }
    });
}

export default verifyJWT;