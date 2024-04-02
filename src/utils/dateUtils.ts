export class DateUtils {
  /**
   * 格式化日期为 'yyyy-MM-dd' 格式
   * @param date - 需要格式化的日期对象或毫秒数
   * @returns 格式化后的日期字符串
   */
  static formatDate(date: Date | number): string {
    if (!date) return "";

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  /**
   * 格式化日期范围为 ['yyyy-MM-dd', 'yyyy-MM-dd'] 格式
   * @param dates - 包含起始日期和结束日期的数组
   * @returns 格式化后的日期字符串数组
   */
  static formatDateRange(dates: (Date | number)[]): string[] {
    return dates.map((date) => this.formatDate(date));
  }
}
