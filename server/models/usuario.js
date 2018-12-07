const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;




// Accepted values for the "Role" field and validation message

let usuariosValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un usuario válido'
};



let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'] 
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE ',
        enum: usuariosValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
   
});


// Plugin for customize the validation message 

usuarioSchema.plugin( uniqueValidator, {message: '{PATH} debe ser único'});




module.exports = mongoose.model('Usuario', usuarioSchema);