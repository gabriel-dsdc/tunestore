import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    isLoading: true,
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoading: false });
  }

  handleFavorite = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  }

  setIsLoading = (bool) => {
    this.setState({ isLoading: bool });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header currentLink="favorites" />
        { !isLoading ? (
          <div className="musics-page-content">
            <div className="music-list">
              <h3>Músicas favoritas:</h3>
              { favoriteSongs.map((favoriteSong) => (
                <div key={ favoriteSong.trackId } className="music-card-content">
                  <MusicCard
                    music={ favoriteSong }
                    favoriteSongs={ favoriteSongs }
                    onFavoriteChange={ this.handleFavorite }
                    setIsLoading={ this.setIsLoading }
                  />
                </div>
              )) }
            </div>
          </div>
        ) : <Loading TagName="h1" /> }
      </div>
    );
  }
}

export default Favorites;
