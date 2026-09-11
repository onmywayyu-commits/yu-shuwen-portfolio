/**
 * ============================================================
 *  siteData.ts —— 网站全部内容数据（内容与 UI 分离）
 * ============================================================
 *  更新网站内容只需要修改本文件，不需要改动任何组件代码。
 *
 *  - 标注「示例数据 · 待替换」的部分（音乐 / 游戏 / 手作）是占位内容，
 *    请替换为你自己的真实条目；
 *  - 联系方式里的空字符串链接（''）表示「待补充」，页面上会显示为灰色占位；
 *  - 修改 lastUpdated 即可更新页脚的「最后更新于」。
 * ============================================================
 */

/* ---------- 类型定义 ---------- */

export interface SiteMeta {
  name: string
  tagline: string
  taglineEn: string
  intro: string
  direction: string // 求职方向
  email: string
  lastUpdated: string
}

export interface Education {
  school: string
  degree: string
  period: string
  details: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  kind: '实习' | '创业'
  summary: string
  points: string[]
  tags: string[]
  link?: string // 可选：项目 / 作品链接
  image?: string // 可选：详情里的配图（放 public/career/ 下）
  imageCaption?: string
}

/** 个人评级梯队（从高到低），未评 = 还没给出评级 */
export type AnimeTier = '夯' | '顶级' | '人上人' | 'npc' | '拉' | '未评'

export interface AnimeEntry {
  id: string
  title: string
  genre: string
  season: string // 如 '2026年7月'
  status: '新番' | '补番'
  tier: AnimeTier
  tierNote?: string // 复合评级的补充说明，如「个人 IP 喜好上是夯」
  shortReview: string
  detail?: string // 完整长评，在弹窗中展示
  dropped?: boolean // 已弃番
  /** 封面图路径（放 public/covers/ 下），留空则使用自动生成的占位封面。
   *  注意：不要以 / 开头，写 'covers/文件名' 即可，否则 GitHub Pages 子路径会 404。 */
  cover?: string
}

export interface MusicEntry {
  id: string
  title: string
  artist: string
  tags: string[] // 如 J-Pop / 动漫音乐 / 通勤 / 学习 / 治愈
  reason: string
  comment: string
  /** 喜欢的片段（歌词摘录等），可选 */
  favoritePart?: string
  link?: string // 外部音乐平台链接
  monthlyPick?: boolean // 「本月循环」精选
  cover?: string
}

export interface GameEntry {
  id: string
  title: string
  platform?: string
  status: '正在玩' | '已通关' | '搁置'
  hours?: string
  recommend: number // 推荐度 1-5，支持 0.5（半星）
  comment: string
  highlight?: string // 突出卡片角标，如「近期最推荐」
  cover?: string
}

export interface CreativeEntry {
  id: string
  title: string
  date: string
  kind: '手作' | '吉他' | '唱歌'
  description: string
  image?: string // 图片放 public/crafts/ 下；留空使用占位块。同样不要以 / 开头。
  link?: string // Bilibili / 网易云 / YouTube 等外链
  linkLabel?: string
  /** 占位块的高度档位，仅在没有图片时用于瀑布流视觉错落 */
  placeholderSize?: 'short' | 'tall'
}

export interface ContactLink {
  label: string
  value: string
  url: string // 空字符串 = 待补充
  note?: string
}

/* ---------- 站点基本信息 ---------- */

export const siteMeta: SiteMeta = {
  name: '俞舒文',
  tagline: '用理性处理问题，用热爱记录生活。',
  taglineEn: 'Towards warmth gently, all smooths out.',
  intro:
    '香港中文大学（深圳）金融学本科生，正在向行业研究与信用分析方向努力。' +
    '白天和财报、数据与研报打交道，晚上写新番评价、弹吉他、做手工——' +
    '这个网站同时安放这两面的我。',
  direction: '行业研究 / 信用分析 / 固定收益方向',
  email: 'shuwenyu@link.cuhk.edu.cn',
  lastUpdated: '2026-09-09',
}

/* ---------- 关于我 ---------- */

