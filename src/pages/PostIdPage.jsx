import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from './../components/UI/Loader/Loader';

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id);
		setPost(response.data);
	});
	const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommentsByPostId(id);
		setComments(response.data);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);

	return (
		<div>
			<h2>Пост:</h2>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					{post.id}. {post.title}
				</div>
			)}
			<h3 style={{ marginTop: '1.1rem' }}>Комментарии:</h3>
			{isComLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map((comm) => (
						<div key={comm.id} style={{ marginTop: '1rem' }}>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PostIdPage;
