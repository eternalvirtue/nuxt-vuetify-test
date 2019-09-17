import firebase from '@/plugins/firebase'

export default class AccountAPI {

    /**
     * メールアドレスとパスワードで新規ユーザー登録を実施します。
     * @param {string} email 
     * @param {string} password 
     */
    static regist(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    /**
     * メールアドレスとパスワードでログインを実施します。
     * @param {string} email 
     * @param {string} password 
     */
    static login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    /**
     * ログアウトします。
     */
    static logout(){
        return firebase.auth().signOut();
    }

    /**
     * ユーザー情報を取得します。
     */
    static getUser(){
        return firebase.auth().currentUser;
    }

    /**
     * ユーザー情報を取得します。
     */
    static authStateCheck(){
        return firebase.auth().onAuthStateChanged();
    }
}