# 工地交通调度系统
管理端请访问https://dpcydd.pythonanywhere.com/
司机端请访问https://dpcydd.pythonanywhere.com/driver

基于WebSocket实时通信和深度强化学习的工地交通调度系统

## 项目简介

本项目是一个面向工地场景的智能交通调度系统，采用前后端分离架构，实现了车辆路径规划、实时监控、智能调度等功能。系统创新性地集成了DQN（Deep Q-Network）深度强化学习算法，通过历史行驶数据训练模型，不断优化路径规划策略。

## 主要特性

- 🚗 **智能路径规划**：基于Dijkstra算法，考虑距离、拥堵、施工区域等多因素
- 🤖 **深度强化学习**：集成DQN算法，通过历史数据学习最优路径策略
- 🔄 **实时通信**：基于WebSocket实现低延迟（<1秒）的实时数据推送
- 📊 **数据可视化**：使用Chart.js实现效率趋势、车辆分布、拥堵热力图等
- 🏗️ **模块化架构**：采用Flask Blueprint实现高内聚、低耦合的代码组织
- 📱 **移动端支持**：提供司机移动端界面，支持路线预览和实时导航

## 技术栈

### 后端
- **框架**：Flask (Python)
- **实时通信**：Flask-SocketIO (WebSocket)
- **深度学习**：PyTorch (DQN算法)
- **架构**：Blueprint模块化设计

### 前端
- **核心**：HTML5, JavaScript (ES6+), CSS3
- **可视化**：Chart.js
- **实时通信**：Socket.IO Client
- **地图渲染**：Canvas API

## 系统架构

```
前端层 (Frontend)
├── traffic_system.html    # 主调度界面
├── driver.html            # 司机移动端
└── js/                    # JavaScript模块

后端层 (Backend)
├── app.py                 # Flask主应用
├── backend/
│   ├── blueprints/        # 路由层（12个模块）
│   ├── services/          # 服务层（11个服务）
│   ├── models/            # 数据模型层
│   ├── utils/             # 工具层
│   └── workers/           # 后台工作线程
```

## 快速开始

### 环境要求

- Python 3.8+
- Node.js (可选，用于前端开发)

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/your-username/construction-traffic-scheduling.git
cd construction-traffic-scheduling
```

2. **安装Python依赖**
```bash
pip install -r requirements.txt
```

3. **运行系统**
```bash
python app.py
```

4. **访问系统**
- 主调度界面：https://wdd123456.pythonanywhere.com/
- 司机移动端：https://wdd123456.pythonanywhere.com/driver

## 核心功能

### 1. 路径规划
- Dijkstra最短路径算法
- 考虑道路方向、车辆类型、拥堵状态
- DQN深度强化学习优化

### 2. 实时监控
- WebSocket实时推送车辆位置
- 监控数据可视化
- 多客户端同时监控

### 3. 车辆调度
- 支持多种车辆类型（渣土车、材料车、工程车、特种车）
- 个性化路径规划
- 到达时间估算

### 4. 地图管理
- DXF格式地图导入
- 节点和道路可视化编辑
- 道路方向配置

## 项目结构

```
.
├── app.py                      # Flask主应用
├── backend/                    # 后端核心代码
│   ├── blueprints/            # 路由模块
│   ├── services/              # 业务逻辑服务
│   ├── models/                # 数据模型
│   ├── utils/                 # 工具函数
│   └── workers/               # 后台工作线程
├── js/                        # 前端JavaScript模块
├── css/                       # 样式文件
├── traffic_system.html        # 主界面
├── driver.html                # 司机界面
└── requirements.txt           # Python依赖
```

## 配置说明

系统支持通过环境变量进行配置：

- `CORS_ALLOWED_ORIGINS`: CORS允许的来源（生产环境）
- `DISABLE_WEBSOCKET`: 禁用WebSocket（设为1）
- `PYTHONANYWHERE_DOMAIN`: PythonAnywhere环境检测

## 开发说明

### 代码组织
- **路由层**：`backend/blueprints/` - Flask Blueprint模块
- **服务层**：`backend/services/` - 业务逻辑实现
- **工具层**：`backend/utils/` - 通用工具函数

### 核心算法
- **路径规划**：`backend/services/path_planning_service.py`
- **DQN实现**：`backend/services/dqn_service.py`
- **WebSocket**：`app.py` 和 `js/websocket.js`

## 许可证

本项目采用 MIT 许可证。

## 作者

[WBD]

## 致谢

感谢所有为本项目提供帮助和支持的人们。

## 相关论文

本系统为学术研究项目，相关论文请参考项目文档。

---

**注意**：本项目为学术研究用途，代码仅供学习和参考。

