// DeepSeek API 配置
const API_BASE_URL = 'https://api.deepseek.com/v1';
const API_KEY = 'sk-c1417a5dcd404ab4904982e9b3a44f87';

// 应用状态
let appState = {
    userInfo: {},
    version: '',
    coreQuestion: '',
    category: '',
    currentQuestionIndex: 0,
    answers: [],
    customQuestions: null
};

// 弹幕文本
const danmakuTexts = [
    '找到内心的平静 🌸',
    '每一步都是成长 ✨',
    '相信自己的力量 💪',
    '明天会更好 🌅',
    '保持积极的心态 😊',
    '勇敢面对挑战 🎯',
    '你并不孤单 🤝',
    '倾听内心的声音 💭',
    '享受当下的时光 ⏰',
    '给自己一个拥抱 🫂'
];

// 问题库
const questions = {
    research: {
        detailed: [
            {
                question: '你目前的学习/研究状态如何？',
                options: ['进展顺利，有条不紊', '偶尔遇到困难，但能克服', '经常感到迷茫和困惑', '输入更多想法...']
            },
            {
                question: '你每天用于学习/研究的时间大约是？',
                options: ['少于4小时', '4-6小时', '6-8小时以上', '输入更多想法...']
            },
            {
                question: '你认为自己的学习效率如何？',
                options: ['非常高效', '一般水平', '效率较低', '输入更多想法...']
            },
            {
                question: '面对学术压力，你通常会？',
                options: ['主动寻求帮助', '独自解决', '感到焦虑但不知所措', '输入更多想法...']
            },
            {
                question: '你和导师/老师的沟通频率如何？',
                options: ['经常沟通', '偶尔交流', '很少沟通', '输入更多想法...']
            },
            {
                question: '你是否有明确的学术目标？',
                options: ['非常明确', '基本明确', '比较模糊', '输入更多想法...']
            },
            {
                question: '你觉得自己的专业选择是？',
                options: ['完全符合兴趣', '还算满意', '不太满意', '输入更多想法...']
            },
            {
                question: '遇到研究难题时，你的第一反应是？',
                options: ['查阅文献资料', '请教他人', '暂时放弃', '输入更多想法...']
            },
            {
                question: '你对未来的职业规划是？',
                options: ['非常清晰', '有大致方向', '完全不确定', '输入更多想法...']
            },
            {
                question: '你认为目前最大的困扰是什么？',
                options: ['时间管理', '知识储备不足', '缺乏动力', '输入更多想法...']
            }
        ],
        quick: [
            {
                question: '你目前的学习状态如何？',
                options: ['非常好', '一般', '不太好', '其他']
            },
            {
                question: '你认为最大的学习障碍是什么？',
                options: ['时间不够', '缺乏动力', '方法不对', '其他']
            },
            {
                question: '你希望在哪方面得到帮助？',
                options: ['时间管理', '学习方法', '心态调整', '其他']
            }
        ]
    },
    emotion: {
        detailed: [
            {
                question: '你如何描述你当前的人际关系？',
                options: ['和谐融洽', '基本稳定', '偶有矛盾', '输入更多想法...']
            },
            {
                question: '你是否经常感到孤独？',
                options: ['很少', '偶尔', '经常', '输入更多想法...']
            },
            {
                question: '在社交场合，你通常？',
                options: ['主动交流', '被动参与', '感到不自在', '输入更多想法...']
            },
            {
                question: '你对目前的情感状态满意吗？',
                options: ['非常满意', '还可以', '不太满意', '输入更多想法...']
            },
            {
                question: '遇到情感问题时，你会？',
                options: ['与朋友倾诉', '独自消化', '寻求专业帮助', '输入更多想法...']
            },
            {
                question: '你觉得自己的情绪管理能力如何？',
                options: ['很好', '一般', '需要提升', '输入更多想法...']
            },
            {
                question: '你是否有亲密的朋友或伴侣？',
                options: ['有，关系很好', '有，但不够亲密', '没有', '输入更多想法...']
            },
            {
                question: '你对建立新关系的态度是？',
                options: ['积极主动', '顺其自然', '比较抗拒', '输入更多想法...']
            },
            {
                question: '你认为自己擅长表达情感吗？',
                options: ['很擅长', '一般', '不太擅长', '输入更多想法...']
            },
            {
                question: '目前最困扰你的情感问题是？',
                options: ['缺乏理解', '难以信任他人', '害怕被拒绝', '输入更多想法...']
            }
        ],
        quick: [
            {
                question: '你的人际关系状态如何？',
                options: ['很好', '一般', '不太好', '其他']
            },
            {
                question: '你是否经常感到孤独？',
                options: ['很少', '偶尔', '经常', '其他']
            },
            {
                question: '你希望在情感方面得到什么帮助？',
                options: ['交友技巧', '情绪管理', '自我认知', '其他']
            }
        ]
    },
    hobby: {
        detailed: [
            {
                question: '你有明确的兴趣爱好吗？',
                options: ['有很多', '有一些', '没有明确的', '输入更多想法...']
            },
            {
                question: '你每周用于兴趣爱好的时间是？',
                options: ['5小时以上', '2-5小时', '少于2小时', '输入更多想法...']
            },
            {
                question: '你觉得自己的生活是否平衡？',
                options: ['非常平衡', '基本平衡', '失衡严重', '输入更多想法...']
            },
            {
                question: '你对探索新事物的态度是？',
                options: ['非常积极', '看情况', '比较保守', '输入更多想法...']
            },
            {
                question: '你的兴趣爱好是？',
                options: ['运动健身类', '艺术创作类', '学习成长类', '输入更多想法...']
            },
            {
                question: '你是否有长期坚持的爱好？',
                options: ['有，坚持多年', '有，但断断续续', '没有', '输入更多想法...']
            },
            {
                question: '阻碍你发展爱好的主要因素是？',
                options: ['时间不够', '缺乏资源', '没有动力', '输入更多想法...']
            },
            {
                question: '你希望培养什么类型的新爱好？',
                options: ['社交型', '个人成长型', '放松娱乐型', '输入更多想法...']
            },
            {
                question: '你的生活规划是否包括兴趣发展？',
                options: ['重点考虑', '有所考虑', '未曾考虑', '输入更多想法...']
            },
            {
                question: '你希望通过兴趣爱好获得什么？',
                options: ['放松心情', '提升技能', '社交机会', '输入更多想法...']
            }
        ],
        quick: [
            {
                question: '你是否有明确的兴趣爱好？',
                options: ['有很多', '有一些', '没有', '其他']
            },
            {
                question: '阻碍你发展爱好的主要原因是？',
                options: ['时间不够', '不知道选什么', '缺乏动力', '其他']
            },
            {
                question: '你希望在兴趣爱好方面得到什么建议？',
                options: ['如何选择', '如何坚持', '时间安排', '其他']
            }
        ]
    },
    health: {
        detailed: [
            {
                question: '你的睡眠质量如何？',
                options: ['很好', '一般', '较差', '输入更多想法...']
            },
            {
                question: '你每周的运动频率是？',
                options: ['3次以上', '1-2次', '几乎不运动', '输入更多想法...']
            },
            {
                question: '你的饮食习惯如何？',
                options: ['规律健康', '基本正常', '不太规律', '输入更多想法...']
            },
            {
                question: '你是否经常感到疲劳？',
                options: ['很少', '偶尔', '经常', '输入更多想法...']
            },
            {
                question: '你对自己的身体状况满意吗？',
                options: ['很满意', '还可以', '不满意', '输入更多想法...']
            },
            {
                question: '你是否有定期体检的习惯？',
                options: ['有，每年都检', '偶尔检查', '从不体检', '输入更多想法...']
            },
            {
                question: '你的压力水平如何？',
                options: ['压力小', '压力适中', '压力很大', '输入更多想法...']
            },
            {
                question: '你有什么缓解压力的方法？',
                options: ['运动', '冥想/放松', '社交', '输入更多想法...']
            },
            {
                question: '你对心理健康的关注程度是？',
                options: ['非常关注', '有所关注', '不太关注', '输入更多想法...']
            },
            {
                question: '你希望在健康方面重点改善什么？',
                options: ['睡眠质量', '运动习惯', '饮食结构', '输入更多想法...']
            }
        ],
        quick: [
            {
                question: '你的整体健康状态如何？',
                options: ['很好', '一般', '不太好', '其他']
            },
            {
                question: '你认为最需要改善的健康问题是？',
                options: ['睡眠', '运动', '饮食', '其他']
            },
            {
                question: '你希望得到哪方面的健康建议？',
                options: ['作息调整', '运动计划', '压力管理', '其他']
            }
        ]
    }
};

