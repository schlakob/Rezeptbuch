<template>
  <div>
    <img src="https://worldfoodtrip.de/wp-content/uploads/2020/03/Mexican-Food-Trip-klein--1140x620.jpg" :alt="rezept.titel" style="margin-bottom: 10px">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <p class="md-title">{{rezept.titel}}</p>
      </div>
      <div class="md-layout-item md-size-100">
        <p class="md-caption"> <md-icon>watch_later</md-icon><b> {{rezept.dauer}} Minuten</b></p>
      </div>
      <div class="md-layout-item md-size-100">
        <md-card>
            <md-card-header style="padding-bottom: 0px">
                <div class="md-caption"><b>Zutaten:</b></div>
            </md-card-header>
            <md-card-content>
                <md-list>
                    <md-list-item to="/components/list/router/1" v-for="(zutat, index) in rezept.zutaten" :key="index"><p>{{zutat.menge}} {{zutat.einheit}} <b style="text-align:left">{{zutat.name}}</b></p></md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item  md-size-100" style="text-align:left; margin-top: 20px">
        <p class="md-subheading">Beschreibung:</p>
        <p>{{rezept.beschreibung}}</p>
      </div>
    </div>
    <md-button class="md-fab md-primary md-plain" @click="edit()">
        <md-icon>edit</md-icon>
    </md-button>
  </div>
</template>

<script>
  import db from './../firebaseInit'
  export default {
    data() {
      return {
        rezept: {}
      };
    },
    methods: {
      edit() {
        this.$router.push({name: 'Edit', params: {id: this.rezept.id}})
      }
    },
    async created() {
        var snapshot = await db.collection('rezepte').doc(this.$route.params.id).get()
        this.rezept = snapshot.data()
    }
  };
</script>
