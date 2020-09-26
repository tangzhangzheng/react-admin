import React, { Component, Fragment } from 'react'
import { Button, Form, Input, Table, Switch, message, Modal } from 'antd'
import { GetList, Delete, Status } from '../../api/department'
import { Link } from 'react-router-dom'
import TableComponent from '@/components/tableData/Index'


class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWords: "",
            id: "",
            data: [],
            selectKeys: [{ title: "部门名称", dataIndex: "name", key: "name" },
            {
                title: "禁启用", dataIndex: "status", key: "status", render: (text, rowData) => {
                    return <Switch onChange={() => { this.onHandlerSwitch(rowData) }} loading={this.state.id == rowData.id ? true : false} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
                }
            },
            { title: "人员数量", dataIndex: "number", key: "number" },
            {
                title: "操作", dataIndex: "operation", key: "operation", with: 215,
                render: (text, rowData) => {
                    return (
                        <div className="inline-button">
                            <Button type="primary"  >
                                <Link to={{ pathname: '/index/department/add', state: { id: rowData.id } }}>编辑</Link>
                            </Button>
                            <Button onClick={() => this.onHandleDelete(rowData.id)}>删除</Button>
                        </div>)
                }
            }],
            //警告
            visible: false,
            confirmLoading: false,
            loading: false,
            tableConfig: {
                url: "departmentList",
                checkBox: true,
                method: "post",
                thead: [
                    { title: "部门名称", dataIndex: "name", key: "name" },
                    {
                        title: "禁启用", dataIndex: "status", key: "status", render: (text, rowData) => {
                            return <Switch onChange={() => { this.onHandlerSwitch(rowData) }} loading={this.state.id == rowData.id ? true : false} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
                        }
                    },
                    { title: "人员数量", dataIndex: "number", key: "number" },
                    {
                        title: "操作", dataIndex: "operation", key: "operation", with: 215,
                        render: (text, rowData) => {
                            return (
                                <div className="inline-button">
                                    <Button type="primary"  >
                                        <Link to={{ pathname: '/index/department/add', state: { id: rowData.id } }}>编辑</Link>
                                    </Button>
                                    <Button onClick={() => this.onHandleDelete(rowData.id)}>删除</Button>
                                </div>)
                        }
                    }
                ],
            }
        }
        this.onHandlerSwitch = this.onHandlerSwitch.bind(this)
    }
    //绑定搜索事件
    onFinish = (value) => {
        if (this.state.loading) { return false }
        this.setState({
            keyWords: value.name,
            pageNumber: 1,
            pageSize: 10,
        })
        //调用数据
        this.loadData()
    }
    /* 声明周期挂在完成 */
    componentDidMount() {

    }
    /* 删除 */
    onHandleDelete = (id) => {

        if (!id) {
            if (this.state.selectKeys === 0) { return false }
            id = this.state.selectKeys.join()
        };
        this.setState({
            visible: true,
            id,
        })
    }
    //禁启用
    onHandlerSwitch(data) {
        if (!data.status) return false;
        const requestData = {
            id: data.id,
            status: data.status === '1' ? false : true
        }
        this.setState({ id: data.id })
        Status(requestData).then((res) => {
            message.info(res.data.message)
            this.setState({ id: "" })
        }).catch((err) => { this.setState({ id: "" }) })
    }
    onCheckBox = (selectKeys) => {
        this.setState({
            selectKeys: selectKeys
        })

    }
    /* 弹窗 */
    modalThen = () => {
        Delete({ id: this.state.id }).then((res) => {
            message.info(res.data.message)
            this.loadData()
            this.setState({
                visible: false,
                id: "",
                confirmLoading: false,
                selectKeys: []
            })
        }).catch((err) => console.log(err))
    }
    render() {
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.onFinish} >
                    <Form.Item label="部门名称" name="name" >
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>.
                <Form.Item>
                        <Button type="primary" htmlType="submit"> 搜索</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrap">
                    <TableComponent tableConfig={this.state.tableConfig} />

                    <Button onClick={() => this.onHandleDelete()}>批量删除</Button>
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.modalThen}
                    onCancel={() => { this.setState({ visible: false }) }}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.confirmLoading}
                >
                    <p className="modal-text">确定删除此信息?<strong className="modal-color">删除后无法恢复</strong></p>
                </Modal>
            </Fragment>

        );
    }
}

export default DepartmentList;