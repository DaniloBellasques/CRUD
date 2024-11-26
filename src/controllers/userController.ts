import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario'; // Caminho para o modelo Usuario
import bcrypt from 'bcryptjs'; // Para criptografar e verificar a senha

// Função para criar um novo usuário
export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        res.status(400).json({ message: 'Por favor, preencha todos os campos' });
        return;
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const usuario = await Usuario.create({ nome, senha: senhaCriptografada });
        res.status(201).json({ id: usuario.id, nome: usuario.nome });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};

// Função para fazer login do usuário
export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        res.status(400).json({ message: 'Nome e senha são obrigatórios' });
        return;
    }

    try {
        const usuario = await Usuario.findOne({ where: { nome } });
        
        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            res.status(400).json({ message: 'Senha inválida' });
            return;
        }

        res.status(200).json({ message: 'Login bem-sucedido', usuario: { id: usuario.id, nome: usuario.nome } });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
};
// Função para atualizar dados do usuário
export const atualizarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        res.status(400).json({ message: 'Nome e senha são obrigatórios' });
        return;
    }

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        usuario.nome = nome;
        usuario.senha = senha; // Aqui você deve hashificar a senha, se necessário
        await usuario.save();

        res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

// Função para excluir um usuário
export const excluirUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Tente encontrar o usuário pelo ID
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        // Se o usuário for encontrado, exclua
        await usuario.destroy();

        // Envie uma resposta confirmando a exclusão
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
};

// Função para listar todos os usuários
export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ message: 'Erro ao listar usuários' });
    }
};





