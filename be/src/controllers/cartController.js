import config from '../db.js'


// GET Cart DATA
export const getCartData = (req,res) => {
    config.query(`SELECT * FROM cart`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}


export const insertProduct = (req,res) => {
    const { nama, img, quantity, harga, diskon } = req.body
    config.query(`INSERT INTO cart (namaBarang, harga, jumlah, diskon, image) VALUES ('${nama}', '${harga}', '${quantity}', '${diskon}', '${img}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

// UPDATE DATA
export const updateCartProduct = (req,res) => {
    const id = req.params.id
    const { nama, img, harga} = req.body
    config.query(`UPDATE cart SET namaBarang = '${nama}', harga = '${harga}', image = '${img}' WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

// DELETE ONE DATA
export const deleteOneCartProduct = (req,res) => {
    const id = req.params.id
    config.query(`DELETE FROM cart WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

// DELETE ALL DATA
export const deleteCartProduct = (req,res) => {
    const id = req.params.id
    config.query(`DELETE FROM cart;`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}
