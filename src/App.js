import React, { useEffect, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from 'components/UI/button/MyButton';
import { usePosts } from 'hooks/usePosts';
import axios from 'axios';

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const sortedAndSeachedPosts = usePosts(posts, filter.sort, filter.query);

	useEffect(() => {
		fetchPosts();
	}, []);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	async function fetchPosts() {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/posts'
		);
		setPosts(response.data);
	}

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	return (
		<div className='App'>
			<MyButton style={{ marginTop: '1rem' }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visable={modal} setVisable={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '1rem 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			<PostList
				remove={removePost}
				posts={sortedAndSeachedPosts}
				title='Список'
			/>
		</div>
	);
}

export default App;
