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

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	return (
		<div className='App'>
			<PostForm create={createPost} />
			{posts.length ? (
				<PostList remove={removePost} posts={posts} title='List' />
			) : (
				<h2 style={{ textAlign: 'center' }}>Posts not found!</h2>
			)}
		</div>
	);
}

export default App;
