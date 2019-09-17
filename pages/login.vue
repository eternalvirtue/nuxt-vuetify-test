<template>
    <section class="container">
        <div>
            <h1 class="title">ログイン画面</h1>
            <section class="ex__box" v-if="!isLogin">
                <p><input type="text" v-model="email" placeholder="メールアドレス"></p>
                <p><input type="password" v-model="password" placeholder="パスワード"></p>
                <p class="errMessage" v-if="authError">{{authError}}</p>
                <div class="links">
                    <a @click="login()" class="button--green">ログイン</a>
                </div>
                <nuxt-link to="/createAccount">create account</nuxt-link>
            </section>

        </div>
    </section>
</template>

<script>
//
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  layout: 'account',
  data: function(){
    return {
        email: '',
        password: '',
    }
  },
  computed: {
      isLogin(){
          return this.$store.state.isLogin;
      },
      authError(){
          return this.$store.state.authError;
      }
  },
  methods: {
      login: function () {
      this.$store.dispatch('Account/login', {email:this.email, password:this.password});
      /*firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {
          alert('Success!');
          this.$router.push('/');
        },
        err => {
          alert(err.message);
        }
      )
      }*/
        setTimeout(() => { // 非同期リクエストのタイムアウトをシミュレートします
          const auth = {
            accessToken: 'someStringGotFromApiServiceWithAjax'
          }
          this.$store.dispatch('Account/setAuth', auth); // クライアントレンダリング用に変更する
          Cookie.set('auth', auth); // サーバサイドレンダリングのためにクッキーにトークンを保存する
          this.$router.push('/');
        }, 1000);
      }
  }
}
</script>
