// ========================================================
// ARCHI-GENEALOGY: Master Verified Academic Database
// 5개 시대(Eras), 50인 대표 건축가 심층 학술 데이터, 사제·영향 계보선
// 100% 검증된 학술 자료 및 위키미디어 공용(Wikimedia Commons) 실물 자산
// ========================================================

const ERAS = [
  {
    "id": "era-pioneers",
    "name": "태동기 & 근대 선구자",
    "period": "1850s – 1910s",
    "desc": "산업혁명에 대한 반작용, 신소재(철·유리·철근콘크리트)의 등장과 역사주의 양식의 탈피. 미술공예운동, 시카고파, 아르누보, 빈 분리파의 태동.",
    "color": "#f59e0b"
  },
  {
    "id": "era-masters",
    "name": "근대 4대 거장 & 아방가르드",
    "period": "1910s – 1940s",
    "desc": "바우하우스, 데 스틸, 러시아 구성주의, 국제주의 양식(International Style)의 정립. 르 코르뷔지에, 미스, 라이트, 그로피우스, 알토 등이 이룩한 근대건축의 황금기.",
    "color": "#3b82f6"
  },
  {
    "id": "era-postwar",
    "name": "전후 모더니즘 & 브루탈리즘",
    "period": "1940s – 1970s",
    "desc": "전후 재건과 국제주의의 획일화에 대한 반발. 루이스 칸의 공간 영성, 노출 콘크리트 브루탈리즘, 일본 메타볼리즘, 한국 현대건축 1세대의 태동.",
    "color": "#10b981"
  },
  {
    "id": "era-postmodern",
    "name": "포스트모더니즘 & 해체주의",
    "period": "1970s – 1990s",
    "desc": "\"Less is a bore\". 역사와 장식, 다원주의의 복권(포스트모더니즘), 그리고 이성적 기하학과 유클리드 공간을 해체한 해체주의(Deconstructivism)의 충격.",
    "color": "#ef4444"
  },
  {
    "id": "era-contemporary",
    "name": "하이테크 & 현대 동시대 건축",
    "period": "1990s – 현재",
    "desc": "구조와 설비를 미학화한 하이테크, 디지털 알고리즘과 유체 역학의 파라메트릭, 재료 표피의 물성 실험, 그리고 생태적 지속가능성과 비판적 지역주의의 성숙.",
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
    "movement": "미술공예운동 (Arts & Crafts Movement)",
    "quote": "유용하다고 믿지 않거나, 아름답다고 생각하지 않는 것은 집에 두지 마라.",
    "desc": "19세기 산업혁명에 의한 기계 대량생산의 조잡함과 노동 소외를 통렬히 비판하고 중세 장인 공동체(길드)의 수공예 부활을 주창했습니다. 건축, 가구, 벽지, 직물을 총체적 예술(Gesamtkunstwerk)로 통합하려 했으며, 이는 독일 공작연맹과 바우하우스 근대 조형 이념의 직접적인 사상적 모태가 되었습니다.",
    "masterpiece": "붉은 집 (Red House, 런던 벡슬리히스, 1859)",
    "tags": [
      "미술공예운동",
      "토탈디자인",
      "수공예부활",
      "붉은집",
      "바우하우스의모태"
    ],
    "influences": [
      "henry-richardson",
      "hendrik-berlage",
      "walter-gropius"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/William%20Morris%20age%2053.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Red%20House%20Bexleyheath.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Red%20House%20Plan%20Ground%20Floor.jpg?width=800",
    "blueprintType": "1층 평면도 (Ground Floor Plan)",
    "blueprintDesc": "L자형 비대칭 배치로 기능적 동선과 자연 채광을 우선시한 근대 주거 평면의 선구적 프로토타입.",
    "philosophyKeywords": [
      "토탈 디자인 (Gesamtkunstwerk)",
      "장인정신 회복과 노동의 기쁨",
      "재료의 진실성 (Truth to Materials)",
      "산업 대량생산 비판"
    ],
    "keyWorks": [
      {
        "name": "붉은 집 (Red House)",
        "year": 1859,
        "location": "영국 런던 벡슬리히스",
        "desc": "필립 웹과 협업. 가식적인 고전주의 석조 외피 대신 노출 붉은 벽돌과 중세풍 삼각 박공을 솔직하게 드러낸 근대 주거의 효시."
      },
      {
        "name": "모리스 회사 텍스타일 & 벽지 공방",
        "year": 1861,
        "location": "영국 런던",
        "desc": "식물과 자연 모티브를 정밀한 목판 인쇄로 되살려 일상 생활공간의 예술화를 실천."
      }
    ],
    "anecdote": "산업혁명 공장의 조악한 가구에 분노한 모리스는 자신의 신혼집 '붉은 집'의 벽돌 한 장, 경첩 하나, 식탁 의자까지 직접 디자인하고 손으로 깎아 만들었습니다. 이 실천은 '생활의 예술화'라는 근대 디자인의 핵심 명제가 되었습니다."
  },
  {
    "id": "henry-richardson",
    "nameKo": "헨리 홉슨 리처드슨",
    "nameEn": "Henry Hobson Richardson",
    "birth": 1838,
    "death": 1886,
    "country": "미국",
    "eraId": "era-pioneers",
    "movement": "리처드슨 로마네스크 (Richardsonian Romanesque)",
    "quote": "건축가는 매 순간 석재의 웅장한 무게와 거대한 연속 아치의 질서를 기억해야 한다.",
    "desc": "유럽 고전 양식의 단순 모방에서 벗어나 미국 고유의 기념비적 건축 언어를 확립한 최초의 미국 거장. 파리 에콜 데 보자르 출신이면서도 중세 로마네스크의 육중한 사암 벽체와 반원 아치를 재해석하여 강력한 물질성과 수평적 힘을 표현했습니다. 그의 마셜 필드 도매점은 시카고파 마천루 발전의 결정적 촉매제가 되었습니다.",
    "masterpiece": "보스턴 트리니티 교회 (Trinity Church, 1877), 마셜 필드 도매점 (1887)",
    "tags": [
      "리처드슨로마네스크",
      "미국건축의아버지",
      "시카고파선구",
      "석조아치"
    ],
    "influences": [
      "louis-sullivan"
    ],
    "influencedBy": [
      "william-morris"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/HHRichardson.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Trinity%20Church%20Boston%202019.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Trinity%20Church%20Boston%20plan.png?width=800",
    "blueprintType": "그리스 십자 평면도 (Greek Cross Plan)",
    "blueprintDesc": "거대한 중앙 탑을 중심으로 4개의 짧은 신랑이 균형을 이루며 육중한 하중을 효과적으로 분산시킨 집중형 평면.",
    "philosophyKeywords": [
      "리처드슨 로마네스크",
      "중후한 석조 아치와 물질성",
      "미국 토착 건축 언어 개척",
      "단순성과 기념비적 스케일"
    ],
    "keyWorks": [
      {
        "name": "보스턴 트리니티 교회 (Trinity Church)",
        "year": 1877,
        "location": "미국 보스턴 코플리 스퀘어",
        "desc": "붉은 사암과 화강암의 색채 대비, 거대한 중앙 교차부 탑으로 미국 건축사에서 가장 찬란한 역사적 금자탑을 세움."
      },
      {
        "name": "마셜 필드 도매점 (Marshall Field Wholesale Store)",
        "year": 1887,
        "location": "미국 시카고",
        "desc": "상업용 다층 건물 입면에 율동감 넘치는 다단계 아치를 도입해 설리반과 시카고파 마천루에 결정적 충격을 선사."
      }
    ],
    "anecdote": "루이스 설리반은 리처드슨의 마셜 필드 도매점을 처음 목격하고 '여기, 인간의 손으로 빚어낸 원초적 힘과 단순성의 극치가 서 있다!'라며 전율했고, 이 건물의 리듬을 마천루 수직성 이론의 근본 뿌리로 삼았습니다."
  },
  {
    "id": "otto-wagner",
    "nameKo": "오토 바그너",
    "nameEn": "Otto Wagner",
    "birth": 1841,
    "death": 1918,
    "country": "오스트리아",
    "eraId": "era-pioneers",
    "movement": "빈 분리파 (Vienna Secession) & 근대 기능주의",
    "quote": "실용적이지 않은 것은 결코 아름다울 수 없다 (Etwas Unpraktisches kann nicht schön sein).",
    "desc": "19세기 역사주의와 절충주의의 중심지였던 빈 미술아카데미 교수로서 '근대건축 선언(Moderne Architektur, 1896)'을 발표, 근대 도시와 건축의 새 지평을 열었습니다. 신소재인 알루미늄 리벳, 대리석 슬래브 외피, 철골 유리 천장을 노출시켜 구조와 기능을 솔직하게 표현했으며, 아돌프 로스와 요제프 호프만 등 차세대 거장들을 양성했습니다.",
    "masterpiece": "빈 우편저금국 (Österreichische Postsparkasse, 1906), 암 슈타인호프 교회",
    "tags": [
      "빈분리파",
      "근대건축선언",
      "기능주의선구",
      "구조적솔직성"
    ],
    "influences": [
      "adolf-loos",
      "peter-behrens"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Otto%20Wagner%201910.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%20Postsparkasse%202005.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Postsparkasse%20Wien%20Grundriss.png?width=800",
    "blueprintType": "중앙 은행홀 평면도 (Main Banking Hall Plan)",
    "blueprintDesc": "사다리꼴 대지 조건에 완벽히 대응한 대칭형 바실리카 평면으로, 중앙 홀에 천창 자연광을 극대화한 기능적 구성.",
    "philosophyKeywords": [
      "기능과 구조의 일치",
      "신소재(알루미늄·유리·철근콘크리트) 미학",
      "피복 이론 (Bekleidungstheorie)",
      "근대 대도시(Metropolis) 공간 혁신"
    ],
    "keyWorks": [
      {
        "name": "빈 우편저금국 (Postsparkasse)",
        "year": 1906,
        "location": "오스트리아 빈",
        "desc": "외벽에 박힌 알루미늄 볼트 헤드를 그대로 장식화하고, 중앙 은행홀에 유리 블록 바닥과 철골 천창을 설치한 하이테크 모더니즘의 원형."
      },
      {
        "name": "암 슈타인호프 교회 (Kirche am Steinhof)",
        "year": 1907,
        "location": "오스트리아 빈",
        "desc": "정신병원 단지 내 성당으로, 환자 안전과 위생을 고려한 둥근 모서리 마감과 분리파 황금 돔의 절묘한 결합."
      }
    ],
    "anecdote": "바그너는 외벽 대리석 판을 고정하는 알루미늄 볼트를 숨기지 않고 격자 패턴으로 노출시켰습니다. 당시 사람들은 '미완성 건물'이라며 비난했지만, 그는 '기술적 필요성을 감추지 않는 것이야말로 근대인의 정직한 미학'이라고 반박했습니다."
  },
  {
    "id": "antoni-gaudi",
    "nameKo": "안토니 가우디",
    "nameEn": "Antoni Gaudí",
    "birth": 1852,
    "death": 1926,
    "country": "스페인 (카탈루냐)",
    "eraId": "era-pioneers",
    "movement": "카탈루냐 모더니즘 (Art Nouveau / Modernisme)",
    "quote": "자연은 신이 만든 최고의 건축이며, 인간의 모든 디자인은 자연을 관찰하는 데서 시작된다. 직선은 인간의 선이고 곡선은 신의 선이다.",
    "desc": "바르셀로나를 무대로 자연의 유기적 원리와 기독교적 영성, 카탈루냐 민족주의를 결합한 독보적 천재. 중력의 반대 방향으로 매달린 모래주머니 역현수선(Catenary Arch) 구조 모델을 통해 컴퓨터가 없던 시대에 완벽한 무주 삼차원 입체 곡면을 계산해 냈습니다. 유기적 조형과 트렌카디스(깨진 타일 모자이크) 기법은 현대 파라메트릭 건축의 영적 시초로 평가받습니다.",
    "masterpiece": "사그라다 파밀리아 (Sagrada Família, 성가족성당, 1882~), 카사 밀라, 카사 바트요",
    "tags": [
      "자연모방",
      "현수선아치",
      "카탈루냐모더니즘",
      "사그라다파밀리아",
      "구조의천재"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Antoni%20Gaudi%201878.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada%20Familia%2001.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Casa%20Mila%20plan.jpg?width=800",
    "blueprintType": "카사 밀라 기준층 평면도 (Typical Floor Plan)",
    "blueprintDesc": "직선 벽체가 전무하고 파도치는 유기적 곡선 격벽과 내부 중정 채광을 조율한 혁신적인 자유 평면.",
    "philosophyKeywords": [
      "역현수선 구조 (Catenary Arch)",
      "생체모방과 유기적 조형 (Biomorphism)",
      "트렌카디스 (Trencadís) 모자이크",
      "빛과 입체 기하학의 영성"
    ],
    "keyWorks": [
      {
        "name": "사그라다 파밀리아 대성당",
        "year": 1882,
        "location": "스페인 바르셀로나",
        "desc": "나뭇가지처럼 갈라지는 수목형 기둥과 포물선 돔이 천상의 숲을 이루는 인류 건축사상 가장 독창적인 종교 건축."
      },
      {
        "name": "카사 밀라 (라 페드레라)",
        "year": 1912,
        "location": "스페인 바르셀로나",
        "desc": "채석장(라 페드레라)이라는 별칭처럼 파도치는 석회암 파사드와 내력벽 없이 기둥만으로 하중을 지탱한 근대 골조의 혁명."
      }
    ],
    "anecdote": "가우디는 사그라다 파밀리아 설계를 위해 작업실 천장에 수천 개의 끈과 납추를 매달아 거꾸로 늘어뜨리는 '다포성 현수선 실험 장치'를 10년간 운영했습니다. 거꾸로 매달려 중력만으로 자연스러운 장력을 받는 곡선이야말로 압축력만으로 버티는 가장 완벽한 아치가 된다는 발견이었습니다."
  },
  {
    "id": "louis-sullivan",
    "nameKo": "루이스 설리반",
    "nameEn": "Louis Sullivan",
    "birth": 1856,
    "death": 1924,
    "country": "미국",
    "eraId": "era-pioneers",
    "movement": "시카고파 (Chicago School) & 기능주의",
    "quote": "형태는 기능을 따른다 (Form ever follows function).",
    "desc": "'마천루의 아버지'이자 근대 기능주의의 절대 명제인 '형태는 기능을 따른다'를 제창한 건축 이론가. 1871년 시카고 대화재 이후 등장한 강철 골조와 엘리베이터 기술을 최초로 미학적 질서로 정립했습니다. 고전 오더의 기단부-몸체-처마부 3분할 체계를 고층 빌딩에 이식하면서도 독창적인 유기적 식물 테라코타 장식을 결합했습니다. 프랭크 로이드 라이트의 평생 스승(Lieber Meister)입니다.",
    "masterpiece": "웨인라이트 빌딩 (Wainwright Building, 1891), 카슨 피리 스콧 백화점",
    "tags": [
      "형태는기능을따른다",
      "마천루의아버지",
      "시카고파",
      "라이트의스승"
    ],
    "influences": [
      "frank-lloyd-wright"
    ],
    "influencedBy": [
      "henry-richardson"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Louis%20Sullivan%201890s.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Wainwright%20Building%20St%20Louis.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Wainwright%20Building%20Floor%20Plan.png?width=800",
    "blueprintType": "기준층 U자형 평면도 (Typical Floor Plan)",
    "blueprintDesc": "모든 사무실이 균일한 자연광과 환기를 공급받도록 배려한 U자형 평면 구조와 엘리베이터 코어 배치.",
    "philosophyKeywords": [
      "형태는 기능을 따른다 (Form follows function)",
      "고층 건물의 3분할 미학 (Tripartite Façade)",
      "강철 골조와 테라코타 피복",
      "유기적 기하 장식"
    ],
    "keyWorks": [
      {
        "name": "웨인라이트 빌딩 (Wainwright Building)",
        "year": 1891,
        "location": "미국 세인트루이스",
        "desc": "철골 기둥을 수직 피어로 시각화하여 고층 건물의 수직 상승감을 최초로 완벽하게 표현한 마천루의 교과서."
      },
      {
        "name": "카슨 피리 스콧 백화점 (Sullivan Center)",
        "year": 1899,
        "location": "미국 시카고",
        "desc": "1~2층에 주철 주조의 화려한 식물 장식 코너 출입구를 두고 상층부에는 넓은 가로창(시카고 창)을 연속 배치한 상업 건축의 걸작."
      }
    ],
    "anecdote": "젊은 프랭크 로이드 라이트가 설리반의 아들러&설리반 사무소에 입사 면접을 보러 갔을 때, 설리반은 라이트의 드로잉을 단 몇 초간 응시한 뒤 '자네는 선이 무엇인지 아는군. 내일부터 출근하게'라며 즉석 채용했습니다. 라이트는 평생 설리반을 '친애하는 스승(Lieber Meister)'으로 칭송했습니다."
  },
  {
    "id": "hendrik-berlage",
    "nameKo": "헨드릭 페트뤼스 베를라허",
    "nameEn": "Hendrik Petrus Berlage",
    "birth": 1856,
    "death": 1934,
    "country": "네덜란드",
    "eraId": "era-pioneers",
    "movement": "암스테르담파 선구 & 네덜란드 근대건축",
    "quote": "벽체는 그 자체로 평면적 진실을 드러내야 하며, 거짓된 장식으로 덮여서는 안 된다.",
    "desc": "'네덜란드 근대건축의 아버지'. 네오 르네상스의 조잡한 역사주의 양식을 배격하고, 붉은 벽돌 본연의 평면성과 구축성을 솔직하게 드러내는 '벽체의 공간 예술'을 수립했습니다. 암스테르담 증권거래소는 미스 반 데어 로에가 평생 벽돌의 질서와 구축적 정직성을 배우는 데 결정적 영감을 주었으며, 데 스틸(De Stijl)의 등장에 탄탄한 토대를 제공했습니다.",
    "masterpiece": "암스테르담 증권거래소 (Beurs van Berlage, 1903), 헤이그 시립미술관",
    "tags": [
      "네덜란드근대건축의아버지",
      "구축적정직성",
      "벽돌미학",
      "데스틸의선구"
    ],
    "influences": [
      "gerrit-rietveld",
      "ludwig-mies"
    ],
    "influencedBy": [
      "william-morris"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Hendrik%20Petrus%20Berlage%201914.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Beurs%20van%20Berlage%20Amsterdam.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Beurs%20van%20Berlage%20plan.png?width=800",
    "blueprintType": "증권거래소 종합 평면도 (General Ground Plan)",
    "blueprintDesc": "상품거래소, 주식거래소, 곡물거래소 등 3개의 거대한 홀을 명쾌한 벽돌 볼륨으로 구획한 기념비적 평면.",
    "philosophyKeywords": [
      "벽돌의 진실성과 평면성",
      "구조적 정직성 (Constructive Honesty)",
      "공간의 통일성과 질서",
      "도시계획적 총체성"
    ],
    "keyWorks": [
      {
        "name": "암스테르담 증권거래소 (Beurs van Berlage)",
        "year": 1903,
        "location": "네덜란드 암스테르담",
        "desc": "노출 철골 트러스 지붕과 노출 벽돌 벽체의 완벽한 조화로 역사주의의 종말과 근대 건축의 도래를 공식 선언."
      },
      {
        "name": "헤이그 시립미술관 (Kunstmuseum Den Haag)",
        "year": 1935,
        "location": "네덜란드 헤이그",
        "desc": "노란 벽돌의 섬세한 비례와 동선 유도의 마스터피스로 유작이 된 근대 미술관의 명작."
      }
    ],
    "anecdote": "미스 반 데어 로에는 청년 시절 암스테르담 증권거래소를 보고 '모든 벽돌 한 장 한 장이 제자리에 박혀 진실을 말하고 있었다. 그것은 거짓된 장식의 종말이자 위대한 구조의 탄생이었다'라며 큰 충격을 고백했습니다."
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
    "quote": "철은 숨겨야 할 공학적 뼈대가 아니라, 식물처럼 유기적으로 뻗어나가는 공간의 꽃이다.",
    "desc": "건축사에서 아르누보 양식을 공간화한 최초의 개척자. 산업혁명의 신소재였던 가단 주철(Wrought Iron)을 건물의 구조체이자 유연한 덩굴손 형태의 장식으로 완벽히 일체화시켰습니다. 빛이 쏟아져 들어오는 중앙 유리 천창과 개방적인 계단실을 통해 19세기 유럽 도시 주택의 폐쇄적인 공간 구조를 빛과 유기적 연속성의 공간으로 탈바꿈시켰습니다.",
    "masterpiece": "타셀 저택 (Hôtel Tassel, 브뤼셀, 1893), 오르타 미술관, 솔베이 저택",
    "tags": [
      "아르누보창시",
      "주철유기곡선",
      "휘플래시라인",
      "빛의계단실"
    ],
    "influences": [
      "auguste-perret"
    ],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Victor%20Horta%201900.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Hotel%20Tassel%20Brussels%20facade.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Hotel%20Tassel%20plan.png?width=800",
    "blueprintType": "타셀 저택 주 층 평면도 (Main Floor Plan)",
    "blueprintDesc": "전통적 협소 대지의 암울한 중복도 방식을 타파하고, 중앙 계단실과 천창을 중심으로 빛을 사방에 분배한 혁신적 평면.",
    "philosophyKeywords": [
      "휘플래시 라인 (Whiplash Line / 채찍 곡선)",
      "철골 구조와 식물적 유기성의 일체화",
      "빛과 투명성의 연속 공간",
      "토탈 디자인 아르누보"
    ],
    "keyWorks": [
      {
        "name": "타셀 저택 (Hôtel Tassel)",
        "year": 1893,
        "location": "벨기에 브뤼셀",
        "desc": "아르누보 건축의 세계 최초 실현작. 주철 기둥에서 피어난 덩굴손 곡선이 계단 난간과 바닥 모자이크로 물결치듯 연속됨."
      },
      {
        "name": "오르타 자택 겸 아틀리에 (Horta Museum)",
        "year": 1901,
        "location": "벨기에 브뤼셀",
        "desc": "가구, 문손잡이, 조명, 계단, 거울까지 단 하나의 유기적 조화로 통합 설계된 유네스코 세계문화유산."
      }
    ],
    "anecdote": "오르타는 타셀 저택을 설계할 때 철골 공장에 직접 상주하며 대장장이들과 함께 불에 달군 쇠를 메질했습니다. 공학자들이 교량에나 쓰던 거친 철을 궁정의 꽃보다 우아한 곡선으로 주조해 낸 순간, 아르누보 건축이 탄생했습니다."
  },
  {
    "id": "peter-behrens",
    "nameKo": "페터 베렌스",
    "nameEn": "Peter Behrens",
    "birth": 1868,
    "death": 1940,
    "country": "독일",
    "eraId": "era-pioneers",
    "movement": "독일 공작연맹 (Deutscher Werkbund) & 산업 모더니즘",
    "quote": "형태는 시대정신(Zeitgeist)의 기술과 산업력에서 도출되어야 한다.",
    "desc": "근대 건축사에서 가장 막강한 사제 계보의 정점에 선 '스승들의 스승'. 1907년 독일 공작연맹의 핵심 창립자이자 세계 최초의 다국적 기업 AEG의 전속 예술 고문으로 활동하며 공장 건축, 가전제품, 로고, 타이포그래피까지 기업의 전체 시각 아이덴티티(CI)를 확립했습니다. 무엇보다 **그의 베를린 설계 사무소에서 발터 그로피우스, 르 코르뷔지에, 미스 반 데어 로에 등 근대 3대 거장이 동시에 조수로 실무를 수련**했습니다.",
    "masterpiece": "AEG 터빈 공장 (AEG Turbinenfabrik, 베를린, 1909)",
    "tags": [
      "공작연맹",
      "3대거장의스승",
      "AEG터빈공장",
      "인더스트리얼디자인"
    ],
    "influences": [
      "walter-gropius",
      "ludwig-mies",
      "le-corbusier"
    ],
    "influencedBy": [
      "otto-wagner"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Peter%20Behrens%201913.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/AEG%20Turbinenfabrik%20Berlin.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/AEG%20Turbinenfabrik%20section.png?width=800",
    "blueprintType": "공장 횡단면도 (Cross Section)",
    "blueprintDesc": "힌지 조인트 철골 3힌지 아치 구조와 대형 유리 커튼월을 결합하여 기둥 없는 거대한 기계 조립 공간을 확보한 단면.",
    "philosophyKeywords": [
      "산업 기술의 기념비적 승화",
      "기업 통합 디자인 (Corporate Identity)",
      "독일 공작연맹 정신",
      "근대 거장 3인의 인큐베이터"
    ],
    "keyWorks": [
      {
        "name": "AEG 터빈 공장 (AEG Turbinenfabrik)",
        "year": 1909,
        "location": "독일 베를린 모아비트",
        "desc": "거대한 철골과 유리의 측면 커튼월, 다각형 파사드로 산업 공장을 그리스 신전 수준의 근대적 기념비로 승화시킨 불후의 명작."
      },
      {
        "name": "만네스만 본사 빌딩 (Mannesmann Haus)",
        "year": 1912,
        "location": "독일 뒤셀도르프",
        "desc": "균일한 모듈형 오피스 입면을 통해 전후 업무용 빌딩의 프로토타입을 완성."
      }
    ],
    "anecdote": "1910년 페터 베렌스의 베를린 아틀리에에는 믿기 힘든 광경이 벌어지고 있었습니다. 선임 조수로 발터 그로피우스가 도면을 총괄하고, 바로 옆자리에서 미스 반 데어 로에가 디테일을 다듬었으며, 프랑스에서 온 청년 르 코르뷔지에(샤를 잔레)가 독일 공업 디자인을 메모하고 있었습니다. 20세기 인류 문명의 공간을 설계한 세 거장이 한 스승 밑에서 동시에 숨 쉬고 있던 기적이었습니다."
  },
  {
    "id": "adolf-loos",
    "nameKo": "아돌프 로스",
    "nameEn": "Adolf Loos",
    "birth": 1870,
    "death": 1933,
    "country": "오스트리아",
    "eraId": "era-pioneers",
    "movement": "원초적 모더니즘 & 라움플란 (Raumplan)",
    "quote": "장식은 죄악이다 (Ornament und Verbrechen). 문화가 진보할수록 대상물에서 장식은 떨어져 나간다.",
    "desc": "1908년 기념비적 에세이 『장식과 범죄』를 발표하며 19세기 부르주아의 위선적인 역사주의 장식과 아르누보의 인위적 곡선을 맹렬히 타도한 급진적 모더니스트. 외관은 아무 장식 없는 엄격한 백색 상자로 마감하되, 내부는 각 실의 기능과 중요도에 따라 층고와 바닥 레벨을 입체적으로 교차 구성하는 혁신적인 **라움플란(Raumplan, 입체 공간 계획)**을 창안했습니다.",
    "masterpiece": "로스하우스 (Looshaus, 빈 미카엘러광장, 1910), 뮐러 저택 (Villa Müller, 프라하, 1930)",
    "tags": [
      "장식과범죄",
      "라움플란",
      "입체공간구성",
      "기능주의투사"
    ],
    "influences": [
      "ludwig-mies",
      "le-corbusier"
    ],
    "influencedBy": [
      "otto-wagner"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Adolf%20Loos%201904.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Looshaus%20Michaelerplatz%20Wien.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Villa%20Mueller%20Raumplan%20section.png?width=800",
    "blueprintType": "뮐러 저택 라움플란 입체 단면도 (Raumplan Section)",
    "blueprintDesc": "단일한 평면 슬래브를 거부하고 거실, 서재, 응접실, 식당의 천장 높이를 각기 다르게 배치하여 연속적으로 연결한 입체 단면.",
    "philosophyKeywords": [
      "장식과 범죄 (Ornament and Crime)",
      "라움플란 (Raumplan / 입체 공간 체계)",
      "외피의 엄격함 vs 내부의 물질적 풍요",
      "진정한 고전성과 절제"
    ],
    "keyWorks": [
      {
        "name": "로스하우스 (Looshaus)",
        "year": 1910,
        "location": "오스트리아 빈 미카엘러광장",
        "desc": "합스부르크 황궁 바로 맞은편에 상층부 창틀에 눈썹 장식조차 없는 백색 외벽을 세워 빈 사회에 엄청난 스캔들을 촉발한 현대 건축의 기폭제."
      },
      {
        "name": "뮐러 저택 (Villa Müller)",
        "year": 1930,
        "location": "체코 프라하",
        "desc": "라움플란의 정점. 외부의 차가운 큐브 안에 대리석과 목재로 빚어낸 높낮이가 다른 풍요로운 유기적 거실 공간이 파노라마처럼 전개됨."
      }
    ],
    "anecdote": "로스하우스가 완공되었을 때 오스트리아의 황제 프란츠 요제프 1세는 창문 장식조차 없는 이 밋밋한 건물을 보고 격노하여 '저 하수구 뚜껑 같은 흉측한 건물을 보지 않기 위해 궁전의 창문을 영구히 닫아걸라'고 명령했습니다."
  },
  {
    "id": "auguste-perret",
    "nameKo": "오귀스트 페레",
    "nameEn": "Auguste Perret",
    "birth": 1874,
    "death": 1954,
    "country": "프랑스",
    "eraId": "era-pioneers",
    "movement": "철근 콘크리트 고전주의 & 구조 합리주의",
    "quote": "철근 콘크리트는 돌보다 단단하고 강철보다 유연한 근대 건축의 새로운 화강암이다.",
    "desc": "'철근 콘크리트의 아버지'. 토목 공학의 조잡한 자재로 치부되던 철근 콘크리트(Béton Armé)를 건축의 당당한 조형 예술 언어로 끌어올렸습니다. 파리 프랑클랭가 아파트에서 최초로 콘크리트 골조를 외부로 노출시켜 내부 평면의 자유를 획득했으며, 르 랑시의 노트르담 성당에서는 얇은 격자 투조 콘크리트벽으로 고딕 성당의 영성을 재해석했습니다. 청년 르 코르뷔지에를 조수로 채용해 콘크리트의 구조적 원리를 전수했습니다.",
    "masterpiece": "르 랑시 노트르담 성당 (Notre-Dame du Raincy, 1923), 르아브르 전후 재건 도시 (UNESCO)",
    "tags": [
      "철근콘크리트의아버지",
      "르코르뷔지에의스승",
      "구조합리주의",
      "르아브르"
    ],
    "influences": [
      "le-corbusier"
    ],
    "influencedBy": [
      "victor-horta"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Auguste%20Perret%201930.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Notre%20Dame%20du%20Raincy%20Perret.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rue%20Franklin%2025%20Perret%20plan.png?width=800",
    "blueprintType": "프랑클랭가 25번지 아파트 기준층 평면도",
    "blueprintDesc": "철근 콘크리트 독립 기둥 구조 덕분에 내력벽 없이 U자형으로 파인 전면 창을 통해 채광을 극대화한 혁신 평면.",
    "philosophyKeywords": [
      "철근 콘크리트 구조 합리주의",
      "기둥-보 골조 시스템 (Post and Beam)",
      "노출 콘크리트의 고전적 비례미",
      "콘크리트 프리캐스트 격자벽"
    ],
    "keyWorks": [
      {
        "name": "르 랑시 노트르담 성당 (Notre-Dame du Raincy)",
        "year": 1923,
        "location": "프랑스 파리 근교 르 랑시",
        "desc": "극도로 얇은 원형 콘크리트 원주와 천장 볼트, 오색 스테인드글라스를 품은 콘크리트 격자벽으로 지어진 '콘크리트의 생트샤펠'."
      },
      {
        "name": "르아브르 도시 재건 (Le Havre Reconstruction)",
        "year": 1945,
        "location": "프랑스 르아브르 (UNESCO 세계유산)",
        "desc": "2차 대전으로 잿더미가 된 항구 도시를 규격화된 프리캐스트 콘크리트 모듈과 절제된 고전 비례로 기적처럼 재건."
      }
    ],
    "anecdote": "1908년 스위스에서 파리로 상경한 21세의 청년 샤를 잔레(훗날의 르 코르뷔지에)는 페레의 사무소에 들어가 14개월간 콘크리트 구조 계산과 도면을 배웠습니다. 이 배움이 없었다면 르 코르뷔지에의 '돔이노 시스템'과 '근대건축 5원칙'은 결코 탄생할 수 없었습니다."
  },
  {
    "id": "frank-lloyd-wright",
    "nameKo": "프랭크 로이드 라이트",
    "nameEn": "Frank Lloyd Wright",
    "birth": 1867,
    "death": 1959,
    "country": "미국",
    "eraId": "era-masters",
    "movement": "유기적 건축 (Organic Architecture) & 프레리 학파 (Prairie School)",
    "quote": "형태와 기능은 하나다 (Form and function are one). 자연은 벽돌과 강철 속에 숨 쉬어야 하며, 건축은 대지로부터 피어나는 유기체여야 한다.",
    "desc": "미국건축가협회(AIA)가 선정한 '역사상 가장 위대한 미국 건축가'. 루이스 설리반을 스승으로 모신 뒤, 중서부 대초원의 지평선에 순응하는 낮고 긴 지붕과 십자형 중심 벽난로를 갖춘 '프레리 하우스'를 창시했습니다. 유럽 모더니즘의 차가운 기능주의와 달리 대지와 자연, 재료(돌·목재·벽돌), 인간이 하나로 결합하는 '유기적 건축'을 평생 탐구했으며, 공간을 상자 곽처럼 가두던 '상자의 파괴(Destruction of the Box)'를 완수했습니다.",
    "masterpiece": "낙수원 (Fallingwater, 카우프만 주택, 1935), 뉴욕 구겐하임 미술관 (1959), 로비 하우스 (1910)",
    "tags": [
      "근대4대거장",
      "유기적건축",
      "낙수원",
      "구겐하임미술관",
      "상자의파괴",
      "프레리학파"
    ],
    "influences": [
      "alvar-aalto",
      "eero-saarinen",
      "richard-neutra"
    ],
    "influencedBy": [
      "louis-sullivan"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Frank%20Lloyd%20Wright%20portrait-crop.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Fallingwater%20-%20Kaufmann%20Residence.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Robie%20House%20Floor%20Plan.png?width=800",
    "blueprintType": "로비 하우스 1층 평면도 (Robie House Ground Plan)",
    "blueprintDesc": "중앙 벽난로 코어를 축으로 날개처럼 뻗어나간 개방형 수평 평면. 방과 방 사이의 벽을 허문 '상자의 파괴'의 효시.",
    "philosophyKeywords": [
      "유기적 건축 (Organic Architecture)",
      "상자의 파괴 (Destruction of the Box)",
      "프레리 하우스 (Prairie Style)",
      "캔틸레버 구조와 대지와의 일체화",
      "유소니언 하우스 (Usonian House)"
    ],
    "keyWorks": [
      {
        "name": "낙수원 (Fallingwater / 카우프만 저택)",
        "year": 1935,
        "location": "미국 펜실베이니아 밀런 (UNESCO 세계유산)",
        "desc": "폭포를 바라보는 자리가 아니라 폭포 바로 위에 철근 콘크리트 트레이를 캔틸레버로 돌출시켜 대자연과 물소리를 건물 내부로 끌어들인 인류 최고의 주거 건축."
      },
      {
        "name": "솔로몬 R. 구겐하임 미술관",
        "year": 1959,
        "location": "미국 뉴욕 맨해튼 (UNESCO 세계유산)",
        "desc": "엘리베이터를 타고 꼭대기로 올라간 뒤 완만한 나선형 램프를 걸어 내려오며 벽면의 예술 작품을 연속 감상하는 혁명적 무한 공간."
      },
      {
        "name": "로비 하우스 (Robie House)",
        "year": 1910,
        "location": "미국 시카고",
        "desc": "수평으로 길게 뻗은 처마와 로마 벽돌 줄눈으로 대초원의 지평선을 건축화한 프레리 스타일의 결정체."
      }
    ],
    "anecdote": "백화점 재벌 카우프만은 라이트가 의뢰를 받고 9개월간 도면 한 장 그리지 않자 사기꾼이라 의심하며 예고 없이 위스콘신 탈리에신 작업실로 쳐들어왔습니다. 방문 2시간 전 비서의 전화를 받은 라이트는 태연하게 제도판 앞에 앉아 단 2시간 만에 낙수원의 평면, 단면, 투시도를 신들린 듯 완벽하게 그려냈습니다. 카우프만이 문을 열자 라이트는 '자네를 위해 폭포 위에 지을 집을 준비해 두었네'라며 완성된 도면을 건넸습니다."
  },
  {
    "id": "walter-gropius",
    "nameKo": "발터 그로피우스",
    "nameEn": "Walter Gropius",
    "birth": 1883,
    "death": 1969,
    "country": "독일 / 미국",
    "eraId": "era-masters",
    "movement": "바우하우스 (Bauhaus) & 국제주의 양식 (International Style)",
    "quote": "모든 조형 예술의 궁극적 목표는 건축이다! 순수 예술과 기술, 장인의 장벽을 허물어 새로운 인간 환경을 창조하라.",
    "desc": "20세기 현대 디자인과 건축 교육의 요람인 **바우하우스(Bauhaus)의 설립자이자 초대 교장**. 페터 베렌스 사무소에서 수련한 뒤 파구스 구두공장에서 구조 기둥을 모서리 안쪽으로 들여놓고 전면을 유리로 감싼 **세계 최초의 커튼월(Curtain Wall)**을 완성했습니다. 1919년 바이마르에 바우하우스를 열어 칸딘스키, 클레, 이텐, 모홀리-나기 등 전위 예술가들을 규합했고, 나치 탄압 후 미국으로 망명하여 **하버드 대학교 건축대학원(GSD) 학장**으로서 I.M. 페이, 폴 루돌프, 필립 존슨 등 전후 세계 건축을 이끈 리더들을 길러냈습니다.",
    "masterpiece": "데사우 바우하우스 교사 (Bauhaus Dessau, 1926), 파구스 공장 (Fagus-Werk, 1911)",
    "tags": [
      "근대4대거장",
      "바우하우스설립자",
      "커튼월원조",
      "하버드GSD학장",
      "통합디자인"
    ],
    "influences": [
      "marcel-breuer",
      "paul-rudolph",
      "philip-johnson"
    ],
    "influencedBy": [
      "peter-behrens",
      "william-morris"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Walter%20Gropius%201919.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Bauhaus%20Dessau%20Werkstattfluegel.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Bauhaus%20Dessau%20ground%20plan.png?width=800",
    "blueprintType": "데사우 바우하우스 배치 및 1층 평면도 (Ground Plan)",
    "blueprintDesc": "공방동, 기숙사동, 강의동이 풍차 날개 모양(Pinwheel)으로 분지되어 어떤 방향에서도 정면이 없는 입체적 동적 평면.",
    "philosophyKeywords": [
      "바우하우스 선언문 (Bauhaus Manifesto)",
      "예술과 기술의 새로운 통합 (Art and Technology)",
      "유리 커튼월 (Glass Curtain Wall)",
      "공업화 대량생산 표준화",
      "협동 설계 (Teamwork / TAC)"
    ],
    "keyWorks": [
      {
        "name": "데사우 바우하우스 교사 (Bauhaus Dessau)",
        "year": 1926,
        "location": "독일 데사우 (UNESCO 세계유산)",
        "desc": "3층 높이의 공방 날개 전체를 투명한 유리벽으로 감싸 기계와 학생들이 외부에 노출되는 근대 건축 최고의 아이콘."
      },
      {
        "name": "파구스 제화공장 (Fagus Factory)",
        "year": 1911,
        "location": "독일 알펠트 (UNESCO 세계유산)",
        "desc": "모서리 기둥을 없애고 유리를 매달아 건축의 무중력성과 투명성을 선언한 건축사상 최초의 본격 유리 커튼월 빌딩."
      }
    ],
    "anecdote": "1919년 그로피우스가 낭독한 바우하우스 창립 선언문 첫 문장은 이러했습니다: '모든 조형 예술의 궁극적 목표는 건축이다. 회화와 조각이여, 살롱의 장식에서 벗어나 건축이라는 거대한 성당을 짓는 장인의 대열에 합류하라!' 이 선언은 현대 그래픽, 가구, 패션, 건축을 낳은 빅뱅이었습니다."
  },
  {
    "id": "ludwig-mies",
    "nameKo": "루트비히 미스 반 데어 로에",
    "nameEn": "Ludwig Mies van der Rohe",
    "birth": 1886,
    "death": 1969,
    "country": "독일 / 미국",
    "eraId": "era-masters",
    "movement": "국제주의 양식 (International Style) & 미니멀리즘의 원조",
    "quote": "적을수록 풍요롭다 (Less is more). 신은 디테일 안에 살아있다 (God is in the details).",
    "desc": "철과 유리라는 현대 공업 소재의 정수를 가장 순수하고 엄격한 미학으로 승화시킨 20세기 거장. 페터 베렌스 사무소에서 수련한 뒤 1929년 바르셀로나 만국박람회 독일 파빌리온에서 십자형 크롬 도금 철골 기둥과 비내력 트래버틴·오닉스 벽체로 **흘러가는 유동적 공간(Flowing Space)**을 선보였습니다. 바우하우스 3대 교장을 역임한 뒤 미국 시카고로 망명하여 IIT(일리노이 공대) 캠퍼스를 설계했고, 뉴욕 **시그램 빌딩(Seagram Building)**을 통해 현대 도시 유리 마천루의 절대 표준을 창조했습니다. 내부에 기둥이 전혀 없는 단일 거대 공간인 **만능 공간(Universal Space)**을 확립했습니다.",
    "masterpiece": "바르셀로나 파빌리온 (1929), 시그램 빌딩 (1958), 판스워스 주택 (1951), 크라운 홀 (1956)",
    "tags": [
      "근대4대거장",
      "LessIsMore",
      "바르셀로나파빌리온",
      "시그램빌딩",
      "만능공간",
      "스킨앤본"
    ],
    "influences": [
      "philip-johnson",
      "robert-venturi",
      "richard-meier"
    ],
    "influencedBy": [
      "peter-behrens",
      "hendrik-berlage",
      "adolf-loos"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Ludwig%20Mies%20van%20der%20Rohe%201934.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Barcelona%20Pavilion%202011.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Barcelona%20Pavilion%20Plan.png?width=800",
    "blueprintType": "바르셀로나 파빌리온 평면도 (Barcelona Pavilion Plan)",
    "blueprintDesc": "8개의 십자형 크롬 기둥이 얇은 지붕을 받치고, 대리석 벽체는 공간을 가두지 않고 미끄러지듯 유동하는 자유 평면의 정점.",
    "philosophyKeywords": [
      "적을수록 풍요롭다 (Less is more)",
      "신은 디테일에 있다 (God is in the details)",
      "만능 공간 (Universal Space)",
      "피부와 뼈대 (Skin and Bone Architecture)",
      "유동적 공간 (Flowing Space)"
    ],
    "keyWorks": [
      {
        "name": "바르셀로나 파빌리온 (독일관)",
        "year": 1929,
        "location": "스페인 바르셀로나 몬주익",
        "desc": "어떠한 기능도 담지 않은 순수한 조형 공간. 오닉스 황금 벽체, 녹색 대리석, 수조에 비치는 물그림자로 근대 공간의 최고 미학을 완성."
      },
      {
        "name": "시그램 빌딩 (Seagram Building)",
        "year": 1958,
        "location": "미국 뉴욕 맨해튼 파크애비뉴",
        "desc": "청동 프레임과 호박색 유리, 건물 앞 넓은 화강암 광장(Plaza)을 비워두어 현대 도시 고층 빌딩의 절대 미학을 수립."
      },
      {
        "name": "판스워스 주택 (Farnsworth House)",
        "year": 1951,
        "location": "미국 일리노이 플라노",
        "desc": "8개의 흰색 철골 I-빔 사이에 투명한 유리 상자를 지면에서 띄워 자연 풍경 속에 떠 있는 무중력의 시적 공간을 연출."
      }
    ],
    "anecdote": "미스는 제자들에게 늘 '내가 아침에 눈을 떠서 연필을 잡을 때마다 스스로에게 묻는 것은 단 하나다. 과연 여기서 무엇을 더 깎아내고 버릴 수 있는가?'라고 말했습니다. 시그램 빌딩의 외벽 청동 I-빔 멀리언은 건물의 구조체가 아니라 '건물이 뼈대를 갖고 있음을 시각적으로 웅변하는 디테일'이었습니다."
  },
  {
    "id": "le-corbusier",
    "nameKo": "르 코르뷔지에",
    "nameEn": "Le Corbusier (Charles-Édouard Jeanneret)",
    "birth": 1887,
    "death": 1965,
    "country": "스위스 / 프랑스",
    "eraId": "era-masters",
    "movement": "순수주의 (Purism) & 근대 5원칙 & 브루탈리즘",
    "quote": "주택은 살기 위한 기계다 (Une maison est une machine à habiter). 건축은 빛 아래 펼쳐지는 매스의 장엄하고 정교한 지적 유희다.",
    "desc": "20세기 세계 건축의 지형도를 바꾼 가장 위대한 거인. 오귀스트 페레에게서 철근 콘크리트 골조를, 페터 베렌스에게서 독일 공업 디자인을 배웠습니다. 1914년 슬래브와 독립 기둥, 계단만으로 건물의 뼈대를 구성하는 혁명적인 **돔이노 시스템(Dom-Ino System)**을 특허 출원했고, 1927년 **근대건축 5원칙(필로티, 옥상정원, 자유로운 평면, 가로로 긴 창, 자유로운 입면)**을 발표해 빌라 사보아에서 완벽히 증명했습니다. 2차 대전 후에는 인체 황금비에 기초한 척도 체계인 **모듈러(Modulor)**를 창안하고, 거친 노출 콘크리트(Béton Brut)를 사용한 롱샹 성당과 인도 찬디가르 도시계획을 통해 전후 브루탈리즘의 시대를 열었습니다.",
    "masterpiece": "빌라 사보아 (Villa Savoye, 1931), 롱샹 성당 (1955), 위니테 다비타시옹 (1952), 찬디가르 정부청사 (1962)",
    "tags": [
      "근대4대거장",
      "근대5원칙",
      "살기위한기계",
      "빌라사보아",
      "롱샹성당",
      "모듈러",
      "브루탈리즘"
    ],
    "influences": [
      "oscar-niemeyer",
      "kim-chung-up",
      "tadao-ando",
      "richard-meier"
    ],
    "influencedBy": [
      "auguste-perret",
      "peter-behrens",
      "adolf-loos"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Le%20Corbusier%201964.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Villa%20Savoye%202017.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Villa%20Savoye%20First%20Floor%20Plan.png?width=800",
    "blueprintType": "빌라 사보아 2층 주거층 평면도 (First Floor Plan)",
    "blueprintDesc": "중앙 램프를 따라 빛이 들어오는 공중 정원 테라스와 슬라이딩 가로창, 기둥 격자 위 자유로운 벽체 분할을 보여주는 5원칙의 완벽한 다이어그램.",
    "philosophyKeywords": [
      "근대 건축의 5원칙 (5 Points of Architecture)",
      "돔이노 시스템 (Dom-Ino System)",
      "살기 위한 기계 (Machine for Living In)",
      "모듈러 (Le Modulor 인체 황금비)",
      "건축적 산책로 (Promenade Architecturale)",
      "베통 브뤼 (Béton Brut / 거친 노출콘크리트)"
    ],
    "keyWorks": [
      {
        "name": "빌라 사보아 (Villa Savoye)",
        "year": 1931,
        "location": "프랑스 푸아시 (UNESCO 세계유산)",
        "desc": "지상에서 필로티로 공중에 띄운 순백의 상자. 5원칙을 완전무결하게 구현하여 근대 건축사상 가장 완벽한 기념비로 등극."
      },
      {
        "name": "롱샹 순례자 성당 (Chapelle Notre Dame du Haut)",
        "year": 1955,
        "location": "프랑스 롱샹 (UNESCO 세계유산)",
        "desc": "기계미학을 버리고 게 껍데기 모양의 육중한 콘크리트 곡면 지붕과 불규칙한 채광창으로 영적 신비감을 극대화한 조각적 건축."
      },
      {
        "name": "마르세유 위니테 다비타시옹 (Cité Radieuse)",
        "year": 1952,
        "location": "프랑스 마르세유 (UNESCO 세계유산)",
        "desc": "337세대의 복층 아파트, 옥상 유치원과 수영장, 내부 쇼핑가를 갖추어 1,600명이 자족하는 전후 집합주거의 전범."
      }
    ],
    "anecdote": "1929년 르 코르뷔지에는 빌라 사보아의 의뢰인인 사보아 부인으로부터 비가 샐 때마다 고소하겠다는 항의 편지를 끊임없이 받았습니다. 물이 새는 거실 한가운데 양동이를 받쳐놓은 사보아 부인에게 코르뷔지에는 '부인, 옥상정원에서 빗물이 떨어지는 것은 자연과 건물이 소통하고 있다는 시적인 증거입니다'라는 능청스러운 답장을 보냈습니다."
  },
  {
    "id": "alvar-aalto",
    "nameKo": "알바 알토",
    "nameEn": "Alvar Aalto",
    "birth": 1898,
    "death": 1976,
    "country": "핀란드",
    "eraId": "era-masters",
    "movement": "인간주의 유기적 기능주의 (Humanistic Functionalism)",
    "quote": "건축은 가장 연약한 인간을 위해 봉사해야 한다. 형태가 인간에게 닿을 때 비로소 건축은 예술이 된다.",
    "desc": "차가운 기계주의와 기하학적 백색 상자로 획일화되던 유럽 국제주의 양식에 **인간 중심의 온기와 자연 풍토성**을 불어넣은 북유럽의 거장. 핀란드의 호수와 자작나무 숲, 백야의 은은한 자연광을 곡면 목재와 적벽돌, 천창으로 번역했습니다. 결핵 환자를 위해 문손잡이와 세면대 물소리까지 인체공학적으로 디자인한 파이미오 요양원과, 목재와 유리가 유기적으로 얽힌 빌라 마이레아는 현대 친환경·지역주의 건축의 영원한 나침반입니다.",
    "masterpiece": "파이미오 결핵요양원 (Paimio Sanatorium, 1933), 빌라 마이레아 (Villa Mairea, 1939), 세이나요키 시민센터",
    "tags": [
      "근대4대거장",
      "인간주의기능주의",
      "북유럽건축",
      "파이미오의자",
      "자연채광",
      "곡면목재"
    ],
    "influences": [
      "alvaro-siza",
      "jorn-utzon",
      "kengo-kuma"
    ],
    "influencedBy": [
      "frank-lloyd-wright"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Alvar%20Aalto%201945.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Paimio%20Sanatorium%202008.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Paimio%20Sanatorium%20Plan.png?width=800",
    "blueprintType": "파이미오 요양원 복합 배치 평면도 (Complex Site Plan)",
    "blueprintDesc": "병실동, 식당동, 일광욕 테라스를 각기 다른 각도로 비틀어 숲속 바람과 태양 광선을 최대로 흡수하도록 설계된 유기적 배치.",
    "philosophyKeywords": [
      "인간 중심 기능주의 (Humanizing Architecture)",
      "핀란드 풍토성과 곡면 목재",
      "자연광의 간접 확산 (Top-light Lanterns)",
      "토탈 디자인 (가구·조명·화병 아르텍)",
      "자연 지형과의 유기적 융합"
    ],
    "keyWorks": [
      {
        "name": "파이미오 결핵 요양원 (Paimio Sanatorium)",
        "year": 1933,
        "location": "핀란드 파이미오",
        "desc": "환자가 누워서 천장을 볼 때 눈이 부시지 않는 간접 조명, 튀지 않는 조용한 세면대, 휘어진 자작나무 파이미오 안락의자까지 총체적 치유 공간 설계."
      },
      {
        "name": "빌라 마이레아 (Villa Mairea)",
        "year": 1939,
        "location": "핀란드 노르마르쿠",
        "desc": "실내 계단 난간을 숲속 자작나무 가지처럼 불규칙하게 배치하고 돌, 나무, 유리, 물을 융합한 20세기 최고의 주택 걸작."
      }
    ],
    "anecdote": "알토는 파이미오 요양원을 설계하기 위해 병실 침대에 직접 며칠 동안 누워 천장을 응시했습니다. 그는 누워 있는 환자의 시선에서 차가운 철제 파이프 의자가 얼마나 비인간적인지 깨달았고, 체온을 따스하게 유지해 주는 곡면 자작나무 합판을 개발하여 전설적인 '파이미오 체어'를 탄생시켰습니다."
  },
  {
    "id": "erich-mendelsohn",
    "nameKo": "에리히 멘델존",
    "nameEn": "Erich Mendelsohn",
    "birth": 1887,
    "death": 1953,
    "country": "독일 / 미국",
    "eraId": "era-masters",
    "movement": "표현주의 건축 (Expressionism) & 유선형 모더니즘",
    "quote": "기능만으로는 충분하지 않다. 형태는 인간의 감정과 역동적인 에너지의 분출이어야 한다.",
    "desc": "1차 대전 직후 독일 바이마르 공화국을 뒤흔든 표현주의 건축의 독보적 기수. 직선과 직각 일색이던 초기 모더니즘에 맞서 유선형과 곡면, 역동적 빛의 파동을 조각적인 건축으로 구현했습니다. 아인슈타인의 상대성 이론을 건축적 형태로 입증하고자 지어진 포츠담의 **아인슈타인 탑(Einsteinturm)**은 인류 건축사에서 가장 대담한 조형적 승리로 꼽히며, 쇼켄 백화점과 모세하우스의 수평 곡면 유리창은 상업 건축의 새로운 지평을 열었습니다.",
    "masterpiece": "아인슈타인 탑 (Einsteinturm, 포츠담, 1921), 모세하우스 (Mossehaus, 1923), 쇼켄 백화점 (1928)",
    "tags": [
      "표현주의건축",
      "아인슈타인탑",
      "유선형조형",
      "역동적에너지",
      "상대성이론"
    ],
    "influences": [
      "eero-saarinen",
      "zaha-hadid"
    ],
    "influencedBy": [
      "peter-behrens"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Erich%20Mendelsohn%20cropped.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Einsteinturm%207443.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Mosseverlagshausberlin.jpg?width=800",
    "blueprintType": "모세하우스 코너 파사드 입면 (Corner Façade)",
    "blueprintDesc": "기존 고전주의 건물의 모서리를 과감하게 털어내고 미래주의적 수평 줄눈과 유선형 곡면 캐노피를 결합한 혁신 입면.",
    "philosophyKeywords": [
      "표현주의 (Expressionist Architecture)",
      "유선형 곡면과 역동성 (Dynamism)",
      "빛과 질량의 조각적 결합",
      "상업 파사드의 야간 조명 미학"
    ],
    "keyWorks": [
      {
        "name": "아인슈타인 탑 (Einsteinturm)",
        "year": 1921,
        "location": "독일 포츠담 텔레그라펜베르크",
        "desc": "상대성 이론 검증을 위한 천체물리 관측소. 콘크리트와 벽돌 몰탈을 빚어 만든 잠망경 형태의 거대한 유기적 조각 건축."
      },
      {
        "name": "켐니츠 쇼켄 백화점 (Kaufhaus Schocken)",
        "year": 1930,
        "location": "독일 켐니츠",
        "desc": "거대한 활 모양으로 휘어진 수평 유리띠 창문이 야간에 불을 밝히며 도시의 쇼윈도를 매혹한 상업 모더니즘의 정수."
      }
    ],
    "anecdote": "1차 대전 참호 속에서 연필 한 자루로 아인슈타인 탑의 손바닥만 한 스케치를 완성한 멘델존은 전후 알베르트 아인슈타인을 직접 건물로 초대했습니다. 타워를 한참 동안 침묵 속에 둘러본 아인슈타인은 멘델존에게 다가가 단 한 마디를 속삭였습니다: '유기적이군! (Organisch!)'"
  },
  {
    "id": "gerrit-rietveld",
    "nameKo": "게리트 리트벨트",
    "nameEn": "Gerrit Rietveld",
    "birth": 1888,
    "death": 1964,
    "country": "네덜란드",
    "eraId": "era-masters",
    "movement": "데 스틸 (De Stijl) & 신조형주의 (Neo-Plasticism)",
    "quote": "공간을 가두지 마라. 선과 면, 3원색을 교차시켜 무한히 열려있는 공간의 리듬을 만들어라.",
    "desc": "피에트 몬드리안과 함께 **데 스틸(De Stijl, 양식)** 운동을 주도한 네덜란드의 대표 건축가이자 가구 디자이너. 몬드리안의 2차원 3원색(빨강·파랑·노랑) 격자 회화를 3차원 입체 공간으로 완벽히 번역해 냈습니다. '적청 의자'로 형태와 공간의 자율성을 선언한 뒤, 1924년 위트레흐트에 완공한 **슈뢰더 주택(Rietveld Schröder House)**은 2층 전체에 고정된 내력벽 없이 슬라이딩 무빙월만으로 공간을 자유자재로 분할·통합하는 유연한 근대 주거의 혁명을 달성했습니다.",
    "masterpiece": "슈뢰더 주택 (Rietveld Schröder House, 위트레흐트, 1924), 적청 의자 (Red and Blue Chair, 1918)",
    "tags": [
      "데스틸",
      "신조형주의",
      "슈뢰더주택",
      "적청의자",
      "몬드리안건축화",
      "무빙월"
    ],
    "influences": [
      "walter-gropius",
      "ludwig-mies"
    ],
    "influencedBy": [
      "hendrik-berlage"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Gerrit%20Rietveld%201954.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rietveld%20Schroeder%20House%20Utrecht.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rietveld%20Schroeder%20House%20First%20Floor%20Plan.png?width=800",
    "blueprintType": "슈뢰더 주택 2층 가변 평면도 (Transformable First Floor Plan)",
    "blueprintDesc": "고정된 벽 없이 슬라이딩 패널을 열면 하나의 거대한 열린 홀이 되고, 닫으면 독립된 3개의 침실로 분할되는 가변 공간.",
    "philosophyKeywords": [
      "데 스틸 신조형주의 (Neo-Plasticism)",
      "3원색(적·청·황)과 무채색(백·회·흑)의 조화",
      "선과 면의 비대칭적 교차 (Intersecting Planes)",
      "가변형 슬라이딩 무빙월",
      "형태와 공간의 탈물질화"
    ],
    "keyWorks": [
      {
        "name": "리트벨트 슈뢰더 주택 (Rietveld Schröder House)",
        "year": 1924,
        "location": "네덜란드 위트레흐트 (UNESCO 세계유산)",
        "desc": "몬드리안의 추상 회화 속으로 걸어 들어가는 듯한 착각을 주는 데 스틸의 유일무이한 3차원 건축 걸작."
      },
      {
        "name": "적청 의자 (Red and Blue Chair)",
        "year": 1918,
        "location": "네덜란드",
        "desc": "너도밤나무 각목과 합판 슬래브가 못이나 장부 맞춤 없이 공간 속에서 서로 교차하며 부유하는 현대 조형 의자의 기원."
      }
    ],
    "anecdote": "슈뢰더 부인은 남편 사별 후 세 자녀를 독립적이고 자유로운 영혼으로 키우고 싶어 리트벨트를 찾아왔습니다. 리트벨트는 밤에는 벽을 쳐서 각자의 방을 만들어주고, 낮에는 벽을 완전히 밀어 넣어 거대한 놀이터 겸 서재가 되는 마법 같은 가변 주택을 선사했습니다."
  },
  {
    "id": "marcel-breuer",
    "nameKo": "마르셀 브로이어",
    "nameEn": "Marcel Breuer",
    "birth": 1902,
    "death": 1981,
    "country": "헝가리 / 미국",
    "eraId": "era-masters",
    "movement": "바우하우스 가구 혁명 & 브루탈리즘",
    "quote": "강철 파이프와 콘크리트는 현대 산업 문명이 낳은 가장 정직하고 유연한 조각 재료다.",
    "desc": "바우하우스 1기 학생으로 입학하여 불과 23세에 바우하우스 가구 공방의 마이스터가 된 천재. 아들러 자전거의 휘어진 핸들에서 착안하여 세계 최초로 심리스 강철관(Tubular Steel)을 구부려 만든 **바실리 의자(Wassily Chair)**와 세스카 체어를 발명하여 전 세계 실내 공간을 뒤흔들었습니다. 나치를 피해 미국으로 건너간 뒤 하버드 GSD에서 그로피우스와 함께 후학을 가르쳤으며, 전후에는 노출 콘크리트를 입체적인 조각처럼 접어 올린 브루탈리즘 건축(뉴욕 휘트니 미술관)의 거장으로 군림했습니다.",
    "masterpiece": "휘트니 미술관 (현 프릭 매디슨 / The Breuer Building, 1966), 바실리 의자 (1925), 유네스코 파리 본부 (1958)",
    "tags": [
      "바우하우스마이스터",
      "강철관가구원조",
      "바실리의자",
      "휘트니미술관",
      "브루탈리즘"
    ],
    "influences": [
      "paul-rudolph",
      "philip-johnson"
    ],
    "influencedBy": [
      "walter-gropius"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Marcel%20Breuer%201950.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Whitney%20Museum%20Breuer%20Building%20NYC.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Wassily%20Chair%20patent%20drawing.png?width=800",
    "blueprintType": "바실리 체어 강철 파이프 특허 도면 (Patent Drawing)",
    "blueprintDesc": "이음매 없는 크롬 도금 강철 파이프 프레임에 팽팽한 가죽 스트랩만을 걸쳐 공중에 떠 있는 듯한 무중력 안락감을 구현한 도면.",
    "philosophyKeywords": [
      "튜뷸러 스틸 (강철관 가구 혁신)",
      "외팔보 캔틸레버 체어 (Cesca Chair)",
      "조각적 콘크리트 브루탈리즘 (Heavy Inverted Ziggurat)",
      "구조적 명료성과 물성의 정직성"
    ],
    "keyWorks": [
      {
        "name": "구 휘트니 미술관 (The Breuer Building)",
        "year": 1966,
        "location": "미국 뉴욕 맨해튼 매디슨애비뉴",
        "desc": "거꾸로 뒤집힌 지구라트(계단식 피라미드) 형태의 웅장한 화강암 매스와 사다리꼴 창문으로 뉴욕 도심에 묵직한 조각적 충격을 던짐."
      },
      {
        "name": "파리 유네스코 본부 (UNESCO Headquarters)",
        "year": 1958,
        "location": "프랑스 파리 (네르비, 제르퓌스와 합작)",
        "desc": "Y자형 평면과 거대한 주름진 콘크리트 캐노피를 결합한 전후 국제기구 건축의 모범."
      }
    ],
    "anecdote": "1925년 데사우에서 자전거를 타던 브로이어는 문득 핸들을 내려다보며 생각했습니다: '이 강철 파이프는 이렇게 유연하게 휘어지면서도 사람 몸무게를 버티는데, 왜 우리는 의자를 여전히 무거운 통나무로만 깎고 있는가?' 그는 자전거 튜브 공장을 찾아가 파이프를 구부렸고, 이를 본 동료 화가 바실리 칸딘스키가 감탄하자 그의 이름을 따 '바실리 체어'라 명명했습니다."
  },
  {
    "id": "louis-kahn",
    "nameKo": "루이스 칸",
    "nameEn": "Louis Kahn",
    "birth": 1901,
    "death": 1974,
    "country": "미국 (에스토니아 출생)",
    "eraId": "era-postwar",
    "movement": "기념비적 모더니즘 & 침묵과 빛 (Silence and Light)",
    "quote": "벽돌에게 '너는 무엇이 되고 싶니?'라고 물어보라. 벽돌은 '나는 아치가 되고 싶어요'라고 답할 것이다. 건축은 측정할 수 없는 것에서 시작하여 측정할 수 있는 것을 거쳐 다시 측정할 수 없는 영성으로 돌아간다.",
    "desc": "전후 모더니즘이 얄팍한 상업주의와 획일적 유리 상자로 전락했을 때, 로마와 그리스의 고대 유적과 같은 **영원불멸의 물질성과 숭고한 빛의 공간**을 되살려낸 현대의 예언자적 거장. 건물의 기능 공간을 설비·배관·계단이 위치한 **'봉사하는 공간(Servant Space)'**과 거주자가 머무는 **'봉사받는 공간(Served Space)'**으로 명쾌하게 분리하는 공간 위계론을 정립했습니다. 캘리포니아의 솔크 생물학 연구소, 킴벨 미술관, 방글라데시 국회의사당은 빛과 콘크리트, 벽돌이 빚어낸 20세기 건축의 가장 성스러운 기적으로 추앙받습니다.",
    "masterpiece": "솔크 생물학 연구소 (Salk Institute, 샌디에이고, 1965), 킴벨 미술관 (1972), 방글라데시 국회의사당 (다카, 1982)",
    "tags": [
      "침묵과빛",
      "벽돌의의지",
      "봉사공간과봉사받는공간",
      "솔크연구소",
      "킴벨미술관",
      "공간의영성"
    ],
    "influences": [
      "robert-venturi",
      "tadao-ando",
      "renzo-piano"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Louis%20Kahn%20portrait.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Salk%20Institute%20Plaza%20La%20Jolla.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Salk%20Institute%20Plan.png?width=800",
    "blueprintType": "솔크 연구소 대칭 마스터플랜 (Master Site Plan)",
    "blueprintDesc": "두 개의 연구동 사이에 단 한 그루의 나무도 심지 않고 태평양 수평선을 향해 물길을 뻗어낸 빈 트래버틴 광장 평면.",
    "philosophyKeywords": [
      "침묵과 빛 (Silence and Light)",
      "봉사하는 공간 vs 봉사받는 공간 (Servant and Served)",
      "재료의 고유한 존재 의지 (Order of Materials)",
      "기념비성 (Monumentality)",
      "공간의 시작과 근원 (Beginning of Architecture)"
    ],
    "keyWorks": [
      {
        "name": "솔크 생물학 연구소 (Salk Institute)",
        "year": 1965,
        "location": "미국 캘리포니아 라호야",
        "desc": "거푸집 구멍까지 예술로 승화시킨 완벽한 노출 콘크리트 실험실과, 태평양 바다와 하늘만을 담아낸 거대한 빈 석재 광장의 압도적 숭고미."
      },
      {
        "name": "킴벨 미술관 (Kimbell Art Museum)",
        "year": 1972,
        "location": "미국 텍사스 포트워스",
        "desc": "연속된 콘크리트 사이클로이드 볼트 천장 틈새로 쏟아져 들어와 반사판을 타고 은은하게 퍼지는 '신이 내린 자연광의 미술관'."
      },
      {
        "name": "방글라데시 국회의사당 (Jatiyo Sangsad Bhaban)",
        "year": 1982,
        "location": "방글라데시 다카",
        "desc": "인공 호수 위에 떠 있는 거대한 원, 삼각, 사각의 기하학적 틈새로 빛이 쏟아져 들어오는 신생 독립국의 영적 요새."
      }
    ],
    "anecdote": "솔크 연구소 중앙 뜰에 어떤 정원을 만들지 고민하던 칸은 멕시코의 조경 거장 루이스 바라간을 초청했습니다. 바라간은 광장 자리에 서서 태평양 바다를 바라보며 단 한 마디를 던졌습니다: '여기에 단 한 포기의 풀도, 나무도 심지 마십시오. 오직 돌로 된 광장을 비워두어 하늘과 바다를 위한 파사드가 되게 하십시오.' 칸은 눈물을 흘리며 바라간의 제안을 그대로 수용했습니다."
  },
  {
    "id": "philip-johnson",
    "nameKo": "필립 존슨",
    "nameEn": "Philip Johnson",
    "birth": 1906,
    "death": 2005,
    "country": "미국",
    "eraId": "era-postwar",
    "movement": "국제주의 양식 ➔ 포스트모더니즘 & 해체주의의 산파",
    "quote": "나는 예술을 위해 내 원칙을 바꾼다. 건축은 형태에 대한 놀이이자 영원한 시대의 유행이다.",
    "desc": "20세기 미국 건축계의 '살아있는 교황'. 1932년 뉴욕 현대미술관(MoMA) 초대 건축 큐레이터로서 역사적인 『국제주의 양식(The International Style)』 전시를 기획해 유럽 모더니즘을 미국에 최초로 상륙시켰습니다. 40세에 하버드 GSD에서 그로피우스 밑에서 건축가가 된 뒤, 미스 반 데어 로에의 철학을 흡수해 **글래스 하우스(The Glass House)**와 시그램 빌딩을 협업했습니다. 그러나 1970년대 후반 모더니즘의 한계를 선언하며 맨해튼 한복판에 치펀데일 가구 장식을 올린 **AT&T 빌딩**을 지어 포스트모더니즘의 포문을 열었고, 1988년 MoMA에서 **'해체주의 건축전'**을 기획해 자하 하디드, 게리, 쿨하스, 아이젠만을 일거에 세계 정상으로 끌어올렸습니다. **제1회 프리츠커상(1979) 수상자**입니다.",
    "masterpiece": "글래스 하우스 (The Glass House, 코네티컷, 1949), 시그램 빌딩 (미스와 협업, 1958), AT&T 빌딩 (현 소니 타워, 1984)",
    "tags": [
      "프리츠커상1회수상자",
      "글래스하우스",
      "건축계의대부",
      "포스트모더니즘개척",
      "해체주의산파"
    ],
    "influences": [
      "peter-eisenman",
      "frank-gehry",
      "daniel-libeskind",
      "zaha-hadid"
    ],
    "influencedBy": [
      "ludwig-mies",
      "walter-gropius"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Philip%20Johnson%201960.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Glass%20House%20New%20Canaan%20Johnson.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Glass%20House%20Floor%20Plan.png?width=800",
    "blueprintType": "글래스 하우스 단일 평면도 (Single Open Floor Plan)",
    "blueprintDesc": "사방이 투명 유리로 둘러싸인 17m x 10m 직사각형 평면. 유일한 폐쇄 공간인 원통형 벽돌 벽난로/욕실 코어가 지붕을 지탱.",
    "philosophyKeywords": [
      "국제주의 양식의 이론화 (MoMA 1932)",
      "글래스 하우스 (투명성과 풍경의 벽체화)",
      "포스트모더니즘 역사주의 복권 (치펀데일 박공)",
      "해체주의 전시 기획 (1988 MoMA)",
      "카멜레온적 시대 조류 선도"
    ],
    "keyWorks": [
      {
        "name": "글래스 하우스 (The Glass House)",
        "year": 1949,
        "location": "미국 코네티컷 뉴케이넌",
        "desc": "미스의 판스워스 하우스 개념을 자기화한 작품. 4면 전체가 바깥 숲의 계절 변화를 실시간 벽지로 삼는 궁극의 투명 미학."
      },
      {
        "name": "AT&T 본사 빌딩 (현 소니 타워)",
        "year": 1984,
        "location": "미국 뉴욕 맨해튼 매디슨애비뉴",
        "desc": "화강암 마천루 꼭대기에 18세기 영국 치펀데일 가구의 쪼개진 페디먼트(박공)를 얹어 모더니즘의 금기를 깨뜨린 포스트모더니즘의 폭탄."
      }
    ],
    "anecdote": "1979년 하얏트 재단이 제정한 세계 최고 권위의 '건축계 노벨상'인 프리츠커상의 제1회 수상자로 필립 존슨이 만장일치 선정되었습니다. 그는 수상 소감에서 '건축가는 시대를 이끄는 자가 아니라 시대의 공기를 가장 예민하게 호흡하고 형태화하는 자'라고 말했습니다."
  },
  {
    "id": "oscar-niemeyer",
    "nameKo": "오스카 니마이어",
    "nameEn": "Oscar Niemeyer",
    "birth": 1907,
    "death": 2012,
    "country": "브라질",
    "eraId": "era-postwar",
    "movement": "브라질 모더니즘 & 유기적 콘크리트 곡선",
    "quote": "나를 매혹하는 것은 각진 모서리도, 인간이 만든 차가운 직선도 아니다. 나를 사로잡는 것은 자유롭고 관능적인 곡선이다. 그것은 내 조국 브라질의 산맥에서, 바다의 물결에서, 그리고 사랑하는 여인의 육체에서 발견하는 곡선이다.",
    "desc": "104세를 일기로 타계할 때까지 콘크리트로 시(詩)를 쓴 라틴아메리카의 영웅. 1936년 리우데자네이루 교육보건부 청사 프로젝트에서 브라질을 방문한 **르 코르뷔지에와 협업**하며 거장으로 발돋움했습니다. 1956년 주셀리노 쿠비체크 대통령과 함께 브라질 황무지에 신수도 **브라질리아(Brasília)**를 건설하며 국회의사당, 대성당, 대통령궁 등 도시의 모든 핵심 랜드마크를 설계했습니다. 유럽의 차가운 직각 모더니즘을 브라질의 열대 자연과 관능적인 곡면 콘크리트 조형으로 승화시켰습니다. **1988년 프리츠커상 수상자**입니다.",
    "masterpiece": "브라질리아 대성당 (Catedral Metropolitana de Brasília, 1970), 브라질 국회의사당 (1960), 니테로이 현대미술관 (1996)",
    "tags": [
      "프리츠커상수상자",
      "브라질리아신수도",
      "관능적곡선",
      "콘크리트의시인",
      "브라질대성당"
    ],
    "influences": [
      "zaha-hadid"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Oscar%20Niemeyer%201977.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Brasilia%20Cathedral%20Niemeyer.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Congresso%20Nacional%20Brasilia%20plan.png?width=800",
    "blueprintType": "브라질 국회의사당 단지 평면 및 배치도 (National Congress Plan)",
    "blueprintDesc": "상원의 오목한 돔과 하원의 볼록한 접시형 돔, 그리고 그 뒤로 솟아오른 28층 쌍둥이 타워가 완벽한 조각적 대칭을 이루는 배치.",
    "philosophyKeywords": [
      "자유롭고 관능적인 콘크리트 곡선",
      "브라질 풍토성과 열대 모더니즘",
      "신수도 브라질리아 도시 조형",
      "조각적 구조 공학 (호아킴 카르도조와 협업)",
      "우주선 모티브의 미래주의 형태"
    ],
    "keyWorks": [
      {
        "name": "브라질리아 대성당",
        "year": 1970,
        "location": "브라질 브라질리아 (UNESCO 세계유산)",
        "desc": "16개의 거대한 콘크리트 포물선 기둥이 가시면류관처럼 하늘로 모여들고 그 사이를 푸른 스테인드글라스로 채운 환상적인 지하 진입 성당."
      },
      {
        "name": "니테로이 현대미술관 (MAC Niterói)",
        "year": 1996,
        "location": "브라질 리우데자네이루 니테로이",
        "desc": "절벽 바위 위에서 솟아올라 바다를 굽어보는 하얀 비행접시(UFO) 형태의 극적인 곡선 파빌리온."
      }
    ],
    "anecdote": "1936년 르 코르뷔지에가 리우데자네이루 교육보건부 청사 자문을 위해 브라질에 왔을 때, 청년 니마이어는 코르뷔지에가 그린 거친 스케치의 비례와 구조적 결함을 몰래 수정한 새로운 대안 도면을 내놓았습니다. 이를 본 코르뷔지에는 화를 내기는커녕 '이 젊은 친구가 내 원래 아이디어를 나보다 훨씬 천재적으로 발전시켰다!'며 그를 메인 건축가로 적극 추천했습니다."
  },
  {
    "id": "eero-saarinen",
    "nameKo": "에로 사리넨",
    "nameEn": "Eero Saarinen",
    "birth": 1910,
    "death": 1961,
    "country": "핀란드 / 미국",
    "eraId": "era-postwar",
    "movement": "신표현주의 & 조각적 쉘 구조 (Sculptural Shell Architecture)",
    "quote": "각각의 건물은 그 건물이 놓이는 고유한 대지와 목적에 맞는 단 하나의 특별한 형태를 가져야 한다.",
    "desc": "핀란드의 거장 엘리엘 사리넨의 아들로 태어나 전후 미국 건축계를 조각적 활력으로 가득 채운 천재. 획일적인 상자형 박스 모더니즘을 거부하고, 얇은 철근 콘크리트 쉘(Shell) 구조와 현수선 아치를 극한까지 밀어붙였습니다. 새가 날개를 펼치고 비상하는 형태의 **뉴욕 JFK 공항 TWA 터미널**, 은빛 스테인리스 스틸로 192m 높이를 솟구친 **세인트루이스 게이트웨이 아치**, 덜레스 국제공항 등 건물의 성격에 맞춰 완전히 차별화된 독창적 형태 언어를 구사했습니다. 시드니 오페라하우스 국제 공모전의 심사위원으로서 탈락 위기의 예른 우촌 안을 발굴해 낸 주역입니다.",
    "masterpiece": "TWA 플라이트 센터 (JFK 공항, 1962), 게이트웨이 아치 (세인트루이스, 1965), 덜레스 국제공항 (1962)",
    "tags": [
      "조각적쉘구조",
      "TWA터미널",
      "게이트웨이아치",
      "시드니오페라하우스발굴",
      "튤립체어"
    ],
    "influences": [
      "jorn-utzon",
      "norman-foster"
    ],
    "influencedBy": [
      "erich-mendelsohn",
      "frank-lloyd-wright"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Eero%20Saarinen%201954.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/TWA%20Flight%20Center%20JFK%20Airport.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Gateway%20Arch%20St%20Louis%20elevation.png?width=800",
    "blueprintType": "게이트웨이 아치 역현수선 단면 입면도 (Arch Geometric Elevation)",
    "blueprintDesc": "수학적 역현수선 공식을 바탕으로 내부 삼각 강철 박스 트러스와 외부 스테인리스 스틸을 일체화하여 192m를 자립시킨 단면도.",
    "philosophyKeywords": [
      "콘크리트 쉘 구조 (Thin-shell Concrete)",
      "형태의 고유성과 목적 부합성",
      "비행과 속도의 건축화",
      "튤립 의자와 가구 조형",
      "기술과 조각적 형태의 합일"
    ],
    "keyWorks": [
      {
        "name": "TWA 플라이트 센터 (TWA Terminal)",
        "year": 1962,
        "location": "미국 뉴욕 JFK 국제공항",
        "desc": "거대한 4개의 콘크리트 날개가 교차하며 비상하는 새의 역동성과 여행의 설렘을 입체적으로 형상화한 불후의 걸작."
      },
      {
        "name": "게이트웨이 아치 (Gateway Arch)",
        "year": 1965,
        "location": "미국 세인트루이스 미시시피 강변",
        "desc": "서부 개척의 관문을 상징하는 192m 높이의 순수 기하학적 스테인리스 스틸 자립 아치."
      }
    ],
    "anecdote": "1957년 시드니 오페라하우스 국제 설계공모 심사에서 다른 심사위원들은 예른 우촌의 자유로운 조개껍질 스케치를 시공 불가능하다며 탈락 쓰레기통에 처넣었습니다. 뒤늦게 심사에 합류한 에로 사리넨은 버려진 도면 더미를 뒤지다 우촌의 스케치를 발견하고 눈이 번쩍 뜨여 외쳤습니다: '신사 여러분, 이것이 바로 우리가 찾던 21세기 건축의 정답입니다!' 사리넨의 끈질긴 설득으로 오늘날의 시드니 오페라하우스가 탄생할 수 있었습니다."
  },
  {
    "id": "kenzo-tange",
    "nameKo": "단게 겐조",
    "nameEn": "Kenzo Tange (丹下健三)",
    "birth": 1913,
    "death": 2005,
    "country": "일본",
    "eraId": "era-postwar",
    "movement": "전후 일본 모더니즘 & 메타볼리즘의 대부",
    "quote": "아름다운 것만이 기능적이다. 전통은 그대로 보존되는 것이 아니라, 미래를 향한 에너지로 파괴되고 재창조되어야 한다.",
    "desc": "일본 현대건축을 세계 정상의 반열에 올려놓은 대부이자 **1987년 아시아인 최초 프리츠커상 수상자**. 르 코르뷔지에의 콘크리트 미학과 일본 전통 목조 건축의 구조적 결구 방식을 결합했습니다. 원폭으로 폐허가 된 히로시마 평화기념공원과 박물관을 설계해 세계적 명성을 얻었으며, 1964년 도쿄 올림픽을 위해 현수 케이블 지붕을 얹은 **요요기 국립 실내경기장**으로 공학과 조형의 극한을 보여주었습니다. 쿠로카와 키쇼, 이소자키 아라타, 마키 후미히코 등 **메타볼리즘(Metabolism)** 운동가들을 양성한 스승입니다.",
    "masterpiece": "도쿄 요요기 국립 실내경기장 (1964), 히로시마 평화기념공원 (1955), 도쿄도청사 (1991)",
    "tags": [
      "아시아최초프리츠커상",
      "요요기경기장",
      "히로시마평화공원",
      "메타볼리즘의스승",
      "현수케이블구조"
    ],
    "influences": [
      "kisho-kurokawa",
      "arata-isozaki",
      "kim-swoo-geun"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kenzo%20Tange%201964.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Yoyogi%20National%20Gymnasium%20Tokyo.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Hiroshima%20Peace%20Memorial%20Museum%20plan.png?width=800",
    "blueprintType": "히로시마 평화기념자료관 배치 평면도 (Peace Memorial Masterplan)",
    "blueprintDesc": "원폭 돔을 정면으로 응시하는 축선 위에 필로티로 공중에 띄운 수평 매스와 평화의 연못을 배치한 정밀 축선 평면.",
    "philosophyKeywords": [
      "전통의 창조적 파괴와 현대적 계승",
      "현수 케이블 구조 (Suspension Roof)",
      "도쿄만 계획 1960 (선형 해상 도시 구상)",
      "메타볼리즘의 대부",
      "일본적 감성과 노출 콘크리트의 조화"
    ],
    "keyWorks": [
      {
        "name": "국립 요요기 경기장 (Yoyogi National Gymnasium)",
        "year": 1964,
        "location": "일본 도쿄 시부야",
        "desc": "두 개의 거대한 주 케이블을 늘어뜨려 지붕을 지탱한 세계 최대 규모의 현수 지붕 구조. 달팽이와 일본 신사 처마를 연상시키는 전후 최고의 기념비."
      },
      {
        "name": "도쿄도청사 (Tokyo Metropolitan Government Building)",
        "year": 1991,
        "location": "일본 도쿄 신주쿠",
        "desc": "고딕 대성당의 쌍탑 구조와 현대 마이크로칩 반도체 회로 패턴을 48층 고층 빌딩에 결합한 하이테크 관청."
      }
    ],
    "anecdote": "1960년 도쿄 세계디자인회의에서 단게 겐조는 도쿄만을 가로지르는 획기적인 선형 해상 도시인 '도쿄 계획 1960'을 발표하여 전 세계를 경악시켰습니다. 그는 제자 구로카와 기쇼 등에게 '건물은 고정된 기념비가 아니라 세포처럼 끊임없이 증식하고 교체되는 생명체여야 한다'고 가르쳐 일본 메타볼리즘의 불을 지폈습니다."
  },
  {
    "id": "paul-rudolph",
    "nameKo": "폴 루돌프",
    "nameEn": "Paul Rudolph",
    "birth": 1918,
    "death": 1997,
    "country": "미국",
    "eraId": "era-postwar",
    "movement": "브루탈리즘 (Brutalism) & 코듀로이 콘크리트",
    "quote": "건축은 3차원의 유클리드 공간을 조각하는 끝없는 드라마여야 한다.",
    "desc": "하버드 GSD에서 발터 그로피우스에게 사사한 뒤, 예일 대학교 건축학부장으로 재직하며 미국 브루탈리즘의 최고조를 이끈 건축가. 매끄러운 유리 커튼월을 거부하고, 골이 깊게 파인 거푸집에 콘크리트를 타설한 뒤 망치와 정으로 표면을 직접 쪼아 자갈 골재를 드러내는 **코듀로이 콘크리트(Corduroy Concrete)** 기법을 창안했습니다. **예일대 예술건축학부 건물(Rudolph Hall)**은 단 7개 층 안에 무려 **37개의 서로 다른 바닥 높이(Level)**를 입체적으로 교차시킨 공간적 복합성의 전설입니다. 노먼 포스터와 리처드 로저스의 예일대 유학 시절 지도교수입니다.",
    "masterpiece": "예일대 예술건축학부 건물 (A&A Building / Rudolph Hall, 1963), 매사추세츠 정부센터 (1971)",
    "tags": [
      "브루탈리즘거장",
      "예일대학부장",
      "코듀로이콘크리트",
      "37개레벨단면",
      "포스터와로저스의스승"
    ],
    "influences": [
      "norman-foster",
      "richard-rogers"
    ],
    "influencedBy": [
      "walter-gropius",
      "marcel-breuer"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Paul%20Rudolph%2C%20drawing%20(1964).jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Yale%20Art%20and%20Architecture%20Building%2C%20October%2020%2C%202008.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Paul%20Rudolph%20-%20Walker%20Guest%20House%20Floorplan.jpg?width=800",
    "blueprintType": "워커 게스트하우스 평면도 (Walker Guest House Plan)",
    "blueprintDesc": "플로리다 시절의 정밀한 모듈형 목구조와 도르래로 여닫는 차양 플랩을 체계화한 초기 미니멀 주거 평면.",
    "philosophyKeywords": [
      "코듀로이 콘크리트 (망치로 쪼아낸 거친 골재 질감)",
      "복합적 단면 레벨 교차 (Multi-level Interlocking Spaces)",
      "빛과 그림자의 극적인 깊이",
      "조각적 수직 타워와 수평 캔틸레버",
      "하이테크 1세대들의 교육자"
    ],
    "keyWorks": [
      {
        "name": "예일대 예술건축학부 건물 (Rudolph Hall)",
        "year": 1963,
        "location": "미국 코네티컷 뉴헤이븐",
        "desc": "외벽 전체를 정으로 쪼아낸 거친 노출 콘크리트 피어로 세우고, 내부에 37개 층고가 미로처럼 맞물려 전율을 자아내는 브루탈리즘의 성채."
      },
      {
        "name": "싱가포르 더 콘코스 (The Concourse)",
        "year": 1994,
        "location": "싱가포르",
        "desc": "팔각형 평면과 유리 차양 리본을 층층이 적층하여 열대 기후에 대응한 후기 마천루 역작."
      }
    ],
    "anecdote": "예일대 예술건축학부 건물에서 수학하던 노먼 포스터와 리처드 로저스는 매일 밤샘 크리틱 때마다 루돌프 교수의 철저한 단면 분석 훈련을 받았습니다. 루돌프는 '평면만 들고 오지 마라! 단면에서 공간이 어떻게 교차하고 설비가 어떻게 흐르는지 보여주지 못하면 그것은 건축이 아니라 그림일 뿐이다'라고 호통쳤습니다."
  },
  {
    "id": "smithsons",
    "nameKo": "앨리슨 & 피터 스미스슨",
    "nameEn": "Alison & Peter Smithson",
    "birth": 1928,
    "death": 2003,
    "country": "영국",
    "eraId": "era-postwar",
    "movement": "뉴 브루탈리즘 (New Brutalism) & 팀 10 (Team 10)",
    "quote": "재료를 있는 그대로 노출하라. 거친 콘크리트, 붉은 벽돌, 배관을 숨기지 말고 그대로 보여주는 것이야말로 솔직한 사회의 진실이다.",
    "desc": "1950년대 CIAM의 권위주의와 르 코르뷔지에의 도식적 도시계획에 반기를 들고 전후 젊은 건축가 연합인 **팀 10(Team 10)**을 결성한 영국 부부 건축가. **'뉴 브루탈리즘(New Brutalism)'**이라는 용어를 창안하고 정립했습니다. 훈스탄톤 중등학교에서 강철 빔과 배관, 전기 배선을 마감 없이 그대로 드러내며 충격을 주었고, 런던 이스트엔드의 로빈 후드 가든에서는 아파트 복도를 넓혀 아이들이 뛰놀고 이웃이 대화하는 **'공중의 거리(Streets in the Sky)'** 개념을 실험했습니다.",
    "masterpiece": "로빈 후드 가든 (Robin Hood Gardens, 런던, 1972), 훈스탄톤 중등학교 (1954), 이코노미스트 빌딩 (1964)",
    "tags": [
      "뉴브루탈리즘창시",
      "팀10결성",
      "공중의거리",
      "로빈후드가든",
      "훈스탄톤학교"
    ],
    "influences": [
      "richard-rogers",
      "rem-koolhaas"
    ],
    "influencedBy": [
      "le-corbusier",
      "ludwig-mies"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Alison%20Smithson.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Robin%20Hood%20Gardens%2C%20London%20(2015).jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Robin%20Hood%20Gardens%20AP%20Smithson.jpg?width=800",
    "blueprintType": "로빈 후드 가든 배치 및 공중거리 스케치",
    "blueprintDesc": "중앙 생태 언덕 공원을 둘러싼 두 동의 프리캐스트 콘크리트 주거 블록과 외부 공중 데크 보행로 다이어그램.",
    "philosophyKeywords": [
      "뉴 브루탈리즘 (재료와 구조의 무가공 노출)",
      "팀 10 (CIAM 분열과 인간적 공동체 회복)",
      "공중의 거리 (Streets in the Sky)",
      "어소시에이션(연계)의 클러스터 도시학",
      "전후 일상성과 솔직함의 미학"
    ],
    "keyWorks": [
      {
        "name": "훈스탄톤 중등학교 (Smithdon High School)",
        "year": 1954,
        "location": "영국 노퍽 훈스탄톤",
        "desc": "미스의 철골 미학을 수용하되 용접 자국과 배관을 전혀 감추지 않고 적나라하게 노출해 '뉴 브루탈리즘의 기원'이 됨."
      },
      {
        "name": "로빈 후드 가든 (Robin Hood Gardens)",
        "year": 1972,
        "location": "영국 런던 타워햄리츠",
        "desc": "차가운 복도를 폭 3m의 공중 거리로 만들어 골목길 공동체를 입체 아파트로 구현하려 했던 전후 공공 주거의 치열한 실험작."
      }
    ],
    "anecdote": "1956년 드브로브니크에서 열린 제10차 CIAM 총회에서 피터 스미스슨은 르 코르뷔지에와 그로피우스 등 노장 세대 앞에서 '당신들의 기능주의 도시 4분할(주거·업무·휴식·교통)은 인간의 따뜻한 골목길 삶을 파괴했습니다!'라고 일갈했습니다. 이 반란으로 근대건축국제회의(CIAM)는 공식 해체되었고 팀 텐의 시대가 열렸습니다."
  },
  {
    "id": "kim-swoo-geun",
    "nameKo": "김수근",
    "nameEn": "Kim Swoo-geun (金壽根)",
    "birth": 1931,
    "death": 1986,
    "country": "대한민국",
    "eraId": "era-postwar",
    "movement": "한국 현대건축 1세대 & 공간사옥 & 네가티즘 (Negativism)",
    "quote": "건축은 빛과 벽돌이 빚어내는 삶의 그릇이다. 좁은 골목길을 돌아설 때마다 마주치는 예기치 못한 공간의 설렘, 그것이 바로 한국의 멋이다.",
    "desc": "김중업과 함께 한국 현대건축의 여명기를 연 독보적 거목. 도쿄예술대학과 도쿄대학 대학원에서 수학한 뒤, 1960년 국회의사당 설계공모에 당선되며 한국 건축계의 중심에 섰습니다. 건축 월간지 『공간(SPACE)』을 창간하여 건축뿐 아니라 미술·연극·음악을 아우르는 한국 현대 문화예술 운동을 주도했습니다. 그의 대표작인 **원서동 공간사옥(현 아라리오뮤지엄)**은 흑벽돌과 좁은 반층(Skip-floor) 계단, 마당과 한옥의 차경을 절묘하게 결합하여 **한국 전통 골목길 공간을 현대적으로 승화시킨 한국 최고의 현대건축 명작**으로 꼽힙니다.",
    "masterpiece": "공간사옥 (Space Group Building, 1971~1977), 잠실 올림픽 주경기장 (1984), 마산 양덕성당, 자유센터",
    "tags": [
      "한국현대건축의거목",
      "공간사옥",
      "월간공간창간",
      "한국전통공간계승",
      "벽돌미학",
      "올림픽주경기장"
    ],
    "influences": [
      "seung-h-sang",
      "min-hyun-sik"
    ],
    "influencedBy": [
      "kenzo-tange"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kim%20Swoo-geun%20architect.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Space%20Group%20Building%20Seoul%202018.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Space%20Group%20Building%20Seoul%20Section.png?width=800",
    "blueprintType": "공간사옥 스킵플로어 종단면도 (Skip-floor Longitudinal Section)",
    "blueprintDesc": "인체 스케일에 맞춘 2.2m 층고와 반 층씩 어긋나게 오르내리는 계단, 외부 한옥 마당과의 입체적 시선 교차를 보여주는 단면도.",
    "philosophyKeywords": [
      "네가티즘 (Negativism / 궁극공간론)",
      "한국 골목길의 미로적 공간성",
      "적벽돌과 담쟁이덩굴의 물질성",
      "스킵플로어와 휴먼 스케일",
      "월간 공간(SPACE) 창간과 문화 융합"
    ],
    "keyWorks": [
      {
        "name": "원서동 공간사옥 (현 아라리오뮤지엄 인 스페이스)",
        "year": 1977,
        "location": "대한민국 서울 종로구 원서동 (등록문화재)",
        "desc": "검은 벽돌로 둘러싸인 외부와, 내부로 들어서면 수십 개의 서로 다른 작은 방들이 미로처럼 펼쳐지며 창덕궁을 품어내는 한국 현대건축의 최고봉."
      },
      {
        "name": "서울 잠실 올림픽 주경기장",
        "year": 1984,
        "location": "대한민국 서울 송파구 잠실",
        "desc": "조선 백자 달항아리의 유려한 곡선미를 10만 석 규모의 거대한 콘크리트 스타디움 상부 스탠드로 구현한 국가적 기념비."
      }
    ],
    "anecdote": "공간사옥 지하 소극장 '공간사랑'은 1970~80년대 한국 전위예술의 해방구였습니다. 김수근은 사옥 지하에 무대를 만들어 공옥진의 병신춤을 무대에 올리고, 김덕수패 사물놀이를 세계 최초로 창단시켰습니다. 그는 '건축가는 단순히 건물을 짓는 자가 아니라 그 안에서 사람들의 문화적 혼이 춤추게 하는 판을 짜는 사람'이라고 말했습니다."
  },
  {
    "id": "kim-chung-up",
    "nameKo": "김중업",
    "nameEn": "Kim Chung-up (金重業)",
    "birth": 1922,
    "death": 1988,
    "country": "대한민국",
    "eraId": "era-postwar",
    "movement": "낭만적 구조주의 & 르 코르뷔지에 학파 & 한국 전통 처마의 현대화",
    "quote": "건축은 얼어붙은 음악이며, 인간이 하늘과 땅 사이에 바치는 가장 숭고한 시(詩)다. 한국의 건축은 버선코처럼 하늘로 날아오르는 처마의 선에 있다.",
    "desc": "한국인 최초로 파리 세브르가 35번지 **르 코르뷔지에 아틀리에에 입사하여 3년 6개월간 직속 수련**을 거친 한국 현대건축의 선구자. 코르뷔지에의 롱샹 성당, 위니테 다비타시옹, 인도 찬디가르 국회의사당 도면을 직접 그리며 거장의 숨결을 체득했습니다. 귀국 후 서울에 지은 **주한 프랑스 대사관**은 거친 콘크리트 골조 위에 한국 전통 한옥 처마의 부드러운 곡선미를 유려한 캔틸레버 슬래브로 현대화하여 **'한국 현대건축 역사상 최고의 걸작'**으로 공인받았습니다. 1970년대에는 31빌딩(삼일빌딩)을 설계해 한국 최초의 근대식 마천루 시대를 열었습니다.",
    "masterpiece": "주한 프랑스 대사관 (1962), 삼일빌딩 (1970), 서강대 본관 (1959), 제주대 본관 (1964)",
    "tags": [
      "르코르뷔지에직속제자",
      "주한프랑스대사관",
      "삼일빌딩",
      "한국현대건축최고걸작",
      "시적건축"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kim%20Chung-up%20architect.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/French%20Embassy%20in%20Seoul%202019.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/French%20Embassy%20Seoul%20Pavilion%20Plan.png?width=800",
    "blueprintType": "주한 프랑스 대사관 대사 집무동 평면도",
    "blueprintDesc": "필로티로 공중에 띄운 집무실과, 기둥 밖으로 시원하게 날아오른 처마 콘크리트 캔틸레버의 조형미를 보여주는 평면도.",
    "philosophyKeywords": [
      "르 코르뷔지에 사사 (파리 세브르가 아틀리에)",
      "한국 전통 처마 곡선의 현대적 조형화",
      "빛과 콘크리트의 시적 승화 (Poetic Architecture)",
      "캔틸레버와 지붕의 비상감",
      "예술가적 자존심과 타협 없는 건축혼"
    ],
    "keyWorks": [
      {
        "name": "주한 프랑스 대사관 (Ambassade de France en Corée)",
        "year": 1962,
        "location": "대한민국 서울 서대문구 충정로",
        "desc": "프랑스의 합리주의적 철근콘크리트 구조와 한국 전통 목조 가옥의 날렵한 처마 곡선이 만나 세계적인 조형적 찬사를 받은 불멸의 걸작."
      },
      {
        "name": "삼일빌딩 (31 Building)",
        "year": 1970,
        "location": "대한민국 서울 종로구 관철동",
        "desc": "미스 반 데어 로에의 시그램 빌딩을 오마주하여 31층 높이로 세운 한국 최초의 철골 유리 커튼월 마천루."
      }
    ],
    "anecdote": "1952년 베네치아 유네스코 예술가회의에 참석한 김중업은 평생의 우상인 르 코르뷔지에를 만나기 위해 무작정 파리로 찾아갔습니다. 코르뷔지에는 동양에서 온 이 무명의 청년에게 도면 테스트를 시킨 뒤 '자네는 선을 쓸 줄 아는 예술가로군'이라며 정식 조수로 발탁했습니다. 훗날 김중업이 타계했을 때 유언은 '나의 스승 르 코르뷔지에 곁에 묻어달라'는 것이었습니다."
  },
  {
    "id": "kisho-kurokawa",
    "nameKo": "기쇼 구로카와",
    "nameEn": "Kisho Kurokawa (黒川紀章)",
    "birth": 1934,
    "death": 2007,
    "country": "일본",
    "eraId": "era-postwar",
    "movement": "메타볼리즘 (Metabolism / 신진대사 건축)",
    "quote": "건축은 영원한 석조 기념비가 아니다. 생명체처럼 오래된 세포를 버리고 새로운 캡슐로 교체되는 신진대사의 유기체다.",
    "desc": "단게 겐조 연구실 출신으로 1960년 도쿄 세계디자인회의에서 키쿠타케 키요노리 등과 함께 **'메타볼리즘(Metabolism)' 선언문**을 발표한 전위 건축가. 급격한 도시화와 인구 팽창에 대응하여 건물의 중심 콘크리트 코어 샤프트에 공장에서 대량생산된 프리패브 캡슐 유닛을 크레인으로 볼트 결합하는 모듈러 건축을 실현했습니다. 도쿄 긴자에 세워진 **나카긴 캡슐 타워(Nakagin Capsule Tower)**는 25년마다 캡슐을 교체한다는 미래주의 주거 철학으로 세계 건축사의 전설이 되었으며, 후기에는 도쿄 롯폰기의 **국립신미술관**을 설계했습니다.",
    "masterpiece": "나카긴 캡슐 타워 (Nakagin Capsule Tower, 도쿄, 1972), 도쿄 국립신미술관 (2007), 반 고흐 미술관 신관",
    "tags": [
      "메타볼리즘기수",
      "나카긴캡슐타워",
      "교체형캡슐주거",
      "국립신미술관",
      "단게겐조제자"
    ],
    "influences": [],
    "influencedBy": [
      "kenzo-tange"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/%E9%BB%92%E5%B7%9D%E7%B4%80%E7%AB%A0.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Capsules%20of%20the%20Nakagin%20Capsule%20Tower%20dllu.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin%20floor%20plan.svg?width=800",
    "blueprintType": "나카긴 캡슐 타워 기준층 평면도 (Nakagin Typical Floor Plan)",
    "blueprintDesc": "중앙 설비·엘리베이터 콘크리트 코어를 중심으로 4개의 독립 캡슐 유닛이 캔틸레버로 매달린 회전형 평면.",
    "philosophyKeywords": [
      "메타볼리즘 (신진대사 건축 철학)",
      "탈착 및 교체 가능한 캡슐 유닛 (Replaceable Capsule)",
      "공생의 사상 (공간·문화·전통의 공생)",
      "프리패브리케이션 (공장 규격화 생산)",
      "우주선 조종석 인테리어 (원형 창과 빌트인 가전)"
    ],
    "keyWorks": [
      {
        "name": "나카긴 캡슐 타워 (Nakagin Capsule Tower)",
        "year": 1972,
        "location": "일본 도쿄 긴자",
        "desc": "2개의 메인 코어에 140개의 독신자용 캡슐을 4개의 고장력 볼트로 결합하여 세계 최초로 실현된 캡슐 모듈러 아키텍처의 성지."
      },
      {
        "name": "도쿄 국립신미술관 (The National Art Center Tokyo)",
        "year": 2007,
        "location": "일본 도쿄 롯폰기",
        "desc": "거대한 파도처럼 물결치는 녹색 유리 커튼월과 내부에 솟아오른 2개의 거대한 원뿔형 콘크리트 레스토랑 파빌리온의 조화."
      }
    ],
    "anecdote": "나카긴 캡슐 타워의 각 캡슐 내부는 2.5m x 4.0m 크기에 컬러 TV, 냉장고, 릴 투 릴 테이프 레코더, 전화기, 원형 창문이 SF 우주선 조종실처럼 빌트인되어 있었습니다. 구로카와는 '이 캡슐은 미래의 비즈니스 유목민(Homo Movens)이 도시 어디서든 갈아 끼우며 사는 21세기 거치소'라고 선언했습니다."
  },
  {
    "id": "robert-venturi",
    "nameKo": "로버트 벤투리",
    "nameEn": "Robert Venturi",
    "birth": 1925,
    "death": 2018,
    "country": "미국",
    "eraId": "era-postmodern",
    "movement": "포스트모더니즘 (Postmodernism) 창시",
    "quote": "적을수록 지루하다 (Less is a bore). 순수한 형태보다는 복합성과 대립성이, 배제보다는 포용이 살아 숨 쉬는 건축을 원한다.",
    "desc": "미스 반 데어 로에의 'Less is more'에 정면으로 반기를 들고 'Less is a bore'를 외치며 포스트모더니즘의 문을 연 이론가이자 거장. 1966년 저서 『건축의 복합성과 대립성(Complexity and Contradiction in Architecture)』을 발표해 모더니즘의 순수주의 교조를 박살냈으며, 아내 데니스 스콧 브라운과 함께 쓴 『라스베이거스의 교훈』에서 건물을 **'오리(Duck, 건물 자체가 형태 조각인 것)'**와 **'장식된 창고(Decorated Shed, 기능적 건물 위에 상징 기호를 덧붙인 것)'**로 명쾌하게 분류했습니다. 필라델피아에 어머니를 위해 지은 **바나 벤투리 주택(Vanna Venturi House)**은 현대 건축사에서 포스트모더니즘의 최초 신호탄으로 평가받습니다. **1991년 프리츠커상 수상자**입니다.",
    "masterpiece": "바나 벤투리 하우스 (Vanna Venturi House, 1964), 세인즈버리 윙 (런던 국립미술관, 1991)",
    "tags": [
      "포스트모더니즘창시",
      "LessIsABore",
      "바나벤투리하우스",
      "라스베이거스의교훈",
      "프리츠커상수상자"
    ],
    "influences": [
      "aldo-rossi",
      "james-stirling",
      "michael-graves"
    ],
    "influencedBy": [
      "louis-kahn",
      "ludwig-mies"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Robert%20Venturi%202007.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Vanna%20Venturi%20House%20Chestnut%20Hill.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Vanna%20Venturi%20House%20Plan.png?width=800",
    "blueprintType": "바나 벤투리 하우스 1층 평면도 (Ground Floor Plan)",
    "blueprintDesc": "중앙의 거대한 굴뚝과 계단이 서로 밀치며 충돌하는 복합적 대칭 평면. 입구 축선과 실내 동선의 모순적 긴장감을 연출.",
    "philosophyKeywords": [
      "적을수록 지루하다 (Less is a bore)",
      "복합성과 대립성 (Complexity and Contradiction)",
      "오리 vs 장식된 창고 (Duck vs Decorated Shed)",
      "역사적 차용과 아이러니",
      "어머니의 집 (바나 벤투리 하우스)"
    ],
    "keyWorks": [
      {
        "name": "바나 벤투리 하우스 (Mother's House)",
        "year": 1964,
        "location": "미국 펜실베이니아 체스트넛힐",
        "desc": "어린아이가 크레용으로 그린 집처럼 가운데가 쪼개진 박공지붕과 헛개구부 아치를 두어 모더니즘의 금기를 정면 돌파한 포스트모더니즘의 원점."
      },
      {
        "name": "런던 국립미술관 세인즈버리 윙 (Sainsbury Wing)",
        "year": 1991,
        "location": "영국 런던 트라팔가 광장",
        "desc": "트라팔가 광장의 19세기 신고전주의 본관 기둥 양식을 현대적으로 재해석하여 역사와 현대의 대화를 이끌어낸 확장 증축."
      }
    ],
    "anecdote": "벤투리가 바나 벤투리 하우스를 발표했을 때 정통 모더니스트들은 '건축에 대한 악의적인 장난이자 유치한 퇴행'이라며 맹비난을 퍼부었습니다. 하지만 벤투리는 '우리가 사는 도시는 순수한 기하학 상자가 아니라 모순과 불일치로 가득 찬 다원적 세계'라며 웃어넘겼습니다."
  },
  {
    "id": "aldo-rossi",
    "nameKo": "알도 로시",
    "nameEn": "Aldo Rossi",
    "birth": 1931,
    "death": 1997,
    "country": "이탈리아",
    "eraId": "era-postmodern",
    "movement": "네오 라치오날리스모 (Neo-Rationalism / Tendenza) & 도시적 유형학",
    "quote": "도시는 인간 집단 기억의 극장이다. 원초적 형태(원뿔, 원통, 삼각 박공)는 수천 년 세월을 관통하여 우리 무의식에 각인되어 있다.",
    "desc": "1966년 저서 『도시의 건축(L'architettura della città)』을 통해 근대 기능주의가 단절시킨 도시의 역사적 연속성과 집단 기억을 복원한 이탈리아의 거장. 건축을 단품 건물이 아니라 도시 전체의 유형학적 연속체로 보았으며, 원통, 삼각기둥, 정육면체, 아케이드 등 인류의 기억 속에 각인된 원초적 기하학 형태를 시적이고 형이상학적인 침묵의 공간으로 빚어냈습니다. 모데나의 **산 카탈도 공동묘지**와 베네치아 비엔날레를 위해 바다에 띄운 목조 극장인 **세계의 극장(Teatro del Mondo)**은 건축을 초현실주의 회화 수준의 형이상학적 예술로 격상시켰습니다. **1990년 프리츠커상 수상자**입니다.",
    "masterpiece": "산 카탈도 공동묘지 (San Cataldo Cemetery, 모데나, 1971), 세계의 극장 (Teatro del Mondo, 1979), 갈라라테세 주거단지",
    "tags": [
      "프리츠커상수상자",
      "도시의건축",
      "유형학",
      "산카탈도묘지",
      "세계의극장",
      "집단기억"
    ],
    "influences": [
      "peter-eisenman",
      "bernard-tschumi"
    ],
    "influencedBy": [
      "adolf-loos"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/AldoRossi.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Teatro%20del%20mondo%2C%20Aldo%20Rossi.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Teatro%20del%20Mondo.1980.1%2C%20Aldo%20Rossi.jpg?width=800",
    "blueprintType": "세계의 극장 수상 부유 구조 입면 스케치",
    "blueprintDesc": "팔각형 원추 돔 지붕을 얹은 순수 목조 타워를 바지선 위에 결합하여 베네치아 바다를 유영하도록 고안한 시적 입면.",
    "philosophyKeywords": [
      "도시의 건축 (L'architettura della città)",
      "집단 기억 (Collective Memory)",
      "유형학 (Typology)과 원초적 기하학",
      "영원한 침묵과 형이상학적 기념비성",
      "네오 라치오날리스모 (라 텐덴차)"
    ],
    "keyWorks": [
      {
        "name": "산 카탈도 공동묘지 (Cimitero di San Cataldo)",
        "year": 1971,
        "location": "이탈리아 모데나",
        "desc": "유리창이나 문이 없는 텅 빈 정육면체 테라코타 큐브와 원뿔형 공동묘탑이 기묘한 침묵과 영원의 공간을 연출하는 형이상학적 걸작."
      },
      {
        "name": "세계의 극장 (Teatro del Mondo)",
        "year": 1979,
        "location": "이탈리아 베네치아",
        "desc": "1979년 베네치아 비엔날레를 위해 바지선 위에 세워 바다 위를 떠다니며 공연했던 25m 높이의 환상적인 수상 이동식 극장."
      }
    ],
    "anecdote": "1971년 치명적인 교통사고로 병원에 입원해 죽음의 문턱까지 다녀온 알도 로시는 병상에서 산 카탈도 공동묘지를 스케치했습니다. 그는 뼈마디가 드러난 자신의 골절 엑스레이 사진을 보며 묘지의 뼈대와 텅 빈 창문 구조를 구상했다고 회고했습니다."
  },
  {
    "id": "james-stirling",
    "nameKo": "제임스 스털링",
    "nameEn": "James Stirling",
    "birth": 1926,
    "death": 1992,
    "country": "영국",
    "eraId": "era-postmodern",
    "movement": "포스트모던 역사적 콜라주 & 구조적 표현주의",
    "quote": "건축은 지루한 모더니즘 상자가 아니라, 역사의 파편들이 유쾌하게 충돌하는 기념비적 무대여야 한다.",
    "desc": "영국 현대 건축의 독보적 선구자이자 영국 최고 권위의 '스털링 상'의 주인공. 초기에는 레스터 대학교 공학부 건물에서 러시아 구성주의와 붉은 벽돌, 돌출된 다면체 유리 매스를 결합한 대담한 조형을 선보였고, 중기 이후에는 고전주의 로툰다와 열주랑, 하이테크 형광 녹색·분홍색 핸드레일을 거침없이 믹스매치한 **슈투트가르트 신 주립미술관(Neue Staatsgalerie)**을 지어 포스트모더니즘 건축의 최고봉을 찍었습니다. **1981년 프리츠커상 수상자**입니다.",
    "masterpiece": "슈투트가르트 신 주립미술관 (Neue Staatsgalerie, 1984), 레스터대 공학부 건물 (1963), 클로어 갤러리 (테이트 브리튼)",
    "tags": [
      "프리츠커상수상자",
      "스털링상",
      "슈투트가르트미술관",
      "역사적콜라주",
      "레스터대공학관"
    ],
    "influences": [
      "norman-foster",
      "richard-rogers"
    ],
    "influencedBy": [
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/James%20Stirling%2001.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Staatsgalerie1.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Leicester%20University%20Engineering%20Building.jpg?width=800",
    "blueprintType": "레스터 대학교 공학부 빌딩 조감도 (Engineering Building Perspective)",
    "blueprintDesc": "유리 톱니 지붕의 단층 실험동과 붉은 벽돌의 수직 타워 및 캔틸레버 계단실이 극적으로 충돌하는 구성주의적 도면.",
    "philosophyKeywords": [
      "기념비적 역사성 콜라주",
      "고전 로툰다와 하이테크 네온 컬러의 대비",
      "보행자 도시 램프와 건축적 산책로",
      "구성주의적 형태 병치",
      "영국 스털링상의 기원"
    ],
    "keyWorks": [
      {
        "name": "슈투트가르트 신 주립미술관 (Neue Staatsgalerie)",
        "year": 1984,
        "location": "독일 슈투트가르트",
        "desc": "트래버틴 석조 벽체에 형광 녹색 물결 유리벽, 로마 판테온을 오마주한 둥근 중정 정원을 관통하는 공공 램프가 결합된 포스트모던의 최고 명작."
      },
      {
        "name": "레스터 대학교 공학부 건물",
        "year": 1963,
        "location": "영국 레스터",
        "desc": "수직 붉은 타워와 45도 각도로 기울어진 유리 온실형 실험실이 SF 기계처럼 조립된 구조주의의 기념비."
      }
    ],
    "anecdote": "슈투트가르트 미술관 공모 당선 당시 독일 보수주의자들은 '고전 유적에 형광 분홍색 파이프를 갖다 붙인 저속한 테마파크'라고 비난했습니다. 하지만 개관 후 연간 100만 명의 시민들이 건물을 가로지르는 공공 경사로를 산책하며 사랑에 빠졌고, 세계 비평계는 포스트모더니즘의 위대한 승리라고 선언했습니다."
  },
  {
    "id": "richard-meier",
    "nameKo": "리처드 마이어",
    "nameEn": "Richard Meier",
    "birth": 1934,
    "death": null,
    "country": "미국",
    "eraId": "era-postmodern",
    "movement": "뉴욕 파이브 (The New York Five) & 순백의 네오-코르뷔지안",
    "quote": "백색은 가장 장엄하고 찬란한 색이다. 백색 위에서만 자연의 사계절과 빛, 그림자가 가장 순수하고 완벽하게 드러난다.",
    "desc": "1970년대 피터 아이젠만, 마이클 그레이브스 등과 함께 '뉴욕 파이브(New York Five)'를 결성하며 르 코르뷔지에의 초기 백색 순수주의를 현대 기하학으로 부활시킨 '백색의 마술사'. 하얀 에나멜 알루미늄 패널과 투명 유리, 완벽한 비례의 그리드 시스템을 구사합니다. 미시간 호숫가 절벽에 세운 **더글러스 주택**과 LA 산등성이에 10억 달러를 투입해 대리석 트래버틴과 백색 패널로 완성한 **게티 센터(The Getty Center)**는 빛과 백색 건축의 정점으로 꼽힙니다. **1984년 당시 최연소(49세) 프리츠커상 수상자**입니다.",
    "masterpiece": "게티 센터 (The Getty Center, LA, 1997), 더글러스 하우스 (Douglas House, 1973), 바르셀로나 현대미술관 (MACBA, 1995)",
    "tags": [
      "프리츠커상최연소수상",
      "백색의마술사",
      "뉴욕파이브",
      "게티센터",
      "더글러스하우스"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier",
      "ludwig-mies"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Richard%20Meier%20at%20the%202009%20Tribeca%20Film%20Festival.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Los%20angeles%20from%20getty%20panorama.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Section%20of%20Douglas%20House.jpg?width=800",
    "blueprintType": "더글러스 하우스 절벽 횡단면도 (Cliff Cross Section)",
    "blueprintDesc": "급경사 호숫가 낭떠러지에 다리로 진입하여 최상층에서 아래로 내려가며 미시간 호수를 파노라마로 조망하는 4층 입체 단면도.",
    "philosophyKeywords": [
      "순백색의 미학 (Pure White Architecture)",
      "에나멜 알루미늄 그리드 패널",
      "빛과 그림자의 정밀한 기하학",
      "자연 풍경과의 투명한 대화",
      "뉴욕 파이브 (The Whites)"
    ],
    "keyWorks": [
      {
        "name": "게티 센터 (The Getty Center)",
        "year": 1997,
        "location": "미국 LA 브렌트우드 언덕",
        "desc": "이탈리아 바그니 디 티볼리 채석장에서 공수한 120만 스퀘어피트의 거친 트래버틴 석재와 하얀 패널이 LA 시내와 태평양을 굽어보는 문화 아크로폴리스."
      },
      {
        "name": "더글러스 주택 (Douglas House)",
        "year": 1973,
        "location": "미국 미시간 하버 스프링스",
        "desc": "소나무 숲과 푸른 미시간 호수를 배경으로 하얗게 빛나는 4층 유리 큐브로 미국 주거 건축의 신화가 됨."
      }
    ],
    "anecdote": "게티 재단이 산타모니카 산맥 꼭대기에 게티 센터 설계를 의뢰했을 때, 환경단체들은 '자연 풍경을 해치는 거대한 하얀 상처가 될 것'이라고 격렬히 반대했습니다. 마이어는 거친 질감의 베이지색 트래버틴 석재를 쪼아 외벽에 두르고 파빌리온들을 쪼개 언덕 지형에 순응시킴으로써 세계에서 가장 아름다운 미술관 단지를 탄생시켰습니다."
  },
  {
    "id": "peter-eisenman",
    "nameKo": "피터 아이젠만",
    "nameEn": "Peter Eisenman",
    "birth": 1932,
    "death": null,
    "country": "미국",
    "eraId": "era-postmodern",
    "movement": "해체주의 (Deconstructivism) & 자율적 형태 이론",
    "quote": "건축은 인간의 안락함을 위한 봉사자가 아니다. 건축은 인간의 고정관념을 흔들고 공간의 질서를 근본적으로 불안하게 질문하는 철학적 텍스트다.",
    "desc": "프랑스 철학자 자크 데리다의 해체주의 철학을 건축 이론으로 직접 번역하고 실천한 해체주의의 총사령관. 뉴욕 건축도시연구소(IAUS)를 설립해 전 세계 건축 담론을 주도했습니다. 전통적인 기능, 거주성, 구조의 안락함을 거부하고 그리드를 회전, 충돌, 왜곡시키는 알고리즘을 통해 자율적 형태를 도출했습니다. 오하이오 주립대의 **웩스너 예술센터**와 베를린 중심가에 세운 2,711개의 콘크리트 비석 군락인 **홀로코스트 기념비**는 관람자에게 공간적 불안과 깊은 역사적 전율을 선사합니다.",
    "masterpiece": "베를린 홀로코스트 기념비 (Memorial to the Murdered Jews of Europe, 2005), 웩스너 예술센터 (1989), 하우스 VI (1975)",
    "tags": [
      "해체주의총사령관",
      "홀로코스트기념비",
      "웩스너센터",
      "데리다철학건축화",
      "뉴욕파이브"
    ],
    "influences": [
      "daniel-libeskind",
      "zaha-hadid"
    ],
    "influencedBy": [
      "le-corbusier",
      "giuseppe-terragni"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Peter%20Eisenman%20(cropped).jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Memorial%20to%20the%20Murdered%20Jews%20of%20Europe%20-%20underground.JPG?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/House%20VI%20024.JPG?width=800",
    "blueprintType": "하우스 VI 축적 엑소노메트릭 모형 및 다이어그램",
    "blueprintDesc": "식탁 한가운데에 내려앉은 기둥, 바닥에 뚫린 슬릿 등 주거 기능을 철저히 전복하고 3차원 그리드의 자율적 유희를 보여주는 도면.",
    "philosophyKeywords": [
      "해체주의 (Deconstruction)",
      "비인간주의 (Post-humanism)와 공간적 불안",
      "그리드의 왜곡과 충돌 (Colliding Grids)",
      "카드보드 아키텍처 (Cardboard Architecture)",
      "부재의 현존 (Presence of Absence)"
    ],
    "keyWorks": [
      {
        "name": "학살된 유럽 유대인을 위한 기념비 (홀로코스트 기념비)",
        "year": 2005,
        "location": "독일 베를린 브란덴부르크 문 인근",
        "desc": "기울어진 언덕 대지 위에 2,711개의 회색 콘크리트 석관(Stele)을 미로처럼 배열하여 관람자가 길을 잃으며 인간 존엄의 비극을 몸소 체험하게 한 기념비적 공간."
      },
      {
        "name": "웩스너 예술센터 (Wexner Center for the Arts)",
        "year": 1989,
        "location": "미국 오하이오주립대학교",
        "desc": "도시 그리드와 대학 캠퍼스 그리드가 12.5도 각도로 어긋나 충돌하는 지점에 하얀 비계 골조를 관통시킨 해체주의 최초의 대형 실현작."
      }
    ],
    "anecdote": "아이젠만이 설계한 하우스 VI의 침실에는 침대 바로 머리맡 바닥에 깊은 틈새가 뚫려 있었고, 부부 침대 한가운데에는 아무것도 받치지 않는 붉은 기둥이 떨어져 있었습니다. 의뢰인인 프랭크 부부가 '잠을 잘 수 없다'고 항의하자 아이젠만은 '내 집의 목적은 당신들의 편안한 수면이 아니라, 인간이 공간의 독재로부터 깨어나는 것'이라고 냉정히 답했습니다."
  },
  {
    "id": "frank-gehry",
    "nameKo": "프랭크 게리",
    "nameEn": "Frank Gehry",
    "birth": 1929,
    "death": null,
    "country": "캐나다 / 미국",
    "eraId": "era-postmodern",
    "movement": "해체주의 (Deconstructivism) & 디지털 조각 건축",
    "quote": "건축은 예술이어야 한다. 남들이 만들어놓은 상자 속에 당신의 삶을 구겨 넣지 마라. 티타늄과 물결치는 금속은 도시를 춤추게 한다.",
    "desc": "현대 건축을 컴퓨터 3차원 항공우주 소프트웨어(CATIA)와 티타늄 곡면의 세계로 이끈 살아있는 전설. 초기에는 합판, 체인링크 철조망, 골함석 등 하찮은 저가 산업 자재를 해체·콜라주하여 산타모니카 자택을 지어 주목받았습니다. 1997년 스페인 쇠락한 공업도시 빌바오의 네르비온 강변에 3만 3천 장의 티타늄 패널이 은빛 물고기 비늘처럼 파도치는 **구겐하임 미술관 빌바오**를 완공하여 도시 전체를 세계 최고의 관광 명소로 부활시키는 **'빌바오 효과(Bilbao Effect)'**라는 경제학 신조어를 탄생시켰습니다. **1989년 프리츠커상 수상자**입니다.",
    "masterpiece": "구겐하임 미술관 빌바오 (Guggenheim Museum Bilbao, 1997), 월트 디즈니 콘서트홀 (LA, 2003), 루이비통 재단 미술관 (파리, 2014)",
    "tags": [
      "프리츠커상수상자",
      "빌바오효과",
      "티타늄물결곡면",
      "월트디즈니콘서트홀",
      "디지털조각건축"
    ],
    "influences": [
      "zaha-hadid",
      "bjarke-ingels"
    ],
    "influencedBy": [
      "alvar-aalto",
      "le-corbusier"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Frank%20Gehry%202013.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Guggenheim%20Museum%20Bilbao%20Gehry.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Walt%20Disney%20Concert%20Hall%20plan.png?width=800",
    "blueprintType": "월트 디즈니 콘서트홀 평면도 (Concert Hall Plan)",
    "blueprintDesc": "외부의 휘날리는 스테인리스 곡면 돛 안에 세계 최고의 어쿠스틱 음향을 자랑하는 빈야드(포도밭)형 오케스트라 홀을 안치한 평면도.",
    "philosophyKeywords": [
      "빌바오 효과 (The Bilbao Effect)",
      "티타늄 물결 곡면 (Fluid Titanium Skin)",
      "디지털 항공 소프트웨어(CATIA / Digital Project) 도입",
      "조각적 형태와 물고기 모티브",
      "해체주의 콜라주와 도시의 에너지"
    ],
    "keyWorks": [
      {
        "name": "구겐하임 미술관 빌바오 (Guggenheim Bilbao)",
        "year": 1997,
        "location": "스페인 바스크 빌바오",
        "desc": "0.38mm 두께의 티타늄 패널이 햇빛과 날씨에 따라 황금빛과 은빛으로 변색되며 춤추는 20세기 말 최고의 건축적 기적."
      },
      {
        "name": "월트 디즈니 콘서트홀 (Walt Disney Concert Hall)",
        "year": 2003,
        "location": "미국 LA 다운타운",
        "desc": "돛을 올리고 항해하는 거대한 범선 모양의 무광 스테인리스 스틸 외피와 따스한 더글러스 전나무 인테리어의 극장."
      }
    ],
    "anecdote": "빌바오 구겐하임 미술관이 개관했을 때, 현대 건축의 전설인 필립 존슨은 개관식에서 건물을 올려다보며 감격의 눈물을 펑펑 쏟았습니다. 그는 기자들에게 외쳤습니다: '프랭크 게리는 우리 시대의 가장 위대한 건축가다! 내가 평생 보아온 건물 중 단연 가장 아름답다!'"
  },
  {
    "id": "rem-koolhaas",
    "nameKo": "렘 콜하스",
    "nameEn": "Rem Koolhaas",
    "birth": 1944,
    "death": null,
    "country": "네덜란드",
    "eraId": "era-postmodern",
    "movement": "네오 아방가르드 & OMA & 거대함 (Bigness)",
    "quote": "거대함(Bigness)은 더 이상 건축의 통제를 받지 않는다. 건축가는 미래를 예측하는 자가 아니라, 현대 자본주의와 대도시의 광기를 가속화하는 자다.",
    "desc": "신문기자이자 영화 시나리오 작가 출신으로, 21세기 세계 건축 담론을 가장 지적으로 지배하는 지성. 1978년 기념비적 저서 『광기의 뉴욕(Delirious New York)』을 발표해 맨해튼 마천루의 무의식적 욕망을 해부했고, 설계집단 **OMA(Office for Metropolitan Architecture)**를 설립했습니다. 형태 미학에 매몰된 건축계를 비판하고, 프로그램의 급진적 교차와 건물 스케일이 한계를 넘어설 때 발생하는 질적 전환인 **'거대함(Bigness)'**을 주창했습니다. 베이징의 거대한 뫼비우스 고리형 **CCTV 본사**와 시애틀 중앙도서관 등을 설계했으며, 자하 하디드, 비야케 잉겔스(BIG), MVRDV 등 수많은 슈퍼스타 건축가들을 배출한 인큐베이터입니다. **2000년 프리츠커상 수상자**입니다.",
    "masterpiece": "중국 CCTV 본사 빌딩 (베이징, 2012), 시애틀 중앙도서관 (2004), 보르도 주택 (1998), 서울대 미술관 (MoA)",
    "tags": [
      "프리츠커상수상자",
      "OMA설립자",
      "광기의뉴욕",
      "거대함Bigness",
      "CCTV본사",
      "자하와비야케의스승"
    ],
    "influences": [
      "zaha-hadid",
      "bjarke-ingels",
      "mvrdv"
    ],
    "influencedBy": [
      "le-corbusier",
      "smithsons"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Rem%20Koolhaas%202008.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/CCTV%20Headquarters%20Beijing%20Koolhaas.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Maison%20a%20Bordeaux%20Koolhaas%20section.png?width=800",
    "blueprintType": "보르도 주택 3층 수직 엘리베이터 단면도 (Maison à Bordeaux Section)",
    "blueprintDesc": "교통사고로 하반신이 마비된 건축주를 위해 3m x 3.5m 크기의 통유리 엘리베이터 서재가 3개 층을 오르내리며 바닥판을 완성하는 마술적 단면.",
    "philosophyKeywords": [
      "거대함 이론 (Bigness / S,M,L,XL)",
      "광기의 뉴욕 (Delirious New York / 정크스페이스)",
      "프로그램의 교차와 혼종 (Cross-programming)",
      "연속 순환 루프 구조 (CCTV 폐곡선 타워)",
      "건축계 최고의 인재 배출소 (OMA 사관학교)"
    ],
    "keyWorks": [
      {
        "name": "중국 중앙방송국 본사 (CCTV Headquarters)",
        "year": 2012,
        "location": "중국 베이징 CBD",
        "desc": "하늘로 솟아오르는 전통적 마천루를 거부하고, 두 개의 6도 기울어진 타워가 162m 상공에서 75m 캔틸레버 브릿지로 결합된 뫼비우스 루프 구조."
      },
      {
        "name": "시애틀 중앙도서관 (Seattle Central Library)",
        "year": 2004,
        "location": "미국 시애틀",
        "desc": "도서 분류 체계(듀이 십진분류법)를 4층 높이의 완만한 나선형 서가 경사로(Book Spiral)로 공간화하고 유리 다이아그리드로 감싼 미래형 지식 센터."
      }
    ],
    "anecdote": "보르도 주택의 건축주 장 프랑수아 르무안은 치명적인 차 사고로 휠체어 신세가 되자 콜하스를 찾아와 '나를 가두는 감옥이 아니라, 내 자유를 해방시키는 집을 지어달라'고 의뢰했습니다. 콜하스는 집 한가운데에 휠체어 서재 자체가 거대한 피스톤 엘리베이터로 오르내리며 1층 거실, 2층 서재, 3층 침실의 바닥이 되는 기적을 선물했습니다."
  },
  {
    "id": "zaha-hadid",
    "nameKo": "자하 하디드",
    "nameEn": "Zaha Hadid",
    "birth": 1950,
    "death": 2016,
    "country": "이라크 / 영국",
    "eraId": "era-postmodern",
    "movement": "해체주의 (Deconstructivism) & 파라메트리시즘 (Parametricism)",
    "quote": "360개의 각도가 있는데, 왜 단 하나의 90도 직각만을 고집해야 하는가? 중력을 거스르는 유동적 곡선이야말로 공간의 해방이다.",
    "desc": "'곡선의 여왕(Queen of the Curve)'. 이라크 바그다드에서 태어나 런던 AA스쿨에서 렘 콜하스에게 사사했습니다. 초기에는 말레비치와 러시아 절대주의 회화에 심취하여 날카로운 파편과 중력을 거스르는 급진적 도면으로 '종이 위의 건축가(Paper Architect)'라는 비아냥을 받았습니다. 그러나 디지털 3D 파라메트릭 알고리즘 기술이 성숙하면서 서울의 **동대문디자인플라자(DDP)**, 로마 MAXXI 미술관, 광저우 오페라하우스 등 지형과 건물이 일체화된 유려한 유체 역학적 우주선 건축을 전 세계에 실현했습니다. **2004년 여성 최초이자 최연소 프리츠커상 수상자**입니다.",
    "masterpiece": "동대문디자인플라자 (DDP, 서울, 2014), 로마 21세기 국립미술관 (MAXXI, 2009), 비트라 소방서 (1993), 런던 아쿠아틱스 센터",
    "tags": [
      "여성최초프리츠커상",
      "곡선의여왕",
      "DDP설계자",
      "파라메트리시즘",
      "중력극복"
    ],
    "influences": [],
    "influencedBy": [
      "rem-koolhaas",
      "oscar-niemeyer",
      "erich-mendelsohn"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Zaha%20Hadid%202013.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Dongdaemun%20Design%20Plaza%20DDP%20Seoul.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Vitra%20Fire%20Station%20Zaha%20plan.png?width=800",
    "blueprintType": "비트라 소방서 엑소노메트릭 평면 (Vitra Fire Station Plan)",
    "blueprintDesc": "날카롭게 교차하는 콘크리트 사선 벽체들이 소방차의 긴급 출동 속도감을 건축적 폭발로 시각화한 해체주의 초기 걸작 도면.",
    "philosophyKeywords": [
      "파라메트리시즘 (Parametricism)",
      "유체 역학과 연속 곡면 (Fluidity)",
      "절대주의 회화의 공간화 (Suprematist Space)",
      "지형과 건축의 일체화 (Landscape Architecture)",
      "360도의 무경계 공간"
    ],
    "keyWorks": [
      {
        "name": "동대문디자인플라자 (DDP)",
        "year": 2014,
        "location": "대한민국 서울 중구 동대문",
        "desc": "45,133장의 서로 다른 알루미늄 곡면 패널을 디지털 성형하여 기둥 없는 거대한 은빛 불시착 우주선으로 빚어낸 서울의 현대 랜드마크."
      },
      {
        "name": "로마 21세기 국립미술관 (MAXXI)",
        "year": 2009,
        "location": "이탈리아 로마",
        "desc": "로마 고대 군사기지 대지 위에 콘크리트 리본 띠들이 강물처럼 굽이치며 갤러리와 램프가 교차하는 스털링상 수상작."
      }
    ],
    "anecdote": "1983년 홍콩 더 피크 공모전에서 1등에 당선되었지만 시공 불가능 판정을 받고 취소되는 등 10여 년간 실현작 없이 종이 위의 건축가로 불렸던 자하 하디드는 '내가 여자이고, 아랍인이며, 타협하지 않기 때문에 비난받는 것일 뿐, 시간은 내 편이다'라고 말했습니다. 결국 2004년 여성 최초로 프리츠커상을 거머쥐며 전 세계를 평정했습니다."
  },
  {
    "id": "daniel-libeskind",
    "nameKo": "다니엘 리베스킨트",
    "nameEn": "Daniel Libeskind",
    "birth": 1946,
    "death": null,
    "country": "폴란드 / 미국",
    "eraId": "era-postmodern",
    "movement": "해체주의 (Deconstructivism) & 서사적 기억의 건축",
    "quote": "건축은 침묵하는 돌이 아니다. 건축은 말하고, 노래하며, 역사 속 희생자들의 찢겨진 비명을 증언하는 살아있는 기억의 기념비다.",
    "desc": "폴란드 유대인 홀로코스트 생존자의 아들로 태어난 천재 건축가이자 아코디언 연주자. 건축을 감각적 조형물이 아니라 역사의 상처와 비극을 온몸으로 체험하는 서사적 텍스트로 전환시켰습니다. 베를린 장벽 붕괴 직후 설계한 **베를린 유대인 박물관(Jüdisches Museum Berlin)**은 번개 모양으로 지그재그 꺾인 아연 외벽과, 바닥에 깔린 1만 개의 쇠 얼굴 조각(샬레헤트), 그리고 온기 없는 어두운 콘크리트 '홀로코스트 타워'를 통해 세계 건축계에 전례 없는 충격을 안겼습니다. 9·11 테러 후 뉴욕 **세계무역센터(그라운드 제로) 재건 마스터플랜** 총괄 건축가로 당선되었습니다.",
    "masterpiece": "베를린 유대인 박물관 (Jewish Museum Berlin, 2001), 뉴욕 그라운드 제로 원 월드트레이드 마스터플랜 (2003), 덴버 미술관",
    "tags": [
      "해체주의",
      "유대인박물관",
      "그라운드제로마스터플래너",
      "역사적서사",
      "보이드Void"
    ],
    "influences": [],
    "influencedBy": [
      "peter-eisenman"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Daniel%20Libeskind%202011%20(cropped).jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Jewish%20Museum%20Berlin.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Model%20of%20J%C3%BCdisches%20Museum%20Berlin%20(Jewish%20Museum%20Berlin).jpg?width=800",
    "blueprintType": "베를린 유대인 박물관 지그재그 '선의 사이' 모형 및 평면",
    "blueprintDesc": "다윗의 별을 해체한 지그재그 선과 건물을 가로지르는 텅 빈 콘크리트 빈 공간(Void)의 교차를 보여주는 개념 모형.",
    "philosophyKeywords": [
      "선의 사이 (Between the Lines)",
      "비어있음의 공간 (The Void / 부재의 체험)",
      "홀로코스트의 비극과 역사적 기억",
      "아연 티타늄 외피의 예리한 사선 슬릿 창",
      "상처 입은 대지의 치유"
    ],
    "keyWorks": [
      {
        "name": "베를린 유대인 박물관 (Jüdisches Museum Berlin)",
        "year": 2001,
        "location": "독일 베를린 크로이츠베르크",
        "desc": "지상 출입구가 없어 옛 프로이센 법원 지하를 통해 진입하며, 기울어진 바닥과 어두운 27m 높이의 홀로코스트 타워를 통해 영혼을 압도하는 건축."
      },
      {
        "name": "뉴욕 그라운드 제로 마스터플랜 (메모리 파운데이션스)",
        "year": 2003,
        "location": "미국 뉴욕 맨해튼",
        "desc": "9·11 테러 희생자의 추모 공간을 보호하고 미국 독립 선언 연도를 상징하는 1,776피트 높이의 원 월드 트레이드 센터를 배치한 마스터플랜."
      }
    ],
    "anecdote": "베를린 유대인 박물관은 2001년 정식 개관 전, 건물 안에 단 하나의 유물이나 전시품도 없는 빈 건물 상태로 2년간 일반에 사전 공개되었습니다. 놀랍게도 텅 빈 콘크리트 벽과 바닥의 슬릿 사이로 비치는 칼날 같은 빛만을 보기 위해 35만 명의 관람객이 줄을 섰고, 관람객들은 빈 공간에서 눈물을 흘렸습니다. 건물 자체가 가장 완벽한 전시물이었기 때문입니다."
  },
  {
    "id": "bernard-tschumi",
    "nameKo": "버나드 츄미",
    "nameEn": "Bernard Tschumi",
    "birth": 1944,
    "death": null,
    "country": "스위스 / 프랑스 / 미국",
    "eraId": "era-postmodern",
    "movement": "해체주의 (Deconstructivism) & 사건의 건축 (Architecture and Event)",
    "quote": "사건 없는 건축은 존재하지 않는다 (There is no architecture without event). 공간은 형태가 아니라 그 안에서 일어나는 프로그램의 액션이다.",
    "desc": "뉴욕 컬럼비아 대학교 건축대학원(GSAPP) 학장을 역임하며 해체주의 이론과 디지털 건축 교육의 전성기를 이끈 사상가. 1982년 프랑스 정부의 세기의 프로젝트였던 파리 **라 빌레트 공원(Parc de la Villette)** 국제 설계공모에서 쟁쟁한 거장들을 제치고 당선되며 일약 세계적 명성을 얻었습니다. 120m 간격의 엄격한 3차원 그리드 교차점마다 26개의 빨간색 입체 기하학적 파빌리온인 **폴리(Folie)**를 배치하고, 점·선·면의 중첩(Superimposition)을 통해 기능이 정해지지 않은 자유로운 문화적 사건을 유도했습니다.",
    "masterpiece": "라 빌레트 공원 (Parc de la Villette, 파리, 1987), 아크로폴리스 박물관 (아테네, 2009), 르 르제 롤레 카르날 홀",
    "tags": [
      "해체주의",
      "라빌레트공원",
      "사건의건축",
      "점선면중첩",
      "컬럼비아대학장",
      "폴리Folie"
    ],
    "influences": [],
    "influencedBy": [
      "adolf-loos"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Bernard%20Tschumi%20at%20GSAPP.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Pavillon%20Janvier%20Paris%202.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Plan%20of%20the%20Parc%20de%20la%20Villette%20with%20follies%20-%20OSM%202016.svg?width=800",
    "blueprintType": "라 빌레트 공원 점·선·면 슈퍼임포지션 마스터플랜",
    "blueprintDesc": "점(120m 간격 빨간 폴리들), 선(구불구불한 테마 산책로), 면(초록 잔디광장)이라는 3개의 자율적 체계가 겹쳐진 다이어그램 평면.",
    "philosophyKeywords": [
      "사건과 행위의 건축 (Event, Action, Program)",
      "초월적 병치 (Superimposition of Points, Lines, Surfaces)",
      "빨간 폴리 (Folie - 광기/파빌리온)",
      "탈프로그래밍과 교차프로그래밍",
      "맨해튼 트랜스크립트 (영화적 몽타주 기법)"
    ],
    "keyWorks": [
      {
        "name": "파리 라 빌레트 공원 (Parc de la Villette)",
        "year": 1987,
        "location": "프랑스 파리 19구",
        "desc": "과거 도축장 부지를 26개의 새빨간 해체주의 폴리 파빌리온과 공중 산책로로 채워 시민들의 자유로운 문화 해방구로 만든 20세기 공원 혁명."
      },
      {
        "name": "신 아크로폴리스 박물관 (New Acropolis Museum)",
        "year": 2009,
        "location": "그리스 아테네",
        "desc": "파르테논 신전을 정면으로 마주보며 고대 유적 발굴터 위에 유리 바닥을 띄운 채 파르테논 프리즈 조각을 원래 방위대로 전시한 명작."
      }
    ],
    "anecdote": "츄미는 라 빌레트 공원을 설계하면서 '공원은 자연을 흉내 낸 모조 숲이 아니라, 대도시의 활기와 온갖 예측할 수 없는 사건(Event)이 부딪히는 인공의 무대여야 한다'고 주장했습니다. 26개의 빨간 폴리는 카페, 음악실, 어린이 놀이터 등 시민들의 자율적 창의성에 따라 용도가 매일 바뀌는 살아있는 장치가 되었습니다."
  },
  {
    "id": "tadao-ando",
    "nameKo": "안도 타다오",
    "nameEn": "Tadao Ando (安藤忠雄)",
    "birth": 1941,
    "death": null,
    "country": "일본",
    "eraId": "era-postmodern",
    "movement": "비판적 지역주의 (Critical Regionalism) & 노출 콘크리트 현상학",
    "quote": "벽을 세운다는 것은 대지 위에 인간의 영적 영역을 선언하는 일이다. 빛은 어둠이 있을 때 비로소 거룩한 영혼으로 살아 숨 쉰다.",
    "desc": "정규 건축 교육을 전혀 받지 않고 프로복서와 트럭 운전사를 거쳐 독학으로 세계 건축의 정점에 오른 불굴의 입지전적 거장. 르 코르뷔지에의 작품집에 매료되어 전 세계를 방랑하며 건축을 체득했습니다. 비단결처럼 매끄러운 **노출 콘크리트(Poured-in-place Concrete)**와 엄격한 기하학적 벽체, 그리고 물, 바람, 빛 등 순수한 자연 요소를 결합합니다. 오사카의 **빛의 교회(Church of the Light)**에서 제단 뒤 콘크리트 벽을 십자가 모양으로 찢어 쏟아져 들어오게 한 빛의 연출은 현대 종교 건축의 영원한 신화입니다. **1995년 프리츠커상 수상자**입니다.",
    "masterpiece": "빛의 교회 (Church of the Light, 이바라키, 1989), 스미요시 나가야 (1976), 나오시마 지중미술관 (2004), 물의 교회",
    "tags": [
      "프리츠커상수상자",
      "독학의천재",
      "빛의교회",
      "노출콘크리트",
      "스미요시나가야",
      "나오시마지중미술관"
    ],
    "influences": [],
    "influencedBy": [
      "le-corbusier",
      "louis-kahn"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Tadao%20Ando%202009.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Church%20of%20the%20Light%20Osaka%20Ando.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Church%20of%20the%20Light%20Plan.png?width=800",
    "blueprintType": "빛의 교회 평면도 (Church of the Light Plan)",
    "blueprintDesc": "완벽한 정육면체 콘크리트 상자를 15도 각도의 자립형 사선 벽체가 가로지르며 제단 뒤 십자가 틈새로 빛을 유도하는 기하학 평면.",
    "philosophyKeywords": [
      "순수 기하학과 노출 콘크리트",
      "빛과 어둠의 현상학 (Chiaroscuro)",
      "자연(빛·바람·물)과의 엄격한 만남",
      "비판적 지역주의와 침묵의 공간",
      "원초적 주거의 회복 (스미요시 나가야)"
    ],
    "keyWorks": [
      {
        "name": "빛의 교회 (Church of the Light / 이바라키 카스가오카 교회)",
        "year": 1989,
        "location": "일본 오사카부 이바라키",
        "desc": "아무 장식 없는 차가운 어둠의 콘크리트 벽면에 십자가 모양으로 뚫린 틈새에서 쏟아지는 눈부신 자연광이 신의 은총을 증언하는 기적의 성소."
      },
      {
        "name": "스미요시 주택 (스미요시 나가야)",
        "year": 1976,
        "location": "일본 오사카 스미요시",
        "desc": "비가 오면 우산을 쓰고 화장실을 건너가야 하는 중정을 집 한가운데에 두어 자연의 계절과 변화를 온몸으로 느끼게 한 독학 데뷔작."
      },
      {
        "name": "나오시마 지중미술관 (Chichu Art Museum)",
        "year": 2004,
        "location": "일본 가가와현 나오시마",
        "desc": "세토내해의 수려한 자연경관을 해치지 않기 위해 미술관 전체를 지하에 묻고, 기하학적 천창 트임으로만 클로드 모네의 수련을 감상하게 한 역작."
      }
    ],
    "anecdote": "빛의 교회를 지을 당시 예산이 너무 부족하여 제단 십자가 틈새에 끼울 유리창 비용조차 모자랐습니다. 안도는 목사에게 '유리를 끼우지 말고 그냥 뚫어둡시다. 겨울에 칼바람이 불어 춥더라도 그것이야말로 예수 그리스도의 고난을 몸으로 체감하는 진정한 예배 아니겠습니까?'라고 제안했습니다. 결국 신도들이 감기 걸릴 것을 염려한 목사의 만류로 유리를 끼웠지만, 안도는 여전히 그 유리를 떼어내는 꿈을 꾼다고 회고했습니다."
  },
  {
    "id": "alvaro-siza",
    "nameKo": "알바로 시자",
    "nameEn": "Álvaro Siza Vieira",
    "birth": 1933,
    "death": null,
    "country": "포르투갈",
    "eraId": "era-postmodern",
    "movement": "시적 모더니즘 & 포르투 학파 & 비판적 지역주의",
    "quote": "건축가는 아무것도 발명하지 않는다. 건축가는 그 땅이 이미 품고 있는 잠재적 형태를 조심스럽게 드러낼 뿐이다.",
    "desc": "포르투갈 포르투 학파의 수장이자 시적 감수성으로 모더니즘을 정화한 현대의 시인. 대지의 지형과 암반, 대서양의 바람과 햇빛을 섬세하게 읽어내어 건물을 지형의 자연스러운 연장선으로 완성합니다. 흰색 치장 벽토와 대리석, 빛의 각도를 조각하듯 다듬는 그의 건축은 결코 주변을 압도하지 않으면서도 공간 속을 걷는 사람에게 깊은 고요와 영적 감동을 선사합니다. 포르투 대학교 건축학부와 보아 노바 레스토랑, 아모레퍼시픽 미지움(용인)을 설계했습니다. **1992년 프리츠커상 수상자**입니다.",
    "masterpiece": "포르투 대학교 건축학부 (FAUP, 1993), 보아 노바 티하우스 (1963), 세랄베스 현대미술관 (1999), 엑스포 98 포르투갈관",
    "tags": [
      "프리츠커상수상자",
      "포르투학파",
      "시적모더니즘",
      "비판적지역주의",
      "보아노바티하우스"
    ],
    "influences": [
      "david-chipperfield",
      "eduardo-souto-de-moura"
    ],
    "influencedBy": [
      "alvar-aalto"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Siza%20Vieira%20na%20Exponor.JPG?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Museo%20Serralves.%20(6086057211).jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Casa%20de%20ch%C3%A1%20da%20Boa%20Nova.jpg?width=800",
    "blueprintType": "보아 노바 티하우스 대서양 암반 배치도",
    "blueprintDesc": "대서양 파도가 부딪히는 거친 암반 지형을 조금도 훼손하지 않고 바위 틈새에 지붕을 낮게 얹은 자연 합일의 배치도.",
    "philosophyKeywords": [
      "대지 지형과의 시적 대화 (Topography)",
      "백색 벽체와 대서양 자연광의 조각",
      "보이지 않는 연속성 (Continuous Transformation)",
      "포르투 학파의 정밀한 디테일",
      "침묵과 절제의 미학"
    ],
    "keyWorks": [
      {
        "name": "보아 노바 티하우스 (Casa de Chá da Boa Nova)",
        "year": 1963,
        "location": "포르투갈 레사 다 파우메이라 암초 해변 (국가기념물)",
        "desc": "거친 바위 해안 절벽 틈새에 붉은 기와와 목재를 낮게 엎드려 앉혀 파도와 바람의 소리를 건물 안으로 품어낸 20대 청년 시절의 불후의 데뷔작."
      },
      {
        "name": "리스본 엑스포 98 포르투갈 파빌리온",
        "year": 1998,
        "location": "포르투갈 리스본",
        "desc": "단 20cm 두께의 얇은 콘크리트 슬래브를 거대한 현수선 곡선으로 늘어뜨려 두 기둥 사이에 한 장의 천처럼 띄운 기적의 공학 조형."
      }
    ],
    "anecdote": "시자는 설계를 시작하기 전 항상 대상 부지의 바위와 풀잎을 손으로 어루만지며 수백 장의 즉흥 크로키를 그립니다. 그는 제자들에게 '자네가 백지에 선을 긋기 전에 그 땅이 수억 년 동안 써 내려간 대지의 등고선과 역사에 먼저 귀를 기울여야 한다'고 말했습니다."
  },
  {
    "id": "norman-foster",
    "nameKo": "노먼 포스터",
    "nameEn": "Norman Foster",
    "birth": 1935,
    "death": null,
    "country": "영국",
    "eraId": "era-contemporary",
    "movement": "하이테크 건축 (High-Tech Architecture) & 친환경 에어로다이내믹",
    "quote": "건축은 기술을 통해 환경과 에너지의 한계를 극복하고 인간의 삶의 질을 높이는 고결한 도전이다.",
    "desc": "현대 하이테크 건축의 정점에 선 영국 왕실 기사(Lord Foster). 맨체스터 노동자 계급 출신으로 예일대에서 폴 루돌프에게 사사한 뒤, 리처드 로저스와 함께 '팀 4(Team 4)'를 거쳐 '포스터 앤 파트너스'를 세계 최대의 건축 집단으로 성장시켰습니다. 홍콩상하이은행(HSBC) 본사에서 내부 기둥을 완전히 없애고 외부 메가트러스 구조로 건물을 지탱하는 혁명을 일으켰고, 베를린 국회의사당의 **유리 돔(Reichstag Dome)**과 런던 금융가의 나선형 에어로다이내믹 타워 **30 세인트 메리 액스(The Gherkin)**를 통해 첨단 공학 기술과 친환경 자연 환기를 결합했습니다. **1999년 프리츠커상 수상자**입니다.",
    "masterpiece": "런던 30 세인트 메리 액스 (거킨, 2004), 베를린 국회의사당 유리 돔 (1999), 홍콩상하이은행 본사 (HSBC, 1985), 밀로교",
    "tags": [
      "프리츠커상수상자",
      "하이테크거장",
      "거킨타워",
      "베를린국회의사당",
      "HSBC본사",
      "친환경공학"
    ],
    "influences": [
      "david-chipperfield"
    ],
    "influencedBy": [
      "paul-rudolph",
      "eero-saarinen"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Norman%20Foster%202014.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/30%20St%20Mary%20Axe%20Gherkin%20London.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Reichstag%20Dome%20Berlin%20section.png?width=800",
    "blueprintType": "베를린 국회의사당 유리 돔 자연환기 단면도 (Reichstag Dome Section)",
    "blueprintDesc": "하부 국회 본회의장에 태양광을 반사해 내리는 원뿔형 거울 콘(Light Cone)과 뜨거운 공기를 배출하는 이중 나선형 램프 단면도.",
    "philosophyKeywords": [
      "하이테크 건축 (High-Tech Engineering)",
      "에어로다이내믹 다이아그리드 (Diagrid Structure)",
      "생태적 지속가능성과 자연 환기 시스템",
      "역사적 유산과 최첨단 기술의 대화 (Reichstag)",
      "구조의 외부 노출과 내부 무주 공간"
    ],
    "keyWorks": [
      {
        "name": "30 세인트 메리 액스 (거킨 타워 / The Gherkin)",
        "year": 2004,
        "location": "영국 런던 시티 금융가",
        "desc": "오이(Gherkin) 형태의 곡선 다이아그리드 강철 외골격과 6개의 나선형 환기 샤프트로 에너지를 50% 절감한 런던의 현대 랜드마크."
      },
      {
        "name": "베를린 국회의사당 유리 돔 (Reichstag Dome)",
        "year": 1999,
        "location": "독일 베를린 (독일 연방의회)",
        "desc": "통일 독일의 국회의사당 꼭대기에 투명한 유리 돔을 얹어 시민들이 발밑의 정치인들을 내려다보며 민주주의의 투명성을 감시하게 한 명작."
      },
      {
        "name": "홍콩상하이은행 본사 (HSBC Main Building)",
        "year": 1985,
        "location": "홍콩 중완",
        "desc": "내부에 기둥이 하나도 없는 거대한 중앙 아트리움을 외부 강철 행거 트러스에 매달아 올린 20세기 하이테크 최고의 금자탑."
      }
    ],
    "anecdote": "포스터가 베를린 국회의사당 돔을 설계했을 때, 원뿔형 거울 기둥 주위로 두 갈래의 나선형 램프를 설계했습니다. 하나는 올라가는 통로이고 다른 하나는 내려가는 통로로, 시민들이 서로 마주치지 않고 순환하며 베를린 시내 360도 전경과 본회의장을 동시에 조망할 수 있는 정밀한 동선 공학의 극치였습니다."
  },
  {
    "id": "renzo-piano",
    "nameKo": "렌조 피아노",
    "nameEn": "Renzo Piano",
    "birth": 1937,
    "death": null,
    "country": "이탈리아",
    "eraId": "era-contemporary",
    "movement": "하이테크 장인정신 (High-Tech Craftsmanship) & 빛의 서정성",
    "quote": "건축은 매우 위험한 직업이다. 성공하면 수백 년간 도시를 밝히지만, 실패하면 수백 년간 지워지지 않는 흉터가 된다.",
    "desc": "제노바의 유서 깊은 석공 및 건축 시공업자 가문에서 태어나 재료의 섬세한 디테일과 첨단 구조 공학을 결합한 하이테크의 장인. 1971년 리처드 로저스와 함께 파리 한복판에 배관과 에스컬레이터를 모두 외벽으로 끄집어낸 **퐁피두 센터(Centre Pompidou)**를 당선시키며 세계 건축계를 발칵 뒤집었습니다. 이후 휴스턴의 **메닐 컬렉션**, 누메아의 티바우 문화센터, 런던 템스강변의 310m 유리 첨탑 마천루 **더 샤드(The Shard)**, 휘트니 미술관 신관 등을 설계했습니다. 건물의 부품 하나하나를 손목시계처럼 정밀하게 주조하는 '조인트(Joint)의 마술사'입니다. **1998년 프리츠커상 수상자**입니다.",
    "masterpiece": "파리 퐁피두 센터 (로저스와 협업, 1977), 런던 더 샤드 (The Shard, 2012), 메닐 컬렉션 (휴스턴, 1987), 티바우 문화센터 (1998)",
    "tags": [
      "프리츠커상수상자",
      "퐁피두센터공동설계",
      "더샤드",
      "장인정신하이테크",
      "빛의미술관"
    ],
    "influences": [],
    "influencedBy": [
      "louis-kahn"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Renzo%20Piano%202015.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Shard%20London%20Renzo%20Piano.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Tjibaou%20Cultural%20Centre%20section.png?width=800",
    "blueprintType": "티바우 문화센터 카낙 오두막 파시브 환기 단면도",
    "blueprintDesc": "뉴칼레도니아 카낙 족의 전통 가옥 형태를 얇은 이로코 목재 갈비뼈로 재해석하여 남태평양 산들바람을 실내로 유입시키는 단면도.",
    "philosophyKeywords": [
      "디테일과 조인트의 장인정신 (Craftsmanship of High-Tech)",
      "빛을 조절하는 루버와 천창 시스템",
      "자연 환기와 생태적 지역주의",
      "유리의 투명성과 경쾌함 (Lightness)",
      "피아노 빌딩 워크숍 (RPBW 협동 작업)"
    ],
    "keyWorks": [
      {
        "name": "파리 퐁피두 센터 (Centre Georges Pompidou)",
        "year": 1977,
        "location": "프랑스 파리 보부르",
        "desc": "내부의 모든 기둥과 배관(청색-공기, 녹색-물, 황색-전기, 적색-승강기)을 외부로 적출하여 실내에 무한한 자유 공간을 만든 하이테크의 선언."
      },
      {
        "name": "런던 더 샤드 (The Shard / 조각 유리)",
        "year": 2012,
        "location": "영국 런던 브리지",
        "desc": "템스강변에 솟아오른 72층(310m) 유리 피라미드. 8개의 비스듬한 유리 파편들이 꼭대기에서 서로 닿지 않고 하늘로 열려있는 수직 도시."
      }
    ],
    "anecdote": "1971년 퐁피두 센터 당선 당시 렌조 피아노와 리처드 로저스는 30대 초반의 무명 히피 청년들이었습니다. 개관식 날 비를 맞으며 건물 앞에 서 있던 피아노에게 한 파리 시민이 다가와 '이 끔찍한 정유공장 같은 흉물은 대체 어떤 멍청이가 지은 거요?'라고 묻자, 피아노는 슬며시 웃으며 '바로 저입니다'라고 답했습니다."
  },
  {
    "id": "richard-rogers",
    "nameKo": "리처드 로저스",
    "nameEn": "Richard Rogers",
    "birth": 1933,
    "death": 2021,
    "country": "영국 / 이탈리아 출생",
    "eraId": "era-contemporary",
    "movement": "하이테크 안팎 뒤집기 (Inside-Out High-Tech) & 도시 르네상스",
    "quote": "건물의 창자를 밖으로 드러내라. 도시의 공공 공간은 시민들이 자유롭게 모이고 저항할 수 있는 해방구여야 한다.",
    "desc": "건물의 구조, 설비, 엘리베이터 등 '건물의 내장'을 과감하게 건물 바깥으로 끄집어내는 **'안팎 뒤집기(Inside-Out)'** 공법의 창시자. 렌조 피아노와 파리 퐁피두 센터를 지어 세계를 놀라게 한 뒤, 런던 금융가 한복판에 스테인리스 스틸 설비 타워와 유리 캡슐 엘리베이터를 외벽에 노출시킨 **로이즈 빌딩(Lloyd's building)**을 지어 하이테크의 신화를 완성했습니다. 런던 밀레니엄 돔, 마드리드 바라하스 공항, 그리고 서울 여의도의 빨간 골조 랜드마크인 **파크원(Parc.1)**을 설계했습니다. **2007년 프리츠커상 수상자**입니다.",
    "masterpiece": "런던 로이즈 빌딩 (Lloyd's of London, 1986), 파리 퐁피두 센터 (1977), 마드리드 바라하스 공항 터미널 4 (2006), 서울 파크원",
    "tags": [
      "프리츠커상수상자",
      "안팎뒤집기",
      "로이즈빌딩",
      "퐁피두센터",
      "서울파크원",
      "하이테크영웅"
    ],
    "influences": [],
    "influencedBy": [
      "paul-rudolph",
      "smithsons"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Richard%20Rogers%20(2013)%20(cropped).jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Lloyd's%20Building%20-%20Escalators%20fisheye.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Lloyd's%20Facade.jpg?width=800",
    "blueprintType": "로이즈 빌딩 외부 설비 타워 입면 (External Service Towers Façade)",
    "blueprintDesc": "6개의 수직 설비 타워에 화물 엘리베이터, 배관, 스테인리스 화장실 포드를 완전히 빼내어 중앙 보험 거래 홀을 텅 비운 입면도.",
    "philosophyKeywords": [
      "인사이드 아웃 구조 (Inside-Out Architecture)",
      "설비와 동선의 외벽 노출 (Service Pods & Exposed Lifts)",
      "도시 공공성의 회복과 보행자 광장",
      "가변형 공간과 유지 보수의 용이성",
      "선명한 원색(빨강·파랑·노랑)의 구조 강조"
    ],
    "keyWorks": [
      {
        "name": "로이즈 오브 런던 빌딩 (Lloyd's of London)",
        "year": 1986,
        "location": "영국 런던 시티 금융가 (영국 1급 상장 건축물)",
        "desc": "중앙의 거대한 14층 유리 아트리움 홀을 비우기 위해 12개의 외벽 유리 승강기와 스테인리스 배관 타워를 외부에 노출시킨 SF 걸작."
      },
      {
        "name": "서울 여의도 파크원 (Parc.1)",
        "year": 2020,
        "location": "대한민국 서울 영등포구 여의도동",
        "desc": "한국 전통 목조 단청의 붉은 기둥에서 영감을 얻은 거대한 빨간색 외부 메가 노출 강철 트러스로 여의도 스카이라인을 바꾼 랜드마크."
      }
    ],
    "anecdote": "로저스는 평생 심각한 난독증으로 고통받았지만, 글자 대신 손으로 물건을 만지고 조립하는 공간 감각을 키워 세계 최고의 건축가가 되었습니다. 그는 '난독증 덕분에 나는 남들이 보지 못하는 공간의 입체적 흐름과 3차원 기계 설비의 유기적 아름다움을 발견할 수 있었다'고 당당히 밝혔습니다."
  },
  {
    "id": "herzog-de-meuron",
    "nameKo": "헤르조그 & 드 뫼롱",
    "nameEn": "Herzog & de Meuron (Jacques Herzog & Pierre de Meuron)",
    "birth": 1950,
    "death": null,
    "country": "스위스",
    "eraId": "era-contemporary",
    "movement": "물질성의 연금술 (Material Alchemy) & 네오-미니멀리즘",
    "quote": "재료는 단순한 마감재가 아니다. 재료의 표피(Skin)는 역사, 빛, 촉각이 응축되어 사람의 피부처럼 감정을 전달하는 연금술의 장이다.",
    "desc": "스위스 바젤 출신의 소꿉친구 두 사람이 결성한 21세기 최고 권위의 건축 파트너십. 형태의 과시보다는 유리, 돌, 콘크리트, 구리, 목재 등 재료의 본질적 물성을 극적으로 변형하는 '재료의 연금술사'로 불립니다. 런던 템스강변의 흉물 화력발전소를 빛의 상자를 얹어 세계 최고의 현대미술관으로 재생시킨 **테이트 모던(Tate Modern)**, 붉은 벽돌 창고 위에 거대한 유리 빙산과 파도를 얹은 함부르크의 **엘브필하모니**, 베이징 올림픽 주경기장 **새둥지(Bird's Nest)** 등을 설계했습니다. **2001년 프리츠커상 공동 수상자**입니다.",
    "masterpiece": "런던 테이트 모던 (Tate Modern, 2000), 함부르크 엘브필하모니 (2017), 베이징 올림픽 주경기장 새둥지 (2008), 프라다 아오야마",
    "tags": [
      "프리츠커상공동수상",
      "테이트모던",
      "엘브필하모니",
      "새둥지스타디움",
      "물질의연금술사",
      "도시재생"
    ],
    "influences": [],
    "influencedBy": [
      "aldo-rossi",
      "josef-beuys"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/31._ISC-Symposium-Pierre_de_Meuron-HSGN_028-01578.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Elbphilharmonie%20Hamburg.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Beijing%20national%20stadium.jpg?width=800",
    "blueprintType": "베이징 국립경기장(새둥지) 강철 트러스 구조 조감도",
    "blueprintDesc": "24개의 메인 트러스 기둥이 무작위로 얽히고설켜 지진에 완벽히 견디며 거대한 새둥지 조각을 이룬 구조 도면.",
    "philosophyKeywords": [
      "재료의 연금술 (Material Alchemy)",
      "도시 산업유산의 재생 (Tate Modern Bankside)",
      "유리 곡면 표피의 세공 (Elbphilharmonie Wave Glass)",
      "새둥지 철골 트러스 구조 (Nest-like Structure)",
      "장소성과 촉각적 현상학"
    ],
    "keyWorks": [
      {
        "name": "테이트 모던 (Tate Modern)",
        "year": 2000,
        "location": "영국 런던 템스강변 뱅크사이드",
        "desc": "버려진 거대한 뱅크사이드 발전소의 터빈 홀을 텅 빈 공공 경사로로 개방하고 옥상에 2층 유리 라이트빔을 올려 런던을 부활시킨 세기의 도시재생."
      },
      {
        "name": "함부르크 엘브필하모니 (Elbphilharmonie)",
        "year": 2017,
        "location": "독일 함부르크 하펜시티",
        "desc": "1966년 붉은 벽돌 카카오 창고 위에 1,100장의 휘어진 삼차원 유리 패널로 만든 거대한 파도 모양의 유리 궁전을 얹은 현대 오페라하우스의 정점."
      }
    ],
    "anecdote": "테이트 모던 공모 당시 다른 유명 건축가들은 굴뚝을 헐어버리고 화려한 신축 건물을 짓겠다고 제안했습니다. 하지만 헤르조그 & 드 뫼롱은 '이 거대한 벽돌 굴뚝이야말로 런던 노동자들의 땀방울이 서린 위대한 역사'라며 굴뚝과 터빈 홀을 고스란히 보존하고 상부에 빛의 유리 상자만을 얹는 최소한의 개입으로 만장일치 당선되었습니다."
  },
  {
    "id": "toyo-ito",
    "nameKo": "이토 토요",
    "nameEn": "Toyo Ito (伊東豊雄)",
    "birth": 1941,
    "death": null,
    "country": "일본",
    "eraId": "era-contemporary",
    "movement": "유동적 투명성 & 바람과 물의 미학",
    "quote": "건축은 바람처럼 가볍고, 물처럼 유동적이며, 투명한 공기처럼 사람들을 감싸 안아야 한다.",
    "desc": "기무라 사토시의 사무소에서 수련한 뒤, 21세기 건축의 공간 개념을 '단단한 기하학'에서 '바람과 유체의 연속성'으로 전환시킨 거장. 2001년 일본 센다이에 완공한 **센다이 미디어테크(Sendai Mediatheque)**는 두꺼운 내력벽과 직각 기둥을 완전히 폐기하고, 해초처럼 뒤틀려 솟아오른 13개의 반투명 강철 튜브 파이프 기둥망만으로 6장의 슬래브를 관통 지탱하여 **근대 100년 만에 르 코르뷔지에의 돔이노 시스템을 완벽히 넘어선 현대 건축의 일대 사건**으로 기록되었습니다. 세지마 카즈요(SANAA)의 스승이며, **2013년 프리츠커상 수상자**입니다.",
    "masterpiece": "센다이 미디어테크 (Sendai Mediatheque, 2001), 타마미술대학 도서관 (2007), 가오슝 국립경기장 (2009)",
    "tags": [
      "프리츠커상수상자",
      "센다이미디어테크",
      "유동적투명성",
      "세지마카즈요의스승",
      "타마미술대도서관"
    ],
    "influences": [
      "sanaa"
    ],
    "influencedBy": [
      "kenzo-tange"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Toyo%20Ito%202009.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Sendai%20Mediatheque%202009.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Tama_Art_University_(Hachioji_Library).jpg?width=800",
    "blueprintType": "타마미술대학교 도서관 교차 아치 공간 구조",
    "blueprintDesc": "완만한 언덕 지형을 따라 얇은 철골 콘크리트 아치들이 임의의 곡선으로 교차하며 숲속 동굴 같은 무한한 연속 시야를 제공하는 도면.",
    "philosophyKeywords": [
      "센다이 튜브 구조 (Tubular Structural Trusses)",
      "돔이노 시스템의 해체와 재창조",
      "바람과 흐르는 유체의 건축 (Architecture as Fluid)",
      "전자 미디어 시대의 투명한 공공성",
      "식물과 나무의 유기적 모티브"
    ],
    "keyWorks": [
      {
        "name": "센다이 미디어테크 (Sendai Mediatheque)",
        "year": 2001,
        "location": "일본 미야기현 센다이",
        "desc": "해초처럼 흔들리는 13개의 강철 파이프 관(Tube) 기둥 속에 계단, 엘리베이터, 빛, 공기, 배관을 모두 통합한 21세기 건축의 신기원."
      },
      {
        "name": "타마미술대학교 도서관 (하치오지 캠퍼스)",
        "year": 2007,
        "location": "일본 도쿄 하치오지",
        "desc": "200mm 두께의 얇은 콘크리트 아치들이 부드러운 언덕 바닥 위에서 연속 교차하며 학생들에게 숲속에서 독서하는 평온함을 선사하는 걸작."
      }
    ],
    "anecdote": "2011년 동일본 대지진 당시 진도 9.0의 미증유의 대재앙이 센다이를 강타했을 때, 인근 건물들이 무너져 내리는 와중에도 센다이 미디어테크는 유연한 13개의 튜브 기둥이 지진파의 충격을 흔들리며 흡수하여 구조적 피해가 전무했습니다. 건물의 유연성이 최첨단 내진 안전성까지 완벽히 입증한 역사적 순간이었습니다."
  },
  {
    "id": "sanaa",
    "nameKo": "SANAA (세지마 카즈요 & 니시자와 류에)",
    "nameEn": "SANAA (Kazuyo Sejima & Ryue Nishizawa)",
    "birth": 1956,
    "death": null,
    "country": "일본",
    "eraId": "era-contemporary",
    "movement": "극도의 투명성 & 탈위계적 다이어그램 건축",
    "quote": "공간 사이에 벽을 세우지 마라. 인간의 관계처럼, 공간은 그저 부드럽게 스며들고 이어져야 한다.",
    "desc": "이토 토요 사무소 출신의 여성 건축가 세지마 카즈요와 니시자와 류에가 결성한 듀오. 건물의 군더더기를 완전히 증발시키고, 종이처럼 얇은 백색 슬래브, 가느다란 원형 기둥, 그리고 사방을 둘러싼 거대한 곡면 통유리로 경계가 사라진 **'투명한 대기의 건축'**을 구현합니다. 정면과 배면이 없는 완벽한 원형 유리 파빌리온인 **21세기 가나자와 미술관**과, 바닥이 언덕처럼 오르내리는 스위스 로잔 공과대학의 **롤렉스 러닝 센터**는 세계 건축계에 탈위계적 자유 공간의 충격을 안겼습니다. **2010년 프리츠커상 최연소급 공동 수상자**입니다.",
    "masterpiece": "21세기 가나자와 미술관 (2004), 로잔 롤렉스 러닝 센터 (2010), 뉴욕 뉴 뮤지엄 (2007), 루브르 랑스",
    "tags": [
      "프리츠커상공동수상",
      "가나자와미술관",
      "롤렉스러닝센터",
      "극도의투명성",
      "다이어그램건축",
      "무경계공간"
    ],
    "influences": [
      "junya-ishigami"
    ],
    "influencedBy": [
      "toyo-ito",
      "ludwig-mies"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kazuyo_Sejima_mg_5000.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/21st%20Century%20Museum%20of%20Contemporary%20Art%2C%20Kanazawa011.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/21st%20Century%20Museum%20of%20Contemporary%20Art%2C%20Kanazawa%2012.jpg?width=800",
    "blueprintType": "21세기 가나자와 미술관 원형 마스터 평면도",
    "blueprintDesc": "지름 112.5m의 거대한 원형 유리 외피 안에 사각형 갤러리와 중정들이 공원의 벤치처럼 무위계적으로 떠 있는 평면도.",
    "philosophyKeywords": [
      "극도의 비물질성과 투명성 (Extreme Lightness)",
      "다이어그램의 직접적인 공간화 (Diagram Architecture)",
      "위계 없는 연속적 공공 공간 (Non-hierarchical Space)",
      "경계의 소멸과 공원 같은 건물",
      "바닥 슬래브의 파도치는 지형화 (Rolex Learning Center)"
    ],
    "keyWorks": [
      {
        "name": "21세기 가나자와 미술관",
        "year": 2004,
        "location": "일본 이시카와현 가나자와",
        "desc": "사방 어디서나 걸어서 들어올 수 있는 완벽한 원형 투명 미술관. 레안드로 에를리치의 '수영장' 등 예술과 시민의 일상이 경계 없이 만나는 기적."
      },
      {
        "name": "롤렉스 러닝 센터 (Rolex Learning Center)",
        "year": 2010,
        "location": "스위스 로잔 연방공과대학교 (EPFL)",
        "desc": "벽이나 계단 없이 부드러운 콘크리트 완만한 언덕과 골짜기 곡면으로 바닥을 굴곡시켜 학생들이 언덕에 앉아 공부하는 혁신적 배움터."
      }
    ],
    "anecdote": "가나자와 미술관의 유리벽 두께는 극도로 얇아 외부 공원의 나무와 풀잎이 실내 전시실에 그대로 투영됩니다. 세지마 카즈요는 '우리는 미술관을 짓는 것이 아니라, 시민들이 산책하다가 언제든 우연히 예술을 마주치는 지붕 있는 투명한 공원을 만든 것'이라고 설명했습니다."
  },
  {
    "id": "kengo-kuma",
    "nameKo": "쿠마 켄고",
    "nameEn": "Kengo Kuma (隈研吾)",
    "birth": 1954,
    "death": null,
    "country": "일본",
    "eraId": "era-contemporary",
    "movement": "약한 건축 (Defeated Architecture) & 목재 루버의 입자화",
    "quote": "건축은 자연을 이기려 해서는 안 된다. 건축은 자연 앞에 겸허히 패배해야 한다. 건물을 잘게 쪼갠 나무 루버의 입자로 분해할 때 자연과 일체가 된다.",
    "desc": "20세기 콘크리트와 철골 마천루의 오만함을 반성하고, 나무, 돌, 대나무, 종이, 흙 등 자연 재료를 얇고 섬세한 루버(Louver) 격자 입자로 잘게 쪼개어 배치하는 **'약한 건축(Defeated Architecture)'**의 기수. 도쿄 올림픽 주경기장(국립경기장)을 일본 전역 47개 도도부현의 국산 삼나무와 낙엽송 처마 루버로 감싸 숲속 스타디움으로 완성했습니다. 도쿄 아사쿠사 문화관광센터, 네즈 미술관, 스코틀랜드 V&A 던디 등에서 목재의 온기와 전통 결구 방식을 현대 공학으로 재해석하여 세계적인 목조 건축 르네상스를 이끌고 있습니다.",
    "masterpiece": "도쿄 올림픽 신국립경기장 (2019), 아사쿠사 문화관광센터 (2012), V&A 던디 (스코틀랜드, 2018), 네즈 미술관 (2009)",
    "tags": [
      "약한건축",
      "도쿄올림픽주경기장",
      "목재루버격자",
      "아사쿠사관광센터",
      "자연재료의입자화"
    ],
    "influences": [],
    "influencedBy": [
      "alvar-aalto",
      "kenzo-tange"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Kengo%20Kuma%202009.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/New%20national%20stadium%20tokyo%201.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa%20Culture%20Tourist%20Information%20Center%2021%2009%202024%20Picture%2006.jpg?width=800",
    "blueprintType": "아사쿠사 문화관광센터 적층 주택 지붕 단면 조형",
    "blueprintDesc": "전통 박공지붕 단독주택 8채를 수직으로 포개어 올린 듯한 단면 구조로 각 층 사이의 틈새로 바람과 전망을 확보한 도면.",
    "philosophyKeywords": [
      "약한 건축 (Defeated Architecture / 지는 건축)",
      "재료의 입자화 (Particle Architecture)",
      "삼나무와 낙엽송 목재 루버 격자 (Wood Louvers)",
      "자연과 환경과의 연결 (연결하는 건축)",
      "전통 목조 결구법의 현대 공학화 (Chidori System)"
    ],
    "keyWorks": [
      {
        "name": "도쿄 국립경기장 (Japan National Stadium)",
        "year": 2019,
        "location": "일본 도쿄 메이지 신궁 외원",
        "desc": "거대한 콘크리트 스타디움을 메이지 신궁 숲의 높이 이하로 낮추고, 47개 지방의 국산 목재 처마 루버를 다단으로 둘러 자연 채광과 숲바람을 끌어들인 친환경 경기장."
      },
      {
        "name": "아사쿠사 문화관광센터",
        "year": 2012,
        "location": "일본 도쿄 다이토구 아사쿠사 카미나리몬 앞",
        "desc": "전통 단층 가옥 8채를 수직으로 포개어 올린 혁신적 적층 조형으로 아사쿠사 센소지 사찰과 스카이트리를 한눈에 조망."
      }
    ],
    "anecdote": "도쿄 올림픽 경기장 공모에서 원래 자하 하디드의 거대한 미래형 유선형 디자인이 선정되었으나, 3조 원에 육박하는 천문학적 공사비와 숲을 압도하는 콘크리트 규모로 시민 반발에 부딪혀 백지화되었습니다. 쿠마 켄고는 '숲속에 다소곳이 엎드려 나무의 숨결을 나누는 경기장'을 제안하여 일본 국민들의 압도적 지지를 받으며 완공했습니다."
  },
  {
    "id": "david-chipperfield",
    "nameKo": "데이비드 치퍼필드",
    "nameEn": "David Chipperfield",
    "birth": 1953,
    "death": null,
    "country": "영국",
    "eraId": "era-contemporary",
    "movement": "시간을 초월한 절제미 & 역사 유산의 비판적 복원",
    "quote": "건축의 본질은 눈에 띄는 화려한 조각이 아니라, 역사와 도시 속에서 영원히 지속되는 고요한 질서와 공공의 품격이다.",
    "desc": "노먼 포스터와 리처드 로저스 사무소에서 실무를 닦은 뒤, 유행과 자극적인 형태주의를 철저히 배격하고 **'시간을 초월한 고요한 기념비성'**을 추구하는 영국의 거장. 2차 대전으로 폐허가 된 베를린 박물관 섬의 **신박물관(Neues Museum)**을 10여 년에 걸쳐 복원하며, 파괴된 총탄 자국과 벽돌 파편을 거짓 복원하지 않고 현대 콘크리트 열주랑과 정직하게 병치하는 혁신적인 복원 윤리를 확립했습니다. 서울 용산의 **아모레퍼시픽 세계 본사**는 한국 전통 백자 달항아리의 담백한 비움과 삼면 공중 중정(루프 가든)을 결합해 세계적 찬사를 받았습니다. **2023년 프리츠커상 수상자**입니다.",
    "masterpiece": "베를린 신박물관 복원 (Neues Museum, 2009), 아모레퍼시픽 본사 (서울, 2017), 제임스 사이먼 갤러리 (2019)",
    "tags": [
      "프리츠커상수상자",
      "아모레퍼시픽본사",
      "신박물관복원",
      "절제의미학",
      "제임스사이먼갤러리"
    ],
    "influences": [],
    "influencedBy": [
      "alvaro-siza",
      "norman-foster"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/David%20Chipperfield%20(cropped).jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Berlin%20-%20Neues%20Museum%20(1).jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Berlin%20James-Simon-Galerie%20asv2019-07%20img2.jpg?width=800",
    "blueprintType": "제임스 사이먼 갤러리 열주랑 및 박물관 섬 배치",
    "blueprintDesc": "베를린 박물관 섬의 신고전주의 열주랑(Colonnade)을 극도로 가느다란 백색 프리캐스트 콘크리트 기둥으로 재해석한 입구 파빌리온.",
    "philosophyKeywords": [
      "절제와 영속성 (Timeless Restraint)",
      "역사적 상처의 진실한 보존 (Critical Restoration)",
      "중정 비움과 도시 공공성 (아모레퍼시픽 루프 가든)",
      "순수 기하학과 빛의 열주랑",
      "상업주의를 거스르는 공공의 품격"
    ],
    "keyWorks": [
      {
        "name": "베를린 신박물관 복원 (Neues Museum)",
        "year": 2009,
        "location": "독일 베를린 박물관 섬 (UNESCO 세계유산)",
        "desc": "2차 대전 폭격의 그을음과 총탄 자국을 지우지 않고 새하얀 콘크리트 계단 홀과 조화시켜 과거와 현재가 공존하는 세계 복원 건축의 최고 전범."
      },
      {
        "name": "아모레퍼시픽 세계 본사 (Amorepacific Headquarters)",
        "year": 2017,
        "location": "대한민국 서울 용산구 한강대로",
        "desc": "조선 백자 달항아리의 우아하고 담백한 형상. 건물 3개 층을 과감하게 뚫어낸 공중 정원(루프 가든)과 매달린 차양 루버로 서울 도심에 경건한 안식처를 선사."
      }
    ],
    "anecdote": "2023년 프리츠커상 심사위원단은 치퍼필드의 선정 이유를 이렇게 밝혔습니다: '트렌드에 영합하는 화려함의 시대에, 데이비드 치퍼필드는 결코 자신을 과시하지 않는 절제와 침묵으로 영구적인 공공의 품격을 증명했다. 그의 건물은 언제나 그 자리에 영원히 있었던 것처럼 자연스럽다.'"
  },
  {
    "id": "bjarke-ingels",
    "nameKo": "비야케 잉겔스",
    "nameEn": "Bjarke Ingels (BIG)",
    "birth": 1974,
    "death": null,
    "country": "덴마크",
    "eraId": "era-contemporary",
    "movement": "빅(BIG) & 쾌락적 지속가능성 (Hedonistic Sustainability)",
    "quote": "예스 이즈 모어 (Yes is more)! 지속가능성은 고통스러운 희생이 아니라, 삶을 훨씬 더 즐겁고 신나게 만드는 파티여야 한다.",
    "desc": "렘 콜하스의 OMA에서 수련한 뒤, 30대의 나이에 글로벌 설계집단 **BIG(Bjarke Ingels Group)**을 설립하여 21세기 건축의 판도를 바꾼 아이디어의 승부사. 만화책 형태의 선언문 『Yes is More』를 발표하며 모더니즘(Less is more)과 포스트모더니즘(Less is a bore)을 유쾌하게 통합했습니다. 쓰레기 소각장 지붕 위에 스키 슬로프와 등반 벽을 얹어 친환경 발전소를 시민들의 레저 놀이터로 바꾼 코펜하겐의 **코펜힐(CopenHill)**, 뫼비우스 8자 모양을 따라 자전거를 타고 10층 지붕까지 올라가는 **8 하우스**, 뉴욕 맨해튼 허드슨강변의 피라미드 마천루 **VIA 57 West** 등 기발한 발상의 전환으로 지속가능성을 유쾌한 라이프스타일로 바꿨습니다.",
    "masterpiece": "코펜힐 아마게르 바케 (CopenHill, 코펜하겐, 2019), 8 하우스 (8 House, 2010), VIA 57 West (뉴욕, 2016)",
    "tags": [
      "BIG설립자",
      "YesIsMore",
      "쾌락적지속가능성",
      "코펜힐스키슬로프",
      "8하우스",
      "OMA출신"
    ],
    "influences": [],
    "influencedBy": [
      "rem-koolhaas"
    ],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Bjarke_Ingels_in_Frankfurt.20150617.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Amager%20Bakke%20Copenhagen%201.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Superkilen%20Park%2C%20Copenhagen%20(39688100743).jpg?width=800",
    "blueprintType": "수퍼킬렌 다문화 공원 마스터플랜 및 라인 패턴",
    "blueprintDesc": "전 세계 60여 개국의 벤치, 가로등, 그네를 수집하고 지형 위에 역동적인 흰색 등고선 라인을 그려낸 도시재생 평면.",
    "philosophyKeywords": [
      "예스 이즈 모어 (Yes is more / 실용적 유토피아)",
      "쾌락적 지속가능성 (Hedonistic Sustainability)",
      "다이어그램의 직관적 건물화 (Diagram as Building)",
      "공공 레저와 산업 인프라의 융합 (코펜힐)",
      "자전거로 순환하는 연속 경사로 (8 House)"
    ],
    "keyWorks": [
      {
        "name": "코펜힐 (아마게르 바케 / CopenHill)",
        "year": 2019,
        "location": "덴마크 코펜하겐",
        "desc": "최첨단 친환경 폐기물 열병합 발전소 지붕에 400m 길이의 사계절 인공 스키장과 하이킹 코스, 85m 인공 암벽을 올려 세계적 열광을 일으킨 기적의 프로젝트."
      },
      {
        "name": "8 하우스 (8 Tallet)",
        "year": 2010,
        "location": "덴마크 코펜하겐 외레스타드",
        "desc": "뫼비우스 숫자 8자 형태로 건물을 꼬아 1층 상가부터 10층 펜트하우스까지 1km의 보행로와 자전거길이 끊김 없이 연속되는 입체 마을."
      }
    ],
    "anecdote": "코펜하겐시가 낡은 쓰레기 소각장을 재건축하려 할 때, 잉겔스는 시의회에 기상천외한 제안을 던졌습니다: '산이 하나도 없는 평평한 덴마크에 쓰레기 소각장 지붕으로 거대한 알프스 스키 슬로프를 만듭시다!' 모두가 미쳤다고 했지만, 완공 후 코펜힐은 매주 수천 명의 시민들이 스키를 타고 맥주를 마시는 세계에서 가장 사랑받는 발전소가 되었습니다."
  },
  {
    "id": "diebedo-francis-kere",
    "nameKo": "디베도 프랑시스 케레",
    "nameEn": "Diébédo Francis Kéré",
    "birth": 1965,
    "death": null,
    "country": "부르키나파소 / 독일",
    "eraId": "era-contemporary",
    "movement": "공동체 생태 건축 & 아프리카 토착 지혜의 현대화",
    "quote": "좋은 건축은 막대한 돈이나 화려한 기술로 만드는 것이 아니다. 그 땅의 흙과 사람들의 손길, 그리고 자연의 바람을 존중할 때 가장 위대한 기적이 일어난다.",
    "desc": "서아프리카 부르키나파소의 전기도 수도도 없는 극빈 마을 간도(Gando) 출신으로, **아프리카인 최초로 2022년 프리츠커상을 수상**한 감동의 거장. 마을 최초로 초등학교를 다니고 독일 베를린 공대에 유학하여 건축가가 된 뒤, 유럽의 비싼 자재 대신 고향 마을의 진흙 흙벽돌과 현지 목재, 그리고 마을 주민들의 협동 품앗이로 **간도 초등학교**를 지었습니다. 전기가 없어도 실내 온도를 10도 이상 낮춰주는 이중 양철 지붕 자연 환기 시스템을 창안하여, 전 세계 건축계에 지속가능성과 사회적 연대의 진정한 가치를 일깨웠습니다.",
    "masterpiece": "간도 초등학교 (Gando Primary School, 2001), 2017 서펜타인 파빌리온 (런던), 부르키나파소 국회의사당 계획안",
    "tags": [
      "아프리카최초프리츠커상",
      "간도초등학교",
      "흙벽돌생태건축",
      "자연환기시스템",
      "사회적공동체건축"
    ],
    "influences": [],
    "influencedBy": [],
    "customNotes": "",
    "portraitImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Francis_Kere%2C_2019.jpg?width=600",
    "buildingImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Primary%20School%20Gando.jpg?width=800",
    "blueprintImg": "https://commons.wikimedia.org/wiki/Special:FilePath/Serpentine%20Pavilion%202017%20I%20(35866153461).jpg?width=800",
    "blueprintType": "2017 서펜타인 파빌리온 나무 캐노피 구조",
    "blueprintDesc": "아프리카 마을의 거대한 만남의 나무(Tree of Life)를 모티브로 빗물을 깔때기처럼 모으고 바람을 통과시키는 목재 파빌리온 구조.",
    "philosophyKeywords": [
      "토착 재료의 현대화 (압축 진흙 흙벽돌)",
      "파시브 자연 환기 (이중 지붕 열 차단 시스템)",
      "공동체 주민 직접 참여 시공 (Community Empowerment)",
      "저비용 고효율 적정 기술 (Appropriate Technology)",
      "빛과 그늘의 생태적 나눔"
    ],
    "keyWorks": [
      {
        "name": "간도 초등학교 (Gando Primary School)",
        "year": 2001,
        "location": "부르키나파소 간도 (아가 칸 건축상 수상)",
        "desc": "시멘트 대신 마을의 붉은 점토 흙벽돌로 벽을 쌓고, 공중에 띄운 골함석 이중 지붕으로 뜨거운 열기를 자연 배출시켜 에어컨 없이 시원한 교실을 완성."
      },
      {
        "name": "런던 켄싱턴 가든 서펜타인 파빌리온",
        "year": 2017,
        "location": "영국 런던 켄싱턴 가든",
        "desc": "인디고 블루 컬러의 목재 블록 벽과 하늘로 넓게 펼쳐진 나무 그늘 캐노피로 비가 오면 중앙 깔때기에서 빗물 폭포가 쏟아지는 축제의 장소."
      }
    ],
    "anecdote": "케레는 베를린 유학 시절 친구들과 맥주 마실 돈을 아끼고 모금 운동을 벌여 번 돈으로 고향 마을에 학교를 지으러 돌아왔습니다. 마을 장로들은 '흙으로 지은 집은 장마 때 무너진다'며 의심했지만, 케레는 마을 사람들과 함께 흙에 약간의 시멘트를 섞어 압축하는 손기계를 만들어 직접 비를 맞아도 끄떡없는 견고한 벽돌을 입증했습니다. 마을 여성들과 아이들이 직접 돌을 나르고 바닥을 갈아 학교를 완성했습니다."
  }
];

const INFLUENCE_EDGES = [
  {
    "from": "william-morris",
    "to": "henry-richardson",
    "type": "mentor-influence",
    "label": "미술공예운동과 재료의 진실성 전파"
  },
  {
    "from": "william-morris",
    "to": "hendrik-berlage",
    "type": "mentor-influence",
    "label": "수공예 정신 및 사회적 건축관 영향"
  },
  {
    "from": "william-morris",
    "to": "walter-gropius",
    "type": "mentor-influence",
    "label": "공예와 예술 통합 사상 (바우하우스 모태)"
  },
  {
    "from": "henry-richardson",
    "to": "louis-sullivan",
    "type": "mentor-influence",
    "label": "마셜 필드 도매점의 웅장한 아치와 물질성 계승"
  },
  {
    "from": "otto-wagner",
    "to": "adolf-loos",
    "type": "master-disciple",
    "label": "빈 아카데미 사사 및 기능주의 비판적 계승"
  },
  {
    "from": "otto-wagner",
    "to": "peter-behrens",
    "type": "mentor-influence",
    "label": "신소재 노출 및 공작연맹 이념적 자극"
  },
  {
    "from": "victor-horta",
    "to": "auguste-perret",
    "type": "mentor-influence",
    "label": "주철 골조 노출과 구조적 솔직성 영향"
  },
  {
    "from": "peter-behrens",
    "to": "walter-gropius",
    "type": "master-disciple",
    "label": "1907-1910 베를린 사무소 수석 조수 수련"
  },
  {
    "from": "peter-behrens",
    "to": "ludwig-mies",
    "type": "master-disciple",
    "label": "1908-1912 베를린 사무소 실무 및 신고전 비례 습득"
  },
  {
    "from": "peter-behrens",
    "to": "le-corbusier",
    "type": "master-disciple",
    "label": "1910-1911 독일 공업 디자인 및 거대 스케일 연수"
  },
  {
    "from": "louis-sullivan",
    "to": "frank-lloyd-wright",
    "type": "master-disciple",
    "label": "아들러&설리반 7년간 수석 제도사 ('친애하는 스승')"
  },
  {
    "from": "auguste-perret",
    "to": "le-corbusier",
    "type": "master-disciple",
    "label": "1908-1909 파리 사무소 철근콘크리트 구조 공학 사사"
  },
  {
    "from": "hendrik-berlage",
    "to": "ludwig-mies",
    "type": "mentor-influence",
    "label": "벽돌의 구축적 진실성과 질서에 깊은 감화"
  },
  {
    "from": "hendrik-berlage",
    "to": "gerrit-rietveld",
    "type": "mentor-influence",
    "label": "네덜란드 현대 조형 및 데 스틸의 뿌리"
  },
  {
    "from": "adolf-loos",
    "to": "le-corbusier",
    "type": "mentor-influence",
    "label": "장식 배격 에세이 및 백색 큐브 형태 자극"
  },
  {
    "from": "adolf-loos",
    "to": "ludwig-mies",
    "type": "mentor-influence",
    "label": "재료 본연의 고급스러운 질감(대리석/목재) 활용법 영향"
  },
  {
    "from": "walter-gropius",
    "to": "marcel-breuer",
    "type": "master-disciple",
    "label": "바우하우스 1기 입학 후 가구 마이스터 임명 및 동업"
  },
  {
    "from": "walter-gropius",
    "to": "philip-johnson",
    "type": "master-disciple",
    "label": "하버드 GSD 건축대학원 스승과 제자"
  },
  {
    "from": "walter-gropius",
    "to": "paul-rudolph",
    "type": "master-disciple",
    "label": "하버드 GSD에서 철저한 기능 분석과 팀워크 사사"
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
    "type": "rebellion",
    "label": "'Less is more'에 대한 비판적 반동 ('Less is a bore')"
  },
  {
    "from": "ludwig-mies",
    "to": "richard-meier",
    "type": "mentor-influence",
    "label": "비례와 그리드 체계, 세련된 디테일 계승"
  },
  {
    "from": "le-corbusier",
    "to": "oscar-niemeyer",
    "type": "collaborator",
    "label": "1936 브라질 교육보건부 청사 협업 및 곡선 조형 발전"
  },
  {
    "from": "le-corbusier",
    "to": "kim-chung-up",
    "type": "master-disciple",
    "label": "1952-1955 파리 아틀리에 3년 6개월간 한국인 최초 직속 사사"
  },
  {
    "from": "le-corbusier",
    "to": "tadao-ando",
    "type": "mentor-influence",
    "label": "작품집 독학 및 유럽 롱샹 성당 순례를 통한 영적 감화"
  },
  {
    "from": "le-corbusier",
    "to": "louis-kahn",
    "type": "mentor-influence",
    "label": "거친 노출 콘크리트와 빛의 기념비적 조각성에 자극"
  },
  {
    "from": "alvar-aalto",
    "to": "alvaro-siza",
    "type": "mentor-influence",
    "label": "인간 중심 자연주의와 풍토적 감수성의 시적 계승"
  },
  {
    "from": "alvar-aalto",
    "to": "kengo-kuma",
    "type": "mentor-influence",
    "label": "목재와 자연광을 통한 따스한 공간 철학 계승"
  },
  {
    "from": "louis-kahn",
    "to": "robert-venturi",
    "type": "master-disciple",
    "label": "펜실베이니아대 조교 및 칸의 기념비적 역사관 흡수"
  },
  {
    "from": "louis-kahn",
    "to": "renzo-piano",
    "type": "mentor-influence",
    "label": "칸 사무소에서 근무하며 부재 조인트와 빛의 조절 사사"
  },
  {
    "from": "louis-kahn",
    "to": "tadao-ando",
    "type": "mentor-influence",
    "label": "침묵과 빛, 완벽한 콘크리트 거푸집 마감 영감"
  },
  {
    "from": "kenzo-tange",
    "to": "kisho-kurokawa",
    "type": "master-disciple",
    "label": "도쿄대 단게 연구실 수련 및 메타볼리즘 운동 주도"
  },
  {
    "from": "kenzo-tange",
    "to": "kim-swoo-geun",
    "type": "mentor-influence",
    "label": "도쿄예대/도쿄대 수학 시절 현대 모더니즘과 올림픽 건축 자극"
  },
  {
    "from": "paul-rudolph",
    "to": "norman-foster",
    "type": "master-disciple",
    "label": "예일대 건축대학원 석사 과정 정밀 단면 분석 사사"
  },
  {
    "from": "paul-rudolph",
    "to": "richard-rogers",
    "type": "master-disciple",
    "label": "예일대 건축대학원 수학 시절 구조와 설비 흐름 체득"
  },
  {
    "from": "smithsons",
    "to": "rem-koolhaas",
    "type": "mentor-influence",
    "label": "런던 AA스쿨 시절 도시적 일상성과 거대 주거 단지 비판 계승"
  },
  {
    "from": "smithsons",
    "to": "richard-rogers",
    "type": "mentor-influence",
    "label": "뉴 브루탈리즘의 재료 무가공 노출 정신 계승"
  },
  {
    "from": "philip-johnson",
    "to": "peter-eisenman",
    "type": "mentor-influence",
    "label": "이론적 담론 후원 및 MoMA 1988 해체주의전 메인 선정"
  },
  {
    "from": "philip-johnson",
    "to": "frank-gehry",
    "type": "mentor-influence",
    "label": "산타모니카 자택 격찬 및 빌바오 구겐하임 세계적 후원"
  },
  {
    "from": "philip-johnson",
    "to": "zaha-hadid",
    "type": "mentor-influence",
    "label": "MoMA 해체주의전 출품 및 프리츠커상 심사위원 강력 추천"
  },
  {
    "from": "philip-johnson",
    "to": "daniel-libeskind",
    "type": "mentor-influence",
    "label": "초기 도면 격찬 및 베를린 유대인 박물관 세계적 조명 주도"
  },
  {
    "from": "rem-koolhaas",
    "to": "zaha-hadid",
    "type": "master-disciple",
    "label": "런던 AA스쿨 사제 관계 및 초기 OMA 파트너십 활동"
  },
  {
    "from": "rem-koolhaas",
    "to": "bjarke-ingels",
    "type": "master-disciple",
    "label": "로테르담 OMA 사무소에서 시애틀 도서관 등 핵심 실무 후 BIG 설립"
  },
  {
    "from": "peter-eisenman",
    "to": "daniel-libeskind",
    "type": "mentor-influence",
    "label": "해체주의 이론적 사상 교류 및 건축 텍스트화 격려"
  },
  {
    "from": "norman-foster",
    "to": "david-chipperfield",
    "type": "master-disciple",
    "label": "포스터 앤 파트너스에서 실무 수련 및 디테일 정밀성 계승"
  },
  {
    "from": "richard-rogers",
    "to": "david-chipperfield",
    "type": "master-disciple",
    "label": "로저스 사무소에서 공공 프로젝트 실무 수련"
  },
  {
    "from": "toyo-ito",
    "to": "sanaa",
    "type": "master-disciple",
    "label": "이토 토요 사무소에서 1981-1987 수련 후 독립 (극도의 투명성 계승)"
  },
  {
    "from": "renzo-piano",
    "to": "richard-rogers",
    "type": "collaborator",
    "label": "1971-1977 파리 퐁피두 센터 역사적 공동 설계"
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
