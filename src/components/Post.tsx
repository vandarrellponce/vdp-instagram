import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

const Post = () => {
	return (
		<div>
			{/* Header = avatar + user */}
			<div className="post__header">
				<Avatar
					className="post__avatar"
					alt="V"
					src="/static/images/avatar/1.jpg"
				/>
				<h3>Username</h3>
			</div>

			{/* image */}
			<img
				className="post__image"
				src="https://mirrorlesscomparison.com/wp-content/uploads/2018/11/Fuji-X-T3-sample-2.jpg"
				alt="post"
			/>

			{/* username + caption */}
			<h4 className="post__text">
				<strong>username</strong> - caption
			</h4>
		</div>
	)
}

export default Post
