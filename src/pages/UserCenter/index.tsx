import React from 'react';
import { Card, Tabs } from 'antd';
import styles from './UserCenter.module.css';

const { TabPane } = Tabs;

const UserCenter: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="我的订单" key="1">
            订单列表
          </TabPane>
          <TabPane tab="个人信息" key="2">
            个人信息设置
          </TabPane>
          <TabPane tab="我的积分" key="3">
            积分明细
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserCenter; 