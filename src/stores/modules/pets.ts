import petService from "@/api/petService";
import { defineStore } from "pinia";

export const usePetsStore = defineStore("pets", {
  id: "pets",
  state: () => ({
    pets: [],
    petsServiceList: ref([]),
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
    async fetchpetsService(serviceDate) {
      try {
        const response = await petService.getpetsServiceList(serviceDate);
        this.petsServiceList.value = response.data;
      } catch (error) {
        console.error("Failed to fetch petsService:", error);
      }
    },
    async addPet(petDate) {
      const request = await petService.addPet(petDate);
    },
    async updatePet(petId, petDate) {
      const request = await petService.updatePetsInfo(petId, petDate);
    },
    async fetchpetsbyDateRangeServiceList(startDate, endDate) {
      const request = await petService.getpetsbyDateRangeServiceList(
        startDate,
        endDate
      );
      return request.data;
    },
    async getPetByDateRange(startDate, endDate) {
      const request = await petService.getPetByDateRange(startDate, endDate);
      this.pets = request.data;
    },
    async getPetByKeyword(keyWord) {
      const request = await petService.getPetByKeyword(keyWord);
      this.pets = request.data;
    },
    async getPetByCategory(category) {
      const request = await petService.getPetByCategory(category);
      this.pets = request.data;
    },
  },
});
