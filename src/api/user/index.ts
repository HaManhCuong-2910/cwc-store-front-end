import { instance } from '../axios';

export const login = () => {
  return instance.post('/auth/login', {
    email: 'cuonghm@gmail.com',
    password: '123456',
  });
};
