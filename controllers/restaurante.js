const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const axios = require('axios');
const session = require('express-session');

exports.getCadastrarPrato = (req, res) => {
  res.render('restaurante/cadastrar-prato', {
    title: 'Cadastrar Prato'
  });
};

exports.cadastrarPrato = (req, res, next) => {
  const validationErrors = [];

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/logged');
  }

  ssn = req.session;
  const formData = {
    titulo: req.body.titulo,
    valor: req.body.valor,
    tempo: req.body.tempo,
    descricao: req.body.descricao,
    quantidadeMesas: req.body.qtyMesas,
    restauranteId: ssn.restauranteId,
    foto: req.body.foto
  };

  var config = {
    headers: {'Content-Type': 'application/json'}
  };

  axios.post('http://ec2-3-86-70-99.compute-1.amazonaws.com:3100/api/prato/', formData, config)
    .then(() => {
      req.flash('success', { msg: 'Created Prato' });
      res.redirect('/logged');
    }).catch((error) => {
      req.flash('errors', { msg: error.message });
      res.redirect('/');
    });
};

exports.listarPratos = (req, res) => {
  ssn = req.session;
  axios.get('http://ec2-3-86-70-99.compute-1.amazonaws.com:3100/api/prato/restaurante/' + ssn.restauranteId)
    .then((response) => {
      data = response.data;
      res.render('restaurante/listar-pratos', {
        title: 'Listar Pratos',
        data: data
      });
  });
};

exports.listarPedidos = (req, res) => {
  ssn = req.session;
  axios.get('http://ec2-3-86-70-99.compute-1.amazonaws.com:3100/api/prato/restaurante/' + ssn.restauranteId)
    .then((resposta) => {
      pratos = resposta.data;
      var pratosIds = [];
      pratos.forEach(function(element, index) {
        pratosIds.push(element._id);
      });
      axios.get('http://ec2-3-86-70-99.compute-1.amazonaws.com:3100/api/pedido/')
        .then((response) => {
          data = response.data;
          var newData = [];
        
          data.forEach(function(element, index) {
            if (pratosIds.includes(element.prato)) {
              axios.get('http://ec2-3-86-70-99.compute-1.amazonaws.com:3100/api/prato/' + element.prato)
                  .then((prato) => {
                    element.prato = prato.data;
                    newData.push(element);
                    if (data.length == index + 1) {
                      res.render('restaurante/listar-pedidos', {
                        title: 'Listar Pedidos',
                        data: newData
                      });
                    }
                }).catch((err) => {
                  console.log(err);
                });
            }
          });
      }).catch((err) => {
        console.log(err);
      });
  }).catch((err) => {
    console.log(err);
  });
};

exports.verPerfil = (req, res) => {
  ssn = req.session;
  axios.get('http://ec2-3-86-70-99.compute-1.amazonaws.com:3100/api/restaurante/' + ssn.restauranteId)
    .then((response) => {
      data = response.data;
      res.render('restaurante/ver-perfil', {
        title: 'Ver Perfil',
        data: data
      });
  });
};
