import { Router } from "express";
import * as produtoController from '../controllers/produtoController'

const router = Router()

router.get('/', (req,res) =>{
    res.send('teste')
})

router.get('/produtos', produtoController.index)

export default router