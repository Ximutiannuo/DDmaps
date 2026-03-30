# 京东云部署教程（新手保姆级版本）

本教程面向完全零基础的新手，每一步都有详细说明，跟着做就能成功！

---

## 🚨 重要提醒（避坑指南）

> ⚠️ **必须使用 Linux 系统，不要选 Windows Server！**
> 
> | ❌ 错误选择 | ✅ 正确选择 |
> |------------|------------|
> | Windows Server 2022 | **CentOS 7.6** |
> | Windows Server 2019 | **Ubuntu 20.04** |
> 
> 如果您已经买了 Windows 服务器，请看下面的「重装系统」步骤！

---

## 第一阶段：购买京东云服务器

### 步骤 1：注册/登录京东云

1. 打开浏览器，访问：https://www.jdcloud.com/
2. 点击右上角「登录」（如果没有账号，先「注册」）
3. 如果没有实名认证，需要先完成实名认证（按提示操作即可）

### 步骤 2：购买轻量云主机

1. 登录后，访问轻量云主机购买页：https://lavm-console.jdcloud.com/
2. 点击「创建实例」或「购买」
3. **选择配置**（⚠️ 注意选对！）：

   | 配置项 | 推荐选择 | ❌ 不要选 |
   |--------|---------|----------|
   | **地域** | 华北-北京（或离您最近的） | - |
   | **镜像** | ✅ **CentOS 7.6** 或 **Ubuntu 20.04** | ❌ Windows Server |
   | **套餐** | 2核2G（入门款够用） | - |
   | **购买时长** | 按需选择 | - |

4. 点击「立即购买」，完成支付

### 步骤 3：获取服务器信息

购买成功后，进入控制台查看您的服务器：

1. 访问：https://lavm-console.jdcloud.com/
2. 找到您刚创建的服务器
3. **记录以下信息**（非常重要！）：
   - **公网 IP 地址**：类似 `116.198.xxx.xxx` 的一串数字
   - **登录密码**：如果没有设置，需要「重置密码」

#### 如何重置密码：
1. 在实例列表点击您的服务器
2. 找到「重置密码」按钮
3. 设置一个您能记住的密码（如：`MyPassword123!`）
4. 密码要求：8-30位，包含大小写字母和数字

---

## ⚠️ 买错了 Windows 系统？重装系统步骤

如果您不小心买了 Windows Server，需要重装为 Linux：

### 重装步骤：

1. 登录控制台：https://lavm-console.jdcloud.com/
2. 在服务器列表找到您的服务器
3. 点击「**更多**」→「**重装系统**」（或「重置系统」）
4. 在镜像选择中，选择：
   - ✅ **CentOS 7.6**（推荐新手）
   - ✅ 或 **Ubuntu 20.04**
5. 设置新的 root 密码
6. 点击确认，等待重装完成（约2-3分钟）

> 💡 重装完成后，服务器会自动重启，状态变为「运行中」就可以继续下一步了。

---

## 第二阶段：连接服务器

### 方法一：使用京东云 WebTerminal（最简单！推荐新手）

**不需要安装任何软件，直接在网页上操作！**

1. 登录控制台：https://lavm-console.jdcloud.com/
2. 在服务器列表找到您的服务器
3. 点击「**远程连接**」或「**WebTerminal**」
4. 会在浏览器中打开一个黑色的命令行窗口
5. 如果提示登录：
   - 用户名：`root`
   - 密码：您设置的密码

看到 `[root@xxx ~]#` 就表示连接成功！

---

### 方法二：使用 Windows PowerShell（进阶）

Windows 10/11 系统自带 SSH 功能。

#### 步骤 1：打开 PowerShell

1. 按键盘 `Win + X` 键
2. 选择「Windows PowerShell」或「终端」

#### 步骤 2：连接服务器

```powershell
ssh root@您的公网IP
```

**举例**：如果您的公网 IP 是 `117.72.13.255`，就输入：

```powershell
ssh root@117.72.13.255
```

然后按 **回车键**。

#### 步骤 3：首次连接确认

第一次连接会提示：
```
Are you sure you want to continue connecting (yes/no)?
```

**输入 `yes`**，然后按回车。

#### 步骤 4：输入密码

```
root@117.72.13.255's password:
```

> ⚠️ **注意**：输入密码时屏幕上不会显示任何字符（星号也没有），这是正常的！盲打就行，输完按回车。

#### 步骤 5：连接成功

如果看到类似这样的提示，说明连接成功了！
```
[root@JD-Cloud ~]#
```

---

### ❓ SSH 连接没反应？

如果 SSH 卡住没反应，检查：

1. **是否用的 Linux 系统？** Windows Server 不支持 SSH！
2. **防火墙是否开放 22 端口？**
   - 控制台 → 您的服务器 → 防火墙 → 添加规则
   - 协议：TCP，端口：22，来源：0.0.0.0/0
3. **用 WebTerminal 代替**（方法一，不需要 SSH）

---

## 第三阶段：安装 Python 环境

成功连接到服务器后，**复制以下命令，粘贴到命令行中执行**。

