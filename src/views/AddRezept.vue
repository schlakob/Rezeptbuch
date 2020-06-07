<template>
  <div>
      <h2>Neues Rezept</h2>
      <p class="md-caption">Hier kannst du ein neues Rezept anlegen!</p>
       <form novalidate class="md-layout">
           <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                <md-field>
                    <label for="titel">Titel</label>
                    <md-input name="titel" id="titel" v-model="form.titel"/>
                </md-field>
                </div>
                <div class="md-layout-item md-size-100 md-body-2" style="text-align:left">
                    <p>Zutaten:</p> 
                </div>
                             
                <div class="md-layout-item md-layout md-gutter md-alignment-center-center" v-for="(zutat, index) in form.zutaten" :key="index">
                    <div class="md-layout-item md-size-20">
                        <md-field>
                            <label>Menge</label>
                            <md-input type="number" v-model="zutat.menge"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-field>
                            <label for="einheit">Einheit</label>
                            <md-select v-model="zutat.einheit" name="einheit">
                                <div v-for="(einheit, index) in einheiten" :key="index" style="margin-left: 2%">
                                    <md-option :value="einheit">{{einheit}}</md-option>
                                </div>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-35">
                        <md-field >
                            <label>Name</label>
                            <md-input v-model="zutat.name"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-20">
                        <md-button class="md-fab md-mini" style="background: #ff5252" @click="removeZutat(index)">
                            <md-icon style="color: white">remove</md-icon>
                        </md-button>
                    </div>       
                </div>
                <md-button class="md-primary md-simple md-layout-item md-size-100" @click="addZutat()">
                    <md-icon>add</md-icon>
                </md-button>

                <div class="md-layout-item md-small-size-100">
                    <md-field >
                        <label for="beschreibung">Beschreibung</label>
                        <md-textarea name="beschreibung" id="beschreibung" v-model="form.beschreibung"/>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-50">
                    <md-button class="md-accent" @click="save()">
                        Abbrechen
                    </md-button>
                </div>
                <div class="md-layout-item md-small-size-50">
                    <md-button class="md-primary md-raised" @click="save()">
                        <md-icon>save</md-icon>
                        Speichern
                    </md-button>
                </div>
            </div>
       </form>
  </div>
</template>

<script>
import db from './../firebaseInit'
export default {
  name: 'Home',
  data() {
    return {
      classicModal: false,
      form: {
        titel: "",
        beschreibung: "",
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
    },
    save(){
      db.collection('rezepte').add(this.form)
      this.$router.back();
    }
  }
}
</script>