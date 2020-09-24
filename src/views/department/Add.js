import React, { Component } from 'react'
import { Form, Input, Button, InputNumber, Radio, message } from 'antd'
import { DepartmentAddApi } from '../../api/department'


class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            formLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 20 }
            }
        };
    }
    onSubmit = (value) => {

        if (!value.name) {
            message.error('部门不能为空')
            return false;
        }
        if (!value.number || value.number === 0) {
            message.error('人员数量不能为0')
            return false;
        }
        if (!value["content "]) {
            message.error('描述不能为空')
            return false;
        }
        this.setState({
            loading: true
        })
        DepartmentAddApi(value).then(res => {
            const data = res.data
            message.info(data.message)
            this.setState({
                loading: true
            })
            this.refs.form.resetFields()
        }).catch(err => {
            this.setState({
                loading: false
            })
            message.info(err.data.message)
        })
    }
    render() {
        return (
            <Form ref="form" onFinish={this.onSubmit} {...this.state.formLayout}>
                <Form.Item label="部门名称" name="name" >
                    <Input />
                </Form.Item>
                <Form.Item label="人员数量" name="number">
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="禁启用" name="status">
                    <Radio.Group defaultValue={0}>
                        <Radio value={0} >禁用 </Radio>
                        <Radio value={1}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content ">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
                </Form.Item>
            </Form>

        );
    }
}


export default DepartmentAdd;