const config = {
	metaData: {
		title: '杂鱼の博客',
		description: 'Welcome to my homepage!',
		keywords: 'personal,homepage,website',
		icon: '/favicon.ico'
	},

	avatar: "/img/avatar.png",
	welcometitle: "Hi, I'm xiaoshengyvlin",

	color: {
		themecolor: "#FFFFFF",
		welcometitlecolor: "#FFFFFF",
		turntablecolor1: "#64B5F6",
		turntablecolor2: "#CE93D8"
	},

	brightness: 85,
	blur: 5,

	tags: ['杂鱼', 'AI爱好者', '梦想写小说', '摆烂'],

	background: {
		pc: {
			type: "pic",
			datainfo: {
				title: "随机壁纸",
				preview: "https://t.mwm.moe/pc",
				url: "https://t.mwm.moe/pc"
			},
		},
		mobile: {
			type: "pic",
			datainfo: {
				title: "随机壁纸",
				preview: "https://t.mwm.moe/mp",
				url: "https://t.mwm.moe/mp"
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
			{ title: "随机壁纸", preview: "https://t.mwm.moe/pc", url: "https://t.mwm.moe/pc" },
		],
		picMobile: [
			{ title: "随机壁纸", preview: "https://t.mwm.moe/mp", url: "https://t.mwm.moe/mp" },
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
	],

	statement: ['忙于生活，不定时更新------最新更新日期2026.5.30'],
}

export default config
