
import React from 'react';
import ChangePassword from './ChangePassword';
import { Layout, Col, Row, Form, Input, Icon, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { LoginContainer } from './login.style';
import { connect } from 'react-redux';
import authAction from '../../redux/Auth/actions';
import imgLogo from '../../images/logo-rimac.png';
import { Auth } from 'aws-amplify';
import config from '../../settings/awsConfig';

const { Header, Content } = Layout;
const InputForm = Form.Item;
const InputPassword = Input.Password;

const { login, changePassword, handleModalOff, loginfederate } = authAction;

class Login extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    state = {
        redirectToReferrer: false,
        federation: false
    }

    async componentDidMount() {
        if (this.props.location.state) {
            const params = new URLSearchParams(this.props.location.state.from.search);
            const code = params.get('code');
            if (code) {
                this.handleFederationRimac();
            }
        }
    }

    redirect = () => {
        this.setState({ redirectToReferrer: false })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { login, history } = this.props;
        this.props.form.validateFields((err, userInfo) => {
            if (!err) {
                let federate = userInfo.email.indexOf("@rimac.com.pe")
                console.log(federate)
                if(federate < 0){
                    login({ history, userInfo })
                }else{
                    this.handleFederationRimac()
                }
            }
        });

    }
    handleFederationRimac = async () => {
        let scopes = config.cognito.SCOPE.join(" ");
        let url = 'https://' + config.cognito.DOMAIN +
            '/oauth2/authorize?identity_provider=AzureADProvider&redirect_uri=' +
            config.cognito.REDIRECT_SIGNIN +
            '&response_type=' +
            config.cognito.RESPONSE_TYPE +
            '&client_id=' + config.cognito.APP_CLIENT_ID +
            '&scope=' + scopes;
        window.location.href = url;
        await this.props.loginfederate();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const from = { pathname: '/main' };
        const {
            isLoggedIn,
            modalChangePassword,
            changePassword,
            userChangePassword,
            handleModalOff
        } = this.props;
        if (isLoggedIn) {
            return <Redirect to={from} />;
        }
        return (
            <LoginContainer>
                <Layout className="layout">
                    <Header>
                        <div className="logo">
                            <img src={imgLogo} alt="Logo RIMAC Seguros" />
                        </div>
                    </Header>
                    <Content style={{ padding: '50px' }}>
                        <Row>
                            <Col md={24} lg={{ span: 8, offset: 8 }}>
                                <div className="title">
                                    <h2>Nuevo Aplicativo de Inspecciones Patrimoniales</h2>
                                </div>
                                <h4 className="title-form">Ingresa tus datos de acceso</h4>
                            </Col>
                            <Col md={24} lg={{ span: 8, offset: 8 }}>
                                <Form onSubmit={this.handleSubmit} className='login-form'>
                                    <InputForm>
                                        {
                                            getFieldDecorator('email', {
                                                rules: [{ required: true, message: 'Por favor ingres el usuario' }]
                                            })(
                                                <Input
                                                    max={30}
                                                    style={{ height: 40 }}
                                                    prefix={<Icon
                                                        type="user"
                                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                                    />}
                                                    placeholder="Username" />
                                            )
                                        }
                                    </InputForm>
                                    <InputForm>
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: 'Por favor ingrese su contraseña',
                                            }],
                                        })(
                                            <InputPassword
                                                max={30}
                                                style={{ height: 40 }}
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="Password" />
                                        )}
                                    </InputForm>
                                    <InputForm>
                                        <Button
                                            htmlType="submit"
                                            className="login-form-button">
                                            INGRESAR
                                    </Button>
                                    </InputForm>
                                    {
                                        /**
                                        <InputForm>
                                        <Button
                                            onClick={this.handleFederationRimac}
                                            className="login-form-button-2">
                                            INGRESAR CON CUENTA RIMAC
                                    </Button>
                                    </InputForm>
                                        */
                                    }
                                </Form>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
                <ChangePassword
                    modal={modalChangePassword}
                    changePassword={changePassword}
                    history={this.props.history}
                    userChangePassword={userChangePassword}
                    handleModalOff={handleModalOff}
                />
            </LoginContainer>
        )
    }
}

const mapStateProps = (state) => ({
    isLoggedIn: state.auth.idToken !== null ? true : false,
    modalChangePassword: state.auth.changePassword,
    userChangePassword: state.auth.userChangePassword,
    federation: state.auth.federation
})

export default Form.create({ name: 'normal_login' })(connect(mapStateProps, { login, changePassword, handleModalOff, loginfederate })(Login));