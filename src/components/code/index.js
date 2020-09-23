import React, { Component } from 'react'
import { Button, message } from 'antd'
//导入接口文件
import { GetCode } from "../../api/account";
//导入正则表达式验证规则
import { validate_email } from '../../utils/validate'


// 定时器
let timer = null;
// class 组件
class Code extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.username,
            btn_text: "获取验证码",
            btn_loading: false,
            btn_disabled: false,
            module: props.module,
        }
    }
    //生命周期组件
    componentWillReceiveProps({ username }) {
        this.setState({ username })
    }
    componentWillUnmount() {
        clearInterval(timer);
    }
    // 获取验证码
    getCode = () => {
        const username = this.state.username;

        if (!username) {
            message.warning('用户名不能为空', 1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning('邮箱格式不正确', 1);
            return false;
        }
        this.setState({
            btn_text: "发送中",
            btn_loading: true
        })
        const requestData = {
            username: username,
            module: this.state.module
        }
        GetCode(requestData).then(res => {
            message.success(res.data.message)
            this.countDown()
        }).catch(err => {
            this.setState({
                btn_text: "重新获取",
                btn_loading: false
            })
        })
    }
    // 倒计时函数
    countDown = () => {

        let sec = 60;
        this.setState({
            btn_disabled: true,
            btn_text: `${sec}S`,
            btn_loading: false
        })
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    btn_text: '重新获取',
                    btn_disable: false,

                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                btn_text: `${sec}S`
            })
        }, 1000)

    }

    render() {
        return <Button type="danger" disabled={this.state.btn_disabled} loading={this.state.btn_loading} block onClick={this.getCode}>{this.state.btn_text}</Button>
    }
}

export default Code;