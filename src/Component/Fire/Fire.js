import firebase from 'firebase';

var config = {
			    apiKey: "AIzaSyBuQuQk0OlGgvX7X_x7iRP4iTevDCkouxo",
			    authDomain: "doc-builder-app.firebaseapp.com",
			    databaseURL: "https://doc-builder-app.firebaseio.com",
			    projectId: "doc-builder-app",
			    storageBucket: "",
			    messagingSenderId: "41538973331"
  			 };


  			 

const fire = firebase.initializeApp(config);

export default fire;
