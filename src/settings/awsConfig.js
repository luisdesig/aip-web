export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'ue1stgdesaas3prv001',
  },
  apiGateway: {
    NAME: 'UE1NETDESAAPIAIP001',
    REGION: 'us-east-2',
    URL: 'https://y7hbp7dp1l.execute-api.us-east-2.amazonaws.com/DESA',
  },
  cognito: {
    /*REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_oYyBgwLfv",
        APP_CLIENT_ID: "19uvbhmf6j4oifrhpsg466biec",
        IDENTITY_POOL_ID: "us-east-2:1476e777-c5f3-46d5-8afb-3a160ddf6c39",
        USER_POOL_DOMAIN_NAME: 'rimac-com-pe-desa.auth.us-east-2.amazoncognito.com',
        OAUTH_PROVIDER: 'AzureADProvider',
        //REDIRECT_SIGNIN: 'https://d3i3aqsdcqu1qe.cloudfront.net/login', // desa
        //REDIRECT_SIGNOUT: 'https://d3i3aqsdcqu1qe.cloudfront.net/login', // desa
        REDIRECT_SIGNIN: "http://localhost:4200/login",  // local
        REDIRECT_SIGNOUT: "http://localhost:4200/login", //local
        //OAUTH_RESPONSE_TYPE: 'code',
        //OAUTH_SCOPE: ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin']
        RESPONSE_TYPE: 'code',
        SCOPE: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin']*/
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_oYyBgwLfv',
    APP_CLIENT_ID: '19uvbhmf6j4oifrhpsg466biec',
    IDENTITY_POOL_ID: 'us-east-2:1476e777-c5f3-46d5-8afb-3a160ddf6c39',
    DOMAIN: 'rimac-com-pe-desa.auth.us-east-2.amazoncognito.com',
    OAUTH_PROVIDER: 'AzureADProvider',
    REDIRECT_SIGNIN: 'https://localhost:3000/main', // desa
    REDIRECT_SIGNOUT: 'https://localhost:3000/login', // desa
    RESPONSE_TYPE: 'code',
    SCOPE: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  },
};
