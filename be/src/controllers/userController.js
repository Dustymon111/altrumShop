import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../db.js'


const JWT_SECRET = 'eriyfbercbieobu3hrurebuberHBububUOBUOUBuo3728u'

//REGISTRASI NEW USER--------------------------------------------------------------------
export const register = (req, res) => {
    const { username, password } = req.body
    config.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                bcryptjs.genSalt(10, (err, salt) => {
                    if (err) {
                        console.log(err);
                    } else {
                        bcryptjs.hash(password, salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                            } else {
                                config.query(`INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(result);
                                        res.send({ message: "Registrasi Success" });
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                res.send({ error: "Akun Sudah Terdaftar" });
            }
        }
    })

};

//LOGIN USER--------------------------------------------------------------------
export const login = (req, res) => {
    const { username, password } = req.body

//    buatkan query menggunakan sql untuk mencari user berdasarkan email
    config.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                res.send({ error: "Username Salah" });
            } else {
                bcryptjs.compare(password, result[0].password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    } else if (!isMatch) {
                        res.send({ error: "Password Salah" });
                    } else {
                        const token = jwt.sign({ email: result[0].email }, JWT_SECRET)
                        res.send({ message: "Login Success", token: token, data: result[0] });
                    }
                })
            }
        }
    })
};


// ROUTE YANG HANYA BISA AKSES SAMA ADMIN SAJA ATAU YG SUDAH LOGIN------------------------------
export const checkToken = (req, res) => {
    const { token } = req.body

    try {
        const user = jwt.verify(token.token, JWT_SECRET)

        config.query(`SELECT * FROM users WHERE username = '${user.username}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                res.send({ error: "Unauthorized" });
            }
        }
    })
    } catch (err) {
        res.json({ status: 'error', message: 'Token is invalid' });
    }
}
