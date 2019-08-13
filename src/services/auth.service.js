import { Auth } from 'aws-amplify';
import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

let userCognito;
const SignIn = async (data = {}) => {
  return await Auth.signIn(data.email, data.password);
};

const SignOut = (data = {}) => {
  return Auth.signOut();
};

const ChangePassword = async (data = {}) => {
  const currentUser = await Auth.currentAuthenticatedUser();
  return await Auth.changePassword(currentUser, data.oldPassword, data.password);
};

const User = (data = {}, method = '') => {
  const result = request(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/usuario`,
    data: result,
  });
};
export { SignIn, SignOut, ChangePassword, User };
