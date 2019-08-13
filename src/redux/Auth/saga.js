import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import AuthHelper from '../../helpers/authHelper';
import { setToken, clearToken, getToken, setTrace, getTrace, clearTrace } from '../../helpers/utility';
import actions from './actions';
import config from '../../settings/awsConfig';
import { Auth } from 'aws-amplify'
import { notification } from 'antd';

export function* loginRequest() {
    yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
        const { history, userInfo } = payload;
        try {
            const result = yield call(AuthHelper.login, userInfo);
            if (result) {
                if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = result.challengeParam;
                    yield put({
                        type: actions.CHECK_PASSWORD,
                        data: result
                    })
                } else {
                    let username = result.attributes.email;
                    yield setTrace(username)
                    let res = AuthHelper.checkExpirity(result.signInUserSession.idToken.jwtToken);
                    yield put({
                        type: actions.LOGIN_SUCCESS,
                        payload: res,
                        token: res.token,
                        history,
                        username: username
                    });
                    notification.success({
                        message: 'Usuario logueado',
                        description:
                            'Exito',
                    })
                }
            } else {
                notification('Error', result.error || result)
                yield put({ type: actions.LOGIN_ERROR })
            }
        } catch (error) {
            notification.error({
                message: 'Login Incorrecto',
                description:
                    'Por favor revise su usuario o contrasena en caso de emergencia comunicace al area de soporte',
            })
        }
    })
}
export function* loginFederation() {
    yield takeEvery('LOGIN_FEDEREATION', function* () {
        try {
            const result = yield call(AuthHelper.loginFederate);
            let res = AuthHelper.checkExpirity(result.jwtToken);
            let username = res.email
            yield setTrace(username);
            yield put({
                type: actions.LOGIN_SUCCESS,
                payload: res,
                token: res.token,
                username: username
            });
        } catch (error) {
        }
    })
}

export function* changePassword() {
    yield takeEvery('CHANGE_PASSWORD', function* ({ payload }) {
        const { history, values, userChangePassword } = payload;
        const data = {
            user: userChangePassword,
            newpassword: values.newpassword
        }
        try {
            const result = yield call(AuthHelper.changePassword, data);
            let res = AuthHelper.checkExpirity(result.signInUserSession.accessToken.jwtToken);
            let username = result.challengeParam.userAttributes.email;
            yield setTrace(username)
            yield put({
                type: actions.LOGIN_SUCCESS,
                token: res.token,
                payload: res,
                history,
                username: username
            });
            notification.success({
                message: 'Contrasena cambiada',
                description:
                    'Exito',
            })
        } catch (error) {
            notification.error({
                message: 'Error al cambiar la contrasena',
                description:
                    'Exito',
            })
        }
    })
}

export function* loginSuccess() {
    yield takeEvery(actions.LOGIN_SUCCESS, function* ({ payload, history, username }) {
        const result = yield call(AuthHelper.getSideBarUser, username);
        if (result.data.response.status.success === true) {
            if (result.data.response.payload.acciones.length > 0) {
                yield put({
                    type: 'SIDEBARUSER',
                    data: result.data.response.payload
                })
                yield put({
                    type: 'CLEAN_MODAL',
                })
            } else {
                yield put({
                    type: 'PERMISO_DENEGADO',
                })
            }
        } else {
            yield put({
                type: 'PERMISO_DENEGADO',
            })
        }
        yield setToken(payload.token);
        if (history) {
            history.push('/main');
        }
    })
}

export function* loginError() {
    yield takeEvery(actions.LOGIN_ERROR, function* () { });
}

export function* logout() {
    yield takeEvery(actions.LOGOUT, function* () {
        yield AuthHelper.logoutFederate();
        yield clearToken();
        yield clearTrace();
    });
}

export function* checkAuthorization() {
    yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
        const { token } = AuthHelper.checkExpirity(getToken());
        const username = getTrace();
        if (token) {
            yield put({
                type: actions.LOGIN_SUCCESS,
                payload: { token },
                token,
                profile: 'Profile',
                username: username
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(checkAuthorization),
        fork(loginRequest),
        fork(loginFederation),
        fork(changePassword),
        fork(loginSuccess),
        fork(loginError),
        fork(logout)
    ])
}