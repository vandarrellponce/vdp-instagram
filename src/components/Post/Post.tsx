import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

interface Props {
	username: string
	imageURL: string
	caption: string
}

const Post: React.FC<Props> = (props) => {
	return (
		<div className="post">
			{/* Header = avatar + user */}
			<div className="post__header">
				<Avatar
					className="post__avatar"
					alt={props.username}
					src="/static/images/avatar/1.jpg"
				/>
				<h3>{props.username}</h3>
			</div>

			{/* image */}
			<img className="post__image" src={props.imageURL} alt="post" />

			{/* username + caption */}
			<h4 className="post__text">
				<strong>{props.username}</strong>
				&nbsp;&nbsp;&nbsp;
				{props.caption}
			</h4>
		</div>
	)
}

export default Post
