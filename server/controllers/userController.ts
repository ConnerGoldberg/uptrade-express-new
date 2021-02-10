import dbService from '../db/dbService';
import { getUserByEmail, getUsers } from '../services/queries/userQueries';

export const customersController = (req, res) => {
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' },
  ];

  res.send(customers);
};

export const userController = (req, res) => {
  const users = getUsers();
  users.then((data) => res.send({ data: data })).catch((err) => console.log(err));
};
