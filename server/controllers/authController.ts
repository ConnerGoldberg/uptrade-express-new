import { addUser } from '../services/commands/userCommands';
import { getUserByEmail } from '../services/queries/userQueries';
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
    console.log('retrieving user: ', registeredUser.password);
    console.log(user.password);
    const result = bcrypt.compareSync(user?.password, registeredUser.password);
    if (result) {
      console.log('worked');
      bcrypt.hash(registeredUser.password, 5, function (err, hash) {
        res.send({ token: hash });
      });
    } else {
      console.log('invalid password');
    }
  } catch (e) {
    console.log(`Error authenticating user ${e.message}`);
    res.status(500).send('Error authenticating user');
  }
}
