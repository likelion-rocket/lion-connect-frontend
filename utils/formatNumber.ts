/**
 * 숫자 포맷팅 관련 유틸리티 함수 모음
 */

/**
 * 문자열에서 숫자를 추출하는 함수
 * @param value - 숫자를 포함한 문자열
 * @returns 추출된 숫자
 * @example
 * extractNumber("11,947명") // 11947
 * extractNumber("13년") // 13
 * extractNumber("1,800개") // 1800
 */
export function extractNumber(value: string): number {
  const numericString = value.replace(/[^0-9]/g, "");
  return parseInt(numericString, 10) || 0;
}

/**
 * 문자열에서 단위를 추출하는 함수
 * @param value - 숫자와 단위를 포함한 문자열
 * @returns 추출된 단위
 * @example
 * extractUnit("11,947명") // "명"
 * extractUnit("13년") // "년"
 * extractUnit("1,800개") // "개"
 */
export function extractUnit(value: string): string {
  return value.replace(/[0-9,]/g, "");
}

/**
 * 숫자를 천 단위로 콤마를 추가하는 함수
 * @param num - 포맷팅할 숫자
 * @returns 콤마가 추가된 문자열
 * @example
 * formatNumberWithCommas(11947) // "11,947"
 * formatNumberWithCommas(1800) // "1,800"
 * formatNumberWithCommas(15000) // "15,000"
 */
export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
