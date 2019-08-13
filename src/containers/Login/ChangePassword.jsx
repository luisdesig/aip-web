import React from 'react';
import { Modal } from '../../components/Modal/Modal';
import { Form, Input, Icon } from 'antd';
import { RowForm, ColForm } from '../../components/Util/util.style'

const InputForm = Form.Item;
const InputPassword = Input.Password;

class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPassword: '',
            newPassword: ''
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newpassword')) {
            callback('La contraseña ingresada no coincide');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { changePassword, history, userChangePassword } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                changePassword({history,values,userChangePassword})
            }
          });
    }

    render() {
        const { modal, handleModalOff } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const formChangePassword = (
            <div>
                <RowForm>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <ColForm sm={24} lg={24}>
                            <ColForm></ColForm>
                            <InputForm label='Nueva Contraseña'>
                                {getFieldDecorator('newpassword', {
                                    rules: [{
                                        required: true, message: 'Ingrese su nueva Contraseña',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <InputPassword
                                        max={30}
                                        style={{ height: 40 }}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Nueva contraseña" />
                                )}
                            </InputForm>
                            <InputForm  label='Verificar Contraseña'>
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: 'La contraseña ingresada no coincide',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <InputPassword
                                        max={30}
                                        style={{ height: 40 }}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Nueva contraseña"
                                        onBlur={this.blurPassword}
                                    />
                                )}
                            </InputForm>
                        </ColForm>
                    </Form>
                </RowForm>
            </div>
        )
        return (
            <Modal
                title='Ingrese una nueva contraseña'
                visible={modal}
                centered={false}
                children={formChangePassword}
                onCancel={handleModalOff}
                onOk={this.handleSubmit}
            />
        )
    }
}

export default Form.create({ name: 'normal_login' })(ChangePassword);