import AccountAPI from "../api/AccountAPI"
import firebase from '@/plugins/firebase'
import Cookies from 'js-cookie';

export default function({ route, redirect, store }) {
  //const user = AccountAPI.getUser();
  //console.log(store.state);
  /*
  if (!user && !(route.name === 'login' || route.name === 'createAccount')) {
    redirect('/login')
  }
  if (user && !store.state.isLogin) {
    // あり得ないのでエラー処理
  }
  if (user && (route.name === 'login' || route.name === 'createAccount')) {
    redirect("/")
  }*/
  /*console.log('firebasecurrent = ' +  AccountAPI.getUser());
  firebase.auth().onAuthStateChanged((user) => {
    console.log('firebaseuser = ' + user);
    if (user) {
      console.log('route.name = ' + route.name);
      console.log('route.path = ' + route.path);
      if (route.name === 'login' || route.name === 'createAccount') {
        redirect('/');
      } else {
        //redirect(route.path);
      }
    } else {
      console.log('route.name = ' + route.name);
      if (route.name !== 'login' && route.name !== 'createAccount') {
        redirect('/login');
      } else {
        //redirect(route.path);
      }
    }
  });  */
    // ユーザが認証されていない場合
    console.log("store.state.auth=" + store.state.auth);
    console.log("Cookie.auth=" + Cookies.get('auth'));
    console.log("route.name=" + route.name);
    //let auth = store.state.auth;
    const auth = Cookies.get('auth');
    if (!auth && route.name !== 'logout') {
       redirect('/login')
    }
}
