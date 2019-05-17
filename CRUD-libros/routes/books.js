const express = require('express')
const router = express.Router()

const Book = require('../models/book')



// Inicio
router.get('/', (req, res, next) => res.render('books-index'))


// Listado de libros
router.get('/list', (req, res, next) => {                             // ESTO ES EL CONTROLADOR
  Book.find()                                                         // ESTO ES EL MODELO
    .then(allBooks => res.render('books-list', { books: allBooks }))  // ESTO ES LA VISTA
    .catch(error => console.log(error))
})

// Detalle de libro
router.get('/view/:book_id', (req, res) => {
  Book.findById(req.params.book_id)
    .then(theBook => res.render('book-detail', { book: theBook }))
    .catch(error => console.log(error))
})



// Añadir nuevo libro
router.get('/add', (req, res) => res.render('book-add'))
router.post('/add', (req, res) => {
  const { title, author, description, rating } = req.body
  const newBook = new Book({ title, author, description, rating })
  newBook.save()
    .then(theBook => res.redirect('/books/list'))
    .catch(error => console.log(error))
})



// Editar libro
router.get('/edit', (req, res) => {
  Book.findOne({ _id: req.query.book_id })
    .then(book => res.render("book-edit", { book }))
    .catch(error => console.log(error))
})

router.post('/edit', (req, res) => {
  const { title, author, description, rating } = req.body
  Book.update({ _id: req.query.book_id }, { $set: { title, author, description, rating } })
    .then(book => res.redirect('/books/list'))
    .catch(error => console.log(error))

})


module.exports = router