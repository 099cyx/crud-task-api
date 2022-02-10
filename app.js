const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');
const res = require('express/lib/response');
const req = require('express/lib/request');




app.use(function(req , res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST OPTIONS, ,PUT, PATCH, DELETE');
    
    res.setHeader('Access-Control-Allow-Headers', 'Orgin', 'X-Requested-With, Content-Type' );

    next();
});

app.use(express.json());

app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {res.status(200).send(lists)})
        .catch((error) => {console.log(error)});

});  
 

app.get(('/tasklists/:tasklistId'), (req, res) => {

    console.log("in post2 method");

    let tasklistId =  req.params.tasklistId;
    TaskList.find({_id: tasklistId}) 

    .then((taskList) => { res.status(200).send(taskList)

    })
    .catch((error)=> {console.log(error)});
});
    app.post('/tasklists', (req, res) => {

        console.log('hii' , req.body);
       //  console.log("inside post method");
       let taskListObj = { 'title' : req.body.title};
       TaskList(taskListObj).save()
            .then((taskList) => { res.status(201).send(taskList)})
            .catch((error) => { console.log(error)});
    });


    app.put ('/tasklists/:tasklistId', (req, res) => {
        TaskList.findOneAndUpdate( {_id: req.params.tasklistId}, { $set: req.body})
        .then((taskList) => {
            res.status(200).send(taskList)
        })
        .catch((error) => {console.log(error)});

    });

    app.patch('/tasklists/:tasklistId', (req, res) => {
        TaskList.findOneAndUpdate( {_id: req.params.tasklistId}, { $set: req.body})
        .then((taskList) => {
            res.status(200).send(taskList)
        })
        .catch((error) => {console.log(error)});

    });

    app.delete('/tasklists/:tasklistId', (req, res) => {
        TaskList.findByIdAndDelete( req.params.tasklistId)
        .then((taskList) => {
            res.status(201).send(taskList)
        })
        .catch((error) => {console.log(error)});

    });

   



app.listen(3000, function() {
    console.log("server has started now");
});