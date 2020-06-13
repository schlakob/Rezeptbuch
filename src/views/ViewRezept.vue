<template>
  <div>
    <img :src="rezept.imgUrl" :alt="rezept.titel" style="margin-bottom: 10px">
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
                    <md-list-item v-for="(zutat, index) in rezept.zutaten" :key="index"><p>{{zutat.menge}} {{zutat.einheit}} <b style="text-align:left">{{zutat.name}}</b></p></md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item  md-size-100" style="text-align:left; margin-top: 20px">
        <p class="md-subheading">Beschreibung:</p>
        <p>{{rezept.beschreibung}}</p>
      </div>
      <div class="md-layout-item md-size-100">
        <md-chip v-for="(rezeptTyp, index) in rezept.rezeptTyp" :key="index">{{rezeptTyp}}</md-chip>
      </div>
    </div>
    <md-button class="md-fab md-primary md-plain" @click="edit()">
        <md-icon>edit</md-icon>
    </md-button>
  </div>
</template>

<script>
import {db} from './../firebase/db'
  export default {
    data() {
      return {
        rezept: {}
      };
    },
    methods: {
      edit() {
        this.$router.push({name: 'Edit', params: {id: this.rezept.id}})
      },
      async update() {
        var someDiff = false
        if (!Object.keys(this.rezept).includes("rezeptTyp")) {
          console.log(Object.keys(this.rezept).includes("rezeptTyp") + " " + "rezeptTyp")
          this.$set(this.rezept, "rezeptTyp", [])
          someDiff = true
        }
        await db.collection('rezepte').doc(this.rezept.id).set(this.rezept)
      }
    },
    async created() {
        var snapshot = await db.collection('rezepte').doc(this.$route.params.id).get()
        this.rezept = snapshot.data()
        this.update()
    }
  };
</script>
