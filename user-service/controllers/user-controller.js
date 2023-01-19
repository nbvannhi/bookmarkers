const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const SIGN_IN_TOKEN_TIMEOUT = '35s';
const SIGN_IN_COOKIE_TIMEOUT = 1000 * 30;
const REFRESH_TOKEN_TIMEOUT = '3h';
const REFRESH_COOKIE_TIMEOUT = 1000 * 60 * 60 * 3;
const EMAIL_VERIFICATION_SUBJECT = 'Verify your Bookmarkers account';

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
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  if (!user) {
    return res.status(403);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    }
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

  const url = `${process.env.SERVER_URL}/api/verifyemail/${token}`;

  const emailBody = `<p>Please click <a href='${url}'>here</a> to verify your email and complete your sign-up for Bookmarkers. The link will expire after 24 hours.</p>`

  const emailOptions = {
    from: process.env.NO_REPLY_EMAIL,
    to: email,
    subject: EMAIL_VERIFICATION_SUBJECT,
    html: emailBody,
  };

  transporter.sendMail(emailOptions, (err, data) => {
    if (!err) {
      const time = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }).format(new Date());

      return res.status(201).json({
        message: `An email was sent to ${email} at ${time}. Please check your email for verification.`,
      });
    } else {
      console.error(err);
      console.log(user._id);
      User.deleteOne({ _id: user._id });
      return res.status(403).json({
        message: `Unable to send email to ${email}.`,
      });
    }
  });
};

const verifyEmail = async (req, res) => {
  const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY);

  if (!id) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const updatedUser = await User.findByIdAndUpdate(id, { verified: true });

  if (!updatedUser) {
    return res.status(404).json('Unable to verify user.');
  }

  return res.redirect(`${process.env.CLIENT_VERIFY_SUCCESS_URL}`)
}

const signIn = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: 'User not found. Sign up please.' });
  }

  /*
  if (!existingUser.verified) {
    return res.status(401).json({ message: 'User has not been verified.' });
  } */

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
    console.error(err);
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
    console.error(err);
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

// @description get or search all users
// @route GET /api/users/:id?search=
const searchUsers = async (req, res) => {
  const userId = req.params.id;

  const query = req.query.search
    ? {
      $and: [
        { username: { $regex: req.query.search, $options: 'i' } },
        { _id: { $ne: userId } }
      ],
    }
    : {};

  const users = await User.find(query, '-password');

  return res.send(users);
};

exports.signUp = signUp;
exports.verifyEmail = verifyEmail;
exports.signIn = signIn;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.getUserById = getUserById;
exports.searchUsers = searchUsers;
exports.refreshToken = refreshToken;
exports.signOut = signOut;
