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

  /**
   * 计算指定日期对应的年龄（基于当前日期）
   * @param birthDate - 出生日期对象或毫秒数
   * @returns 年龄（整数）
   */
  static calculateAge(birthDate: Date | number): number {
    if (!birthDate) return null;

    const now = new Date();
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = now.getFullYear();

    const birthMonth = new Date(birthDate).getMonth() + 1;
    const currentMonth = now.getMonth() + 1;
    const birthDay = new Date(birthDate).getDate();
    const currentDay = now.getDate();

    // 初步计算年龄
    let age = currentYear - birthYear;

    // 考虑是否已经过了生日
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    // 特殊处理2月29日出生的情况
    // 如果出生日在2月29日，且当前年份不是闰年，但当前日期在3月1日之后
    if (
      birthMonth === 2 &&
      birthDay === 29 &&
      !DateUtils.isLeapYear(currentYear) &&
      currentMonth === 3 &&
      currentDay > 1
    ) {
      age--; // 未过生日，年龄减一
    }

    return age;
  }
  // 内部辅助函数：判断是否为闰年
  private static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
