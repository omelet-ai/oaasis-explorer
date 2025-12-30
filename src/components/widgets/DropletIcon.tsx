import React from 'react';

// 물방울 아이콘 컴포넌트의 Props 타입
export interface DropletIconProps {
  size?: number;
  colorTheme: string;
  faceStyle: string;
  faceOnly?: boolean; // 얼굴만 표시할지 여부
  dropletOnly?: boolean; // 물방울만 표시할지 여부 (얼굴 숨김)
}

// 솔리드 색상 테마 정의 (그라데이션 제거)
export const colorThemes = {
  grape: {
    name: "그레이프",
    background: "#F3F0FF",
    main: "#8B7CF8",
    faceColor: "#F8F6FF",
    eyeColor: "#5B4FC7",
    mouthColor: "#6A5ADB",
    emotion: "신비롭고 창의적인"
  },
  sunny: {
    name: "써니",
    background: "#FFF4E6",
    main: "#FFB84D",
    faceColor: "#FFF8EC",
    eyeColor: "#CC7A00",
    mouthColor: "#E6890A",
    emotion: "활발하고 에너지 넘치는"
  },
  ocean: {
    name: "오션",
    background: "#E0F7F1",
    main: "#4ECDC4",
    faceColor: "#E6F9F5",
    eyeColor: "#2A9D8F",
    mouthColor: "#36A896",
    emotion: "차분하고 신뢰감 있는"
  },
  rose: {
    name: "로즈",
    background: "#FCE7F3",
    main: "#F472B6",
    faceColor: "#FDF2F8",
    eyeColor: "#BE185D",
    mouthColor: "#DB2777",
    emotion: "다정하고 친근한"
  },
  mint: {
    name: "민트",
    background: "#ECFDF5",
    main: "#4ADE80",
    faceColor: "#F0FDF4",
    eyeColor: "#16A34A",
    mouthColor: "#22C55E",
    emotion: "상쾌하고 깔끔한"
  },
  peach: {
    name: "피치",
    background: "#FFF0E6",
    main: "#FB923C",
    faceColor: "#FFF7ED",
    eyeColor: "#C2410C",
    mouthColor: "#DC2626",
    emotion: "따뜻하고 포근한"
  },
  lavender: {
    name: "라벤더",
    background: "#F3E8FF",
    main: "#C084FC",
    faceColor: "#FAF5FF",
    eyeColor: "#7C3AED",
    mouthColor: "#8B5CF6",
    emotion: "우아하고 세련된"
  },
  lemon: {
    name: "레몬",
    background: "#FEF9C3",
    main: "#FDE047",
    faceColor: "#FEFCE8",
    eyeColor: "#A3A300",
    mouthColor: "#BFBF00",
    emotion: "밝고 긍정적인"
  }
};