export const about = {
  bio:
    '目前就读于香港中文大学（深圳）金融学专业，全英文教学环境，GPA 3.68/4.0（专业前 15%），' +
    '连续两年入选院长嘉许名单。先后在券商固收、投行、信用评级、私募研究与加密行业研究机构实习，' +
    '习惯用数据与结构化思维拆解问题，也喜欢把兴趣做成长期主义的记录——' +
    '比如坚持每季度写新番评价。',
  education: [
    {
      school: '香港中文大学（深圳）',
      degree: '金融学 · 本科',
      period: '2023.09 – 2027.06（预计）',
      details: [
        'GPA 3.68/4.0（专业前 15%），2024 & 2025 院长嘉许名单',
        '雅思 7.5，英语四六级',
        '主修课程：金融学、宏微观经济学、Python 与数据库基础、财务会计、统计学、市场营销',
      ],
    },
    {
      school: '香港中文大学',
      degree: '金融学 · 交换生',
      period: '2024.06 – 2024.07',
      details: ['主修课程：国际金融、国际商务'],
    },
  ] as Education[],
  skills: [
    '数据分析',
    '行业研究',
    '财务分析',
    '信用分析',
    'Excel',
    'Python',
    'SQL',
    'Wind 终端',
    'PowerPoint',
    '英语（雅思 7.5）',
  ],
  tools: ['Excel', 'Python', 'SQL', 'Wind', 'PowerPoint', 'Dify / AI Agent 工作流'],
  interestTags: ['追番剧评', 'J-Pop', '吉他', '唱歌', '手作', '游戏'],
  learning: ['AI Agent 与自动化工作流', '信用分析方法', '如何把剧评写得更诚实'],
}

/* ---------- 实习与经历（按时间倒序） ---------- */

