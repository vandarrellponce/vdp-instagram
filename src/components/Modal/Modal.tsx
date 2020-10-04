import {
	Button,
	createStyles,
	Input,
	makeStyles,
	Modal,
	Theme,
} from '@material-ui/core'
import React, { useState } from 'react'
import './Modal.css'

const modalStyle = {
	top: '50%',
	left: '50%',
	transform: `translate(-50%, -50%)`,
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			position: 'absolute',
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
)

interface Props {
	open: boolean
	onClose: () => void
	signUp: (username: string, email: string, password: string) => void
}

const MyModal: React.FC<Props> = (props) => {
	const classes = useStyles()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// METHODS
	const handleEmail = (e) => {
		e.preventDefault()
		setEmail(e.target.value)
	}
	const handlePassword = (e) => {
		e.preventDefault()
		setPassword(e.target.value)
	}
	const handleUsername = (e) => {
		e.preventDefault()
		setUsername(e.target.value)
	}
	return (
		<Modal open={props.open} onClose={props.onClose}>
			<div style={modalStyle} className={classes.paper}>
				<div className="modal__header">
					<img
						className="modal__headerImage"
						src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
						alt="logo"
					/>
				</div>

				<form className="modal__signup">
					<Input
						type="text"
						placeholder="username"
						value={username}
						onChange={handleUsername}
						autoComplete="true"
					/>
					<Input
						type="text"
						placeholder="email"
						value={email}
						onChange={handleEmail}
						autoComplete="true"
					/>

					<Input
						type="password"
						placeholder="password"
						value={password}
						onChange={handlePassword}
						autoComplete="true"
					/>
					<Button
						onClick={() => props.signUp(username, email, password)}
					>
						Sign Up
					</Button>
				</form>
			</div>
		</Modal>
	)
}

export default MyModal
