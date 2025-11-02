/**
 * 대학교 지역 타입 정의
 */
export type Region = "전체" | "서울" | "경기 인천" | "경상" | "충청" | "전라";

/**
 * 대학교 정보 타입 정의
 */
export type University = {
  id: string;
  name: string;
  region: Exclude<Region, "전체">;
  logoPath: string;
};

/**
 * 지역 필터 버튼 목록
 */
export const REGIONS: Region[] = ["전체", "서울", "경기 인천", "경상", "충청", "전라"];

/**
 * 멋쟁이사자처럼 활동 대학교 목록
 * 이미지 파일명과 매칭되도록 구성
 */
export const UNIVERSITIES: University[] = [
  // 서울
  { id: "kookmin", name: "국민대", region: "서울", logoPath: "/landing/universities/국민대.jpg" },
  {
    id: "korea-seoul",
    name: "고려대",
    region: "서울",
    logoPath: "/landing/universities/고려대(서울).jpg",
  },
  { id: "kwangwoon", name: "광운대", region: "서울", logoPath: "/landing/universities/광운대.jpg" },
  { id: "sahmyook", name: "삼육대", region: "서울", logoPath: "/landing/universities/삼육대.png" },
  {
    id: "sangmyung-seoul",
    name: "상명대",
    region: "서울",
    logoPath: "/landing/universities/상명대(서울).jpg",
  },
  { id: "sogang", name: "서강대", region: "서울", logoPath: "/landing/universities/서강대.jpg" },
  { id: "seokyeong", name: "서경대", region: "서울", logoPath: "/landing/universities/서경대.jpg" },
  {
    id: "seoultech",
    name: "서울과기대",
    region: "서울",
    logoPath: "/landing/universities/서울과기대.jpg",
  },
  { id: "snu", name: "서울대", region: "서울", logoPath: "/landing/universities/서울대.jpg" },
  { id: "swu", name: "서울여대", region: "서울", logoPath: "/landing/universities/서울여대.jpg" },
  { id: "sungkyul", name: "성결대", region: "서울", logoPath: "/landing/universities/성결대.jpg" },
  { id: "skku", name: "성균관대", region: "서울", logoPath: "/landing/universities/성균관대.png" },
  {
    id: "sungshin",
    name: "성신여대",
    region: "서울",
    logoPath: "/landing/universities/성신여대.jpg",
  },
  {
    id: "sookmyung",
    name: "숙명여대",
    region: "서울",
    logoPath: "/landing/universities/숙명여대.jpg",
  },
  { id: "ssu", name: "숭실대", region: "서울", logoPath: "/landing/universities/숭실대.jpg" },
  { id: "yonsei", name: "연세대", region: "서울", logoPath: "/landing/universities/연세대.jpg" },
  { id: "ewha", name: "이화여대", region: "서울", logoPath: "/landing/universities/이화여대.jpg" },
  { id: "cau", name: "중앙대", region: "서울", logoPath: "/landing/universities/중앙대.jpg" },
  {
    id: "duksung",
    name: "덕성여대",
    region: "서울",
    logoPath: "/landing/universities/덕성여대.jpg",
  },
  { id: "dongguk", name: "동국대", region: "서울", logoPath: "/landing/universities/동국대.jpg" },
  {
    id: "dongduk",
    name: "동덕여대",
    region: "서울",
    logoPath: "/landing/universities/동덕여대.jpg",
  },
  {
    id: "hufs-seoul",
    name: "한국외대",
    region: "서울",
    logoPath: "/landing/universities/한국외대(서울).jpg",
  },
  {
    id: "kau",
    name: "한국항공대",
    region: "서울",
    logoPath: "/landing/universities/한국항공대.jpg",
  },
  { id: "hansung", name: "한성대", region: "서울", logoPath: "/landing/universities/한성대.jpg" },
  { id: "hongik", name: "홍익대", region: "서울", logoPath: "/landing/universities/홍익대.jpg" },

  // 경기 인천
  {
    id: "catholic",
    name: "가톨릭대",
    region: "경기 인천",
    logoPath: "/landing/universities/가톨릭대.jpg",
  },
  {
    id: "kangnam",
    name: "강남대",
    region: "경기 인천",
    logoPath: "/landing/universities/강남대.jpg",
  },
  {
    id: "nsu",
    name: "남서울대",
    region: "경기 인천",
    logoPath: "/landing/universities/남서울대.jpg",
  },
  {
    id: "baekseok",
    name: "백석대",
    region: "경기 인천",
    logoPath: "/landing/universities/백석대.jpg",
  },
  {
    id: "sangmyung-cheonan",
    name: "상명대",
    region: "경기 인천",
    logoPath: "/landing/universities/상명대(천안).jpg",
  },
  {
    id: "sungkonghoe",
    name: "성공회대",
    region: "경기 인천",
    logoPath: "/landing/universities/성공회대.jpg",
  },
  {
    id: "sch",
    name: "순천향대",
    region: "경기 인천",
    logoPath: "/landing/universities/순천향대.jpg",
  },
  {
    id: "incheon",
    name: "인천대",
    region: "경기 인천",
    logoPath: "/landing/universities/인천대.jpg",
  },
  {
    id: "inha",
    name: "인하대",
    region: "경기 인천",
    logoPath: "/landing/universities/인하대(용현).jpg",
  },
  {
    id: "joongbu",
    name: "중부대",
    region: "경기 인천",
    logoPath: "/landing/universities/중부대.jpg",
  },
  {
    id: "hufs-gyeonggi",
    name: "한국외대",
    region: "경기 인천",
    logoPath: "/landing/universities/한국외대(경기).jpg",
  },
  {
    id: "hanyang-gyeonggi",
    name: "한양대",
    region: "경기 인천",
    logoPath: "/landing/universities/한양대(경기).jpg",
  },

  // 경상
  { id: "knu", name: "경북대", region: "경상", logoPath: "/landing/universities/경북대.jpg" },
  { id: "keimyung", name: "계명대", region: "경상", logoPath: "/landing/universities/계명대.jpg" },
  { id: "kumoh", name: "금오공대", region: "경상", logoPath: "/landing/universities/금오공대.jpg" },
  { id: "pnu", name: "부산대", region: "경상", logoPath: "/landing/universities/부산대.jpg" },
  { id: "yeungnam", name: "영남대", region: "경상", logoPath: "/landing/universities/영남대.jpg" },
  {
    id: "ync",
    name: "영남이공대",
    region: "경상",
    logoPath: "/landing/universities/영남이공대.jpg",
  },
  { id: "handong", name: "한동대", region: "경상", logoPath: "/landing/universities/한동대.jpg" },

  // 충청
  { id: "eulji", name: "을지대", region: "충청", logoPath: "/landing/universities/을지대.jpg" },
  { id: "cheongju", name: "청주대", region: "충청", logoPath: "/landing/universities/청주대.jpg" },
  { id: "cnu", name: "충남대", region: "충청", logoPath: "/landing/universities/충남대.jpg" },
  {
    id: "kut",
    name: "한국교통대",
    region: "충청",
    logoPath: "/landing/universities/한국교통대.jpg",
  },
  { id: "hannam", name: "한남대", region: "충청", logoPath: "/landing/universities/한남대.jpg" },
  { id: "hanbat", name: "한밭대", region: "충청", logoPath: "/landing/universities/한밭대.jpg" },
  { id: "hanseo", name: "한서대", region: "충청", logoPath: "/landing/universities/한서대.jpg" },

  // 전라
  { id: "mokpo", name: "목포대", region: "전라", logoPath: "/landing/universities/백석대.jpg" },
  { id: "scnu", name: "순천대", region: "전라", logoPath: "/landing/universities/순천대.jpg" },
  { id: "chosun", name: "조선대", region: "전라", logoPath: "/landing/universities/금오공대.jpg" },
];
