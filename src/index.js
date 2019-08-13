import 'babel-polyfill';
import 'react-app-polyfill/ie11';
import 'core-js';
import 'raf/polyfill';
import './ReactotronConfig';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify, { Auth } from 'aws-amplify';
import config from './settings/awsConfig';
import { PATH_APP } from './settings/path';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

Amplify.configure({
  /*Auth: {
        mandatorySignIn: false,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        region: config.cognito.REGION,
        identityPoolRegion: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH',
        cookieStorage: {
            domain: 'localhost:4200',
            path: '/',
            expires: 365,
            secure: true
        },
        oauth: {
            domain: config.cognito.USER_POOL_DOMAIN_NAME,
            scope: config.cognito.OAUTH_SCOPE,
            redirectSignIn: PATH_APP.DOMAIN + PATH_APP.HOME,
            redirectSignOut: PATH_APP.DOMAIN + PATH_APP.LOGIN,
            responseType: config.cognito.OAUTH_RESPONSE_TYPE,
            options: {
                AdvancedSecurityDataCollectionFlag: true
            }
        }
    },*/
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
      domain: config.cognito.DOMAIN,
      redirectSignIn: config.cognito.REDIRECT_SIGNIN,
      redirectSignOut: config.cognito.REDIRECT_SIGNOUT,
      responseType: config.cognito.RESPONSE_TYPE,
      scope: config.cognito.SCOPE,
    },
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: config.apiGateway.NAME,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

Auth.configure();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
