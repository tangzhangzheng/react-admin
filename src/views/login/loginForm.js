import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
//导入antd组件
import { Form, Input, Button, Row, Col, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//导入css样式表
import './index.scss'
//导入正则表达式验证规则
import { reg_password } from '../../utils/validate'
//导入接口文件
import { Login } from "../../api/account";
//导入组件
import Code from "../../components/code/index"
//导入md5插件
import CryptoJs from 'crypto-js'
// 方法
import { setToken } from '../../utils/session'




class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            module: "login",
            code: "",
            loading: false
        }

    }
    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code
        }
        this.setState({
            loading: true
        })
        Login(requestData).then(res => {
            this.setState({
                loading: false
            })
            // 存储token
            const data = res.data.data
            setToken(data.token)
            this.props.history.push('/index')
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
        console.log('Received values of form: ', values);
    };

    toggleForm = () => {
        this.props.toggle("register");
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
                            <Input value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '密码不能为空', },
                        { min: 6, message: '密码不能少于6位' },
                        { pattern: reg_password, message: '密码格式不正确' }

                        ]}>
                            <Input type="password" onChange={this.inputChangePassword} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[
                            { required: true, message: '验证码不能为空', },
                            { len: 6, message: '请输入长度6位验证码' }
                        ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />
                                </Col>
                                <Col span={9}>
                                    <Code username={this.state.username} module={module} />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block loading={this.state.loading} >登录 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}


export default withRouter(LoginForm);
