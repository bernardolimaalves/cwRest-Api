const express = require('express');
const Books = require('../model/books');
const router = express.Router();

router
  .route('/books')
  .post (async (req,res) => {
    try {
        const nBook = {
            title: req.body.title,
            author: req.body.author,
            publicationDate: req.body.publicationDate,
            ISBN: req.body.ISBN,
            pageCount: req.body.pageCount
        }
        const response = await Books.create(nBook);
        res.status(201).json(response)
    }
    catch (error) {
        res.status(400).json({message: 'Não foi possível inserir o livro'})
    }
})

router.get('/books', async(req,res) => {
    try {
        const gBook = await Books.find();
        res.json(gBook)
    }
    catch (error) {
        res.status(500).json({message: 'Não foi possível buscar o livro'})
    }
})

router.get('/books/:id', async(req,res) => {
    try {
        const gOneBook = await Books.findById(req.params.id);
        res.json(gOneBook)
    }
    catch (error) {
        res.status(500).json({message:'Não foi possível buscar o livro'})
    }
})

router.put('/books/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const uBook = {
            title: req.body.title,
            author: req.body.author,
            publicationDate: req.body.publicationDate,
            ISBN: req.body.ISBN,
            pageCount: req.body.pageCount
        }
        const uBookSave = await Books.findByIdAndUpdate(id,uBook);
        res.send(`${uBook.title} has been updated`)
    }
    catch (error) {
        res.status(500).json({message: 'Não foi possível atualizar o livro'})
    }
})

router.delete('/books/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const dBook = await Books.findByIdAndDelete(id);
        res.send(`${dBook.title} was deleted`)
    }
    catch (error) {
        res.status(400).json({message: 'Não foi possível deletar o livro'})
    }
})

module.exports = router