export const experiences: Experience[] = [
  {
    id: 'mexc',
    company: 'MEXC',
    role: '数分组 · 行研实习生',
    period: '2026.06 – 2026.09',
    kind: '实习',
    summary: '从 0 搭建 AI 驱动的行业机会监控日报系统，把数小时人工整理压缩到分钟级。',
    points: [
      '独立用 AI Agent（Dify 工作流 + Python 代码节点 + 多模型）从 0 搭建行业机会监控日报系统，将每日大量友商公告 / 社媒与全市场交易数据自动收敛为决策导向日报，覆盖十余家友商与上百个交易标的，稳定日更一个多月。',
      '设计「代码负责确定性、LLM 负责理解与表达」的混合工作流架构，将热点资产选取、上币跟进判断、竞品信号分类等高频不稳定项从 Prompt 迁移到代码强制执行，显著提升输出稳定性。',
      '协助完成新兴金融赛道行业研究：横向对比 5 家头部机构的产品形态、合规路径与获客打法，结合人口、监管与需求做区域市场潜力分级，输出可落地的战略建议。',
    ],
    tags: ['AI Agent', 'Dify', 'Python', '行业研究', '数据分析'],
  },
  {
    id: 'yyrating',
    company: 'YY评级',
    role: '信用分析实习生',
    period: '2026.04 – 2026.06',
    kind: '实习',
    summary: '参与产业债评级报告撰写，覆盖新能源、汽车、化工等行业主体。',
    points: [
      '协助分析师完成产业债评级报告，负责财务数据整理、经营分析及报告初稿撰写；使用 Wind 等终端更新行业数据库，为评级决策提供数据支持。',
      '通过阅读募集说明书、年报及审计报告，对盈利能力、杠杆水平、流动性等进行深度分析，识别主要信用风险点。',
      '跟踪境内信用债及境外中资美元债表现，撰写定期跟踪点评及事件快评。',
    ],
    tags: ['信用分析', '财务报表分析', 'Wind', '报告撰写'],
  },
  {
    id: 'citics',
    company: '中信证券',
    role: '固收组实习生',
    period: '2025.10 – 2026.01',
    kind: '实习',
    summary: '参与固收深度研究与周度机构行为分析，负责数据处理与可视化。',
    points: [
      '参与深度研究报告撰写，聚焦固收产品、银行理财等方向；使用金融终端系统检索、整理多维度数据，分析产品特性及客户偏好，为团队预测行业趋势、探究产品创新机制提供支持。',
      '参与周度机构行为分析报告的数据处理（Python / Excel）与可视化图表生成，撰写核心分析内容，为客户提供最新市场洞察。',
      '制作路演及汇报 PPT，整理总结路演活动内容与市场反馈。',
    ],
    tags: ['固定收益', 'Python', '数据可视化', 'PPT'],
  },
  {
    id: 'cms',
    company: '招商证券',
    role: '投行部实习生',
    period: '2025.05 – 2025.06',
    kind: '实习',
    summary: '参与 IPO 项目尽调与底稿整理，深入了解投行业务流程。',
    points: [
      '参与 IPO 项目，协助审核企业信用报告、走访问卷、银行函证、业务往来真实性及合同执行等情况；梳理并核查与客户、供应商的往来账单、流水控制表，确保尽调数据的真实性与完整性。',
      '整理并更新核心底稿，包括企业治理文件、业务合同、财务报表及基准日后新增交易底稿；撰写会议纪要、工作报告等，对投行业务内容与流程有深入了解。',
    ],
    tags: ['投行', '尽职调查', 'IPO', '底稿整理'],
  },
  {
    id: 'haikun',
    company: '深圳市海坤投资管理有限公司',
    role: '投资助理实习生',
    period: '2025.04 – 2025.07',
    kind: '实习',
    summary: '聚焦新能源、TMT 与 AI 行业研究，并担任组长助理参与团队管理。',
    points: [
      '聚焦新能源、TMT 和人工智能等行业，通过 Wind 等数据库收集行业数据，运用专业分析工具撰写行业研究报告；剖析行业趋势，基于数据挖掘与逻辑推理识别潜在投资机会与风险。',
      '担任组长助理，参与团队管理工作：组织定期会议、规划会议流程、促进信息流通与问题研讨；细致记录会议纪要，提炼关键信息与决策要点。',
    ],
    tags: ['行业研究', '投资分析', '团队协作', 'Wind'],
  },
  {
    id: 'chairs',
    company: '深圳三把椅子美业有限公司',
    role: '学生股东 / 执行总监',
    period: '2024.05 – 至今',
    kind: '创业',
    summary: '深度参与日常经营与财务管理，实现月度稳定正向盈利。',
    points: [
      '开展市场调研与竞品分析，通过优化产品服务质量及开展营销项目，有效提升项目品牌影响力与市场份额；曾在 5 天内高效完成营销项目从策划到落地的全流程孵化。',
      '深度参与日常管理，持续复盘经营数据，优化财务核算体系，实现月度稳定正向盈利，股东年化分红收益达 10%。',
      '搭建 DDM 股利估值模型，结合项目营收、成本、现金流等核心财务数据完成股权定价，核算股东分红收益，规范化完成新股东吸纳、股权配比工作。',
    ],
    tags: ['创业', '市场调研', '财务核算', '估值建模'],
  },
]

/* ---------- 兴趣角落 A：动画与剧评 ---------- */
/* 数据来自我的季度新番评价表（2026年4月 / 7月两季）。 */

export const animeTierOrder: AnimeTier[] = ['夯', '顶级', '人上人', 'npc', '拉', '未评']

export const animeTierScore: Record<AnimeTier, number> = {
  夯: 6,
  顶级: 5,
  人上人: 4,
  npc: 3,
  拉: 2,
  未评: 1,
}