// DOM 元素
const views = {
    login: document.getElementById('loginView'),
    version: document.getElementById('versionView'),
    coreQuestion: document.getElementById('coreQuestionView'),
    category: document.getElementById('categoryView'),
    question: document.getElementById('questionView'),
    result: document.getElementById('resultView')
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadUserData();
    startDanmaku(); // 启动弹幕
});

// 弹幕功能
function startDanmaku() {
    const container = document.getElementById('danmakuContainer');
    
    function createDanmaku() {
        const danmaku = document.createElement('div');
        danmaku.className = 'danmaku-item';
        danmaku.textContent = danmakuTexts[Math.floor(Math.random() * danmakuTexts.length)];
        danmaku.style.top = Math.random() * 80 + 10 + '%';
        danmaku.style.animationDuration = (Math.random() * 5 + 10) + 's';
        
        container.appendChild(danmaku);
        
        setTimeout(() => {
            danmaku.remove();
        }, 15000);
    }
    
    // 初始弹幕
    for (let i = 0; i < 5; i++) {
        setTimeout(createDanmaku, i * 2000);
    }
    
    // 持续生成弹幕
    setInterval(createDanmaku, 3000);
}

// 返回功能
function goBack(targetView) {
    // 重置当前步骤的数据（如果需要）
    if (targetView === 'login') {
        // 不重置用户信息，只是返回
    } else if (targetView === 'version') {
        appState.coreQuestion = '';
        appState.category = '';
        appState.answers = [];
        appState.customQuestions = null;
    } else if (targetView === 'coreQuestion') {
        appState.category = '';
        appState.answers = [];
        appState.customQuestions = null;
    } else if (targetView === 'category') {
        appState.answers = [];
        appState.customQuestions = null;
    }
    
    showView(targetView);
}

