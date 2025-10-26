"""
DeepSeek API 调用示例
使用 OpenAI 兼容的接口调用 DeepSeek API
"""

import requests
import json

# DeepSeek API 配置
API_KEY = "sk-92faa845e25f4b168efacf9b5b5e22b0"  # 请替换为你的 DeepSeek API Key
BASE_URL = "https://api.deepseek.com/v1"

def call_deepseek_chat(messages, model="deepseek-chat", temperature=1.0, max_tokens=2000):
    """
    调用 DeepSeek Chat API
    
    Args:
        messages: 对话消息列表，格式: [{"role": "user", "content": "你好"}]
        model: 模型名称，默认 deepseek-chat
        temperature: 温度参数，控制随机性 (0-2)
        max_tokens: 最大生成 token 数
    
    Returns:
        API 响应内容
    """
    url = f"{BASE_URL}/chat/completions"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    data = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "stream": False
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API 调用失败: {e}")
        return None


def call_deepseek_streaming(messages, model="deepseek-chat"):
    """
    调用 DeepSeek Chat API (流式输出)
    
    Args:
        messages: 对话消息列表
        model: 模型名称
    """
    url = f"{BASE_URL}/chat/completions"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    data = {
        "model": model,
        "messages": messages,
        "stream": True
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, stream=True)
        response.raise_for_status()
        
        for line in response.iter_lines():
            if line:
                line = line.decode('utf-8')
                if line.startswith('data: '):
                    line = line[6:]
                    if line.strip() == '[DONE]':
                        break
                    try:
                        chunk = json.loads(line)
                        if 'choices' in chunk and len(chunk['choices']) > 0:
                            delta = chunk['choices'][0].get('delta', {})
                            if 'content' in delta:
                                print(delta['content'], end='', flush=True)
                    except json.JSONDecodeError:
                        continue
        print()  # 换行
    except requests.exceptions.RequestException as e:
        print(f"API 调用失败: {e}")


# 示例 1: 基本对话
def example_basic_chat():
    print("=== 示例 1: 基本对话 ===")
    messages = [
        {"role": "user", "content": "你好，请介绍一下你自己"}
    ]
    
    result = call_deepseek_chat(messages)
    if result:
        print(f"模型: {result['model']}")
        print(f"回复: {result['choices'][0]['message']['content']}")
        print(f"使用 tokens: {result['usage']}")


# 示例 2: 多轮对话
def example_multi_turn():
    print("\n=== 示例 2: 多轮对话 ===")
    messages = [
        {"role": "user", "content": "什么是人工智能?"},
        {"role": "assistant", "content": "人工智能是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。"},
        {"role": "user", "content": "能举个例子吗?"}
    ]
    
    result = call_deepseek_chat(messages)
    if result:
        print(f"回复: {result['choices'][0]['message']['content']}")


# 示例 3: 流式输出
def example_streaming():
    print("\n=== 示例 3: 流式输出 ===")
    messages = [
        {"role": "user", "content": "请用 Python 写一个快速排序算法"}
    ]
    
    call_deepseek_streaming(messages)


# 示例 4: 代码生成
def example_code_generation():
    print("\n=== 示例 4: 代码生成 ===")
    messages = [
        {"role": "user", "content": "写一个 Python 函数来计算斐波那契数列的第 n 项"}
    ]
    
    result = call_deepseek_chat(messages, temperature=0.7)
    if result:
        print(f"回复: {result['choices'][0]['message']['content']}")


if __name__ == "__main__":
    # 请确保设置了正确的 API_KEY
    if API_KEY == "your_deepseek_api_key_here":
        print("⚠️  请先设置你的 DeepSeek API Key!")
        print("在脚本开头将 API_KEY 变量设置为你的实际 API Key")
    else:
        # 运行示例
        example_basic_chat()
        # example_multi_turn()
        # example_streaming()
        # example_code_generation()

