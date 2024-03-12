import petService from "@/api/petService";
import { defineStore } from "pinia";

export const usePetsStore = defineStore("pets", {
  id: "pets",
  state: () => ({
    pets: [],
    petsService: [],
  }),

  getters: {
    getPets: (state) => state.pets,
    getPetsService: (state) => state.petsService,
  },

  actions: {
    async fetchPets() {
      try {
        const response = await petService.getPetsList();
        this.pets = response.data;
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    },
    async fetchpetsService() {
      try {
        const response = await petService.getpetsServiceList();
        this.petsService = response.data;
      } catch (error) {
        console.error("Failed to fetch petsService:", error);
      }
    },
  },
});
