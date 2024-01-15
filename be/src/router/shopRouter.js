import {getAllData, createData, updateData} from "../controllers/shopController.js";
import express from "express"

const router = express.Router()

router.get('/', getAllData)
router.post('/toko', createData)
router.patch('/:id', updateData)


export default router


// penjelasan:
// router.get('/', getToko) -> ketika ada request dengan method get dan path '/' maka akan menjalankan fungsi getToko
// router.get('/:id', getTokoById) -> ketika ada request dengan method get dan path '/:id' maka akan menjalankan fungsi getTokoById
// router.post('/', saveToko) -> ketika ada request dengan method post dan path '/' maka akan menjalankan fungsi saveToko
// router.delete('/', deleteAllToko) -> ketika ada request dengan method delete dan path '/' maka akan menjalankan fungsi deleteAllToko
// router.delete('/:id', deleteToko) -> ketika ada request dengan method delete dan path '/:id' maka akan menjalankan fungsi deleteToko
// router.patch('/:id', updateToko) -> ketika ada request dengan method patch dan path '/:id' maka akan menjalankan fungsi updateToko
