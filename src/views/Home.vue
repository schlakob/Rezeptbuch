<template>
  <div>
    <p class="md-title">Alle deine Rezepte:</p>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100" >
        <md-field>
            <label for="search">Suche</label>
            <md-input name="search" id="search" v-model="searchdata" @keydown="search()" @change="search()"/>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33" v-for="(rezept, index) in rezepte" :key="index" style="margin-bottom: 10px; margin-top: 10px" @click="cardSelect(rezept.id)">
        <md-card md-with-hover>
          <md-ripple>
            
              <md-card-media>
                <div class="aspect-ratio-box">
                  <img :src="rezept.imgUrl" :alt="rezept.titel" class="content">
                </div>
              </md-card-media>
            

            <md-card-header style="margin:0">
              <div class="md-title" >{{rezept.titel}}</div>
              <div class="md-subhead"><md-icon>watch_later</md-icon>{{rezept.dauer || 0}} min</div>
            </md-card-header>
          </md-ripple>
        </md-card>
        
      </div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
import {db} from './../firebase/db'
import {auth} from './../firebase/auth'
  export default {
    data() {
      return {
        searchdata: "",
        rezepte: [],
        rezepteRefference: []
      };
    },
    methods: {
      cardSelect(Rezeptid) {
        this.$router.push({name: 'View', params: {id: Rezeptid}})
      },
      search(){
        var newRezeptliste = []
        this.rezepteRefference.forEach(rezept => {
          if (rezept.titel.includes(this.searchdata) || !this.searchdata) {
            newRezeptliste.push(rezept)
          }
        })
        this.rezepte = newRezeptliste
      }
    },
    async created() {        
        const snapshot = await db.collection('rezepte').where("ersteller", "==", auth.currentUser.email).get()
        snapshot.docs.forEach(element => {
          this.rezepte.push(element.data())
        });
        this.rezepteRefference = this.rezepte
    }
  };
</script>

<style lang="scss" scoped>
.aspect-ratio-box {
    position: relative;
    overflow: hidden;
}
.aspect-ratio-box::after {
    display: block;
    content: '';
    padding-bottom: 56.25%;
}
.aspect-ratio-box img {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
