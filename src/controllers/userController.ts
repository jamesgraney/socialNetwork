import { Request, Response } from 'express';
import User from '../models/User';

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({})
        res.status(200).json(users);
    }catch (err){
        res.status(500).json({ message: 'Something when wrong when getting All Users'})
    }
};

//POST: Create a user
export const createNewUser = async (req: Request, res: Response) => {
    try{
        const newUser = new User({ 
          name: req.body.name,
          email: req.body.email
        });
        await newUser.save();
        res.status(200).json(newUser);
    }catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

//**userId functions**

// GET user by id
  export const findUser = async (req: Request, res:Response ) => {
    try {
        const result = await User.findOne({ _id: req.params.id});
        res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }};

// PUT: Modify user
export const modifyUser = async (req: Request, res: Response) => {
    try {
      const result = await User.findOneAndUpdate(
          { _id: req.params.id },
          { name: req.body.id, email: req.body.email },
          // Sets to true so updated document is returned; Otherwise original document will be returned
          { new: true }
        );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  }

  //DELETE user
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.id });
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  }

  //POST add friend
  // Not sure this is quite right
  export const addFriend = async (req: Request, res: Response) => {
    try {
      const newFriend = new User({ 
        name: req.body.name,
        email: req.body.email
    });
    await newFriend.save();
    res.status(200).json(newFriend);
    } catch (err){
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  };

  //DELETE friend
  export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const result = await User.findOneAndDelete ({_id: req.params.id});
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log ('ERROR: ', err);
      res.status(500).json ({ message: 'Something went wrong.' })
    }}