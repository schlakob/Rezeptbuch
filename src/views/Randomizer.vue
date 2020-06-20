<template>
  <div class="about">
    <h1>Randomizer</h1>
    <p class="md-caption">Würfle ein zufälliges Rezept</p>
    
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100 md-layout md-gutter" >
        <div class="md-layout-item md-size-79">
            <md-field>
              <label for="rezeptTyp">Rezeptart:</label>
              <md-select v-model="filterdata" name="rezeptTyp" multiple>
                  <div v-for="(rezeptTyp, index) in $store.state.rezeptTypen" :key="index" style="margin-left: 2%">
                      <md-option :value="rezeptTyp" selected>{{rezeptTyp}}</md-option>
                  </div>
              </md-select>
            </md-field>
        </div>
        <md-button class="md-layout-item md-size-20 md-primary md-raised" @click="toggleAll()">
          All
        </md-button>
      </div>
      <div class="md-layout-item md-size-100">
        <md-button class="md-fab md-primary" @click="randomRezept">
          <md-icon style="transform: rotate(25deg);">casino</md-icon>
        </md-button>
      </div>
      
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33" style="margin-bottom: 10px; margin-top: 10px" @click="cardSelect(displayRezept.id)">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-media>
              <div class="aspect-ratio-box">
                <img :src="displayRezept.imgUrl" :alt="displayRezept.titel" class="content">
              </div>
            </md-card-media>
            <md-card-header style="margin:0">
              <div class="md-title" >{{displayRezept.titel}}</div>
              <div class="md-subhead"><md-icon>watch_later</md-icon>{{displayRezept.dauer || 0}} min</div>
            </md-card-header>
            <md-card-content>
              <md-chip v-for="(rezeptTyp, index) in displayRezept.rezeptTyp" :key="index">{{rezeptTyp}}</md-chip>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from './../firebase/db'
import {auth} from './../firebase/auth'
export default {
  name: 'Randomizer',
  data() {
    return {
      filterdata: this.$store.state.rezeptTypen,
      rezepte: [],
      displayRezept: {}
    };
  },
  methods: {
      toggleAll() {
        if(this.filterdata == this.$store.state.rezeptTypen){
          this.filterdata = []
        }else{
          this.filterdata = this.$store.state.rezeptTypen
        }
      },
      randomRezept() {
        this.displayRezept = this.rezepte[Math.floor(Math.random() * this.rezepte.length)]
      }
  },
  async created() {        
        const snapshot = await db.collection('rezepte').where("ersteller", "==", auth.currentUser.email).get()
        await snapshot.docs.forEach(element => {
          this.rezepte.push(element.data())
        });
        this.randomRezept()
  },
  computed: {
    filteredList() {
      return this.rezepte.filter(rezept => {
        var showbyType = false;
        this.filterdata.forEach(element => {
          if(rezept.rezeptTyp.includes(element)){
            showbyType = true
          }
        })
        return showbyType
      })
    }
  }
}
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