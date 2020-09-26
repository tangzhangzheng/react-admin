import React, { Component } from 'react';
import { Button, Form, Input, Table, Switch, message, Modal } from 'antd'
import { TableList } from '@api/common'
import requestUrl from '@/api/requestUrl'


class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            keyWords: "",
            //数据
            data: [],
            rowKey: "",
            loading: false,
        }
    }
    // 挂在完成加载组件
    componentDidMount() {

        this.loadData()
    }
    //获取数据
    loadData = () => {


        const requestData = {
            url: requestUrl[this.props.tableConfig.url],
            method: this.props.tableConfig.method,
            data: {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }

        }





        TableList(requestData).then(response => {
            const resData = response.data.data
            if (resData.data) {
                this.setState({
                    data: resData.data
                })
            }
            this.setState({ loading: false })
        }).catch(err => { this.setState({ loading: false }) })
    }
    /* 复选框 */
    onCheckBox = () => {

    }
    render() {
        const { checkBox, thead } = this.props.tableConfig
        const rowSelections = {
            onChange: this.onCheckBox
        }

        return (<Table loading={this.state.loading} bordered rowKey={this.state.rowKey || "id"} rowSelection={checkBox ? rowSelections : null} {...rowSelections} columns={thead} dataSource={this.state.data} bordered></Table>);
    }
}

export default TableComponent;