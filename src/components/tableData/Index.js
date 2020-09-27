import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Pagination, Row, Col, Modal, message } from 'antd'
import { TableList, TableDelete } from '@api/common'

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
            total: 0,
            current: "1",
            // 弹窗
            modalVisible: false,
            modalConfirmLoading: false,
            //复选框
            checkBoxValue: []
        }
    }
    // 挂在完成加载组件
    componentDidMount() {
        // 返回子组件的实例
        this.loadData()
        this.props.onRef(this)

    }
    //获取数据
    loadData = () => {
        console.log(`开始获取数据当前页码${this.state.pageNumber}`)
        const requestData = {
            url: requestUrl[`${this.props.tableConfig.url}List`],
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
                    data: resData.data,
                    total: resData.total
                })
            }
            this.setState({ loading: false })
            console.log(`获取数据时页码${this.state.pageNumber}`)
        }).catch(err => { this.setState({ loading: false }) })
    }
    /* 复选框 */
    onCheckBox = (value) => {
        this.setState({
            checkBoxValue: value
        })
    }

    //页码
    onChangeCurrentPage = (page, pageSize) => {
        console.log(`回调前页码是${this.state.pageNumber}`)
        this.setState({
            pageNumber: page
        }, () => {
            this.loadData()
            console.log(`回调后页码变成了${this.state.pageNumber}`)
        })


    }
    /* 下拉页码 */
    onChangeSizePage = (value, page) => {
        console.log(`分页前页码是${this.state.pageNumber}`)
        this.setState({
            pageNumber: 1,
            pageSize: page
        }, () => {
            this.loadData()
            console.log(`分页后页码变成了${this.state.pageNumber}`)
        })

    }
    /* 删除事件 */
    onHandlerDelete(id) {

        this.setState({
            modalVisible: true,
        })
        if (id) {
            this.setState({
                checkBoxValue: [id]
            })
        }
    }
    /* 弹窗 */
    modalThen = () => {
        // 判断是否已选择删除的数据
        if (this.state.checkBoxValue === 0) {
            message.info("请选择需要删除的数据")
            return false
        }
        this.setState({ modalConfirmLoading: true })
        const id = this.state.checkBoxValue.join()
        const requestData = {
            url: requestUrl[`${this.props.tableConfig.url}Delete`],
            data: {
                id
            }
        }
        TableDelete(requestData).then((res) => {
            message.info(res.data.message)
            this.setState({
                modalVisible: false,
                id: "",
                modalConfirmLoading: false,
                selectKeys: []
            })
            this.loadData()
        }).catch((err) => console.log(err))
    }
    render() {
        const { checkBox, thead } = this.props.tableConfig
        const rowSelections = {
            onChange: this.onCheckBox
        }
        return (

            <Fragment>
                {/* 表格组件 */}
                <Table pagination={false} loading={this.state.loading} bordered rowKey={this.state.rowKey || "id"}
                    rowSelection={checkBox ? rowSelections : null} {...rowSelections} columns={thead} dataSource={this.state.data} bordered>
                </Table>
                <div className="spacing-30px"></div>
                <Row>
                    <Col span={8}>
                        {this.props.batchBtn && <Button onClick={() => this.onHandlerDelete()}> 批量删1除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                            current={this.state.current}
                            onChange={this.onChangeCurrentPage}
                            onShowSizeChange={this.onChangeSizePage}
                            className="pull-right"
                            total={this.state.total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row>
                {/* 弹窗 */}
                <Modal
                    title="提示"
                    visible={this.state.modalVisible}
                    onOk={this.modalThen}
                    onCancel={() => { this.setState({ modalVisible: false }) }}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.modalConfirmLoading}
                >
                    <p className="modal-text">确定删除此信息?<strong className="modal-color">删除后无法恢复</strong></p>
                </Modal>
            </Fragment>
        );
    }
}
//校验数据类型

TableComponent.propTypes = {
    config: PropTypes.object
}
TableComponent.defaultProps = {
    batchBtn: false
}
export default TableComponent;