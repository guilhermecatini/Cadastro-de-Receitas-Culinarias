'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const unidadeModel = require('./UnidadeModel')

const _schema = {

  nome: {
    type: String,
    required: true
  },

  ingredientes: [{
    nome: {
      type: String,
      required: true
    },
    quantidade: {
      type: Number,
      required: true
    },
    unidade: {
      type: Schema.Types.ObjectId,
      ref: unidadeModel
    }
  }, ],

  modo_de_preparo: {
    type: String,
    required: false
  },

  data_cadastro: {
    type: Date,
    required: true,
    default: Date.now
  },

  data_alteracao: {
    type: Date,
    required: true,
    default: Date.now
  },

}

const ReceitaSchema = new Schema(_schema)
const ReceitaModel = mongoose.model('receita', ReceitaSchema)

module.exports = ReceitaModel