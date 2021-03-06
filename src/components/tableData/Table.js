import React, { Component, Fragment } from 'react'
import { Table, Row, Col, Pagination, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class TableBasis extends Component {
    render() {
        const { thead, rowKey } = this.props.tableConfig
        return (
            <Fragment>
                <div className="spacing-30px"></div>
                <Table pagination={false} columns={thead} dataSource={this.props.list} bordered rowKey={rowKey}>
                </Table>

                {/* <Row>
                    <Col span={8}>
                        {this.props.batchBtn && <Button onClick={HandlerDelete}> 批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            className="pull-right"
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row> */}
            </Fragment>
        );
    }
}
TableBasis.propTypes = {
    config: PropTypes.object,
    rowKey: PropTypes.string
}
TableBasis.defaultProps = {
    config: {},
    rowKey: "id"

}
// 将store的数据映射成这个组建的props
const mapStateToProps = (state) => {
    //mapState会将数据映射成props
    console.log(state.department.departmentList)
    return {
        list: state.department.departmentList
    }
}

export default connect(
    mapStateToProps,
    null
)(TableBasis);