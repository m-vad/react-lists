import React from 'react';
import classes from './MyModal.module.css';

const MyModal = ({ children, visable, setVisable }) => {
	const rootClasses = [classes.myModal];

	if (visable) {
		rootClasses.push(classes.active);
	}

	return (
		<div className={rootClasses.join(' ')} onClick={() => setVisable(false)}>
			<div
				className={classes.myModalContent}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default MyModal;
