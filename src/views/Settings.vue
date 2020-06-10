<template>
  <div class="about">
    <h1>Einstellungen</h1>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <p>Eingeloggt als: {{email}}</p>
      </div>
      <div class="md-layout-item md-size-100">
        <md-button class="md-raised md-accent" @click="logout">Logout</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import {auth} from './../firebase/auth'
export default {
  name: 'Home',
  data() {
    return {
      email: auth.currentUser.email
    };
  },
  methods: {
      async logout(){
        await auth.signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        });
        this.$router.push("/login")
      }
  }
}
</script>
