import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCYN1F6JB2bri_t2x6Kg8-LL9yPisZEb8M',
	authDomain: 'insta-react-bd31e.firebaseapp.com',
	databaseURL: 'https://insta-react-bd31e.firebaseio.com',
	projectId: 'insta-react-bd31e',
	storageBucket: 'insta-react-bd31e.appspot.com',
	messagingSenderId: '514159020851',
	appId: '1:514159020851:web:cb3fc79522e99a8072cc46',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