// 얼굴 스타일 정의 (모양 + 표정이 조합된 완성형)
export const faceStyles = {
  "happy-polygon": {
    name: "행복한 다각형",
    description: "밝고 활발한 다각형 얼굴",
    shape: "polygon",
    eyes: { leftPos: [68, 60], rightPos: [88, 60], type: "ellipse" },
    mouth: { pos: [78, 72], type: "smile" }
  },
  "excited-polygon": {
    name: "신난 다각형", 
    description: "에너지 넘치는 다각형 얼굴",
    shape: "polygon",
    eyes: { leftPos: [68, 60], rightPos: [88, 60], type: "star" },
    mouth: { pos: [78, 72], type: "open-smile" }
  },
  "thinking-polygon": {
    name: "생각하는 다각형",
    description: "지적인 다각형 얼굴", 
    shape: "polygon",
    eyes: { leftPos: [68, 60], rightPos: [88, 60], type: "asymmetric" },
    mouth: { pos: [78, 72], type: "line" }
  },
  "cool-rounded": {
    name: "쿨한 둥근사각형",
    description: "차분하고 신뢰감 있는 얼굴",
    shape: "roundedRect", 
    eyes: { leftPos: [68, 60], rightPos: [88, 60], type: "wink" },
    mouth: { pos: [78, 72], type: "side-smile" }
  },
  "sleepy-rounded": {
    name: "졸린 둥근사각형",
    description: "평온한 둥근사각형 얼굴",
    shape: "roundedRect",
    eyes: { leftPos: [68, 60], rightPos: [88, 60], type: "sleepy" },
    mouth: { pos: [78, 72], type: "small-o" }
  },
  "surprised-rounded": {
    name: "놀란 둥근사각형", 
    description: "깜짝 놀란 둥근사각형 얼굴",
    shape: "roundedRect",
    eyes: { leftPos: [68, 60], rightPos: [88, 60], type: "wide" },
    mouth: { pos: [78, 72], type: "o-shape" }
  },
  "elegant-shield": {
    name: "우아한 방패형",
    description: "세련되고 우아한 방패형 얼굴",
    shape: "shield",
    eyes: { leftPos: [66.5, 57], rightPos: [89.5, 57], type: "elegant" },
    mouth: { pos: [78, 68], type: "gentle-smile" }
  },
  "lovely-oval": {
    name: "사랑스러운 타원형",
    description: "다정하고 친근한 타원형 얼굴", 
    shape: "oval",
    eyes: { leftPos: [65, 61], rightPos: [91, 61], type: "heart" },
    mouth: { pos: [78, 71], type: "cute-smile" },
    eyebrows: true
  }
};

// 얼굴 모양 생성 함수
const generateFaceShape = (faceStyle: any, theme: any) => {
  const { shape } = faceStyle;
  
  if (shape === "roundedRect") {
    return (
      <path 
        d="M46 64.5C46 52.7875 46 46.9312 48.9186 42.7871C49.9765 41.2851 51.2851 39.9765 52.7871 38.9186C56.9312 36 62.7875 36 74.5 36H81.5C93.2125 36 99.0688 36 103.213 38.9186C104.715 39.9765 106.024 41.2851 107.081 42.7871C110 46.9312 110 52.7875 110 64.5C110 76.2125 110 82.0688 107.081 86.2129C106.024 87.7149 104.715 89.0235 103.213 90.0814C99.0688 93 93.2125 93 81.5 93H74.5C62.7875 93 56.9312 93 52.7871 90.0814C51.2851 89.0235 49.9765 87.7149 48.9186 86.2129C46 82.0688 46 76.2125 46 64.5Z" 
        fill={theme.faceColor}
        stroke={theme.main}
        strokeWidth="2"
      />
    );
  } else if (shape === "shield") {
    return (
      <path 
        d="M46 51.9543C46 47.0359 48.6354 42.4945 52.9058 40.0543C57.42 37.4748 62.8191 36.9402 67.7514 38.5843L74.2751 40.7589C76.693 41.5648 79.307 41.5648 81.7249 40.7589L88.2486 38.5843C93.1809 36.9402 98.58 37.4748 103.094 40.0543C107.365 42.4945 110 47.0359 110 51.9543V74.7787C110 80.3732 106.666 85.4294 101.524 87.6331C97.9322 89.1724 93.9478 89.5445 90.1334 88.6968L81.4994 86.7781C81.0395 86.6759 80.8095 86.6248 80.5805 86.5819C78.875 86.2621 77.125 86.2621 75.4195 86.5819C75.1905 86.6248 74.9605 86.6759 74.5006 86.7781L65.8666 88.6968C62.0522 89.5445 58.0678 89.1724 54.4762 87.6331C49.334 85.4294 46 80.3732 46 74.7787V51.9543Z" 
        fill={theme.faceColor}
        stroke={theme.main}
        strokeWidth="2"
      />
    );
  } else if (shape === "oval") {
    return (
      <ellipse 
        cx="78" 
        cy="65" 
        rx="32" 
        ry="23" 
        fill={theme.faceColor}
        stroke={theme.main}
        strokeWidth="2"
      />
    );
  } else {
    // polygon (기본값)
    return (
      <path 
        d="M72.2852 34.8336C75.4222 31.6314 80.5778 31.6314 83.7148 34.8336L93.1551 44.4703C94.0044 45.3373 95.0044 46.0424 96.1062 46.5512L108.143 52.1095C112.379 54.0655 114.049 59.2164 111.767 63.2857L105.531 74.4053C104.916 75.5021 104.513 76.705 104.344 77.9511L102.609 90.7265C101.996 95.2375 97.7481 98.3287 93.2674 97.5239L79.7679 95.0991C78.5987 94.8891 77.4014 94.8891 76.2321 95.0991L62.7327 97.5239C58.2519 98.3287 54.0037 95.2375 53.3911 90.7265L51.6561 77.9511C51.4869 76.705 51.0842 75.5021 50.4691 74.4053L44.2331 63.2857C41.9509 59.2164 43.621 54.0655 47.8568 52.1095L59.8938 46.5511C60.9956 46.0424 61.9956 45.3372 62.8449 44.4703L72.2852 34.8336Z" 
        fill={theme.faceColor}
        stroke={theme.main}
        strokeWidth="2"
      />
    );
  }
};

