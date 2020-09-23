import React, { Component, Fragment } from 'react'
//导入antd组件
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Code from '../../components/code/index'
import { validate_pass } from '../../utils/validate'
//导入接口文件
import { Register } from "../../api/account";
//导入md5插件
import CryptoJs from 'crypto-js'

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "register"
        };
    }
    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code
        }
        Register(requestData).then(response => {
            const data = response.data
            message.success(data.message)
            if (data.resCode === 0) {
                this.toggleForm()
            }
        }).catch(error => {

        })
    };

    toggleForm = () => {
        this.props.toggle("login")
    }
    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }
    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            password: value
        })
    }
    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            code: value
        })
    }


    render() {
        const { username, module } = this.state;
        return (

            <Fragment>
                <div className="form-header">
                    <h4 className="cloumn">注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={[
                            { required: true, message: "邮箱不能为空！！" },
                            { type: "email", message: "邮箱格式不正确" }
                        ]} >
                            <Input onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' },

                        // { pattern: validate_password, message: '密码格式不正确' }
                        ({ getFieldValue }) => ({
                            validator(role, value) {
                                let passwords_value = getFieldValue("passwords");
                                if (!validate_pass(value)) {
                                    return Promise.reject("请输入6-20位的数字+字母密码")
                                }

                                if (passwords_value && value !== passwords_value) {
                                    return Promise.reject("两次密码不一致")
                                }

                                return Promise.resolve()

                            }
                        }),

                        ]}>
                            <Input onChange={this.inputChangePassword} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item name="passwords" rules={[
                            { required: true, message: '二次输入密码不能为空' },
                            ({ getFieldValue }) => ({
                                validator(role, value) {
                                    if (value != getFieldValue("password")) {
                                        return Promise.reject("密码不一致")
                                    }
                                    return Promise.resolve()

                                }
                            })
                        ]}>
                            <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item name="code" rules={[{ required: true, message: ' 请输入验证码 ' },
                        { len: 6, message: '请输入长度6位验证码' }]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input type="password" onChange={this.inputChangeCode} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module} />
                                </Col>

                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                注册
                                </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}


export default RegisterForm;
