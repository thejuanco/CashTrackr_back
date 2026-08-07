import { transport } from "../config/nodemailer"

type EmailType = {
    name: string,
    email: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user : EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cashtrackr.com>',
            to: user.email,
            subject: 'CashTrackr - Confirma tu cuenta',
            html: `
                <p>Hola: ${user.name}, has creado tu cuenta en CashTrackr, ya esta casi lista</p>
                <p>Visita el siguiente enlace:</p>
                <a href="#">Confirma cuenta</a>
                <p>e ingresa el siguiente código: <b>${user.token}</b></p>
            `
        })
    }

    static sendPasswordResetToken = async (user : EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cashtrackr.com>',
            to: user.email,
            subject: 'CashTrackr - Reestablece tu contraseña',
            html: `
                <p>Hola: ${user.name}, has solicitado restablecer tu contraseña</p>
                <p>Visita el siguiente enlace:</p>
                <a href="#">Reestablece tu contraseña</a>
                <p>e ingresa el siguiente código: <b>${user.token}</b></p>
            `
        })
    }
}