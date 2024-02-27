import { App } from "vue";
// 配置自动导入
export const autoImportIcons = (app: App) => {
  const icons = import.meta.glob("@/assets/icons/*.svg", { eager: true });

  Object.entries(icons).forEach(([path, resolve]) => {
    const iconName = path.split("/").pop()?.replace(".svg", "");
    if (iconName) {
      const componentName = `Icon${
        iconName.charAt(0).toUpperCase() + iconName.slice(1)
      }`;
      app.component(
        componentName,
        defineAsyncComponent(() => Promise.resolve(resolve.default))
      );
    }
  });
};
