import { FestivalData } from '@/types/movie';

const genres = [
    'SF',
    'TV 영화',
    '가족',
    '공포',
    '다큐멘터리',
    '드라마',
    '로맨스',
    '모험',
    '미스터리',
    '범죄',
    '서부',
    '스릴러',
    '애니메이션',
    '액션',
    '역사',
    '음악',
    '전쟁',
    '코미디',
    '판타지',
];

const TMDB_BASE_URL = 'https://image.tmdb.org/t/p/';

const languageMap: Record<string, string> = {
    en: '영어', // English
    ko: '한국어', // Korean
    es: '스페인어', // Spanish
    fr: '프랑스어', // French
    de: '독일어', // German
    ja: '일본어', // Japanese
    it: '이탈리아어', // Italian
    pt: '포르투갈어', // Portuguese
    ru: '러시아어', // Russian
    zh: '중국어', // Chinese
    ar: '아랍어', // Arabic
    nl: '네덜란드어', // Dutch
    sv: '스웨덴어', // Swedish
    no: '노르웨이어', // Norwegian
    da: '덴마크어', // Danish
    fi: '핀란드어', // Finnish
    pl: '폴란드어', // Polish
    hu: '헝가리어', // Hungarian
    cs: '체코어', // Czech
    sk: '슬로바키아어', // Slovak
    tr: '터키어', // Turkish
    el: '그리스어', // Greek
    th: '태국어', // Thai
    he: '히브리어', // Hebrew
    hi: '힌디어', // Hindi
};

const jobKoreanMap: Record<string, string> = {
    Director: '감독',
    Producer: '프로듀서',
    'Executive Producer': '총괄 프로듀서',
    Editor: '편집자',
    Casting: '캐스팅 디렉터',
    'Costume Design': '의상 디자인',
    'Art Direction': '아트 디렉션',
    'Production Design': '프로덕션 디자인',
    'Director of Photography': '촬영 감독',
    Screenplay: '각본',
    Music: '음악',
    'Sound Mixer': '사운드 믹서',
    'Makeup Designer': '메이크업 디자이너',
    'Set Designer': '세트 디자이너',
    'Stunt Coordinator': '스턴트 코디네이터',
    'Visual Effects Producer': '시각 효과 프로듀서',
    'Lighting Technician': '조명 기술자',
    'Property Master': '소품 마스터',
    Stunts: '스턴트',
    'Original Film Writer': '원작 작가',
    'Second Assistant Director': '제2 조감독',
    'Third Assistant Director': '제3 조감독',
    'First Assistant Director': '제1 조감독',
    'Aerial Director of Photography': '공중 촬영 감독',
    'Script Supervisor': '스크립트 감독',
    'Animal Coordinator': '동물 조정자',
    Choreographer: '안무가',
    'Supervising Sound Editor': '수퍼바이징 사운드 에디터',
    'Boom Operator': '붐 오퍼레이터',
    'ADR Mixer': 'ADR 믹서',
    'Music Supervisor': '음악 감독',
    'Casting Assistant': '캐스팅 어시스턴트',
    'Casting Associate': '캐스팅 어소시에이트',
    'Location Manager': '로케이션 매니저',
    'Location Assistant': '로케이션 어시스턴트',
    'Unit Production Manager': '유닛 프로덕션 매니저',
    'Construction Manager': '건설 매니저',
    'Supervising ADR Editor': '수퍼바이징 ADR 에디터',
    Grip: '그립',
    'Graphic Designer': '그래픽 디자이너',
    'Set Decorating Coordinator': '세트 장식 코디네이터',
    'Transportation Coordinator': '교통 조정자',
    'Extras Casting': '엑스트라 캐스팅',
    'Production Coordinator': '프로덕션 코디네이터',
    'Assistant Production Coordinator': '어시스턴트 프로덕션 코디네이터',
    'Production Secretary': '프로덕션 비서',
    'Production Trainee': '프로덕션 연수생',
    'Production Assistant': '프로덕션 어시스턴트',
    'Grip Production Assistant': '그립 프로덕션 어시스턴트',
    'Set Production Assistant': '세트 프로덕션 어시스턴트',
    'Original Music Composer': '원곡 작곡가',
    'Visual Effects Supervisor': '시각 효과 감독',
    'Sound Re-Recording Mixer': '사운드 재녹음 믹서',
    'Supervising Art Director': '수퍼바이징 아트 디렉터',
    'Set Decoration': '세트 장식',
};

export { genres, TMDB_BASE_URL, languageMap, jobKoreanMap };

export const yearOfFilms2023: FestivalData = {
    Berlin: [
        { tmdbId: '1070449', award: '황금곰상' },
        { tmdbId: '900379', award: '심사위원대상' },
        { tmdbId: '1092099', award: '심사위원상' },
        { tmdbId: '920767', award: '감독상' },
        { tmdbId: '1053600', award: '각본상' },
    ],
    Cannes: [
        { tmdbId: '915935', award: '황금종려상' },
        { tmdbId: '467244', award: '그랑프리' },
        { tmdbId: '986280', award: '심사위원상' },
        { tmdbId: '964960', award: '최우수 감독상' },
        { tmdbId: '1050035', award: '각본상' },
    ],
    Venice: [
        { tmdbId: '792307', award: '황금사자상' },
        { tmdbId: '937746', award: '감독상' },
        { tmdbId: '1156125', award: '심사위원대상' },
        { tmdbId: '1121956', award: '심사위원 특별상' },
        { tmdbId: '991708', award: '각본상' },
    ],
};

export const AWARDS = {
    Berlin: '베를린 국제 영화제',
    Cannes: '칸 영화제',
    Venice: '베니스 국제 영화제',
};