// 표정 생성 함수 (얼굴 스타일에 따라)
const generateFaceExpression = (faceStyle: any, theme: any) => {
  const { eyes, mouth, eyebrows, shape } = faceStyle;
  
  // 눈썹 (타원형 전용)
  const eyebrowElements = eyebrows && shape === "oval" ? (
    <>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M70.7176 58.1984C68.3211 57.891 65.8875 58.0612 63.5572 58.6991L62.4972 58.9893C61.5916 59.2372 60.6565 58.7041 60.4086 57.7985C60.1607 56.8929 60.6939 55.9579 61.5994 55.71L62.6595 55.4198C65.4227 54.6633 68.3085 54.4615 71.1502 54.826L72.2402 54.9659C73.1715 55.0853 73.8296 55.9371 73.7101 56.8684C73.5907 57.7996 72.7389 58.4577 71.8076 58.3382L70.7176 58.1984Z" 
        fill={theme.eyeColor}
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M92.4436 58.6964C90.1133 58.0584 87.6797 57.8883 85.2833 58.1957L84.1932 58.3355C83.2619 58.455 82.4102 57.7969 82.2907 56.8656C82.1712 55.9344 82.8293 55.0826 83.7606 54.9632L84.8507 54.8233C87.6923 54.4588 90.5781 54.6606 93.3414 55.417L94.4014 55.7072C95.307 55.9551 95.8401 56.8902 95.5922 57.7958C95.3443 58.7013 94.4092 59.2345 93.5037 58.9866L92.4436 58.6964Z" 
        fill={theme.eyeColor}
      />
    </>
  ) : null;
  
  // 눈 생성
  const eyeElements = generateEyes(eyes, theme, shape);
  
  // 입 생성  
  const mouthElements = generateMouth(mouth, theme, shape);
  
  return (
    <>
      {eyebrowElements}
      {eyeElements}
      {mouthElements}
    </>
  );
};

