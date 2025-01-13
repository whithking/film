import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, message } from 'antd';
import styles from './SeatSelection.module.css';

interface SeatType {
  id: string;
  row: number;
  col: number;
  status: 'available' | 'occupied' | 'selected';
  price: number;
}

const SeatSelection: React.FC = () => {
  const { screeningId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);

  // 模拟座位数据
  const generateSeats = () => {
    const seats: SeatType[] = [];
    for (let row = 1; row <= 8; row++) {
      for (let col = 1; col <= 12; col++) {
        seats.push({
          id: `${row}-${col}`,
          row,
          col,
          status: Math.random() > 0.8 ? 'occupied' : 'available',
          price: row < 4 ? 45 : 35
        });
      }
    }
    return seats;
  };

  const [seats] = useState<SeatType[]>(generateSeats());

  const handleSeatClick = (seat: SeatType) => {
    if (seat.status === 'occupied') return;
    
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        message.warning('最多只能选择6个座位');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      message.warning('请至少选择一个座位');
      return;
    }
    navigate('/order/confirm', {
      state: { selectedSeats, totalPrice: getTotalPrice() }
    });
  };

  return (
    <div className={styles.container}>
      <h2>选择座位</h2>
      <Row gutter={24}>
        <Col span={16}>
          <div className={styles.screen}>银幕</div>
          <div className={styles.legend}>
            <span className={styles.available}>可选</span>
            <span className={styles.occupied}>已售</span>
            <span className={styles.selected}>已选</span>
          </div>
          <div className={styles.seatContainer}>
            {seats.map((seat) => (
              <div
                key={seat.id}
                className={`${styles.seat} ${styles[seat.status]} ${
                  selectedSeats.find(s => s.id === seat.id) ? styles.selected : ''
                }`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.row}-{seat.col}
              </div>
            ))}
          </div>
        </Col>
        <Col span={8}>
          <Card title="订单信息">
            <div className={styles.orderInfo}>
              <p>已选座位：</p>
              {selectedSeats.map(seat => (
                <p key={seat.id}>
                  {seat.row}排{seat.col}座 ￥{seat.price}
                </p>
              ))}
              <p className={styles.total}>总价：￥{getTotalPrice()}</p>
              <Button type="primary" block onClick={handleConfirm}>
                确认选座
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SeatSelection; 