import React, { Component, Fragment } from 'react'
import { Button, Switch, message } from 'antd'
import { Status } from '../../api/department'
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
            tableConfig: {
                batchBtn: false,
                url: "department",
                checkBox: true,
                method: "post",
                thead: [
                    { title: "部门名称", dataIndex: "name", key: "name" },
                    {
                        title: "禁启用", dataIndex: "status", key: "status", render: (text, rowData) => {
                            return <Switch onChange={() => { this.onHandlerSwitch(rowData) }} loading={this.state.id === rowData.id ? true : false} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
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
                                    <Button onClick={() => this.onSingleDelete(rowData.id)}>删除</Button>
                                </div>)
                        }
                    }
                ],
            }
        }
        this.onHandlerSwitch = this.onHandlerSwitch.bind(this)
    }

    /* 声明周期挂在完成 */
    componentDidMount() {
    }
    // 获取子组件的实例
    getChildRef = (ref) => {
        this.tableComponent = ref
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
    }// 单选删除
    onSingleDelete = (id) => {
        this.tableComponent.onHandlerDelete(id)
    }
    render() {
        return (
            <Fragment>
                <TableComponent onRef={this.getChildRef} batchBtn={true} tableConfig={this.state.tableConfig} />
            </Fragment>

        );
    }
}

export default DepartmentList;