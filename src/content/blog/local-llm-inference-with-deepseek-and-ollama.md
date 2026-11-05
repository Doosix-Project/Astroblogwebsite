---
title: "Running State-of-the-Art Local LLMs: Ollama, vLLM & DeepSeek R1"
description: "Step-by-step tutorial on deploying reasoning models locally on consumer hardware and dedicated servers with high throughput and privacy."
pubDate: 2026-03-01
category: "AI & LLMs"
tags: ["AI", "Local LLM", "Ollama", "vLLM", "DeepSeek", "Open Source"]
featured: false
readingTime: "5 min read"
heroImage: "/images/local-llm.svg"
---

Privacy, offline capability, and zero latency fees have driven unprecedented demand for local LLM inference. With the release of distilled reasoning models and high-throughput engines, developers can now run frontier-class models directly on their workstations or private servers.

In this guide, we explore how to set up, optimize, and serve local LLMs using **Ollama** for development and **vLLM** for production workloads.

## Ollama vs. vLLM: Choosing the Right Tool

| Feature | Ollama | vLLM |
| :--- | :--- | :--- |
| **Primary Use Case** | Local developer workstation | Multi-user production API |
| **Quantization Support** | GGUF (4-bit, 8-bit, FP16) | AWQ, GPTQ, FP8, INT4 |
| **PagedAttention** | No | Yes (Industry standard) |
| **Continuous Batching** | Basic | High performance |
| **Setup Complexity** | 1-line installation | Docker / Python environment |

## Getting Started with Ollama

Installing Ollama on Linux or macOS takes seconds:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Pull and run a distilled reasoning model:

```bash
ollama run deepseek-r1:14b
```

Ollama automatically detects Apple Silicon Metal acceleration, NVIDIA CUDA, or AMD ROCm GPUs, mapping memory dynamically.

## High-Throughput Serving with vLLM

When serving thousands of requests per second for internal applications, **vLLM** leverages PagedAttention to eliminate memory fragmentation in the KV cache:

```bash
python -m vllm.entrypoints.openai.api_server \
    --model deepseek-ai/DeepSeek-R1-Distill-Qwen-14B \
    --tensor-parallel-size 1 \
    --gpu-memory-utilization 0.90 \
    --max-model-len 8192 \
    --port 8000
```

This launches an OpenAI-compatible API endpoint at `http://localhost:8000/v1` which can seamlessly drop into any existing LangChain, LlamaIndex, or agentic workflow.

## Hardware Sizing Cheat Sheet

- **8B Models (Q4)**: 6GB VRAM (Runs on RTX 3060, M1/M2/M3 Mac with 8GB+)
- **14B Models (Q4)**: 10GB VRAM (RTX 4070, M-series with 16GB+)
- **32B Models (Q4)**: 20GB VRAM (RTX 3090 / 4090, Mac with 32GB+)
- **70B Models (Q4)**: 40GB+ VRAM (Dual RTX 3090, Mac Studio with 64GB+)

## Conclusion

Running local LLMs is no longer a slow novelty. With quantization and paged attention architectures, local models deliver immediate responses, absolute data sovereignty, and reliable uptime.
