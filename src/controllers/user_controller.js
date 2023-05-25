import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = async (user) => {
  let userCheck;
  let passwordCheck;
  try {
    userCheck = await User.findOne({ email: user.email }); // check if user has registered

    if (!userCheck) {
      throw new Error('Invalid email!');
    }
    passwordCheck = await userCheck.password === user.password; // check if the password match
    if (!passwordCheck) {
      throw new Error('Invalid password!');
    } else {
      return tokenForUser(user);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('You must provide email and passw ord!');
  }
  const exstingUser = await User.findOne({ email });
  if (exstingUser) throw new Error('Email is in use!');

  const user = new User();
  user.email = email;
  user.password = password;
  await user.save();
  return tokenForUser(user);
};