> 💡 **粘贴方法**：
> - WebTerminal：`Ctrl + Shift + V` 或 鼠标右键
> - PowerShell：鼠标右键

### 命令 1：更新系统并安装 Python（CentOS）

```bash
yum update -y && yum install -y python36 python3-pip git
```

如果您用的是 **Ubuntu**，换这个命令：

```bash
apt update && apt install -y python3 python3-pip git
```

等待执行完成（可能需要1-2分钟）。

### 命令 2：配置 pip 镜像源（加速下载）

```bash
pip3 install -U pip -i https://pypi.tuna.tsinghua.edu.cn/simple && pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 命令 3：验证安装成功

```bash
python3 --version
```

如果显示 `Python 3.x.x`，说明安装成功！

---

## 第四阶段：上传您的项目代码

### 方法一：从 GitHub 下载（推荐）

如果您的项目已经上传到 GitHub：

```bash
cd /home
git clone https://github.com/您的用户名/DDmaps-railway.git
cd DDmaps-railway
```

### 方法二：使用 SCP 上传（本地项目）

回到您**本地电脑**的 PowerShell（不是服务器），执行：

```powershell
scp -r "f:\map2\DDmaps-railway" root@您的公网IP:/home/
```

输入服务器密码后，等待上传完成。

然后回到**服务器**的命令行：

```bash
cd /home/DDmaps-railway
```

---

## 第五阶段：安装项目依赖

确保您在项目目录中，然后执行：

```bash
cd /home/DDmaps-railway
pip3 install -r requirements.txt
```

这会安装所有需要的 Python 库，需要等待几分钟。

#### 如果安装失败，逐个安装：

```bash
pip3 install flask flask-cors flask-socketio gunicorn eventlet
pip3 install numpy pandas openpyxl
pip3 install ezdxf fonttools
```

---

## 第六阶段：开放防火墙端口

⚠️ **如果跳过这一步，外网无法访问您的应用！**

1. 打开京东云控制台：https://lavm-console.jdcloud.com/
2. 点击您的服务器实例
3. 找到「**防火墙**」选项卡
4. 点击「**添加规则**」
5. 填写：

   | 字段 | 值 |
   |------|------|
   | 类型 | 自定义 |
   | 协议 | TCP |
   | 端口 | **5000** |
   | 来源 | 0.0.0.0/0 |

6. 点击「确定」保存

---

## 第七阶段：启动应用

回到服务器命令行，执行：

```bash
cd /home/DDmaps-railway
nohup python3 -m gunicorn --worker-class eventlet -w 1 -b 0.0.0.0:5000 app:app > app.log 2>&1 &
```

验证是否启动成功：

```bash
curl http://localhost:5000
```

如果返回 HTML 内容，说明启动成功！

#### 查看应用状态：

```bash
# 查看是否在运行
ps aux | grep gunicorn

# 查看日志
tail -f app.log

# 停止应用
pkill gunicorn
```

---

## 第八阶段：访问您的应用 🎉

在您自己电脑的浏览器中打开：

```
http://您的公网IP:5000/traffic_system.html
```

例如：`http://117.72.13.255:5000/traffic_system.html`

**如果能看到页面，恭喜您部署成功！** 🎉🎉🎉

---

## 📋 快速命令汇总（复制即用）

连接到服务器后，依次执行这些命令：

```bash
# 1. 安装环境（CentOS）
yum update -y && yum install -y python36 python3-pip git

# 2. 配置 pip
pip3 install -U pip -i https://pypi.tuna.tsinghua.edu.cn/simple
pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 3. 下载项目（换成您的 GitHub 地址）
cd /home
git clone https://github.com/您的用户名/DDmaps-railway.git
cd DDmaps-railway

# 4. 安装依赖
pip3 install -r requirements.txt

# 5. 启动应用
nohup python3 -m gunicorn --worker-class eventlet -w 1 -b 0.0.0.0:5000 app:app > app.log 2>&1 &

# 6. 访问（记得开放防火墙 5000 端口！）
echo "请访问: http://$(curl -s ip.sb):5000/traffic_system.html"
```

---

## ❓ 常见问题 FAQ

### Q1: SSH 连接没反应
**A**: 检查是否用的 Linux 系统！Windows Server 不支持 SSH。请重装为 CentOS 或 Ubuntu。

### Q2: 连接时提示 "Connection refused"
**A**: 
1. 检查服务器是否开机
2. 检查防火墙是否开放 22 端口

### Q3: 输入密码后提示 "Permission denied"
**A**: 密码错误，请去京东云控制台重置密码。

### Q4: 浏览器打开页面显示 "无法访问此网站"
**A**: 
1. 检查防火墙是否开放了 5000 端口
2. 检查应用是否在运行：`ps aux | grep gunicorn`

### Q5: pip 安装很慢或失败
**A**: 确保已配置国内镜像源（第三阶段命令2）

### Q6: 关闭命令行窗口后应用停止了
**A**: 使用 `nohup` 命令启动（第七阶段的命令已包含）

---

## 🆘 需要帮助？

如果遇到问题：
1. 截图错误信息
2. 告诉我您卡在哪一步
3. 我会帮您解决！

---

**最后更新**：2026-01-03
