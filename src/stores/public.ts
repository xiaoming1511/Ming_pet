import { defineStore } from "pinia";

export const usePublicStore = defineStore("public", {
  id: "public",
  state: () => ({
    itemList: [],
    ShowModal: false,
    modalTitle: "",
    submitButtonText: "",
    isEditMode: false,
    currentItem: null,
  }),

  getters: {},

  actions: {
    changeShowModal() {
      this.ShowModal = !this.ShowModal;
    },
    openEditModal(item) {
      this.isEditMode = true;
      this.modalTitle = "编辑";
      this.submitButtonText = "编辑";
      this.ShowModal = true;
      this.itemList = item;
    },
    openAddModal(addItme) {
      this.isEditMode = false;
      this.modalTitle = "添加";
      this.submitButtonText = "添加";
      this.ShowModal = true;
      this.itemList = addItme;
    },
    resetItemList() {
      Object.keys(this.itemList).forEach((key) => {
        this.itemList[key] = null;
      });
    },
  },
});