export const animeEntries: AnimeEntry[] = [

{
    title: '再见拉拉',
    genre: '原创',
    season: '2026年7月',
    status: '新番',
    tier: '夯',
    shortReview: '小美人鱼现代新编集（？）最爱复古赛璐璐画风，冲画风制作也会看完的。',
    dropped: false,
    cover: 'covers/再见拉拉.png',
    id: 'a2607-01',
  },
{
    title: '穹庐下的魔女',
    genre: '史同',
    season: '2026年7月',
    status: '新番',
    tier: '夯',
    shortReview: '制作牛逼，美术顶级，完全爱上。虽然略沉重。',
    dropped: false,
    cover: 'covers/穹庐下的魔女.avif',
    id: 'a2607-02',
  },
{
    title: '正相反的你和我 第二季',
    genre: '恋爱/校园',
    season: '2026年7月',
    status: '新番',
    tier: '夯',
    shortReview: '一如既往的优秀',
    dropped: false,
    id: 'a2607-03',
  },
{
    title: '猫与龙',
    genre: '治愈',
    season: '2026年7月',
    status: '新番',
    tier: '顶级',
    shortReview: '好童话好治愈，猫可爱龙可爱人也好，童话世界。',
    dropped: false,
    id: 'a2607-04',
  },
{
    title: '尼古喵喵',
    genre: '原创',
    season: '2026年7月',
    status: '新番',
    tier: '夯',
    shortReview: '制作牛逼，电影感很牛',
    detail: '制作牛逼，电影感很牛；戒烟番',
    dropped: false,
    id: 'a2607-05',
  },
{
    title: '恶女不才 虽然我是不完美恶女 请多关照 雏宫蝶鼠替换身传',
    genre: '中华风',
    season: '2026年7月',
    status: '新番',
    tier: '顶级',
    shortReview: '制作不错，还去看了漫画，总之挺有趣的（虽然需要完全忘记后宫常识，接受纯日式中幻）',
    dropped: false,
    id: 'a2607-06',
  },
{
    title: '无职转生 第三季',
    genre: '异世界/续作',
    season: '2026年7月',
    status: '新番',
    tier: '顶级',
    shortReview: '1-2 爱看爱丽丝',
    detail: '1-2 爱看爱丽丝；梦回第一季；（对无职的态度一直是写的好好的非要掺点shit给观众吃，除了shit以外都很好但是一想起里面有就很膈应，但是因为别的做得又很好还是会硬着头皮看）',
    dropped: false,
    id: 'a2607-07',
  },
{
    title: '擅长跳舞的殿下 世界在起舞',
    genre: '原创/舞蹈',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '1-制作很好，题材不大感兴趣',
    detail: '1-制作很好，题材不大感兴趣；2-雷霆剧情（因为有钱了所以舞蹈就不纯粹了所以要逼死你是什么意思？？靠别人的死领悟奥义很有趣吗），吓晕了，神人来的。已弃',
    dropped: true,
    id: 'a2607-08',
  },
{
    title: '描绘直至生命尽头',
    genre: '绘画',
    season: '2026年7月',
    status: '新番',
    tier: '人上人',
    shortReview: '有趣，画漫画好坎坷啊，好青春啊。',
    dropped: false,
    id: 'a2607-09',
  },
{
    title: '奇招百出的维多利亚 底牌很多',
    genre: '漫改',
    season: '2026年7月',
    status: '新番',
    tier: '人上人',
    shortReview: '大姐姐养女儿 温馨 爱看',
    detail: '大姐姐养女儿 温馨 爱看；已追完漫画',
    dropped: false,
    id: 'a2607-10',
  },
{
    title: '怪兽少女焦糖味',
    genre: '恋爱/特摄',
    season: '2026年7月',
    status: '新番',
    tier: '顶级',
    shortReview: '哥斯拉真的是很猎奇 除此以外都很好了 男帅女萌',
    dropped: false,
    cover: 'covers/少女怪兽焦糖味.avif',
    id: 'a2607-11',
  },
{
    title: '与奔驰于透明之夜的你 谈一场看不见的恋爱',
    genre: '恋爱',
    season: '2026年7月',
    status: '新番',
    tier: '人上人',
    shortReview: '视障女主&内耗男主，天使女主;8-woc怎么开刀了，有点演出有点雷霆（虽然整体还好）',
    detail: '视障女主&内耗男主，天使女主;8-woc怎么开刀了，有点演出有点雷霆（虽然整体还好）；9-好伤',
    dropped: false,
    id: 'a2607-12',
  },
{
    title: '不虐待我的继母与继姐',
    genre: '搞笑',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '怀疑是灰姑娘饥寒交迫临死前的幻觉（bushi）反差很多出人意料所以很好笑',
    detail: '怀疑是灰姑娘饥寒交迫临死前的幻觉（bushi）反差很多出人意料所以很好笑；好神金 爱看',
    dropped: false,
    id: 'a2607-13',
  },
{
    title: '天是红河岸',
    genre: '异世界',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '最惨异世界女主 穿越得莫名其妙纯惨',
    detail: '最惨异世界女主 穿越得莫名其妙纯惨；漫画画风特别好 动画普通。（其实古早异世界穿越作品都刻画得很细腻，比如十二国记也类似，不过十二国记夯爆了，比不了）',
    dropped: false,
    id: 'a2607-14',
  },
{
    title: '被遗弃无用圣女的异世界美食之旅 凭借隐藏技能召唤露营车',
    genre: '异世界/美食',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '温馨可爱的异世界美食番',
    detail: '温馨可爱的异世界美食番；制作略拉',
    dropped: false,
    id: 'a2607-15',
  },
{
    title: '你们先走我断后于是我10年后成为了传说',
    genre: '异世界爽番',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '1-意外地还不错，没有压力怪队友的正常世界，阳光开朗版我独自升级',
    dropped: false,
    id: 'a2607-16',
  },
{
    title: '女主角 圣女 不 我是杂役女仆',
    genre: '异世界 女性向',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '',
    dropped: false,
    id: 'a2607-17',
  },
{
    title: '20世纪电气目录',
    genre: '小说改',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '1-京都但是作画感觉也一般，看起来试图做神演出实则观感是神人，最讨厌不靠谱的神人主角。。目前对主角都没啥好感，比尖帽子的剧情推动还要怪',
    dropped: false,
    id: 'a2607-18',
  },
{
    title: '我没有爱上你的打算 说了不打算爱我的公爵继承人',
    genre: '异世界 女性向',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '纯纯短剧 穷制作 唯一正常是没有神人 男女主的反应符合政治婚姻',
    detail: "纯纯短剧 穷制作 唯一正常是没有神人 男女主的反应符合政治婚姻；\n看完5-剧情始终经典，然而音乐、氛围处理得意外得很细腻，人物也是惹人怜爱。",
    dropped: false,
    id: 'a2607-19',
  },
{
    title: '才女的侍从 在贵族学校暗中照顾学院第一大小姐',
    genre: '',
    season: '2026年7月',
    status: '新番',
    tier: '拉',
    shortReview: '干物妹+旋风管家 典中典 样板戏使人仿佛回到了十年前',
    dropped: false,
    id: 'a2607-20',
  },
{
    title: '鬼之花嫁',
    genre: '女性向',
    season: '2026年7月',
    status: '新番',
    tier: '拉',
    shortReview: '低脂小短剧感 跟我的幸福婚事一个开场 但是制作很普通 其实现在已经不流行灰姑娘叙事了',
    dropped: false,
    id: 'a2607-21',
  },
{
    title: '暴走暴怒千金立发誓复仇 用凭借魔导书之力打垮碾碎祖国',
    genre: '女性向',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '剧情观感-真是没有人类了  转折太突然 可惜了其实人设画的挺好看的 女主很强 但是因为被舆论操作的一点原因就能完全恨上所有人 有点突兀和ooc 要是描写能细腻一点就好了',
    dropped: false,
    id: 'a2607-22',
  },
{
    title: '被遭到放逐流放的转生重骑士用凭借游戏知识大开无双',
    genre: '异世界',
    season: '2026年7月',
    status: '新番',
    tier: 'npc',
    shortReview: '看了半集没看下去 印象是纷飞的发丝和诡异的运镜',
    dropped: false,
    id: 'a2607-23',
  },
{
    title: '冰之城墙',
    genre: '校园恋爱',
    season: '2026年4月',
    status: '新番',
    tier: '夯',
    shortReview: '赞',
    detail: '赞；关系性好吃；已补完漫画（绝赞美味）（不能做到后面精彩部分略遗憾，求续作）',
    dropped: false,
    cover: 'covers/冰之城墙.avif',
    id: 'a2604-01',
  },
{
    title: '加油吧中村君',
    genre: '校园bl',
    season: '2026年4月',
    status: '新番',
    tier: '夯',
    shortReview: '最爱校园 画风好 厨力高',
    dropped: false,
    cover: 'covers/加油吧中村君.avif',
    id: 'a2604-02',
  },
{
    title: '爱书的下克上 第四季',
    genre: '续作/异世界',
    season: '2026年4月',
    status: '新番',
    tier: '顶级',
    shortReview: '有钱了 但是还是喜欢以前的画风怎么办 近期最爱ip',
    dropped: false,
    id: 'a2604-03',
  },
{
    title: '尖帽子的魔法工坊',
    genre: '奇幻',
    season: '2026年4月',
    status: '新番',
    tier: '顶级',
    shortReview: '制作牛逼 剧情一般（不喜欢纯靠无脑矛盾推剧情的）配乐太拉了',
    dropped: false,
    id: 'a2604-04',
  },
{
    title: '自称恶役大小姐的婚约者观察记录',
    genre: '恶役/女性向',
    season: '2026年4月',
    status: '新番',
    tier: '人上人',
    shortReview: '不带脑子看的很爽 制作也还可以 男主画得很精致 美味 吃完了漫画',
    dropped: false,
    id: 'a2604-05',
  },
{
    title: 'MAO',
    genre: '异世界/穿越',
    season: '2026年4月',
    status: '新番',
    tier: '顶级',
    shortReview: '高桥新作 经典的就是美味 女主战神 男主冷脸萌小猫 二人打直球 好吃好嗑',
    dropped: false,
    id: 'a2604-06',
  },
{
    title: '上伊那牡丹酒醉身姿似百合花般',
    genre: '百合',
    season: '2026年4月',
    status: '新番',
    tier: '顶级',
    shortReview: '（名字好难记）制作很好 前面风格不一样还挺有趣 女女关系性不错 （但是三次元还是讨厌喝酒',
    dropped: false,
    id: 'a2604-07',
  },
{
    title: '杖与剑的魔剑谭 第二季',
    genre: '异世界精美厕纸-->到这个程度已经不是厕纸了，佳作👍',
    season: '2026年4月',
    status: '新番',
    tier: '人上人',
    tierNote: '（但是关系性太美味了这一层给到夯）',
    shortReview: '还是第一季美味（男男关系性…Ψ(￣∀￣)Ψ）。前几集打太多了  不过还可以 所以男主是魅魔对吗',
    detail: "还是第一季美味（男男关系性…Ψ(￣∀￣)Ψ）。前几集打太多了  不过还可以 所以男主是魅魔对吗\n（看完第七集后）对的对的 精髓果然在男男关系性 虽然世界观设定很莫名其妙（塔里的上层很弱智）但是看到美味关系性还是爽了",
    dropped: false,
    id: 'a2604-08',
  },
{
    title: 'Re0 第四季',
    genre: '异世界经典续作',
    season: '2026年4月',
    status: '新番',
    tier: '顶级',
    shortReview: '轻松吃到尤昴',
    detail: '轻松吃到尤昴 ；太久远了完全忘记以前剧情；为什么这么爱虐486',
    dropped: false,
    id: 'a2604-09',
  },
{
    title: '石纪元 第四季',
    genre: '科幻/科普/续作',
    season: '2026年4月',
    status: '新番',
    tier: '顶级',
    shortReview: '上季度刚补完全部就等到了续作 追番体验很好',
    dropped: false,
    id: 'a2604-10',
  },
{
    title: '转生成勇者肋骨',
    genre: '异世界/搞笑',
    season: '2026年4月',
    status: '新番',
    tier: '人上人',
    shortReview: '很无厘头 不过还挺搞笑的 不同的作画风格/演出也很好玩啊hh',
    dropped: false,
    id: 'a2604-11',
  },
{
    title: '婚姻剧毒',
    genre: '原创/异能战斗',
    season: '2026年4月',
    status: '新番',
    tier: '人上人',
    shortReview: '制作不错 （不过没有很喜欢异能战斗但是看看还行）',
    dropped: false,
    id: 'a2604-12',
  },
{
    title: '日本三国',
    genre: '。。',
    season: '2026年4月',
    status: '新番',
    tier: '人上人',
    shortReview: '制作演出很牛逼但是剧情很难绷 天意侵蚀了',
    dropped: false,
    id: 'a2604-13',
  },
{
    title: '悲剧始作俑者最强boss 第二季',
    genre: '恶役/女性向',
    season: '2026年4月',
    status: '新番',
    tier: '人上人',
    shortReview: '典典的大女主 有趣的是女主有时候会原人格顶号 强欲自毁倾向美味Ψ(￣∀￣)Ψ （有的地方略尬不过还行。）（剧情慢慢的） 最喜欢蓝毛！',
    dropped: false,
    id: 'a2604-14',
  },
{
    title: '落语朱音',
    genre: '励志少年漫',
    season: '2026年4月',
    status: '新番',
    tier: '人上人',
    tierNote: '（第十集直接夯）',
    shortReview: '少见的女主的燃向少年漫 也是get到落语了 文化推广很好 声优牛逼',
    detail: "少见的女主的燃向少年漫 也是get到落语了 文化推广很好 声优牛逼\n（看完第十集）这集太牛逼了！女主演出好好 完全get 好期待后续",
    dropped: false,
    id: 'a2604-15',
  },
{
    title: '春夏秋冬代行者',
    genre: '小说改',
    season: '2026年4月',
    status: '新番',
    tier: 'npc',
    tierNote: '拉剧情+顶级制作=npc',
    shortReview: '美丽画风配诡异设定剧情 看不下去 感觉像小学初中的时候会写的中二玛丽苏世界设定',
    dropped: true,
    id: 'a2604-16',
  },
{
    title: '全职猎人',
    genre: '神作&经典无需多言；很喜欢旧版的前期画风，酷拉皮卡美绝了；奇杰99',
    season: '补番',
    status: '补番',
    tier: '未评',
    shortReview: '夯',
    dropped: false,
    id: 'aextra-01',
  }

]

