import React, { Component } from 'react'
//导入css
import './index.scss'

// 导入组件
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: "login"
        }

    }
    switchForm = (value) => {
        this.setState({
            formType: value
        });
    }

    render() {
        return (
            <div className="form-wrap">
                <div>
                    {this.state.formType === "login" ? <LoginForm toggle={this.switchForm} /> : <RegisterForm toggle={this.switchForm} />}
                </div>
            </div>
        )
    }
}


export default Login;
