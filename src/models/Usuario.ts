import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql'; // Caminho para sua instância do sequelize

export interface UsuarioInstance extends Model {
    id: number;
    nome: string;
    senha: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const Usuario = sequelize.define<UsuarioInstance>('Usuario', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'usuarios', // Nome da tabela no banco de dados
    timestamps: true, // Ativa os campos `createdAt` e `updatedAt`
    underscored: true, // Usa `snake_case` para os nomes das colunas (por exemplo, `created_at`)
});