/* ---------- 兴趣角落 B：音乐推荐 ---------- */

export const musicEntries: MusicEntry[] = [

{
    title: 'プラネタリウム（星象仪）',
    artist: '大塚愛',
    tags: ['J-pop'],
    reason: '',
    comment: '很有夏日感觉的忧伤又美丽的歌',
    favoritePart: undefined,
    link: '',
    monthlyPick: true,
    id: 'm-01',
  },
{
    title: '朝の時間',
    artist: '目黑莲',
    tags: ['J-pop'],
    reason: '',
    comment: '能够使人感到激励的歌词和声音，由meme来唱格外有说服力呢',
    favoritePart: "うまくいかない日も ひっくるめて自分でしょう\n那些不尽人意的日子 亦是真实的自我\n愛してたいよな\n也要温柔相待\n涙流れそうで立ち止まりそうでも 嫌いにならなくていいよ\n即使泪水盈眶 步履维艰 也不必厌恶自己\n解答(こたえ)はない 一つじゃない 胸のど真ん中にあるんだって信じたい\n答案并非唯一 也无需定义 我愿相信其就在心海中央",
    link: '',
    monthlyPick: true,
    id: 'm-02',
  },
{
    title: 'YOKOHAMA blues',
    artist: 'SEKAI NO OWARI',
    tags: ['J-pop'],
    reason: '',
    comment: '特别有横滨氛围的歌曲，希望下次可以在横滨散步，耳机里是这首歌',
    favoritePart: undefined,
    link: '',
    monthlyPick: false,
    id: 'm-03',
  },
{
    title: '徒然 - Tsurezure',
    artist: '山本大斗',
    tags: ['J-pop'],
    reason: '',
    comment: '仿佛是一直在旅途中的氛围',
    favoritePart: undefined,
    link: '',
    monthlyPick: false,
    id: 'm-04',
  },
{
    title: 'My Castle feat. 青木カレン',
    artist: '菅野祐悟',
    tags: ['OST'],
    reason: '',
    comment: '来自《爱的学校》，美丽的旋律',
    favoritePart: undefined,
    link: '',
    monthlyPick: false,
    id: 'm-05',
  },
{
    title: '世界で一番じゃない貴方を愛したら',
    artist: '羽生まゐご',
    tags: ['J-pop'],
    reason: '',
    comment: '喜欢的旋律~',
    favoritePart: "世界で一番じゃない誰かの隣でも\n如若我的身边并非世界第一的人\n 何処かに居た此処に居ない影を今も見てた\n现仍会注视 身在别处 不在此处的身影\n 世界で一番じゃない貴方を愛したら\n如若爱上了并非世界第一的你\n 忘れていく 重ねていく\n渐渐遗忘 如此堆叠\n あの日見た貴方を\n忘掉那时见到的你\n春が来る朝まで\n直至春天到来的拂晓为止",
    link: '',
    monthlyPick: false,
    id: 'm-06',
  },
{
    title: '僕のワルツ',
    artist: 'King&Prince',
    tags: ['J-pop'],
    reason: '',
    comment: '充满画面感的歌词和温柔的歌声',
    favoritePart: "明日は晴れたら あの街に出かけよう\n明天如果天晴 就去那个小镇吧\n雨なら君の好きな映画を観てもいいね\n如果下雨，看你喜欢的电影也不错呢\n些細な言葉で 疲れた一日も\n一句微不足道的话 能让疲惫的一天\n小さな幸せで どんな未来も見てみたくなる\n因为一点小幸福 对未来充满好奇",
    link: '',
    monthlyPick: false,
    id: 'm-07',
  }

]

