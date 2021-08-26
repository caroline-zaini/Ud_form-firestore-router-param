// Avant tout, il faut créé un nouveau projet puis une collection dans le site Firebase
import Firebase from "firebase/app";
import "firebase/firestore";
import fsConfig from "./config.js";

const config = fsConfig;
const App = Firebase.initializeApp(config);

const Firestore = App.firestore();
// Pour que les dates soient transformées en timestamp :
Firestore.settings({ timestampsInSnapshots: true });

export default {
  // on crée des méthodes :
  read() {
    // on pointe vers contacts crée précédemment dans firestore et retourne une promesse:
    return Firestore.collection("contacts").get();
  },
  create(contact) {
    return Firestore.collection("contacts").add(contact);
  },
  delete(id) {
    // on accède à un certain document grâce à son id puis on le supprime :
    return Firestore.collection("contacts").doc(id).delete();
  },
  update(contact) {
    return Firestore.collection("contacts").doc(contact.id).update(contact);
  },
};
