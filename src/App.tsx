import { Button } from '@material-ui/core'

import React, { useEffect, useState } from 'react'

import './App.css'
import SignUpModal from './components/SignUpModal/SignUpModal'
import Post from './components/Post/Post'
import { auth, db } from './database/firebase'
import SignInModal from './components/SignInModal/SingInModal'
import ImageUpload from './components/ImageUpload/ImageUpload'

interface Post {
	id: string
	username: string
	imageURL: string
	caption: string
}

const App = () => {
	// STATES
	const [posts, setPosts] = useState<Post[]>([])
	const [openSignUp, setOpenSignUp] = useState(false)
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [openSignIn, setOpenSignIn] = useState(false)

	// METHODS
	const signUp = (email: string, password: string, username: string) => {
		setUsername(username)

		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				setOpenSignUp(false)
				return authUser.user.updateProfile({ displayName: username })
			})
			.catch((e) => alert(e.message))
	}

	const signIn = (email: string, password: string) => {
		auth.signInWithEmailAndPassword(email, password)
			.then((authUser) => {
				setOpenSignIn(false)
			})
			.catch((e) => alert(e.message))
	}

	const logOut = () => {
		auth.signOut()
			.then(() => alert('User succesfully logged out'))
			.catch((e) => alert(e.message))
	}

	// USE EFFECTS
	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
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
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				// user has ogged in...
				console.log(user)
				setUser(user)
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
			<SignUpModal
				open={openSignUp}
				onClose={() => setOpenSignUp(false)}
				submitForm={signUp}
			/>

			<SignInModal
				open={openSignIn}
				onClose={() => setOpenSignIn(false)}
				submitForm={signIn}
			/>

			{/* HEADER */}
			<div className="app__header">
				<img
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt="logo"
				/>
				{/* SIGN IN AND UP BUTTON */}
				{!user ? (
					<div className="app__loginContainer">
						<Button onClick={() => setOpenSignIn(true)}>
							Sign In
						</Button>
						<Button onClick={() => setOpenSignUp(true)}>
							Sign Up
						</Button>
					</div>
				) : (
					<Button onClick={logOut}>Log Out</Button>
				)}
			</div>

			{/* BODY (POSTS) */}
			<div className="app__posts">
				{posts.map((post) => (
					<Post
						key={post.id}
						username={post.username}
						imageURL={post.imageURL}
						caption={post.caption}
					/>
				))}
			</div>

			{/* IMAGE UPLOAD */}
			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>Login to upload</h3>
			)}
		</div>
	)
}

export default App
