import { Request, Response } from 'express';
import Thought from "../models/Thought";

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({})
        res.status(200).json(thoughts);
    }catch (err){
        res.status(500).json({ message: 'Something when wrong when getting All Users'})
    }
};

//POST thought
export const createNewThought = async (req: Request, res: Response) => {
    try{
        const newThought = new Thought({ 
          thoughtText: req.body.thought, 
          username: req.body.username
        });
        await newThought.save();
        res.status(200).json(newThought);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  //PUT (modify) thought
export const modifyThought = async (req: Request, res: Response) => {
    try {
      const result = await Thought.findOneAndUpdate(
          { _id: req.params.id },
          { thoughtText: req.body.thoughtText },
          { new: true }
        );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  }

//DELETE Thought
    export const deleteThought = async (req: Request, res: Response) => {
      try {
        const result = await Thought.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    }

//GET thought by id
  export const findThought = async (req: Request, res:Response ) => {
    try {
        const result = await Thought.findOne({ id: req.params.id});
        res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }};


    // Reactions
    //POST add Reaction
      // Not sure this is quite right
      export const addReaction = async (req: Request, res: Response) => {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });
          if (thought) { 
            thought.reactions.push({
              reactionBody: req.body.reactionBody,
              username: req.body.username
            });
            await thought.save();
            res.status(200).json(thought);
          } else {
            res.status(404).json ({ message: 'Thought not found'});
          }
        } catch (err) {
          console.log ('Uh Oh, something went wrong.');
          res.status(500).json ({message: 'Something went wrong'})
        }
      };
    
      //DELETE Reaction
      export const deleteReaction = async (req: Request, res: Response) => {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });
          if (thought) {
            thought.reactions.id(req.params.reactionId).remove();
            await thought.save();
            res.status(200).json(thought);
          } else {
            res.status(400).json({ message: 'Something went wrong'});
          }
        } catch (err) {
          console.log ('ERROR: ', err);
          res.status(500).json ({ message: 'Something went wrong'})
        }
      };
