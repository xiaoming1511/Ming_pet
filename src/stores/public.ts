import { defineStore } from "pinia";

export const usePublicStore = defineStore("public", {
  id: "public",
  state: () => ({
    itemList: ref([]),
    editShowModal: ref(false),
    addShowModal: ref(false),
    listType: ref(""),
  }),

  getters: {},

  actions: {},
});
