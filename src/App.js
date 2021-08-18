import React, { useState } from 'react';
import './styles/App.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'Posts', body: 'Description' },
		{ id: 2, title: 'Posts 2', body: 'Description' },
		{ id: 3, title: 'Posts 3', body: 'Description' },
	]);

	return (
		<div className='App'>
			<form>
				<MyInput type='text' placeholder='Name' />
				<MyInput type='text' placeholder='Description' />
				<MyButton>Create post</MyButton>
			</form>
			<PostList posts={posts} title='List' />
		</div>
	);
}

export default App;
