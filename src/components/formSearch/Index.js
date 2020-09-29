import React, { Component, Fragment } from 'react'
import { Form, Input, Button, InputNumber, Radio, Select } from 'antd';
import requestUrl from '@/api/requestUrl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TableList } from '@api/common'
// redux
import { bindActionCreators } from 'redux'
// redux-actions
import { DepartmentList, UpdateDepartmentList } from '../../store/action/department'
const { Option } = Select
class FormSearch extends Component {
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
    componentDidMount() {
        this.onSubmit()
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
    selectElem = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} rules={rules} key={item.name} >
                <Select style={item.style} placeholder={item.placeholder}>
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
            if (item.type === "Select") {

                item.options = this.props.config[item.optionsKey]
                formList.push(this.selectElem(item))
            }
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
        const searchData = {}
        for (let key in value) {
            if (value[key] !== undefined && value[key] !== "") {
                searchData[key] = value[key]
            }
        }
        this.search({
            url: "departmentList",
            searchData: searchData
        })
    }
    /* search方法 */
    search = (params) => {
        const requestData = {
            url: requestUrl[params.url],

            data: {
                pageNumber: 1,
                pageSize: 10,
            }
        }
        // 筛选项数据拼接
        if (JSON.stringify(params.searchData) !== "") {
            for (let key in params.searchData) {
                requestData.data[key] = params.searchData[key]
            }
        }
        //请求接口
        TableList(requestData).then(response => {
            const resData = response.data.data // 数据
            this.props.actions.addData(resData)
            // dispatch({
            //     type: "GET_DEPARTMENT_LIST",
            //     payload: { data: resData }
            // })
        }).catch(err => { })
    }
    render() {
        return (
            <Fragment>
                <Form layout="inline" ref="form" onFinish={this.onSubmit}  {...this.props.formLayout} initialValues={this.props.formConfig.initValue}>
                    {this.initForm()}
                    <Form.Item>
                        <Button loading={this.state.loading} type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>

            </Fragment>
        );
    }
}

FormSearch.propTypes = {
    formConfig: PropTypes.object
}
FormSearch.defaultProps = {
    formConfig: {}
}

const mapStateToProps = (state) => ({
    config: state.config
})
const mapDispatchToProps = (dispatch) => {
    return {
        // listData: bindActionCreators(DepartmentList, dispatch)// 单个action处理
        actions: bindActionCreators(
            { addData: DepartmentList, uploadData: UpdateDepartmentList }
            , dispatch
        )

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormSearch)