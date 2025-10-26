"""
DeepSeek API 调用示例 (使用环境变量，更安全)
"""

import os
import requests
import json

# 从环境变量读取 API Key (推荐做法)
API_KEY = os.getenv("DEEPSEEK_API_KEY")
BASE_URL = "https://api.deepseek.com/v1"


def call_deepseek(prompt, model="deepseek-chat", temperature=1.0, max_tokens=2000):
    """
    简单的 DeepSeek API 调用函数
    
    Args:
        prompt: 用户输入的提示词
        model: 模型名称
        temperature: 温度参数
        max_tokens: 最大 token 数
    
    Returns:
        AI 的回复文本，如果失败返回 None
    """
    if not API_KEY:
        print("错误: 请设置 DEEPSEEK_API_KEY 环境变量")
        return None
    
    url = f"{BASE_URL}/chat/completions"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    data = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        result = response.json()
        return result['choices'][0]['message']['content']
    except requests.exceptions.RequestException as e:
        print(f"API 调用失败: {e}")
        if hasattr(e.response, 'text'):
            print(f"错误详情: {e.response.text}")
        return None


if __name__ == "__main__":
    # 检查 API Key
    if not API_KEY:
        print("⚠️  请先设置环境变量 DEEPSEEK_API_KEY")
        print("\nWindows PowerShell:")
        print('  $env:DEEPSEEK_API_KEY="your_api_key_here"')
        print("\nWindows CMD:")
        print('  set DEEPSEEK_API_KEY=your_api_key_here')
        print("\nLinux/Mac:")
        print('  export DEEPSEEK_API_KEY="your_api_key_here"')
    else:
        # 测试 API 调用
        print("正在调用 DeepSeek API...")
        response = call_deepseek("用一句话介绍一下人工智能")
        
        if response:
            print(f"\nAI 回复:\n{response}")
        else:
            print("\n调用失败，请检查你的 API Key 是否正确")


