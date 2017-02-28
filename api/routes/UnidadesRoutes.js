'use strict'

const express = require('express');
const router = express.Router();

const UnidadeModel = require('../models/UnidadeModel')

router.post('/create', function (req, res) {
  const body = req.body
  UnidadeModel.create(body, (err, data) => {
    if (err) return res.status(400).json(err)
      else res.status(200).json(data)
    })
})

router.get('/retrieve', function (req, res) {
  UnidadeModel.find({}, (err, data) => {
    if (err) return res.status(400).json(err)
      else res.status(200).json(data)
    })
})

router.get('/retrieve/:id', function (req, res) {
  const query = { _id: req.params.id }
  UnidadeModel.findOne(query, (err, data) => {
    if (err) return res.status(400).json(err)
      else res.status(200).json(data)
    })
})

router.post('/update', function (req, res) {
  const query = { _id: req.body._id }
  const mod = req.body
  UnidadeModel.update(query, mod, (err, data) => {
    if (err) return res.status(400).json(err)
      else res.status(200).json(data)
    })
})

router.post('/delete/:id', function (req, res) {
  const query = { _id: req.params.id }
  UnidadeModel.remove(query, (err, data) => {
    if (err) return res.status(400).json(err)
      else res.status(200).json(data)
    })
})

module.exports = router;
