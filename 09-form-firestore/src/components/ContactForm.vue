<template>
  <div>
    <h2>Créer un contact</h2>
    <form @submit.prevent="createContact">
      <input
        type="text"
        v-model="contact.firstName"
        placeholder="prénom"
      /><br />
      <input type="text" v-model="contact.lastName" placeholder="nom" /><br />
      <input type="text" v-model="contact.email" placeholder="email" /><br />
      <input
        type="text"
        v-model="contact.phone"
        placeholder="téléphone"
      /><br />
      <button type="submit">Créer</button>
    </form>
  </div>
</template>

<script>
// import de la bdd :
import db from "../shared/db.js";
export default {
  data() {
    return {
      contact: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    createContact() {
      // create est une méthode qui retourne une promesse donc on écoute à l'aide de then
      db.create(this.contact)
        .then((data) => {
          console.log(data);
          // on passe de la donnée au composant parent. Le emit est nommé created
          this.$emit("created");
          this.resetForm(); // le contact sera enregistré dans firestore et sera le formualaire sera mis à zéro
        })
        .catch((err) => console.error(err));
    },
    // Remettre à zéro le formulaire :
    resetForm() {
      this.contact.firstName = "";
      this.contact.lastName = "";
      this.contact.email = "";
      this.contact.phone = "";
    },
  },
};
</script>

<style scoped></style>
