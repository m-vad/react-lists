import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Posts from 'pages/Posts';
import About from 'pages/About';
import Error from 'pages/Error';
import PostIdPage from 'pages/PostIdPage';

const AppRouter = () => {
	return (
		<Switch>
			<Route exact path='/posts'>
				<Posts />
			</Route>
			<Route exact path='/posts/:id'>
				<PostIdPage/>
			</Route>
			<Route path='/about'>
				<About />
			</Route>
			<Route path='/error'>
				<Error />
			</Route>
			<Redirect to='/error' />
		</Switch>
	);
};

export default AppRouter;
