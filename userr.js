const express = require('express');
const User = require('../model/user');
const routerB = require('./booksr');
const Books = require('../model/books');
const router = express.Router();

router.post('/users', async (req,res) =>{
    try {
        const nUser = {
            name: req.body.name,
            email: req.body.email,
        }
        const response = await User.create(nUser)
        res.status(201).json(response)
    }
    catch(error){
        res.status(400).json({message: 'Não foi possível criar o usuário'})
    }
})
router.get('/users', async (req,res) =>{
    try {
        const gUser = await User.find()
        res.status(200).json(gUser)
    }
    catch(error){
        res.status(400).json({message: 'Não foi possível listar os usuários'})
    }
})
router.get('/users/:id', async (req,res) =>{
    try {
        const id = req.params.id
        const gOneUser = await User.findById(id)
        res.status(200).json(gOneUser)
    }
    catch(error){
        res.status(400).json({message: 'Não foi possível achar o usuário'})
    }
})
router.put('/users/:id', async (req,res) =>{
    try {     
        const id = req.params.id   
        const uUser = {
        name: req.body.name,
        email: req.body.email,
        }
        const uUserSave = await User.findByIdAndUpdate(id, uUser)
        res.status(200).json({message: 'User updated'})
    }
    catch(error){
        res.status(400).json({message: 'Não foi possível atualizar o usuário'})
    }
})
router.delete('/users/:id', async (req,res) =>{
    try {
        const id = req.params.id
        const dUser = await User.findByIdAndDelete(id)
        res.status(200).json({message: 'User deleted'})
    }
    catch(error){
        res.status(400).json({message: 'Não foi possível deletar o usuário'})
    }
})
router.post('/users/:userId/books/:bookId', async (req,res) =>{
    try {
        const id = req.params.userId
        const gUser = await User.findById(id)
        try {
            const idB = req.params.bookId
            const gBook = Books.findById(idB)
            gUser.booksRead.push(gBook)
            res.status(200).json({message: 'Livro inserido no usuário'})
        } catch (error) {
            res.status(400).json({message: 'Não foi possível inserir o livro no usuário'})
        }

    }
    catch(error){
        res.status(400).json({message: 'Não foi possível achar o livro no usuário'})
    }
})
router.delete('/users/:userId/books/:bookId', async (req,res) =>{
    try {
        const id = req.params.userId
        const gUser = await User.findById(id)
        try {
            const idB = req.params.bookId
            const gBook = Books.findById(idB)
            const index = gUser.booksRead.indexOf(gBook)
            gUser.booksRead.splice(index, 1)
            res.status(200).json({message: 'Livro deletado no usuário'})
        } catch (error) {
            res.status(400).json({message: 'Não foi possível deletar o livro no usuário'})
        }
    }
    catch(error){
        res.status(400).json({message: 'Não foi possível achar o livro no usuário'})
    }
})

module.exports = router