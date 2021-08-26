<template>
  <div class="d-flex flex-column align-items-center">
    <!-- c'est la méthode data() de firestore qui nous permet d'accéder aux données -->
    <!-- Récupération de l'emit avec @saveEdit puis on passe une nouvelle fonction saveEdit -->
    <ContactDetail
      :contact="contact"
      v-for="contact in contacts"
      :key="contact.data().id"
      @saveEdit="saveEdit"
      @deleteContact="deleteContact"
    />
  </div>
</template>

<script>
import ContactDetail from "@/components/ContactDetail.vue";
export default {
  props: ["contacts"],
  components: {
    ContactDetail,
  },
  methods: {
    deleteContact(contact) {
      // on crée un emit sous le nom de deleteContact et on lui passe le contact qu'on veut supprimer :
      this.$emit("deleteContact", contact);
    },
    saveEdit(editedContact) {
      this.$emit("saveEdit", editedContact);
    },
  },
};
</script>

<style>
li {
  list-style: none;
}
</style>
