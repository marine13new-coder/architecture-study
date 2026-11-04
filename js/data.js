// ARCHI-GENEALOGY: Master Data
// 5개 시대(Eras), 핵심 건축가 목록 (인물 사진, 대표작 사진, 도면, 철학, 계보), 사제/영향 계보선

const ERAS = [
  {
    "id": "era-pioneers",
    "name": "태동기 & 근대 선구자",
    "period": "1850s – 1910s",
    "desc": "산업혁명에 대한 반작용, 신소재(철·유리·콘크리트)의 등장과 역사주의 탈피. 미술공예운동, 시카고파, 아르누보, 빈 분리파의 태동.",
    "color": "#f59e0b"
  },
  {
    "id": "era-masters",
    "name": "근대 4대 거장 & 아방가르드",
    "period": "1910s – 1940s",
    "desc": "바우하우스, 데 스틸, 구성주의, 국제주의 양식의 확립. 르 코르뷔지에, 미스, 라이트, 그로피우스, 알토 등이 이룩한 근대건축의 황금기.",
    "color": "#3b82f6"
  },
  {
    "id": "era-postwar",
    "name": "전후 모더니즘 & 브루탈리즘",
    "period": "1940s – 1970s",
    "desc": "전후 재건과 국제주의의 획일화에 대한 저항. 루이스 칸의 영성, 콘크리트 브루탈리즘, 메타볼리즘, 한국 근대건축의 개척.",
    "color": "#10b981"
  },
  {
    "id": "era-postmodern",
    "name": "포스트모더니즘 & 해체주의",
    "period": "1970s – 1990s",
    "desc": "\"Less is a bore\". 역사와 상징의 복권, 그리고 이성과 질서를 해체하고 파편화한 해체주의의 충격.",
    "color": "#ef4444"
  },
  {
    "id": "era-contemporary",
    "name": "하이테크 & 현대 동시대 건축",
    "period": "1990s – 현재",
    "desc": "첨단 구조 공학의 하이테크, 디지털 파라메트릭, 재료 표피의 실험, 그리고 지속가능성과 생태/지역주의의 융합.",
    "color": "#8b5cf6"
  }
];

