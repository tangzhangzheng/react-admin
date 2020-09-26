import React, { Component } from 'react'
import { Form, Input, Button, InputNumber, Radio, message } from 'antd'
import { DepartmentAddApi, Detailed, Edit } from '../../api/department'


class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            formLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 20 }
            },
            id: "",
        };
    }

    componentWillMount() {
        console.log(this.props.location.state);
        if (this.props.location.state) {
            this.setState(
                {
                    id: this.props.location.state.id
                }
            )
        }
    }
    componentDidMount() {
        this.getDetail()


    }
    getDetail = () => {
        if (!this.props.location.state) return false;
        console.log(this.props.location.state)
        Detailed({ id: this.state.id }).then(res => {
            const data = res.data.data
            this.refs.form.setFieldsValue({
                content: data.content,
                name: data.name,
                number: data.number,
                status: data.status
            })
        }).catch(err => { });
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
        if (!value.content) {
            message.error('描述不能为空')
            return false;
        }
        this.setState({
            loading: true
        })
        /* 从确定按钮执行添加或编辑 */
        this.state.id ? this.onHandleEdit(value) : this.onHandleAdd(value)
    }
    /* 添加表单 */
    onHandleAdd = (value) => {
        DepartmentAddApi(value).then(res => {
            this.setState({
                loading: true
            })
            const data = res.data
            message.info(data.message)
            this.refs.form.resetFields()
            this.setState({
                loading: false
            })
        }).catch(err => {
            console.log(err);
        })
    }

    /* 编辑信息 */
    onHandleEdit = (value) => {
        const requestData = value

        console.log(this.state)
        requestData.id = this.state.id;
        console.log(requestData)
        // console.log(requestData.id)
        Edit(requestData).then((response) => {
            const data = response.data;
            message.info(data.message);
            this.setState({ loading: false })
        }).catch((err) => console.log(
            this.setState({
                loading: false
            })
        ))
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
                    <Radio.Group defaultValue={false}>
                        <Radio value={false} >禁用 </Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content">
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