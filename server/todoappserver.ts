/// <reference path='./typings/tsd.d.ts' />

import mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/todoapp");
import express = require('express');
import bodyparser =  require('body-parser'); //for collecting data direct from client
var server = express();
server.listen(3000);
console.log("server is listening..");

import path = require('path');


var pathname = path.resolve(__dirname, "./../client");
server.use(express.static(pathname));
server.use(bodyparser.json())
server.use(bodyparser.urlencoded({ extended : false}));
//here browser gonna serve front-end like usually do



var todoSchema = new mongoose.Schema({
    taskobj : {type : String, require : true},
    detailobj : {type : String , require : true}
});
//compiling schema into model that will create document of schema defined

var todo = mongoose.model("todo", todoSchema);

//this is how we create a record/document in mongodb/collection

server.post('/addtaskserver', function(req, res){
//send some data along with request    
   
   var task = new todo(req.body);
     console.log(req.body);
    task.save(function(err, data){
        if(err){
            console.log('error');
        }
        else{
           console.log("else of save" , data)
        }
      });
      
     todo.find({}, function(err, data){
          //console.log(err);
          console.log("this is from find function "+data);
          res.json(data);
          //return data, if i return data then where it should be retrive
          });//now sending data back to client
});

server.post('/edit', function(req, res){
    
    console.log('edit started');
    console.log(req.body)
    console.log('inside edit function from server');
   var i = req.body;
   console.log(i._id);
   todo.findByIdAndUpdate(req.body._id, req.body, function(err, data){
       if(err){
           console.log(err);
       }else{
           console.log(data);
           res.send(data);
       }
       
   })
//    todo.findOne({"_id" : i._id}, function(err, data){
//        console.log('inside findone function');
//        if(err){
//            console.log('error')
//        }else{
//            console.log('inside else');
//            console.log(data);
        //    todo.update({"taskobj" : "i.taskobj"},{"taskdetail":"i.taskdetail"},{multi :true}, function(err, data){
        //        console.log('inside update');
        //        if(err){
        //            console.log('error')
        //        }else{
                   
        //            console.log('inside else of update');
        //            console.log(data);
        //        }
        //   })
       
  // })
//       todo.find({"_id" : "id._id"}, function(){
      
      
//    })
})
//})
server.delete('/deletedata/:id', function(req, res){
    console.log('inside deletedata from server');
    console.log(req.params.id);
    var deleteid = req.params.id;
    
    todo.findOne({"_id": deleteid}, function(err, data){
        console.log( "this is "+deleteid)
        if(err){
            console.log('this is error');
            console.log(err)
        }else{
            console.log('this is else');
            // res.json(data);
            todo.remove({_id : deleteid}, function(){
                console.log('this is remove');
                todo.find({}, function(err, data){
                    if(err){
                        console.log(err)
                    }else{
                    console.log(data);
                    res.send(data);
                    }
                })
            })
            
         }
    })
});
// var task = new todo({task : tasks, detail : details});
//    task.save(function(err){
//     if(err){
//         console.log('error')
//     }
// });

// todo.find({}, function(err, data){
//     console.log(err);
//     console.log(data)
// })

// server.get('/addtask', (req, res)=>{
//     console.log('add task');
//     res.send('hey Im from server');
// }