import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon} from 'antd';
import React from "react";
import {connect} from "dva";

const {Option} = Select;

const namespace = 'allot';
const mapState = state => {
  const {drawerShow} = state[namespace];
  return {drawerShow};
};
const mapDispatch = dispatch => ({
  showDrawer: () => {
    dispatch({type: `${namespace}/showDrawer`});
  },
  handleSubmit: (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log(values)
    });
  },
  handleReset: (form) => {
    form.resetFields();
  }
});

class DrawerForm extends React.Component {
  render() {
    const {form, form: {getFieldDecorator}, drawerShow, showDrawer, handleSubmit} = this.props;
    return (
      <div>
        <Drawer title="Create a new account" width={720} onClose={showDrawer} visible={drawerShow} destroyOnClose>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="配送员姓名">
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入配送员姓名'}],
                  })(<Input placeholder="请输入配送员姓名"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="配送员电话">
                  {getFieldDecorator('phone', {
                    rules: [{required: true, message: '请输入配送员电话'}],
                  })(<Input placeholder="请输入配送员电话"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="选择店铺">
                  {getFieldDecorator('subbranch_id', {
                    rules: [{required: true, message: '请选择店铺'}],
                  })(
                    <Select placeholder="请选择店铺">
                      <Option value="xiao">Xiaoxiao Fu</Option>
                      <Option value="mao">Maomao Zhou</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}>
            <Button onClick={showDrawer} style={{marginRight: 8}}>Cancel</Button>
            <Button onClick={(event) => handleSubmit(event, form)} type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(Form.create({name: 'new_form'})(DrawerForm))
