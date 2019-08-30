import React from 'react';
import {Button, Card, Table, Form, Row, Col, Input} from 'antd';
import {connect} from "dva";
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import DrawerForm from './components/DrawerForm'

const namespace = 'allot';
const mapState = state => {
  const {tableData, pagination, loading, search} = state[namespace];
  return {tableData, pagination, loading, search};
};
const mapDispatch = dispatch => ({
  onDidMount: () => {
    dispatch({type: `${namespace}/fetch`});
  },
  handleTableChange: (pagination, filters) => {
    const payload = {page: pagination.current, limit: pagination.pageSize, ...filters}
    console.log(payload)
    dispatch({type: `${namespace}/fetch`, payload});
  },
  handleSearch: (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      dispatch({type: `${namespace}/fetch`, payload: {...values, page: 1, limit: 10}})
    });
  },
  handleReset: (form) => {
    form.resetFields();
    dispatch({type: `${namespace}/fetch`});
  },
  showDrawer: () => {
    dispatch({type: `${namespace}/showDrawer`});
  }
});

class Allot extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const columns = [
      {title: '配送员姓名', dataIndex: 'name'},
      {title: '店铺', dataIndex: 'subbranch_name'},
      {title: '电话', dataIndex: 'phone'},
      {
        title: '操作', render: (text, record) => (
          <Button type="link">查看</Button>
        ),
      },
    ];
    const {tableData, pagination, loading, handleTableChange, handleSearch, handleReset, form, search, showDrawer} = this.props
    return (
      <PageHeaderWrapper>
        <Card>
          <Form className="ant-advanced-search-form" onSubmit={event => handleSearch(event, form)}>
            <Row gutter={24}>
              <Col span={8} key={1}>
                <Form.Item label={`姓名`}>
                  {form.getFieldDecorator(`name`)(<Input placeholder="输入姓名搜索"/>)}
                </Form.Item>
              </Col>,
              <Col span={8}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{marginLeft: 8}} onClick={() => handleReset(form)}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
          <Button type="primary" onClick={showDrawer}>新建</Button>
          <Table dataSource={tableData} columns={columns} rowKey='id' pagination={pagination}
                 loading={loading}
                 onChange={(pagination) => handleTableChange(pagination, search)}/>
        </Card>
        <DrawerForm/>
      </PageHeaderWrapper>
    )
  }
}

export default connect(mapState, mapDispatch)(Form.create({name: 'advanced_search'})(Allot))
