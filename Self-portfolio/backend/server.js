const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const Problem = require("./models/problemsModel");

app.use(express.json())
app.use(cors())


const URI =
  "mongodb+srv://rizulthakur:passwordofrizul@cluster1.t7bdju3.mongodb.net/leetcode?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => {
    app.listen(3001, () => {
      console.log(`Connected to DB & Server running on PORT 3001`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


  app.get('/api/problems', async(req,res)=>{
    Problem.find()
    .then((users) => {
      res.json(users); 
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  })

  app.post('/api/newProblem',async(req,res)=>{
    const {title, description}= req.body;

    const newProblem = new Problem({
      title,
      description
    })

    newProblem.save()
    .then((prob)=>{
      res.json(prob)
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  })

  app.delete('/api/deleteProblem/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await Problem.findOneAndRemove({ _id: id });
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      return res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
