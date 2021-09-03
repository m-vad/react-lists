import React, { useEffect, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from 'components/UI/button/MyButton';
import { usePosts } from 'hooks/usePosts';
import PostService from 'API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from 'utils/pages';

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSeachedPosts = usePosts(posts, filter.sort, filter.query);

	//TODO refact: using useMemo
	let pagesArray = getPagesArray(totalPages);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	});

	useEffect(() => {
		fetchPosts();
	}, []);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	//TODO refactoring pagination
	const changePage = (page) => {
		setPage(page);
		fetchPosts();
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
			{postError && <h2>Произошла ошибка ${postError}</h2>}
			{isPostsLoading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '5rem',
					}}
				>
					<Loader />
				</div>
			) : (
				<PostList
					remove={removePost}
					posts={sortedAndSeachedPosts}
					title='Список'
				/>
			)}
			<div className='page__wrapper'>
				{pagesArray.map((p) => (
					<span
						onClick={() => changePage(p)}
						key={p}
						className={page === p ? 'page page__current' : 'page'}
					>
						{p}
					</span>
				))}
			</div>
		</div>
	);
}

export default App;
