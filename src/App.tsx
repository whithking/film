import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SeatSelection from './pages/SeatSelection';
import OrderConfirm from './pages/OrderConfirm';
import UserCenter from './pages/UserCenter';
import NavBar from './components/NavBar';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <NavBar />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/seats/:screeningId" element={<SeatSelection />} />
            <Route path="/order/confirm" element={<OrderConfirm />} />
            <Route path="/user" element={<UserCenter />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App; 