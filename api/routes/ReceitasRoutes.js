'use strict'

const express = require('express');
const router = express.Router();

const ReceitaModel = require('../models/ReceitaModel')
const UnidadeModel = require('../models/UnidadeModel')

router.post('/create', function (req, res) {
  const body = req.body
  ReceitaModel.create(body, (err, data) => {
    if (err) return res.status(400).json(err)
    else res.status(200).json(data)
  })
})

router.get('/retrieve', function (req, res) {
  ReceitaModel.find({}, (err, data) => {
    if (err) return res.status(400).json(err)
    else res.status(200).json(data)
  })
})

router.get('/retrieve/:id', function (req, res) {
  const query = { _id: req.params.id }
  ReceitaModel.findOne(query, (err, data) => {
      if (err) return res.status(400).json(err)
      ReceitaModel.populate(data, { path: 'ingredientes.unidade', model: UnidadeModel }, (err, data) => {
        res.status(200).json(data)
      })
    })
})

router.post('/update', function (req, res) {
  const query = {
    _id: req.body._id
  }
  const mod = req.body
  ReceitaModel.update(query, mod, (err, data) => {
    if (err) return res.status(400).json(err)
    else res.status(200).json(data)
  })
})

router.post('/delete/:id', function (req, res) {
  const query = { _id: req.params.id }
  ReceitaModel.remove(query, (err, data) => {
    if (err) return res.status(400).json(err)
    else res.status(200).json(data)
  })
})

router.post('/ingredientes/add/:id', (req, res) => {
  const query = { _id: req.params.id }
  const body = req.body
  const mod = {
    $push: {
      ingredientes: body
    }
  }
  ReceitaModel.update(query, mod, (err, data) => {
    if (err) return res.status(400).json(err)
    else res.status(200).json(data)
  })
})

router.post('/ingredientes/delete/:id', (req, res) => {
  const query = { _id: req.params.id }
  const body = req.body
  const mod = {
    $pull: { ingredientes: {_id: body._id} }
  }
  ReceitaModel.update(query, mod, (err, data) => {
    if (err) return res.status(400).json(err)
    else res.status(200).json(data)
  })
})

module.exports = router;