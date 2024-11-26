import { Router } from "express";
import * as produtoController from '../controllers/produtoController'
import * as userController from '../controllers/userController'


const router = Router()

router.get('/', (req,res) =>{
    res.send('teste')
})

router.get('/produtos', produtoController.index)

router.get('/cadastrar', produtoController.visualizarCadastro)

router.post('/cadastrar', produtoController.cadastroProduto)

router.get('/editar/:id', produtoController.editaProduto)

router.post('/editar/:id', produtoController.atualizaProduto)


router.get('/excluir/:id', produtoController.excluirProduto);

// Rota para criar usuário
router.get('/criarusuarios', userController.criarUsuario);

// Rota para login
router.post('/login', userController.loginUsuario);

// Rota para listar todos os usuários
router.get('/listarusuarios', userController.listarUsuarios);

// Rota para atualizar usuário
router.put('/atualizarusuarios/:id', userController.atualizarUsuario);

// Rota para excluir usuário
router.delete('/excluirusuarios/:id', userController.excluirUsuario);



export default router