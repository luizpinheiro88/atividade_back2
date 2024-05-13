const express = require('express');
const app = express();
const weddingRoutes = express.Router();

let Wedding = require('../model/Wedding');

//api to add wedding
weddingRoutes.route('/add').post(function(req, res){
    let wedding = new Wedding (req.body);
    wedding.save()
        .then(wedding =>{
            res.status(200).json({ 'status': 'success', 'mssg': 'wedding added successfully'});
        })
        .catch(err =>{
            res.status(409).send({ 'status': 'failure', 'mssg' : 'unable to save database'});
        });
});

//api to get wedding
weddingRoutes.route('/').get(function(req,res){
    Wedding.find(function(err, wedding){
        if (err) {
            res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong '});
        }
        else{
            res.status(200).json({'status': 'success', 'weddings': weddings});
        }
    });
});

//api to get wedding
weddingRoutes.route('/wedding/:id').get(function(req,res){
    let id = req.params.id;
    Wedding.findById(id, function (err, wedding){
        if (err) {
            res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong'});
        }
        else{
            res.status(200).json({'status': 'success', 'weddings': weddings});
        }
    });
});

//api to update route
weddingRoutes.route('/update/:id').put(function(req,res){
    Wedding.findById(req.params.id,function(err,wedding){
        if (!wedding){
            res.status(400).send({'status': 'failure', 'mssg': 'Unable to find data'});
        }
        else{
            wedding.noivos = req.body.noivos;
            wedding.dataCasamento = req.body.dataCasamento;
            wedding.local = req.body.local;
            wedding.numeroConvidados = req.body.numeroConvidados;

            wedding.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update Complete'});
            })
        }
    });
});

//api for delete 
weddingRoutes.route('/delete/:id').delete(function(req,res){
    Wedding.findByIdAndRemove({_id: req.params.id},function(err,){
        if (err){
            res.status(400).send({'status' : 'failure', 'mssg': 'Something went wrong'});
        }
        else {
            res.status(200).json({'status': 'success', 'mssg': 'Delete successfully'});
        }
    });
});

module.exports = weddingRoutes;