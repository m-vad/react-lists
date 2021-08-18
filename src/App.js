import React, { useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'Posts', body: 'Description' },
		{ id: 2, title: 'Posts 2', body: 'Description' },
		{ id: 3, title: 'Posts 3', body: 'Description' },
	]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	};

	return (
		<div className='App'>
			<PostForm create={createPost} />
			<PostList posts={posts} title='List' />
		</div>
	);
}

export default App;
