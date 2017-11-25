import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyAwg7pjsLVrgON6_9Pq3stwCM86xDAlZIQ';
const DEFAULT_SEARCH = 'surfboards'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { videos: [] };

        YTSearch({key: API_KEY, term: DEFAULT_SEARCH}, (videos) => {
            this.setState({ videos }); //es6 ftw
        });
    }

    render() {
        return (
            <div>
                <SearchBar />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));