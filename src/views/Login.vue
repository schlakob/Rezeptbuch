<template>
  <div class="about">
    <h1>Login</h1>

    
    <form novalidate class="md-layout" @submit.prevent="login">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100" >
                <md-field>
                    <md-icon>mail</md-icon> 
                    <label for="email">Email</label>
                    <md-input name="email" id="email" type="email" v-model="credits.email"/>
                </md-field>
            </div>
            <div class="md-layout-item md-size-100" >
                <md-field>
                    <md-icon>vpn_key</md-icon> 
                    <label for="password">Passwort</label>
                    <md-input name="password" id="password" type="password" v-model="credits.password"/>
                </md-field>
            </div>
            <div class="md-layout-item md-size-100">
                <md-button class="md-raised md-primary" type="submit"><md-icon>login</md-icon> Einloggen</md-button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import {auth} from './../firebase/auth'
export default {
  name: 'Home',
  data() {
    return {
        credits: {
            email: "",
            password: ""
        }
    };
  },
  methods: {
      async login(){
        await auth.signInWithEmailAndPassword(this.credits.email, this.credits.password)
        .then(user => { }, 
        err => {
            alert(err.message)
        })
        console.log('Eingeloggt als ' + this.credits.email)
        this.$router.push({name: "Home"})
      }
  }
}
</script>