// 눈 생성 함수 (누락된 눈 수정)
const generateEyes = (eyes: any, theme: any, shape: string) => {
  const { leftPos, rightPos, type } = eyes;
  
  if (type === "ellipse") {
    return (
      <>
        <ellipse cx={leftPos[0]} cy={leftPos[1]} rx="3" ry="5" fill={theme.eyeColor}/>
        <ellipse cx={leftPos[0]} cy={leftPos[1] - 1.5} rx="1" ry="1" fill="white" opacity="0.8"/>
        <ellipse cx={rightPos[0]} cy={rightPos[1]} rx="3" ry="5" fill={theme.eyeColor}/>
        <ellipse cx={rightPos[0]} cy={rightPos[1] - 1.5} rx="1" ry="1" fill="white" opacity="0.8"/>
      </>
    );
  } else if (type === "star") {
    return (
      <>
        <path d={`M${leftPos[0]} ${leftPos[1]-5} L${leftPos[0]+1.5} ${leftPos[1]-1.5} L${leftPos[0]+5} ${leftPos[1]-1.5} L${leftPos[0]+2.5} ${leftPos[1]+1} L${leftPos[0]+3} ${leftPos[1]+4} L${leftPos[0]} ${leftPos[1]+2.5} L${leftPos[0]-3} ${leftPos[1]+4} L${leftPos[0]-2.5} ${leftPos[1]+1} L${leftPos[0]-5} ${leftPos[1]-1.5} L${leftPos[0]-1.5} ${leftPos[1]-1.5} Z`} fill={theme.eyeColor}/>
        <path d={`M${rightPos[0]} ${rightPos[1]-5} L${rightPos[0]+1.5} ${rightPos[1]-1.5} L${rightPos[0]+5} ${rightPos[1]-1.5} L${rightPos[0]+2.5} ${rightPos[1]+1} L${rightPos[0]+3} ${rightPos[1]+4} L${rightPos[0]} ${rightPos[1]+2.5} L${rightPos[0]-3} ${rightPos[1]+4} L${rightPos[0]-2.5} ${rightPos[1]+1} L${rightPos[0]-5} ${rightPos[1]-1.5} L${rightPos[0]-1.5} ${rightPos[1]-1.5} Z`} fill={theme.eyeColor}/>
      </>
    );
  } else if (type === "wink") {
    return (
      <>
        <path d={`M${leftPos[0]-3} ${leftPos[1]} Q${leftPos[0]} ${leftPos[1]-1.5} ${leftPos[0]+3} ${leftPos[1]}`} stroke={theme.eyeColor} strokeWidth="2" fill="none"/>
        <ellipse cx={rightPos[0]} cy={rightPos[1]} rx="3" ry="5" fill={theme.eyeColor}/>
        <ellipse cx={rightPos[0]} cy={rightPos[1] - 1.5} rx="1" ry="1" fill="white" opacity="0.8"/>
      </>
    );
  } else if (type === "sleepy") {
    return (
      <>
        <path d={`M${leftPos[0]-3} ${leftPos[1]} Q${leftPos[0]} ${leftPos[1]+1} ${leftPos[0]+3} ${leftPos[1]}`} stroke={theme.eyeColor} strokeWidth="2" fill="none"/>
        <path d={`M${rightPos[0]-3} ${rightPos[1]} Q${rightPos[0]} ${rightPos[1]+1} ${rightPos[0]+3} ${rightPos[1]}`} stroke={theme.eyeColor} strokeWidth="2" fill="none"/>
      </>
    );
  } else if (type === "wide") {
    return (
      <>
        <ellipse cx={leftPos[0]} cy={leftPos[1]} rx="4" ry="4" fill={theme.eyeColor}/>
        <ellipse cx={leftPos[0]} cy={leftPos[1] - 1} rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
        <ellipse cx={rightPos[0]} cy={rightPos[1]} rx="4" ry="4" fill={theme.eyeColor}/>
        <ellipse cx={rightPos[0]} cy={rightPos[1] - 1} rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
      </>
    );
  } else if (type === "asymmetric") {
    return (
      <>
        <ellipse cx={leftPos[0]} cy={leftPos[1]} rx="3" ry="5" fill={theme.eyeColor}/>
        <ellipse cx={leftPos[0]} cy={leftPos[1] - 1.5} rx="1" ry="1" fill="white" opacity="0.8"/>
        <path d={`M${rightPos[0]-3} ${rightPos[1]-1} Q${rightPos[0]} ${rightPos[1]-2} ${rightPos[0]+3} ${rightPos[1]}`} stroke={theme.eyeColor} strokeWidth="2" fill="none"/>
      </>
    );
  } else if (type === "elegant") {
    return (
      <>
        <path d={`M${leftPos[0]-3} ${leftPos[1]} Q${leftPos[0]} ${leftPos[1]-2} ${leftPos[0]+3} ${leftPos[1]}`} stroke={theme.eyeColor} strokeWidth="2" fill="none"/>
        <path d={`M${rightPos[0]-3} ${rightPos[1]} Q${rightPos[0]} ${rightPos[1]-2} ${rightPos[0]+3} ${rightPos[1]}`} stroke={theme.eyeColor} strokeWidth="2" fill="none"/>
      </>
    );
  } else if (type === "heart") {
    return (
      <>
        <path d={`M${leftPos[0]} ${leftPos[1]+2} C${leftPos[0]-4} ${leftPos[1]-3} ${leftPos[0]-6} ${leftPos[1]-1} ${leftPos[0]-2.5} ${leftPos[1]-4.5} C${leftPos[0]} ${leftPos[1]-6} ${leftPos[0]+2.5} ${leftPos[1]-4.5} ${leftPos[0]+6} ${leftPos[1]-1} C${leftPos[0]+4} ${leftPos[1]-3} ${leftPos[0]} ${leftPos[1]+2} ${leftPos[0]} ${leftPos[1]+2} Z`} fill="#F472B6"/>
        <path d={`M${rightPos[0]} ${rightPos[1]+2} C${rightPos[0]-4} ${rightPos[1]-3} ${rightPos[0]-6} ${rightPos[1]-1} ${rightPos[0]-2.5} ${rightPos[1]-4.5} C${rightPos[0]} ${rightPos[1]-6} ${rightPos[0]+2.5} ${rightPos[1]-4.5} ${rightPos[0]+6} ${rightPos[1]-1} C${rightPos[0]+4} ${rightPos[1]-3} ${rightPos[0]} ${rightPos[1]+2} ${rightPos[0]} ${rightPos[1]+2} Z`} fill="#F472B6"/>
      </>
    );
  }
  
  // 기본값
  return generateEyes({ ...eyes, type: "ellipse" }, theme, shape);
};

