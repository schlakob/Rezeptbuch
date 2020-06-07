<template>
  <div>
    <p class="md-title">Alle deine Rezepte:</p>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33" v-for="(rezept, index) in rezepte" :key="index" style="margin-bottom: 10px; margin-top: 10px" @click="cardSelect(rezept.id)">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-media>
              <img src="https://worldfoodtrip.de/wp-content/uploads/2020/03/Mexican-Food-Trip-klein--1140x620.jpg" :alt="rezept.titel">
            </md-card-media>

            <md-card-header style="margin:0">
              <div class="md-title" >{{rezept.titel}}</div>
              <div class="md-subhead"><md-icon>watch_later</md-icon>{{rezept.dauer || 0}} min</div>
            </md-card-header>
          </md-ripple>
        </md-card>
      </div>
      <div class="md-layout-item"></div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
  import db from './../firebaseInit'
  export default {
    data() {
      return {
        rezepte: []
      };
    },
    methods: {
      cardSelect(Rezeptid) {
        this.$router.push({name: 'View', params: {id: Rezeptid}})
      }
    },
    async created() {
        var snapshot = await db.collection('rezepte').get()
        snapshot.docs.forEach(element => {
          this.rezepte.push(element.data())
        });
    }
  };
</script>