// 设置事件监听器
function setupEventListeners() {
    // 1. 登录表单
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // 2. 版本选择
    document.querySelectorAll('.version-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const version = e.currentTarget.dataset.version;
            handleVersionSelect(version);
        });
    });

    // 3. 核心问题提交
    document.getElementById('submitCoreQuestion').addEventListener('click', handleCoreQuestionSubmit);

    // 4. 分类选择（气泡UI）
    document.querySelectorAll('.bubble-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            handleCategorySelect(category);
        });
    });

    // 5. 自定义输入提交
    document.getElementById('submitCustomInput').addEventListener('click', handleCustomInput);

    // 6. 重新开始按钮
    document.getElementById('restartBtn').addEventListener('click', restartApp);

    // 7. 下载报告按钮
    document.getElementById('downloadBtn').addEventListener('click', downloadReport);
}

// 加载用户数据
function loadUserData() {
    const savedData = localStorage.getItem('userAppState');
    if (savedData) {
        appState = JSON.parse(savedData);
        if (appState.userInfo && appState.userInfo.age) {
            // 如果已有用户信息，跳转到版本选择页
            showView('version');
        }
    }
}

// 保存应用状态
function saveAppState() {
    localStorage.setItem('userAppState', JSON.stringify(appState));
}

// 视图切换
function showView(viewName) {
    Object.keys(views).forEach(key => {
        views[key].classList.remove('active');
    });
    views[viewName].classList.add('active');
}

// ===== 1. 处理登录 =====
function handleLogin(e) {
    e.preventDefault();
    
    appState.userInfo = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        occupation: document.getElementById('occupation').value
    };

    saveAppState();
    showView('version');
    showToast('信息已保存', 'success');
}

// ===== 2. 处理版本选择 =====
function handleVersionSelect(version) {
    appState.version = version;
    saveAppState();
    showView('coreQuestion');
}

// ===== 3. 处理核心问题提交 =====
function handleCoreQuestionSubmit() {
    const coreQuestion = document.getElementById('coreQuestion').value.trim();
    
    if (!coreQuestion) {
        showToast('请输入你的核心问题', 'warning');
        return;
    }
    
    if (coreQuestion.length < 10) {
        showToast('请详细描述你的问题（至少10个字）', 'warning');
        return;
    }
    
    appState.coreQuestion = coreQuestion;
    saveAppState();
    showView('category');
    showToast('核心问题已保存', 'success');
}

// ===== 4. 处理分类选择 =====
function handleCategorySelect(category) {
    appState.category = category;
    appState.currentQuestionIndex = 0;
    appState.answers = [];
    saveAppState();
    generateCustomQuestions();
}

