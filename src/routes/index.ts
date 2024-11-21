import { Router } from "express";
import * as produtoController from '../controllers/produtoController'

const router = Router()

router.get('/', (req,res) =>{
    res.send('teste')
})

router.get('/produtos', produtoController.index)

router.get('/cadastrar', produtoController.visualizarCadastro)

router.post('/cadastrar', produtoController.cadastroProduto)

router.get('/editar/:id', produtoController.editaProduto)

router.post('/editar/:id', produtoController.atualizaProduto)

export default router