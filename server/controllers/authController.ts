import * as jwt from 'jsonwebtoken';
import { addUser } from '../services/commands/userCommands';
import { addLoginToken, removeLoginTokenByUserId } from '../services/commands/loginTokenCommands';
import { getUserByEmail } from '../services/queries/userQueries';
import { getLoginTokenByToken } from '../services/queries/loginTokenQueries';
import { User } from '../types/User';
import * as bcrypt from 'bcrypt';

export async function register(req, res) {
  try {
    const user: Partial<User> = (({ username, email, password }) => ({ username, email, password }))(req.body);
    const insertedUser = addUser(user, req.body?.profileType?.toLowerCase());
    console.log(`Registering user: ${user.email}`);
    insertedUser.then((data) => res.send(data)).catch((err) => console.log(err));
  } catch (e) {
    console.log(`Error adding user ${e.message}`);
    if (e.message.includes('role_id') && e.message.includes('undefined')) {
      res.status(500).send(`Please ensure a valid profile type has been selected for your account`);
    } else if (e.message.includes('Duplicate entry')) {
      res.status(500).send(`This user already exists within our system, please reset your password instead`);
    } else {
      res.status(500).send(`An unknown error has occurred during your registration, please try again.`);
    }
  }
}

export async function login(req, res) {
  try {
    const user: Partial<User> = (({ username, email, password }) => ({ username, email, password }))(req.body);
    const registeredUser: User = (await getUserByEmail(user?.email)) as User;
    const result = bcrypt.compareSync(user?.password, registeredUser.password);
    if (result) {
      console.log(`Successfully logged in as ${registeredUser.email}`);
      const accessToken = jwt.sign(
        {
          user: {
            email: registeredUser.email,
            id: registeredUser.id,
            verified: registeredUser.verified,
            role_id: registeredUser.role_id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
      );
      addLoginToken({ user_id: registeredUser.id, token: accessToken.toString() });
      res
        .header('Authorization', `Bearer ${accessToken}`)
        .set('Access-Control-Expose-Headers', 'Authorization')
        .status(200)
        .send({
          token: `Bearer ${accessToken}`,
          authenticated: !!result,
          message: 'Login Successful',
          userId: registeredUser.id,
        });
    } else {
      res.status(500).send({ message: 'Invalid Password' });
    }
  } catch (e) {
    console.log(`Error authenticating user ${e.message}`);
    res.status(500).send('Error authenticating user');
  }
}

export const authenticate = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  const loginToken = tokenHeader && tokenHeader.split(' ')[1];
  if (!loginToken) return res.status(401).send('Authentication required.'); // Access denied.
  jwt.verify(loginToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send('Authentication required.');
    req.data = user;
    next();
  });
};

export const getUserDetail = (req, res) => {
  return res.status(200).send(req.data.user);
};

export async function logout(req, res) {
  const userId = req.body.id;
  await removeLoginTokenByUserId(userId);
  res.status(200).send({ message: 'Successfully Logged Out' });
}
