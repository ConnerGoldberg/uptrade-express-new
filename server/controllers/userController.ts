import { getUserByEmail, getUsers, getUserById } from '../services/queries/userQueries';

export const customersController = (req, res) => {
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' },
  ];
  console.log('req', req);
  res.send(customers);
};

export const allUsers = (req, res) => {
  const users = getUsers();
  users.then((data) => res.send({ data: data })).catch((err) => console.log(err));
};

export const userById = (req, res) => {
  const id = req.params?.id;
  const user = getUserById(id);
  user.then((data) => res.send(data)).catch((err) => console.log(err));
};
