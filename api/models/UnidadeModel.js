'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
  descricao_resumida: {
    type: String,
    required: true,
    min: 2, 
    max: 2
  },

  descricao: {
    type: String,
    required: true
  }
}

const UnidadeSchema = new Schema(_schema)
const UnidadeModel = mongoose.model('unidade', UnidadeSchema)

module.exports = UnidadeModel