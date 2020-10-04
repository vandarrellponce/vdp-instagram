import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

interface Props {
	userName: string
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
					alt={props.userName}
					src="/static/images/avatar/1.jpg"
				/>
				<h3>{props.userName}</h3>
			</div>

			{/* image */}
			<img className="post__image" src={props.imageURL} alt="post" />

			{/* username + caption */}
			<h4 className="post__text">
				<strong>{props.userName}</strong>
				&nbsp;&nbsp;&nbsp;
				{props.caption}
			</h4>
		</div>
	)
}

export default Post
