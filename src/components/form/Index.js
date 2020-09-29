import React, { Component, Fragment } from 'react'
import { Form, Input, Button, InputNumber, Radio, message, Select } from 'antd';
import { requestData } from '@api/common'
import requestUrl from '@api/requestUrl'
import PropTypes from 'prop-types'
const { Option } = Select;
class FormCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesPreix: {
                "Input": "请输入",
                "Radio": "请选择",
                "Select": "请选择",
                "InputNumber": "请输入"
            },
            loading: false
        }
    }
    componentWillReceiveProps({ formConfig }) {
        this.refs.form.setFieldsValue(formConfig.setFieldsValue)
    }
    /* 校验规则 */
    rules = (item) => {
        const { mesPreix } = this.state
        let rules = [];
        if (item.required) {
            let message = item.message || `${mesPreix[item.type]}${item.label}`
            rules.push({ required: true, message: message })
        }
        if (item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules)
        }
        return rules
    }
    /* input */
    inputElem = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder} />
            </Form.Item>
        )
    }

    /* inputNumber款 */
    inputNumber = (item) => {

        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber style={item.style} placeholder={item.placeholder} max={item.max} min={item.min} />
            </Form.Item>
        )
    }
    /* inputNumber款 */
    selectElem = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} rules={rules} key={item.name}>
                <Select >
                    {
                        item.options && item.options.map(elem => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }
    /* radio */
    radio = (item) => {
        console.log(item)
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} rules={rules} key={item.name}>
                <Radio.Group >
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }

    /* 初始化表单 */
    initForm = () => {

        const { formItem } = this.props
        if (!formItem || (formItem && formItem.length === 0)) { return false }
        const formList = []
        formItem.map((item) => {
            if (item.type === "Input") {
                formList.push(this.inputElem(item))
            }
            // if (item.type === "Select") {
            //     formList.push(this.selectElem(item))
            // }
            if (item.type === "InputNumber") {
                formList.push(this.inputNumber(item))
            }
            if (item.type === "Radio") {
                formList.push(this.radio(item))
            }

        })
        return formList

    }
    /* 提交 */
    onSubmit = (value) => {
        if (this.props.submit) {
            this.props.submit(value)
            return false
        }
        console.log(requestUrl[this.props.formConfig.url])
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: value
        }
        this.setState({
            loading: true
        })
        requestData(data).then(res => {
            message.info(res.data.message)
            this.setState({
                loading: false
            })
        }).catch(err => { this.setState({ loading: false }) })
    }

    render() {
        return (
            <Fragment>
                <Form ref="form" onFinish={this.onSubmit}  {...this.props.formLayout} initialValues={this.props.formConfig.initValue}>
                    {this.initForm()}
                    <Form.Item>
                        <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
                    </Form.Item>
                </Form>

            </Fragment>
        );
    }
}

FormCom.propTypes = {
    formConfig: PropTypes.object
}
FormCom.defaultProps = {
    formConfig: {}
}

export default FormCom;