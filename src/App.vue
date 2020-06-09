<template>
  <div id="app">
    <div class="page-container">
      <md-app md-waterfall md-mode="overlap">
        <md-app-toolbar class="md-primary md-large">
          <div class="md-toolbar-row">
            <md-button class="md-icon-button" @click="$router.back()" v-if="!(this.$route.name == 'Home') || !(this.$route.name == 'Login')">
              <md-icon>arrow_back</md-icon>
            </md-button>
            <span class="md-title" style="color: white">Rezeptbuch</span>
          </div>
        </md-app-toolbar>

        <md-app-content>
          <router-view/>
        </md-app-content>
      </md-app>
    </div>
    <div class="phone-viewport">
      <md-bottom-bar md-sync-route md-mode="shift">
        <md-bottom-bar-item style="max-width: none" to="/" exact md-icon="home"></md-bottom-bar-item>
        <md-bottom-bar-item style="max-width: none" to="/add" md-icon="add"></md-bottom-bar-item>
        <md-bottom-bar-item style="max-width: none" to="/settings" md-icon="settings"></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .phone-viewport {
    // align-items: flex-end;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .page-container {
    margin-bottom: 60px;
  }
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
