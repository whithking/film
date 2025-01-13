import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Input, Select, Rate } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RootState } from '../../store';
import { fetchMovies } from '../../store/slices/movieSlice';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state: RootState) => state.movies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies() as any);
  }, [dispatch]);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Search
          placeholder="搜索电影"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
        />
        <Select
          defaultValue="all"
          style={{ width: 120, marginLeft: 16 }}
          onChange={setSelectedGenre}
        >
          <Option value="all">全部类型</Option>
          <Option value="action">动作</Option>
          <Option value="comedy">喜剧</Option>
          <Option value="drama">剧情</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]}>
        {filteredMovies.map(movie => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() => navigate(`/movie/${movie.id}`)}
              cover={<img alt={movie.title} src={movie.poster} />}
              className={styles.movieCard}
            >
              <Card.Meta
                title={movie.title}
                description={
                  <>
                    <Rate disabled defaultValue={movie.rating} />
                    <div>{movie.genres.join(', ')}</div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home; 