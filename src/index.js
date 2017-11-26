import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash'

import VideoList from './components/video_list'
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAwg7pjsLVrgON6_9Pq3stwCM86xDAlZIQ';
const DEFAULT_SEARCH = 'surfboards'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch(DEFAULT_SEARCH)
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 300);

        return (
            <div>
                <SearchBar onSearchTermChanged={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} 
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));