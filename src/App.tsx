import { Button } from '@material-ui/core'

import React, { useEffect, useState } from 'react'

import './App.css'
import MyModal from './components/Modal/Modal'
import Post from './components/Post/Post'
import { auth, db } from './database/firebase'

interface Post {
	id: string
	username: string
	imageURL: string
	caption: string
}

const App = () => {
	// STATES
	const [posts, setPosts] = useState<Post[]>([])
	const [open, setOpen] = useState(false)
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// METHODS
	const signUp = (username: string, email: string, password: string) => {
		setUsername(username)
		setEmail(email)
		setPassword(password)

		auth.createUserWithEmailAndPassword(email, password).catch((e) =>
			alert(e.message)
		)
		setOpen(false)
	}

	// USE EFFECTS
	useEffect(() => {
		db.collection('posts')
			.orderBy('caption', 'desc')
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							username: doc.data().username,
							imageURL: doc.data().imageURL,
							caption: doc.data().caption,
						}
					})
				)
			})
	}, [])

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// user has ogged in...
				console.log(authUser)
				setUser(authUser)

				if (!authUser.displayName) {
					return authUser.updateProfile({
						displayName: username,
					})
				}
			} else {
				// user has logged out...
				setUser(null)
			}
		})

		// perform some cleanup actions
		return () => {
			unsubscribe()
		}
	}, [user, username])

	// RETURNED COMPONENT
	return (
		<div className="app">
			{/* MODAL */}
			<MyModal
				open={open}
				onClose={() => setOpen(false)}
				signUp={signUp}
			/>

			{/* HEADER */}
			<div className="app__header">
				<img
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt="logo"
				/>
			</div>
			<Button onClick={() => setOpen(true)}>Sign Up</Button>
			{/* BODY (POSTS) */}
			{posts.map((post) => (
				<Post
					key={post.id}
					userName={post.username}
					imageURL={post.imageURL}
					caption={post.caption}
				/>
			))}
		</div>
	)
}

export default App
