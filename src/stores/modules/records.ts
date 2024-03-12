import { defineStore } from "pinia";
import recordsService from "@/api/recordService";

export const useRecordsStore = defineStore("records", {
  id: "records",
  state: () => ({
    records: [],
  }),

  getters: {
    getRecords: (state) => state.records,
  },

  actions: {
    async fetchRecords() {
      try {
        const response = await recordsService.getRecordsList();
        this.records = response.data;
        console.log(this.records);
        
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    },
  },
});
