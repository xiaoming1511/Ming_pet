import { defineStore } from "pinia";
import uploadService from "@/api/uploadService";

export const useupLoadStore = defineStore("upload", {
  id: "upload",
  state: () => ({}),
  actions: {
    async upLoadImage(data) { 
      const res = await uploadService.upLoadImage(data);
      console.log(res);
    },
  },
});
