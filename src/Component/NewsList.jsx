import React, { Component } from 'react';
import axios from 'axios';
import './NewsList.css';

class NewsList extends Component {
  state = {
    news: [],
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const apiKey = 'a17b209b9ccc40579822107716faa56f'; // Ganti dengan kunci API Anda dari https://newsapi.org/
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      this.setState({ news: response.data.articles });
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  handleSearch = async () => {
    const { searchQuery } = this.state;
    const apiKey = 'a17b209b9ccc40579822107716faa56f'; // Ganti dengan kunci API Anda dari https://newsapi.org/
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=id&q=${searchQuery}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      this.setState({ news: response.data.articles });
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { news, searchQuery } = this.state;

    return (
      <div>
        <h2>Portal Berita Indonesia</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchQuery}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSearch}>Cari</button>
        </div>
        <ul className="news-list">
          {news.map((article, index) => (
            <li key={index}>
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Baca Selengkapnya
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default NewsList;