/* ---------- 兴趣角落 C：游戏手记 ---------- */

export const gameEntries: GameEntry[] = [

{
    title: '女神异闻录5皇家版',
    platform: '',
    status: '正在玩',
    hours: '',
    recommend: 4.5,
    comment: '好玩，东京的高中生活真好。宫殿流程略长，缓慢推进中',
    highlight: '',
    id: 'g-01',
  },
{
    title: '巴别塔圣歌',
    platform: '',
    status: '已通关',
    hours: '',
    recommend: 4.5,
    comment: '很好的语言类解密，流程不算长，立意也很好',
    highlight: '',
    id: 'g-02',
  },
{
    title: '星露谷物语',
    platform: '',
    status: '正在玩',
    hours: '',
    recommend: 5,
    comment: '可以玩一辈子；为什么人生不能像星露谷一样',
    highlight: '',
    id: 'g-03',
  },
{
    title: '月华辉映之刻',
    platform: '',
    status: '已通关',
    hours: '',
    recommend: 4,
    comment: '美术好看；男主们都很喜欢（求青青线更新）',
    highlight: '',
    id: 'g-04',
  },
{
    title: '霍格沃茨之遗',
    platform: '',
    status: '已通关',
    hours: '',
    recommend: 3.5,
    comment: '作为哈迷很满足；可玩性略差，感觉删了很多部分，支线也较重复。',
    highlight: '',
    id: 'g-05',
  },
{
    title: '守墓人',
    platform: '',
    status: '正在玩',
    hours: '',
    recommend: 4,
    comment: '暗黑版星露谷',
    highlight: '',
    id: 'g-06',
  }

]

