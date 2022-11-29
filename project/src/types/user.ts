import Person from './person';

type User = Person & {
  email: string;
  token: string;
}

export default User;
