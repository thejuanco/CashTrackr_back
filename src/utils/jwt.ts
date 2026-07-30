import jwt from "jsonwebtoken";

export const generateTokenJWT = (id: string) : string => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token
}