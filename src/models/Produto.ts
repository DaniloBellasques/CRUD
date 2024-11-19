import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../instances/mysql'

export interface ProdutoInstance extends Model{
    id: number,
    nome: string,
    valor: number,
    quantidade: number
}

export const Produto = sequelize.define<ProdutoInstance>("Produto,",{
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nome:{
        type: DataTypes.STRING
    },
    valor:{
        type: DataTypes.DECIMAL
    },
    quantidade:{
        type: DataTypes.INTEGER
    }
},{
    tableName:'produtos',
    timestamps:false
})
 