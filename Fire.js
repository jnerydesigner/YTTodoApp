import firebase from 'firebase';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBbbihErNMacygPuP-vCtg2fsCUOPlmE5A",
    authDomain: "yttodoapp-23fb9.firebaseapp.com",
    databaseURL: "https://yttodoapp-23fb9.firebaseio.com",
    projectId: "yttodoapp-23fb9",
    storageBucket: "yttodoapp-23fb9.appspot.com",
    messagingSenderId: "331460645927",
    appId: "1:331460645927:web:81a7ddae402b07e756ea02"
};

class fire{
    constructor(callback){
        this.init(callback)
    }

    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null, user);
            }else{
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    });
            }
        });
    }

    getLists(callback){

        let ref = this.ref.orderBy("name");

        this.unsubscribe = ref.onSnapshot(snapshot =>{
            lists = [];

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data() });
            });

            callback(lists);
        })

        console.log(this.userId)
    }

    addList(list){
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list){
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }
    deleteList(list){
        let ref = this.ref;

        ref.doc(list.id).delete(list);
    }

    get ref(){
        return firebase .firestore()
                        .collection('users')
                        .doc(this.userId)
                        .collection('lists');
    }

    get userId(){
        return firebase.auth().currentUser.uid;
    }


    detach(){
        this.unsubscribe()
    }
}


export default fire;

