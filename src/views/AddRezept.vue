<template>
  <div>
      <h2>Neues Rezept</h2>
      <p class="md-caption">Hier kannst du ein neues Rezept anlegen!</p>
       <form novalidate class="md-layout" @submit.prevent="validateRezept">
           <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <img :src="imgPreview" style="height: 150px">
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Bild</label>
                    <md-file accept="image/*" v-on:md-change="pickedImg" />
                  </md-field>
                </div>

                <div class="md-layout-item md-size-100" >
                  <md-field :class="getValidationClass('titel')">
                      <label for="titel">Titel</label>
                      <md-input name="titel" id="titel" v-model="form.titel"/>
                      <span class="md-error" v-if="!$v.form.titel.required">Der Titel ist Pflichtangabe</span>
                      <span class="md-error" v-else-if="!$v.form.titel.minlength">Titel ungültig</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field :class="getValidationClass('dauer')">
                    <label>Dauer in Minuten</label>
                    <md-input v-model="form.dauer" type="number"></md-input>
                    <span class="md-suffix"> min</span>
                    <span class="md-error" v-if="!$v.form.dauer.required">Die Dauer ist Pflichtangabe</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-100 md-body-2" style="text-align:left">
                    <p>Zutaten:</p> 
                </div>
                             
                <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center" v-for="(zutat, index) in form.zutaten" :key="index">
                    <div class="md-layout-item md-size-20">
                        <md-field>
                            <label>Menge</label>
                            <md-input type="number" v-model="zutat.menge"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-25">
                        <md-field >
                            <label for="einheit">Einheit</label>
                            <md-select v-model="zutat.einheit" name="einheit">
                                <div v-for="(einheit, index) in $store.state.einheiten" :key="index" style="margin-left: 2%">
                                    <md-option :value="einheit">{{einheit}}</md-option>
                                </div>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-35">
                        <md-field>
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

                <div class="md-layout-item md-size-100">
                    <md-field :class="getValidationClass('beschreibung')">
                        <label for="beschreibung">Beschreibung</label>
                        <md-textarea name="beschreibung" id="beschreibung" v-model="form.beschreibung"/>
                        <span class="md-error" v-if="!$v.form.beschreibung.maxLength">Die Beschreibung ist zu lange</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                    <md-field :class="getValidationClass('rezeptTyp')">
                      <label for="rezeptTyp">Rezeptart:</label>
                      <md-select v-model="form.rezeptTyp" name="rezeptTyp" multiple>
                          <div v-for="(rezeptTyp, index) in $store.state.rezeptTypen" :key="index" style="margin-left: 2%">
                              <md-option :value="rezeptTyp">{{rezeptTyp}}</md-option>
                          </div>
                          <span class="md-error" v-if="!$v.form.rezeptTyp.required">Bitte Rezeptart angeben</span>
                      </md-select>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                    <md-progress-spinner md-mode="indeterminate" v-if="spinner"></md-progress-spinner>
                </div>
               
                <div class="md-layout-item md-size-50">
                    <md-button class="md-accent" @click="back()">
                        Abbrechen
                    </md-button>
                </div>
                <div class="md-layout-item md-size-50">
                    <md-button class="md-primary md-raised" type="submit">
                        <md-icon>save</md-icon>
                        Speichern
                    </md-button>
                </div>
                
            </div>
       </form>
  </div>
</template>

<script>
import {db} from './../firebase/db'
import {auth} from './../firebase/auth'
import {storage} from './../firebase/storage'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'AddRezept',
  mixins: [validationMixin],
  data() {
    return {
      spinner: false,
      imgPreview: this.$store.state.ImgDefault,
      imgFile: "",
      form: {
        id: "",
        ersteller: "",
        imgUrl: "",
        titel: "",
        beschreibung: "",
        dauer: "",
        zutaten: [
          {}
        ],
        rezeptTyp: []
      }
    };
  },
  created() {
      this.form.id = (Date.now() + Math.random()).toString().split('.').join("")
      this.form.ersteller = auth.currentUser.email
  },
  methods: {
    pickedImg(e) {
        if (e[0]) {
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
        }else{
          this.imgPreview = this.$store.state.ImgDefault
        }
        
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
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    async save(){
      if (this.imgFile) {
        var uploadTask = await storage.ref('rezeptBilder/' + this.form.id).put(this.imgFile)
        var url
        await uploadTask.ref.getDownloadURL().then(function(downloadURL) {
          url =  downloadURL
        });
        
        var pos = url.lastIndexOf(this.form.id.toString()) + this.form.id.toString().length
        this.form.imgUrl = [url.slice(0, pos), this.$store.state.urlImgSize, url.slice(pos)].join('')
      }else{
         this.form.imgUrl = this.$store.state.ImgDefault
      }
      
      db.collection('rezepte').doc(this.form.id).set(this.form)

      this.spinner = true
      await this.sleep(4000)
      this.spinner = false
      this.$router.push({name: 'Home'})
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateRezept () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.save()
      }
    }
  },
    validations: {
      form: {
        titel: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20)
        },
        beschreibung: {
          maxLength: maxLength(1000)
        },
        dauer: {
          required
        },
        rezeptTyp: {
          required
        }
      }
    }
}
</script>