/* ---------- 兴趣角落 D：手作、吉他与唱歌 ---------- */

export const creativeEntries: CreativeEntry[] = [

{
    title: '爱书的下克上',
    date: '',
    kind: '手作',
    description: '',
    image: 'crafts/爱书的下克上拼豆.jpg',
    link: 'https://www.bilibili.com/video/BV1ht8h6JE3B/?spm_id_from=333.1387.homepage.video_card.click&vd_source=2a0effb732ca99608917c5fd7fcca538',
    linkLabel: '制作过程视频',
    id: 'c-01',
  }

]

/* ---------- 联系方式 ---------- */
/* url 留空（''）的条目会显示为「待补充」，不会渲染成链接。
   注意：出于隐私考虑，不建议在公开网站上放手机号与住址。 */

export const contactLinks: ContactLink[] = [
  {
    label: '邮箱',
    value: 'shuwenyu@link.cuhk.edu.cn',
    url: 'mailto:shuwenyu@link.cuhk.edu.cn',
    note: '最推荐的联系方式',
  },
  { label: 'GitHub', value: '待补充', url: '' },
  { label: 'LinkedIn', value: '待补充', url: '' },
  { label: 'Bilibili', value: '待补充', url: '', note: '翻唱 / 手作视频' },
  { label: '小红书', value: '待补充', url: '', note: '手作日常' },
]

export const contactMessage =
  '无论是实习与工作机会、行业研究的交流，还是动画、音乐、手作上的同好，都非常欢迎来聊。邮件一般会在一两天内回复。'
