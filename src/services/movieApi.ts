import axios from 'axios';

export const movieApi = {
  getMovies: () => {
    // 临时返回模拟数据
    return Promise.resolve({
      data: [
        {
          id: '1',
          title: '测试电影',
          poster: 'https://via.placeholder.com/300x400',
          rating: 4.5,
          genres: ['动作', '冒险'],
          duration: 120,
          releaseDate: '2023-12-25',
          director: '张导演',
          cast: ['演员1', '演员2'],
          synopsis: '电影简介',
          language: '中文'
        }
      ]
    });
  }
}; 