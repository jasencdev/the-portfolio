---
title: "Self-Hosted Language Models: Building a Containerized AI Development Environment"
date: 2025-01-31
---

# Self-Hosted Language Models

![Project Screenshot](../img/slm-dashboard.png)

## Overview
This project provides a self-hosted environment for language model experimentation, eliminating dependencies on external APIs. Built around Open WebUI and secured with Tailscale, it offers developers complete control over their AI tools while maintaining security and privacy.

## Architecture

### Frontend Architecture
- **UI Framework**: Open WebUI for intuitive language model interaction
- **Interface**: Modern, responsive design for seamless user experience
- **Real-time Updates**: WebSocket communication for instant model responses
- **Customization**: Configurable UI settings for personalized experience
- **Prompt Management**: System for saving and organizing prompts

### Backend Architecture
- **Core**: Open WebUI server for handling model interactions
- **Security**: Tailscale for encrypted networking and access control
- **Models**: Support for multiple language models with easy switching
- **Compute**: Optimized inference with CPU and optional GPU acceleration
- **Storage**: Local file system for model weights and configurations

## Technologies Used
- **Frontend**: 
  - Open WebUI for user interface
  - React-based components
  - WebSocket for real-time communication
- **Backend**: 
  - Python backend services
  - Model serving frameworks
  - Docker for containerization
- **Security**: 
  - Tailscale for zero-config VPN
  - End-to-end encryption
  - Private network isolation
- **AI Models**: 
  - Support for multiple small language models
  - Inference optimization techniques
- **DevOps**:
  - Docker Compose for multi-container management
  - Volume mounting for persistent storage
  - Resource allocation controls

## Features
- **Language Model Integration**: 
  - Support for various open-source models
  - Easy model switching and configuration
  - Context length management
- **Security Controls**: 
  - Tailscale-protected access
  - Private network deployment
  - No data sent to external APIs
- **User Experience**: 
  - Intuitive chat interface
  - Conversation management
  - Prompt templates and history
- **Performance**: 
  - Optimized inference for lower-spec hardware
  - Resource monitoring
  - Response streaming
- **Customization**: 
  - Model parameter adjustments
  - Temperature and sampling controls
  - System prompt configuration

## Development Process

### Motivation and Evolution
This project was motivated by several key factors:
- Growing concerns about data privacy when using commercial AI APIs
- Need for experimentation without usage limitations or costs
- Desire for complete control over model selection and configuration
- Recognition that many developers want AI capabilities without external dependencies

### Architecture Decisions
- **Open WebUI over Custom UI**: Leveraged existing open-source UI to accelerate development
- **Tailscale for Security**: Chose Tailscale for its simplicity and strong security model
- **Docker Containerization**: Selected for isolation, portability, and ease of deployment
- **Local Model Execution**: Prioritized on-device inference over API calls for privacy and control
- **Modular Design**: Structured for future integration of advanced tools like LangChain and LlamaIndex

### Workflow
1. Docker container setup with base environment and dependencies
2. Open WebUI installation and configuration
3. Integration with Tailscale for secure networking
4. Model download and optimization procedures
5. System testing and performance tuning
6. Documentation creation for deployment and usage

### Key Advantages
- Complete independence from commercial AI providers
- Enhanced privacy and data security
- No usage limits or unexpected costs
- Full control over model selection and parameters
- Ability to run offline without internet connectivity

## Implementation Details

### Docker Configuration
The project uses Docker Compose for orchestrating multiple containers:

```yaml
version: '3'
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    restart: always
    ports:
      - "8080:8080"
    volumes:
      - ./open-webui-data:/app/backend/data
    environment:
      - OLLAMA_API_BASE_URL=http://ollama:11434/api
      - WEBUI_AUTH=true
      - WEBUI_INTERNET_FACING=false

  ollama:
    image: ollama/ollama:latest
    restart: always
    volumes:
      - ./ollama-data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
```

### Tailscale Integration
Tailscale is implemented as a separate container for network security:

```yaml
  tailscale:
    image: tailscale/tailscale:latest
    restart: always
    volumes:
      - ./tailscale-data:/var/lib/tailscale
    network_mode: "host"
    cap_add:
      - NET_ADMIN
      - NET_RAW
    environment:
      - TS_AUTH_KEY=${TAILSCALE_AUTH_KEY}
      - TS_ROUTES=10.0.0.0/8
      - TS_HOSTNAME=ai-lab
```

## Deployment

The deployment process is straightforward using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/username/self-hosted-llm.git
cd self-hosted-llm

# Set Tailscale auth key in .env file
echo "TAILSCALE_AUTH_KEY=your_tailscale_key_here" > .env

# Start the containers
docker-compose up -d

# Download a model
docker-compose exec ollama ollama pull llama2:7b
```

## Lessons Learned

Throughout this project, I gained valuable insights:
- **Resource Management**: Balancing model size with hardware capabilities is crucial
- **Security Layers**: Multiple security layers provide better protection than a single approach
- **Docker Optimization**: Container optimization significantly impacts performance
- **Model Selection**: Smaller models can provide impressive results with the right configuration
- **User Experience**: The importance of intuitive interfaces for AI interaction

## Future Improvements

Planned enhancements include:
- Integration with LangChain for advanced AI workflows
- Addition of LlamaIndex for document-based queries
- FastAPI backend for custom API development
- Data persistence layer for chat history and user preferences
- Fine-tuning capabilities for model customization