const INITIAL_ARCHITECTS = [
  {
    "id": "william-morris",
    "nameKo": "윌리엄 모리스",
    "nameEn": "William Morris",
    "birth": 1834,
    "death": 1896,
    "country": "영국",
    "eraId": "era-pioneers",
    "movement": "미술공예운동 (Arts & Crafts)",
    "quote": "유용하다고 믿지 않거나, 아름답다고 생각하지 않는 것은 집에 두지 마라.",
    "desc": "기계 문명에 의한 대량생산의 조잡함을 비판하고 중세 길드의 장인 정신과 수공예의 부활을 주창했습니다. 건축과 공예의 통합을 통해 근대 디자인과 바우하우스의 사상적 모태를 제공했습니다.",
    "masterpiece": "붉은 집 (Red House, 1859)",
    "tags": [
      "미술공예운동",
      "수공예부활",
      "디자인의아버지"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/William_Morris_age_53.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Red_House_Bexleyheath.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Red_House_Plan_Ground_Floor.jpg?width=800",
    "philosophyKeywords": [
      "미술공예운동",
      "토탈 디자인(Gesamtkunstwerk)",
      "장인정신 회복",
      "대량생산 비판"
    ],
    "keyWorks": [
      {
        "name": "붉은 집 (Red House)",
        "year": 1859,
        "location": "영국 벡슬리히스",
        "desc": "필립 웹과 협업한 중세 길드풍 수공예 주택의 정수"
      },
      {
        "name": "모리스 회사 벽지 디자인",
        "year": 1862,
        "location": "런던",
        "desc": "자연 모티브의 유기적 패턴 공예"
      }
    ],
    "anecdote": "산업혁명의 조잡한 기계 생산품에 환멸을 느끼고, 친구인 건축가 필립 웹과 함께 손수 벽돌과 가구를 깎아 만든 '붉은 집'은 훗날 바우하우스와 근대 조형 예술의 출발점이 되었습니다."
  },
  {
    "id": "henry-richardson",
    "nameKo": "헨리 홉슨 리처드슨",
    "nameEn": "Henry Hobson Richardson",
    "birth": 1838,
    "death": 1886,
    "country": "미국",
    "eraId": "era-pioneers",
    "movement": "리처드슨 로마네스크",
    "quote": "건축가는 매 순간 석재의 무게와 장엄함을 기억해야 한다.",
    "desc": "미국 독자적 건축 양식의 선구자. 중세 로마네스크의 육중한 석조 아치와 벽체를 재해석해 미국에 토착화시켰으며, 루이스 설리반에게 깊은 감화를 주었습니다.",
    "masterpiece": "보스턴 트리니티 교회 (Trinity Church, 1877), 마셜 필드 도매점",
    "tags": [
      "로마네스크",
      "미국건축시초",
      "시카고파선구"
    ],
    "influences": [
      "louis-sullivan"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/HHRichardson.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Trinity_Church_Boston_2019.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Trinity_Church_Boston_plan.png?width=800",
    "philosophyKeywords": [
      "리처드슨 로마네스크",
      "육중한 석조 아치",
      "미국 독자 양식 개척"
    ],
    "keyWorks": [
      {
        "name": "보스턴 트리니티 교회",
        "year": 1877,
        "location": "미국 보스턴",
        "desc": "거대한 사암 아치와 탑이 빚어낸 미국 건축의 기념비적 걸작"
      },
      {
        "name": "마셜 필드 도매점",
        "year": 1887,
        "location": "미국 시카고",
        "desc": "설리반에게 결정적 영향을 준 단순하고 힘찬 상업 입면"
      }
    ],
    "anecdote": "루이스 설리반은 리처드슨의 마셜 필드 도매점을 보고 '힘과 단순성의 극치'라며 충격을 받았고, 이를 마천루 수직성의 모태로 삼았습니다."
  },
  {
    "id": "otto-wagner",
    "nameKo": "오토 바그너",
    "nameEn": "Otto Wagner",
    "birth": 1841,
    "death": 1918,
    "country": "오스트리아",
    "eraId": "era-pioneers",
    "movement": "빈 분리파 (Vienna Secession)",
    "quote": "예술은 오직 필요에만 따른다 (Artis sola domina necessitas).",
    "desc": "역사주의 건축의 굴레를 벗어던지고 근대 도시와 기능에 맞는 새로운 건축 언어를 선언했습니다. 유리와 알루미늄, 볼트 노출 구조 등 현대적 재료를 과감히 도입했으며 아돌프 로스, 올브리히 등에게 지대한 영향을 주었습니다.",
    "masterpiece": "빈 우체국 저축은행 (Postsparkasse, 1906), 슈타인호프 성당",
    "tags": [
      "빈분리파",
      "근대건축선구",
      "합리주의"
    ],
    "influences": [
      "adolf-loos"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Otto_Wagner_1910.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Postsparkasse_am_Georg-Coch-Platz.JPG?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Postsparkasse_Wien_Grundriss.png?width=800",
    "philosophyKeywords": [
      "빈 분리파",
      "볼트 노출 구조",
      "필요가 예술의 주인이다",
      "근대 도시 계획"
    ],
    "keyWorks": [
      {
        "name": "빈 우체국 저축은행 (Postsparkasse)",
        "year": 1906,
        "location": "오스트리아 빈",
        "desc": "알루미늄 볼트 노출과 유리 바닥 천창의 혁신"
      },
      {
        "name": "슈타인호프 성당",
        "year": 1907,
        "location": "오스트리아 빈",
        "desc": "근대 기하학과 전통 예배 공간의 우아한 결합"
      }
    ],
    "anecdote": "오토 바그너는 '예술은 오직 필요에만 따른다'고 선언하며 석조 외벽에 대리석 판을 알루미늄 리벳으로 고정하는 파격을 선보여 아돌프 로스와 유럽 아방가르드를 격발시켰습니다."
  },
  {
    "id": "antoni-gaudi",
    "nameKo": "안토니 가우디",
    "nameEn": "Antoni Gaudí",
    "birth": 1852,
    "death": 1926,
    "country": "스페인 (카탈루냐)",
    "eraId": "era-pioneers",
    "movement": "카탈루냐 모더니즘 / 유기적 표현주의",
    "quote": "직선은 인간의 선이고, 곡선은 신의 선이다.",
    "desc": "자연의 기하학(현수선, 포선 등)과 유기적 형태를 구조 역학과 완벽히 결합시킨 독보적 거장입니다. 카탈루냐 전통 타일 공예(트렌카디스)와 역학적 모형 실험을 통해 시대를 초월한 조형 세계를 창조했습니다.",
    "masterpiece": "사그라다 파밀리아 (Sagrada Família), 카사 바트요, 카사 밀라, 구엘 공원",
    "tags": [
      "유기적건축",
      "카탈루냐모더니즘",
      "자연의구조"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Antoni_Gaudi_1878.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada_Familia_01.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada_Familia_planta.svg?width=800",
    "philosophyKeywords": [
      "카탈루냐 모더니즘",
      "현수선 아치(Catenary)",
      "트렌카디스 타일",
      "자연의 기하학"
    ],
    "keyWorks": [
      {
        "name": "사그라다 파밀리아 대성당",
        "year": 1882,
        "location": "스페인 바르셀로나",
        "desc": "역학적 현수선 모형과 자연의 숲을 형상화한 인류의 영원한 성전"
      },
      {
        "name": "카사 밀라 (라 페드레라)",
        "year": 1912,
        "location": "바르셀로나",
        "desc": "물결치는 석회암 파사드와 자유로운 평면"
      }
    ],
    "anecdote": "가우디는 줄과 추를 매단 현수선 역학 모형을 거꾸로 뒤집어 완벽한 압축 응력 구조를 찾아냈습니다. '직선은 인간의 선이고 곡선은 신의 선이다'라는 명언을 남겼습니다."
  },
  {
    "id": "louis-sullivan",
    "nameKo": "루이스 설리반",
    "nameEn": "Louis Sullivan",
    "birth": 1856,
    "death": 1924,
    "country": "미국",
    "eraId": "era-pioneers",
    "movement": "시카고파 (Chicago School)",
    "quote": "형태는 기능을 따른다 (Form follows function).",
    "desc": "철골 구조와 엘리베이터의 등장으로 열린 '고층 건물(마천루)'의 미학적 해법을 제시한 근대건축의 아버지. 프랭크 로이드 라이트가 평생 '위대한 스승(Lieber Meister)'으로 부른 인물입니다.",
    "masterpiece": "웨인라이트 빌딩 (Wainwright Building, 1891), 카슨 피리 스콧 백화점",
    "tags": [
      "마천루의아버지",
      "형태는기능을따른다",
      "시카고파"
    ],
    "influences": [
      "frank-lloyd-wright"
    ],
    "influencedBy": [
      "henry-richardson"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Louis_Sullivan_1895.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Wainwright_Building.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Wainwright_Building_typical_floor_plan.png?width=800",
    "philosophyKeywords": [
      "형태는 기능을 따른다 (Form follows function)",
      "시카고파 마천루",
      "수직성 삼분법"
    ],
    "keyWorks": [
      {
        "name": "웨인라이트 빌딩",
        "year": 1891,
        "location": "미국 세인트루이스",
        "desc": "기단부-기준층-처마의 3분법으로 마천루의 미학을 완성한 걸작"
      },
      {
        "name": "카슨 피리 스콧 백화점",
        "year": 1899,
        "location": "시카고",
        "desc": "강철 프레임과 주철 식물 장식의 환상적 조화"
      }
    ],
    "anecdote": "청년 프랭크 로이드 라이트는 설리반의 사무실에 들어가 6년간 실무를 배우며 그를 평생 '위대한 스승(Lieber Meister)'으로 추앙했습니다."
  },
  {
    "id": "hendrik-berlage",
    "nameKo": "헨드릭 페트뤼스 베를라허",
    "nameEn": "Hendrik Petrus Berlage",
    "birth": 1856,
    "death": 1934,
    "country": "네덜란드",
    "eraId": "era-pioneers",
    "movement": "암스테르담파 / 네덜란드 근대합리주의",
    "quote": "벽체는 그 자체로 정직하게 서 있어야 하며 장식으로 덮여선 안 된다.",
    "desc": "네덜란드 근대건축의 아버지. 붉은 벽돌의 진솔한 구조성과 공간적 명료함을 통해 역사주의에서 모더니즘으로 넘어가는 징검다리를 놓았으며, 미스 반 데어 로에의 초기 사고에 큰 영향을 미쳤습니다.",
    "masterpiece": "암스테르담 증권거래소 (Beurs van Berlage, 1903)",
    "tags": [
      "네덜란드근대건축",
      "벽돌합리주의",
      "데스틸모태"
    ],
    "influences": [
      "ludwig-mies",
      "gerrit-rietveld"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Hendrik_Petrus_Berlage_(1911).jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Beurs_van_Berlage.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Beurs_van_Berlage_floor_plan.png?width=800",
    "philosophyKeywords": [
      "네덜란드 합리주의",
      "정직한 벽돌벽",
      "공간의 명료성",
      "데 스틸의 모태"
    ],
    "keyWorks": [
      {
        "name": "암스테르담 증권거래소",
        "year": 1903,
        "location": "네덜란드 암스테르담",
        "desc": "가식 없는 벽돌 표면과 철골 트러스 지붕의 솔직한 노출"
      }
    ],
    "anecdote": "베를라허의 증권거래소는 미스 반 데어 로에가 젊은 시절 보고 '벽돌 하나하나가 공간을 형성하는 정직성'에 눈을 뜨게 만든 계기가 되었습니다."
  },
  {
    "id": "victor-horta",
    "nameKo": "빅토르 오르타",
    "nameEn": "Victor Horta",
    "birth": 1861,
    "death": 1947,
    "country": "벨기에",
    "eraId": "era-pioneers",
    "movement": "아르누보 (Art Nouveau)",
    "quote": "철과 유리는 새로운 시대의 감각을 표현하는 식물의 줄기다.",
    "desc": "철골 구조를 노출시키고 식물 모티브의 유려한 채찍 곡선(Coup de Fouet)으로 실내외를 통합한 아르누보 건축의 대표자입니다.",
    "masterpiece": "타셀 호텔 (Hôtel Tassel, 1893), 오르타 박물관",
    "tags": [
      "아르누보",
      "철골곡선",
      "총체예술"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Victor_Horta_1900.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/H%C3%B4tel_Tassel_exterior.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Hotel_Tassel_plan.png?width=800",
    "philosophyKeywords": [
      "아르누보 (Art Nouveau)",
      "채찍선 (Coup de Fouet)",
      "철골 곡선미",
      "채광 코어"
    ],
    "keyWorks": [
      {
        "name": "타셀 호텔 (Hôtel Tassel)",
        "year": 1893,
        "location": "벨기에 브뤼셀",
        "desc": "세계 최초의 아르누보 주택, 실내 계단실의 식물성 철골 곡선"
      }
    ],
    "anecdote": "공업 재료인 철(Iron)을 식물의 줄기처럼 유연하게 구부려 실내 공간의 구조이자 장식으로 일체화시켜 아르누보 혁명을 촉발했습니다."
  },
  {
    "id": "peter-behrens",
    "nameKo": "페터 베렌스",
    "nameEn": "Peter Behrens",
    "birth": 1868,
    "death": 1940,
    "country": "독일",
    "eraId": "era-pioneers",
    "movement": "독일공작연맹 (Deutscher Werkbund) / 초기 산업건축",
    "quote": "산업 디자인과 건축은 시대의 기술적 정신을 기념비적으로 담아내야 한다.",
    "desc": "★근대 건축의 최고 산실★. 독일 전기회사 AEG의 종합 예술감독으로 활약하며 최초의 기업 통합 브랜드 디자인(CI)과 터빈 공장을 설계했습니다. 그의 베를린 아틀리에에서 르 코르뷔지에, 미스 반 데어 로에, 발터 그로피우스 3대 거장이 모두 실무를 배우고 교류했습니다.",
    "masterpiece": "AEG 터빈 공장 (AEG Turbinenfabrik, 1909)",
    "tags": [
      "3대거장의스승",
      "독일공작연맹",
      "산업디자인선구"
    ],
    "influences": [
      "walter-gropius",
      "ludwig-mies",
      "le-corbusier"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Peter_Behrens_1913.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/AEG_Turbinenhalle_Berlin.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/AEG_Turbinenhalle_section_plan.png?width=800",
    "philosophyKeywords": [
      "독일공작연맹 (Deutscher Werkbund)",
      "산업 디자인의 시조",
      "거장들의 산실"
    ],
    "keyWorks": [
      {
        "name": "AEG 터빈 공장 (Turbinenhalle)",
        "year": 1909,
        "location": "독일 베를린",
        "desc": "철골과 대형 유리벽으로 공장을 근대 산업의 신전으로 승화"
      }
    ],
    "anecdote": "놀랍게도 르 코르뷔지에, 미스 반 데어 로에, 발터 그로피우스 등 근대 4대 거장 중 3명이 1908~1910년 사이 베렌스의 베를린 아틀리에에서 한솥밥을 먹으며 일했습니다!"
  },
  {
    "id": "adolf-loos",
    "nameKo": "아돌프 로스",
    "nameEn": "Adolf Loos",
    "birth": 1870,
    "death": 1933,
    "country": "오스트리아",
    "eraId": "era-pioneers",
    "movement": "원초적 기능주의 / 라움플란 (Raumplan)",
    "quote": "장식은 죄악이다 (Ornament und Verbrechen, 1908).",
    "desc": "아르누보와 분리파의 장식주의를 맹비난하며 형태의 순수성과 재료 자체의 물성을 강조했습니다. 2차원 평면이 아닌 3차원 공간의 높낮이를 입체적으로 엮는 '공간계획(Raumplan)' 개념을 창안했습니다.",
    "masterpiece": "슈타이너 하우스 (1910), 뮐러 하우스 (Villa Müller, 1930), 로스하우스",
    "tags": [
      "장식은죄악",
      "라움플란",
      "미니멀리즘선구"
    ],
    "influences": [
      "le-corbusier"
    ],
    "influencedBy": [
      "otto-wagner"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Adolf_Loos.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Muller_Villa_Prague.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Villa_Muller_section_Raumplan.png?width=800",
    "philosophyKeywords": [
      "장식과 죄악 (Ornament and Crime)",
      "라움플란 (Raumplan, 3차원 입체 공간 계획)"
    ],
    "keyWorks": [
      {
        "name": "뮐러 저택 (Villa Müller)",
        "year": 1930,
        "location": "체코 프라하",
        "desc": "각 방의 높낮이가 다른 3차원 입체 공간 라움플란의 정점"
      },
      {
        "name": "로스 하우스",
        "year": 1910,
        "location": "오스트리아 빈",
        "desc": "황궁 앞 장식 없는 벽체로 도시적 파란을 일으킨 백색 건물"
      }
    ],
    "anecdote": "'장식은 죄악이다'라는 선언문으로 장식 과잉의 역사주의를 단칼에 베어냈으며, 평면이 아닌 3차원 단면 높이 차이로 공간을 구성하는 '라움플란' 이론을 완성했습니다."
  },
  {
    "id": "auguste-perret",
    "nameKo": "오귀스트 페레",
    "nameEn": "Auguste Perret",
    "birth": 1874,
    "death": 1954,
    "country": "프랑스",
    "eraId": "era-pioneers",
    "movement": "철근 콘크리트 고전주의",
    "quote": "콘크리트는 돌보다 뛰어난 영구성을 지닌 새로운 건축의 뼈대다.",
    "desc": "철근 콘크리트(RC)를 단순한 기초나 토목용이 아닌 건축적 골조와 조형의 주역으로 격상시킨 선구자입니다. 청년 르 코르뷔지에가 그의 파리 사무소에서 일하며 콘크리트의 구조적 무한한 가능성을 배웠습니다.",
    "masterpiece": "프랭클린가 아파트 (1903), 르아브르 전후 재건 도시, 랭시 노트르담 성당",
    "tags": [
      "철근콘크리트선구",
      "골조미학",
      "코르뷔지에스승"
    ],
    "influences": [
      "le-corbusier"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Auguste_Perret.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Theatre_des_Champs-Elysees_Paris.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rue_Franklin_apartments_plan.png?width=800",
    "philosophyKeywords": [
      "철근 콘크리트의 시인",
      "골조 노출 미학",
      "르 아브르 재건"
    ],
    "keyWorks": [
      {
        "name": "프랭클린가 아파트",
        "year": 1904,
        "location": "프랑스 파리",
        "desc": "철근 콘크리트 골조를 외부로 노출시킨 최초의 주거"
      },
      {
        "name": "르 아브르 도시 재건",
        "year": 1954,
        "location": "프랑스 르아브르",
        "desc": "유네스코 세계유산에 등재된 모듈러 콘크리트 도시"
      }
    ],
    "anecdote": "철근 콘크리트를 토목 재료에서 순수 건축 예술의 반열로 끌어올린 스승으로, 청년 르 코르뷔지에가 그의 파리 사무소에서 14개월간 콘크리트 구조의 잠재력을 체득했습니다."
  },
  {
    "id": "frank-lloyd-wright",
    "nameKo": "프랭크 로이드 라이트",
    "nameEn": "Frank Lloyd Wright",
    "birth": 1867,
    "death": 1959,
    "country": "미국",
    "eraId": "era-masters",
    "movement": "유기적 건축 (Organic Architecture) / 프레리 스타일",
    "quote": "건축은 대지에 놓이는 것이 아니라 대지로부터 자라나야 한다.",
    "desc": "★근대 4대 거장★. 수평선과 자연 풍광을 건축 내부로 끌어들인 프레리 하우스부터 폭포 위에 캔틸레버 슬래브를 얹은 낙수장, 유기적 나선 동선의 구겐하임 미술관에 이르기까지 70여 년간 미국 건축을 상징했습니다.",
    "masterpiece": "낙수장 (Fallingwater, 1935), 뉴욕 솔로몬 R. 구겐하임 미술관 (1959), 로비 하우스 (1910)",
    "tags": [
      "4대거장",
      "유기적건축",
      "낙수장",
      "구겐하임"
    ],
    "influences": [
      "alvar-aalto",
      "eero-saarinen"
    ],
    "influencedBy": [
      "louis-sullivan"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Frank_Lloyd_Wright_portrait.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Fallingwater3.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Fallingwater_plan.jpg?width=800",
    "philosophyKeywords": [
      "유기적 건축 (Organic Architecture)",
      "프레리 스타일 (Prairie School)",
      "캔틸레버",
      "파괴된 상자(Destroying the Box)"
    ],
    "keyWorks": [
      {
        "name": "낙수장 (Fallingwater)",
        "year": 1935,
        "location": "미국 펜실베이니아",
        "desc": "폭포 위에 대담한 캔틸레버 테라스를 뻗어 자연과 건물이 하나 된 세기의 걸작"
      },
      {
        "name": "로비 저택 (Robie House)",
        "year": 1910,
        "location": "미국 시카고",
        "desc": "지평선을 끌어안은 프레리 하우스의 교과서"
      },
      {
        "name": "구겐하임 미술관 (Guggenheim Museum)",
        "year": 1959,
        "location": "미국 뉴욕",
        "desc": "나선형 램프를 따라 연속되는 전시 공간의 혁명"
      }
    ],
    "anecdote": "벽으로 방을 가두는 서양 전통의 '상자'를 부수고 열린 평면(Open Plan)과 자연과의 유기적 합일을 이룩했습니다. 70세의 나이에 사장될 뻔했던 낙수장을 단 두 시간 만에 스케치해 거장의 부활을 알렸습니다."
  },
  {
    "id": "walter-gropius",
    "nameKo": "발터 그로피우스",
    "nameEn": "Walter Gropius",
    "birth": 1883,
    "death": 1969,
    "country": "독일 / 미국",
    "eraId": "era-masters",
    "movement": "바우하우스 (Bauhaus) / 국제주의 양식",
    "quote": "모든 조형 활동의 궁극적 목표는 건축이다.",
    "desc": "★근대 4대 거장 / 현대 조형교육의 창시자★. 전설적인 종합예술학교 바우하우스를 설립하고 데사우 교사를 설계했습니다. 커튼월(Curtain Wall)을 통한 유리 외벽의 경쾌함을 보여주었으며 이후 미국 하버드 GSD 학장으로 국제주의 건축을 세계에 확산시켰습니다.",
    "masterpiece": "바우하우스 데사우 교사 (Bauhaus Dessau, 1925), 파구스 공장 (Fagus Factory, 1911)",
    "tags": [
      "4대거장",
      "바우하우스창립",
      "커튼월",
      "국제주의"
    ],
    "influences": [
      "marcel-breuer",
      "philip-johnson",
      "paul-rudolph"
    ],
    "influencedBy": [
      "peter-behrens"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/WalterGropius-1919.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Bauhaus.JPG?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Bauhaus_dessau_floor_plan.png?width=800",
    "philosophyKeywords": [
      "바우하우스 창립자",
      "예술과 기술의 통합",
      "커튼월 유리 파사드",
      "총체적 건축(Total Architecture)"
    ],
    "keyWorks": [
      {
        "name": "데사우 바우하우스 교사",
        "year": 1926,
        "location": "독일 데사우",
        "desc": "기능별 비대칭 분동과 투명한 유리 커튼월의 근대건축 기념비"
      },
      {
        "name": "파구스 공장 (Fagus Factory)",
        "year": 1911,
        "location": "독일 알펠트",
        "desc": "모서리 기둥을 없애고 철골 유리로 감싼 초기 커튼월"
      }
    ],
    "anecdote": "1919년 바이마르에 바우하우스를 설립하여 회화, 조각, 건축, 공예의 경계를 허물었습니다. 나치의 탄압으로 미국으로 망명 후 하버드 GSD 학장을 역임하며 이오 밍 페이, 폴 루돌프 등 수많은 거장 제자를 길러냈습니다."
  },
  {
    "id": "ludwig-mies",
    "nameKo": "루트비히 미스 반 데어 로에",
    "nameEn": "Ludwig Mies van der Rohe",
    "birth": 1886,
    "death": 1969,
    "country": "독일 / 미국",
    "eraId": "era-masters",
    "movement": "미니멀리즘 / 철과 유리의 국제주의",
    "quote": "Less is more (적을수록 풍요롭다), God is in the details (신은 디테일에 있다).",
    "desc": "★근대 4대 거장★. 바르셀로나 파빌리온의 유려한 대리석과 유리, 판스워스 하우스의 극단적인 투명성, 시그램 빌딩의 청동 커튼월 등 20세기 현대 도시 마천루의 프로토타입을 완성했습니다.",
    "masterpiece": "바르셀로나 파빌리온 (1929), 판스워스 하우스 (Farnsworth House, 1951), 시그램 빌딩 (1958)",
    "tags": [
      "4대거장",
      "LessIsMore",
      "철과유리",
      "시그램빌딩"
    ],
    "influences": [
      "philip-johnson",
      "robert-venturi"
    ],
    "influencedBy": [
      "peter-behrens",
      "hendrik-berlage"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Ludwig_Mies_van_der_Rohe_in_Arts_&_Architecture,_June_1960_issue.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/The_Barcelona_Pavilion,_Barcelona,_2010.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Pavilion_Barcelona_plan.svg?width=800",
    "philosophyKeywords": [
      "Less is more (적을수록 풍요롭다)",
      "God is in the details",
      "유니버설 스페이스",
      "철골 유리 마천루"
    ],
    "keyWorks": [
      {
        "name": "바르셀로나 파빌리온",
        "year": 1929,
        "location": "스페인 바르셀로나",
        "desc": "십자형 크롬 기둥, 오닉스 벽, 물그림자가 흐르는 유동적 공간의 극치"
      },
      {
        "name": "시그램 빌딩 (Seagram Building)",
        "year": 1958,
        "location": "미국 뉴욕",
        "desc": "브론즈 I-빔과 황동 유리로 세워진 현대 고층 오피스의 절대적 표준"
      },
      {
        "name": "판스워스 주택 (Farnsworth House)",
        "year": 1951,
        "location": "미국 일리노이",
        "desc": "지상에 떠 있는 순백의 철골 유리 상자"
      }
    ],
    "anecdote": "벽체로부터 하중을 완전히 덜어내 기둥만으로 지붕을 받치고, 내부는 자유자재로 구획할 수 있는 '유니버설 스페이스'를 창시하여 전 세계 현대 도시의 풍경을 바꿔놓았습니다."
  },
  {
    "id": "le-corbusier",
    "nameKo": "르 코르뷔지에",
    "nameEn": "Le Corbusier (Charles-Édouard Jeanneret)",
    "birth": 1887,
    "death": 1965,
    "country": "스위스 / 프랑스",
    "eraId": "era-masters",
    "movement": "순수주의 / 근대건축 5원칙 / 브루탈리즘",
    "quote": "집은 살기 위한 기계다 (The house is a machine for living in).",
    "desc": "★근대건축 최고의 혁명가 / 4대 거장★. 돔-이노(Dom-Ino) 시스템, 근대건축 5원칙(필로티, 옥상정원, 자유로운 평면, 가로로 긴 창, 자유로운 입면), 인체 비례 모듈러(Modulor)를 확립했습니다. 후기에는 롱샹 성당과 찬디가르 도시계획을 통해 조각적 콘크리트 미학을 열었습니다.",
    "masterpiece": "빌라 사보아 (Villa Savoye, 1929), 롱샹 성당 (Ronchamp, 1954), 위니테 다비타시옹 (1952), 찬디가르 의사당",
    "tags": [
      "4대거장",
      "근대건축5원칙",
      "모듈러",
      "빌라사보아"
    ],
    "influences": [
      "oscar-niemeyer",
      "kenzo-tange",
      "louis-kahn",
      "kim-chung-up",
      "tadao-ando",
      "smithsons",
      "richard-meier",
      "rem-koolhaas"
    ],
    "influencedBy": [
      "peter-behrens",
      "auguste-perret",
      "adolf-loos"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Le_Corbusier_(1964).jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/VillaSavoye.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Maison_Dom-ino.png?width=800",
    "philosophyKeywords": [
      "근대건축 5원칙",
      "주택은 살기 위한 기계",
      "모듈러 (Modulor)",
      "도미노 시스템",
      "브루탈리즘 노출콘크리트"
    ],
    "keyWorks": [
      {
        "name": "빌라 사보아 (Villa Savoye)",
        "year": 1931,
        "location": "프랑스 푸아시",
        "desc": "필로티, 옥상정원, 자유로운 평면, 수평띠창, 자유로운 입면의 5원칙 완결판"
      },
      {
        "name": "롱샹 성당 (Notre Dame du Haut)",
        "year": 1955,
        "location": "프랑스 롱샹",
        "desc": "게 껍데기 지붕과 색유리 빛구멍이 만드는 시적이고 영적인 조형"
      },
      {
        "name": "유니테 다비타시옹 (Unité d'Habitation)",
        "year": 1952,
        "location": "프랑스 마르세유",
        "desc": "전후 주택난을 해결한 자족형 집합주거의 원형"
      }
    ],
    "anecdote": "도미노(Dom-Ino) 시스템으로 슬래브와 기둥만으로 집을 짓는 현대 건축의 골격을 정의했습니다. 한국의 김중업 건축가가 그의 파리 아틀리에에서 3년 2개월간 사사하여 한국 현대건축의 기틀을 닦았습니다."
  },
  {
    "id": "alvar-aalto",
    "nameKo": "알바 알토",
    "nameEn": "Alvar Aalto",
    "birth": 1898,
    "death": 1976,
    "country": "핀란드",
    "eraId": "era-masters",
    "movement": "북유럽 유기적 모더니즘 (Humanistic Modernism)",
    "quote": "형태는 반드시 인간적인 내용을 담아야 한다.",
    "desc": "★근대 5대 거장으로 꼽히는 북유럽의 거목★. 차가운 기계주의 모더니즘에 반대하여 목재, 붉은 벽돌, 자연광, 물결치는 곡선을 도입한 따뜻한 휴머니즘 건축을 실현했습니다. 가구와 조명까지 토털 디자인했습니다.",
    "masterpiece": "파이미오 결핵요양원 (1933), 빌라 마이레아 (Villa Mairea, 1939), 핀란디아 홀",
    "tags": [
      "북유럽모더니즘",
      "휴머니즘",
      "자연친화",
      "가구디자인"
    ],
    "influences": [
      "alvaro-siza",
      "eero-saarinen"
    ],
    "influencedBy": [
      "frank-lloyd-wright"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Alvar_Aalto_1945.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Villa_Mairea_03.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Villa_Mairea_ground_plan.png?width=800",
    "philosophyKeywords": [
      "스칸디나비안 휴머니즘",
      "곡면 자작나무",
      "자연광 루버",
      "유기적 지역주의"
    ],
    "keyWorks": [
      {
        "name": "빌라 마이레아 (Villa Mairea)",
        "year": 1939,
        "location": "핀란드 노르마르쿠",
        "desc": "핀란드 숲의 감성과 유기적 목재가 빚어낸 주거 건축의 최고봉"
      },
      {
        "name": "파이미오 요양원 (Paimio Sanatorium)",
        "year": 1933,
        "location": "핀란드 파이미오",
        "desc": "결핵 환자의 심리와 빛, 공기를 치밀하게 배려한 치유의 기능주의"
      }
    ],
    "anecdote": "기하학적 기계 미학에 경도되던 모더니즘에 따뜻한 북유럽 목재와 곡선, 부드러운 천창 자연광을 불어넣어 '인간의 얼굴을 한 근대건축'을 완성했습니다."
  },
  {
    "id": "erich-mendelsohn",
    "nameKo": "에리히 멘델존",
    "nameEn": "Erich Mendelsohn",
    "birth": 1887,
    "death": 1953,
    "country": "독일 / 미국",
    "eraId": "era-masters",
    "movement": "표현주의 건축 (Expressionism)",
    "quote": "기능과 역동적 에너지는 하나의 유기적 껍질로 응축되어야 한다.",
    "desc": "엄격한 직선 기능주의와 대비되는 역동적이고 조각적인 유선형 콘크리트 형태를 시도했습니다. 아인슈타인의 상대성 이론을 기념하기 위한 아인슈타인 탑은 20세기 조소적 건축의 금자탑입니다.",
    "masterpiece": "아인슈타인 탑 (Einstein Tower, 포츠담, 1921), 쇼켄 백화점",
    "tags": [
      "표현주의",
      "유선형건축",
      "조각적형태"
    ],
    "influences": [
      "eero-saarinen"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "표현주의",
      "유선형건축",
      "조각적형태"
    ],
    "keyWorks": [
      {
        "name": "아인슈타인 탑 (Einstein Tower",
        "year": 1927,
        "location": "독일 / 미국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "에리히 멘델존 건축가는 표현주의 건축 (Expressionism)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "gerrit-rietveld",
    "nameKo": "게리트 리트벨트",
    "nameEn": "Gerrit Rietveld",
    "birth": 1888,
    "death": 1964,
    "country": "네덜란드",
    "eraId": "era-masters",
    "movement": "데 스틸 (De Stijl) / 신조형주의",
    "quote": "공간은 삼원색과 무채색의 면들이 허공에서 교차할 때 비로소 드러난다.",
    "desc": "몬드리안의 추상 회화를 3차원 공간으로 옮겨놓은 건축가이자 가구 디자이너입니다. 적청 의자와 슈뢰더 하우스를 통해 평면 분할과 가변형 공간의 급진적 모더니즘을 실현했습니다.",
    "masterpiece": "슈뢰더 하우스 (Rietveld Schröder House, 1924), 적청 의자 (Red and Blue Chair)",
    "tags": [
      "데스틸",
      "신조형주의",
      "슈뢰더하우스"
    ],
    "influences": [],
    "influencedBy": [
      "hendrik-berlage"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Gerrit_Rietveld_1954.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rietveld_Schr%C3%B6derhuis_2011.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rietveld_Schroder_House_first_floor_plan.png?width=800",
    "philosophyKeywords": [
      "데 스틸 (De Stijl)",
      "삼원색과 무채색",
      "슈뢰더 저택",
      "적청 의자"
    ],
    "keyWorks": [
      {
        "name": "슈뢰더 저택 (Rietveld Schröder House)",
        "year": 1924,
        "location": "네덜란드 위트레흐트",
        "desc": "몬드리안 회화를 3차원 공간으로 구현한 유동적 슬라이딩 벽체 주택"
      }
    ],
    "anecdote": "가구 장인 출신으로, 선과 면을 분리하여 삼원색(빨강, 파랑, 노랑)과 흑백회색으로 조립한 슈뢰더 하우스는 근대 공간 분할의 전설이 되었습니다."
  },
  {
    "id": "marcel-breuer",
    "nameKo": "마르셀 브로이어",
    "nameEn": "Marcel Breuer",
    "birth": 1902,
    "death": 1981,
    "country": "헝가리 / 미국",
    "eraId": "era-masters",
    "movement": "바우하우스 / 브루탈리즘",
    "quote": "구조의 무거움과 가벼움의 대비에서 현대 건축의 시적 긴장이 발생한다.",
    "desc": "강관 파이프를 이용한 바실리 체어(Wassily Chair)로 가구 디자인에 혁명을 일으킨 바우하우스의 수제자. 미국 망명 후 그로피우스와 협업하고 거대한 콘크리트 질감의 브루탈리즘 건축을 완성했습니다.",
    "masterpiece": "바실리 의자 (1925), 옛 휘트니 미술관 (현 프릭 매디슨, 1966), 유네스코 파리 본부",
    "tags": [
      "바우하우스",
      "바실리체어",
      "브루탈리즘"
    ],
    "influences": [],
    "influencedBy": [
      "walter-gropius"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Marcel_Breuer_1955.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Whitney_Museum_Marcel_Breuer.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Whitney_Museum_section_Breuer.png?width=800",
    "philosophyKeywords": [
      "바우하우스 1기",
      "바실리 체어 (강관 가구)",
      "조각적 브루탈리즘"
    ],
    "keyWorks": [
      {
        "name": "휘트니 미술관 (구 메트 브로이어)",
        "year": 1966,
        "location": "미국 뉴욕",
        "desc": "화강암 캔틸레버 계단형 입면과 독특한 사다리꼴 창"
      },
      {
        "name": "바실리 체어 (Wassily Chair)",
        "year": 1925,
        "location": "독일",
        "desc": "자전거 핸들 파이프에서 착안한 최초의 강관 의자"
      }
    ],
    "anecdote": "바우하우스 학생 시절 자전거 핸들의 휨새에서 영감을 얻어 파이프 의자를 발명했고, 이후 거대한 캔틸레버 콘크리트 조각 건축으로 이름을 떨쳤습니다."
  },
  {
    "id": "louis-kahn",
    "nameKo": "루이스 칸",
    "nameEn": "Louis Kahn",
    "birth": 1901,
    "death": 1974,
    "country": "미국",
    "eraId": "era-postwar",
    "movement": "기념비적 모더니즘 / 침묵과 빛의 철학",
    "quote": "벽돌에게 '너는 무엇이 되고 싶니?'라고 물으면, 벽돌은 '아치가 되고 싶어요'라고 답한다.",
    "desc": "20세기 후반 최고의 영적 거장. 르 코르뷔지에와 미스의 기계론적 상업주의 모더니즘을 넘어서, 로마 유적과 고대 신전의 원초적 질서, 기하학, 빛과 그림자의 침묵을 되살렸습니다. '주공간(Served Space)'과 '부공간(Servant Space)'의 개념을 제시했습니다.",
    "masterpiece": "솔크 생물학 연구소 (Salk Institute, 1965), 킴벨 미술관 (Kimbell Art Museum, 1972), 방글라데시 국회의사당",
    "tags": [
      "빛과침묵",
      "원초적기하학",
      "솔크연구소",
      "벽돌의의지"
    ],
    "influences": [
      "robert-venturi",
      "renzo-piano",
      "tadao-ando"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Louis_Kahn.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Salk_Institute_-_panoramio.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Salk_Institute_plan.png?width=800",
    "philosophyKeywords": [
      "침묵과 빛 (Silence and Light)",
      "봉사하는 공간과 봉사받는 공간",
      "벽돌아, 넌 무엇이 되고 싶니?",
      "원초적 기하학"
    ],
    "keyWorks": [
      {
        "name": "소크 생물학 연구소 (Salk Institute)",
        "year": 1965,
        "location": "미국 샌디에이고",
        "desc": "태평양을 향해 트인 트래버틴 광장과 포졸라나 콘크리트 연구동"
      },
      {
        "name": "방글라데시 국회의사당",
        "year": 1982,
        "location": "방글라데시 다카",
        "desc": "물 위에 떠 있는 원과 삼각 개구부의 원초적 빛의 요새"
      },
      {
        "name": "킴벨 미술관 (Kimbell Art Museum)",
        "year": 1972,
        "location": "미국 텍사스",
        "desc": "사이클로이드 볼트 천창을 타고 쏟아지는 은빛 자연광"
      }
    ],
    "anecdote": "'벽돌에게 너는 무엇이 되고 싶니 물으면, 벽돌은 나는 아치가 되고 싶어라고 답한다'는 유명한 철학을 설파하며 20세기 후반 건축가들에게 가장 심오한 영감을 불어넣었습니다."
  },
  {
    "id": "philip-johnson",
    "nameKo": "필립 존슨",
    "nameEn": "Philip Johnson",
    "birth": 1906,
    "death": 2005,
    "country": "미국",
    "eraId": "era-postwar",
    "movement": "국제주의 양식 -> 포스트모더니즘",
    "quote": "나는 매춘부처럼 시대의 유행을 사랑하며, 건축은 스타일의 게임이다.",
    "desc": "MoMA 초대 건축 큐레이터로서 1932년 《국제주의 양식》 전시를 통해 모더니즘을 미국에 상륙시켰습니다. 글래스 하우스로 미스를 찬양하다가, 1980년대에는 AT&T 빌딩으로 포스트모더니즘의 기수가 되었고 초대 프리츠커상을 수상했습니다.",
    "masterpiece": "글래스 하우스 (Glass House, 1949), 시그램 빌딩 (미스와 협업), AT&T 본사 빌딩",
    "tags": [
      "국제주의전시기획",
      "초대프리츠커",
      "카멜레온건축가"
    ],
    "influences": [
      "peter-eisenman"
    ],
    "influencedBy": [
      "walter-gropius",
      "ludwig-mies"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Philip_Johnson_1964.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/The_Glass_House_New_Canaan.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Glass_House_plan_Johnson.png?width=800",
    "philosophyKeywords": [
      "국제주의 양식 명명자",
      "글래스 하우스",
      "포스트모던 AT&T 빌딩"
    ],
    "keyWorks": [
      {
        "name": "글래스 하우스 (The Glass House)",
        "year": 1949,
        "location": "미국 코네티컷",
        "desc": "미스의 판스워스 주택을 번안해 지은 검은 철골 유리 파빌리온"
      },
      {
        "name": "AT&T 빌딩 (소니 타워)",
        "year": 1984,
        "location": "미국 뉴욕",
        "desc": "치펜데일 가구 꼭대기를 얹어 포스트모더니즘의 시작을 알린 마천루"
      }
    ],
    "anecdote": "1932년 MoMA 전시를 통해 '국제주의 양식'이란 말을 처음 만들었고, 제1회 프리츠커상을 수상했습니다. 미스 반 데어 로에의 제자이자 시그램 빌딩의 현지 파트너였습니다."
  },
  {
    "id": "oscar-niemeyer",
    "nameKo": "오스카 니마이어",
    "nameEn": "Oscar Niemeyer",
    "birth": 1907,
    "death": 2012,
    "country": "브라질",
    "eraId": "era-postwar",
    "movement": "열대 모더니즘 / 유기적 곡선 콘크리트",
    "quote": "내가 매료되는 것은 인간이 만든 차가운 직선이 아니라 자유롭고 관능적인 곡선이다.",
    "desc": "104세까지 현역으로 활약한 브라질의 국민 건축가. 코르뷔지에와의 교류를 바탕으로 신수도 브라질리아의 주요 국가 건물을 설계하며 철근 콘크리트로 자유로운 곡선의 조각적 유토피아를 완성했습니다.",
    "masterpiece": "브라질리아 대성당 (1970), 니테로이 현대미술관 (MAC, 1996), UN 본부 (코르뷔지에 등과 협업)",
    "tags": [
      "곡선콘크리트",
      "브라질리아",
      "열대모더니즘"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Oscar_Niemeyer_1968.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Congresso_Nacional_Brasilia.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Brasilia_Cathedral_plan.png?width=800",
    "philosophyKeywords": [
      "브라질리아 신수도 계획",
      "곡면 철근 콘크리트",
      "자유로운 조형미"
    ],
    "keyWorks": [
      {
        "name": "브라질 의회의사당 & 브라질리아 대성당",
        "year": 1960,
        "location": "브라질 브라질리아",
        "desc": "쌍둥이 타워와 접시형 돔이 빚어낸 미래파 도시의 상징"
      }
    ],
    "anecdote": "르 코르뷔지에와 함께 뉴욕 UN 본부를 설계했으며 '여성의 몸과 카리오카 산맥의 관능적 곡선을 콘크리트로 노래한다'며 104세까지 왕성히 설계했습니다."
  },
  {
    "id": "eero-saarinen",
    "nameKo": "에로 사리넨",
    "nameEn": "Eero Saarinen",
    "birth": 1910,
    "death": 1961,
    "country": "미국 / 핀란드",
    "eraId": "era-postwar",
    "movement": "구조적 표현주의 / 미래주의 모더니즘",
    "quote": "건축물의 목적은 인간의 삶을 감싸 안고, 긍정하며, 고양시키는 것이다.",
    "desc": "엘리엘 사리넨의 아들. 제트기 시대의 역동성을 날아오르는 새의 날개 모양 셸 콘크리트로 구현한 TWA 터미널과 스테인리스 스틸로 솟구친 세인트루이스 아치로 기술과 조형의 극적인 결합을 선보였습니다.",
    "masterpiece": "TWA 비행 센터 (1962), 세인트루이스 게이트웨이 아치 (1965), 덜레스 국제공항",
    "tags": [
      "셸구조",
      "TWA터미널",
      "게이트웨이아치"
    ],
    "influences": [],
    "influencedBy": [
      "frank-lloyd-wright",
      "erich-mendelsohn",
      "alvar-aalto"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Eero_Saarinen_1954.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/TWA_Terminal_JFK.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/TWA_Flight_Center_plan.png?width=800",
    "philosophyKeywords": [
      "유기적 쉘 구조",
      "새가 날아오르는 형상",
      "튤립 체어"
    ],
    "keyWorks": [
      {
        "name": "JFK 공항 TWA 비행 센터",
        "year": 1962,
        "location": "미국 뉴욕",
        "desc": "콘크리트 날개를 펼치고 비상하는 독수리 형상의 터미널"
      },
      {
        "name": "세인트루이스 게이트웨이 아치",
        "year": 1965,
        "location": "미국 세인트루이스",
        "desc": "192m 높이 스테인리스강 현수선 아치의 장관"
      }
    ],
    "anecdote": "엘리엘 사리넨의 아들로 태어나 케네디 공항 TWA 터미널의 자유곡선 쉘을 창조했습니다. 시드니 오페라 하우스 공모전 심사위원으로 출품작 중 탈락 쓰레기통에 버려져 있던 요른 웃손의 스케치를 구출해 당선시킨 일화로 유명합니다."
  },
  {
    "id": "kenzo-tange",
    "nameKo": "단게 겐조",
    "nameEn": "Kenzo Tange (丹下健三)",
    "birth": 1913,
    "death": 2005,
    "country": "일본",
    "eraId": "era-postwar",
    "movement": "구조주의 / 메타볼리즘 (Metabolism)의 대부",
    "quote": "오직 아름다운 것만이 진정으로 기능적일 수 있다.",
    "desc": "아시아 최초의 프리츠커상 수상자. 르 코르뷔지에의 콘크리트 조형미를 일본 전통 목조 가구식 가구 구조와 결합했습니다. 도쿄만 계획(1960)을 통해 메타볼리즘 운동을 이끌었으며 일본 현대건축 황금세대의 위대한 산실이 되었습니다.",
    "masterpiece": "국립 요요기 경기장 (1964), 히로시마 평화기념공원 자료관 (1955), 도쿄도청사",
    "tags": [
      "메타볼리즘",
      "요요기경기장",
      "일본현대건축의아버지"
    ],
    "influences": [
      "kisho-kurokawa",
      "toyo-ito",
      "kim-swoo-geun"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kenzo_Tange_1964.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Yoyogi_National_Gymnasium_01.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Yoyogi_Gymnasium_section_plan.png?width=800",
    "philosophyKeywords": [
      "메타볼리즘 대부",
      "도쿄 올림픽 요요기 체육관",
      "일본 전통과 근대 구조의 결합"
    ],
    "keyWorks": [
      {
        "name": "요요기 국립 실내경기장",
        "year": 1964,
        "location": "일본 도쿄",
        "desc": "케이블 현수 구조 지붕이 만들어낸 신사(神社) 처마의 현대적 부활"
      },
      {
        "name": "히로시마 평화기념자료관",
        "year": 1955,
        "location": "일본 히로시마",
        "desc": "필로티 위에 띄워진 비극을 딛고 선 콘크리트 추모 공간"
      }
    ],
    "anecdote": "르 코르뷔지에의 콘크리트 브루탈리즘을 흡수하여 아시아 최초로 프리츠커상을 수상했으며, 구로카와 기쇼, 이소자키 아라타, 마키 후미히코를 길러내 일본 현대건축 황금기를 열었습니다."
  },
  {
    "id": "paul-rudolph",
    "nameKo": "폴 루돌프",
    "nameEn": "Paul Rudolph",
    "birth": 1918,
    "death": 1997,
    "country": "미국",
    "eraId": "era-postwar",
    "movement": "헤비 브루탈리즘 (Heroic Brutalism)",
    "quote": "공간의 극적인 연속성과 복잡한 단면이야말로 건축의 본질이다.",
    "desc": "예일대 건축학부 학장으로 수많은 거장(노먼 포스터, 리처드 로저스 등)을 길러냈습니다. 골을 파낸 거친 콘크리트(Corduroy Concrete)와 미로 같은 37단계 스킵플로어 레벨로 브루탈리즘의 극치를 보여주었습니다.",
    "masterpiece": "예일대 예술건축학부 건물 (A&A Building, 1963)",
    "tags": [
      "브루탈리즘",
      "예일대스승",
      "거친콘크리트"
    ],
    "influences": [
      "norman-foster",
      "richard-rogers"
    ],
    "influencedBy": [
      "walter-gropius"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "브루탈리즘",
      "예일대스승",
      "거친콘크리트"
    ],
    "keyWorks": [
      {
        "name": "예일대 예술건축학부 건물 (A&A Building",
        "year": 1958,
        "location": "미국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "폴 루돌프 건축가는 헤비 브루탈리즘 (Heroic Brutalism)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "smithsons",
    "nameKo": "앨리슨 & 피터 스미스슨",
    "nameEn": "Alison & Peter Smithson",
    "birth": 1928,
    "death": 1993,
    "country": "영국",
    "eraId": "era-postwar",
    "movement": "뉴 브루탈리즘 (New Brutalism) / 팀 텐 (Team 10)",
    "quote": "재료를 있는 그대로 노출하고 사람들의 일상적 관계를 공간화하라.",
    "desc": "CIAM의 획일적 교조주의에 반기를 들고 Team 10을 결성해 도시와 주거의 '공중 가로(Street in the Sky)' 개념을 제안했습니다. 배관, 덕트, 콘크리트를 가감 없이 노출하는 뉴 브루탈리즘을 선언했습니다.",
    "masterpiece": "로빈 후드 가든 (Robin Hood Gardens, 1972), 훈스탄톤 학교 (1954)",
    "tags": [
      "팀10",
      "뉴브루탈리즘",
      "공중가로"
    ],
    "influences": [
      "richard-rogers"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "팀10",
      "뉴브루탈리즘",
      "공중가로"
    ],
    "keyWorks": [
      {
        "name": "로빈 후드 가든 (Robin Hood Gardens",
        "year": 1968,
        "location": "영국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "앨리슨 & 피터 스미스슨 건축가는 뉴 브루탈리즘 (New Brutalism) / 팀 텐 (Team 10)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "kim-swoo-geun",
    "nameKo": "김수근",
    "nameEn": "Kim Swoo-geun (金壽根)",
    "birth": 1931,
    "death": 1986,
    "country": "한국",
    "eraId": "era-postwar",
    "movement": "한국 현대건축의 여명 / 공간(空間) 운동",
    "quote": "건축은 궁극의 자궁이며, 사랑이 잉태되는 그릇이다.",
    "desc": "도쿄대학 단게 겐조 연구실에서 수학 후 귀국하여 잡지 《공간》을 창간하고 한국 현대 문화예술 운동의 심장 역할을 했습니다. 붉은 벽돌과 복합적 스킵플로어로 한국 전통 골목길의 공간감을 현대화한 공간사옥을 남겼습니다.",
    "masterpiece": "공간 사옥 (원서동, 1977), 올림픽 주경기장 (잠실, 1984), 마산 양덕성당, 자유센터",
    "tags": [
      "한국현대건축",
      "공간사옥",
      "벽돌미학",
      "골목길공간"
    ],
    "influences": [],
    "influencedBy": [
      "kenzo-tange"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kim_Swoo-geun_architect.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Space_Group_Building_Seoul.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Space_Building_section_plan.png?width=800",
    "philosophyKeywords": [
      "한국 1세대 양대산맥",
      "궁극공간(Ultimate Space)",
      "벽돌 휴머니즘",
      "공간(SPACE)지 창간"
    ],
    "keyWorks": [
      {
        "name": "공간사옥 (현 아라리오뮤지엄)",
        "year": 1977,
        "location": "대한민국 서울",
        "desc": "검은 벽돌과 스킵플로어, 한옥의 골목길 공간을 압축한 걸작"
      },
      {
        "name": "서울올림픽 주경기장",
        "year": 1984,
        "location": "서울 잠실",
        "desc": "조선백자 도자기 곡선을 형상화한 스타디움"
      }
    ],
    "anecdote": "도쿄대에서 단게 겐조에게 수학 후 귀국하여 건축·도시·문화잡지 <월간 공간>을 창간하며 한국 현대 문화예술 운동의 산실 역할을 했습니다. 승효상 등 수많은 현대 건축가를 양성했습니다."
  },
  {
    "id": "kim-chung-up",
    "nameKo": "김중업",
    "nameEn": "Kim Chung-up (金重業)",
    "birth": 1922,
    "death": 1988,
    "country": "한국",
    "eraId": "era-postwar",
    "movement": "시적 모더니즘 / 한국적 조형의 현대화",
    "quote": "건축은 얼어붙은 음악이며, 시(詩)가 공간이 된 것이다.",
    "desc": "한국인 최초로 파리 세브르가 르 코르뷔지에 아틀리에에서 3년 2개월간 직속 사사했습니다. 한국 전통 처마의 우아한 곡선과 르 코르뷔지에의 조형 콘크리트를 접목한 주한 프랑스 대사관은 한국 근현대건축 최고의 걸작으로 꼽힙니다.",
    "masterpiece": "주한 프랑스 대사관 (1962), 삼일빌딩 (1970), 제주대학교 본관 (구 본관)",
    "tags": [
      "코르뷔지에직속제자",
      "프랑스대사관",
      "처마곡선",
      "한국건축거장"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kim_Chung-up_architect.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/French_Embassy_Seoul_Kim_Chung-up.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/French_Embassy_Seoul_plan.png?width=800",
    "philosophyKeywords": [
      "한국 1세대 거장",
      "르 코르뷔지에 유일의 한국인 직속 제자",
      "한국 전통 처마 곡선의 현대화"
    ],
    "keyWorks": [
      {
        "name": "주한 프랑스 대사관",
        "year": 1962,
        "location": "대한민국 서울",
        "desc": "한옥 처마의 부드러운 양감을 콘크리트 캔틸레버 지붕으로 승화시킨 한국 현대건축의 금자탑"
      },
      {
        "name": "삼일빌딩",
        "year": 1970,
        "location": "서울 종로",
        "desc": "미스의 시그램 빌딩을 재해석해 당시 한국 최고층 마천루를 기록한 건물"
      }
    ],
    "anecdote": "1952년 유네스코 회의 참석 중 르 코르뷔지에를 찾아가 담판을 짓고 파리 세브르가 35번지 아틀리에에 입성, 샹디가르 고등법원 설계 등에 직접 참여한 한국 모더니즘의 선구자입니다."
  },
  {
    "id": "kisho-kurokawa",
    "nameKo": "기쇼 구로카와",
    "nameEn": "Kisho Kurokawa (黒川紀章)",
    "birth": 1934,
    "death": 2007,
    "country": "일본",
    "eraId": "era-postwar",
    "movement": "메타볼리즘 (Metabolism)",
    "quote": "도시는 생명체처럼 증식하고 분열하고 교체될 수 있어야 한다.",
    "desc": "유기적 신진대사처럼 건물이 부품을 갈아끼우며 영구히 재생할 수 있다는 메타볼리즘의 이상을 나카긴 캡슐 타워로 세계에 선언했습니다.",
    "masterpiece": "나카긴 캡슐 타워 (Nakagin Capsule Tower, 1972), 국립신미술관",
    "tags": [
      "메타볼리즘",
      "캡슐타워",
      "모듈건축"
    ],
    "influences": [],
    "influencedBy": [
      "kenzo-tange"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "메타볼리즘",
      "캡슐타워",
      "모듈건축"
    ],
    "keyWorks": [
      {
        "name": "나카긴 캡슐 타워 (Nakagin Capsule Tower",
        "year": 1974,
        "location": "일본",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "기쇼 구로카와 건축가는 메타볼리즘 (Metabolism)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "robert-venturi",
    "nameKo": "로버트 벤투리",
    "nameEn": "Robert Venturi",
    "birth": 1925,
    "death": 2018,
    "country": "미국",
    "eraId": "era-postmodern",
    "movement": "포스트모더니즘 (Post-Modernism)",
    "quote": "Less is a bore (적은 것은 지루하다)!",
    "desc": "『건축의 복합성과 대립성(1966)』, 『라스베이거스의 교훈(1972)』을 통해 모더니즘의 엄숙함과 단순성을 통타하고 역사적 장식, 은유, 위트, 이중적 의미를 건축에 되돌려놓은 포스트모더니즘의 창시자입니다.",
    "masterpiece": "바나 벤투리 하우스 (Vanna Venturi House, 1964), 세인즈버리 윙 (내셔널 갤러리 확장)",
    "tags": [
      "LessIsABore",
      "포스트모더니즘시초",
      "복합성과대립성"
    ],
    "influences": [],
    "influencedBy": [
      "louis-kahn",
      "ludwig-mies"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Robert_Venturi.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Vanna_Venturi_House_1.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Vanna_Venturi_House_plan.png?width=800",
    "philosophyKeywords": [
      "Less is a bore (적은 것은 지루하다)",
      "건축의 복합성과 대립성",
      "포스트모더니즘의 기수",
      "오리(Duck)와 장식된 헛간(Decorated Shed)"
    ],
    "keyWorks": [
      {
        "name": "어머니의 집 (바나 벤투리 하우스)",
        "year": 1964,
        "location": "미국 펜실베이니아",
        "desc": "박공지붕을 반으로 쪼개고 역사적 상징을 유쾌하게 비튼 포스트모더니즘의 시초"
      },
      {
        "name": "라스베이거스의 교훈 (책)",
        "year": 1972,
        "location": "저서",
        "desc": "팝아트와 상업 간판에서 대중적 활력을 발견한 건축 이론서"
      }
    ],
    "anecdote": "미스의 'Less is more'에 맞서 'Less is a bore'를 외치며 획일적 모더니즘에 반기를 들었습니다. 어머니를 위해 지은 작은 주택 한 채로 전 세계 건축계의 패러다임을 뒤흔들었습니다."
  },
  {
    "id": "aldo-rossi",
    "nameKo": "알도 로시",
    "nameEn": "Aldo Rossi",
    "birth": 1931,
    "death": 1997,
    "country": "이탈리아",
    "eraId": "era-postmodern",
    "movement": "네오-합리주의 (Neo-Rationalism) / 텐덴차 (Tendenza)",
    "quote": "도시는 인류의 집단 기억(Collective Memory)이 침전된 거대한 기념비다.",
    "desc": "『도시의 건축(1966)』에서 도시의 역사적 유형학(Typology)과 영속성을 역설했습니다. 원뿔, 삼각 박공, 원통 등 원형적 기하학 형태를 사용하여 침묵과 향수를 자아내는 형이상학적 건축을 선보였습니다.",
    "masterpiece": "산 카탈도 공동묘지 (San Cataldo Cemetery, 모데나, 1971), 갈라라테세 주거단지",
    "tags": [
      "도시의건축",
      "집단기억",
      "유형학",
      "네오합리주의"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "도시의건축",
      "집단기억",
      "유형학",
      "네오합리주의"
    ],
    "keyWorks": [
      {
        "name": "산 카탈도 공동묘지 (San Cataldo Cemetery",
        "year": 1971,
        "location": "이탈리아",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "알도 로시 건축가는 네오-합리주의 (Neo-Rationalism) / 텐덴차 (Tendenza)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "james-stirling",
    "nameKo": "제임스 스털링",
    "nameEn": "James Stirling",
    "birth": 1926,
    "death": 1992,
    "country": "영국",
    "eraId": "era-postmodern",
    "movement": "영국 포스트모더니즘",
    "quote": "건축은 과거의 단편들을 자유롭게 조립하는 콜라주 놀이다.",
    "desc": "초기 붉은 타일의 공학적 기능주의에서 시작해, 후기에는 역사적 모티브와 팝 컬러(연두, 분홍 등)를 대담하게 결합한 콜라주 포스트모더니즘의 절정을 보여주었습니다. 영국 최고 권위의 '스털링 상'에 이름을 남겼습니다.",
    "masterpiece": "슈투트가르트 신 주립미술관 (Neue Staatsgalerie, 1984), 레스터대 공학부 건물",
    "tags": [
      "스털링상",
      "역사적콜라주",
      "영국포스트모던"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "스털링상",
      "역사적콜라주",
      "영국포스트모던"
    ],
    "keyWorks": [
      {
        "name": "슈투트가르트 신 주립미술관 (Neue Staatsgalerie",
        "year": 1966,
        "location": "영국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "제임스 스털링 건축가는 영국 포스트모더니즘의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "richard-meier",
    "nameKo": "리처드 마이어",
    "nameEn": "Richard Meier",
    "birth": 1934,
    "death": null,
    "country": "미국",
    "eraId": "era-postmodern",
    "movement": "뉴욕 파이브 (New York Five) / 네오-코르뷔지안 백색건축",
    "quote": "백색은 모든 다른 색채를 가장 또렷하게 증폭시키는 빛의 색이다.",
    "desc": "뉴욕 파이브의 대표 주자. 초기 르 코르뷔지에의 순수주의 백색 빌라 미학을 극한의 기하학적 정밀함과 현대적 에나멜 패널로 계승 발전시켜 평생 순백(White)의 건축을 고수한 거장입니다.",
    "masterpiece": "게티 센터 (The Getty Center, LA, 1997), 더글러스 하우스 (1973), 바르셀로나 현대미술관 (MACBA)",
    "tags": [
      "뉴욕파이브",
      "백색건축",
      "게티센터",
      "빛과그리드"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "뉴욕파이브",
      "백색건축",
      "게티센터",
      "빛과그리드"
    ],
    "keyWorks": [
      {
        "name": "게티 센터 (The Getty Center",
        "year": 1974,
        "location": "미국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "리처드 마이어 건축가는 뉴욕 파이브 (New York Five) / 네오-코르뷔지안 백색건축의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "peter-eisenman",
    "nameKo": "피터 아이젠만",
    "nameEn": "Peter Eisenman",
    "birth": 1932,
    "death": null,
    "country": "미국",
    "eraId": "era-postmodern",
    "movement": "해체주의 (Deconstructivism) / 자율적 건축이론",
    "quote": "건축은 인간 중심주의적 안락함과 기만적인 조화를 깨부수어야 한다.",
    "desc": "철학자 자크 데리다의 탈구축(해체) 이론을 건축에 도입한 최고 이론가. 기능과 거주성을 거부하고 그리드의 회전, 뒤틀림, 중첩을 통해 자율적인 형태 생성을 추구했습니다.",
    "masterpiece": "베를린 홀로코스트 기념비 (2005), 웩스너 예술센터 (1989), 하우스 VI",
    "tags": [
      "해체주의",
      "홀로코스트기념비",
      "그리드해체"
    ],
    "influences": [
      "daniel-libeskind"
    ],
    "influencedBy": [
      "philip-johnson"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "해체주의",
      "홀로코스트기념비",
      "그리드해체"
    ],
    "keyWorks": [
      {
        "name": "베를린 홀로코스트 기념비 (2005)",
        "year": 1972,
        "location": "미국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "피터 아이젠만 건축가는 해체주의 (Deconstructivism) / 자율적 건축이론의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "frank-gehry",
    "nameKo": "프랭크 게리",
    "nameEn": "Frank Gehry",
    "birth": 1929,
    "death": null,
    "country": "캐나다 / 미국",
    "eraId": "era-postmodern",
    "movement": "해체주의 / 디지털 조각건축",
    "quote": "건축이 꼭 직각이어야 할 이유가 도대체 어디 있는가?",
    "desc": "쇠락해가던 스페인의 공업도시 빌바오를 '빌바오 구겐하임' 하나로 세계적 문화 관광도시로 변모시킨(빌바오 효과) 현대 건축의 슈퍼스타. 항공우주 3D 소프트웨어 CATIA를 활용해 춤추는 듯한 티타늄 곡면의 스펙터클을 탄생시켰습니다.",
    "masterpiece": "빌바오 구겐하임 미술관 (1997), LA 월트 디즈니 콘서트홀 (2003), 게리 레지던스",
    "tags": [
      "빌바오효과",
      "티타늄곡면",
      "해체주의",
      "조각적형태"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Frank_Gehry_1997.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Guggenheim_Museum_Bilbao_July_2010.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Guggenheim_Bilbao_ground_plan.png?width=800",
    "philosophyKeywords": [
      "해체주의 (Deconstructivism)",
      "빌바오 효과 (Bilbao Effect)",
      "티타늄 물고기 비늘 곡면",
      "디지털 항공 소프트웨어(CATIA) 도입"
    ],
    "keyWorks": [
      {
        "name": "구겐하임 빌바오 미술관",
        "year": 1997,
        "location": "스페인 빌바오",
        "desc": "쇠락해가던 공업도시 빌바오를 세계적 문화 메카로 부활시킨 기적의 티타늄 꽃"
      },
      {
        "name": "월트 디즈니 콘서트홀",
        "year": 2003,
        "location": "미국 LA",
        "desc": "돛을 올리고 항해하는 범선을 연상시키는 스테인리스 곡면 콘서트홀"
      }
    ],
    "anecdote": "프랑스 전투기 설계 프로그램인 CATIA를 건축에 최초로 도입하여 이전에는 손으로 도면을 칠 수 없었던 복합 비정형 곡면을 시공 가능하게 만든 디지털 건축의 개척자입니다."
  },
  {
    "id": "rem-koolhaas",
    "nameKo": "렘 콜하스",
    "nameEn": "Rem Koolhaas",
    "birth": 1944,
    "death": null,
    "country": "네덜란드",
    "eraId": "era-postmodern",
    "movement": "네오 아방가르드 / 초현대 리서치 아키텍처 (OMA)",
    "quote": "순응이 아니라 불안정성이야말로 도시의 가장 창의적인 동력이다.",
    "desc": "★현대 건축의 가장 영향력 있는 사상가이자 산실★. 저널리스트 출신으로 『정신착란의 뉴욕』, 『S,M,L,XL』 등 기념비적 저작을 남겼으며 OMA를 이끌며 거대도시 자본주의를 전복적 개념으로 해부했습니다. 자하 하디드, 비야케 잉겔스(BIG) 등이 그의 사무실을 거쳤습니다.",
    "masterpiece": "베이징 CCTV 본사 (2012), 시애틀 공공도서관 (2004), 서울대 미술관(MoA), 리움미술관 아동교육문화센터",
    "tags": [
      "현대건축의산실",
      "OMA",
      "정신착란의뉴욕",
      "CCTV본사"
    ],
    "influences": [
      "zaha-hadid",
      "bjarke-ingels"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rem_Koolhaas.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/CCTV_headquarters_December_2008.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/CCTV_Headquarters_diagram_loop.png?width=800",
    "philosophyKeywords": [
      "거대함 (Bigness)",
      "OMA (Office for Metropolitan Architecture)",
      "정크스페이스 (Junkspace)",
      "현대 건축계 최고의 사상가"
    ],
    "keyWorks": [
      {
        "name": "CCTV 베이징 본사",
        "year": 2012,
        "location": "중국 베이징",
        "desc": "마천루의 수직성을 비틀어 뫼비우스의 띠처럼 꺾어 연결한 루프형 구조"
      },
      {
        "name": "시애틀 중앙도서관",
        "year": 2004,
        "location": "미국 시애틀",
        "desc": "책의 나선형 서고(Book Spiral)와 다이아몬드 유리망 구조의 혁신"
      },
      {
        "name": "서울대 미술관 (MoA)",
        "year": 2005,
        "location": "대한민국 서울",
        "desc": "캠퍼스 경사지에 캔틸레버로 띄운 공중 부유 볼륨"
      }
    ],
    "anecdote": "저널리스트 및 영화 시나리오 작가 출신으로 현대 자본주의와 도시를 가장 날카롭게 해부하는 지성입니다. OMA를 통해 자하 하디드, 비야케 잉겔스(BIG), 위니 마스(MVRDV) 등 21세기 건축 스타군단을 배출했습니다."
  },
  {
    "id": "zaha-hadid",
    "nameKo": "자하 하디드",
    "nameEn": "Zaha Hadid",
    "birth": 1950,
    "death": 2016,
    "country": "이라크 / 영국",
    "eraId": "era-postmodern",
    "movement": "해체주의 / 파라메트릭 유체역학 건축",
    "quote": "360도가 있는데 굳이 한 각도(직각)만 고집할 필요가 있을까?",
    "desc": "여성 최초의 프리츠커상 수상자. 렘 콜하스의 제자로서 초기에는 종이 위의 환상적 페인팅에 머물렀으나, 첨단 알고리즘 설계(파라메트릭 디자인)로 중력을 거스르는 유기적 곡선과 유체적 흐름의 거대한 랜드마크를 세계 곳곳에 구현했습니다.",
    "masterpiece": "동대문디자인플라자 (DDP, 2014), 광저우 오페라하우스 (2010), 비트라 소방서 (1993)",
    "tags": [
      "DDP",
      "파라메트릭",
      "여성최초프리츠커",
      "유동적곡면"
    ],
    "influences": [],
    "influencedBy": [
      "rem-koolhaas"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Zaha_Hadid_in_Heydar_Aliyev_Cultural_Center_02.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Heydar_Aliyev_Center_01.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Heydar_Aliyev_Center_cross_section.png?width=800",
    "philosophyKeywords": [
      "곡선의 여왕",
      "파라메트릭 디자인",
      "여성 최초 프리츠커상 수상",
      "중력을 거스르는 유체 역학"
    ],
    "keyWorks": [
      {
        "name": "동대문디자인플라자 (DDP)",
        "year": 2014,
        "location": "대한민국 서울",
        "desc": "45,133장의 각기 다른 알루미늄 패널로 구현한 도심 속 은빛 비정형 우주선"
      },
      {
        "name": "헤이다르 알리예프 센터",
        "year": 2012,
        "location": "아제르바이잔 바쿠",
        "desc": "바닥과 벽, 지붕이 끊김 없이 하나로 흐르는 유체 파사드의 절정"
      }
    ],
    "anecdote": "런던 AA스쿨 시절 렘 콜하스의 지도를 받았으며, 너무 급진적인 드로잉 탓에 '종이 건축가'라 불리다 컴퓨터 알고리즘과 첨단 시공법의 발달과 함께 지구상에서 가장 거대한 곡면들을 실현시켰습니다."
  },
  {
    "id": "daniel-libeskind",
    "nameKo": "다니엘 리베스킨트",
    "nameEn": "Daniel Libeskind",
    "birth": 1946,
    "death": null,
    "country": "폴란드 / 미국",
    "eraId": "era-postmodern",
    "movement": "서사적 해체주의 (Narrative Deconstructivism)",
    "quote": "공간은 비극의 상처와 역사적 기억을 증언할 수 있어야 한다.",
    "desc": "베를린 유대인 박물관에서 찢겨진 아연 외벽과 비스듬한 바닥, 공허의 보이드(Void)를 통해 홀로코스트의 비극적 기억을 온몸으로 체험하게 만든 건축가. 뉴욕 9·11 그라운드 제로 마스터플랜 당선자이기도 합니다.",
    "masterpiece": "베를린 유대인 박물관 (Jewish Museum Berlin, 2001), 부산 해운대 아이파크",
    "tags": [
      "유대인박물관",
      "상처의건축",
      "보이드",
      "기억의서사"
    ],
    "influences": [],
    "influencedBy": [
      "peter-eisenman"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "유대인박물관",
      "상처의건축",
      "보이드",
      "기억의서사"
    ],
    "keyWorks": [
      {
        "name": "베를린 유대인 박물관 (Jewish Museum Berlin",
        "year": 1986,
        "location": "폴란드 / 미국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "다니엘 리베스킨트 건축가는 서사적 해체주의 (Narrative Deconstructivism)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "bernard-tschumi",
    "nameKo": "버나드 츄미",
    "nameEn": "Bernard Tschumi",
    "birth": 1944,
    "death": null,
    "country": "스위스 / 프랑스",
    "eraId": "era-postmodern",
    "movement": "사건의 건축 / 해체주의",
    "quote": "형태는 기능을 따르는 것이 아니라 형태와 프로그램은 충돌한다.",
    "desc": "형태와 프로그램, 사건(Event)의 해체를 선언하며 1988년 MoMA 해체주의 전시를 피터 아이젠만 등과 함께 이끌었습니다. 파리 라 빌레트 공원에 120m 격자로 배치된 붉은 폴리(Folie)들을 통해 질서와 우연성의 공존을 실험했습니다.",
    "masterpiece": "파리 라 빌레트 공원 (Parc de la Villette, 1987), 아크로폴리스 박물관",
    "tags": [
      "라빌레트공원",
      "폴리(Folie)",
      "사건의건축"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "라빌레트공원",
      "폴리(Folie)",
      "사건의건축"
    ],
    "keyWorks": [
      {
        "name": "파리 라 빌레트 공원 (Parc de la Villette",
        "year": 1984,
        "location": "스위스 / 프랑스",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "버나드 츄미 건축가는 사건의 건축 / 해체주의의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "tadao-ando",
    "nameKo": "안도 타다오",
    "nameEn": "Tadao Ando (安藤忠雄)",
    "birth": 1941,
    "death": null,
    "country": "일본",
    "eraId": "era-postmodern",
    "movement": "비판적 지역주의 (Critical Regionalism) / 노출콘크리트 미학",
    "quote": "진정한 건축은 인간의 감성을 흔들고 자연과의 대화를 회복시키는 공간이다.",
    "desc": "정규 건축 교육 없이 복서 출신으로 유럽을 방랑하며 독학으로 세계 최고 반열에 오른 전설. 르 코르뷔지에와 루이스 칸의 영향을 받아 매끄러운 노출 콘크리트, 빛의 틈새, 물과 바람의 명상적 정적을 건축으로 빚어냅니다.",
    "masterpiece": "빛의 교회 (1989), 스미요시 주택 (로 하우스, 1976), 나오시마 지중미술관, 뮤지엄 산",
    "tags": [
      "노출콘크리트",
      "빛의교회",
      "독학의거장",
      "자연과의합일"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier",
      "louis-kahn"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Tadao_Ando_1.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Church_of_the_Light_01.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Church_of_the_Light_plan.png?width=800",
    "philosophyKeywords": [
      "노출 콘크리트의 시인",
      "빛과 침묵의 기하학",
      "물과 바람의 정원",
      "독학의 신화"
    ],
    "keyWorks": [
      {
        "name": "빛의 교회 (Church of the Light)",
        "year": 1989,
        "location": "일본 이바라키",
        "desc": "암흑 속 콘크리트 벽체를 십자형으로 찢고 쏟아지는 눈부신 빛의 십자가"
      },
      {
        "name": "뮤지엄 산 (Museum SAN)",
        "year": 2013,
        "location": "대한민국 원주",
        "desc": "자연의 산세와 파주석, 물의 정원이 콘크리트 상자와 조응하는 힐링 뮤지엄"
      },
      {
        "name": "스미요시 주택",
        "year": 1976,
        "location": "일본 오사카",
        "desc": "화장실 가려면 중정의 비를 맞아야 하는 극한의 자연 체험 주택"
      }
    ],
    "anecdote": "프로 권투선수 출신으로 정규 건축 교육을 받지 않고 르 코르뷔지에의 드로잉집을 닳도록 필사하며 독학으로 건축을 깨쳐 프리츠커상을 거머쥔 입지전적 거장입니다."
  },
  {
    "id": "alvaro-siza",
    "nameKo": "알바로 시자",
    "nameEn": "Álvaro Siza Vieira",
    "birth": 1933,
    "death": null,
    "country": "포르투갈",
    "eraId": "era-postmodern",
    "movement": "시적 모더니즘 (Poetic Modernism) / 포르투 파",
    "quote": "건축가는 아무것도 새로 발명하지 않는다. 다만 현실을 변형할 뿐이다.",
    "desc": "빛과 지형의 미묘한 굴곡, 대서양의 바람을 하얀 회벽과 조각적 볼륨으로 시적으로 정제해내는 포르투갈의 거장. 알바 알토의 감성적 유기성과 근대 합리주의를 가장 순수하게 계승했다는 평가를 받습니다.",
    "masterpiece": "포르투 대학교 건축학부 (1993), 보아 노바 레스토랑, 아모레퍼시픽 미지움",
    "tags": [
      "시적건축",
      "지형과의대화",
      "포르투파",
      "프리츠커수상"
    ],
    "influences": [],
    "influencedBy": [
      "alvar-aalto"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "시적건축",
      "지형과의대화",
      "포르투파",
      "프리츠커수상"
    ],
    "keyWorks": [
      {
        "name": "포르투 대학교 건축학부 (1993)",
        "year": 1973,
        "location": "포르투갈",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "알바로 시자 건축가는 시적 모더니즘 (Poetic Modernism) / 포르투 파의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "norman-foster",
    "nameKo": "노먼 포스터",
    "nameEn": "Norman Foster",
    "birth": 1935,
    "death": null,
    "country": "영국",
    "eraId": "era-contemporary",
    "movement": "생태 하이테크 (Eco High-Tech)",
    "quote": "기술은 그 자체가 목적이 아니라, 자연과 공존하고 인간의 에너지를 아끼는 도구다.",
    "desc": "현대 하이테크 건축의 정점. 첨단 구조 공학, 공기역학적 유선형 형태, 에너지 자립 설계를 결합했습니다. 리처드 로저스와 함께 '팀 4'로 시작해 영국 국회의사당 라이히스타크 돔, 거킨 빌딩, 실리콘밸리 애플 파크 등 기념비적 프로젝트를 이끌었습니다.",
    "masterpiece": "홍콩상하이은행(HSBC) 본사 (1986), 베를린 국회의사당 돔 (1999), 30 세인트 메리 액스 (거킨), 애플 파크",
    "tags": [
      "하이테크",
      "애플파크",
      "거킨빌딩",
      "HSBC본사"
    ],
    "influences": [
      "david-chipperfield"
    ],
    "influencedBy": [
      "paul-rudolph"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Norman_Foster_2011.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/30_St_Mary_Axe_from_Leadenhall_Street.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/30_St_Mary_Axe_typical_floor_plan.png?width=800",
    "philosophyKeywords": [
      "하이테크 건축 (High-Tech)",
      "친환경 생태 마천루",
      "다이아그리드(Diagrid)",
      "영국 건축계의 거물"
    ],
    "keyWorks": [
      {
        "name": "런던 30 세인트 메리 액스 (거킨 빌딩)",
        "year": 2004,
        "location": "영국 런던",
        "desc": "공기역학적 유선형 오이 형태와 자연 환기 시스템을 갖춘 친환경 마천루"
      },
      {
        "name": "홍콩상하이은행 (HSBC) 본사",
        "year": 1986,
        "location": "홍콩",
        "desc": "내부 기둥을 완전히 없애고 강철 마스트 트러스로 매단 하이테크의 전설"
      },
      {
        "name": "베를린 독일 국회의사당 유리 돔",
        "year": 1999,
        "location": "독일 베를린",
        "desc": "시민들이 정치인들의 회의실을 위에서 내려다보는 투명 민주주의의 상징"
      }
    ],
    "anecdote": "리즈 카운티 출신 노동자 계급에서 자수성가하여 영국 남작(Lord Foster) 작위를 받았습니다. 구조와 설비를 아름다운 기계 미학으로 노출시키는 하이테크 양식을 세계 오피스의 정점으로 끌어올렸습니다."
  },
  {
    "id": "renzo-piano",
    "nameKo": "렌조 피아노",
    "nameEn": "Renzo Piano",
    "birth": 1937,
    "death": null,
    "country": "이탈리아",
    "eraId": "era-contemporary",
    "movement": "휴머니스틱 하이테크 / 장인적 공학",
    "quote": "건축은 대단히 위험한 직업이다. 성공하면 기적이 되지만 실패하면 영원히 남기 때문이다.",
    "desc": "루이스 칸의 사무소에서 일한 뒤 30대 초반에 리처드 로저스와 함께 파리 퐁피두 센터 현상설계에 당선되어 세계를 뒤흔들었습니다. 첨단 기술을 장인처럼 정밀하고 섬세하게 다듬어내는 '디테일의 시인'입니다.",
    "masterpiece": "파리 퐁피두 센터 (1977), 런던 더 샤드 (The Shard, 2012), 간사이 국제공항 터미널, 치바우 문화센터",
    "tags": [
      "퐁피두센터",
      "더샤드",
      "장인공학",
      "루이스칸제자"
    ],
    "influences": [],
    "influencedBy": [
      "louis-kahn"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Renzo_Piano_2015.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Centre_Pompidou_Paris_2011.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Centre_Pompidou_section_diagram.png?width=800",
    "philosophyKeywords": [
      "하이테크의 장인",
      "건축적 기구(Architectural Instrument)",
      "퐁피두 센터",
      "디테일의 감성"
    ],
    "keyWorks": [
      {
        "name": "파리 퐁피두 센터",
        "year": 1977,
        "location": "프랑스 파리",
        "desc": "배관과 에스컬레이터를 외벽으로 빼내고 내부를 거대한 자유 광장으로 만든 하이테크 기념비"
      },
      {
        "name": "런던 더 샤드 (The Shard)",
        "year": 2012,
        "location": "영국 런던",
        "desc": "유리 피라미드 조각처럼 하늘로 솟아오른 310m 서유럽 최고층 빌딩"
      }
    ],
    "anecdote": "건설업자 집안에서 태어나 공방의 장인처럼 손으로 만져지는 재료의 디테일을 중시합니다. 젊은 시절 리처드 로저스와 함께 파리 심장부에 퐁피두 센터를 지어 도시적 충격을 안겼습니다."
  },
  {
    "id": "richard-rogers",
    "nameKo": "리처드 로저스",
    "nameEn": "Richard Rogers",
    "birth": 1933,
    "death": 2021,
    "country": "영국 / 이탈리아",
    "eraId": "era-contemporary",
    "movement": "인사이드 아웃 하이테크 (Inside-Out High-Tech)",
    "quote": "건축의 내장(구조, 배관, 엘리베이터)을 밖으로 드러낼 때 내부 공간은 완벽한 자유를 얻는다.",
    "desc": "노먼 포스터와의 '팀 4', 렌조 피아노와의 퐁피두 센터 협업을 거쳐, 런던 로이즈 빌딩처럼 배관과 승강기를 외벽에 원색으로 노출시키는 급진적 하이테크 미학을 세계에 각인시켰습니다.",
    "masterpiece": "파리 퐁피두 센터 (1977, 피아노와 합작), 런던 로이즈 빌딩 (Lloyd's building, 1986), 여의도 파크원",
    "tags": [
      "퐁피두센터",
      "로이즈빌딩",
      "인사이드아웃",
      "하이테크"
    ],
    "influences": [
      "david-chipperfield"
    ],
    "influencedBy": [
      "paul-rudolph",
      "smithsons"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "퐁피두센터",
      "로이즈빌딩",
      "인사이드아웃",
      "하이테크"
    ],
    "keyWorks": [
      {
        "name": "파리 퐁피두 센터 (1977",
        "year": 1973,
        "location": "영국 / 이탈리아",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "리처드 로저스 건축가는 인사이드 아웃 하이테크 (Inside-Out High-Tech)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "herzog-de-meuron",
    "nameKo": "헤르조그 & 드 뫼롱",
    "nameEn": "Herzog & de Meuron (Jacques Herzog & Pierre de Meuron)",
    "birth": 1950,
    "death": null,
    "country": "스위스",
    "eraId": "era-contemporary",
    "movement": "물질성과 표피의 혁신 (Materiality & Skin)",
    "quote": "우리는 형태를 발명하는 것이 아니라, 재료와 표피의 물성을 탐구한다.",
    "desc": "버려진 화력발전소를 현대미술의 성지로 바꾼 런던 테이트 모던, 철골을 새둥지처럼 엮은 베이징 올림픽 주경기장 등 프로젝트마다 이전의 스타일을 스스로 파괴하며 재료의 한계를 시험하는 현대 최고의 스위스 듀오입니다.",
    "masterpiece": "런던 테이트 모던 (Tate Modern, 2000), 베이징 올림픽 주경기장 (새둥지, 2008), 함부르크 엘브필하모니",
    "tags": [
      "테이트모던",
      "표피의혁신",
      "스위스미니멀리즘",
      "새둥지경기장"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "테이트모던",
      "표피의혁신",
      "스위스미니멀리즘",
      "새둥지경기장"
    ],
    "keyWorks": [
      {
        "name": "런던 테이트 모던 (Tate Modern",
        "year": 1990,
        "location": "스위스",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "헤르조그 & 드 뫼롱 건축가는 물질성과 표피의 혁신 (Materiality & Skin)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "toyo-ito",
    "nameKo": "이토 토요",
    "nameEn": "Toyo Ito (伊東豊雄)",
    "birth": 1941,
    "death": null,
    "country": "일본",
    "eraId": "era-contemporary",
    "movement": "유동적 전자생태 건축 (Fluid Architecture)",
    "quote": "물이나 바람처럼 흐르는 건축, 나무처럼 숨 쉬는 공간을 만들고 싶다.",
    "desc": "단게 겐조-키쿠타케의 계보를 잇고, 센다이 미디어테크에서 해조류처럼 뒤틀린 튜브 기둥으로 기둥-보의 고정관념을 해체했습니다. 세지마 카즈요(SANAA)의 스승으로 일본 현대건축의 부드러운 투명성을 개척했습니다.",
    "masterpiece": "센다이 미디어테크 (Sendai Mediatheque, 2001), 타이중 메트로폴리탄 오페라하우스",
    "tags": [
      "센다이미디어테크",
      "유동적공간",
      "투명성",
      "SANAA스승"
    ],
    "influences": [
      "sanaa"
    ],
    "influencedBy": [
      "kenzo-tange"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "센다이미디어테크",
      "유동적공간",
      "투명성",
      "SANAA스승"
    ],
    "keyWorks": [
      {
        "name": "센다이 미디어테크 (Sendai Mediatheque",
        "year": 1981,
        "location": "일본",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "이토 토요 건축가는 유동적 전자생태 건축 (Fluid Architecture)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "sanaa",
    "nameKo": "SANAA (세지마 카즈요 & 니시자와 류에)",
    "nameEn": "SANAA (Kazuyo Sejima & Ryue Nishizawa)",
    "birth": 1956,
    "death": null,
    "country": "일본",
    "eraId": "era-contemporary",
    "movement": "극단적 투명성과 탈경계 (Immateriality & Lightness)",
    "quote": "벽을 없애고 경계를 흐리면 사람들의 관계와 풍경이 하나가 된다.",
    "desc": "이토 토요 사무소 출신의 세지마 카즈요와 니시자와 류에가 결성한 듀오. 얇은 철판 기둥, 곡면 유리, 바닥의 완만한 둔덕으로 내부와 외부, 프로그램 간의 경계를 지워버리는 유백색의 무중력 건축을 실현했습니다.",
    "masterpiece": "21세기 가나자와 미술관 (2004), 로잔 롤렉스 러닝 센터 (2010), 뉴 뮤지엄 (뉴욕)",
    "tags": [
      "가나자와미술관",
      "롤렉스러닝센터",
      "무중력건축",
      "프리츠커듀오"
    ],
    "influences": [],
    "influencedBy": [
      "toyo-ito"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "가나자와미술관",
      "롤렉스러닝센터",
      "무중력건축",
      "프리츠커듀오"
    ],
    "keyWorks": [
      {
        "name": "21세기 가나자와 미술관 (2004)",
        "year": 1996,
        "location": "일본",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "SANAA (세지마 카즈요 & 니시자와 류에) 건축가는 극단적 투명성과 탈경계 (Immateriality & Lightness)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "kengo-kuma",
    "nameKo": "쿠마 켄고",
    "nameEn": "Kengo Kuma (隈研吾)",
    "birth": 1954,
    "death": null,
    "country": "일본",
    "eraId": "era-contemporary",
    "movement": "약한 건축 (Weak Architecture) / 자연목재 루버",
    "quote": "건축은 뽐내며 서 있는 것이 아니라 주변 환경 속으로 스르륵 사라져야 한다.",
    "desc": "거대하고 육중한 콘크리트 마천루에 맞서 '작고, 약하고, 분절된 건축'을 표방합니다. 일본 전통 목조 맞춤(지옥짜임)과 삼나무, 돌, 종이, 대나무 루버를 얇게 쪼개어 빛을 걸러내는 독보적인 입면 감각을 선보입니다.",
    "masterpiece": "도쿄 올림픽 신국립경기장 (2019), 아사쿠사 문화관광센터, 네즈 미술관",
    "tags": [
      "약한건축",
      "목재루버",
      "도쿄올림픽경기장",
      "자연과의융합"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "약한건축",
      "목재루버",
      "도쿄올림픽경기장",
      "자연과의융합"
    ],
    "keyWorks": [
      {
        "name": "도쿄 올림픽 신국립경기장 (2019)",
        "year": 1994,
        "location": "일본",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "쿠마 켄고 건축가는 약한 건축 (Weak Architecture) / 자연목재 루버의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "david-chipperfield",
    "nameKo": "데이비드 치퍼필드",
    "nameEn": "David Chipperfield",
    "birth": 1953,
    "death": null,
    "country": "영국",
    "eraId": "era-contemporary",
    "movement": "지속가능한 절제와 역사적 맥락주의 (Understated Modernism)",
    "quote": "좋은 건축은 자극적인 제스처가 아니라, 시간이 흘러도 오래도록 그 장소를 지키는 묵직한 태도다.",
    "desc": "2023년 프리츠커상 수상자. 요란한 조형주의를 지양하고 역사 유적의 복원과 도시적 연속성을 기품 있게 조율합니다. 서울 용산의 아모레퍼시픽 본사를 전통 달항아리와 중정의 절제된 백색 루버로 설계하여 한국인에게도 깊은 친숙함을 주었습니다.",
    "masterpiece": "아모레퍼시픽 세계 본사 (서울, 2017), 베를린 신박물관 복원 (Neues Museum, 2009), 제임스 사이먼 갤러리",
    "tags": [
      "아모레퍼시픽본사",
      "절제미학",
      "베를린신박물관",
      "2023프리츠커"
    ],
    "influences": [],
    "influencedBy": [
      "norman-foster",
      "richard-rogers"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "아모레퍼시픽본사",
      "절제미학",
      "베를린신박물관",
      "2023프리츠커"
    ],
    "keyWorks": [
      {
        "name": "아모레퍼시픽 세계 본사 (서울",
        "year": 1993,
        "location": "영국",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "데이비드 치퍼필드 건축가는 지속가능한 절제와 역사적 맥락주의 (Understated Modernism)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "bjarke-ingels",
    "nameKo": "비야케 잉겔스",
    "nameEn": "Bjarke Ingels (BIG)",
    "birth": 1974,
    "death": null,
    "country": "덴마크",
    "eraId": "era-contemporary",
    "movement": "실용주의적 유토피아 (Hedonistic Sustainability)",
    "quote": "Yes is More (더 많은 가능성을 긍정하라)!",
    "desc": "렘 콜하스의 OMA에서 수련 후 덴마크에 BIG(Bjarke Ingels Group)을 설립. 미스의 'Less is more', 벤투리의 'Less is a bore'를 넘어 만화적 스토리텔링과 도표(Diagram)를 통해 쓰레기 소각장 지붕에 스키장을 얹는 등 기발하고 위트 있는 지속가능성을 창출하는 동시대 최고의 아이콘입니다.",
    "masterpiece": "코펜힐 아마게르 바케 (쓰레기소각장 스키슬로프, 2019), VIA 57 West (뉴욕), 8 하우스",
    "tags": [
      "YesIsMore",
      "코펜힐",
      "BIG",
      "실용적유토피아",
      "콜하스제자"
    ],
    "influences": [],
    "influencedBy": [
      "rem-koolhaas"
    ],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "YesIsMore",
      "코펜힐",
      "BIG",
      "실용적유토피아",
      "콜하스제자"
    ],
    "keyWorks": [
      {
        "name": "코펜힐 아마게르 바케 (쓰레기소각장 스키슬로프",
        "year": 2014,
        "location": "덴마크",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "비야케 잉겔스 건축가는 실용주의적 유토피아 (Hedonistic Sustainability)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  },
  {
    "id": "diebedo-francis-kere",
    "nameKo": "디베도 프랑시스 케레",
    "nameEn": "Diébédo Francis Kéré",
    "birth": 1965,
    "death": null,
    "country": "부르키나파소 / 독일",
    "eraId": "era-contemporary",
    "movement": "생태 공동체 건축 / 로컬 인디저너스 (Indigenous)",
    "quote": "모두가 최고의 공간을 누릴 권리가 있다. 특히 가장 가난하고 소외된 곳일수록.",
    "desc": "아프리카 출신 최초의 프리츠커상(2022) 수상자. 고향 부르키나파소의 흙과 토착 진흙 벽돌, 버려진 함석판을 활용해 에어컨 없이도 시원한 학교와 병원을 주민들과 함께 지어올리며 건축의 사회적 치유력을 증명했습니다.",
    "masterpiece": "간도 초등학교 (Gando Primary School, 2001), 서펜타인 파빌리온 (2017)",
    "tags": [
      "아프리카최초프리츠커",
      "흙벽돌건축",
      "공동체치유",
      "적정기술"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "buildingImg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "blueprintImg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "philosophyKeywords": [
      "아프리카최초프리츠커",
      "흙벽돌건축",
      "공동체치유",
      "적정기술"
    ],
    "keyWorks": [
      {
        "name": "간도 초등학교 (Gando Primary School",
        "year": 2005,
        "location": "부르키나파소 / 독일",
        "desc": "대표적인 건축 기념비적 작품"
      }
    ],
    "anecdote": "디베도 프랑시스 케레 건축가는 생태 공동체 건축 / 로컬 인디저너스 (Indigenous)의 핵심 기수로서 시대를 앞서간 독창적인 공간 철학을 제시했습니다."
  }
];

const INFLUENCE_EDGES = [
  {
    "from": "henry-richardson",
    "to": "louis-sullivan",
    "type": "mentor-influence",
    "label": "석조 아치와 기념비성 감화"
  },
  {
    "from": "louis-sullivan",
    "to": "frank-lloyd-wright",
    "type": "master-disciple",
    "label": "설리반 아틀리에 수석 제도사 ('Lieber Meister')"
  },
  {
    "from": "peter-behrens",
    "to": "walter-gropius",
    "type": "master-disciple",
    "label": "베렌스 사무소 수석 조수 (1908~1910)"
  },
  {
    "from": "peter-behrens",
    "to": "ludwig-mies",
    "type": "master-disciple",
    "label": "베렌스 사무소 근무 (1908~1911)"
  },
  {
    "from": "peter-behrens",
    "to": "le-corbusier",
    "type": "master-disciple",
    "label": "베렌스 사무소 5개월 실무 (1910~1911)"
  },
  {
    "from": "auguste-perret",
    "to": "le-corbusier",
    "type": "master-disciple",
    "label": "파리 페레 사무소에서 콘크리트 공법 사사 (1908~1909)"
  },
  {
    "from": "adolf-loos",
    "to": "le-corbusier",
    "type": "mentor-influence",
    "label": "장식 배제 및 라움플란 이론적 충격"
  },
  {
    "from": "otto-wagner",
    "to": "adolf-loos",
    "type": "mentor-influence",
    "label": "빈 근대건축 비판적 계승"
  },
  {
    "from": "hendrik-berlage",
    "to": "ludwig-mies",
    "type": "mentor-influence",
    "label": "벽돌의 구조적 진솔함에 감화"
  },
  {
    "from": "hendrik-berlage",
    "to": "gerrit-rietveld",
    "type": "mentor-influence",
    "label": "네덜란드 근대 조형 의식 계승"
  },
  {
    "from": "walter-gropius",
    "to": "marcel-breuer",
    "type": "master-disciple",
    "label": "바우하우스 스승과 수제자, 미국 협업"
  },
  {
    "from": "walter-gropius",
    "to": "philip-johnson",
    "type": "mentor-influence",
    "label": "하버드 GSD 및 국제주의 확산"
  },
  {
    "from": "walter-gropius",
    "to": "paul-rudolph",
    "type": "master-disciple",
    "label": "하버드 건축대학원 사제 관계"
  },
  {
    "from": "frank-lloyd-wright",
    "to": "alvar-aalto",
    "type": "mentor-influence",
    "label": "유기적 자연 결합 및 인간성 공명"
  },
  {
    "from": "frank-lloyd-wright",
    "to": "eero-saarinen",
    "type": "mentor-influence",
    "label": "자연적 모티브와 자유로운 형태 감화"
  },
  {
    "from": "ludwig-mies",
    "to": "philip-johnson",
    "type": "collaborator",
    "label": "시그램 빌딩 공동 설계 및 글래스 하우스 영감"
  },
  {
    "from": "ludwig-mies",
    "to": "robert-venturi",
    "type": "rivalry",
    "label": "'Less is more'에 맞서 'Less is a bore' 선언"
  },
  {
    "from": "le-corbusier",
    "to": "louis-kahn",
    "type": "mentor-influence",
    "label": "콘크리트 질감과 고대 기념비성 재해석"
  },
  {
    "from": "le-corbusier",
    "to": "oscar-niemeyer",
    "type": "master-disciple",
    "label": "브라질 교육보건부 청사 자문 및 UN 본부 협업"
  },
  {
    "from": "le-corbusier",
    "to": "kenzo-tange",
    "type": "mentor-influence",
    "label": "히로시마와 요요기 경기장의 콘크리트 조형적 원천"
  },
  {
    "from": "le-corbusier",
    "to": "kim-chung-up",
    "type": "master-disciple",
    "label": "파리 아틀리에 3년 2개월 직속 사사 (한국인 유일)"
  },
  {
    "from": "le-corbusier",
    "to": "tadao-ando",
    "type": "mentor-influence",
    "label": "유럽 방랑 중 독학으로 스케치 및 답사하며 사상적 스승으로 삼음"
  },
  {
    "from": "le-corbusier",
    "to": "smithsons",
    "type": "mentor-influence",
    "label": "마르세유 위니테의 베통 브뤼(거친 콘크리트) 계승"
  },
  {
    "from": "le-corbusier",
    "to": "richard-meier",
    "type": "mentor-influence",
    "label": "빌라 사보아의 순수주의 백색 미학 계승"
  },
  {
    "from": "le-corbusier",
    "to": "rem-koolhaas",
    "type": "mentor-influence",
    "label": "도시 스케일과 현대 자본주의 기계론 비판적 재해석"
  },
  {
    "from": "louis-kahn",
    "to": "robert-venturi",
    "type": "master-disciple",
    "label": "유펜(UPenn) 교수 칸의 강의 수강 및 조교"
  },
  {
    "from": "louis-kahn",
    "to": "renzo-piano",
    "type": "master-disciple",
    "label": "1965~1970 필라델피아 칸 사무소에서 실무 연마"
  },
  {
    "from": "louis-kahn",
    "to": "tadao-ando",
    "type": "mentor-influence",
    "label": "킴벨 미술관의 빛과 침묵, 기하학적 정적 감화"
  },
  {
    "from": "kenzo-tange",
    "to": "kisho-kurokawa",
    "type": "master-disciple",
    "label": "도쿄대 단게 연구실 출신, 메타볼리즘 주도"
  },
  {
    "from": "kenzo-tange",
    "to": "kim-swoo-geun",
    "type": "master-disciple",
    "label": "도쿄대 단게 연구실에서 석·박사 사사"
  },
  {
    "from": "kenzo-tange",
    "to": "toyo-ito",
    "type": "mentor-influence",
    "label": "일본 현대건축의 거대한 모태"
  },
  {
    "from": "alvar-aalto",
    "to": "alvaro-siza",
    "type": "mentor-influence",
    "label": "지형과의 시적 교감, 유기적 디테일 계승"
  },
  {
    "from": "alvar-aalto",
    "to": "eero-saarinen",
    "type": "mentor-influence",
    "label": "핀란드 동향 선배이자 유기적 셸 구조적 교류"
  },
  {
    "from": "paul-rudolph",
    "to": "norman-foster",
    "type": "master-disciple",
    "label": "예일대 건축대학원 학장 루돌프 사사"
  },
  {
    "from": "paul-rudolph",
    "to": "richard-rogers",
    "type": "master-disciple",
    "label": "예일대 건축대학원 학장 루돌프 사사"
  },
  {
    "from": "norman-foster",
    "to": "richard-rogers",
    "type": "collaborator",
    "label": "예일 동문, 1963년 '팀 4 (Team 4)' 결성"
  },
  {
    "from": "richard-rogers",
    "to": "renzo-piano",
    "type": "collaborator",
    "label": "피아노+로저스 사무소 결성, 파리 퐁피두 센터 공동 당선"
  },
  {
    "from": "toyo-ito",
    "to": "sanaa",
    "type": "master-disciple",
    "label": "세지마 카즈요가 이토 토요 사무소에서 8년간 실무 수련"
  },
  {
    "from": "rem-koolhaas",
    "to": "zaha-hadid",
    "type": "master-disciple",
    "label": "런던 AA스쿨 스승-제자, 초기 OMA 파트너"
  },
  {
    "from": "rem-koolhaas",
    "to": "bjarke-ingels",
    "type": "master-disciple",
    "label": "로테르담 OMA 사무소에서 수련 후 BIG 설립"
  },
  {
    "from": "peter-eisenman",
    "to": "daniel-libeskind",
    "type": "mentor-influence",
    "label": "해체주의 이론적 사상 교류 및 격려"
  },
  {
    "from": "norman-foster",
    "to": "david-chipperfield",
    "type": "master-disciple",
    "label": "포스터 사무소 및 로저스 사무소에서 실무"
  }
];

if (typeof window !== 'undefined') {
  window.ERAS = ERAS;
  window.INITIAL_ARCHITECTS = INITIAL_ARCHITECTS;
  window.INFLUENCE_EDGES = INFLUENCE_EDGES;
  window.ARCHI_DATA = { ERAS, INITIAL_ARCHITECTS, INFLUENCE_EDGES };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ERAS, INITIAL_ARCHITECTS, INFLUENCE_EDGES };
}
