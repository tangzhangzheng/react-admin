import React, { Component, Fragment } from 'react'
//导入antd组件
import { Form, Input, Button, Row, Col, message, loading } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//导入css样式表
import './index.scss'
//导入正则表达式验证规则
import { reg_password } from '../../utils/validate'
//导入接口文件

import { Login, GetCode } from "../../api/account";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            code_btn_loading: false,
            code_btn_text: "获取验证码",
            code_btn_disable: false,
        }

    }
    onFinish = (values) => {
        Login().then(res => { console.log(res) }).catch(err => { console.log(err) })
        console.log('Received values of form: ', values);
    };

    toggleForm = () => {
        this.props.toggle("register");
    }
    // 倒计时函数
    countDown = () => {
        let timer = null;
        let sec = 5;
        this.setState({
            code_btn_disable: true,
            code_btn_text: `${sec}S`,
            code_btn_loading: false
        })
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    code_btn_text: '重新获取',
                    code_btn_disable: false,

                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_btn_text: `${sec}S`
            })
        }, 1000)

    }
    // 获取验证码
    getCode = () => {
        if (!this.state.username) {
            message.warning('用户名不能为空', 1);
            return false;
        }
        const requestData = {
            username: this.state.username,
            module: "login"
        }
        GetCode(requestData).then(res => {
            this.countDown()
        }).catch(err => {
            this.setState({
                code_btn_text: "重新获取"

            })
        })
    }
    //输入处理
    inputChange = (e) => {
        let value = e.target.value
        this.setState({ username: value })

    }


    render() {
        const { username, code_btn_loading, code_btn_text, code_btn_disable } = this.state;
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="cloumn">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
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
                        <Form.Item name="username" rules={
                            [{ required: true, message: '邮箱不能为空', },
                            { type: "email", message: '邮箱格式不正确' }
                            ]
                        }>
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '密码不能为空', },
                        { min: 6, message: '密码不能少于6位' },
                        { pattern: reg_password, message: '密码格式不正确' }

                        ]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[{ required: true, message: '验证码不能为空', },
                        { len: 6, message: '请输入长度6位验证码' }
                        ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />
                                </Col>
                                <Col span={9}>
                                    <Button type="danger" disabled={this.code_btn_disable} loading={code_btn_loading} block onClick={this.getCode}>{code_btn_text}</Button>
                                </Col>

                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={code_btn_loading} type="primary" htmlType="submit" className="login-form-button" block>
                                注册
                                </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}


export default LoginForm;
