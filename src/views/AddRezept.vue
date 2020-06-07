<template>
  <div>
      <h2>Neues Rezept</h2>
      <p class="md-caption">Hier kannst du ein neues Rezept anlegen!</p>
       <form novalidate class="md-layout">
           <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <img :src="imgPreview" style="height: 150px">
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Bild</label>
                    <md-file accept="image/*" v-on:md-change="pickedImg" />
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field>
                      <label for="titel">Titel</label>
                      <md-input name="titel" id="titel" v-model="form.titel"/>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Dauer in Minuten</label>
                    <md-input v-model="form.dauer"></md-input>
                    <span class="md-suffix"> min</span>
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
                                <div v-for="(einheit, index) in $store.state.einheiten" :key="index" style="margin-left: 2%">
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
                    <md-button class="md-accent" @click="back()">
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
import firebase from 'firebase'
export default {
  name: 'Home',
  data() {
    return {
      imgPreview: "",
      imgFile: "",
      form: {
        id: "",
        imgUrl: "",
        titel: "",
        beschreibung: "",
        dauer: "",
        zutaten: [
          {name: "Mais", menge:"100", einheit:"g"},
          {name: "Nudeln", menge:"200", einheit:"kg"}
        ]
      }
    };
  },
  created() {
      this.form.id = (Date.now() + Math.random()).toString().split('.').join("")
  },
  methods: {
    pickedImg(e) {
        this.imgFile = e[0]
        let filename = this.imgFile.name
        if (!filename.lastIndexOf('.' <= 0)) {
            alert('Bitte eine richtige Datei auswählen')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
            this.imgPreview = fileReader.result
        })
        fileReader.readAsDataURL(this.imgFile)
    },
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
      if (this.imgFile) {
        firebase.storage().ref('rezeptBilder/' + this.form.id).put(this.imgFile)
        this.form.imgUrl = "https://firebasestorage.googleapis.com/v0/b/rezeptbuch-18dac.appspot.com/o/rezeptBilder%2F" + this.form.id + "?alt=media&token=64ccc77f-823e-4c1b-a365-a07d844b4755"
      }else{
         this.form.imgUrl = "https://firebasestorage.googleapis.com/v0/b/rezeptbuch-18dac.appspot.com/o/rezeptBilder%2F1.jpg?alt=media&token=2798ea95-df1c-4872-abf9-750b6f0af228"
      }
      db.collection('rezepte').doc(this.form.id).set(this.form)
      this.$router.push({name: 'Home'})
    }
  }
}
</script>