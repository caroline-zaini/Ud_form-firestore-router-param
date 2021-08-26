<template>
  <div>
    <div
      v-if="!isInEditMode"
      class="card"
      style="width: 18rem; margin-bottom: 10px"
    >
      <div class="card-body">
        <!-- contact est obtenu via les props -->
        <!--  On passe un objet dans router link donc :to dont le name correspond à la propriété name: 'Contact' dans router et on passe l'id en paramètre -->
        <router-link :to="{ name: 'Contact', params: { id: contact.id } }">
          <h5 class="card-title">
            <!-- c'est la méthode data() firestore qui nous permet d'accéder aux données -->
            {{ contact.data().firstName }} {{ contact.data().lastName }}
          </h5>
        </router-link>
        <h6 class="card-subtitle mb-2 text-muted">
          {{ contact.data().email }}
        </h6>
        <p class="card-text">
          Numéro de téléphone : {{ contact.data().phone }}
        </p>
        <button class="btn btn-sm btn-warning" @click="editContact">
          modifier
        </button>
        <!-- on peut directement effectuer l'emit dans le custom event : -->
        <button
          class="btn btn-sm btn-danger"
          @click="$emit('deleteContact', contact)"
        >
          supprimer
        </button>
      </div>
    </div>

    <div
      v-if="isInEditMode"
      class="card"
      style="width: 18rem; margin-bottom: 10px"
    >
      <div class="card-body">
        <input type="text" v-model="contactCopy.firstName" /><br />
        <input type="text" v-model="contactCopy.lastName" /><br />
        <input type="text" v-model="contactCopy.email" /><br />
        <input type="text" v-model="contactCopy.phone" /><br />

        <button class="btn btn-sm btn-success" @click="saveEdit">
          modifier
        </button>
        <button class="btn btn-sm btn-warning" @click="cancelEdit">
          annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import db from "../shared/db.js";
export default {
  data() {
    return {
      // on fait une copie de contact pour garder les contact originaux dans le cas où dans update, on ne fait pas de modification :
      contactCopy: {},
      isInEditMode: false,
    };
  },
  props: ["contact"],
  methods: {
    editContact() {
      const { firstName, lastName, email, phone } = this.contact.data();
      this.contactCopy = {
        id: this.contact.id,
        firstName,
        lastName,
        email,
        phone,
      };
      this.isInEditMode = true;
      console.log(this.contactCopy, "isInEditMode :", this.isInEditMode);
    },

    saveEdit() {
      this.$emit("saveEdit", this.contactCopy);
      this.isInEditMode = false;
    },
    cancelEdit() {
      this.isInEditMode = false;
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 5px;
}
</style>
