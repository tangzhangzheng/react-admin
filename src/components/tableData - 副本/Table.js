import React, { Component, Fragment } from 'react'
import { Table, Row, Col, Pagination, Button } from 'antd';
import PropTypes from 'prop-types';


class TableBasis extends Component {
    render() {
        const { columns, dataSource, total, changePageCurrent, changePageSize, HandlerDelete, rowSelection, rowKey } = this.props
        return (
            <Fragment>
                <Table pagination={false} columns={columns} dataSource={dataSource} bordered rowSelection={rowSelection} rowKey={rowKey}>
                </Table>
                <div className="spacing-30px"></div>
                <Row>
                    <Col span={8}>
                        {this.props.batchBtn && <Button onClick={HandlerDelete}> 批量删1除</Button>}
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
                </Row>
            </Fragment>
        );
    }
}
TableBasis.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    total: PropTypes.number,
    changePageCurrent: PropTypes.func,
    changePageSize: PropTypes.func,
    batchBtn: PropTypes.bool,
    rowSelection: PropTypes.object,
    rowKey: PropTypes.string
}
TableBasis.defaultProps = {
    columns: [],
    total: 0,
    batchBtn: true,
    rowKey: "id"
}
export default TableBasis;