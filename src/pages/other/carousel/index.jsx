import React from 'react';
import {Card, Table} from 'antd';
import {connect} from "dva";
import {PageHeaderWrapper} from '@ant-design/pro-layout';

const namespace = 'carousel';
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
      {
        title: '图片', dataIndex: 'img_url', render: img => (
          <img src={img} alt="" height='100'/>
        ),
      },
      {title: '商品链接', dataIndex: 'goods_name'},
      {title: '排序', dataIndex: 'img_sort'}
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
