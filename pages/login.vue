<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  :counter="32"
                  label="email"
                  prepend-icon="email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :type="show_password ? 'text' : 'password'"
                  :counter="32"
                  label="password"
                  prepend-icon="lock"
                  @click:append="show_password = !show_password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                v-on:click="gotoSignup"
              >SIGNUP</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-on:click="doLogin"
              >LOGIN</v-btn>
            </v-card-actions>
            <hr>
            <v-spacer></v-spacer>
            <v-btn
              flat
              v-on:click="gotoResetPassword"
            >パスワードを忘れたかたはこちら</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'account',
  data() {
    return {
      email: '',
      password: '',
      show_password: false,
    }
  },
  methods: {
    doLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("/")
        }).catch((error) => {
          alert(error)
        })
    },
    gotoSignup() {
      this.$router.push("/createAccount")
    },
    gotoResetPassword() {
      this.$router.push("/reset-password")
    }
  }
}
</script>