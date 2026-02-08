import svgPaths from "./svg-lbdxz6fu2k";

function Notch() {
  return (
    <div className="-translate-x-1/2 absolute h-[32px] left-1/2 top-[-2px] w-[164px]" data-name="Notch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 164 32">
        <g id="Notch">
          <g id="Notch_2">
            <path d={svgPaths.p3b40e580} fill="black" />
            <path d={svgPaths.p3f2f4600} fill="var(--fill-0, black)" />
            <path d={svgPaths.p27a68100} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatusBarTime() {
  return (
    <div className="-translate-x-1/2 absolute h-[21px] left-[calc(16.67%-11.33px)] rounded-[24px] top-[14px] w-[54px]" data-name="_StatusBar-time">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[22px] left-[27px] not-italic text-[#010101] text-[17px] text-center top-px tracking-[-0.408px] w-[54px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(16.67%-11.33px)] top-[14px]" data-name="Left Side">
      <StatusBarTime />
    </div>
  );
}

function RightSide() {
  return (
    <div className="-translate-x-1/2 absolute h-[13px] left-[calc(83.33%+0.03px)] top-[19px] w-[77.401px]" data-name="Right Side">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.4012 13">
        <g id="Right Side">
          <g id="Battery">
            <path d={svgPaths.p2646e000} id="Outline" opacity="0.35" stroke="var(--stroke-0, black)" strokeWidth="1.05509" />
            <path d={svgPaths.p4c0c710} fill="var(--fill-0, black)" id="Battery End" opacity="0.4" />
            <path d={svgPaths.p22239c00} fill="var(--fill-0, black)" id="Fill" />
          </g>
          <path d={svgPaths.p13992000} fill="var(--fill-0, black)" id="Wifi" />
          <g id="Icon / Mobile Signal">
            <path d={svgPaths.p16816b00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p18ef7a00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2262f080} fill="var(--fill-0, black)" />
            <path d={svgPaths.pc5da680} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[95px] top-[79px]">
      <p className="-translate-x-1/2 absolute bg-clip-text bg-gradient-to-r font-['Montserrat:SemiBold',sans-serif] font-semibold from-[#f0b966] h-[69px] leading-[22px] left-[calc(50%+5px)] text-[50px] text-center text-shadow-[0px_0px_15px_rgba(255,255,255,0.25)] to-[#f48c78] top-[calc(50%-448.5px)] tracking-[-0.45px] w-[356px] whitespace-pre-wrap" style={{ WebkitTextFillColor: "transparent" }}>
        P nPo nt
      </p>
      <div className="absolute inset-[7.46%_60.26%_89.61%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-8.06%_-20.83%_0_-20.83%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 33.5">
            <path d={svgPaths.p1a64e800} id="Vector" stroke="url(#paint0_linear_1_9137)" strokeWidth="5" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_9137" x1="8.5" x2="8.5" y1="2.5" y2="33.5">
                <stop stopColor="#A0D7FF" />
                <stop offset="0.5" stopColor="#9DB2D4" />
                <stop offset="0.75" stopColor="#A1ABCF" />
                <stop offset="1" stopColor="#9594B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[7.46%_38.99%_89.61%_58.77%]" data-name="Vector">
        <div className="absolute inset-[-8.06%_-20.83%_0_-20.83%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 33.5">
            <path d={svgPaths.p1a64e800} id="Vector" stroke="url(#paint0_linear_1_9137)" strokeWidth="5" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_9137" x1="8.5" x2="8.5" y1="2.5" y2="33.5">
                <stop stopColor="#A0D7FF" />
                <stop offset="0.5" stopColor="#9DB2D4" />
                <stop offset="0.75" stopColor="#A1ABCF" />
                <stop offset="1" stopColor="#9594B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function MaterialSymbolsPersonHeartOutlineRounded() {
  return <div className="absolute left-[43px] size-[24px] top-[203px]" data-name="material-symbols:person-heart-outline-rounded" />;
}

function StatusBarIPhone() {
  return (
    <div className="absolute h-[1059px] left-0 overflow-clip shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] top-0 w-[536px]" data-name="StatusBar / iPhone 15">
      <Notch />
      <LeftSide />
      <RightSide />
      <Group2 />
      <MaterialSymbolsPersonHeartOutlineRounded />
      <div className="absolute bg-white h-[97px] left-[37px] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] top-[622px] w-[462px]" />
      <div className="absolute bg-white h-[97px] left-[37px] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] top-[740px] w-[462px]" />
      <div className="absolute bg-white h-[97px] left-[37px] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] top-[858px] w-[462px]" />
    </div>
  );
}

function ArcticonsZoodLocation() {
  return (
    <div className="absolute inset-[6.7%_70.15%_89.05%_21.46%]" data-name="arcticons:zood-location">
      <div className="absolute inset-[-87.01%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 123.312 123.312">
          <g filter="url(#filter0_d_1_8820)" id="arcticons:zood-location">
            <g id="Group">
              <path d={svgPaths.p2b2be380} id="Vector" stroke="url(#paint0_linear_1_8820)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              <path d={svgPaths.p310a9280} id="Vector_2" stroke="url(#paint1_linear_1_8820)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              <g clipPath="url(#paint2_angular_1_8820_clip_path)" data-figma-skip-parse="true">
                <g transform="matrix(0 0.0180352 -0.0178828 0 61.5522 61.5217)" />
              </g>
              <path d={svgPaths.p38d59a00} data-figma-gradient-fill="{'type':'GRADIENT_ANGULAR','stops':[{'color':{'r':0.58144301176071167,'g':0.76978504657745361,'b':0.90705120563507080,'a':1.0},'position':0.250},{'color':{'r':0.63895040750503540,'g':0.73057985305786133,'b':0.87820506095886230,'a':1.0},'position':0.31250},{'color':{'r':0.63690978288650513,'g':0.60844004154205322,'b':0.85897433757781982,'a':1.0},'position':0.3750},{'color':{'r':0.88461536169052124,'g':0.68330848217010498,'b':0.85996556282043457,'a':1.0},'position':1.0}],'stopsVar':[{'color':{'r':0.58144301176071167,'g':0.76978504657745361,'b':0.90705120563507080,'a':1.0},'position':0.250},{'color':{'r':0.63895040750503540,'g':0.73057985305786133,'b':0.87820506095886230,'a':1.0},'position':0.31250},{'color':{'r':0.63690978288650513,'g':0.60844004154205322,'b':0.85897433757781982,'a':1.0},'position':0.3750},{'color':{'r':0.88461536169052124,'g':0.68330848217010498,'b':0.85996556282043457,'a':1.0},'position':1.0}],'transform':{'m00':2.1900130024884133e-15,'m01':-35.7656250,'m02':79.434997558593750,'m10':36.070316314697266,'m11':2.2086699619428734e-15,'m12':43.486560821533203},'opacity':1.0,'blendMode':'NORMAL','visible':true}" id="Vector_3" />
            </g>
            <path d={svgPaths.p33163300} id="Vector_4" stroke="url(#paint3_linear_1_8820)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="125" id="filter0_d_1_8820" width="125" x="-0.84375" y="-0.84375">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="20" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.548077 0 0 0 0 0.548077 0 0 0 0 0.548077 0 0 0 0.4 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_8820" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_8820" mode="normal" result="shape" />
            </filter>
            <clipPath id="paint2_angular_1_8820_clip_path">
              <path d={svgPaths.p38d59a00} id="Vector_3" />
            </clipPath>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_8820" x1="61.6562" x2="61.6562" y1="56.0247" y2="67.2878">
              <stop stopColor="#A89F9F" />
              <stop offset="1" stopColor="#7A7676" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_8820" x1="61.4809" x2="61.4809" y1="43.6413" y2="79.4125">
              <stop stopColor="#E097AA" />
              <stop offset="1" stopColor="#E1B46E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_8820" x1="61.6562" x2="61.6562" y1="41.5" y2="81.8125">
              <stop stopColor="#D38FA0" />
              <stop offset="1" stopColor="#DEB05D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MdiLightEmail() {
  return (
    <div className="absolute left-[84px] size-[24px] top-[378px]" data-name="mdi-light:email">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi-light:email">
          <path d={svgPaths.p22cfae00} fill="var(--fill-0, #444444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[16.67%]" data-name="Group">
      <div className="absolute inset-[-3.13%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
          <g id="Group">
            <path d={svgPaths.p24ecfb00} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinejoin="round" />
            <path d={svgPaths.p364d4e00} id="Vector_2" stroke="var(--stroke-0, #444444)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconamoonProfileThin() {
  return (
    <div className="absolute left-[84px] overflow-clip size-[24px] top-[268px]" data-name="iconamoon:profile-thin">
      <Group />
    </div>
  );
}

function MaterialSymbolsLightPassword2Rounded() {
  return (
    <div className="absolute left-[111px] size-[24px] top-[491px]" data-name="material-symbols-light:password-2-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols-light:password-2-rounded">
          <path d={svgPaths.p3fa0d540} fill="var(--fill-0, #9C9C9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArcticonsPassword() {
  return (
    <div className="absolute left-[84px] size-[24px] top-[488px]" data-name="arcticons:password">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arcticons:password">
          <path d={svgPaths.p2f9903f2} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31bd4680} id="Vector_2" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pd7a6480} id="Vector_3" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function MaterialSymbolsLightPassword2Rounded1() {
  return (
    <div className="absolute left-[134px] size-[24px] top-[491px]" data-name="material-symbols-light:password-2-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols-light:password-2-rounded">
          <path d={svgPaths.p3fa0d540} fill="var(--fill-0, #9C9C9C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function FluentPersonHeart28Regular() {
  return (
    <div className="absolute left-[66px] size-[30px] top-[656px]" data-name="fluent:person-heart-28-regular">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="fluent:person-heart-28-regular">
          <path d={svgPaths.p1930d080} fill="var(--fill-0, #FFFCFC)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CarbonEvent() {
  return (
    <div className="absolute left-[66px] size-[30px] top-[774px]" data-name="carbon:event">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_1_6303)" id="carbon:event">
          <path d={svgPaths.p3bf6fa80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p273d1e00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_6303">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[16.67%_12.92%_13.97%_10%]" data-name="Group">
      <div className="absolute inset-[-4.82%_-4.32%_-4.81%_-4.32%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.1227 22.8132">
          <g id="Group">
            <path d={svgPaths.p340b6480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2695c060} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function MageHeartHealth() {
  return (
    <div className="absolute left-[66px] overflow-clip size-[30px] top-[892px]" data-name="mage:heart-health">
      <Group1 />
    </div>
  );
}

export default function CreateAccountLight() {
  return (
    <div className="relative size-full" data-name="Create Account- light" style={{ backgroundImage: "linear-gradient(155.196deg, rgb(255, 228, 178) 4.788%, rgb(254, 227, 185) 16.594%, rgb(253, 226, 192) 28.401%, rgb(251, 224, 206) 52.014%, rgb(249, 223, 213) 63.82%, rgb(248, 222, 220) 75.627%, rgb(249, 223, 223) 78.578%, rgb(250, 225, 226) 81.53%, rgb(252, 230, 236) 90.385%, rgb(255, 235, 246) 99.24%)" }}>
      <StatusBarIPhone />
      <ArcticonsZoodLocation />
      <p className="-translate-x-1/2 absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[22px] left-[267.5px] text-[#444] text-[17px] text-center top-[139px] tracking-[-0.408px]">Create Your Account</p>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] left-[calc(50%-0.5px)] text-[#adadad] text-[15px] text-center top-[174px] tracking-[-0.408px] w-[281px]">
        <p className="leading-[22px] whitespace-pre-wrap">{`Join PinPoint and stay connected `}</p>
      </div>
      <div className="absolute bg-white h-[336px] left-[28px] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] top-[203px] w-[475px]" />
      <div className="absolute bg-[#eef2f7] h-[40px] left-[67px] rounded-[20px] top-[260px] w-[300px]" />
      <div className="absolute bg-[#eef2f7] h-[40px] left-[67px] rounded-[20px] top-[370px] w-[300px]" />
      <div className="absolute bg-[#eef2f7] h-[40px] left-[67px] rounded-[20px] top-[480px] w-[300px]" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] left-[calc(50%-201px)] text-[#adadad] text-[15px] top-[240px] tracking-[-0.408px] w-[81px]">
        <p className="leading-[22px] whitespace-pre-wrap">Full Name</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] left-[calc(50%-225px)] text-[#949494] text-[20px] top-[595px] tracking-[-0.408px] w-[193px]">
        <p className="leading-[22px] whitespace-pre-wrap">Select Your Role</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] left-[calc(50%-201px)] text-[#adadad] text-[15px] top-[348px] tracking-[-0.408px] w-[81px]">
        <p className="leading-[22px] whitespace-pre-wrap">Email</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[calc(50%-201px)] text-[#adadad] text-[15px] top-[454px] tracking-[-0.408px] w-[81px]">
        <p className="leading-[22px] whitespace-pre-wrap">Password</p>
      </div>
      <MdiLightEmail />
      <IconamoonProfileThin />
      <MaterialSymbolsLightPassword2Rounded />
      <ArcticonsPassword />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium h-[26px] justify-center leading-[0] left-[calc(50%-115px)] text-[#9c9c9c] text-[15px] text-center top-[280px] tracking-[-0.408px] w-[90px]">
        <p className="leading-[22px] whitespace-pre-wrap">John Doe</p>
      </div>
      <a className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium h-[26px] justify-center leading-[0] left-[calc(50%-150px)] text-[#9c9c9c] text-[15px] top-[390px] tracking-[-0.408px] w-[181px]" href="mailto:your@gmail.com">
        <p className="cursor-pointer leading-[22px] whitespace-pre-wrap">your@gmail.com</p>
      </a>
      <MaterialSymbolsLightPassword2Rounded1 />
      <div className="absolute left-[51px] rounded-[20px] size-[60px] top-[641px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(165, 198, 241) 0%, rgb(226, 169, 212) 100%)" }} />
      <div className="absolute left-[51px] rounded-[20px] size-[60px] top-[759px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(246, 166, 187) 0%, rgb(248, 202, 125) 100%)" }} />
      <div className="absolute left-[51px] rounded-[20px] size-[60px] top-[877px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(248, 193, 108) 0%, rgb(244, 138, 121) 100%)" }} />
      <FluentPersonHeart28Regular />
      <CarbonEvent />
      <MageHeartHealth />
      <p className="-translate-x-1/2 absolute font-['Montserrat:SemiBold',sans-serif] font-semibold h-[30px] leading-[22px] left-[178.5px] text-[#949494] text-[25px] text-center top-[656px] tracking-[-0.408px] w-[141px] whitespace-pre-wrap">Attendee</p>
      <p className="-translate-x-1/2 absolute font-['Montserrat:SemiBold',sans-serif] font-semibold h-[30px] leading-[22px] left-[222px] text-[#949494] text-[25px] text-center top-[774px] tracking-[-0.408px] w-[228px] whitespace-pre-wrap">Event Organizer</p>
      <p className="-translate-x-1/2 absolute font-['Montserrat:SemiBold',sans-serif] font-semibold h-[30px] leading-[22px] left-[197.5px] text-[#949494] text-[25px] text-center top-[892px] tracking-[-0.408px] w-[179px] whitespace-pre-wrap">Health Staff</p>
      <div className="absolute h-[49px] left-[49px] rounded-[30px] top-[985px] w-[437px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(136, 204, 249, 0.5) 0%, rgba(161, 191, 237, 0.5) 10.564%, rgba(187, 178, 224, 0.5) 21.128%, rgba(215, 167, 211, 0.5) 33.424%, rgba(242, 155, 199, 0.5) 45.719%, rgba(243, 145, 166, 0.5) 56.862%, rgba(243, 136, 133, 0.5) 68.005%, rgba(244, 153, 126, 0.5) 74.057%, rgba(245, 169, 119, 0.5) 80.109%, rgba(247, 185, 111, 0.5) 86.161%, rgba(248, 202, 104, 0.5) 92.213%)" }} />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] left-[calc(50%-0.5px)] text-[20px] text-[rgba(255,255,255,0.7)] text-center top-[1010px] tracking-[-0.408px] w-[193px]">
        <p className="leading-[22px] whitespace-pre-wrap">Create Account</p>
      </div>
    </div>
  );
}