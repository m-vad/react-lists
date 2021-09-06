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
import Pagination from './components/UI/pagination/Pagination';

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSeachedPosts = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page);
			setPosts(response.data);
			const totalCount = response.headers['x-total-count'];
			setTotalPages(getPageCount(totalCount, limit));
		}
	);

	useEffect(() => {
		fetchPosts(limit, page);
	}, [page]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page);
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
			<Pagination totalPages={totalPages} page={page} changePage={changePage} />
		</div>
	);
}

export default App;
