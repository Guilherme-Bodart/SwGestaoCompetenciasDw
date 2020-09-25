const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../../config/auth')
const User = require('../models/user')
const router = express.Router()

function generateToken( params = {} ) {
    return jwt.sign( params, authConfig.secret,{
        expiresIn: 86400,
    })
}


router.post('/register', async (req,res) => {
    var { email } = req.query
    if (email === undefined){
       email = req.body.email
    }

    try {

        if (await User.findOne({ email }))
            return res.status(400).send({error : 'Usuário já existe'})

        const user = await User.create(req.body)

        user.password = undefined

        return res.send({
            user,
            token : generateToken({ id: user.id }),
         })
    }

    catch (err) {
        return res.status(400).send({ error: 'Falha no registro'})
    }
})

router.post('/authenticate', async (req,res) => {
    var { email, password } = req.query
    if (email === undefined && password === undefined){
       email = req.body.email
       password = req.body.password
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user)
      return res.status(404).send("Usuário não encontrado");
  
    if (!await bcrypt.compare(password, user.password))
      return res.status(401).send({ error: 'Senha inválida' });
    
    
    user.password = undefined

    res.send({ 
        user,
        token : generateToken({ id: user.id }),
    });
    return res.status(200)
    
  });


module.exports = app => app.use('/auth', router)