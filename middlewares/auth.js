import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {

    // TODO middleware to return back user id too

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {

        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        else {
            req.user = user
        }

        next()
    })
}