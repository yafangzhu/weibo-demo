// Mock data for Weibo Lite
const postsData = [
    {
        id: 1,
        nickname: "科技前沿观察",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        time: "10分钟前 来自 iPhone 15 Pro",
        content: "今天发布的新一代 AI 模型简直太惊艳了！处理速度提升了300%，生成的代码质量也非常高。这就是未来吗？🤖 #AI #科技新闻",
        images: [
            "https://picsum.photos/seed/ai1/300/300",
            "https://picsum.photos/seed/ai2/300/300",
            "https://picsum.photos/seed/ai3/300/300"
        ],
        likes: 888,
        comments: 45,
        shares: 120,
        isVerified: true
    },
    {
        id: 2,
        nickname: "莉莉an",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
        time: "刚刚",
        content: "校园网公示：2025年研究生国家奖学金拟获奖名单已发布 https://xsc.cuc.edu.cn/2025/1024/c2874a261445/page.htm",
        images: [],
        likes: "9999+",
        comments: "9999+",
        shares: "9999+",
        isVerified: true
    },
    {
        id: 3,
        nickname: "每日美食日记",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
        time: "30分钟前",
        content: "周末在家做了顿大餐，红烧肉真的太好吃了！肥而不腻，入口即化。大家周末都吃什么了呀？😋",
        images: [],
        likes: 666,
        comments: 8,
        shares: 12,
        isVerified: false
    }
];

const mcpHotData = [
    { title: "MCP：全网热搜聚合启动", tag: "热" },
    { title: "本地部署大模型省钱指南" },
    { title: "城市打工人午休地图", tag: "新", tagColor: "#ff9400" },
    { title: "AI 生成短视频模板分享" },
    { title: "轻量前端项目一周速成" },
    { title: "毕业设计答辩话术合集" }
];

const skillPostTemplates = [
    "【一键生成】今天用 Weibo Lite 做了个前端演示：登录、发帖、点赞、评论全走通。",
    "【技能卡】把需求拆成“能跑/能演示/能截图/能讲故事”，交付感直接拉满。",
    "【MCP 想象力】热搜、内容审核、情绪分析都可以作为可插拔能力。"
];
