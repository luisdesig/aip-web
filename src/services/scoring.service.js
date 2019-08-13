import { scoring } from './constants';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const ScoringAIP = async (data = {}, method = '') => {
    const result = request(data, method)
    return await axios({
        method: 'POST',
        url: `${APIBASE}/scoring`,
        data: result
    })
}

const Scoring = async (data) => {
    const body = {
        type: 'point',
        lat: data.latitude,
        lng: data.longitude,
        zoom: '12'
    }
    const res = await AuthenticationScoring();
    return axios({
        method: 'POST',
        data: body,
        url: scoring.API,
        headers: {
            "Content-Type": "application/json",
            "Authorization": res
        }
    })
}

const AuthenticationScoring = async () => {
    return new Promise((resolve, reject) => {
        const authentication = {
            Username: scoring.AuthenticationData.USERNAME,
            Password: scoring.AuthenticationData.PASSWORD
        }
        const authenticationDetails = new AuthenticationDetails(authentication);
        const poolData = {
            UserPoolId: scoring.PoolData.USER_POOL_ID,
            ClientId: scoring.PoolData.APP_CLIENT_ID
        }
        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: scoring.AuthenticationData.USERNAME,
            Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                const accessToken = result.getAccessToken().getJwtToken();
                const idToken = result.idToken.jwtToken;
                resolve(accessToken);
            },
            onFailure: err => {
                reject();
            }
        })
    })
}

export {
    Scoring,
    ScoringAIP
}