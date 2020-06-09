<template>
  <div>
      <h2>Bearbeite Rezept</h2>
      <p class="md-caption">Hier kannst du dein Rezept bearbeiten!</p>
       <form novalidate class="md-layout" @submit.prevent="validateRezept">
           <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <img :src="imgPreview" style="height: 150px">
                </div>
                <div class="md-layout-item ">
                    <md-field>
                        <label>Bild</label>
                        <md-file accept="image/*" v-on:md-change="pickedImg" />
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-button class="md-fab md-mini" style="background: #ff5252" @click="removeImage()">
                        <md-icon style="color: white">remove</md-icon>
                    </md-button>
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

                <div class="md-layout-item md-size-100">
                   <md-field :class="getValidationClass('beschreibung')">
                        <label for="beschreibung">Beschreibung</label>
                        <md-textarea name="beschreibung" id="beschreibung" v-model="form.beschreibung"/>
                        <span class="md-error" v-if="!$v.form.beschreibung.maxLength">Die Beschreibung ist zu lange</span>
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
       <md-dialog-confirm
        :md-active.sync="active"
        md-title="Löschen?"
        md-content="Willst du das Rezept wirklich löschen? Es gibt keine Möglichkeit dies rückgängig zu machen."
        md-confirm-text="Ja, löschen"
        md-cancel-text="Abrechen"
        @md-confirm="remove()" />

        <md-button class="md-fab md-plain" style="background: #ff5252" @click="active = true">
            <md-icon>delete</md-icon>
        </md-button>
  </div>
</template>

<script>
import {db} from './../firebase/db'
import {storage} from './../firebase/storage'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
    name: 'Home',
    mixins: [validationMixin],
    data() {
        return {
            spinner: false,
            active: false,
            imgPreview: "",
            imgFile: "",
            removeImg: false,
            form: {}
        };
    },
    async created() {
        var snapshot = await db.collection('rezepte').doc(this.$route.params.id).get()
        this.form = snapshot.data()
        this.imgPreview = this.form.imgUrl
    },
    methods: {
        pickedImg(e) {
            if (e[0]) {
                this.removeImg = false
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
            }
        },
        removeZutat(index){
            this.form.zutaten.splice(index, 1);
        },
        removeImage(index){
            this.imgPreview = this.$store.state.ImgDefault
            this.removeImg = true
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
        async save (){
            if (this.imgFile) {
                // when new Img: 
                var uploadTask = await storage.ref('rezeptBilder/' + this.form.id).put(this.imgFile)
                var url
                await uploadTask.ref.getDownloadURL().then(function(downloadURL) {
                url =  downloadURL
                });
                
                // insert pixelsize of image to path
                var pos = url.lastIndexOf(this.form.id.toString()) + this.form.id.toString().length
                this.form.imgUrl = [url.slice(0, pos), this.$store.state.urlImgSize, url.slice(pos)].join('')
            }else if (this.removeImg){
                this.form.imgUrl = this.$store.state.ImgDefault
            }
            await db.collection('rezepte').doc(this.form.id).set(this.form)
            this.spinner = true
            await this.sleep(4000)
            this.spinner = false
            this.back(); 
            
        },
        async remove(){
            await storage.ref('rezeptBilder/' + this.form.id + this.$store.state.urlImgSize).delete().then(function() {
                console.log("File successfully deleted!");
            }).catch(function(error) {
                // console.error("Error removing File: ", error);
            });
            await db.collection('rezepte').doc(this.form.id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            this.$router.push("/");
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
            }
        }
    }
}
</script>