import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyCW-f9Pi1iuV4Jhfj1v_rr8szvZgvpRTdE';

// Create a new componenct. Tis component should produce
// some HTML
class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('skis2018');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, (videos) => {
			this.setState ({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
		
		return (
		<div>
			<SearchBar onSearchTermChanged={videoSearch}/>
			<VideoDetail video={this.state.selectedVideo}/>
			<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
			
		</div>
		);
	}
}

// Insert these components in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
