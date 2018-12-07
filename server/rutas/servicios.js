const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');



app.get('/usuario', function (req, res) {
  
  Usuario.find({})
    .exec((err, usuarios) => {
      if (err){
        return res.status(400).json({
            ok: false,
            err
        });
      }
      res.json({
        ok: true,
        usuarios
      });
    });
    

});


app.post('/usuario', function (req, res) {
  
  let body = req.body;

  let us = new Usuario({
    nombre: body.nombre,
    email: body.email,

    // Enriptación del password
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });


  us.save( (err, user) => {
    
    if (err){
      return res.status(400).json({
          ok: false,
          err
      });
    }

    res.json({
      ok: true,
      us: user
    });

  });
  
});
  
  
app.put('/usuario/:id', function (req, res) {

  let id = req.params.id;

  
  // Función que indica que campos pueden actualizarse
  let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate(id, body, {new: true}, (err, persona) => {
  
    if (err){
      return res.status(400).json({
          ok: false,
          err
      });
    }
    
    res.json({
        ok: true,
        persona
    });


  });

});


app.delete('/usuario/:id', function (req, res) {
  
  let id = req.params.id;
  let cambioEstado = {
    estado: false
  }

  // Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
  Usuario.findByIdAndUpdate(id, cambioEstado, {new: true}, (err, usuarioBorrado) => {

    if (err){
      return res.status(400).json({
          ok: false,
          err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    });

  });

});




module.exports = app;