// 입 생성 함수
const generateMouth = (mouth: any, theme: any, shape: string) => {
  const { pos, type } = mouth;
  
  if (type === "smile") {
    return (
      <path 
        d={`M${pos[0]-5} ${pos[1]} Q${pos[0]} ${pos[1]+3} ${pos[0]+5} ${pos[1]}`} 
        stroke={theme.mouthColor} 
        strokeWidth="2" 
        fill="none"
      />
    );
  } else if (type === "open-smile") {
    return (
      <ellipse cx={pos[0]} cy={pos[1]} rx="6" ry="3" fill={theme.mouthColor}/>
    );
  } else if (type === "side-smile") {
    return (
      <path 
        d={`M${pos[0]-3} ${pos[1]} Q${pos[0]+1} ${pos[1]-2} ${pos[0]+5} ${pos[1]}`} 
        stroke={theme.mouthColor} 
        strokeWidth="2" 
        fill="none"
      />
    );
  } else if (type === "small-o") {
    return (
      <ellipse cx={pos[0]} cy={pos[1]} rx="2" ry="2.5" fill={theme.mouthColor}/>
    );
  } else if (type === "o-shape") {
    return (
      <ellipse cx={pos[0]} cy={pos[1]} rx="3" ry="3.5" fill={theme.mouthColor}/>
    );
  } else if (type === "line") {
    return (
      <rect x={pos[0]-3} y={pos[1]} width="6" height="1.5" rx="0.75" fill={theme.mouthColor}/>
    );
  } else if (type === "gentle-smile") {
    return (
      <path 
        d={`M${pos[0]-4} ${pos[1]} Q${pos[0]} ${pos[1]+2} ${pos[0]+4} ${pos[1]}`} 
        stroke={theme.mouthColor} 
        strokeWidth="2" 
        fill="none"
      />
    );
  } else if (type === "cute-smile") {
    return (
      <path 
        d={`M${pos[0]-4} ${pos[1]} Q${pos[0]} ${pos[1]+2.5} ${pos[0]+4} ${pos[1]}`} 
        stroke={theme.mouthColor} 
        strokeWidth="2" 
        fill="none"
      />
    );
  }
  
  // 기본값
  return generateMouth({ ...mouth, type: "smile" }, theme, shape);
};

