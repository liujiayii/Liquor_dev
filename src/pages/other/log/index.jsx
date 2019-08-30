import React from 'react';
import {Card, Table} from 'antd';
import {connect} from "dva";
import moment from "moment";
import {PageHeaderWrapper} from '@ant-design/pro-layout';

const namespace = 'log';
const mapState = state => {
  const {tableData, pagination, loading} = state[namespace];
  return {tableData, pagination, loading};
};
const mapDispatch = dispatch => ({
  onDidMount: () => {
    dispatch({type: `${namespace}/fetch`});
  },
  handleTableChange: (pagination, filters, sorter) => {
    const payload = {page: pagination.current, limit: pagination.pageSize}
    dispatch({type: `${namespace}/fetch`, payload});
  }
});
@connect(mapState, mapDispatch)
export default class Log extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const columns = [
      {title: '编号', dataIndex: 'id'},
      {title: '店铺名称', dataIndex: 'deliveryman.subbranch_name'},
      {title: '配送员姓名', dataIndex: 'deliveryman.name'},
      {title: '登录地址', dataIndex: 'ip'},
      {title: '时间', dataIndex: 'date', render: date => moment(date).format('YYYY-MM-DD'),},
    ];
    const {tableData, pagination, loading, handleTableChange} = this.props
    return (
      <PageHeaderWrapper>
        <Card>
          <Table dataSource={tableData} columns={columns} rowKey='id' pagination={pagination}
                 loading={loading}
                 onChange={handleTableChange}/>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
