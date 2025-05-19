import { Request, Response,RequestHandler } from 'express';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, username, password, role } = req.body;  // get 'name' too
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ message: 'User exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, username, password: hashedPassword, role: role || 'User' }); // pass name here
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err });
  }
};

  

  export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
         res.status(404).json({ message: 'User not found' });
         return;
      }
  
      const isMatch = await bcrypt.compare(password, user.getDataValue('password'));
      if (!isMatch) {
         res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.getDataValue('id'), role:user.getDataValue('role') }, JWT_SECRET, { expiresIn: '1h' });
       res.json({ message: 'Login successful', token,role:user.getDataValue('role'), username: user.getDataValue('Name') });
    } catch (err) {
       res.status(500).json({ message: 'Login failed', error: err });
    }
  };
  

export const logout = (_req: Request, res: Response) => {
  // Frontend should handle token removal
  res.json({ message: 'Logged out' });
};
