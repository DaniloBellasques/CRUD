import { Request, Response } from "express";
import { Produto } from "../models/Produto";


export const index = async (req: Request, res: Response)=>{

    let products = await Produto.findAll()

    res.render('pages/produtos',{
        products
    })
        
}

export const visualizarCadastro = ((req: Request,res: Response)=>{
    res.render('pages/cadastrar')
})

export const cadastroProduto = async (req: Request, res: Response)=>{
    //recebendo os dados do form via body
    let {nome,valor,quantidade} = req.body
    if(nome && valor && quantidade){
        await Produto.create({
            nome,
            valor,
            quantidade
        })
    }
    res.redirect('/produtos')
}

export const editaProduto = async (req: Request, res: Response) =>{
    let{id} = req.params

    let product = await Produto.findByPk(id)

    res.render('pages/editar',{
        product,
        id
    })
}

export const atualizaProduto = async (req: Request, res: Response)=>{
    let{id} =req.params
    let {nome,valor,quantidade} = req.body
    await Produto.update({
        nome,
        valor,
        quantidade
    },{
        where:{
            id: id
        }
    })
    res.redirect('/produtos')
}
