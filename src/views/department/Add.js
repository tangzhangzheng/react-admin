import React, { Component } from 'react'
import { message } from 'antd'
import { Detailed, Edit, Add } from '../../api/department'
import FormCom from '@/components/form/Index'


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
            formItem: [
                {
                    type: "Input",
                    label: "部门名称",
                    name: "name",
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请输入部门名称"
                },
                {
                    type: "Select", label: "部门12名称", name: "namea", required: true, options: [
                        { label: "研发部", value: "a" },
                        { label: "行政部", value: "b" }
                    ],
                    style: { width: "150px" }
                },
                {
                    type: "InputNumber",
                    label: "人员数量",
                    name: "number",
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请输入人员数量",
                    max: "100",
                    min: "0"
                },
                {
                    type: "Radio",
                    label: "禁启用",
                    name: "status",
                    required: true,
                    options: [
                        { label: "启用", value: true },
                        { label: "禁用", value: false }
                    ]
                },
                {
                    type: "Input",
                    label: "描述",
                    name: "content",
                    required: true,
                    placeholder: "请输入人员描述内容",

                },

            ],
            formConfig: {
                url: "departmentAddForm",
                initValue: {
                    number: 4,
                    status: true
                },
                setFieldsValue: {}
            }
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
            this.setState({
                formConfig: {
                    ...this.state.formConfig,
                    setFieldsValue: res.data.data
                }
            })
        }).catch(err => { });
    }
    /* 编辑信息 */
    onHandleEdit = (value) => {
        const requestData = value
        requestData.id = this.state.id;

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

    onHandleAdd = (value) => {
        const requestData = value
        requestData.id = this.state.id;
        Add(requestData).then((response) => {
            const data = response.data;
            message.info(data.message);
            this.setState({ loading: false })
        }).catch((err) => console.log(
            this.setState({
                loading: false
            })
        ))
    }

    onHandlerSubmit = (value) => {
        this.state.id ? this.onHandleEdit(value) : this.onHandleAdd(value)
    }

    render() {
        return (
            <div>
                <FormCom
                    formItem={this.state.formItem}
                    formLayout={this.formLayout}
                    onSubmit={this.onSubmit}
                    formConfig={this.state.formConfig}
                    initValue={this.state.formConfig.initValue}
                    submit={this.onHandlerSubmit}
                />
            </div>
        );
    }
}


export default DepartmentAdd;