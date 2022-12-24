const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SIGN_IN_TOKEN_TIMEOUT = '35s';
const SIGN_IN_COOKIE_TIMEOUT = 1000 * 30;
const REFRESH_TOKEN_TIMEOUT = '3h';
const REFRESH_COOKIE_TIMEOUT = 1000 * 60 * 60 * 3;

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({
      $or: [
        { username: username },
        { email: email },
      ]
    });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists. Sign in please.' });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: user });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: 'User not found. Sign up please.' });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  // encrypted user id for authorisation
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: SIGN_IN_TOKEN_TIMEOUT });

  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = '';
  }

  res.cookie(
    String(existingUser._id),
    token,
    {
      path: '/',
      expires: new Date(Date.now() + SIGN_IN_COOKIE_TIMEOUT),
      httpOnly: true,
      sameSite: 'lax',
    }
  );

  return res.status(200).json({ message: 'Successfully signed in.', user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split('=')[1];
  if (!token) {
    return res.status(404).json({ message: 'Token not found.' });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'Invalid token.' });
    }
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res) => {
  const userId = req.id;

  let user;
  try {
    user = await User.findById(userId, '-password');
  } catch (err) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: REFRESH_TOKEN_TIMEOUT });

  if (req.cookies[`${user._id}`]) {
    req.cookies[`${user._id}`] = '';
  }

  res.cookie(
    String(user._id),
    token,
    {
      path: '/',
      expires: new Date(Date.now() + REFRESH_COOKIE_TIMEOUT),
      httpOnly: true,
      sameSite: 'lax',
    }
  );

  return res.status(200).json({ user });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId, '-password');
  } catch (err) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: REFRESH_TOKEN_TIMEOUT });

  if (req.cookies[`${user._id}`]) {
    req.cookies[`${user._id}`] = '';
  }

  res.cookie(
    String(user._id),
    token,
    {
      path: '/',
      expires: new Date(Date.now() + REFRESH_COOKIE_TIMEOUT),
      httpOnly: true,
      sameSite: 'lax',
    }
  );

  return res.status(200).json({ user });
}

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: 'Token not found.' });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed.' });
    }

    // if user is verified, clear cookie, remove cookie from headers
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = '';

    // generate new token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: REFRESH_TOKEN_TIMEOUT });
    res.cookie(
      String(user.id),
      token,
      {
        path: '/',
        expires: new Date(Date.now() + REFRESH_COOKIE_TIMEOUT),
        httpOnly: true,
        sameSite: 'lax',
      }
    );
    req.id = user.id;
    next();
  });
};

const signOut = (req, res) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: 'Token not found.' });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed.' });
    }

    // if user is verified, clear cookie, remove cookie from headers
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = '';

    return res.status(200).json({ message: 'Succesfully signed out.' });
  });
};

exports.signUp = signUp;
exports.signIn = signIn;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.getUserById = getUserById;
exports.refreshToken = refreshToken;
exports.signOut = signOut;
