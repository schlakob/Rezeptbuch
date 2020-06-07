<template>
  <div class="wrapper">
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="description text-center">
            <p>
              Hier kannst du dir eine Rezept erstellen!
            </p>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <md-field>
                <label>Titel</label>
                <md-input v-model="form.titel"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
                <p>Zutaten:</p>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-gutter" v-for="(zutat, index) in form.zutaten" :key="index">
              <md-field class="md-layout-item md-size-20 mx-auto">
                <div >
                  <label>Menge</label>
                  <md-input type="number" v-model="zutat.menge"></md-input>
                </div>
              </md-field>
              <md-field class="md-layout-item md-size-20 mx-auto">
                  <label for="einheit">Einheit</label>
                  <md-select v-model="zutat.einheit" name="einheit">
                    <div v-for="(einheit, index) in einheiten" :key="index" style="margin-left: 2%">
                      <md-option :value="einheit">{{einheit}}</md-option>
                    </div>
                  </md-select>
              </md-field>
              <md-field class="md-layout-item md-size-30 mx-auto">
                <div >
                  <label>Name</label>
                  <md-input v-model="zutat.name"></md-input>
                </div>
              </md-field>
              <md-button class="md-button md-danger md-just-icon" @click="removeZutat(index)">
                <i class="md-icon">remove</i>
              </md-button>
            </div>
            <md-button class="md-primary md-simple md-layout-item md-size-90 mx-auto" @click="addZutat()">
              <md-icon>add</md-icon>
            </md-button>

            <div class="md-layout-item md-size-100">
              <md-field>
                <label>Vorgehen</label>
                <md-textarea md-autogrow v-model="form.vorgehen"></md-textarea>
              </md-field>
            </div>

            <md-button class="md-danger md-simple md-layout-item md-size-40 mx-auto">
              <md-icon>arrow_back</md-icon>
            </md-button>

            <md-button class="md-primary md-layout-item md-size-40 mx-auto" @click="save()">
              <md-icon>save</md-icon>
              Speichern
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import db from './../firebaseInit'
// import { Modal } from "@/components";
export default {
  bodyClass: "profile-page",
  data() {
    return {
      form: {
        titel: "",
        vorgehen: "",
        zutaten: [
          {name: "Mais", menge:"100", einheit:"g"},
          {name: "Nudeln", menge:"200", einheit:"kg"}
        ]
      },
      einheiten: [
        "g", "kg", "l", "ml", "Stück", "Bündel"
      ]
    };
  },
  methods: {
    removeZutat(index){
      this.form.zutaten.splice(index, 1);
    },
    addZutat(){
      this.form.zutaten.push({name: "", menge:"", einheit:""})
    },
    back(){
      this.$router.back();
    },
    classicModalHide() {
      this.classicModal = false;
    }//,
    // save(){
    //   db.collection('rezepte').add(this.form)
    //   this.$router.back();
    // }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding-top: 0;
}
</style>
