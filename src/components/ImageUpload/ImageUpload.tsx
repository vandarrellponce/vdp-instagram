import { Button, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { db, storage } from '../../database/firebase'
import './ImageUpload.css'
import firebase from 'firebase/app'

const ImageUpload: React.FC<{ username: string }> = (props) => {
	// STATE
	const [caption, setCaption] = useState('')
	const [image, setImage] = useState(null)
	const [progress, setProgress] = useState(0)

	// METHODS
	const handleUpload = () => {
		if (!image) return alert('Please select a photo')
		const uploadTask: any = storage.ref(`images/${image.name}`).put(image)

		uploadTask.on(
			'state_changed',
			// progress function (can be reused) ...
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				)
				setProgress(progress)
			},
			// error function ...
			(error) => {
				console.log(error)
				alert(error.message)
			},
			// upload complete function ...
			() => {
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						// post image inside db
						db.collection('posts').add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageURL: url,
							username: props.username,
						})
						setProgress(0)
						setCaption('')
						setImage(null)
					})
			}
		)
	}

	const handleFileChange = (e) => {
		if (e.target.files[0]) setImage(e.target.files[0])
	}
	return (
		<div className="imageUpload__container">
			<progress
				value={progress}
				max="100"
				className="imageUpload__progress"
			/>
			<form className="imageUpload__form1">
				<Input
					type="text"
					placeholder="Enter a caption"
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
				/>
				<div className="imageUpload__form2">
					<Input type="file" onChange={handleFileChange} />
					<Button onClick={handleUpload}>Upload</Button>
				</div>
			</form>
		</div>
	)
}

export default ImageUpload