// ===== 4. 生成定制化问题 =====
async function generateCustomQuestions() {
    showView('question');
    
    // 显示加载状态
    document.getElementById('questionTitle').textContent = 'AI 正在为你生成个性化问题...';
    document.getElementById('questionOptions').innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>正在分析你的核心问题，生成相关问题...</p></div>';
    
    try {
        // 调用AI生成定制化问题
        const customQuestions = await callAIForCustomQuestions();
        appState.customQuestions = customQuestions;
        saveAppState();
        
        // 开始问卷
        startQuestionnaire();
    } catch (error) {
        console.error('生成定制化问题失败:', error);
        showToast('生成问题失败，将使用默认问题', 'warning');
        // 如果AI生成失败，使用默认问题
        startQuestionnaire();
    }
}

// ===== 5. 开始问卷调查 =====
function startQuestionnaire() {
    showView('question');
    showQuestion(0);
}

// 显示问题
function showQuestion(index) {
    // 优先使用定制化问题，如果没有则使用默认问题
    const questionSet = appState.customQuestions || questions[appState.category][appState.version];
    const totalQuestions = questionSet.length;
    
    if (index >= totalQuestions) {
        // 所有问题已回答完毕
        generateResult();
        return;
    }

    const currentQuestion = questionSet[index];
    appState.currentQuestionIndex = index;

    // 更新进度条
    const progress = ((index + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${index + 1}/${totalQuestions}`;

    // 更新问题标题
    document.getElementById('questionTitle').textContent = currentQuestion.question;

    // 生成选项
    const optionsContainer = document.getElementById('questionOptions');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        
        // 最后一个选项是自定义输入
        if (appState.version === 'detailed' && optionIndex === currentQuestion.options.length - 1) {
            button.addEventListener('click', () => {
                showCustomInput();
            });
        } else {
            button.addEventListener('click', () => {
                handleAnswerSelect(option, currentQuestion.question);
            });
        }

        optionsContainer.appendChild(button);
    });

    // 隐藏自定义输入区域
    document.getElementById('customInputArea').classList.add('hidden');
    document.getElementById('customInput').value = '';
}

// 显示自定义输入框
function showCustomInput() {
    const customInputArea = document.getElementById('customInputArea');
    customInputArea.classList.remove('hidden');
    document.getElementById('customInput').focus();
}

// 处理自定义输入
function handleCustomInput() {
    const customText = document.getElementById('customInput').value.trim();
    if (!customText) {
        showToast('请输入你的想法', 'warning');
        return;
    }

    const questionSet = questions[appState.category][appState.version];
    const currentQuestion = questionSet[appState.currentQuestionIndex];
    
    handleAnswerSelect(customText, currentQuestion.question);
}

// 处理答案选择
function handleAnswerSelect(answer, question) {
    appState.answers.push({
        question: question,
        answer: answer
    });

    saveAppState();

    // 显示下一个问题
    setTimeout(() => {
        showQuestion(appState.currentQuestionIndex + 1);
    }, 300);
}

// ===== 5. 生成结果 =====
async function generateResult() {
    showView('result');
    
    // 显示加载动画
    document.getElementById('loadingSpinner').classList.remove('hidden');
    document.getElementById('resultContent').classList.add('hidden');

    // 显示用户信息
    displayUserInfo();

    // 调用 AI 生成建议
    await callAIForSuggestion();
}

// 显示用户信息摘要
function displayUserInfo() {
    const container = document.getElementById('userInfoSummary');
    container.innerHTML = `
        <div class="info-item">
            <label>年龄</label>
            <span>${appState.userInfo.age}岁</span>
        </div>
        <div class="info-item">
            <label>性别</label>
            <span>${appState.userInfo.gender}</span>
        </div>
        <div class="info-item">
            <label>地址</label>
            <span>${appState.userInfo.address}</span>
        </div>
        <div class="info-item">
            <label>职业</label>
            <span>${appState.userInfo.occupation}</span>
        </div>
    `;
    
    // 显示核心问题
    const coreQuestionContainer = document.getElementById('coreQuestionSummary');
    coreQuestionContainer.textContent = appState.coreQuestion;
}

// 去除 Markdown 格式
function removeMarkdown(text) {
    return text
        // 移除代码块
        .replace(/```[\s\S]*?```/g, '')
        // 移除行内代码
        .replace(/`([^`]+)`/g, '$1')
        // 移除标题
        .replace(/#{1,6}\s+/g, '')
        // 移除加粗
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        // 移除斜体
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        // 移除链接
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // 移除图片
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        // 移除引用
        .replace(/^>\s+/gm, '')
        // 移除水平线
        .replace(/^---+$/gm, '')
        .replace(/^___+$/gm, '')
        .replace(/^\*\*\*+$/gm, '')
        // 移除列表标记
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/^\s*\d+\.\s+/gm, '')
        // 清理多余的空行
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

// 模拟进度条更新
function updateProgress(percent, message) {
    const progressCircle = document.getElementById('progressCircle');
    const progressPercent = document.getElementById('progressPercent');
    const loadingDetail = document.getElementById('loadingDetail');
    
    const circumference = 339.292;
    const offset = circumference - (percent / 100) * circumference;
    
    progressCircle.style.strokeDashoffset = offset;
    progressPercent.textContent = `${percent}%`;
    loadingDetail.textContent = message;
}

// 调用 AI 生成定制化问题
async function callAIForCustomQuestions() {
    const categoryNames = {
        research: '学业研究',
        emotion: '情感关系',
        hobby: '兴趣爱好',
        health: '健康管理'
    };

    const versionNames = {
        detailed: '详细评估',
        quick: '快速评估'
    };

    const prompt = `你是一位专业的心理咨询师。请根据用户的核心问题和选择的咨询领域，生成${appState.version === 'detailed' ? '8-10个' : '3-5个'}相关的个性化问题。

用户信息：
- 年龄：${appState.userInfo.age}岁
- 性别：${appState.userInfo.gender}
- 职业：${appState.userInfo.occupation}
- 咨询领域：${categoryNames[appState.category]}
- 评估模式：${versionNames[appState.version]}

核心问题：${appState.coreQuestion}

请生成的问题要求：
1. 问题必须与用户的核心问题密切相关
2. 问题要深入挖掘用户的具体情况
3. 每个问题都要有4个选项，最后一个选项是"其他（请详细说明）"
4. 问题要循序渐进，从表面到深层
5. 问题要具体、可操作，避免过于抽象

请以JSON格式返回，格式如下：
[
    {
        "question": "问题内容",
        "options": ["选项1", "选项2", "选项3", "其他（请详细说明）"]
    }
]`;

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: '你是一位专业的心理咨询师，擅长根据用户的具体问题生成个性化的评估问题。请严格按照JSON格式返回问题列表。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            stream: false
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || '请求失败');
    }

    const data = await response.json();
    let questionsText = data.choices[0].message.content;
    
    // 清理返回的文本，提取JSON部分
    const jsonMatch = questionsText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
        questionsText = jsonMatch[0];
    }
    
    try {
        const customQuestions = JSON.parse(questionsText);
        return customQuestions;
    } catch (parseError) {
        console.error('解析AI返回的问题失败:', parseError);
        throw new Error('AI返回的问题格式不正确');
    }
}

// 调用 AI 生成建议
async function callAIForSuggestion() {
    try {
        // 模拟进度更新
        updateProgress(20, '正在整理信息...');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        updateProgress(40, '正在连接 AI...');
        
        // 构建提示词
        const prompt = buildPrompt();
        
        await new Promise(resolve => setTimeout(resolve, 500));
        updateProgress(60, '正在生成分析...');

        const response = await fetch(`${API_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: '你是一位专业的心理健康顾问和生活规划师。请根据用户提供的信息，给出专业、温暖、具有可操作性的建议。请用纯文本格式输出，不要使用任何Markdown格式。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000,
                stream: false
            })
        });

        updateProgress(80, '正在处理结果...');

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || '请求失败');
        }

        const data = await response.json();
        let suggestion = data.choices[0].message.content;
        
        // 去除 Markdown 格式
        suggestion = removeMarkdown(suggestion);

        updateProgress(100, '完成！');
        
        await new Promise(resolve => setTimeout(resolve, 500));

        // 显示结果
        document.getElementById('loadingSpinner').classList.add('hidden');
        document.getElementById('resultContent').classList.remove('hidden');
        document.getElementById('aiSuggestion').textContent = suggestion;

    } catch (error) {
        console.error('AI 调用失败:', error);
        document.getElementById('loadingSpinner').classList.add('hidden');
        document.getElementById('resultContent').classList.remove('hidden');
        document.getElementById('aiSuggestion').textContent = 
            '抱歉，生成建议时遇到了问题。请检查网络连接或稍后重试。\n\n错误信息：' + error.message;
        showToast(`错误: ${error.message}`, 'error');
    }
}

// 构建提示词
function buildPrompt() {
    const categoryNames = {
        research: '学业研究',
        emotion: '情感关系',
        hobby: '兴趣爱好',
        health: '健康管理'
    };

    const versionNames = {
        detailed: '详细评估',
        quick: '快速评估'
    };

    let prompt = `用户基本信息：
- 年龄：${appState.userInfo.age}岁
- 性别：${appState.userInfo.gender}
- 地址：${appState.userInfo.address}
- 职业：${appState.userInfo.occupation}

核心问题：
${appState.coreQuestion}

咨询领域：${categoryNames[appState.category]}
评估模式：${versionNames[appState.version]}

问题和回答：\n`;

    appState.answers.forEach((item, index) => {
        prompt += `${index + 1}. ${item.question}\n   回答：${item.answer}\n\n`;
    });

    prompt += `\n请根据以上所有信息，提供一份详细的分析和建议。请特别注意：

【核心要求】
1. 所有分析必须紧紧围绕用户的核心问题："${appState.coreQuestion}"
2. 每个建议都要与核心问题直接相关
3. 避免泛泛而谈，要针对用户的具体情况

【分析结构】
1. 核心问题深度分析
   - 深入分析用户核心问题的根本原因
   - 结合用户背景信息（年龄、职业、性别等）分析问题特点
   - 识别问题背后的心理、环境、社会因素

2. 基于问卷回答的现状评估
   - 根据用户的具体回答分析当前状况
   - 识别与核心问题相关的关键信息
   - 评估问题的严重程度和发展趋势

3. 问题根源分析
   - 分析导致核心问题的深层原因
   - 识别需要重点关注的方面
   - 分析可能的阻碍因素

4. 个性化解决方案（至少5条具体建议）
   - 每条建议都要直接针对核心问题
   - 建议要具体、可操作、有时间节点
   - 考虑用户的年龄、职业、生活环境
   - 提供短期和长期解决方案

5. 心理支持和鼓励
   - 针对用户的具体情况给予个性化鼓励
   - 提供心理调适建议
   - 强调用户的优势和潜力

请用温暖、专业、易懂的纯文本语言撰写，不要使用任何Markdown格式标记，让用户感受到真正的关心和支持。`;

    return prompt;
}

// 重新开始
function restartApp() {
    if (confirm('确定要重新开始吗？当前的数据将被清除。')) {
        appState = {
            userInfo: {},
            version: '',
            coreQuestion: '',
            category: '',
            currentQuestionIndex: 0,
            answers: [],
            customQuestions: null
        };
        saveAppState();
        showView('login');
        document.getElementById('loginForm').reset();
        document.getElementById('coreQuestion').value = '';
        showToast('已重置，请重新填写信息', 'success');
    }
}

// 下载报告
function downloadReport() {
    const categoryNames = {
        research: '学业研究',
        emotion: '情感关系',
        hobby: '兴趣爱好',
        health: '健康管理'
    };

    const versionNames = {
        detailed: '详细版',
        quick: '快速版'
    };

    let reportText = `AI 心理健康分析报告\n`;
    reportText += `生成时间：${new Date().toLocaleString('zh-CN')}\n\n`;
    reportText += `=================================\n\n`;
    reportText += `基本信息：\n`;
    reportText += `年龄：${appState.userInfo.age}岁\n`;
    reportText += `性别：${appState.userInfo.gender}\n`;
    reportText += `地址：${appState.userInfo.address}\n`;
    reportText += `职业：${appState.userInfo.occupation}\n\n`;
    reportText += `=================================\n\n`;
    reportText += `核心问题：\n`;
    reportText += `${appState.coreQuestion}\n\n`;
    reportText += `=================================\n\n`;
    reportText += `咨询领域：${categoryNames[appState.category]}\n`;
    reportText += `评估模式：${versionNames[appState.version]}\n\n`;
    reportText += `=================================\n\n`;
    reportText += `问题和回答：\n\n`;

    appState.answers.forEach((item, index) => {
        reportText += `${index + 1}. ${item.question}\n`;
        reportText += `   ${item.answer}\n\n`;
    });

    reportText += `=================================\n\n`;
    reportText += `AI 建议：\n\n`;
    reportText += document.getElementById('aiSuggestion').textContent;

    // 创建下载
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI心理健康分析报告_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('报告已下载', 'success');
}

// 显示提示消息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

