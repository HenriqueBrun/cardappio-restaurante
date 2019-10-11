const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const axios = require('axios');

exports.cadastrarPrato = (req, res) => {
  res.render('restaurante/cadastrar-prato', {
    title: 'Cadastrar Prato'
  });
};

exports.listarPratos = (req, res) => {
  res.render('restaurante/listar-pratos', {
    title: 'Listar Pratos'
  });
};

exports.listarPedidos = (req, res) => {
  res.render('restaurante/listar-pedidos', {
    title: 'Listar Pedidos'
  });
};

exports.verPerfil = (req, res) => {
  res.render('restaurante/ver-perfil', {
    title: 'Ver Perfil'
  });
};
