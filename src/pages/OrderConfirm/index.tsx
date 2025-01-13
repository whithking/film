import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OrderConfirm.module.css';

interface OrderFormData {
  name: string;
  phone: string;
  email: string;
}

const OrderConfirm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, totalPrice } = location.state || { selectedSeats: [], totalPrice: 0 };

  const onFinish = (values: OrderFormData) => {
    // 这里应该调用支付接口
    message.success('订单提交成功！');
    navigate('/user'); // 跳转到用户中心
  };

  return (
    <div className={styles.container}>
      <Card title="订单确认">
        <div className={styles.orderSummary}>
          <h3>订单信息</h3>
          {selectedSeats.map((seat: any) => (
            <p key={seat.id}>
              {seat.row}排{seat.col}座 ￥{seat.price}
            </p>
          ))}
          <p className={styles.total}>总价：￥{totalPrice}</p>
        </div>
        
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' }
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            确认支付
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default OrderConfirm; 