import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { auth, db } from '../../database/firebase'
import { Input } from '@material-ui/core'
import firebase from 'firebase/app'

interface Props {
	username: string
	imageURL: string
	caption: string
	postId: string
}

const Post: React.FC<Props> = (props) => {
	const [comments, setComments] = useState([])
	const [comment, setComment] = useState('')

	const handleCommentSubmit = (e) => {
		e.preventDefault()
		if (!auth.currentUser) return alert('Please log in to continue')

		db.collection('posts').doc(props.postId).collection('comments').add({
			text: comment,
			username: auth.currentUser.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		setComment('')
	}

	useEffect(() => {
		const unsubscribe = db
			.collection('posts')
			.doc(props.postId)
			.collection('comments')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setComments(snapshot.docs.map((doc) => doc.data()))
			})

		return () => {
			unsubscribe()
		}
	}, [props.postId])
	return (
		<div className="post">
			{/* HEADER = avatar + user */}
			<div className="post__header">
				<Avatar
					className="post__avatar"
					alt={props.username}
					src="/static/images/avatar/1.jpg"
				/>
				<h3>{props.username}</h3>
			</div>

			{/* IMAGE */}
			<img className="post__image" src={props.imageURL} alt="post" />

			{/* USERNAME + CAPTION */}
			<h4 className="post__text">
				<strong>{props.username}</strong>
				&nbsp;&nbsp;&nbsp;
				{props.caption}
			</h4>

			{/* COMMENTS */}
			<div className="post__comments">
				{comments.map((item, i) => {
					return (
						<div key={i}>
							<strong>{item.username}</strong> - {item.text}
						</div>
					)
				})}
			</div>

			{/* CREATE COMMENT SECTION */}
			<form onSubmit={handleCommentSubmit} className="post__commentBox">
				<input
					className="post__input"
					type="text"
					value={comment}
					placeholder="Add a comment..."
					onChange={(e) => setComment(e.target.value)}
				/>
				<input
					className="post__button"
					type="submit"
					onClick={handleCommentSubmit}
					disabled={!comment}
					value="Post"
				/>
			</form>
		</div>
	)
}

export default Post
