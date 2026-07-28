const config = {
	metaData: {
		title: '杂鱼の博客',
		description: 'Welcome to my homepage!',
		keywords: 'personal,homepage,website',
		icon: '/img/avatar.png'
	},

	avatar: "/img/avatar.png",
	welcometitle: "Hi, I'm xiaoshengyvlin",

	color: {
		themecolor: "#FFFFFF",
		welcometitlecolor: "#FFFFFF",
		turntablecolor1: "#64B5F6",
		turntablecolor2: "#CE93D8"
	},

	brightness: 66,
	blur: 10,

	tags: ['杂鱼', 'AI爱好者', '梦想写小说', '努力ing'],

	background: {
		pc: {
			type: "pic",
			datainfo: {
				title: "随机壁纸",
				preview: "https://www.dmoe.cc/random.php",
				url: "https://www.dmoe.cc/random.php"
			},
		},
		mobile: {
			type: "pic",
			datainfo: {
				title: "随机壁纸",
				preview: "https://www.dmoe.cc/random.php",
				url: "https://www.dmoe.cc/random.php"
			}
		}
	},

	polarChart: {
		skills: ['ChatGPT', 'Claude', 'DeepSeek', '豆包', 'Gemini', 'Grok', 'GLM', 'Mimo', 'Kimi', 'MiniMax'],
		skillPoints: [80, 90, 90, 100, 60, 70, 60, 60, 60, 60],
		note: '注：分数仅代表对AI的掌控程度，并不是对AI的评分'
	},

	socialPlatformIcons: [
		{ icon: "mdi-github", link: "https://github.com/xiaoshengyvlin" },
	],

	typeWriterStrings: [
		"人生若只如初见，何事秋风悲画扇。",
		"最是人间留不住，朱颜辞镜花辞树。"
	],

	music: {
		songs: [
			{ src: '/audio/konglin.wav', title: '空灵', author: '' },
			{ src: '/audio/Flowers.wav', title: 'Flowers', author: '' },
		]
	},

	wallpaper: {
		pic: [
			{ title: "随机壁纸", preview: "https://www.dmoe.cc/random.php", url: "https://www.dmoe.cc/random.php" },
		],
		picMobile: [
			{ title: "随机壁纸", preview: "https://www.dmoe.cc/random.php", url: "https://www.dmoe.cc/random.php" },
		],
		video: [],
		videoMobile: [],
	},

	projectcards: [
		{ go:"前往", img:"/img/projects/1.png", title:"Web-meme-qq", subtitle:"网页版QQ表情包制作", text:"在线制作QQ表情包的网页工具。", url:"https://github.com/xiaoshengyvlin/Web-meme-qq", show:false },
		{ go:"前往", img:"/img/projects/2.png", title:"Privacy-yandere", subtitle:"病娇问答式隐私暴露网站", text:"以病娇角色对话形式，展示隐私风险的交互式网页。", url:"https://github.com/xiaoshengyvlin/Privacy-yandere", show:false },
		{ go:"前往", img:"/img/projects/3.png", title:"Zako-Pomodoro-timer", subtitle:"自制番茄钟，带便签功能", text:"C# 开发的自定义番茄钟桌面工具，支持便签和自定义音乐。", url:"https://github.com/xiaoshengyvlin/Zako-Pomodoro-timer", show:false },
		{ go:"前往", img:"/img/projects/4.png", title:"ComfyUI-MetaData-ZaKo", subtitle:"图片元信息置换", text:"Python 工具，用于批量修改和置换图片的元数据信息。", url:"https://github.com/xiaoshengyvlin/ComfyUI-MetaData-ZaKo", show:false },
		{ go:"前往", img:"/img/projects/5.png", title:"Zako-Basement", subtitle:"文件备份仓库", text:"个人文件备份与归档仓库。", url:"https://github.com/xiaoshengyvlin/Zako-Basement", show:false },
		{ go:"前往", img:"/img/projects/6.png", title:"Zako-Mosaic-Tool", subtitle:"便捷的图片打码工具", text:"Python 图片马赛克处理工具，快速给敏感区域打码。", url:"https://github.com/xiaoshengyvlin/Zako-Mosaic-Tool", show:false },
		{ go:"前往", img:"/img/projects/7.png", title:"ZaKo-Random-Roll", subtitle:"随机抽卡机", text:"基于 Danbooru 标签库的 AI 绘画 Tag 随机抽取工具。", url:"https://github.com/xiaoshengyvlin/ZaKo-Random-Roll", show:false },
		{ go:"前往", img:"/img/projects/8.png", title:"ComfyUI-ClipAPI-ZaKo", subtitle:"大语言模型提示词", text:"通过调用硅基流动 API，用大语言模型对随机提示词进行人物固定。", url:"https://github.com/xiaoshengyvlin/ComfyUI-ClipAPI-ZaKo", show:false },
		{ go:"前往", img:"/img/projects/9.png", title:"VPS-First", subtitle:"VPS一键初始化脚本", text:"Shell 脚本，快速完成 VPS 基础环境配置。", url:"https://github.com/xiaoshengyvlin/VPS-First", show:false },
		{ go:"前往", img:"/img/projects/10.png", title:"ZCMU-Auto-Tool", subtitle:"ZCMU图书馆座位助手", text:"自动化图书馆座位预约，期末周除了学习干什么都好玩。", url:"https://github.com/xiaoshengyvlin/ZCMU-Auto-Tool", show:false },
		{ go:"前往", img:"/img/projects/11.png", title:"Zako-Prompt-Tools", subtitle:"随机提示词工具箱", text:"随机提示词内嵌节点 + Danbooru 灵感预览 + Anima 自然语言优化 + AI 翻译。", url:"https://github.com/xiaoshengyvlin/Zako-Prompt-Tools", show:false },
		{ go:"前往", img:"/img/projects/12.png", title:"ZCMU-Score-Checker", subtitle:"ZCMU查分工具", text:"自动检查 ZCMU 成绩更新，不用每天手动刷新十几遍。", url:"https://github.com/xiaoshengyvlin/ZCMU-Score-Checker", show:false },
		{ go:"前往", img:"/img/projects/13.png", title:"Kaoyan-English-News", subtitle:"烤盐新闻单词复习", text:"2027 每日考研英语新闻单词复习工具。", url:"https://github.com/xiaoshengyvlin/Kaoyan-English-News", show:false },
		{ go:"前往", img:"/img/projects/14.png", title:"DNS-Rules", subtitle:"DNS覆写备份", text:"个人 DNS 覆写规则备份与同步。", url:"https://github.com/xiaoshengyvlin/DNS-Rules", show:false },
	],

	statement: ['忙于生活，不定时更新------最新更新日期2026.7.28', '2026.4.16-2026.7.28'],
}

export default config
