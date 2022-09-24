import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { Loading } from './Loading';
import MusicCard from './MusicCard';
import '../style/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      songs: [],
    };
  }

  async componentDidMount() {
    const context = this;
    const songs = await getMusics(context.props.match.params.id);
    this.setState({
      songs,
      loading: false,
    });
  }

  render() {
    const { loading, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading
          ? <Loading />
          : (
            <div className="container-div">
              <h3 data-testid="artist-name">{songs[0].artistName}</h3>
              <h2 data-testid="album-name">{songs[0].collectionName}</h2>
              {songs.map((song, index) => (
                index > 0
                && (<MusicCard
                  key={ song.trackId }
                  track={ song }
                />)
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Album;
