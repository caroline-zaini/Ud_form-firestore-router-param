<template>
  <div id="app">
    <!-- on utilise le nom de notre emit et côté parent on appel la fonction getAllContacts  -->
    <!-- l'intérêt est qu'à la création d'un nouvel élément, on va rappeler getAllCOntacts pour refaire une requête à la bdd donc lors de la création d'un contact il apparaîtera tout de suite -->
    <ContactForm @created="getAllContacts" /><br />

    <!-- Passe des props à son composant enfant avec :contacts="contacts"  -->
    <!-- on récupère un évènement émit avec @deleteContact="" puis on exécute la méthode deleteContact -->
    <!-- récupération de l'emit de ContactList avec @saveEdit puis on crée une méthode saveEdit-->
    <ContactList
      :contacts="contacts"
      @saveEdit="saveEdit"
      @deleteContact="deleteContact"
    />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactList from "@/components/ContactList.vue";
import db from "../shared/db.js";
export default {
  data() {
    return {
      contacts: [],
    };
  },
  created() {
    this.getAllContacts();
  },
  methods: {
    // C'est le composant App qui gère les données des composants enfants
    getAllContacts() {
      db.read()
        .then((snapShot) => {
          console.log(snapShot);
          // la propriété docs comporte tous les documents qui se trouvent dans la collection de firestore :
          this.contacts = snapShot.docs;
        })
        .catch((err) => console.error(err));
    },
    deleteContact(contact) {
      db.delete(contact.id)
        .then(() => {
          this.getAllContacts();
        })
        .catch((err) => console.error(err));
    },
    saveEdit(editedContact) {
      db.update(editedContact)
        .then(() => {
          this.getAllContacts();
        })
        .catch((err) => console.error(err));
    },
  },
  name: "App",
  components: {
    ContactForm,
    ContactList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
