const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.secret_key, async (err, decode) => {
            if (decode) {
                req.body.userID = decode.id;
                next()
            } else {
                res.status(201).send({
                    'msg': 'Error in verifying the token.'
                })
            }
        })
    } else {
        res.status(404).send({
            'msg': 'Please Login..'
        })
    }
}

module.exports = { authentication }