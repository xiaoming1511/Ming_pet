<template>
    <div>
        <n-calendar v-model:value.sync="value" #="{ year, month, date }" @update:value="handleUpdateValue">
            <div class="badge">
                <n-badge v-if="findBadgeByDate(year, month, date)" :value="findBadgeByDate(year, month, date)" :max="9">
                </n-badge>
            </div>
        </n-calendar>
    </div>
</template>

<script setup lang="ts">
import { addDays, getDaysInMonth, startOfWeek, endOfWeek, format, startOfMonth, weekStartsOn, endOfMonth, eachDayOfInterval } from 'date-fns/esm';
import { usePetsStore } from '@/stores/modules/pets';

const petStore = usePetsStore();
const message = useMessage();

const badge = ref(0);
const value = ref(Date.now());
const currentMonth = new Date();
const daysInMonth = getDaysInMonth(currentMonth);
const calendarItems = ref([]);

const handleUpdateValue = async (
    _: number,
    { year, month, date }: { year: number; month: number; date: number }
) => {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(date).padStart(2, '0');
    const changeDate = `${year}-${formattedMonth}-${formattedDay}`;

    await petStore.fetchpetsService(changeDate)
}

// 此函数可以用来获取特定时间范围内的服务列表
const fetchServiceListInRange = async (startDate, endDate) => {
    // 这里你需要调用你的API来获取数据，暂时用空数组代替
    return [];
};
// 创建日历项目数组，现在可以接收开始日期和结束日期
const fillCalendarItems = async () => {
    const start = startOfMonth(currentMonth); // 当月的第一天
    const end = endOfMonth(currentMonth); // 当月的最后一天

    // 获得当前月份第一天所在周的周一
    const viewStart = startOfWeek(start, { weekStartsOn: 0 });
    // 获得当前月份最后一天所在周的周日
    const viewEnd = endOfWeek(end, { weekStartsOn: 0 });

    const startDate = format(viewStart, 'yyyy-MM-dd');
    const endDate = format(viewEnd, 'yyyy-MM-dd');

    const serviceList = await petStore.fetchpetsbyDateRangeServiceList(startDate, endDate)

    const badgeCounts = serviceList.reduce((acc, item) => {
        acc[item.serviceDate] = (acc[item.serviceDate] || 0) + 1;
        return acc;
    }, {});

    calendarItems.value = eachDayOfInterval({ start: viewStart, end: viewEnd }).map(date => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return {
            date: formattedDate,
            badge: badgeCounts[formattedDate] || 0
        };
    });
};

const findBadgeByDate = (year, month, date) => {
    // 确保月份和日期是两位数字
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = date.toString().padStart(2, '0');
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    const item = calendarItems.value.find(item => item.date === formattedDate);

    return item ? item.badge : null; // 返回具体的badge值
};

onMounted(() => {
    fillCalendarItems();
})
</script>

<style scoped>
:deep(.n-calendar) {
    height: 100%;
}

:deep(.n-calendar-dates) {
    flex: 0.5;
}

:deep(.n-calendar-date) {
    justify-content: center !important;
    height: 48px !important;
    width: 100% !important;
    padding: 0 !important;
}

.badge {
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75rem;
}
:deep(.n-calendar-date){
    gap: .25rem;
}
</style>