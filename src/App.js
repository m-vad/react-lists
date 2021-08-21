import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'Posts', body: 'Description' },
		{ id: 2, title: 'Posts 2', body: 'Description' },
		{ id: 3, title: 'Posts 3', body: 'Description' },
	]);

	const [filter, setFilter] = useState({ sort: '', query: '' });

	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) =>
				a[filter.sort].localeCompare(b[filter.sort])
			);
		}
		return posts;
	}, [filter.sort, posts]);

	const sortedAndSeachedPosts = useMemo(() => {
		return sortedPosts.filter((post) =>
			post.title.toLowerCase().includes(filter.query.toLocaleLowerCase())
		);
	}, [filter.query, sortedPosts]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	return (
		<div className='App'>
			<PostForm create={createPost} />
			<hr style={{ margin: '1rem 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			<PostList
				remove={removePost}
				posts={sortedAndSeachedPosts}
				title='List'
			/>
		</div>
	);
}

export default App;