// 메인 물방울 아이콘 SVG 컴포넌트 (음영 제거)
export default function DropletIcon({ size = 40, colorTheme, faceStyle, faceOnly = false, dropletOnly = false }: DropletIconProps) {
  const theme = colorThemes[colorTheme as keyof typeof colorThemes] || colorThemes.grape;
  const face = faceStyles[faceStyle as keyof typeof faceStyles] || faceStyles["happy-polygon"];
  
  // 얼굴만 표시할 때는 회색 테마 사용
  const displayTheme = faceOnly ? {
    background: "#F8F9FA",
    main: "#6C757D", 
    faceColor: "#E9ECEF",
    eyeColor: "#343A40",
    mouthColor: "#495057",
    emotion: "중성적인"
  } : theme;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 배경 */}
      <rect width="160" height="160" rx="20" fill="transparent"/>
      
      {/* 물방울 바디 (faceOnly일 때는 숨김) */}
      {!faceOnly && (
        <path 
          d="M113.971 101.525C104.761 110.48 80.1029 123.862 77.9985 145C75.9885 123.862 51.2359 110.48 42.0256 101.525C32.8154 92.5694 27.125 80.1884 27.125 66.5146C27.125 52.8408 32.8154 40.4692 42.0256 31.5043C51.2359 22.5488 63.9472 17 77.9985 17C92.0498 17 104.761 22.5394 113.971 31.5043C123.182 40.4597 128.872 52.8408 128.872 66.5146C128.872 80.1884 123.182 92.56 113.971 101.525Z" 
          fill={displayTheme.main}
        />
      )}
      
      {/* 얼굴 모양과 표정 (dropletOnly일 때는 숨김) */}
      {!dropletOnly && (
        <>
          {/* 얼굴 모양 */}
          {generateFaceShape(face, displayTheme)}
          
          {/* 표정 */}
          {generateFaceExpression(face, displayTheme)}
        </>
      )}
    </svg>
  );
}

// 기존 호환성을 위한 헬퍼 함수 (기존 icon/color를 새 시스템으로 변환)
export function getDropletIconProps(iconValue: string, colorValue: string) {
  // 아이콘 → 얼굴스타일 매핑
  const iconMapping = {
    'brain': 'thinking-polygon',
    'truck': 'cool-rounded', 
    'bot': 'happy-polygon',
    'package': 'excited-polygon',
    'database': 'sleepy-rounded',
    'activity': 'surprised-rounded',
    'server': 'thinking-polygon',
    'zap': 'excited-polygon',
    'settings': 'thinking-polygon',
    'shield': 'elegant-shield',
    'happy': 'happy-polygon',
    'excited': 'excited-polygon',
    'cool': 'cool-rounded',
    'sleepy': 'sleepy-rounded',
    'surprised': 'surprised-rounded',
    'thinking': 'thinking-polygon',
    'lovely': 'lovely-oval',
    'sad': 'sleepy-rounded'
  };

  // 색상 → 테마 매핑
  const colorMapping = {
    'bg-purple-500': 'grape',
    'bg-blue-500': 'ocean',
    'bg-green-500': 'mint',
    'bg-orange-500': 'sunny',
    'bg-pink-500': 'rose',
    'bg-red-500': 'peach',
    'bg-yellow-500': 'lemon',
    'bg-indigo-500': 'lavender',
    'grape': 'grape',
    'sunny': 'sunny',
    'ocean': 'ocean',
    'rose': 'rose',
    'mint': 'mint',
    'peach': 'peach',
    'lavender': 'lavender',
    'lemon': 'lemon'
  };

  return {
    faceStyle: iconMapping[iconValue as keyof typeof iconMapping] || 'happy-polygon',
    colorTheme: colorMapping[colorValue as keyof typeof colorMapping] || 'grape'
  };
}



