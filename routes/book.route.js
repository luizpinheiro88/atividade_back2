const express = require('express');
const app = express();
const bookRoutes = express.Router();

let Book = require('../model/Book');

//api to add book
bookRoutes.route('/add').post(function(req, res){
    let book = new Book(req.body);
    book.save()
        .then(book =>{
            res.status(200).json({ 'status': 'success', 'mssg': 'book added successfully'});
        })
        .catch(err =>{
            res.status(409).send({ 'status': 'failure', 'mssg' : 'unable to save database'});
        });
});

//api to get book
bookRoutes.route('/').get(function(req,res){
    Book.find(function(err, book){
        if (err) {
            res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong '});
        }
        else{
            res.status(200).json({'status': 'success', 'books': books});
        }
    });
});

//api to get book
bookRoutes.route('/book/:id').get(function(req,res){
    let id = req.params.id;
    Book.findById(id, function (err, book){
        if (err) {
            res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong'});
        }
        else{
            res.status(200).json({'status': 'success', 'books': books});
        }
    });
});

//api to update route
bookRoutes.route('/update/:id').put(function(req,res){
    Book.findById(req.params.id,function(err,book){
        if (!book){
            res.status(400).send({'status': 'failure', 'mssg': 'Unable to find data'});
        }
        else{
            book.title = req.body.title;
            book.description = req.body.description;
            book.year = req.body.year;

            book.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update Complete'});
            })
        }
    });
});

//api for delete 
bookRoutes.route('/delete/:id').delete(function(req,res){
    Book.findByIdAndRemove({_id: req.params.id},function(err,){
        if (err){
            res.status(400).send({'status' : 'failure', 'mssg': 'Something went wrong'});
        }
        else {
            res.status(200).json({'status': 'success', 'mssg': 'Delete successfully'});
        }
    });
});

module.exports = bookRoutes;