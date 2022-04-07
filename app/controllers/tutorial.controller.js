const {db,dbmysql} = require("../models");
const Tutorial = db.tutorials;
const TutorialMysql = dbmysql.Tutorial;
const {publish} = require("../services/queue");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let reqData= {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
   
  // Create a Tutorial Mongo Object
 const tutorial = new Tutorial(reqData);

  // Save Tutorial in the mongo database
  tutorial
    .save(tutorial)
    .then(data => {
      // Set mongo id to the mysql table
      reqData['mongoRefId'] = data._id.toString();
      
      // Save Tutorial in the mysql database
      TutorialMysql.create(reqData)
      .then(mdata => {

        // Add data in queue
        publish('New Tutorial Has been Created - '+reqData.title);    
        res.send({mdata,data});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial in mysql"
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial in mongo"
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {

        // Delete mysql table record
        TutorialMysql.destroy(
          { where: { mongoRefId: id.toString() } }
        ).then(result =>{

          // Add data in queue
          publish('Tutorial Has been Deleted - '+data.title);  

          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }).catch(err => {
            res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
 
