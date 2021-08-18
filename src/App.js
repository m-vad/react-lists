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

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const addNewPost = (e) => {
		e.preventDefault();
		const newPost = {
			id: Date.now(),
			title,
			body,
		};
		setPosts([...posts, newPost]);
		setTitle('');
		setBody('');
	};

	return (
		<div className='App'>
			<form>
				<MyInput
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type='text'
					placeholder='Name'
				/>
				<MyInput
					value={body}
					onChange={(e) => setBody(e.target.value)}
					type='text'
					placeholder='Description'
				/>
				<MyButton onClick={addNewPost}>Create post</MyButton>
			</form>
			<PostList posts={posts} title='List' />
		</div>
	);
}

export default App;
