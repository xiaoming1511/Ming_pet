class WindowSizeUtils {
  /**
   * 获取当前窗口的宽度
   * @returns 当前窗口的宽度
   */
  static getWindowWidth(): number {
    return window.innerWidth;
  }

  /**
   * 获取当前窗口的高度
   * @returns 当前窗口的高度
   */
  static getWindowHeight(): number {
    return window.innerHeight;
  }

  /**
   * 获取当前窗口的尺寸（宽度和高度）
   * @returns 包含宽度和高度的对象
   */
  static getWindowSize(): { width: number; height: number } {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * 检测当前窗口宽度属于哪个范围
   * @returns 属于 'sm'、'md'、'lg'、'xl' 或 '2xl' 中的哪一个
   */
  static getResponsiveBreakpoint(): string {
    const width = this.getWindowWidth();

    if (width < 640) {
      return "xs"; // Extra small devices (portrait phones)
    } else if (width >= 640 && width < 768) {
      return "sm"; // Small devices (landscape phones)
    } else if (width >= 768 && width < 1024) {
      return "md"; // Medium devices (tablets)
    } else if (width >= 1024 && width < 1280) {
      return "lg"; // Large devices (desktops)
    } else if (width >= 1280 && width < 1536) {
      return "xl"; // Extra large devices (large desktops)
    } else {
      return "2xl"; // 2x Extra large devices (larger desktops)
    }
  }
}

export default WindowSizeUtils;
