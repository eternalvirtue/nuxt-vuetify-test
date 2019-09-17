// UserAPIのインポート
import AccountAPI from "../api/AccountAPI"
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
    isLogin : false,
    email : "",
    authError: "",
    userData: null,
    auth: null
})

export const mutations =  {
    // ユーザー情報を設定します。
    setEntity (state, user) {
        state.email = user.email;
    },
    // stateを初期化します。
    clear (state) {
        state.email = "";
        state.isLogin = false;
        state.authError = "";
    },
    // エラーメッセージを設定します。
    setAuthError (state, authError) {
        state.authError = authError;
    },
    // ログイン状態を設定します。
    setIsLogin (state, isLogin) {
        state.isLogin = isLogin;
    },
    setAuth(state, auth) {
        state.auth = auth;
      }
}

export const actions =  {
    // ユーザー情報を取得します。
    load: ({ commit }) => {
        var currentUser = AccountAPI.getUser();
        if(currentUser) {
            // ログイン済み
            commit('setIsLogin', true);
            commit('setEntity', currentUser);
        } else {
            // 未ログイン
            commit('setIsLogin', false);
            commit('clear');
        }
    },
    // 新規ユーザー登録を行います。
    regist: ({ commit, dispatch }, payload) => {
        return AccountAPI.regist(payload.email, payload.password)
            .then((res) =>{
                commit('setIsLogin', true);
                dispatch('setEntity', res.user);
            })
            .catch(function(error) {
                alert(error.message);
                commit('setIsLogin', false);
                commit('setAuthError', error.message);
                //commit('clear');
            });
    },
    // ログイン処理を行います。
    login: ({ commit, dispatch }, payload) => {
        return AccountAPI.login(payload.email, payload.password)
            .then((res) =>{
                commit('setIsLogin', true);
                dispatch('setEntity', res.user);
            })
            .catch(function(error) {
                alert(error.message);
                commit('setIsLogin', false);
                commit('setAuthError', error.message);
                //commit('clear');
            });
    },
    // ログアウト処理を行います。
    logout: ({ commit }) => {
        return AccountAPI.logout()
            .then((res) =>{
                commit('setIsLogin', false);
                commit('clear');
            })
            .catch(function(error) {
                alert(error.message);
                commit('setAuthError', error.message);
            });
    },
    // ログインユーザ情報(エンティティ)登録を行います。
    setEntity: ({ commit }, user) => {
        commit('setEntity', user);
    },
    nuxtServerInit: ({ commit }, { req }) => {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // 有効なクッキーが見つからない場合
          }
        }
        console.log("auth=" + auth);
        commit('setAuth', auth)
      },
      setAuth: ({commit}, auth) => {
        commit('setAuth', auth);
      }
}