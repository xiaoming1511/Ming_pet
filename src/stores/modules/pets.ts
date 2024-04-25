import petService from "@/api/petService";
import { defineStore } from "pinia";
import { differenceInCalendarDays, parseISO, formatISO } from "date-fns";

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
        // 获取当前日期
        const today = formatISO(new Date(), { representation: "date" });
        // 转换当前日期到 Date 对象
        const todayDate = parseISO(today);

        // 遍历所有服务，计算距离天数并添加到新字段
        const updatedServiceList = response.data.map((service) => {
          // 转换服务日期到 Date 对象
          const serviceDateObj = parseISO(service.serviceDate);
          // 计算距离天数
          const daysUntilService = differenceInCalendarDays(
            serviceDateObj,
            todayDate
          );
          // 返回新的服务对象，包含新增的字段
          return {
            ...service,
            daysUntilService: daysUntilService,
          };
        });

        // 更新状态
        this.petsServiceList.value = updatedServiceList;
        console.log(this.petsServiceList.value);
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
