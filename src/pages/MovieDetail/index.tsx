import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Rate, Tabs, Timeline } from 'antd';
import { ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import styles from './MovieDetail.module.css';

const { TabPane } = Tabs;

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col span={8}>
          <Card cover={<img alt="movie poster" src="poster_url" />}>
            <Card.Meta
              title="电影名称"
              description={
                <>
                  <Rate disabled defaultValue={4.5} />
                  <p><ClockCircleOutlined /> 时长：120分钟</p>
                  <p><TeamOutlined /> 导演：张导演</p>
                </>
              }
            />
          </Card>
        </Col>
        <Col span={16}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="剧情简介" key="1">
              <p>电影简介内容...</p>
            </TabPane>
            <TabPane tab="放映场次" key="2">
              <Timeline>
                {[1, 2, 3].map(i => (
                  <Timeline.Item key={i}>
                    <Card>
                      <p>时间：14:30</p>
                      <p>影厅：1号厅</p>
                      <p>价格：￥35</p>
                      <Button 
                        type="primary"
                        onClick={() => navigate(`/seats/${i}`)}
                      >
                        选座购票
                      </Button>
                    </Card>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>
            <TabPane tab="用户评价" key="3">
              用户评价内容...
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default MovieDetail; 