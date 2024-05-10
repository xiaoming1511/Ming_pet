import WindowSizeUtils from "@/utils/windowsizeUtils";

export function useResponsiveBreakpoint() {
  const responsiveBreakpoint = ref(WindowSizeUtils.getResponsiveBreakpoint());

  const updateBreakpoint = () => {
    responsiveBreakpoint.value = WindowSizeUtils.getResponsiveBreakpoint();
  };

  onMounted(() => {
    window.addEventListener("resize", updateBreakpoint);
    updateBreakpoint(); // 初始化断点
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateBreakpoint);
  });

  return {
    responsiveBreakpoint,
    updateBreakpoint,
  };
}
