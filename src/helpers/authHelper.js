import { Auth } from 'aws-amplify';
import jwtDecode from 'jwt-decode';
import { User } from '../services/auth.service';
import config from '../settings/awsConfig';

class AuthHelper {
  login = async userInfo => {
    if (!userInfo.email || !userInfo.password) {
      return { error: 'please fill in the input' }
    }
    try {
      const user = await Auth.signIn(userInfo.email, userInfo.password);
      Auth.currentCredentials();
      return user
    } catch (err) {
      console.log(err)
    }
  }

  loginFederate = async () => {
    try {
      const user = await Auth.currentSession();
      return await user.idToken
    } catch (error) {
      console.log(error)
    }
  }

  logoutFederate = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log(error)
    }
  }

  changePassword = async passwordInfo => {
    try {
      const res = await Auth.completeNewPassword(
        passwordInfo.user,
        passwordInfo.newpassword, {
          name: passwordInfo.user.username,
          family_name: 'RIMAC'
        })
      return res
    } catch (err) {
      console.log(err)
    }
  }

  checkExpirity = token => {
    if (!token) {
      return {
        error: 'not matched',
      };
    }
    try {
      const profile = jwtDecode(token);
      const expiredAt = profile.expiredAt || profile.exp * 1000;
      if (expiredAt > new Date().getTime()) {
        return {
          ...profile,
          token,
          expiredAt: new Date(expiredAt),
        };
      } else {
        return { error: 'Token expired' };
      }
    } catch (e) {
      console.log(e);

      return { error: 'Server Error' };
    }
  }
  getSideBarUser = async email => {
    let data = { "MAILTER": email }
    const res = await User(data, 3)
    return res
  }
}

export default new AuthHelper();