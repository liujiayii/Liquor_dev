import React from 'react';
import {Card, Table, Button, Modal} from 'antd';
import {connect} from "dva";
import moment from "moment";
import {PageHeaderWrapper} from '@ant-design/pro-layout';

const namespace = 'customer';
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
  },
  showConfirm: () => {
    Modal.confirm({
      title: '提示',
      content: '是否重置首单优惠资格？',
      onOk() {
        console.log('OK');
        dispatch({type: `${namespace}/reset`});
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
      {title: '微信名', dataIndex: 'wx_name'},
      {title: '用户推广金', dataIndex: 'generalize_money'},
      {title: '创建时间', dataIndex: 'time', render: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),},
      {
        title: '操作', render: (text, record) => (
          <Button type="link">酒友圈</Button>
        ),
      },
    ];
    const {tableData, pagination, loading, handleTableChange, showConfirm} = this.props
    return (
      <PageHeaderWrapper>
        <Card>
          <Button type="primary" onClick={showConfirm}>一键重置首单优惠资格</Button>
          <Table dataSource={tableData} columns={columns} rowKey='id' pagination={pagination}
                 loading={loading}
                 onChange={handleTableChange}/>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
