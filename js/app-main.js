        // ========== UI 增强功能 ==========
        
        // Toast 通知系统
        
        // 按钮加载状态管理
        
        // 增强的按钮点击处理（带加载状态和Toast反馈）
        
        // 表单验证增强
        
        // 全局变量
        let nodes = [];
        let edges = [];
        let vehicles = [];
        let mapTextLabels = [];  // 地图文字框列表
        let vehicleCounter = 1;
        let monitorData = {};
        let travelTimeRecords = [];
        let editMode = false;
        let mapBackground = null;
        let vehicleTypes = {};
        let directionTypes = {};
        let drivers = {};
        let driverRoutes = {};
        let activeDriverId = null;
        
        // WebSocket 连接（使用模块中的变量，避免重复声明）
        // socket 和 websocketConnected 在 js/websocket.js 模块中已声明
        // 通过 window 对象的 getter 访问模块中的变量
        // 注意：不能在这里用 let/const 重新声明，会与模块中的声明冲突
        // 使用 getter 访问：window.socket 和 window.websocketConnected
        
        // 图表实例（使用模块中的变量，避免重复声明）
        // charts 在 js/charts.js 模块中已声明
        // 通过 window.charts 访问模块中的变量
        // 注意：不能在这里用 let/const 重新声明，会与模块中的声明冲突

        // 使用模块中的 API_BASE（如果模块已加载）
        // API_BASE 在 js/api.js 模块中已声明为 const，不能重新声明
        // 使用立即执行函数创建作用域，避免全局变量冲突
        (function() {
            // 在这个作用域内，可以安全地使用 API_BASE
            // 从 window.API_BASE 获取（模块已设置）或使用备用实现
            const getApiBase = () => {
                if (window.API_BASE) {
                    return window.API_BASE;
                }
                const origin = window.location.origin;
                if (origin === 'null' || origin.startsWith('file://')) {
                    return 'http://localhost:5000/api';
                }
                return origin + '/api';
            };
            
            // 确保 window.API_BASE 存在
            if (!window.API_BASE) {
                window.API_BASE = getApiBase();
            }
        })();
        
        // 在全局作用域中，不能声明 const API_BASE（会与模块冲突）
        // 创建一个全局函数来获取 API_BASE，或者直接使用 window.API_BASE
        // 为了兼容现有代码，使用 Object.defineProperty 创建全局变量（不是 const）
        if (typeof window !== 'undefined' && !window.hasOwnProperty('API_BASE')) {
            // 如果模块未设置，设置默认值
            const origin = window.location.origin;
            const defaultApiBase = (origin === 'null' || origin.startsWith('file://')) 
                ? 'http://localhost:5000/api' 
                : origin + '/api';
            window.API_BASE = defaultApiBase;
        }

        const MAP_UPLOAD_DEFAULT_HTML = `
            <p>点击或拖拽图片到这里上传</p>
            <p class="vehicle-info">支持 JPG、PNG 格式，建议尺寸 800x600 以上</p>
        `;
        const MAP_UPLOAD_SUCCESS_HTML = `
            <p>地图上传成功！</p>
            <p class="vehicle-info">点击可重新上传</p>
        `;



        // 使用模块中的 downloadJsonFile（如果模块已加载）
        // downloadJsonFile 在 js/utils.js 模块中已声明，不能重新声明
        // 创建一个函数来获取或使用备用实现
        function getDownloadJsonFile() {
            // 如果模块已加载，使用模块中的函数
            if (window.downloadJsonFile) {
                return window.downloadJsonFile;
            }
            // 否则使用备用实现
            return function(data, filename = 'roadnet.json') {
                try {
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } catch (err) {
                    logError('下载 JSON 失败:', err);
                    showError('下载 JSON 失败: ' + (err.message || '未知错误'));
                }
            };
        }
        
        // 创建一个全局函数引用（不使用 const/let，避免重复声明）
        // 使用立即执行函数创建作用域
        (function() {
            const downloadJsonFileFn = getDownloadJsonFile();
            // 将函数暴露到全局（如果不存在）
            if (!window.downloadJsonFile) {
                window.downloadJsonFile = downloadJsonFileFn;
            }
        })();

        // 节点类型配置（与后端一致）
        const nodeTypes = {
            'entrance': { name: '进场口', color: '#2ecc71' },
            'crossroad': { name: '交叉口', color: '#3498db' },
            'work-area': { name: '作业区', color: '#e74c3c' },
            'start': { name: '场外起点', color: '#9b59b6' }
        };

        // 方向类型配置（与后端一致）
        const defaultDirectionTypes = {
            'two-way': { 'name': '双向通行', 'description': '允许双向行驶' },
            'north': { 'name': '北向单行', 'description': '只允许从南向北行驶' },
            'south': { 'name': '南向单行', 'description': '只允许从北向南行驶' },
            'east': { 'name': '东向单行', 'description': '只允许从西向东行驶' },
            'west': { 'name': '西向单行', 'description': '只允许从东向西行驶' },
            'northeast': { 'name': '东北向单行', 'description': '只允许从西南向东北行驶' },
            'northwest': { 'name': '西北向单行', 'description': '只允许从东南向西北行驶' },
            'southeast': { 'name': '东南向单行', 'description': '只允许从西北向东南行驶' },
            'southwest': { 'name': '西南向单行', 'description': '只允许从东北向西南行驶' }
        };

        function getVehicleSpeed(config) {
            if (!config) return 0;
            if (config.speed_kmph !== undefined) {
                const val = Number(config.speed_kmph);
                if (!Number.isNaN(val)) return val;
            }
            if (config.speed_factor !== undefined) {
                const factor = Number(config.speed_factor);
                if (!Number.isNaN(factor)) return factor * 100;
            }
            return 0;
        }

        // ========== 性能优化工具函数 ==========
        // 安全地绑定事件监听器的辅助函数
        function safeAddEventListener(elementId, eventType, handler, options) {
            try {
                const element = document.getElementById(elementId);
                if (element) {
                    element.addEventListener(eventType, handler, options);
                    return true;
                } else {
                    logWarn(`⚠️ 元素 ${elementId} 不存在，无法绑定 ${eventType} 事件`);
                    return false;
                }
            } catch (error) {
                logError(`绑定事件监听器失败 (${elementId}, ${eventType}):`, error);
                return false;
            }
        }
        
        // 使用模块中的 debounce 和 throttle（如果模块已加载）
        // debounce 和 throttle 在 js/utils.js 模块中已声明，不能重新声明
        // 创建函数来获取或使用备用实现
        function getDebounce() {
            if (window.debounce) {
                return window.debounce;
            }
            return (func, wait = 300) => {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            };
        }
        
        function getThrottle() {
            if (window.throttle) {
                return window.throttle;
            }
            return (func, limit = 1000) => {
                let inThrottle;
                return function executedFunction(...args) {
                    if (!inThrottle) {
                        func.apply(this, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            };
        }
        
        // 创建局部引用（在函数作用域内使用）
        // 注意：不能使用 const debounce/throttle，因为模块中已经声明了
        // 使用立即执行函数创建作用域
        (function() {
            const debounceFn = getDebounce();
            const throttleFn = getThrottle();
            // 将函数暴露到全局（如果不存在）
            if (!window.debounce) {
                window.debounce = debounceFn;
            }
            if (!window.throttle) {
                window.throttle = throttleFn;
            }
        })();
        
        // 3. 使用 requestAnimationFrame 优化的渲染函数
        let renderAnimationFrame = null;
        let pendingRender = false;
        
        function requestRender() {
            if (pendingRender) return;
            pendingRender = true;
            if (renderAnimationFrame) {
                cancelAnimationFrame(renderAnimationFrame);
            }
            renderAnimationFrame = requestAnimationFrame(() => {
                pendingRender = false;
                try {
                    safeRenderMap();
                } catch (err) {
                    if (typeof logError !== 'undefined') {
                        logError('renderMap 执行出错:', err);
                    } else {
                    console.error('renderMap 执行出错:', err);
                    }
                }
            });
        }
        
        // 4. 日志控制（生产环境可关闭）
        const DEBUG_MODE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const log = DEBUG_MODE ? console.log.bind(console) : () => {};
        const logError = console.error.bind(console); // 错误始终记录
        const logWarn = DEBUG_MODE ? console.warn.bind(console) : () => {};
        
        // ========== 稳定性增强模块 ==========
        
        // 1. 请求限流（客户端）
        class ClientRateLimiter {
            constructor(maxRequests = 50, windowMs = 1000) {
                this.maxRequests = maxRequests;
                this.windowMs = windowMs;
                this.requests = [];
            }
            
            isAllowed() {
                const now = Date.now();
                this.requests = this.requests.filter(time => now - time < this.windowMs);
                if (this.requests.length >= this.maxRequests) {
                    return false;
                }
                this.requests.push(now);
                return true;
            }
        }
        
        const rateLimiter = new ClientRateLimiter(50, 1000);
        
        // 2. 连接状态监控
        let connectionStatus = {
            online: navigator.onLine,
            lastCheck: Date.now(),
            consecutiveFailures: 0,
            healthStatus: 'unknown'
        };
        
        // 监听网络状态
        window.addEventListener('online', () => {
            connectionStatus.online = true;
            connectionStatus.consecutiveFailures = 0;
            updateConnectionIndicator();
        });
        
        window.addEventListener('offline', () => {
            connectionStatus.online = false;
            updateConnectionIndicator();
        });
        
        // 3. 数据缓存
        const cache = {
            get(key) {
                try {
                    const item = localStorage.getItem(`cache_${key}`);
                    if (!item) return null;
                    const { data, expiry } = JSON.parse(item);
                    if (Date.now() > expiry) {
                        localStorage.removeItem(`cache_${key}`);
                        return null;
                    }
                    return data;
                } catch (e) {
                    return null;
                }
            },
            set(key, data, ttl = 300000) { // 默认5分钟
                try {
                    const item = {
                        data,
                        expiry: Date.now() + ttl
                    };
                    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
                } catch (e) {
                    logWarn('缓存写入失败:', e);
                }
            },
            clear() {
                try {
                    Object.keys(localStorage).forEach(key => {
                        if (key.startsWith('cache_')) {
                            localStorage.removeItem(key);
                        }
                    });
                } catch (e) {
                    logWarn('缓存清理失败:', e);
                }
            }
        };
        
        // 4. 健康检查
        let healthCheckInterval = null;
        async function checkServerHealth() {
            try {
                const apiBase = window.API_BASE || 'http://localhost:5000/api';
                const response = await fetch(`${apiBase}/health`, {
                    method: 'GET',
                    signal: AbortSignal.timeout(5000)
                });
                if (response.ok) {
                    const health = await response.json();
                    connectionStatus.healthStatus = health.status || 'healthy';
                    connectionStatus.consecutiveFailures = 0;
                    connectionStatus.lastCheck = Date.now();
                } else {
                    connectionStatus.healthStatus = 'unhealthy';
                    connectionStatus.consecutiveFailures++;
                }
            } catch (error) {
                connectionStatus.healthStatus = 'unreachable';
                connectionStatus.consecutiveFailures++;
            }
            updateConnectionIndicator();
        }
        
        // 5. 连接状态指示器
        function updateConnectionIndicator() {
            // 可以在这里添加UI指示器
            if (connectionStatus.consecutiveFailures > 3) {
                logWarn('服务器连接异常，连续失败次数:', connectionStatus.consecutiveFailures);
            }
        }
        
        // 6. 增强的API调用（带重试和缓存）
        // apiCall 在 js/api.js 模块中已声明，不能重新声明
        // 创建一个函数来获取或使用备用实现
        function getApiCall() {
            // 如果模块已加载，使用模块中的 apiCall
            if (window.apiCall) {
                return window.apiCall;
            }
            // 否则使用备用实现
            return async function(endpoint, options = {}) {
            const apiBase = window.API_BASE || 'http://localhost:5000/api';
            const url = `${apiBase}${endpoint}`;
            const cacheKey = `api_${endpoint}_${JSON.stringify(options.body || {})}`;
            const useCache = options.cache !== false && options.method === 'GET';
            const maxRetries = options.maxRetries !== undefined ? options.maxRetries : 3;
            const retryDelay = options.retryDelay || 1000;
            
            // 检查缓存
            if (useCache) {
                const cached = cache.get(cacheKey);
                if (cached) {
                    return cached;
                }
            }
            
            // 请求限流
            if (!rateLimiter.isAllowed()) {
                logWarn('请求限流触发:', endpoint);
                if (useCache) {
                    const cached = cache.get(cacheKey);
                    if (cached) return cached;
                }
                return { success: false, message: '请求过于频繁，请稍后再试' };
            }
            
            let lastError = null;
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                try {
                    const startTime = performance.now();
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);
                    
                    const response = await fetch(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            ...options.headers
                        },
                        signal: controller.signal,
                        ...options
                    });
                    
                    clearTimeout(timeoutId);
                    const duration = performance.now() - startTime;
                    
                    // 记录慢请求
                    if (duration > 2000) {
                        logWarn(`慢请求: ${endpoint} 耗时 ${duration.toFixed(2)}ms`);
                    }
                    
                    if (!response.ok) {
                        // 429 限流错误，等待后重试
                        if (response.status === 429 && attempt < maxRetries) {
                            const retryAfter = response.headers.get('Retry-After');
                            const delay = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay * (attempt + 1);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue;
                        }
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    
                    const data = await response.json();
                    
                    // 缓存成功响应
                    if (useCache && data.success) {
                        cache.set(cacheKey, data, options.cacheTTL || 300000);
                    }
                    
                    connectionStatus.consecutiveFailures = 0;
                    return data;
                    
                } catch (error) {
                    lastError = error;
                    
                    // 如果是网络错误且还有重试次数，等待后重试
                    if (attempt < maxRetries && (error.name === 'TypeError' || error.name === 'AbortError')) {
                        const delay = retryDelay * Math.pow(2, attempt); // 指数退避
                        await new Promise(resolve => setTimeout(resolve, delay));
                        continue;
                    }
                    
                    // 最后一次尝试失败
                    if (attempt === maxRetries) {
                        connectionStatus.consecutiveFailures++;
                        logError('API调用失败:', error, 'URL:', url);
                        
                        // 尝试使用缓存
                        if (useCache) {
                            const cached = cache.get(cacheKey);
                            if (cached) {
                                log('使用缓存数据:', endpoint);
                                return cached;
                            }
                        }
                        
                        let errorMsg = error.message;
                        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                            errorMsg = '无法连接到服务器。请检查网络连接或服务器状态。';
                        } else if (error.name === 'AbortError') {
                            errorMsg = '请求超时，请稍后重试。';
                        }
                        
                        // 只在非静默模式下显示错误
                        if (!options.silent) {
                            showError(`网络请求失败: ${errorMsg}`);
                        }
                        
                        return { success: false, message: errorMsg };
                    }
                }
            }
            
            return { success: false, message: lastError?.message || '未知错误' };
            };
        }
        
        // 创建一个全局函数引用（不使用 const/let，避免重复声明）
        // 使用立即执行函数创建作用域
        (function() {
            const apiCallFn = getApiCall();
            // 将函数暴露到全局（如果不存在）
            if (!window.apiCall) {
                window.apiCall = apiCallFn;
            }
        })();
        
        // 启动健康检查（每30秒）
        if (healthCheckInterval === null) {
            healthCheckInterval = setInterval(checkServerHealth, 30000);
            checkServerHealth(); // 立即检查一次
        }
        
        // ========== WebSocket 实时通信 ==========
        // initWebSocket 在 js/websocket.js 模块中已声明，不能重新声明
        // 创建一个函数来获取或使用备用实现
        function getInitWebSocket() {
            // 如果模块已加载，使用模块中的 initWebSocket
            if (window.initWebSocket) {
                return window.initWebSocket;
            }
            // 否则使用备用实现
            return function() {
                // 检查 Socket.IO 是否已加载
                if (typeof io === 'undefined') {
                    logWarn('⚠️ Socket.IO 库未加载，WebSocket 功能不可用');
                    if (typeof updateConnectionStatus === 'function') {
                        updateConnectionStatus(false);
                    }
                    return;
                }
                
                try {
                    // Socket.IO 会自动处理协议转换，直接使用 origin 即可
                    const wsUrl = window.location.origin;
                    log('正在连接 WebSocket:', wsUrl);
                    
                    // 使用 window.socket 访问模块中的 socket 变量
                    window.socket = io(wsUrl, {
                        transports: ['websocket', 'polling'],
                        reconnection: true,
                        reconnectionDelay: 1000,
                        reconnectionAttempts: 5,
                        timeout: 20000,
                        forceNew: false
                    });
                    
                    window.socket.on('connect', () => {
                        window.websocketConnected = true;
                        log('✅ WebSocket 已连接');
                        if (typeof updateConnectionStatus === 'function') {
                            updateConnectionStatus(true);
                        }
                    });
                    
                    window.socket.on('disconnect', (reason) => {
                        window.websocketConnected = false;
                        logWarn('⚠️ WebSocket 已断开:', reason);
                        if (typeof updateConnectionStatus === 'function') {
                            updateConnectionStatus(false);
                        }
                    });
                    
                    window.socket.on('connected', (data) => {
                        log('服务器确认连接:', data?.message || '已连接');
                    });
                    
                    window.socket.on('vehicle_update', (data) => {
                        // 接收实时更新
                        if (data && data.vehicles) {
                            vehicles = data.vehicles;
                            updateVehicleList();
                        }
                        if (data && data.monitor_data) {
                            monitorData = data.monitor_data;
                            updateMonitorData();
                        }
                        // 使用 requestRender 优化渲染
                        requestRender();
                    });
                    
                    window.socket.on('connect_error', (error) => {
                        logWarn('WebSocket 连接错误:', error.message || error);
                        window.websocketConnected = false;
                        if (typeof updateConnectionStatus === 'function') {
                            updateConnectionStatus(false);
                        }
                        // 如果 WebSocket 失败，降级为轮询模式（已有定时刷新）
                    });
                    
                } catch (error) {
                    logError('WebSocket 初始化失败:', error);
                    window.websocketConnected = false;
                    if (typeof updateConnectionStatus === 'function') {
                        updateConnectionStatus(false);
                    }
                }
            };
        }
        
        // 创建全局函数引用
        (function() {
            const initWebSocketFn = getInitWebSocket();
            if (!window.initWebSocket) {
                window.initWebSocket = initWebSocketFn;
            }
        })();
        
        // 如果模块已加载，使用模块的 initWebSocket 并传入回调
        if (window.initWebSocket && typeof window.initWebSocket === 'function') {
            // 模块版本已加载，使用模块版本并传入回调
            const moduleInitWebSocket = window.initWebSocket;
            // 包装模块函数以添加回调支持（注意：initWebSocket 现在是 async 函数）
            const wrappedInitWebSocket = async function() {
                // 使用 await 调用异步函数
                await moduleInitWebSocket(
                    // onVehicleUpdate 回调
                    (data) => {
                        if (data && data.vehicles) {
                            vehicles = data.vehicles;
                            updateVehicleList();
                        }
                        if (data && data.monitor_data) {
                            monitorData = data.monitor_data;
                            updateMonitorData();
                        }
                        requestRender();
                    },
                    // onConnect 回调
                    () => {
                        log('✅ WebSocket 已连接（模块版本）');
                    },
                    // onDisconnect 回调
                    () => {
                        logWarn('⚠️ WebSocket 已断开（模块版本）');
                    }
                );
            };
            window.initWebSocket = wrappedInitWebSocket;
        }
        
        // updateConnectionStatus 在 js/websocket.js 模块中已声明，不能重新声明
        function getUpdateConnectionStatus() {
            if (window.updateConnectionStatus) {
                return window.updateConnectionStatus;
            }
            return function(connected) {
                // 可以在这里更新UI显示连接状态
                const indicator = document.getElementById('ws-status-indicator');
                if (indicator) {
                    indicator.textContent = connected ? '🟢 实时连接' : '🔴 轮询模式';
                    indicator.style.color = connected ? '#27ae60' : '#e74c3c';
                }
            };
        }
        
        // 创建全局函数引用
        (function() {
            const updateConnectionStatusFn = getUpdateConnectionStatus();
            if (!window.updateConnectionStatus) {
                window.updateConnectionStatus = updateConnectionStatusFn;
            }
        })();
        
        // ========== 数据可视化模块 ==========
        // initCharts 在 js/charts.js 模块中已声明，不能重新声明
        function getInitCharts() {
            if (window.initCharts) {
                return window.initCharts;
            }
            return function() {
                // 检查 Chart.js 是否已加载
                if (typeof Chart === 'undefined') {
                    logWarn('⚠️ Chart.js 库未加载，图表功能不可用');
                    return;
                }
            
                // 使用 window.charts 访问模块中的 charts 变量
                const charts = window.charts || {};
                
                // 初始化效率趋势图
                const efficiencyCtx = document.getElementById('efficiency-chart');
                if (efficiencyCtx) {
                    charts.efficiency = new Chart(efficiencyCtx, {
                        type: 'line',
                        data: {
                            labels: [],
                            datasets: [{
                                label: '平均效率评分',
                                data: [],
                                borderColor: '#3498db',
                                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    top: 5,
                                    bottom: 5,
                                    left: 5,
                                    right: 5
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: '效率评分'
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true
                                }
                            }
                        }
                    });
                }
                
                // 初始化车辆类型分布图
                const vehicleTypeCtx = document.getElementById('vehicle-type-chart');
                if (vehicleTypeCtx) {
                    charts.vehicleType = new Chart(vehicleTypeCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [],
                            datasets: [{
                                data: [],
                                backgroundColor: [
                                    '#f39c12',
                                    '#8e44ad',
                                    '#16a085',
                                    '#e74c3c',
                                    '#3498db'
                                ]
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    top: 5,
                                    bottom: 5,
                                    left: 5,
                                    right: 5
                                }
                            },
                            plugins: {
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }
                    });
                }
                
                // 初始化道路拥堵热力图数据
                const congestionCtx = document.getElementById('congestion-chart');
                if (congestionCtx) {
                    charts.congestion = new Chart(congestionCtx, {
                        type: 'bar',
                        data: {
                            labels: [],
                            datasets: [{
                                label: '拥堵系数',
                                data: [],
                                backgroundColor: function(context) {
                                    // 安全检查：确保 parsed 存在
                                    if (!context || !context.parsed) {
                                        return '#2ecc71'; // 默认颜色
                                    }
                                    const value = context.parsed.y;
                                    if (typeof value !== 'number' || isNaN(value)) {
                                        return '#2ecc71'; // 默认颜色
                                    }
                                    if (value > 2.0) return '#e74c3c';
                                    if (value > 1.5) return '#f39c12';
                                    return '#2ecc71';
                                }
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    top: 5,
                                    bottom: 5,
                                    left: 5,
                                    right: 5
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: '拥堵系数'
                                    }
                                }
                            }
                        }
                    });
                }
                
                // 同步 charts 到 window.charts
                if (window.charts) {
                    Object.assign(window.charts, charts);
                } else {
                    window.charts = charts;
                }
            };
        }
        
        // 创建全局函数引用
        (function() {
            const initChartsFn = getInitCharts();
            if (!window.initCharts) {
                window.initCharts = initChartsFn;
            }
        })();
        
        // updateEfficiencyChart 在 js/charts.js 模块中已声明，不能重新声明
        function getUpdateEfficiencyChart() {
            if (window.updateEfficiencyChart) {
                return window.updateEfficiencyChart;
            }
            return function() {
                const charts = window.charts || {};
                if (!charts.efficiency) return;
                
                const movingVehicles = vehicles.filter(v => v && v.status === 'moving' && v.efficiency_score !== null && v.efficiency_score !== undefined);
                if (movingVehicles.length === 0) {
                    // 如果没有数据，不更新图表
                    return;
                }
                
                const avgEfficiency = movingVehicles.reduce((sum, v) => sum + (v.efficiency_score || 0), 0) / movingVehicles.length;
                if (isNaN(avgEfficiency)) {
                    return; // 如果计算结果无效，不更新
                }
                
                const now = new Date().toLocaleTimeString();
                
                const chart = charts.efficiency;
                if (!chart.data || !chart.data.labels || !chart.data.datasets || !chart.data.datasets[0]) {
                    return; // 图表数据未初始化
                }
                
                chart.data.labels.push(now);
                chart.data.datasets[0].data.push(avgEfficiency);
                
                // 只保留最近20个数据点
                if (chart.data.labels.length > 20) {
                    chart.data.labels.shift();
                    chart.data.datasets[0].data.shift();
                }
                
                chart.update('none'); // 不显示动画以提高性能
            };
        }
        
        // 创建全局函数引用
        (function() {
            const updateEfficiencyChartFn = getUpdateEfficiencyChart();
            if (!window.updateEfficiencyChart) {
                window.updateEfficiencyChart = updateEfficiencyChartFn;
            }
        })();
        
        // updateVehicleTypeChart 在 js/charts.js 模块中已声明，不能重新声明
        function getUpdateVehicleTypeChart() {
            if (window.updateVehicleTypeChart) {
                return window.updateVehicleTypeChart;
            }
            return function() {
            const charts = window.charts || {};
            if (!charts.vehicleType) return;
            
            const typeCount = {};
            vehicles.forEach(v => {
                if (v && v.type) {
                    typeCount[v.type] = (typeCount[v.type] || 0) + 1;
                }
            });
            
            const chart = charts.vehicleType;
            if (!chart.data || !chart.data.datasets || !chart.data.datasets[0]) {
                return; // 图表数据未初始化
            }
            
                chart.data.labels = Object.keys(typeCount);
                chart.data.datasets[0].data = Object.values(typeCount);
                chart.update('none');
            };
        }
        
        // 创建全局函数引用
        (function() {
            const updateVehicleTypeChartFn = getUpdateVehicleTypeChart();
            if (!window.updateVehicleTypeChart) {
                window.updateVehicleTypeChart = updateVehicleTypeChartFn;
            }
        })();
        
        // updateCongestionChart 在 js/charts.js 模块中已声明，不能重新声明
        function getUpdateCongestionChart() {
            if (window.updateCongestionChart) {
                return window.updateCongestionChart;
            }
            return function() {
                const charts = window.charts || {};
                if (!charts.congestion) return;
                
                const congestedEdges = edges.filter(e => e && e.congestion_coeff && e.congestion_coeff > 1.0)
                    .sort((a, b) => (b.congestion_coeff || 0) - (a.congestion_coeff || 0))
                    .slice(0, 10); // 只显示前10条最拥堵的道路
                
                const chart = charts.congestion;
                if (!chart.data || !chart.data.datasets || !chart.data.datasets[0]) {
                    return; // 图表数据未初始化
                }
                
                // 如果没有拥堵道路，显示空数据
                if (congestedEdges.length === 0) {
                    chart.data.labels = [];
                    chart.data.datasets[0].data = [];
                } else {
                    chart.data.labels = congestedEdges.map(e => e.id || '未知');
                    chart.data.datasets[0].data = congestedEdges.map(e => e.congestion_coeff || 0);
                }
                
                chart.update('none');
            };
        }
        
        // 创建全局函数引用
        (function() {
            const updateCongestionChartFn = getUpdateCongestionChart();
            if (!window.updateCongestionChart) {
                window.updateCongestionChart = updateCongestionChartFn;
            }
        })();
        
        // updateAllCharts 在 js/charts.js 模块中已声明，不能重新声明
        function getUpdateAllCharts() {
            if (window.updateAllCharts) {
                return window.updateAllCharts;
            }
            return function(data) {
                // 如果没有传递数据，使用全局变量
                const chartData = data || { vehicles: vehicles || [], edges: edges || [] };
                try {
                    if (typeof window.updateEfficiencyChart === 'function') {
                        window.updateEfficiencyChart(chartData.vehicles);
                    }
                } catch (err) {
                    logError('更新效率图表失败:', err);
                }
                try {
                    if (typeof window.updateVehicleTypeChart === 'function') {
                        window.updateVehicleTypeChart(chartData.vehicles);
                    }
                } catch (err) {
                    logError('更新车辆类型图表失败:', err);
                }
                try {
                    if (typeof window.updateCongestionChart === 'function') {
                        window.updateCongestionChart(chartData.edges);
                    }
                } catch (err) {
                    logError('更新拥堵图表失败:', err);
                }
            };
        }
        
        // 创建全局函数引用
        (function() {
            const updateAllChartsFn = getUpdateAllCharts();
            if (!window.updateAllCharts) {
                window.updateAllCharts = updateAllChartsFn;
            }
        })();

        // 初始化系统
        // 加载系统数据（不重置系统）
        async function loadSystemData() {
            log('开始加载系统数据...');
            
            try {
                // 获取路网信息（nodes, edges）
                await fetchRoads();
                // 获取车辆信息
                await fetchVehicles();
                // 获取监控数据
                await fetchMonitorData();
                // 获取车辆类型
                await fetchVehicleTypes();
                // 获取司机信息
                await fetchDrivers();
                // 获取地图背景
                await fetchMapBackground();
                // 获取地图文字框
                await fetchMapLabels();
                
                // 数据加载完成后更新图表
                if (typeof updateAllCharts === 'function') {
                    updateAllCharts({ vehicles: vehicles || [], edges: edges || [] });
                }
                
                // 检查调度状态，如果已经在运行，启动前端刷新
                const statusResult = await apiCall('/dispatch/status');
                if (statusResult.success && statusResult.dispatch_running && !window.dispatchInterval) {
                    // 调度已经在运行（可能是司机提交车辆自动启动的），启动前端刷新
                    window.dispatchInterval = setInterval(async () => {
                await fetchVehicles();
                await fetchMonitorData();
                requestRender();
                    }, 500);
                    
                    // 更新按钮状态
                    const startBtn = document.getElementById('start-dispatch');
                    if (startBtn) {
                        startBtn.textContent = '停止调度';
                        startBtn.style.background = '#e74c3c';
                    }
                }
                
                // 无论调度是否启动，都定期刷新车辆列表，以便看到新提交的车辆
                // 如果调度未运行，每5秒刷新一次；如果调度运行，由调度刷新处理（2秒）
                if (!window.vehicleRefreshInterval) {
                    window.vehicleRefreshInterval = setInterval(async () => {
                        // 如果调度未运行，定期刷新车辆列表
                        if (!window.dispatchInterval) {
                await fetchVehicles();
                await fetchMonitorData();
                requestRender();
                        }
                        // 如果调度正在运行，dispatchInterval 会处理刷新，这里不需要重复
                    }, 1500);
                }
                
                // 渲染地图
                try {
                        safeRenderMap();
                } catch (err) {
                    console.error('renderMap 执行出错:', err);
                }
                
                // 数据加载后，居中显示并调整地图尺寸以适应内容
                setTimeout(() => {
                    try {
                        centerMapContent(true); // 强制居中
                    } catch (err) {
                        logError('居中地图失败:', err);
                    }
                }, 300);
                
                log('系统数据加载成功');
                return true;
            } catch (error) {
                logError('系统数据加载失败:', error);
                return false;
            }
        }

        async function initializeSystem() {
            log('开始初始化系统（重置）...');

            const result = await apiCall('/initialize', {
                method: 'POST'
            });

            if (result.success) {
                // 初始化后加载数据
                await loadSystemData();
                log('系统初始化成功');
                return true;
            } else {
                logError('系统初始化失败');
                return false;
            }
        }

        // ========== 增强的错误处理模块 ==========
        
        // 错误类型枚举
        const ErrorType = {
            NETWORK: 'network',
            VALIDATION: 'validation',
            SERVER: 'server',
            UNKNOWN: 'unknown'
        };
        
        // 错误处理配置
        const errorConfig = {
            autoHide: true,
            hideDelay: 5000,
            maxErrors: 3, // 最多同时显示的错误数
            retryable: true // 是否显示重试按钮
        };
        
        // 错误队列管理
        const errorQueue = [];
        
        // 增强的错误显示函数
        
        // 错误处理包装器

        // 显示成功信息





        // 获取车辆列表
        async function fetchVehicles() {
            const result = await apiCall('/vehicles');
            if (result.success) {
                const newVehicles = result.vehicles || [];
                vehicles = newVehicles;
                updateVehicleList();
                safeRenderMap();
                
                // 调试信息
                if (newVehicles.length > 0) {
                    log(`获取到 ${newVehicles.length} 辆车`);
                    newVehicles.forEach(v => {
                        if (v.driver_id) {
                            log(`  - ${v.id} (司机: ${v.driver_name || v.driver_id}), 位置: (${v.current_position?.x}, ${v.current_position?.y}), 状态: ${v.status}`);
                        }
                    });
                }
            }
            return result.success;
        }

        // 获取监控数据
        async function fetchMonitorData() {
            const result = await apiCall('/monitor');
            if (result.success) {
                // 使用服务器返回的数据，完全覆盖本地初始化
                monitorData = result.monitor_data || {};
                // 也接收 work_zones，以便前端高亮显示
                monitorData.work_zones = result.work_zones || [];
                // 接收节点拥堵和道路状态
                monitorData.node_congestion = result.node_congestion || {};
                monitorData.edge_status = result.edge_status || {};
                monitorData.arrival_records = result.arrival_records || [];
                monitorData.route_time_stats = result.route_time_stats || {};
                monitorData.travel_time_database = result.travel_time_database || [];
                travelTimeRecords = monitorData.travel_time_database.slice();
                
                // 同步更新edges的拥堵系数（从服务器数据）
                if (monitorData.edge_congestion) {
                    edges.forEach(edge => {
                        if (monitorData.edge_congestion.hasOwnProperty(edge.id)) {
                            edge.congestion_coeff = monitorData.edge_congestion[edge.id];
                        }
                    });
                }
                
                updateMonitorData();
                renderTravelTimeDatabase();
                
                // 更新图表
                if (typeof updateAllCharts === 'function') {
                    updateAllCharts({ vehicles: vehicles || [], edges: edges || [] });
                }
            }
            return result.success;
        }

        async function fetchTravelTimeDatabase(limit = 200) {
            const result = await apiCall(`/travel-time-database?limit=${limit}`);
            if (result.success) {
                travelTimeRecords = result.records || [];
                renderTravelTimeDatabase();
            }
            return result.success;
        }

        async function exportTravelTimeDatabase() {
            const result = await apiCall('/travel-time-database/export');
            if (!result.success) {
                showError(result.message || '导出失败，请稍后重试');
                return false;
            }
            const records = result.records || [];
            const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.href = url;
            link.download = `travel_time_database_${timestamp}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            showSuccess(`已导出 ${records.length} 条记录`);
            return true;
        }

        async function exportTravelTimeDatabaseExcel() {
            try {
                const apiBase = window.API_BASE || 'http://localhost:5000/api';
                const response = await fetch(`${apiBase}/travel-time-database/export?format=excel`);
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                link.href = url;
                link.download = `travel_time_database_${timestamp}.xlsx`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                showSuccess('Excel 文件已下载');
                return true;
            } catch (error) {
                logError('导出 Excel 失败:', error);
                showError(`导出 Excel 失败: ${error.message || error}`);
                return false;
            }
        }

        async function handleTravelDbFileChange(event) {
            const file = event.target?.files?.[0];
            if (!file) {
                return;
            }
            try {
                const modeSelect = document.getElementById('travel-db-import-mode');
                const mode = modeSelect ? modeSelect.value : 'append';

                const fileName = file.name ? file.name.toLowerCase() : '';
                const isExcel = fileName.endsWith('.xlsx');

                if (isExcel) {
                    const formData = new FormData();
                    formData.append('file', file, file.name);
                    formData.append('mode', mode);
                    const apiBase = window.API_BASE || 'http://localhost:5000/api';
                    const response = await fetch(`${apiBase}/travel-time-database/import`, {
                        method: 'POST',
                        body: formData
                    });
                    const result = await response.json();
                    if (response.ok && result.success) {
                        showSuccess(result.message || `导入成功，共 ${result.total_count || ''} 条记录`);
                        await fetchTravelTimeDatabase();
                        await fetchMonitorData();
                    } else {
                        throw new Error(result.message || `HTTP ${response.status}: 导入失败`);
                    }
                } else {
                    const text = await file.text();
                    let parsed;
                    try {
                        parsed = JSON.parse(text);
                    } catch (err) {
                        throw new Error('文件不是有效的 JSON');
                    }

                    let records = [];
                    if (Array.isArray(parsed)) {
                        records = parsed;
                    } else if (parsed && typeof parsed === 'object') {
                        if (Array.isArray(parsed.records)) {
                            records = parsed.records;
                        } else if (Array.isArray(parsed.data)) {
                            records = parsed.data;
                        }
                    }

                    if (!Array.isArray(records) || records.length === 0) {
                        throw new Error('文件中未找到有效的 records 列表');
                    }

                    const result = await apiCall('/travel-time-database/import', {
                        method: 'POST',
                        body: JSON.stringify({
                            mode,
                            records
                        })
                    });

                    if (result.success) {
                        showSuccess(result.message || `导入成功，共 ${records.length} 条记录`);
                        await fetchTravelTimeDatabase();
                        await fetchMonitorData();
                    } else {
                        throw new Error(result.message || '导入失败');
                    }
                }

            } catch (err) {
                logError('导入行驶时间数据库失败:', err);
                showError(`导入失败: ${err.message || err}`);
            } finally {
                event.target.value = '';
            }
        }

        function renderTravelTimeDatabase(records = travelTimeRecords) {
            const summaryEl = document.getElementById('travel-db-summary');
            const tbody = document.getElementById('travel-db-tbody');
            if (!summaryEl || !tbody) {
                return;
            }

            if (!records || records.length === 0) {
                summaryEl.innerHTML = '暂无数据';
                tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 12px;">暂无数据</td></tr>';
                return;
            }

            const totalCount = records.length;
            const totalDuration = records.reduce((sum, rec) => sum + (parseFloat(rec.duration_minutes) || 0), 0);
            const totalDistance = records.reduce((sum, rec) => sum + (parseFloat(rec.distance_m) || 0), 0);
            const speedValues = records
                .map(rec => parseFloat(rec.average_speed_kmph))
                .filter(value => !Number.isNaN(value) && value > 0);

            const avgDuration = totalCount > 0 ? (totalDuration / totalCount) : 0;
            const avgSpeed = speedValues.length > 0
                ? speedValues.reduce((sum, value) => sum + value, 0) / speedValues.length
                : 0;

            summaryEl.innerHTML = `
                <strong>记录总数:</strong> ${totalCount} 条<br>
                <strong>平均耗时:</strong> ${avgDuration ? avgDuration.toFixed(2) + ' 分钟' : '-'}<br>
                <strong>平均速度:</strong> ${avgSpeed ? avgSpeed.toFixed(2) + ' km/h' : '-'}<br>
                <strong>累计距离:</strong> ${formatDistance(totalDistance)}
            `;

            const displayRecords = records.slice(-100).reverse();
            tbody.innerHTML = displayRecords.map(record => {
                const driverLabel = escapeHtml(record.driver_name || record.driver_id || '-');
                const vehicleType = escapeHtml(record.vehicle_type || '-');
                const routeLabel = `${escapeHtml(record.start_node || '-')} → ${escapeHtml(record.target_node || '-')}`;
                const durationValue = parseFloat(record.duration_minutes);
                const durationLabel = Number.isFinite(durationValue)
                    ? durationValue.toFixed(2)
                    : '-';
                const distanceLabel = formatDistance(record.distance_m);
                const avgSpeedLabel = formatSpeed(record.average_speed_kmph);
                const speedSettingLabel = formatSpeed(record.custom_speed_kmph || record.speed_setting_kmph);
                const startTimeLabel = formatDateTime(record.start_time);
                const arrivalTimeLabel = formatDateTime(record.arrival_time);
                const nodeCount = (record.path_nodes && record.path_nodes.length)
                    || record.path_edge_count
                    || (record.path_edges && record.path_edges.length)
                    || '-';
                const extras = [];
                if (record.custom_speed_source === 'driver_input') {
                    extras.push('<span class="travel-db-tag">司机自定义</span>');
                }
                if (record.source) {
                    extras.push(`<span class="travel-db-tag">${escapeHtml(record.source)}</span>`);
                }
                return `
                    <tr>
                        <td>${driverLabel}${extras.length ? `<div>${extras.join('')}</div>` : ''}</td>
                        <td>${vehicleType}</td>
                        <td>${routeLabel}</td>
                        <td>${durationLabel}</td>
                        <td>${distanceLabel}</td>
                        <td>${avgSpeedLabel}</td>
                        <td>${speedSettingLabel}</td>
                        <td>${startTimeLabel}</td>
                        <td>${arrivalTimeLabel}</td>
                        <td>${nodeCount}</td>
                    </tr>
                `;
            }).join('');
        }

        // 获取路网信息
        async function fetchRoads() {
            const result = await apiCall('/roads');
            if (result.success) {
                nodes = result.nodes || [];
                edges = result.edges || [];
                directionTypes = result.direction_types || defaultDirectionTypes;
                updateNodeSelects();
                updateNodeList();
                updateRoadInfo();
                updateCongestionEdgeSelect(); // 更新拥堵道路选择框
                updateDirectionEdgeSelect(); // 新增：更新方向道路选择框
                safeRenderMap();
            }
            return result.success;
        }

        async function fetchDqnStatus(showToast = false) {
            const statusTextEl = document.getElementById('dqn-status-text');
            const statusHintEl = document.getElementById('dqn-status-hint');
            if (!statusTextEl || !statusHintEl) {
                return false;
            }
            const card = document.getElementById('dqn-status-card');
            if (card) {
                card.classList.remove('available', 'unavailable', 'trained');
            }
            const result = await apiCall('/dqn/status');
            if (result.success) {
                const availability = result.available ? '可用' : '不可用';
                const trained = result.trained ? '已训练' : '未训练';
                statusTextEl.textContent = `${availability} / ${trained}`;
                statusHintEl.textContent = result.available
                    ? (result.trained
                        ? `模型设备：${result.device || 'cpu'}，可直接规划。`
                        : '模型尚未训练，请先点击"开始训练"。')
                    : 'PyTorch 未安装（可选功能）。DQN AI 路径规划需要 PyTorch，但不影响其他功能使用。如需安装，请参考部署文档。';
                if (card) {
                    card.classList.add(result.available ? 'available' : 'unavailable');
                    if (result.trained) {
                        card.classList.add('trained');
                    }
                }
                if (showToast) {
                    showSuccess(`DQN 状态：${availability} / ${trained}`);
                }
                return true;
            }
            statusTextEl.textContent = '查询失败';
            statusHintEl.textContent = result.message || '请检查后端服务';
            return false;
        }

        async function trainDqnModel() {
            const statusEl = document.getElementById('dqn-train-result');
            if (statusEl) {
                statusEl.textContent = '训练中...';
            }
            const epochs = parseInt(document.getElementById('dqn-epochs')?.value || '5', 10);
            const batchSize = parseInt(document.getElementById('dqn-batch')?.value || '64', 10);
            const gammaValue = parseFloat(document.getElementById('dqn-gamma')?.value || '0.95');
            const payload = {
                epochs: Number.isNaN(epochs) ? 5 : epochs,
                batch_size: Number.isNaN(batchSize) ? 64 : batchSize,
                gamma: Number.isNaN(gammaValue) ? 0.95 : gammaValue
            };
            try {
                const result = await apiCall('/dqn/train', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                if (result.success) {
                    const metrics = result.metrics || {};
                    if (statusEl) {
                        statusEl.textContent = `训练完成：${metrics.epochs || payload.epochs} 轮，样本 ${metrics.samples || '-'}，平均损失 ${metrics.avg_loss?.toFixed ? metrics.avg_loss.toFixed(4) : metrics.avg_loss || '-'}`;
                    }
                    await fetchDqnStatus();
                } else {
                    if (statusEl) {
                        statusEl.textContent = `训练失败：${result.message || '未知错误'}`;
                    }
                    // 如果是 PyTorch 未安装的错误，显示更友好的提示
                    if (result.message && result.message.includes('PyTorch')) {
                        showError('PyTorch 未安装。DQN 功能需要安装 PyTorch，但这是可选功能，不影响其他功能使用。如需使用 AI 路径规划，请参考部署文档安装 PyTorch。');
                    } else {
                        showError(result.message || 'DQN 训练失败');
                    }
                }
            } catch (error) {
                if (statusEl) {
                    statusEl.textContent = `训练失败：${error.message || '网络错误'}`;
                }
                // 如果是 PyTorch 相关的错误，显示友好提示
                if (error.message && error.message.includes('PyTorch')) {
                    showError('PyTorch 未安装。DQN 功能是可选功能，不影响其他功能使用。');
                } else {
                    showError(error.message || 'DQN 训练失败');
                }
            }
        }

        function formatRouteEdges(edges) {
            if (!edges || edges.length === 0) {
                return '-';
            }
            return edges.map((edge, index) => {
                const startName = getNodeName(edge.start_node);
                const endName = getNodeName(edge.end_node);
                const lengthLabel = edge.length_m ? `${edge.length_m.toFixed ? edge.length_m.toFixed(1) : edge.length_m}m` : '-';
                const congestion = edge.congestion_coeff ? edge.congestion_coeff.toFixed(2) : '1.0';
                return `${index + 1}. ${startName} → ${endName} | 长度 ${lengthLabel} | 拥堵 ${congestion}`;
            }).join('<br>');
        }

        async function runDqnRoutePlanner() {
            const outputEl = document.getElementById('dqn-route-output');
            if (outputEl) {
                outputEl.innerHTML = '规划中...';
            }
            const startNode = document.getElementById('dqn-start-node')?.value;
            const targetNode = document.getElementById('dqn-target-node')?.value;
            const epsilon = parseFloat(document.getElementById('dqn-epsilon')?.value || '0');
            if (!startNode || !targetNode) {
                showError('请选择 DQN 路径的起点与终点');
                if (outputEl) {
                    outputEl.textContent = '请选择节点';
                }
                return;
            }
            if (startNode === targetNode) {
                showError('起点与终点不能相同');
                if (outputEl) {
                    outputEl.textContent = '节点重复';
                }
                return;
            }
            const payload = {
                start_node: startNode,
                target_node: targetNode,
                epsilon: Number.isNaN(epsilon) ? 0 : epsilon
            };
            const result = await apiCall('/dqn/route', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            if (result.success) {
                const planner = result.planner || 'dqn';
                const edgesList = result.route_edges || [];
                if (outputEl) {
                    outputEl.innerHTML = `
                        规划方式：${planner.toUpperCase()}<br>
                        道路数：${result.edge_count || edgesList.length}<br>
                        路径：<br>${formatRouteEdges(edgesList)}
                    `;
                }
                // 若DQN成功则渲染高亮
                if (edgesList.length > 0) {
                    renderCustomRouteOverlay(edgesList, planner === 'dqn');
                } else {
                    safeRenderMap();
                }
            } else {
                if (outputEl) {
                    outputEl.textContent = result.message || '调用失败';
                }
                showError(result.message || 'DQN 路径规划失败');
            }
        }

        function renderCustomRouteOverlay(edgesList, highlight = false) {
            const map = document.getElementById('map');
            if (!map) return;
            // 先清除旧的 overlay
            const existing = map.querySelectorAll('.dqn-route-overlay');
            existing.forEach(el => el.remove());
            edgesList.forEach(edge => {
                const startNode = nodes.find(n => n.id === edge.start_node);
                const endNode = nodes.find(n => n.id === edge.end_node);
                if (!startNode || !endNode) return;
                const dx = endNode.x - startNode.x;
                const dy = endNode.y - startNode.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                const el = document.createElement('div');
                el.className = 'path dqn-route-overlay';
                el.style.width = `${length}px`;
                el.style.left = `${startNode.x}px`;
                el.style.top = `${startNode.y}px`;
                el.style.transform = `rotate(${angle}deg)`;
                el.style.height = highlight ? '8px' : '5px';
                el.style.background = highlight ? '#8e44ad' : '#3498db';
                el.style.opacity = '0.85';
                el.style.zIndex = '27';
                map.appendChild(el);
            });
        }

        // 新增：获取车辆类型配置
        async function fetchVehicleTypes() {
            const result = await apiCall('/vehicle-types');
            if (result.success) {
                vehicleTypes = result.vehicle_types || {};
                Object.keys(vehicleTypes).forEach(type => {
                    const cfg = vehicleTypes[type] || {};
                    cfg.speed_kmph = getVehicleSpeed(cfg);
                    vehicleTypes[type] = cfg;
                });
                updateVehicleTypesList();
                updateVehicleTypeSelect();
            }
            return result.success;
        }

        async function fetchDrivers(selectedDriverId = null) {
            const result = await apiCall('/drivers');
            if (result.success) {
                drivers = {};
                (result.drivers || []).forEach(driver => {
                    // 后端返回的司机对象使用 'id' 字段，不是 'driver_id'
                    const driverId = driver.id || driver.driver_id;
                    if (driverId) {
                        drivers[driverId] = driver;
                    }
                });
                driverRoutes = result.driver_routes || {};

                if (selectedDriverId && drivers[selectedDriverId]) {
                    activeDriverId = selectedDriverId;
                    populateDriverForm(drivers[selectedDriverId]);
                } else if (activeDriverId && drivers[activeDriverId]) {
                    populateDriverForm(drivers[activeDriverId]);
                } else if (Object.keys(drivers).length > 0) {
                    activeDriverId = Object.keys(drivers)[0];
                    populateDriverForm(drivers[activeDriverId]);
                }

                updateDriverSummary();
                updateDriverHistory();
            }
            return result.success;
        }

        function populateDriverForm(driver) {
            if (!driver) return;
            const idInput = document.getElementById('driver-id');
            const nameInput = document.getElementById('driver-name');
            const licensePlateInput = document.getElementById('driver-license-plate');
            const typeSelect = document.getElementById('driver-vehicle-type');
            const weightInput = document.getElementById('driver-weight');
            const widthInput = document.getElementById('driver-width');
            const contactInput = document.getElementById('driver-contact');
            const startSelect = document.getElementById('driver-start-node');
            const targetSelect = document.getElementById('driver-target-node');

            // 后端返回的司机对象使用 'id' 字段，不是 'driver_id'
            const driverId = driver.id || driver.driver_id || '';
            if (idInput) idInput.value = driverId;
            if (nameInput) nameInput.value = driver.name || '';
            if (licensePlateInput) licensePlateInput.value = driver.license_plate || '';
            if (typeSelect && driver.vehicle_type) typeSelect.value = driver.vehicle_type;
            if (weightInput && driver.weight !== undefined) weightInput.value = driver.weight;
            if (widthInput && driver.width !== undefined) widthInput.value = driver.width;
            if (contactInput) contactInput.value = driver.phone || driver.contact || '';
            if (startSelect && driver.default_start_node) startSelect.value = driver.default_start_node;
            if (targetSelect && driver.default_target_node) targetSelect.value = driver.default_target_node;

            const historyList = driverRoutes[driverId] || [];
            if (historyList.length) {
                renderDriverRouteResult(historyList[historyList.length - 1]);
            }
        }
        
        // 更新司机列表显示
        function updateDriverList() {
            const listEl = document.getElementById('driver-list');
            if (!listEl) return;
            
            const driverArray = Object.values(drivers);
            if (driverArray.length === 0) {
                listEl.innerHTML = '<div class="loading">暂无已注册司机</div>';
                return;
            }
            
            listEl.innerHTML = '';
            driverArray.forEach(driver => {
                const driverId = driver.id || driver.driver_id || '未知';
                const item = document.createElement('div');
                item.className = 'node-item';
                item.style.cssText = 'cursor:pointer;padding:10px;margin-bottom:5px;border:1px solid #ddd;border-radius:5px;display:flex;justify-content:space-between;align-items:flex-start;gap:8px;';
                
                const infoDiv = document.createElement('div');
                infoDiv.className = 'node-item-info';
                infoDiv.style.flex = '1';
                infoDiv.innerHTML = `
                    <strong>${escapeHtml(driver.name || driverId)}</strong> <span style="color:#888;font-size:12px;">(ID: ${escapeHtml(driverId)})</span><br>
                    ${driver.license_plate ? `<span style="color:#3498db;">车牌: ${escapeHtml(driver.license_plate)}</span><br>` : ''}
                    ${driver.phone || driver.contact ? `<span style="color:#27ae60;">电话: ${escapeHtml(driver.phone || driver.contact)}</span><br>` : ''}
                    <span style="color:#7f8c8d;font-size:12px;">车辆类型: ${escapeHtml(driver.vehicle_type || '未设置')}</span>
                `;
                infoDiv.addEventListener('click', () => showDriverDetail(driver));

                const delBtn = document.createElement('button');
                delBtn.textContent = '删除';
                delBtn.title = `删除司机 ${driver.name || driverId}`;
                delBtn.style.cssText = 'background:#e74c3c;color:#fff;border:none;border-radius:4px;padding:4px 10px;font-size:12px;cursor:pointer;flex-shrink:0;white-space:nowrap;line-height:1.6;';
                delBtn.addEventListener('mouseenter', () => { delBtn.style.background = '#c0392b'; });
                delBtn.addEventListener('mouseleave', () => { delBtn.style.background = '#e74c3c'; });
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteDriver(driverId, driver.name || driverId);
                });

                item.appendChild(infoDiv);
                item.appendChild(delBtn);
                listEl.appendChild(item);
            });
        }

        // 删除司机
        async function deleteDriver(driverId, driverName) {
            const confirmed = confirm(`确认删除司机「${driverName}」(${driverId}) ？\n\n该司机将从系统中注销，地图上的关联车辆也将同步移除。`);
            if (!confirmed) return;

            const result = await apiCall(`/drivers/${encodeURIComponent(driverId)}`, { method: 'DELETE' });
            if (result.success) {
                showSuccess(result.message || `司机 ${driverId} 已删除`);
                // 如果删除的是当前活跃司机，清空活跃状态
                if (activeDriverId === driverId) {
                    activeDriverId = null;
                }
                // 刷新司机列表和车辆列表
                await fetchDrivers();
                await fetchVehicles();
                safeRenderMap();
            } else {
                showError(result.message || `删除司机 ${driverId} 失败`);
            }
        }
        
        // 显示司机详细信息
        function showDriverDetail(driver) {
            const modal = document.getElementById('driver-detail-modal');
            const content = document.getElementById('driver-detail-content');
            if (!modal || !content) return;
            
            const driverId = driver.id || driver.driver_id || '未知';
            const routes = driverRoutes[driverId] || [];
            const lastActive = driver.last_active ? new Date(driver.last_active).toLocaleString('zh-CN') : '未知';
            const registeredAt = driver.registered_at ? new Date(driver.registered_at).toLocaleString('zh-CN') : '未知';
            
            content.innerHTML = `
                <div style="line-height: 1.8;">
                    <p><strong>司机ID:</strong> ${driverId}</p>
                    <p><strong>姓名:</strong> ${driver.name || '未设置'}</p>
                    <p><strong>车牌号:</strong> ${driver.license_plate || '未设置'}</p>
                    <p><strong>联系电话:</strong> ${driver.phone || driver.contact || '未设置'}</p>
                    <p><strong>车辆类型:</strong> ${driver.vehicle_type || '未设置'}</p>
                    <p><strong>载重:</strong> ${driver.weight || 20} 吨</p>
                    <p><strong>宽度:</strong> ${driver.width || 3} 米</p>
                    ${driver.custom_speed_kmph ? `<p><strong>自定义速度:</strong> ${driver.custom_speed_kmph} km/h</p>` : ''}
                    ${driver.default_start_node ? `<p><strong>默认起点:</strong> ${getNodeName(driver.default_start_node)}</p>` : ''}
                    ${driver.default_target_node ? `<p><strong>默认终点:</strong> ${getNodeName(driver.default_target_node)}</p>` : ''}
                    <p><strong>注册时间:</strong> ${registeredAt}</p>
                    <p><strong>最后活跃:</strong> ${lastActive}</p>
                    <p><strong>历史路线数:</strong> ${routes.length} 条</p>
                    ${driver.active_vehicle_id ? `<p><strong>当前车辆:</strong> ${driver.active_vehicle_id}</p>` : ''}
                </div>
                ${routes.length > 0 ? `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                        <strong>最近路线:</strong>
                        <div style="max-height: 200px; overflow-y: auto; margin-top: 10px;">
                            ${routes.slice(-5).reverse().map(route => `
                                <div style="padding: 8px; margin-bottom: 5px; background: #f5f5f5; border-radius: 3px;">
                                    <strong>${getNodeName(route.start_node)} → ${getNodeName(route.target_node)}</strong><br>
                                    <span style="font-size: 12px; color: #666;">
                                        时间: ${route.requested_at ? new Date(route.requested_at).toLocaleString('zh-CN') : '未知'} | 
                                        预计: ${route.estimated_minutes ? route.estimated_minutes + ' 分钟' : '计算中'}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            `;
            
            modal.style.display = 'flex';
        }

        function updateDriverSummary() {
            const summaryEl = document.getElementById('driver-summary');
            if (!summaryEl) return;
            const total = Object.keys(drivers).length;
            const currentDriver = activeDriverId && drivers[activeDriverId] ? drivers[activeDriverId].name : '未选择';
            summaryEl.innerHTML = `
                <strong>已注册司机:</strong> ${total} 人<br>
                <span class="vehicle-info">当前司机: ${currentDriver}</span>
            `;
            // 更新司机列表
            updateDriverList();
        }

        function updateDriverHistory() {
            const historyEl = document.getElementById('driver-route-history');
            if (!historyEl) return;

            const driverId = activeDriverId || (document.getElementById('driver-id') ? document.getElementById('driver-id').value : null);
            const historyList = driverId ? (driverRoutes[driverId] || []) : [];

            historyEl.innerHTML = '';
            if (!historyList.length) {
                historyEl.innerHTML = '<div class="loading">尚无历史记录</div>';
                return;
            }

            historyList.slice().reverse().forEach(route => {
                const item = document.createElement('div');
                item.className = 'node-item';
                const pathNodes = (route.path_nodes || []).map(n => n.name).join(' → ');
                const efficiency = route.efficiency_score !== undefined && route.efficiency_score !== null
                    ? route.efficiency_score.toFixed(1)
                    : 'N/A';
                const estimate = route.estimated_minutes ? `${route.estimated_minutes} 分钟` : '计算中';
                item.innerHTML = `
                    <div class="node-item-info">
                        <strong>${getNodeName(route.start_node)} → ${getNodeName(route.target_node)}</strong><br>
                        <span class="vehicle-info">车辆类型: ${route.vehicle_type} | 预计耗时: ${estimate} | 效率: ${efficiency}</span><br>
                        <span class="vehicle-info">${route.requested_at || ''}</span><br>
                        <span class="vehicle-info">路径: ${pathNodes || '未生成'}</span>
                    </div>
                `;
                historyEl.appendChild(item);
            });
        }

        function renderDriverRouteResult(route) {
            const resultEl = document.getElementById('driver-route-result');
            if (!resultEl) return;

            if (!route) {
                resultEl.innerHTML = '<div class="vehicle-info">尚未进行路线规划</div>';
                return;
            }

            const efficiency = route.efficiency_score !== undefined && route.efficiency_score !== null
                ? route.efficiency_score.toFixed(1)
                : 'N/A';
            const estimate = route.estimated_minutes ? `${route.estimated_minutes} 分钟` : '计算中';
            const pathNodes = (route.path_nodes || []).map(n => n.name).join(' → ');

            resultEl.innerHTML = `
                <strong>${getNodeName(route.start_node)}</strong> → <strong>${getNodeName(route.target_node)}</strong><br>
                车辆类型: ${route.vehicle_type} | 预计耗时: ${estimate} | 效率: ${efficiency}<br>
                路径: ${pathNodes || '未生成'}<br>
                <span class="vehicle-info">更新时间: ${route.requested_at || ''}</span>
            `;
        }

        async function registerDriverInfo() {
            const driverId = (document.getElementById('driver-id')?.value || '').trim();
            if (!driverId) {
                alert('请输入司机ID');
                return;
            }

            const payload = {
                driver_id: driverId,
                name: (document.getElementById('driver-name')?.value || '').trim(),
                license_plate: (document.getElementById('driver-license-plate')?.value || '').trim(),
                phone: (document.getElementById('driver-contact')?.value || '').trim(),
                contact: (document.getElementById('driver-contact')?.value || '').trim(),  // 兼容字段
                vehicle_type: document.getElementById('driver-vehicle-type')?.value,
                weight: parseFloat(document.getElementById('driver-weight')?.value || '20'),
                width: parseFloat(document.getElementById('driver-width')?.value || '3'),
                default_start_node: document.getElementById('driver-start-node')?.value,
                default_target_node: document.getElementById('driver-target-node')?.value
            };

            const result = await apiCall('/drivers', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            if (result.success) {
                // 后端返回的司机对象使用 'id' 字段，不是 'driver_id'
                activeDriverId = result.driver.id || result.driver.driver_id || driverId;
                showSuccess(result.message || '司机信息更新成功');
                await fetchDrivers(activeDriverId);
            } else {
                showError(result.message || '司机信息更新失败');
            }
        }

        async function previewDriverRoute() {
            const driverId = (document.getElementById('driver-id')?.value || '').trim();
            if (!driverId) {
                alert('请先输入司机ID并完成注册');
                return;
            }

            const startNode = document.getElementById('driver-start-node')?.value;
            const targetNode = document.getElementById('driver-target-node')?.value;

            if (!startNode) {
                alert('请选择起点节点');
                return;
            }
            if (!targetNode) {
                alert('请选择目标节点');
                return;
            }
            if (startNode === targetNode) {
                alert('起点和目标节点不能相同');
                return;
            }

            const payload = {
                start_node: startNode,
                target_node: targetNode,
                vehicle_type: document.getElementById('driver-vehicle-type')?.value,
                weight: parseFloat(document.getElementById('driver-weight')?.value || '20'),
                width: parseFloat(document.getElementById('driver-width')?.value || '3')
            };

            const result = await apiCall(`/drivers/${driverId}/route-preview`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            if (result.success) {
                activeDriverId = driverId;
                renderDriverRouteResult(result.route);
                await fetchDrivers(activeDriverId);
                // 重新渲染地图以显示司机规划的路线
                safeRenderMap();
            } else {
                showError(result.message || '路线规划失败');
            }
        }

        // 添加车辆
        async function addVehicleToBackend(vehicleData) {
            log('添加车辆:', vehicleData);

            const result = await apiCall('/vehicles', {
                method: 'POST',
                body: JSON.stringify(vehicleData)
            });

            if (result.success) {
                await fetchVehicles();
                return true;
            } else {
                showError(result.message || '添加车辆失败');
                return false;
            }
        }

        // 开始调度
        async function startDispatchBackend() {
            const result = await apiCall('/dispatch/start', {
                method: 'POST'
            });

            if (result.success) {
                log('调度开始');
                return true;
            } else {
                showError(result.message || '启动调度失败');
                return false;
            }
        }

        // 停止调度
        async function stopDispatchBackend() {
            const result = await apiCall('/dispatch/stop', {
                method: 'POST'
            });

            if (result.success) {
                log('调度停止');
                return true;
            } else {
                showError(result.message || '停止调度失败');
                return false;
            }
        }

        // 添加节点
        async function addNodeToBackend(nodeData) {
            const result = await apiCall('/nodes', {
                method: 'POST',
                body: JSON.stringify(nodeData)
            });

            if (result.success) {
                await fetchRoads();
                return true;
            } else {
                showError(result.message || '添加节点失败');
                return false;
            }
        }

        // 删除节点
        async function deleteNodeFromBackend(nodeId) {
            const result = await apiCall(`/nodes/${nodeId}`, {
                method: 'DELETE'
            });

            if (result.success) {
                await fetchRoads();
                return true;
            } else {
                showError(result.message || '删除节点失败');
                return false;
            }
        }

        // 添加道路
        async function addEdgeToBackend(edgeData) {
            const result = await apiCall('/edges', {
                method: 'POST',
                body: JSON.stringify(edgeData)
            });

            if (result.success) {
                await fetchRoads();
                return true;
            } else {
                showError(result.message || '添加道路失败');
                return false;
            }
        }

        // 重置系统
        async function resetSystemBackend() {
            const result = await apiCall('/system/reset', {
                method: 'POST'
            });

            if (result.success) {
                await initializeSystem();
                return true;
            } else {
                showError(result.message || '系统重置失败');
                return false;
            }
        }

        // 手动重算路径（全部或传入 affected）
        async function manualReroute(affectedEdges = null) {
            const body = affectedEdges ? { affected_edges: affectedEdges } : {};
            const result = await apiCall('/reroute', {
                method: 'POST',
                body: JSON.stringify(body)
            });
            if (result.success) {
                log('手动重算已完成:', result.updated_vehicles);
                await fetchVehicles();
                await fetchMonitorData();
            } else {
                showError('重算路径失败');
            }
        }

        // 设置道路拥堵状态的函数
        async function setEdgeCongestion(edgeId, congested) {
            const result = await apiCall(`/edges/${edgeId}/congestion`, {
                method: 'POST',
                body: JSON.stringify({ congested: congested })
            });

            if (result.success) {
                await fetchRoads();
                await fetchMonitorData();
                safeRenderMap();
                showSuccess(result.message);
            } else {
                showError(result.message || '设置道路拥堵状态失败');
            }
        }

        // 新增：设置节点拥堵状态
        // GPS校准对话框
        async function showGpsCalibrationDialog(nodeId) {
            // 获取节点信息
            const node = nodes.find(n => n.id === nodeId);
            if (!node) {
                alert('节点不存在');
                return;
            }

            // 创建对话框
            const dialog = document.createElement('div');
            dialog.id = 'gps-calibration-dialog';
            dialog.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 20000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            `;

            const content = document.createElement('div');
            content.style.cssText = `
                background: white;
                border-radius: 10px;
                padding: 25px;
                max-width: 450px;
                width: 100%;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                max-height: 90vh;
                overflow-y: auto;
            `;

            const hasGps = node.latitude !== undefined && node.latitude !== null && 
                          node.longitude !== undefined && node.longitude !== null;

            content.innerHTML = `
                <h3 style="margin-top: 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                    📍 GPS坐标校准
                </h3>
                <div style="margin-bottom: 15px; padding: 10px; background: #ecf0f1; border-radius: 6px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">节点信息:</div>
                    <div style="font-size: 14px; color: #555;">
                        <strong>名称:</strong> ${node.name}<br>
                        <strong>ID:</strong> ${node.id}<br>
                        <strong>类型:</strong> ${node.type || '未知'}
                    </div>
                </div>
                ${hasGps ? `
                    <div style="margin-bottom: 15px; padding: 10px; background: #d5f4e6; border-left: 4px solid #27ae60; border-radius: 4px;">
                        <div style="font-weight: bold; color: #27ae60; margin-bottom: 5px;">当前GPS坐标:</div>
                        <div style="font-size: 14px; color: #555;">
                            纬度: ${node.latitude.toFixed(2)}<br>
                            经度: ${node.longitude.toFixed(2)}
                        </div>
                    </div>
                ` : `
                    <div style="margin-bottom: 15px; padding: 10px; background: #fadbd8; border-left: 4px solid #e74c3c; border-radius: 4px;">
                        <div style="font-weight: bold; color: #e74c3c; margin-bottom: 5px;">⚠️ 未设置GPS坐标</div>
                        <div style="font-size: 13px; color: #555;">
                            请为节点设置GPS坐标以启用定位功能
                        </div>
                    </div>
                `}
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #2c3e50;">
                        纬度 (Latitude) <span style="color: #e74c3c;">*</span>
                    </label>
                    <input 
                        type="number" 
                        id="gps-latitude-input" 
                        step="0.01" 
                        min="-90" 
                        max="90"
                        value="${hasGps ? node.latitude.toFixed(2) : ''}"
                        placeholder="例如: 39.90"
                        style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                    >
                    <div style="font-size: 11px; color: #7f8c8d; margin-top: 5px;">
                        范围: -90.00 到 90.00，精度保留两位小数
                    </div>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #2c3e50;">
                        经度 (Longitude) <span style="color: #e74c3c;">*</span>
                    </label>
                    <input 
                        type="number" 
                        id="gps-longitude-input" 
                        step="0.01" 
                        min="-180" 
                        max="180"
                        value="${hasGps ? node.longitude.toFixed(2) : ''}"
                        placeholder="例如: 116.40"
                        style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                    >
                    <div style="font-size: 11px; color: #7f8c8d; margin-top: 5px;">
                        范围: -180.00 到 180.00，精度保留两位小数
                    </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button 
                        id="gps-get-location-btn"
                        style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold; flex: 1;"
                    >
                        📍 获取当前位置
                    </button>
                    <button 
                        id="gps-cancel-btn"
                        style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;"
                    >
                        取消
                    </button>
                    <button 
                        id="gps-save-btn"
                        style="padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;"
                    >
                        保存
                    </button>
                </div>
            `;

            dialog.appendChild(content);
            document.body.appendChild(dialog);

            // 获取当前位置按钮
            const getLocationBtn = document.getElementById('gps-get-location-btn');
            if (getLocationBtn && navigator.geolocation) {
                getLocationBtn.addEventListener('click', () => {
                    getLocationBtn.disabled = true;
                    getLocationBtn.textContent = '定位中...';
                    
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latInput = document.getElementById('gps-latitude-input');
                            const lonInput = document.getElementById('gps-longitude-input');
                            if (latInput) latInput.value = position.coords.latitude.toFixed(2);
                            if (lonInput) lonInput.value = position.coords.longitude.toFixed(2);
                            getLocationBtn.disabled = false;
                            getLocationBtn.textContent = '📍 获取当前位置';
                            showSuccess('GPS位置已获取');
                        },
                        (error) => {
                            let errorMsg = '定位失败';
                            switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    errorMsg = '定位权限被拒绝';
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    errorMsg = '位置信息不可用';
                                    break;
                                case error.TIMEOUT:
                                    errorMsg = '定位超时';
                                    break;
                            }
                            alert(errorMsg);
                            getLocationBtn.disabled = false;
                            getLocationBtn.textContent = '📍 获取当前位置';
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 0
                        }
                    );
                });
            } else if (getLocationBtn) {
                getLocationBtn.style.display = 'none';
            }

            // 保存按钮
            document.getElementById('gps-save-btn').addEventListener('click', async () => {
                const latInput = document.getElementById('gps-latitude-input');
                const lonInput = document.getElementById('gps-longitude-input');
                
                const latitude = parseFloat(latInput.value);
                const longitude = parseFloat(lonInput.value);
                
                // 验证输入
                if (isNaN(latitude) || isNaN(longitude)) {
                    alert('请输入有效的GPS坐标');
                    return;
                }
                
                if (latitude < -90 || latitude > 90) {
                    alert('纬度必须在-90到90之间');
                    return;
                }
                
                if (longitude < -180 || longitude > 180) {
                    alert('经度必须在-180到180之间');
                    return;
                }
                
                // 保留两位小数
                const latRounded = Math.round(latitude * 100) / 100;
                const lonRounded = Math.round(longitude * 100) / 100;
                
                try {
                    const result = await apiCall(`/nodes/${nodeId}/gps`, {
                        method: 'POST',
                        body: JSON.stringify({
                            latitude: latRounded,
                            longitude: lonRounded
                        })
                    });
                    
                    if (result.success) {
                        showSuccess(`节点 ${nodeId} GPS坐标已设置: (${latRounded.toFixed(2)}, ${lonRounded.toFixed(2)})`);
                        dialog.remove();
                        // 刷新节点数据
                        await fetchNodes();
                        renderMap();
                    } else {
                        alert(result.message || '保存失败');
                    }
                } catch (error) {
                    alert('保存失败: ' + (error.message || '未知错误'));
                }
            });
            
            // 取消按钮
            document.getElementById('gps-cancel-btn').addEventListener('click', () => {
                dialog.remove();
            });
            
            // 点击背景关闭
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    dialog.remove();
                }
            });
        }

        async function setNodeCongestion(nodeId, congestionLevel) {
            const result = await apiCall(`/nodes/${nodeId}/congestion`, {
                method: 'POST',
                body: JSON.stringify({ congestion_level: congestionLevel })
            });

            if (result.success) {
                await fetchRoads();
                await fetchMonitorData();
                safeRenderMap();
                showSuccess(result.message);
            } else {
                showError(result.message || '设置节点拥堵状态失败');
            }
        }

        // 新增：设置道路状态
        async function setEdgeStatus(edgeId, status) {
            const result = await apiCall(`/edges/${edgeId}/status`, {
                method: 'POST',
                body: JSON.stringify({ status: status })
            });

            if (result.success) {
                await fetchRoads();
                await fetchMonitorData();
                safeRenderMap();
                showSuccess(result.message);
            } else {
                showError(result.message || '设置道路状态失败');
            }
        }

        // 新增：设置道路方向
        async function setEdgeDirection(edgeId, direction) {
            const result = await apiCall(`/edges/${edgeId}/direction`, {
                method: 'POST',
                body: JSON.stringify({ direction: direction })
            });

            if (result.success) {
                await fetchRoads();
                safeRenderMap();
                showSuccess(result.message);
            } else {
                showError(result.message || '设置道路方向失败');
            }
        }

        // 新增：更新车辆类型配置
        async function updateVehicleTypeConfig(vehicleType, config) {
            const result = await apiCall(`/vehicle-types/${vehicleType}`, {
                method: 'POST',
                body: JSON.stringify(config)
            });

            if (result.success) {
                await fetchVehicleTypes();
                showSuccess(result.message);
            } else {
                showError(result.message || '更新车辆类型配置失败');
            }
        }

        // 新增：添加车辆类型
        async function addVehicleTypeToBackend(vehicleTypeData) {
            const result = await apiCall('/vehicle-types', {
                method: 'POST',
                body: JSON.stringify(vehicleTypeData)
            });

            if (result.success) {
                await fetchVehicleTypes();
                return true;
            } else {
                showError(result.message || '添加车辆类型失败');
                return false;
            }
        }

        // 更新节点位置到后端
        async function updateNodePositionToBackend(nodeId, x, y) {
            const result = await apiCall(`/nodes/${nodeId}/position`, {
                method: 'POST',
                body: JSON.stringify({ x, y })
            });

            if (result.success) {
                log(`节点 ${nodeId} 位置同步成功: (${x}, ${y})`);
            } else {
                logError(`节点 ${nodeId} 位置同步失败`);
            }
            return result.success;
        }

        // 批量同步所有节点位置到后端
        async function syncAllNodePositions() {
            log('同步所有节点位置到后端...');

            let successCount = 0;
            for (const node of nodes) {
                const success = await updateNodePositionToBackend(node.id, node.x, node.y);
                if (success) successCount++;
            }

            log(`节点位置同步完成: ${successCount}/${nodes.length}`);
            return successCount === nodes.length;
        }

        // 更新道路选择框
        function updateCongestionEdgeSelect() {
            const congestionEdgeSelect = document.getElementById('congestion-edge');
            congestionEdgeSelect.innerHTML = '<option value="">请选择道路</option>';

            edges.forEach(edge => {
                const startNode = nodes.find(n => n.id === edge.start_node);
                const endNode = nodes.find(n => n.id === edge.end_node);
                const option = document.createElement('option');
                option.value = edge.id;
                option.textContent = `${edge.id}: ${startNode ? startNode.name : edge.start_node} → ${endNode ? endNode.name : edge.end_node}`;
                congestionEdgeSelect.appendChild(option);
            });
        }

        // 新增：更新方向道路选择框
        function updateDirectionEdgeSelect() {
            const directionEdgeSelect = document.getElementById('direction-edge');
            directionEdgeSelect.innerHTML = '<option value="">请选择道路</option>';

            edges.forEach(edge => {
                const startNode = nodes.find(n => n.id === edge.start_node);
                const endNode = nodes.find(n => n.id === edge.end_node);
                const option = document.createElement('option');
                option.value = edge.id;
                option.textContent = `${edge.id}: ${startNode ? startNode.name : edge.start_node} → ${endNode ? endNode.name : edge.end_node}`;
                directionEdgeSelect.appendChild(option);
            });
        }

        // 新增：更新车辆类型选择框
        function updateVehicleTypeSelect() {
            const vehicleTypeSelect = document.getElementById('vehicle-type');
            const driverVehicleTypeSelect = document.getElementById('driver-vehicle-type');

            if (vehicleTypeSelect) {
                vehicleTypeSelect.innerHTML = '';
            }
            if (driverVehicleTypeSelect) {
                driverVehicleTypeSelect.innerHTML = '';
            }

            Object.keys(vehicleTypes).forEach(type => {
                const option = document.createElement('option');
                option.value = type;
            const speed = getVehicleSpeed(vehicleTypes[type]);
            option.textContent = speed ? `${type} (${speed} km/h)` : type;
                if (vehicleTypeSelect) {
                    vehicleTypeSelect.appendChild(option.cloneNode(true));
                }
                if (driverVehicleTypeSelect) {
                    driverVehicleTypeSelect.appendChild(option);
                }
            });

            // 若司机未选择且存在默认值，则使用第一项
            if (driverVehicleTypeSelect && driverVehicleTypeSelect.options.length > 0 && !driverVehicleTypeSelect.value) {
                driverVehicleTypeSelect.value = driverVehicleTypeSelect.options[0].value;
            }
            
            // 同时更新清除对话框中的车辆类型下拉框
            updateClearVehicleTypeSelect();
        }
        
        function updateClearVehicleTypeSelect() {
            const clearVehicleTypeSelect = document.getElementById('clear-vehicle-type');
            if (!clearVehicleTypeSelect) {
                return;
            }
            
            // 保存当前选中的值
            const currentValue = clearVehicleTypeSelect.value;
            
            // 清空并添加"全部"选项
            clearVehicleTypeSelect.innerHTML = '<option value="">全部</option>';
            
            // 添加所有车辆类型
            Object.keys(vehicleTypes).sort().forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                clearVehicleTypeSelect.appendChild(option);
            });
            
            // 恢复之前选中的值（如果还存在）
            if (currentValue && Array.from(clearVehicleTypeSelect.options).some(opt => opt.value === currentValue)) {
                clearVehicleTypeSelect.value = currentValue;
            }
        }

        // 初始化监控数据结构
        function initMonitorData() {
            // 只在监控数据不存在时初始化，避免覆盖服务器返回的数据
            if (!monitorData || Object.keys(monitorData).length === 0) {
                monitorData = {
                    edge_congestion: {},
                    edge_available: {},
                    entrance_queue: {}
                };

                edges.forEach(edge => {
                    // 默认值设为1.0（正常），不设置拥堵值
                    monitorData.edge_congestion[edge.id] = 1.0;
                    monitorData.edge_available[edge.id] = edge.is_available !== false;
                });

                nodes.filter(node => node.type === 'entrance' || node.type === 'start').forEach(entrance => {
                    monitorData.entrance_queue[entrance.id] = 0;
                });
            }
        }

        // 渲染地图（增加对地理方向单向道路的显示）
        function renderMap() {
            const map = document.getElementById('map');

            if (nodes.length === 0 && edges.length === 0 && !mapBackground) {
                map.innerHTML = '<div class="loading">请上传自定义地图或使用默认地图</div>';
                return;
            }

            map.innerHTML = '';

            if (mapBackground) {
                map.style.backgroundImage = `url(${mapBackground})`;
                map.style.backgroundColor = 'transparent';
            } else {
                map.style.backgroundImage = '';
                map.style.backgroundColor = '#ecf0f1';
            }

            // 渲染边
            edges.forEach(edge => {
                const startNode = nodes.find(n => n.id === edge.start_node);
                const endNode = nodes.find(n => n.id === edge.end_node);

                if (startNode && endNode) {
                    const dx = endNode.x - startNode.x;
                    const dy = endNode.y - startNode.y;
                    const edgeLength = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

                    const edgeEl = document.createElement('div');
                    edgeEl.className = 'edge';
                    edgeEl.style.width = `${edgeLength}px`;
                    edgeEl.style.left = `${startNode.x}px`;
                    edgeEl.style.top = `${startNode.y}px`;
                    edgeEl.style.transform = `rotate(${angle}deg)`;

                    // 获取道路状态
                    const edgeStatus = monitorData.edge_status && monitorData.edge_status[edge.id] || 'normal';
                    
                    // 根据道路状态设置颜色和样式（优先级：封闭 > 占道施工 > 拥堵 > 单向 > 正常）
                    if (!edge.is_available || edgeStatus === 'closed') {
                        // 封闭道路：灰色，半透明
                        edgeEl.style.background = '#95a5a6';
                        edgeEl.style.opacity = '0.5';
                        edgeEl.style.height = '2px';
                        edgeEl.style.textDecoration = 'line-through';
                    } else if (edgeStatus === 'construction') {
                        // 占道施工：橙色，加粗，闪烁效果
                        edgeEl.style.background = '#f39c12';
                        edgeEl.style.height = '5px';
                        edgeEl.style.boxShadow = '0 0 8px rgba(243,156,18,0.8)';
                        edgeEl.style.borderTop = '2px dashed #e67e22';
                        edgeEl.style.borderBottom = '2px dashed #e67e22';
                    } else if (edgeStatus === 'congested' || edge.congestion_coeff > 2.0) {
                        // 拥堵道路：红色，加粗
                        edgeEl.style.background = '#e74c3c';
                        edgeEl.style.height = '4px';
                        edgeEl.style.boxShadow = '0 0 5px rgba(231,76,60,0.5)';
                    } else if (edge.congestion_coeff > 1.5) {
                        // 轻微拥堵：红色
                        edgeEl.style.background = '#e74c3c';
                    } else if (edge.direction !== 'two-way') {
                        // 单向道路：橙色
                        edgeEl.style.background = '#e67e22';
                    }
                    
                    // 编辑模式下可编辑道路名称，非编辑模式下设置道路状态
                    if (editMode) {
                        edgeEl.style.cursor = 'pointer';
                        edgeEl.style.zIndex = '11';
                        // 双击编辑道路名称
                        edgeEl.addEventListener('dblclick', (e) => {
                            e.stopPropagation();
                            editEdgeNameOnMap(edge);
                        });
                    } else {
                        edgeEl.style.cursor = 'pointer';
                        edgeEl.style.zIndex = '11'; // 提高层级以便点击
                        edgeEl.addEventListener('click', (e) => {
                            e.stopPropagation();
                            showEdgeDirectionMenu(e, edge, edgeStatus);
                        });
                        // 添加悬停效果
                        edgeEl.addEventListener('mouseenter', () => {
                            const originalHeight = edgeEl.style.height || '2px';
                            const heightValue = parseInt(originalHeight) || 2;
                            edgeEl.style.height = (heightValue + 2) + 'px';
                            edgeEl.style.transition = 'height 0.2s';
                        });
                        edgeEl.addEventListener('mouseleave', () => {
                            // 恢复原始高度（根据状态）
                            if (edgeStatus === 'construction') {
                                edgeEl.style.height = '5px';
                            } else if (edgeStatus === 'congested' || edge.congestion_coeff > 2.0) {
                                edgeEl.style.height = '4px';
                            } else {
                                edgeEl.style.height = '2px';
                            }
                        });
                    }

                    map.appendChild(edgeEl);
                    
                    // 添加道路编号标签（显示在道路中点，智能偏移避免与节点标签重叠）
                    const midX = startNode.x + dx * 0.5;
                    const midY = startNode.y + dy * 0.5;
                    
                    // 根据道路方向智能计算偏移，避免与节点标签重叠
                    // 节点标签在节点上方（y-30），所以道路编号需要更大的偏移
                    let offsetX = 0, offsetY = 0;
                    const absDx = Math.abs(dx);
                    const absDy = Math.abs(dy);
                    
                    // 根据道路长度和方向计算更合适的偏移，避免遮挡
                    // 横向道路：垂直偏移，纵向道路：水平偏移
                    if (absDx > absDy) {
                        // 主要是横向道路，垂直偏移
                        // 偏移量根据道路长度调整，确保不遮挡节点
                        const offset = Math.max(30, Math.min(35, edgeLength * 0.2)); // 最小30px，最大35px或长度的20%
                        offsetY = dy >= 0 ? -offset : offset; // 向上或向下偏移
                    } else {
                        // 主要是纵向道路，水平偏移
                        const offset = Math.max(30, Math.min(35, edgeLength * 0.2));
                        offsetX = dx >= 0 ? -offset : offset; // 向左或向右偏移
                    }
                    
                    const edgeLabelEl = document.createElement('div');
                    edgeLabelEl.className = 'edge-label';
                    edgeLabelEl.textContent = edge.name || edge.id;
                    edgeLabelEl.style.left = `${midX + offsetX}px`;
                    edgeLabelEl.style.top = `${midY + offsetY}px`;
                    edgeLabelEl.style.transform = `translate(-50%, -50%)`;
                    // 确保标签在最上层，但不会遮挡交互元素
                    edgeLabelEl.style.zIndex = '19';
                    
                    // 应用自定义格式
                    if (edge.label_font_size) {
                        edgeLabelEl.style.fontSize = `${edge.label_font_size}px`;
                    }
                    if (edge.label_font_family) {
                        edgeLabelEl.style.fontFamily = edge.label_font_family;
                    }
                    if (edge.label_font_weight) {
                        edgeLabelEl.style.fontWeight = edge.label_font_weight;
                    }
                    if (edge.label_color) {
                        edgeLabelEl.style.color = edge.label_color;
                    }
                    if (edge.label_background_color) {
                        edgeLabelEl.style.backgroundColor = edge.label_background_color;
                    }
                    if (edge.label_border_color) {
                        edgeLabelEl.style.borderColor = edge.label_border_color;
                    }
                    if (edge.label_border_width !== undefined) {
                        edgeLabelEl.style.borderWidth = `${edge.label_border_width}px`;
                        edgeLabelEl.style.borderStyle = edge.label_border_width > 0 ? 'solid' : 'none';
                    }
                    if (edge.label_border_radius !== undefined) {
                        edgeLabelEl.style.borderRadius = `${edge.label_border_radius}px`;
                    }
                    if (edge.label_padding !== undefined) {
                        edgeLabelEl.style.padding = `${edge.label_padding}px`;
                    }
                    
                    // 构建道路标签的提示信息
                    let edgeTitle = `道路名称: ${edge.name || edge.id}`;
                    if (edge.id !== (edge.name || edge.id)) {
                        edgeTitle += ` (编号: ${edge.id})`;
                    }
                    if (edge.direction !== 'two-way') {
                        edgeTitle += ' (单向)';
                    }
                    const statusNames = {
                        'normal': '正常',
                        'congested': '拥堵',
                        'construction': '占道施工',
                        'closed': '封闭'
                    };
                    if (edgeStatus !== 'normal') {
                        edgeTitle += ` | 状态: ${statusNames[edgeStatus] || edgeStatus}`;
                    }
                    if (edge.congestion_coeff > 1.0) {
                        edgeTitle += ` | 拥堵系数: ${edge.congestion_coeff.toFixed(2)}`;
                    }
                    edgeLabelEl.title = edgeTitle;
                    map.appendChild(edgeLabelEl);

                    // 如果是单向道路，添加方向指示器
                    if (edge.direction !== 'two-way') {
                        const indicator = document.createElement('div');
                        indicator.className = 'one-way-indicator';

                        // 计算箭头位置（在道路中点）
                        const midX = startNode.x + dx * 0.5;
                        const midY = startNode.y + dy * 0.5;

                        // 根据方向设置箭头的旋转角度
                        // SVG箭头默认指向上方（north），需要根据实际方向旋转
                        // 上北下南左西右东：north=0°, east=90°, south=180°, west=-90°(270°)
                        let rotation = 0;
                        switch (edge.direction) {
                            case 'north': rotation = 0; break;      // 向上，不需要旋转
                            case 'south': rotation = 180; break;    // 向下，旋转180度
                            case 'east': rotation = 90; break;      // 向右，顺时针90度
                            case 'west': rotation = -90; break;     // 向左，逆时针90度（或270度）
                            case 'northeast': rotation = 45; break;      // 右上，旋转45度
                            case 'northwest': rotation = -45; break;     // 左上，旋转-45度
                            case 'southeast': rotation = 135; break;    // 右下，旋转135度
                            case 'southwest': rotation = -135; break;    // 左下，旋转-135度（或225度）
                            default: rotation = 0;
                        }

                        indicator.style.left = `${midX}px`;
                        indicator.style.top = `${midY}px`;
                        indicator.style.transform = `rotate(${rotation}deg) translate(-50%, -50%)`;
                        indicator.style.transformOrigin = 'center center';

                        map.appendChild(indicator);
                    }
                }
            });

            // 渲染节点（并高亮施工点和拥堵节点）
            nodes.forEach(node => {
                const nodeEl = document.createElement('div');
                nodeEl.className = `node ${node.type}`;
                nodeEl.style.position = 'absolute'; // 确保节点是绝对定位
                nodeEl.style.left = `${node.x}px`;
                nodeEl.style.top = `${node.y}px`;
                nodeEl.style.overflow = 'visible'; // 确保子元素（GPS按钮）不会被裁剪
                nodeEl.style.zIndex = '20'; // 确保节点在上层
                nodeEl.setAttribute('data-id', node.id);
                
                // 获取节点拥堵状态（兼容对象和数字格式）
                const nodeCongestionData = monitorData.node_congestion && monitorData.node_congestion[node.id];
                let nodeCongestion = 0;
                if (nodeCongestionData !== undefined && nodeCongestionData !== null) {
                    // 如果是对象格式（旧数据），读取 level 字段；如果是数字，直接使用
                    nodeCongestion = typeof nodeCongestionData === 'object' && nodeCongestionData.level !== undefined
                        ? nodeCongestionData.level 
                        : nodeCongestionData;
                    // 确保是数字
                    nodeCongestion = parseInt(nodeCongestion) || 0;
                }
                const congestionNames = {0: '正常', 1: '轻微拥堵', 2: '中度拥堵', 3: '严重拥堵'};
                let titleText = `${node.name} (${node.id})`;
                
                // 先重置样式（清除之前的拥堵样式）
                nodeEl.style.boxShadow = '';
                nodeEl.style.border = '';
                
                if (nodeCongestion > 0) {
                    titleText += ` - ${congestionNames[nodeCongestion]}`;
                    // 根据拥堵级别添加视觉标识
                    if (nodeCongestion === 3) {
                        // 严重拥堵：红色外圈
                        nodeEl.style.boxShadow = '0 0 10px rgba(231,76,60,0.8), 0 0 20px rgba(231,76,60,0.4)';
                        nodeEl.style.border = '3px solid #e74c3c';
                    } else if (nodeCongestion === 2) {
                        // 中度拥堵：橙色外圈
                        nodeEl.style.boxShadow = '0 0 8px rgba(230,126,34,0.6)';
                        nodeEl.style.border = '2px solid #e67e22';
                    } else if (nodeCongestion === 1) {
                        // 轻微拥堵：黄色外圈
                        nodeEl.style.boxShadow = '0 0 6px rgba(243,156,18,0.5)';
                        nodeEl.style.border = '2px solid #f39c12';
                    }
                }
                // 如果节点有GPS坐标，在标题中显示
                if (node.latitude !== undefined && node.latitude !== null && 
                    node.longitude !== undefined && node.longitude !== null) {
                    titleText += `\nGPS: ${node.latitude.toFixed(2)}, ${node.longitude.toFixed(2)}`;
                }
                nodeEl.title = titleText;

                // 添加节点标签（调整位置，避免与道路编号重叠）
                const labelEl = document.createElement('div');
                labelEl.className = 'node-label';
                labelEl.textContent = node.name;
                // 节点标签显示在节点上方，给道路编号留出更多空间
                // 根据节点类型和周围节点调整位置，避免重叠
                let labelOffsetX = 20;
                let labelOffsetY = -35; // 增加垂直偏移，避免与道路标签重叠
                
                // 检查周围是否有其他节点，调整标签位置
                const nearbyNodes = nodes.filter(n => {
                    const dist = Math.sqrt(Math.pow(n.x - node.x, 2) + Math.pow(n.y - node.y, 2));
                    return dist < 150 && dist > 0; // 150px范围内的其他节点
                });
                
                // 如果有左侧节点，标签向右偏移更多
                const leftNodes = nearbyNodes.filter(n => n.x < node.x);
                if (leftNodes.length > 0) {
                    labelOffsetX = 25;
                }
                
                // 如果有上方节点，标签向下偏移
                const topNodes = nearbyNodes.filter(n => n.y < node.y);
                if (topNodes.length > 0) {
                    labelOffsetY = -30; // 稍微向下，避免重叠
                }
                
                labelEl.style.left = `${node.x + labelOffsetX}px`;
                labelEl.style.top = `${node.y + labelOffsetY}px`;
                labelEl.setAttribute('data-id', node.id);
                // 确保节点标签在最上层，但不会遮挡交互元素
                labelEl.style.zIndex = '26';
                
                // 应用自定义格式
                if (node.label_font_size) {
                    labelEl.style.fontSize = `${node.label_font_size}px`;
                }
                if (node.label_font_family) {
                    labelEl.style.fontFamily = node.label_font_family;
                }
                if (node.label_font_weight) {
                    labelEl.style.fontWeight = node.label_font_weight;
                }
                if (node.label_color) {
                    labelEl.style.color = node.label_color;
                }
                if (node.label_background_color) {
                    labelEl.style.backgroundColor = node.label_background_color;
                }
                if (node.label_border_color) {
                    labelEl.style.borderColor = node.label_border_color;
                }
                if (node.label_border_width !== undefined) {
                    labelEl.style.borderWidth = `${node.label_border_width}px`;
                    labelEl.style.borderStyle = node.label_border_width > 0 ? 'solid' : 'none';
                }
                if (node.label_border_radius !== undefined) {
                    labelEl.style.borderRadius = `${node.label_border_radius}px`;
                }
                if (node.label_padding !== undefined) {
                    labelEl.style.padding = `${node.label_padding}px`;
                }

                // 若是施工点（来自 monitorData.work_zones），做高亮与提示
                // 注意：施工点样式应该在拥堵样式之后设置，以确保施工点样式优先级更高
                if ((monitorData.work_zones || []).includes(node.id)) {
                    nodeEl.style.boxShadow = '0 0 10px rgba(231,76,60,0.8)';
                    nodeEl.style.border = '2px solid #e74c3c';
                    nodeEl.title += ' - 正在施工（建议绕行）';
                }

                // 编辑模式下节点可拖动和编辑名称，否则可点击设置拥堵状态
                if (editMode) {
                    nodeEl.style.cursor = 'move';
                    makeNodeDraggable(nodeEl, node);
                    // 双击编辑节点名称
                    nodeEl.addEventListener('dblclick', (e) => {
                        e.stopPropagation();
                        editNodeNameOnMap(node);
                    });
                } else {
                    // 非编辑模式下，点击节点设置拥堵状态
                    nodeEl.style.cursor = 'pointer';
                }
                
                // 检查节点是否有GPS坐标
                const nodeHasGps = node.latitude !== undefined && node.latitude !== null && 
                                  node.longitude !== undefined && node.longitude !== null &&
                                  !isNaN(node.latitude) && !isNaN(node.longitude);
                
                // 在节点上添加GPS设置按钮（小图标）
                const gpsBtn = document.createElement('div');
                gpsBtn.className = 'node-gps-btn';
                gpsBtn.innerHTML = '📍';
                gpsBtn.title = nodeHasGps 
                    ? `GPS: ${typeof node.latitude === 'number' ? node.latitude.toFixed(2) : node.latitude}, ${typeof node.longitude === 'number' ? node.longitude.toFixed(2) : node.longitude}` 
                    : '点击设置GPS坐标';
                gpsBtn.style.cssText = `
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 24px;
                    height: 24px;
                    background: ${nodeHasGps ? '#27ae60' : '#e74c3c'};
                    border: 2px solid white;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    z-index: 35;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                    transition: all 0.2s;
                    pointer-events: auto;
                    line-height: 1;
                `;
                
                gpsBtn.addEventListener('mouseenter', () => {
                    gpsBtn.style.transform = 'scale(1.2)';
                    gpsBtn.style.boxShadow = '0 3px 6px rgba(0,0,0,0.4)';
                });
                
                gpsBtn.addEventListener('mouseleave', () => {
                    gpsBtn.style.transform = 'scale(1)';
                    gpsBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                });
                
                gpsBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    await showGpsCalibrationDialog(node.id);
                });
                
                // 确保节点元素有正确的定位和overflow设置，以便GPS按钮能显示
                if (!nodeEl.style.position) {
                    nodeEl.style.position = 'absolute';
                }
                nodeEl.style.overflow = 'visible'; // 确保子元素不会被裁剪
                
                nodeEl.appendChild(gpsBtn);
                
                // 非编辑模式下，左键点击显示菜单
                if (!editMode) {
                    nodeEl.addEventListener('click', (e) => {
                        // 如果点击的是GPS按钮，不显示菜单（GPS按钮有自己的处理）
                        if (e.target === gpsBtn || gpsBtn.contains(e.target)) {
                            return;
                        }
                        e.stopPropagation();
                        showNodeCongestionMenu(e, node, nodeCongestion);
                    });
                    
                    // 添加悬停效果
                    nodeEl.addEventListener('mouseenter', () => {
                        nodeEl.style.transform = 'scale(1.3)';
                        nodeEl.style.transition = 'transform 0.2s';
                    });
                    nodeEl.addEventListener('mouseleave', () => {
                        nodeEl.style.transform = 'scale(1)';
                    });
                }

                map.appendChild(nodeEl);
                map.appendChild(labelEl);
            });

            // 编辑模式下，地图点击添加文字框
            if (editMode) {
                const mapClickHandler = (e) => {
                    // 检查是否点击在节点、道路或文字框上
                    const target = e.target;
                    if (target.classList.contains('node') || 
                        target.classList.contains('edge') || 
                        target.classList.contains('node-label') ||
                        target.classList.contains('edge-label') ||
                        target.classList.contains('map-text-label') ||
                        target.closest('.node') ||
                        target.closest('.edge')) {
                        return; // 点击在节点或道路上，不添加文字框
                    }
                    
                    const rect = map.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    addMapLabelAtPosition(x, y);
                };
                
                // 移除旧的点击事件监听器（如果存在）
                if (window.mapClickHandlerForLabels) {
                    map.removeEventListener('click', window.mapClickHandlerForLabels);
                }
                window.mapClickHandlerForLabels = mapClickHandler;
                map.addEventListener('click', mapClickHandler);
            } else {
                // 非编辑模式下移除点击事件
                if (window.mapClickHandlerForLabels) {
                    map.removeEventListener('click', window.mapClickHandlerForLabels);
                    window.mapClickHandlerForLabels = null;
                }
            }

            // 渲染地图文字框
            const existingLabels = map.querySelectorAll('.map-text-label');
            existingLabels.forEach(el => el.remove());
            
            mapTextLabels.forEach(label => {
                const labelEl = document.createElement('div');
                labelEl.className = 'map-text-label';
                labelEl.setAttribute('data-label-id', label.id);
                labelEl.textContent = label.text;
                labelEl.style.position = 'absolute';
                labelEl.style.left = `${label.x}px`;
                labelEl.style.top = `${label.y}px`;
                labelEl.style.fontSize = `${label.font_size || 14}px`;
                labelEl.style.fontFamily = label.font_family || 'Arial';
                labelEl.style.fontWeight = label.font_weight || 'normal';
                labelEl.style.color = label.color || '#000000';
                labelEl.style.backgroundColor = label.background_color || 'transparent';
                labelEl.style.borderColor = label.border_color || 'transparent';
                labelEl.style.borderWidth = `${label.border_width || 0}px`;
                labelEl.style.borderStyle = 'solid';
                labelEl.style.borderRadius = `${label.border_radius || 0}px`;
                labelEl.style.padding = `${label.padding || 4}px`;
                labelEl.style.opacity = label.opacity !== undefined ? label.opacity : 1.0;
                labelEl.style.transform = `rotate(${label.rotation || 0}deg)`;
                labelEl.style.zIndex = label.z_index || 1;
                labelEl.style.cursor = editMode ? 'move' : 'default';
                labelEl.style.userSelect = 'none';
                
                if (editMode) {
                    labelEl.style.border = '2px dashed #3498db';
                    labelEl.addEventListener('dblclick', (e) => {
                        e.stopPropagation();
                        editMapLabel(label.id);
                    });
                    makeLabelDraggable(labelEl, label);
                }
                
                map.appendChild(labelEl);
            });

            // 渲染车辆（先清除旧的车辆元素，避免重复）
            const existingVehicles = map.querySelectorAll('.vehicle');
            existingVehicles.forEach(el => el.remove());
            
            let renderedCount = 0;
            vehicles.forEach(vehicle => {
                // 检查车辆是否有有效位置
                if (!vehicle.current_position) {
                    logWarn(`车辆 ${vehicle.id} 没有位置信息`);
                    return; // 跳过没有有效位置的车辆
                }
                
                const x = vehicle.current_position.x;
                const y = vehicle.current_position.y;
                
                if (typeof x === 'undefined' || typeof y === 'undefined' || isNaN(x) || isNaN(y)) {
                    logWarn(`车辆 ${vehicle.id} 位置无效: (${x}, ${y})`);
                    return; // 跳过位置无效的车辆
                }
                
                const vehicleEl = document.createElement('div');
                vehicleEl.className = `vehicle ${getVehicleClass(vehicle.type)}`;
                vehicleEl.style.left = `${x}px`;
                vehicleEl.style.top = `${y}px`;
                vehicleEl.setAttribute('data-id', vehicle.id);
                
                // 如果是司机提交的车辆，添加特殊标识（绿色边框和阴影）
                if (vehicle.driver_id) {
                    vehicleEl.style.border = '2px solid #27ae60';
                    vehicleEl.style.boxShadow = '0 0 8px rgba(39, 174, 96, 0.6)';
                }
                
                // 构建提示信息
                let title = `${vehicle.id} - ${vehicle.type}\n状态: ${vehicle.status || 'moving'}\n起点: ${getNodeName(vehicle.start_node)}\n目标: ${getNodeName(vehicle.target_node)}`;
                if (vehicle.driver_id) {
                    title += `\n司机: ${vehicle.driver_name || vehicle.driver_id}`;
                }
                if (vehicle.current_path && vehicle.current_path.length > 0) {
                    title += `\n路径: ${vehicle.current_path.length} 条边`;
                }
                vehicleEl.title = title;

                // 在图标上显示 ID：如果有司机ID，显示司机ID；否则显示车辆ID的数字后缀
                if (vehicle.driver_id) {
                    vehicleEl.textContent = vehicle.driver_id;
                } else {
                    vehicleEl.textContent = vehicle.id.replace(/^V/, '');
                }

                map.appendChild(vehicleEl);
                renderedCount++;
            });
            
            if (renderedCount > 0) {
                log(`成功渲染 ${renderedCount} 辆车到地图`);
            }

            // 渲染路径（车辆当前路径）
            // 注意：由于前面已经有 map.innerHTML = ''，所以不需要清除旧的路径元素
            // 但为了保险，仍然清除一下（防止有其他代码直接添加路径元素）
            const existingPaths = map.querySelectorAll('.path:not(.driver-route), .path.dqn-route-overlay');
            existingPaths.forEach(el => el.remove());
            
            // 清除旧的司机路线标记（虽然不再渲染，但为了保险还是清除一下）
            const existingDriverMarkers = map.querySelectorAll('.driver-route, .driver-start, .driver-target');
            existingDriverMarkers.forEach(el => el.remove());
            
            vehicles.forEach(vehicle => {
                // 只渲染正在行驶的车辆的路径，已到达的车辆不显示路径
                // 严格检查：状态不是 'arrived'，没有 arrival_time，且有 current_path
                // 特别注意：即使有 current_path，如果车辆已到达也不渲染
                if (vehicle.status === 'arrived' || vehicle.arrival_time) {
                    // 车辆已到达，不渲染路径
                    return;
                }
                
                if (!vehicle.current_path || vehicle.current_path.length === 0) {
                    // 没有路径，不渲染
                    return;
                }
                
                // 只有在这里才渲染路径（确保车辆未到达且有路径）
                renderVehiclePath(vehicle);
            });
            
            // 管理端地图不显示司机规划路线，只显示车辆实际行驶路径
            
            // 注意：不再在渲染时自动居中，避免干扰用户拖拽操作
        }

        function safeRenderMap() {
            try {
                renderMap();
                // 恢复缩放和平移状态
                if (typeof window !== 'undefined' && window.mapZoomState && window.mapZoomState.update) {
                    setTimeout(() => {
                        window.mapZoomState.update();
                    }, 0);
                }
            } catch (err) {
                logError('renderMap 执行出错:', err);
            }
        }
        
        // 使用防抖优化的渲染函数（用于频繁调用场景）
        const debouncedRender = (window.debounce || getDebounce())(safeRenderMap, 100);
        
        // 使用节流优化的渲染函数（用于定期更新场景）
        const throttledRender = (window.throttle || getThrottle())(safeRenderMap, 500);
        
        // 地图初始化标志，用于控制是否自动居中
        let mapNeedsInitialCenter = true;
        // 拖拽状态标志，用于防止在拖拽时自动居中
        let isMapPanning = false;
        
        // 居中显示地图内容（仅在首次加载或导入新地图时调用）
        function centerMapContent(forceCenter = false) {
            const map = document.getElementById('map');
            const mapWrapper = document.querySelector('.map-wrapper');
            if (!map || !mapWrapper || nodes.length === 0) return;
            
            // 如果正在拖拽，不执行居中操作
            if (isMapPanning) return;
            
            // 如果不是强制居中，且已经初始化过，则跳过
            if (!forceCenter && !mapNeedsInitialCenter) return;
            
            // 计算地图内容的边界（包括节点、标签等）
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            
            // 从节点计算边界
            nodes.forEach(node => {
                minX = Math.min(minX, node.x);
                minY = Math.min(minY, node.y);
                maxX = Math.max(maxX, node.x);
                maxY = Math.max(maxY, node.y);
            });
            
            // 考虑标签的额外空间
            const labelPaddingX = 50;
            const labelPaddingY = 80;
            minX = Math.max(0, minX - labelPaddingX);
            minY = Math.max(0, minY - labelPaddingY);
            maxX = maxX + labelPaddingX;
            maxY = maxY + labelPaddingX;
            
            // 如果地图尺寸不够显示所有内容，自动增加尺寸
            const currentWidth = parseInt(map.style.width) || 0;
            const currentHeight = parseInt(map.style.height) || 0;
            const neededWidth = maxX + labelPaddingX + 100;
            const neededHeight = maxY + labelPaddingX + 100;
            
            let needResize = false;
            if (neededWidth > currentWidth || map.scrollWidth < neededWidth) {
                map.style.width = `${neededWidth}px`;
                needResize = true;
            }
            if (neededHeight > currentHeight || map.scrollHeight < neededHeight) {
                map.style.height = `${neededHeight}px`;
                needResize = true;
            }
            
            // 如果调整了尺寸，地图会自动扩展
            
            // 获取地图容器的可视区域尺寸
            const wrapperRect = mapWrapper.getBoundingClientRect();
            const viewportWidth = wrapperRect.width;
            const viewportHeight = wrapperRect.height;
            
            // 计算内容尺寸和中心点
            const contentWidth = maxX - minX;
            const contentHeight = maxY - minY;
            const contentCenterX = (minX + maxX) / 2;
            const contentCenterY = (minY + maxY) / 2;
            
            // 获取当前的缩放和平移状态
            const mapZoomState = window.mapZoomState;
            if (!mapZoomState) {
                // 如果还没有初始化缩放状态，等待一下
                setTimeout(() => centerMapContent(forceCenter), 100);
                return;
            }
            
            // 计算合适的缩放比例，确保所有内容都在可视区域内
            const scaleX = viewportWidth / contentWidth;
            const scaleY = viewportHeight / contentHeight;
            const fitScale = Math.min(scaleX, scaleY, 1.0) * 0.9; // 留10%边距，最大不超过100%
            
            // 只在首次加载时设置缩放，否则保持当前缩放
            const currentScale = mapZoomState.scale || 1.0;
            let targetScale = currentScale;
            
            // 如果内容完全超出可视区域，才调整缩放
            if (forceCenter || mapNeedsInitialCenter) {
                // 检查内容是否完全在可视区域外
                const scaledContentWidth = contentWidth * currentScale;
                const scaledContentHeight = contentHeight * currentScale;
                const currentTranslateX = mapZoomState.translateX || 0;
                const currentTranslateY = mapZoomState.translateY || 0;
                
                // 计算内容在屏幕上的位置
                const contentScreenLeft = currentTranslateX + minX * currentScale;
                const contentScreenTop = currentTranslateY + minY * currentScale;
                const contentScreenRight = contentScreenLeft + scaledContentWidth;
                const contentScreenBottom = contentScreenTop + scaledContentHeight;
                
                // 如果内容完全不在可视区域内，才调整缩放和平移
                if (contentScreenRight < 0 || contentScreenLeft > viewportWidth ||
                    contentScreenBottom < 0 || contentScreenTop > viewportHeight) {
                    targetScale = fitScale;
                }
            }
            
            // 计算居中所需的平移量
            const viewportCenterX = viewportWidth / 2;
            const viewportCenterY = viewportHeight / 2;
            const targetTranslateX = viewportCenterX - contentCenterX * targetScale;
            const targetTranslateY = viewportCenterY - contentCenterY * targetScale;
            
            // 只在首次加载或强制居中时更新缩放和平移
            if (forceCenter || mapNeedsInitialCenter) {
                mapZoomState.scale = targetScale;
                mapZoomState.translateX = targetTranslateX;
                mapZoomState.translateY = targetTranslateY;
                mapZoomState.update();
                mapNeedsInitialCenter = false; // 标记已初始化
            }
            
            // 如果调整了尺寸，重新居中
            if (needResize) {
                setTimeout(() => {
                    centerMapContent(forceCenter);
                }, 50);
            }
        }
        
        // 渲染司机规划的路线
        function renderDriverRoute(route) {
            const map = document.getElementById('map');
            if (!route || !route.path_edges || route.path_edges.length === 0) return;
            
            route.path_edges.forEach((edgeData, index) => {
                const startNode = nodes.find(n => n.id === edgeData.start_node);
                const endNode = nodes.find(n => n.id === edgeData.end_node);
                
                if (startNode && endNode) {
                    const dx = endNode.x - startNode.x;
                    const dy = endNode.y - startNode.y;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    
                    const routePathEl = document.createElement('div');
                    routePathEl.className = 'path driver-route';
                    routePathEl.style.width = `${length}px`;
                    routePathEl.style.left = `${startNode.x}px`;
                    routePathEl.style.top = `${startNode.y}px`;
                    routePathEl.style.transform = `rotate(${angle}deg)`;
                    routePathEl.style.background = '#f39c12'; // 橙色表示司机规划的路线
                    routePathEl.style.height = '6px';
                    routePathEl.style.zIndex = '25';
                    routePathEl.style.boxShadow = '0 0 8px rgba(243, 156, 18, 0.6)';
                    routePathEl.title = `司机规划路线: ${getNodeName(route.start_node)} → ${getNodeName(route.target_node)}`;
                    
                    map.appendChild(routePathEl);
                }
            });
            
            // 高亮起点和目标节点
            const startNode = nodes.find(n => n.id === route.start_node);
            const targetNode = nodes.find(n => n.id === route.target_node);
            
            if (startNode) {
                const startMarker = document.createElement('div');
                startMarker.className = 'node-marker driver-start';
                startMarker.style.left = `${startNode.x}px`;
                startMarker.style.top = `${startNode.y}px`;
                startMarker.style.width = '20px';
                startMarker.style.height = '20px';
                startMarker.style.border = '3px solid #f39c12';
                startMarker.style.borderRadius = '50%';
                startMarker.style.background = 'rgba(243, 156, 18, 0.3)';
                startMarker.style.zIndex = '26';
                startMarker.style.transform = 'translate(-50%, -50%)';
                startMarker.title = `司机路线起点: ${startNode.name}`;
                map.appendChild(startMarker);
            }
            
            if (targetNode) {
                const targetMarker = document.createElement('div');
                targetMarker.className = 'node-marker driver-target';
                targetMarker.style.left = `${targetNode.x}px`;
                targetMarker.style.top = `${targetNode.y}px`;
                targetMarker.style.width = '20px';
                targetMarker.style.height = '20px';
                targetMarker.style.border = '3px solid #f39c12';
                targetMarker.style.borderRadius = '50%';
                targetMarker.style.background = 'rgba(243, 156, 18, 0.3)';
                targetMarker.style.zIndex = '26';
                targetMarker.style.transform = 'translate(-50%, -50%)';
                targetMarker.title = `司机路线终点: ${targetNode.name}`;
                map.appendChild(targetMarker);
            }
        }

        // 使节点可拖动
        function makeNodeDraggable(nodeEl, node) {
            let isDragging = false;
            let offsetX, offsetY;

            nodeEl.addEventListener('mousedown', startDrag);

            function startDrag(e) {
                isDragging = true;
                offsetX = e.clientX - nodeEl.getBoundingClientRect().left;
                offsetY = e.clientY - nodeEl.getBoundingClientRect().top;

                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', stopDrag);

                e.preventDefault();
            }

            function drag(e) {
                if (!isDragging) return;

                const mapRect = document.getElementById('map').getBoundingClientRect();
                const x = e.clientX - mapRect.left - offsetX;
                const y = e.clientY - mapRect.top - offsetY;

                // 限制节点在地图范围内
                const maxX = mapRect.width - 10;
                const maxY = mapRect.height - 10;

                node.x = Math.max(10, Math.min(maxX, x));
                node.y = Math.max(10, Math.min(maxY, y));

                nodeEl.style.left = `${node.x}px`;
                nodeEl.style.top = `${node.y}px`;

                const label = Array.from(document.querySelectorAll('.node-label'))
                    .find(l => l.getAttribute('data-id') === node.id);
                if (label) {
                    label.style.left = `${node.x + 15}px`;
                    label.style.top = `${node.y - 25}px`;
                }

                safeRenderMap();
            }

            function stopDrag() {
                if (!isDragging) return;

                isDragging = false;
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('mouseup', stopDrag);

                // 拖动结束后同步位置到后端
                updateNodePositionToBackend(node.id, node.x, node.y);
            }
        }

        // 智能定位菜单，确保不超出可视区域
        function calculateMenuPosition(clientX, clientY, menuWidth, menuHeight) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const padding = 10; // 距离边缘的最小距离
            
            let left = clientX;
            let top = clientY;
            
            // 检查右边界
            if (left + menuWidth + padding > viewportWidth) {
                left = viewportWidth - menuWidth - padding;
            }
            
            // 检查左边界
            if (left < padding) {
                left = padding;
            }
            
            // 检查下边界
            if (top + menuHeight + padding > viewportHeight) {
                top = viewportHeight - menuHeight - padding;
            }
            
            // 检查上边界
            if (top < padding) {
                top = padding;
            }
            
            return { left, top };
        }

        // 显示节点拥堵状态设置菜单
        function showNodeCongestionMenu(event, node, currentCongestion) {
            console.log('showNodeCongestionMenu 被调用，节点:', node.id, node.name);
            
            // 移除已存在的菜单
            const existingMenu = document.getElementById('status-context-menu');
            if (existingMenu) {
                existingMenu.remove();
            }

            // 确保 currentCongestion 是数字（兼容对象格式）
            let congestionLevel = 0;
            if (currentCongestion !== undefined && currentCongestion !== null) {
                if (typeof currentCongestion === 'object' && currentCongestion.level !== undefined) {
                    congestionLevel = parseInt(currentCongestion.level) || 0;
                } else {
                    congestionLevel = parseInt(currentCongestion) || 0;
                }
            }

            const menu = document.createElement('div');
            menu.id = 'status-context-menu';
            
            // 先创建菜单内容以计算尺寸
            const congestionNames = {0: '正常', 1: '轻微拥堵', 2: '中度拥堵', 3: '严重拥堵'};
            // 检查节点是否有GPS坐标
            const hasGps = node.latitude !== undefined && node.latitude !== null && 
                          node.longitude !== undefined && node.longitude !== null &&
                          !isNaN(node.latitude) && !isNaN(node.longitude);
            
            // 格式化GPS坐标显示
            let gpsDisplay = '';
            if (hasGps) {
                const lat = typeof node.latitude === 'number' ? node.latitude.toFixed(2) : node.latitude;
                const lon = typeof node.longitude === 'number' ? node.longitude.toFixed(2) : node.longitude;
                gpsDisplay = `<div style="font-size: 11px; color: #27ae60; margin-bottom: 8px; padding: 6px; background: #ecf0f1; border-radius: 4px;">
                    <strong>GPS坐标:</strong> ${lat}, ${lon}
                </div>`;
            } else {
                gpsDisplay = `<div style="font-size: 11px; color: #e74c3c; margin-bottom: 8px; padding: 6px; background: #fadbd8; border-radius: 4px;">
                    ⚠️ 未设置GPS坐标
                </div>`;
            }

            menu.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 10px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    ${node.name} (${node.id})
                </div>
                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 12px;">
                    当前状态: <strong style="color: #e67e22;">${congestionNames[congestionLevel] || '正常'}</strong>
                </div>
                ${gpsDisplay}
                <div style="border-top: 2px solid #3498db; padding-top: 12px; margin-top: 12px; margin-bottom: 12px;">
                    <div style="font-size: 12px; color: #2c3e50; font-weight: bold; margin-bottom: 10px;">📍 GPS坐标设置</div>
                    <button class="gps-btn" data-node-id="${node.id}" style="display: block; width: 100%; padding: 12px 16px; margin: 0; border: 2px solid #2980b9; border-radius: 6px; background: #3498db; color: white; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        ${hasGps ? '✏️ 修改GPS坐标' : '➕ 设置GPS坐标'}
                    </button>
                </div>
                <div style="border-top: 1px solid #eee; padding-top: 12px; margin-top: 12px;">
                    <div style="font-size: 12px; color: #2c3e50; font-weight: bold; margin-bottom: 10px;">🚦 拥堵状态设置</div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <button class="status-menu-btn" data-level="0" style="background: #2ecc71; ${congestionLevel === 0 ? 'border: 2px solid #27ae60; font-weight: bold;' : ''}">正常</button>
                        <button class="status-menu-btn" data-level="1" style="background: #f39c12; ${congestionLevel === 1 ? 'border: 2px solid #e67e22; font-weight: bold;' : ''}">轻微拥堵</button>
                        <button class="status-menu-btn" data-level="2" style="background: #e67e22; ${congestionLevel === 2 ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">中度拥堵</button>
                        <button class="status-menu-btn" data-level="3" style="background: #e74c3c; ${congestionLevel === 3 ? 'border: 2px solid #c0392b; font-weight: bold;' : ''}">严重拥堵</button>
                    </div>
                </div>
            `;
            
            // 添加按钮样式（如果还没有）
            if (!document.getElementById('status-menu-style')) {
                const style = document.createElement('style');
                style.id = 'status-menu-style';
                style.textContent = `
                    .status-menu-btn {
                        display: block;
                        width: 100%;
                        padding: 10px 14px;
                        margin: 0;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        color: white;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.2s;
                        font-size: 13px;
                    }
                    .status-menu-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    }
                    .gps-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                        background: #2980b9 !important;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 临时添加到DOM以计算尺寸
            menu.style.cssText = `
                position: fixed;
                visibility: hidden;
                background: white;
                border: 2px solid #3498db;
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                min-width: 200px;
                font-size: 14px;
            `;
            document.body.appendChild(menu);
            
            // 计算菜单尺寸
            const menuRect = menu.getBoundingClientRect();
            const menuWidth = menuRect.width;
            const menuHeight = menuRect.height;
            
            // 计算最佳位置
            const position = calculateMenuPosition(event.clientX, event.clientY, menuWidth, menuHeight);
            
            // 应用计算后的位置（增加宽度以确保GPS按钮可见）
            menu.style.cssText = `
                position: fixed;
                left: ${position.left}px;
                top: ${position.top}px;
                background: white;
                border: 2px solid #3498db;
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                min-width: 300px;
                max-width: 400px;
                font-size: 14px;
                visibility: visible;
                max-height: 90vh;
                overflow-y: auto;
            `;


            // 添加GPS按钮事件（使用事件委托，确保能捕获到）
            const gpsBtn = menu.querySelector('.gps-btn');
            if (gpsBtn) {
                gpsBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const nodeId = gpsBtn.getAttribute('data-node-id');
                    menu.remove();
                    await showGpsCalibrationDialog(nodeId);
                });
            }

            // 添加拥堵状态按钮事件（排除GPS按钮）
            menu.querySelectorAll('.status-menu-btn').forEach(btn => {
                // 跳过GPS按钮
                if (btn.classList.contains('gps-btn')) return;
                
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const level = parseInt(btn.getAttribute('data-level'));
                    if (!isNaN(level)) {
                        await setNodeCongestion(node.id, level);
                        menu.remove();
                    }
                });
            });

            // 点击外部关闭菜单
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            }, 100);
        }

        // 显示道路方向设置菜单
        function showEdgeDirectionMenu(event, edge, currentStatus) {
            // 移除已存在的菜单
            const existingMenu = document.getElementById('direction-context-menu');
            if (existingMenu) {
                existingMenu.remove();
            }

            const menu = document.createElement('div');
            menu.id = 'direction-context-menu';
            
            const directionNames = {
                'two-way': '双向',
                'north': '北向单行',
                'south': '南向单行',
                'east': '东向单行',
                'west': '西向单行',
                'northeast': '东北向单行',
                'northwest': '西北向单行',
                'southeast': '东南向单行',
                'southwest': '西南向单行',
                'reverse': '反向'
            };
            
            const statusNames = {
                'normal': '正常',
                'congested': '拥堵',
                'construction': '占道施工',
                'closed': '封闭'
            };

            const currentDirection = edge.direction || 'two-way';
            const startNode = nodes.find(n => n.id === edge.start_node);
            const endNode = nodes.find(n => n.id === edge.end_node);
            const startName = startNode ? startNode.name : edge.start_node;
            const endName = endNode ? endNode.name : edge.end_node;

            menu.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 10px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    道路: ${edge.id}
                </div>
                <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 8px;">
                    ${startName} → ${endName}
                </div>
                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
                    当前方向: <strong style="color: #3498db;">${directionNames[currentDirection] || currentDirection}</strong><br>
                    当前状态: <strong style="color: #e67e22;">${statusNames[currentStatus] || currentStatus}</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    <div style="font-size: 12px; font-weight: bold; margin-bottom: 6px; color: #2c3e50;">设置方向:</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                        <button class="direction-menu-btn" data-direction="two-way" style="background: #3498db; ${currentDirection === 'two-way' ? 'border: 2px solid #2980b9; font-weight: bold;' : ''}">双向</button>
                        <button class="direction-menu-btn" data-direction="reverse" style="background: #9b59b6; ${currentDirection === 'reverse' ? 'border: 2px solid #8e44ad; font-weight: bold;' : ''}">反向</button>
                        <button class="direction-menu-btn" data-direction="north" style="background: #e67e22; ${currentDirection === 'north' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">北向</button>
                        <button class="direction-menu-btn" data-direction="south" style="background: #e67e22; ${currentDirection === 'south' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">南向</button>
                        <button class="direction-menu-btn" data-direction="east" style="background: #e67e22; ${currentDirection === 'east' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">东向</button>
                        <button class="direction-menu-btn" data-direction="west" style="background: #e67e22; ${currentDirection === 'west' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">西向</button>
                        <button class="direction-menu-btn" data-direction="northeast" style="background: #e67e22; ${currentDirection === 'northeast' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">东北</button>
                        <button class="direction-menu-btn" data-direction="northwest" style="background: #e67e22; ${currentDirection === 'northwest' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">西北</button>
                        <button class="direction-menu-btn" data-direction="southeast" style="background: #e67e22; ${currentDirection === 'southeast' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">东南</button>
                        <button class="direction-menu-btn" data-direction="southwest" style="background: #e67e22; ${currentDirection === 'southwest' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">西南</button>
                    </div>
                </div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
                    <div style="font-size: 12px; font-weight: bold; margin-bottom: 6px; color: #2c3e50;">设置状态:</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <button class="status-menu-btn" data-status="normal" style="background: #2ecc71; ${currentStatus === 'normal' ? 'border: 2px solid #27ae60; font-weight: bold;' : ''}">正常</button>
                        <button class="status-menu-btn" data-status="congested" style="background: #e74c3c; ${currentStatus === 'congested' ? 'border: 2px solid #c0392b; font-weight: bold;' : ''}">拥堵</button>
                        <button class="status-menu-btn" data-status="construction" style="background: #f39c12; ${currentStatus === 'construction' ? 'border: 2px solid #e67e22; font-weight: bold;' : ''}">占道施工</button>
                        <button class="status-menu-btn" data-status="closed" style="background: #95a5a6; ${currentStatus === 'closed' ? 'border: 2px solid #7f8c8d; font-weight: bold;' : ''}">封闭</button>
                    </div>
                </div>
            `;
            
            // 临时添加到DOM以计算尺寸
            menu.style.cssText = `
                position: fixed;
                visibility: hidden;
                background: white;
                border: 2px solid #3498db;
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                min-width: 240px;
                font-size: 13px;
            `;
            
            // 添加按钮样式
            const style = document.createElement('style');
            style.textContent = `
                .direction-menu-btn, .status-menu-btn {
                    padding: 6px 10px;
                    border: 1px solid rgba(0,0,0,0.2);
                    border-radius: 4px;
                    cursor: pointer;
                    color: white;
                    font-size: 12px;
                    transition: all 0.2s;
                    text-align: center;
                }
                .direction-menu-btn:hover, .status-menu-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .direction-menu-btn:active, .status-menu-btn:active {
                    transform: translateY(0);
                }
            `;
            if (!document.getElementById('direction-menu-styles')) {
                style.id = 'direction-menu-styles';
                document.head.appendChild(style);
            }
            
            document.body.appendChild(menu);
            
            // 计算菜单尺寸
            const menuRect = menu.getBoundingClientRect();
            const menuWidth = menuRect.width;
            const menuHeight = menuRect.height;
            
            // 计算最佳位置
            const position = calculateMenuPosition(event.clientX, event.clientY, menuWidth, menuHeight);
            
            // 应用计算后的位置
            menu.style.cssText = `
                position: fixed;
                left: ${position.left}px;
                top: ${position.top}px;
                background: white;
                border: 2px solid #3498db;
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                min-width: 240px;
                font-size: 13px;
                visibility: visible;
            `;

            // 添加方向按钮事件
            menu.querySelectorAll('.direction-menu-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const direction = btn.getAttribute('data-direction');
                    await setEdgeDirection(edge.id, direction);
                    menu.remove();
                });
            });
            
            // 添加状态按钮事件
            menu.querySelectorAll('.status-menu-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const status = btn.getAttribute('data-status');
                    await setEdgeStatus(edge.id, status);
                    menu.remove();
                });
            });

            // 点击外部关闭菜单
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            }, 100);
        }

        // 显示道路状态设置菜单（保留以兼容）
        function showEdgeStatusMenu(event, edge, currentStatus) {
            // 移除已存在的菜单
            const existingMenu = document.getElementById('status-context-menu');
            if (existingMenu) {
                existingMenu.remove();
            }

            const menu = document.createElement('div');
            menu.id = 'status-context-menu';
            
            // 先创建菜单内容以计算尺寸
            const statusNames = {
                'normal': '正常',
                'congested': '拥堵',
                'construction': '占道施工',
                'closed': '封闭'
            };

            menu.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 10px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    道路: ${edge.id}
                </div>
                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 12px;">
                    当前状态: <strong style="color: #e67e22;">${statusNames[currentStatus]}</strong>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <button class="status-menu-btn" data-status="normal" style="background: #2ecc71; ${currentStatus === 'normal' ? 'border: 2px solid #27ae60; font-weight: bold;' : ''}">正常</button>
                    <button class="status-menu-btn" data-status="congested" style="background: #e74c3c; ${currentStatus === 'congested' ? 'border: 2px solid #c0392b; font-weight: bold;' : ''}">拥堵</button>
                    <button class="status-menu-btn" data-status="construction" style="background: #f39c12; ${currentStatus === 'construction' ? 'border: 2px solid #e67e22; font-weight: bold;' : ''}">占道施工</button>
                    <button class="status-menu-btn" data-status="closed" style="background: #95a5a6; ${currentStatus === 'closed' ? 'border: 2px solid #7f8c8d; font-weight: bold;' : ''}">封闭</button>
                </div>
            `;
            
            // 临时添加到DOM以计算尺寸
            menu.style.cssText = `
                position: fixed;
                visibility: hidden;
                background: white;
                border: 2px solid #3498db;
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                min-width: 200px;
                font-size: 14px;
            `;
            document.body.appendChild(menu);
            
            // 计算菜单尺寸
            const menuRect = menu.getBoundingClientRect();
            const menuWidth = menuRect.width;
            const menuHeight = menuRect.height;
            
            // 计算最佳位置
            const position = calculateMenuPosition(event.clientX, event.clientY, menuWidth, menuHeight);
            
            // 应用计算后的位置
            menu.style.cssText = `
                position: fixed;
                left: ${position.left}px;
                top: ${position.top}px;
                background: white;
                border: 2px solid #3498db;
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                min-width: 200px;
                font-size: 14px;
                visibility: visible;
            `;

            // 添加按钮事件
            menu.querySelectorAll('.status-menu-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const status = btn.getAttribute('data-status');
                    await setEdgeStatus(edge.id, status);
                    menu.remove();
                });
            });

            // 点击外部关闭菜单
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            }, 100);
        }

        // 根据车辆类型获取 CSS 类
        function getVehicleClass(type) {
            switch (type) {
                case '渣土车': return 'truck';
                case '材料车': return 'material';
                case '工程车': return 'construction';
                case '特种车': return 'truck'; // 使用相同的样式，或者可以添加新的
                default: return 'truck';
            }
        }

        // 渲染车辆路径（与司机端逻辑完全一致：只使用 current_path）
        function renderVehiclePath(vehicle) {
            const map = document.getElementById('map');
            
            // 已到达的车辆不渲染路径（严格检查）
            if (vehicle.status === 'arrived' || vehicle.arrival_time) {
                return;
            }
            
            // 如果车辆状态不是 'moving' 或 'driving'，也不渲染路径
            if (vehicle.status && vehicle.status !== 'moving' && vehicle.status !== 'driving') {
                return;
            }
            
            // 只使用 current_path（与司机端逻辑一致），如果为空就不渲染
            if (!vehicle.current_path || vehicle.current_path.length === 0) {
                return;
            }
            
            // 额外检查：如果车辆位置已经在目标节点附近，即使 current_path 还有数据也不渲染
            // 这可以处理后端未正确清除路径的情况
            const progress = vehicle.progress || 0;
            const targetNodeId = vehicle.target_node;
            if (targetNodeId) {
                const targetNode = nodes.find(n => n.id === targetNodeId);
                const currentPos = vehicle.current_position || { x: 0, y: 0 };
                if (targetNode && currentPos.x && currentPos.y) {
                    const distToTarget = Math.sqrt(
                        Math.pow(targetNode.x - currentPos.x, 2) + 
                        Math.pow(targetNode.y - currentPos.y, 2)
                    );
                    // 如果距离目标节点很近（小于50像素），认为已到达，不渲染路径
                    // 或者 progress >= 1.0 且距离目标节点很近
                    if (distToTarget < 50 || (progress >= 1.0 && distToTarget < 100)) {
                        return;
                    }
                }
            }
            
            // 如果 progress >= 1.0 且 current_path 还有数据，说明可能已经到达但状态未更新
            // 这种情况下也不渲染路径
            if (progress >= 1.0 && vehicle.current_path.length > 0) {
                return;
            }
            
            // 使用与司机端相同的逻辑：如果 progress > 0.8，不显示当前边（接近完成）
            // 如果 progress < 0.8，显示当前边的剩余部分
            const startIndex = progress > 0.8 ? 1 : 0;
            
            for (let i = startIndex; i < vehicle.current_path.length; i++) {
                const edge = vehicle.current_path[i];
                const startNodeId = edge.start_node || edge.startNode;
                const endNodeId = edge.end_node || edge.endNode;
                const startNode = nodes.find(n => n.id === startNodeId);
                const endNode = nodes.find(n => n.id === endNodeId);

                if (!startNode || !endNode) {
                    continue; // 跳过无法找到节点的边
                }

                const dx = endNode.x - startNode.x;
                const dy = endNode.y - startNode.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;

                const pathEl = document.createElement('div');
                pathEl.className = 'path';
                // 确保路径样式正确（防止变粗）
                pathEl.style.height = '3px';
                pathEl.style.background = '#f39c12';
                pathEl.style.opacity = '0.8';
                pathEl.style.zIndex = '15';
                pathEl.style.pointerEvents = 'none'; /* 允许点击事件穿透到道路，不影响道路状态编辑 */
                
                // 如果是当前正在行驶的第一条边（i === 0 且 progress < 1.0），只显示剩余部分
                if (i === 0 && progress > 0 && progress < 1.0) {
                    // 只显示剩余部分（从当前位置到终点）
                    const remainingLength = length * (1 - progress);
                    pathEl.style.width = `${remainingLength}px`;
                    // 调整起点位置，从当前位置开始
                    const currentX = startNode.x + dx * progress;
                    const currentY = startNode.y + dy * progress;
                    pathEl.style.left = `${currentX}px`;
                    pathEl.style.top = `${currentY}px`;
                } else {
                    // 完整显示整条边（未行驶的边）
                    pathEl.style.width = `${length}px`;
                    pathEl.style.left = `${startNode.x}px`;
                    pathEl.style.top = `${startNode.y}px`;
                }
                
                pathEl.style.transform = `rotate(${angle}deg)`;

                // 如果该边拥堵严重则变红
                if (edge.congestion_coeff > 2.0) {
                    pathEl.style.background = '#e74c3c';
                    pathEl.style.opacity = '0.9';
                }

                map.appendChild(pathEl);
            }
        }

        // 更新车辆列表
        function updateVehicleList(sortByEfficiency = false) {
            const vehicleList = document.getElementById('vehicle-list');
            vehicleList.innerHTML = '';

            let displayVehicles = [...vehicles];
            if (sortByEfficiency) {
                displayVehicles.sort((a, b) => {
                    const sa = a.efficiency_score || 999999;
                    const sb = b.efficiency_score || 999999;
                    return sa - sb;
                });
            }

            if (displayVehicles.length === 0) {
                vehicleList.innerHTML = '<div class="loading">暂无车辆</div>';
                return;
            }

            displayVehicles.forEach(vehicle => {
                const vehicleItem = document.createElement('div');
                vehicleItem.className = 'vehicle-item';

                const leftDiv = document.createElement('div');
                let driverInfo = '';
                if (vehicle.driver_id) {
                    driverInfo = `<div class="vehicle-info" style="color: #27ae60;">👤 司机: ${vehicle.driver_name || vehicle.driver_id}</div>`;
                }
                
                leftDiv.innerHTML = `<strong>${vehicle.id}</strong> - ${vehicle.type}
                    <div class="vehicle-info">载重: ${vehicle.weight}吨 | 宽度: ${vehicle.width}米</div>
                    ${driverInfo}
                    <div class="vehicle-info">状态: ${vehicle.status || 'moving'}</div>`;

                const rightDiv = document.createElement('div');
                const eff = vehicle.efficiency_score !== undefined && vehicle.efficiency_score !== null
                    ? `${vehicle.efficiency_score.toFixed(1)}`
                    : 'N/A';
                rightDiv.innerHTML = `起点: ${getNodeName(vehicle.start_node)}<br>目标: ${getNodeName(vehicle.target_node)}<br><small>效率: ${eff}</small>`;

                vehicleItem.appendChild(leftDiv);
                vehicleItem.appendChild(rightDiv);

                vehicleList.appendChild(vehicleItem);
            });
        }

        // 根据节点ID获取节点名称
        function getNodeName(nodeId) {
            const node = nodes.find(n => n.id === nodeId);
            return node ? node.name : nodeId;
        }

        // 更新节点列表
        function updateNodeList() {
            const nodeList = document.getElementById('node-list');
            nodeList.innerHTML = '';

            if (nodes.length === 0) {
                nodeList.innerHTML = '<div class="loading">暂无节点，请添加节点</div>';
                return;
            }

            nodes.forEach(node => {
                const nodeItem = document.createElement('div');
                nodeItem.className = 'node-item';
                nodeItem.innerHTML = `
                    <div style="display:flex; align-items:center;">
                        <div class="node-item-color" style="background: ${nodeTypes[node.type].color}"></div>
                        <div class="node-item-info" style="flex:1;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <input type="text" class="node-name-input" data-id="${node.id}" 
                                       value="${escapeHtml(node.name)}" 
                                       style="flex:1; padding:4px 8px; border:1px solid #ddd; border-radius:4px; font-weight:bold;"
                                       placeholder="节点名称">
                                <span style="color:#999; font-size:12px;">(${node.id})</span>
                            </div>
                            <span class="vehicle-info">${nodeTypes[node.type].name} - (${Math.round(node.x)}, ${Math.round(node.y)})</span>
                        </div>
                    </div>
                    <div class="node-item-actions" style="display:flex; gap:5px;">
                        <button class="save-node-name" data-id="${node.id}" style="background:#27ae60; padding:4px 8px; font-size:12px;">保存</button>
                        <button class="delete-node" data-id="${node.id}" style="background:#e74c3c; padding:4px 8px; font-size:12px;">删除</button>
                    </div>
                `;
                nodeList.appendChild(nodeItem);
            });

            // 节点名称编辑事件
            document.querySelectorAll('.node-name-input').forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const nodeId = this.getAttribute('data-id');
                        saveNodeName(nodeId, this.value);
                    }
                });
                input.addEventListener('blur', function() {
                    const nodeId = this.getAttribute('data-id');
                    const node = nodes.find(n => n.id === nodeId);
                    if (node && this.value !== node.name) {
                        saveNodeName(nodeId, this.value);
                    }
                });
            });

            document.querySelectorAll('.save-node-name').forEach(button => {
                button.addEventListener('click', function () {
                    const nodeId = this.getAttribute('data-id');
                    const input = document.querySelector(`.node-name-input[data-id="${nodeId}"]`);
                    if (input) {
                        saveNodeName(nodeId, input.value);
                    }
                });
            });

            document.querySelectorAll('.delete-node').forEach(button => {
                button.addEventListener('click', function () {
                    const nodeId = this.getAttribute('data-id');
                    deleteNode(nodeId);
                });
            });
        }

        // 保存节点名称
        async function saveNodeName(nodeId, name) {
            if (!name || !name.trim()) {
                showError('节点名称不能为空');
                return;
            }

            try {
                const result = await apiCall(`/nodes/${nodeId}/name`, {
                    method: 'POST',
                    body: JSON.stringify({ name: name.trim() })
                });

                if (result.success) {
                    // 更新本地节点数据
                    const node = nodes.find(n => n.id === nodeId);
                    if (node) {
                        node.name = name.trim();
                    }
                    safeRenderMap();
                    showSuccess('节点名称已更新');
                } else {
                    showError(result.message || '更新节点名称失败');
                }
            } catch (error) {
                logError('保存节点名称失败:', error);
                showError('保存节点名称时发生错误');
            }
        }

        // 删除节点（调用后端）
        async function deleteNode(nodeId) {
            if (confirm('确定要删除这个节点吗？所有连接到这个节点的道路也会被删除。')) {
                const success = await deleteNodeFromBackend(nodeId);
                if (!success) {
                    showError('删除节点失败');
                }
            }
        }

        // 更新节点选择框
        function updateNodeSelects() {
            const startNodeSelect = document.getElementById('start-node');
            const endNodeSelect = document.getElementById('end-node');
            const targetNodeSelect = document.getElementById('target-node');
            const startNodeVehicleSelect = document.getElementById('start-node-vehicle'); // 新增
            const driverStartSelect = document.getElementById('driver-start-node');
            const driverTargetSelect = document.getElementById('driver-target-node');
            const dqnStartSelect = document.getElementById('dqn-start-node');
            const dqnTargetSelect = document.getElementById('dqn-target-node');

            if (startNodeSelect) startNodeSelect.innerHTML = '';
            if (endNodeSelect) endNodeSelect.innerHTML = '';
            if (targetNodeSelect) targetNodeSelect.innerHTML = '';
            if (startNodeVehicleSelect) startNodeVehicleSelect.innerHTML = '';
            if (driverStartSelect) driverStartSelect.innerHTML = '';
            if (driverTargetSelect) driverTargetSelect.innerHTML = '';
            if (dqnStartSelect) dqnStartSelect.innerHTML = '';
            if (dqnTargetSelect) dqnTargetSelect.innerHTML = '';

            nodes.forEach(node => {
                const baseText = `${node.name} (${node.id})`;
                if (startNodeSelect) {
                    const option1 = document.createElement('option');
                    option1.value = node.id;
                    option1.textContent = baseText;
                    startNodeSelect.appendChild(option1);
                }

                if (endNodeSelect) {
                    const option2 = document.createElement('option');
                    option2.value = node.id;
                    option2.textContent = baseText;
                    endNodeSelect.appendChild(option2);
                }

                if (targetNodeSelect) {
                    const option3 = document.createElement('option');
                    option3.value = node.id;
                    option3.textContent = baseText;
                    targetNodeSelect.appendChild(option3);
                }

                if (startNodeVehicleSelect) {
                    const option4 = document.createElement('option');
                    option4.value = node.id;
                    option4.textContent = `${baseText} - ${nodeTypes[node.type].name}`;
                    startNodeVehicleSelect.appendChild(option4);
                }

                if (driverStartSelect) {
                    const option5 = document.createElement('option');
                    option5.value = node.id;
                    option5.textContent = baseText;
                    driverStartSelect.appendChild(option5);
                }

                if (driverTargetSelect) {
                    const option6 = document.createElement('option');
                    option6.value = node.id;
                    option6.textContent = baseText;
                    driverTargetSelect.appendChild(option6);
                }
                if (dqnStartSelect) {
                    const option7 = document.createElement('option');
                    option7.value = node.id;
                    option7.textContent = baseText;
                    dqnStartSelect.appendChild(option7);
                }
                if (dqnTargetSelect) {
                    const option8 = document.createElement('option');
                    option8.value = node.id;
                    option8.textContent = baseText;
                    dqnTargetSelect.appendChild(option8);
                }
            });

            // 设置默认起点为第一个起点类型节点
            const defaultStartNode = nodes.find(n => n.type === 'start');
            if (defaultStartNode) {
                if (startNodeVehicleSelect && startNodeVehicleSelect.options.length > 0) {
                    startNodeVehicleSelect.value = defaultStartNode.id;
                }
                if (driverStartSelect && driverStartSelect.options.length > 0) {
                    driverStartSelect.value = defaultStartNode.id;
                }
                if (dqnStartSelect && dqnStartSelect.options.length > 0) {
                    dqnStartSelect.value = defaultStartNode.id;
                }
            }
        }

        // 更新路网信息
        function updateRoadInfo() {
            const roadStats = document.getElementById('road-stats');
            const roadList = document.getElementById('road-list');
            const congestionNodeSelect = document.getElementById('congestion-node');
            const statusEdgeSelect = document.getElementById('status-edge');
            const congestionEdgeSelect = document.getElementById('congestion-edge');
            const directionEdgeSelect = document.getElementById('direction-edge');

            if (edges.length === 0) {
                roadStats.innerHTML = '<div class="loading">正在加载路网数据...</div>';
                roadList.innerHTML = '<div class="loading">正在加载道路数据...</div>';
                return;
            }

            // 填充节点选择框（用于节点拥堵控制）
            if (congestionNodeSelect) {
                congestionNodeSelect.innerHTML = '<option value="">请选择节点</option>';
                nodes.forEach(node => {
                    const option = document.createElement('option');
                    option.value = node.id;
                    option.textContent = `${node.name} (${node.id})`;
                    congestionNodeSelect.appendChild(option);
                });
            }

            // 填充道路选择框（用于道路状态控制）
            if (statusEdgeSelect) {
                statusEdgeSelect.innerHTML = '<option value="">请选择道路</option>';
                edges.forEach(edge => {
                    const option = document.createElement('option');
                    option.value = edge.id;
                    option.textContent = edge.id;
                    statusEdgeSelect.appendChild(option);
                });
            }

            // 填充旧版拥堵控制选择框
            if (congestionEdgeSelect) {
                congestionEdgeSelect.innerHTML = '<option value="">请选择道路</option>';
                edges.forEach(edge => {
                    const option = document.createElement('option');
                    option.value = edge.id;
                    option.textContent = edge.id;
                    congestionEdgeSelect.appendChild(option);
                });
            }

            // 填充方向控制选择框
            if (directionEdgeSelect) {
                directionEdgeSelect.innerHTML = '<option value="">请选择道路</option>';
                edges.forEach(edge => {
                    const option = document.createElement('option');
                    option.value = edge.id;
                    option.textContent = edge.id;
                    directionEdgeSelect.appendChild(option);
                });
            }

            const totalEdges = edges.length;
            const congestedEdges = edges.filter(edge => edge.congestion_coeff > 1.5).length;
            const closedEdges = edges.filter(edge => !edge.is_available).length;
            const oneWayEdges = edges.filter(edge => edge.direction !== 'two-way').length;
            const constructionEdges = edges.filter(edge => {
                const status = monitorData.edge_status && monitorData.edge_status[edge.id];
                return status === 'construction';
            }).length;

            roadStats.innerHTML = `
                <div class="status-card"><strong>总道路数:</strong> ${totalEdges}</div>
                <div class="status-card ${congestedEdges > 0 ? 'congested' : ''}"><strong>拥堵道路:</strong> ${congestedEdges}</div>
                <div class="status-card ${constructionEdges > 0 ? 'construction' : ''}"><strong>占道施工:</strong> ${constructionEdges}</div>
                <div class="status-card ${closedEdges > 0 ? 'closed' : ''}"><strong>封闭道路:</strong> ${closedEdges}</div>
                <div class="status-card"><strong>单向道路:</strong> ${oneWayEdges}</div>
            `;

            roadList.innerHTML = '';
            edges.forEach(edge => {
                const startNode = nodes.find(n => n.id === edge.start_node);
                const endNode = nodes.find(n => n.id === edge.end_node);
                const congestion = edge.congestion_coeff || 1.0;
                const available = edge.is_available !== false;
                const directionName = directionTypes[edge.direction] ? directionTypes[edge.direction].name : edge.direction;
                
                // 获取道路状态
                const edgeStatus = monitorData.edge_status && monitorData.edge_status[edge.id] || 'normal';
                const statusNames = {
                    'normal': '正常',
                    'congested': '拥堵',
                    'construction': '占道施工',
                    'closed': '封闭'
                };
                const statusName = statusNames[edgeStatus] || '正常';

                const roadItem = document.createElement('div');
                roadItem.className = `status-card ${congestion > 1.5 ? 'congested' : ''} ${!available ? 'closed' : ''} ${edgeStatus === 'construction' ? 'construction' : ''}`;
                const edgeName = edge.name || edge.id;
                roadItem.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                        <input type="text" class="edge-name-input" data-id="${edge.id}" 
                               value="${escapeHtml(edgeName)}" 
                               style="flex:1; padding:4px 8px; border:1px solid #ddd; border-radius:4px; font-weight:bold;"
                               placeholder="道路名称">
                        <span style="color:#999; font-size:12px;">(${edge.id})</span>
                        <button class="save-edge-name" data-id="${edge.id}" style="background:#27ae60; padding:4px 8px; font-size:12px;">保存</button>
                    </div>
                    <div style="font-size:12px; color:#666;">
                        ${startNode ? startNode.name : edge.start_node} → ${endNode ? endNode.name : edge.end_node}<br>
                        长度: ${edge.length}m | 最大承重: ${edge.max_weight}t | 最大宽度: ${edge.max_width}m<br>
                        拥堵系数: ${congestion.toFixed(2)} | 方向: ${directionName} | 状态: ${statusName}
                    </div>
                `;
                roadList.appendChild(roadItem);
            });
        }

        // 保存道路名称（保留用于兼容性，实际使用 editEdgeNameOnMap）
        async function saveEdgeName(edgeId, name, formatOptions = {}) {
            if (!name || !name.trim()) {
                showError('道路名称不能为空');
                return;
            }

            try {
                const data = { name: name.trim(), ...formatOptions };
                const result = await apiCall(`/edges/${edgeId}/name`, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });

                if (result.success) {
                    // 更新本地道路数据
                    const edge = edges.find(e => e.id === edgeId);
                    if (edge) {
                        edge.name = name.trim();
                        Object.assign(edge, formatOptions);
                    }
                    safeRenderMap();
                    showSuccess('道路名称已更新');
                } else {
                    showError(result.message || '更新道路名称失败');
                }
            } catch (error) {
                logError('保存道路名称失败:', error);
                showError('保存道路名称时发生错误');
            }
        }

        // 更新地图文字框列表显示
        function updateMapLabelsList() {
            const listEl = document.getElementById('map-labels-list');
            if (!listEl) return;

            if (mapTextLabels.length === 0) {
                listEl.innerHTML = '<div class="loading">暂无文字框</div>';
                return;
            }

            listEl.innerHTML = '';
            mapTextLabels.forEach(label => {
                const item = document.createElement('div');
                item.style.cssText = 'padding:8px; margin-bottom:5px; border:1px solid #ddd; border-radius:4px; background:#f9f9f9;';
                item.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="flex:1;">
                            <strong>${escapeHtml(label.text)}</strong><br>
                            <small style="color:#666;">位置: (${Math.round(label.x)}, ${Math.round(label.y)})</small>
                        </div>
                        <div style="display:flex; gap:5px;">
                            <button class="edit-map-label" data-id="${label.id}" style="background:#3498db; padding:4px 8px; font-size:12px;">编辑</button>
                            <button class="delete-map-label" data-id="${label.id}" style="background:#e74c3c; padding:4px 8px; font-size:12px;">删除</button>
                        </div>
                    </div>
                `;
                listEl.appendChild(item);
            });

            // 绑定编辑和删除事件
            document.querySelectorAll('.edit-map-label').forEach(btn => {
                btn.addEventListener('click', () => {
                    const labelId = btn.getAttribute('data-id');
                    editMapLabel(labelId);
                });
            });

            document.querySelectorAll('.delete-map-label').forEach(btn => {
                btn.addEventListener('click', () => {
                    const labelId = btn.getAttribute('data-id');
                    deleteMapLabel(labelId);
                });
            });
        }

        // 添加地图文字框（在地图上点击）
        async function addMapLabelAtPosition(x, y) {
            const text = prompt('请输入文字内容:');
            if (!text || !text.trim()) return;

            const label = {
                x: x,
                y: y,
                text: text.trim(),
                font_size: 14,
                font_family: 'Arial',
                font_weight: 'normal',
                color: '#000000',
                background_color: 'rgba(255,255,255,0.8)',
                border_color: '#ccc',
                border_width: 1,
                border_radius: 4,
                padding: 4,
                opacity: 1.0,
                rotation: 0,
                z_index: 1
            };

            try {
                const result = await apiCall('/map-labels', {
                    method: 'POST',
                    body: JSON.stringify(label)
                });

                if (result.success) {
                    mapTextLabels.push(result.label);
                    updateMapLabelsList();
                    safeRenderMap();
                    showSuccess('文字框添加成功');
                } else {
                    showError(result.message || '添加文字框失败');
                }
            } catch (error) {
                logError('添加地图文字框失败:', error);
                showError('添加文字框时发生错误');
            }
        }

        // 编辑地图文字框
        async function editMapLabel(labelId) {
            const label = mapTextLabels.find(l => l.id === labelId);
            if (!label) return;

            // 创建编辑表单
            const form = document.createElement('div');
            form.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.3); z-index:10000; min-width:400px; max-height:80vh; overflow-y:auto;';
            form.innerHTML = `
                <h3 style="margin-top:0;">编辑文字框</h3>
                <div style="margin-bottom:10px;">
                    <label>文字内容:</label>
                    <input type="text" id="label-text" value="${escapeHtml(label.text)}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>字体大小:</label>
                        <input type="number" id="label-font-size" value="${label.font_size || 14}" min="8" max="72" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>字体:</label>
                        <select id="label-font-family" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="Arial" ${label.font_family === 'Arial' ? 'selected' : ''}>Arial</option>
                            <option value="Microsoft YaHei" ${label.font_family === 'Microsoft YaHei' ? 'selected' : ''}>微软雅黑</option>
                            <option value="SimSun" ${label.font_family === 'SimSun' ? 'selected' : ''}>宋体</option>
                            <option value="SimHei" ${label.font_family === 'SimHei' ? 'selected' : ''}>黑体</option>
                        </select>
                    </div>
                    <div>
                        <label>字体粗细:</label>
                        <select id="label-font-weight" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="normal" ${label.font_weight === 'normal' ? 'selected' : ''}>正常</option>
                            <option value="bold" ${label.font_weight === 'bold' ? 'selected' : ''}>粗体</option>
                        </select>
                    </div>
                    <div>
                        <label>旋转角度:</label>
                        <input type="number" id="label-rotation" value="${label.rotation || 0}" min="0" max="360" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>文字颜色:</label>
                        <input type="color" id="label-color" value="${label.color || '#000000'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>背景颜色:</label>
                        <input type="color" id="label-bg-color" value="${label.background_color && label.background_color !== 'transparent' ? label.background_color : '#ffffff'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>边框颜色:</label>
                        <input type="color" id="label-border-color" value="${label.border_color && label.border_color !== 'transparent' ? label.border_color : '#cccccc'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>透明度:</label>
                        <input type="range" id="label-opacity" value="${(label.opacity !== undefined ? label.opacity : 1.0) * 100}" min="0" max="100" style="width:100%;">
                        <span id="opacity-value">${Math.round((label.opacity !== undefined ? label.opacity : 1.0) * 100)}%</span>
                    </div>
                </div>
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <button id="save-label-btn" style="flex:1; padding:10px; background:#27ae60; color:white; border:none; border-radius:4px; cursor:pointer;">保存</button>
                    <button id="cancel-label-btn" style="flex:1; padding:10px; background:#95a5a6; color:white; border:none; border-radius:4px; cursor:pointer;">取消</button>
                </div>
            `;

            document.body.appendChild(form);

            // 透明度滑块更新
            const opacitySlider = document.getElementById('label-opacity');
            const opacityValue = document.getElementById('opacity-value');
            opacitySlider.addEventListener('input', (e) => {
                opacityValue.textContent = e.target.value + '%';
            });

            // 保存
            document.getElementById('save-label-btn').addEventListener('click', async () => {
                const updates = {
                    text: document.getElementById('label-text').value.trim(),
                    font_size: parseFloat(document.getElementById('label-font-size').value),
                    font_family: document.getElementById('label-font-family').value,
                    font_weight: document.getElementById('label-font-weight').value,
                    color: document.getElementById('label-color').value,
                    background_color: document.getElementById('label-bg-color').value,
                    border_color: document.getElementById('label-border-color').value,
                    rotation: parseFloat(document.getElementById('label-rotation').value),
                    opacity: parseFloat(document.getElementById('label-opacity').value) / 100
                };

                try {
                    const result = await apiCall(`/map-labels/${labelId}`, {
                        method: 'PUT',
                        body: JSON.stringify(updates)
                    });

                    if (result.success) {
                        Object.assign(label, updates);
                        updateMapLabelsList();
                        safeRenderMap();
                        showSuccess('文字框已更新');
                        document.body.removeChild(form);
                    } else {
                        showError(result.message || '更新文字框失败');
                    }
                } catch (error) {
                    logError('更新地图文字框失败:', error);
                    showError('更新文字框时发生错误');
                }
            });

            // 取消
            document.getElementById('cancel-label-btn').addEventListener('click', () => {
                document.body.removeChild(form);
            });
        }

        // 删除地图文字框
        async function deleteMapLabel(labelId) {
            if (!confirm('确定要删除这个文字框吗？')) return;

            try {
                const result = await apiCall(`/map-labels/${labelId}`, {
                    method: 'DELETE'
                });

                if (result.success) {
                    mapTextLabels = mapTextLabels.filter(l => l.id !== labelId);
                    updateMapLabelsList();
                    safeRenderMap();
                    showSuccess('文字框已删除');
                } else {
                    showError(result.message || '删除文字框失败');
                }
            } catch (error) {
                logError('删除地图文字框失败:', error);
                showError('删除文字框时发生错误');
            }
        }

        // 在地图上编辑节点名称和格式
        function editNodeNameOnMap(node) {
            const currentName = node.name || node.id;
            
            // 创建编辑表单
            const form = document.createElement('div');
            form.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.3); z-index:10000; min-width:400px; max-height:80vh; overflow-y:auto;';
            form.innerHTML = `
                <h3 style="margin-top:0;">编辑节点名称 (${node.id})</h3>
                <div style="margin-bottom:10px;">
                    <label>节点名称:</label>
                    <input type="text" id="node-name-input" value="${escapeHtml(currentName)}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>字体大小:</label>
                        <input type="number" id="node-font-size" value="${node.label_font_size || 10}" min="8" max="72" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>字体:</label>
                        <select id="node-font-family" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="Arial" ${(node.label_font_family || 'Arial') === 'Arial' ? 'selected' : ''}>Arial</option>
                            <option value="Microsoft YaHei" ${node.label_font_family === 'Microsoft YaHei' ? 'selected' : ''}>微软雅黑</option>
                            <option value="SimSun" ${node.label_font_family === 'SimSun' ? 'selected' : ''}>宋体</option>
                            <option value="SimHei" ${node.label_font_family === 'SimHei' ? 'selected' : ''}>黑体</option>
                        </select>
                    </div>
                    <div>
                        <label>字体粗细:</label>
                        <select id="node-font-weight" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="normal" ${(node.label_font_weight || 'normal') === 'normal' ? 'selected' : ''}>正常</option>
                            <option value="bold" ${node.label_font_weight === 'bold' ? 'selected' : ''}>粗体</option>
                        </select>
                    </div>
                    <div>
                        <label>内边距:</label>
                        <input type="number" id="node-padding" value="${node.label_padding || 2}" min="0" max="20" step="1" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>文字颜色:</label>
                        <input type="color" id="node-color" value="${node.label_color || '#000000'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>背景颜色:</label>
                        <input type="color" id="node-bg-color" value="${node.label_background_color && node.label_background_color !== 'transparent' ? node.label_background_color : '#ffffff'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>边框颜色:</label>
                        <input type="color" id="node-border-color" value="${node.label_border_color && node.label_border_color !== 'transparent' ? node.label_border_color : '#cccccc'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>边框宽度:</label>
                        <input type="number" id="node-border-width" value="${node.label_border_width || 0}" min="0" max="5" step="1" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <button id="save-node-btn" style="flex:1; padding:10px; background:#27ae60; color:white; border:none; border-radius:4px; cursor:pointer;">保存</button>
                    <button id="cancel-node-btn" style="flex:1; padding:10px; background:#95a5a6; color:white; border:none; border-radius:4px; cursor:pointer;">取消</button>
                </div>
            `;

            document.body.appendChild(form);

            // 保存
            document.getElementById('save-node-btn').addEventListener('click', async () => {
                const updates = {
                    name: document.getElementById('node-name-input').value.trim(),
                    label_font_size: parseFloat(document.getElementById('node-font-size').value),
                    label_font_family: document.getElementById('node-font-family').value,
                    label_font_weight: document.getElementById('node-font-weight').value,
                    label_color: document.getElementById('node-color').value,
                    label_background_color: document.getElementById('node-bg-color').value,
                    label_border_color: document.getElementById('node-border-color').value,
                    label_border_width: parseFloat(document.getElementById('node-border-width').value),
                    label_padding: parseFloat(document.getElementById('node-padding').value)
                };

                try {
                    const result = await apiCall(`/nodes/${node.id}/name`, {
                        method: 'POST',
                        body: JSON.stringify(updates)
                    });

                    if (result.success) {
                        Object.assign(node, updates);
                        safeRenderMap();
                        showSuccess('节点名称和格式已更新');
                        document.body.removeChild(form);
                    } else {
                        showError(result.message || '更新节点失败');
                    }
                } catch (error) {
                    logError('更新节点失败:', error);
                    showError('更新节点时发生错误');
                }
            });

            // 取消
            document.getElementById('cancel-node-btn').addEventListener('click', () => {
                document.body.removeChild(form);
            });
        }

        // 在地图上编辑道路名称和格式
        function editEdgeNameOnMap(edge) {
            const currentName = edge.name || edge.id;
            
            // 创建编辑表单
            const form = document.createElement('div');
            form.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.3); z-index:10000; min-width:400px; max-height:80vh; overflow-y:auto;';
            form.innerHTML = `
                <h3 style="margin-top:0;">编辑道路名称 (${edge.id})</h3>
                <div style="margin-bottom:10px;">
                    <label>道路名称:</label>
                    <input type="text" id="edge-name-input" value="${escapeHtml(currentName)}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>字体大小:</label>
                        <input type="number" id="edge-font-size" value="${edge.label_font_size || 7}" min="6" max="72" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>字体:</label>
                        <select id="edge-font-family" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="Arial" ${(edge.label_font_family || 'Arial') === 'Arial' ? 'selected' : ''}>Arial</option>
                            <option value="Microsoft YaHei" ${edge.label_font_family === 'Microsoft YaHei' ? 'selected' : ''}>微软雅黑</option>
                            <option value="SimSun" ${edge.label_font_family === 'SimSun' ? 'selected' : ''}>宋体</option>
                            <option value="SimHei" ${edge.label_font_family === 'SimHei' ? 'selected' : ''}>黑体</option>
                        </select>
                    </div>
                    <div>
                        <label>字体粗细:</label>
                        <select id="edge-font-weight" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="normal" ${(edge.label_font_weight || 'normal') === 'normal' ? 'selected' : ''}>正常</option>
                            <option value="bold" ${edge.label_font_weight === 'bold' ? 'selected' : ''}>粗体</option>
                        </select>
                    </div>
                    <div>
                        <label>内边距:</label>
                        <input type="number" id="edge-padding" value="${edge.label_padding || 2}" min="0" max="20" step="1" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>文字颜色:</label>
                        <input type="color" id="edge-color" value="${edge.label_color || '#000000'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>背景颜色:</label>
                        <input type="color" id="edge-bg-color" value="${edge.label_background_color && edge.label_background_color !== 'transparent' ? edge.label_background_color : '#3498db'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>边框颜色:</label>
                        <input type="color" id="edge-border-color" value="${edge.label_border_color && edge.label_border_color !== 'transparent' ? edge.label_border_color : '#cccccc'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>边框宽度:</label>
                        <input type="number" id="edge-border-width" value="${edge.label_border_width || 0}" min="0" max="5" step="1" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <button id="save-edge-btn" style="flex:1; padding:10px; background:#27ae60; color:white; border:none; border-radius:4px; cursor:pointer;">保存</button>
                    <button id="cancel-edge-btn" style="flex:1; padding:10px; background:#95a5a6; color:white; border:none; border-radius:4px; cursor:pointer;">取消</button>
                </div>
            `;

            document.body.appendChild(form);

            // 保存
            document.getElementById('save-edge-btn').addEventListener('click', async () => {
                const updates = {
                    name: document.getElementById('edge-name-input').value.trim(),
                    label_font_size: parseFloat(document.getElementById('edge-font-size').value),
                    label_font_family: document.getElementById('edge-font-family').value,
                    label_font_weight: document.getElementById('edge-font-weight').value,
                    label_color: document.getElementById('edge-color').value,
                    label_background_color: document.getElementById('edge-bg-color').value,
                    label_border_color: document.getElementById('edge-border-color').value,
                    label_border_width: parseFloat(document.getElementById('edge-border-width').value),
                    label_padding: parseFloat(document.getElementById('edge-padding').value)
                };

                try {
                    const result = await apiCall(`/edges/${edge.id}/name`, {
                        method: 'POST',
                        body: JSON.stringify(updates)
                    });

                    if (result.success) {
                        Object.assign(edge, updates);
                        safeRenderMap();
                        showSuccess('道路名称和格式已更新');
                        document.body.removeChild(form);
                    } else {
                        showError(result.message || '更新道路失败');
                    }
                } catch (error) {
                    logError('更新道路失败:', error);
                    showError('更新道路时发生错误');
                }
            });

            // 取消
            document.getElementById('cancel-edge-btn').addEventListener('click', () => {
                document.body.removeChild(form);
            });
        }

        // 使文字框可拖动
        function makeLabelDraggable(labelEl, label) {
            let isDragging = false;
            let startX, startY, initialX, initialY;

            labelEl.addEventListener('mousedown', (e) => {
                if (!editMode) return;
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialX = label.x;
                initialY = label.y;
                e.preventDefault();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                labelEl.style.left = `${initialX + dx}px`;
                labelEl.style.top = `${initialY + dy}px`;
            });

            document.addEventListener('mouseup', async () => {
                if (!isDragging) return;
                isDragging = false;
                const newX = parseFloat(labelEl.style.left);
                const newY = parseFloat(labelEl.style.top);
                
                try {
                    const result = await apiCall(`/map-labels/${label.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ x: newX, y: newY })
                    });

                    if (result.success) {
                        label.x = newX;
                        label.y = newY;
                    } else {
                        // 恢复原位置
                        labelEl.style.left = `${label.x}px`;
                        labelEl.style.top = `${label.y}px`;
                    }
                } catch (error) {
                    logError('更新文字框位置失败:', error);
                    labelEl.style.left = `${label.x}px`;
                    labelEl.style.top = `${label.y}px`;
                }
            });
        }

        // 新增：更新车辆类型列表
        function updateVehicleTypesList() {
            const vehicleTypesList = document.getElementById('vehicle-types-list');
            vehicleTypesList.innerHTML = '';

            if (Object.keys(vehicleTypes).length === 0) {
                vehicleTypesList.innerHTML = '<div class="loading">暂无车辆类型配置</div>';
                return;
            }

            Object.entries(vehicleTypes).forEach(([type, config]) => {
                const speedDisplay = getVehicleSpeed(config);
                const typeItem = document.createElement('div');
                typeItem.className = 'vehicle-type-item';
                typeItem.innerHTML = `
                    <div>
                        <strong>${type}</strong>
                        <div class="vehicle-info">
                            速度: ${speedDisplay} km/h | 
                            单向道路: ${config.can_use_one_way ? '可用' : '禁用'} | 
                            双向道路: ${config.can_use_two_way ? '可用' : '禁用'}
                        </div>
                    </div>
                    <button class="edit-vehicle-type" data-type="${type}" style="width:auto; background:#3498db;">编辑</button>
                `;
                vehicleTypesList.appendChild(typeItem);
            });

            // 添加编辑事件
            document.querySelectorAll('.edit-vehicle-type').forEach(button => {
                button.addEventListener('click', function () {
                    const vehicleType = this.getAttribute('data-type');
                    showVehicleTypeConfigForm(vehicleType);
                });
            });
        }

        // 新增：显示车辆类型配置表单
        function showVehicleTypeConfigForm(vehicleType) {
            const config = vehicleTypes[vehicleType];
            if (!config) return;

            // 移除现有的配置表单
            const existingForm = document.querySelector('.config-form');
            if (existingForm) {
                existingForm.remove();
            }

            const form = document.createElement('div');
            form.className = 'config-form active';
            form.innerHTML = `
                <h3>编辑 ${vehicleType} 配置</h3>
                <div class="config-row">
                    <label>速度 (km/h):</label>
                    <input type="number" id="edit-speed-kmph" min="1" max="120" step="1" value="${getVehicleSpeed(config)}">
                </div>
                <div class="config-row">
                    <label>可使用单向道路:</label>
                    <select id="edit-can-use-one-way">
                        <option value="true" ${config.can_use_one_way ? 'selected' : ''}>是</option>
                        <option value="false" ${!config.can_use_one_way ? 'selected' : ''}>否</option>
                    </select>
                </div>
                <div class="config-row">
                    <label>可使用双向道路:</label>
                    <select id="edit-can-use-two-way">
                        <option value="true" ${config.can_use_two_way ? 'selected' : ''}>是</option>
                        <option value="false" ${!config.can_use_two_way ? 'selected' : ''}>否</option>
                    </select>
                </div>
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button id="save-vehicle-config" style="background:#27ae60;">保存</button>
                    <button id="cancel-vehicle-config" style="background:#95a5a6;">取消</button>
                </div>
            `;

            document.getElementById('vehicle-config').appendChild(form);

            // 保存配置
            document.getElementById('save-vehicle-config').addEventListener('click', async () => {
                const speedInput = document.getElementById('edit-speed-kmph');
                const speedValue = speedInput ? parseFloat(speedInput.value) : NaN;
                const updatedConfig = {
                    speed_kmph: Number.isNaN(speedValue) ? getVehicleSpeed(config) : speedValue,
                    can_use_one_way: document.getElementById('edit-can-use-one-way').value === 'true',
                    can_use_two_way: document.getElementById('edit-can-use-two-way').value === 'true'
                };

                await updateVehicleTypeConfig(vehicleType, updatedConfig);
                form.remove();
            });

            // 取消编辑
            document.getElementById('cancel-vehicle-config').addEventListener('click', () => {
                form.remove();
            });
        }

        // 更新监控数据区与调度结果展示（显示效率分）
        function updateMonitorData() {
            const monitorDataEl = document.getElementById('monitor-data');
            const dispatchResultsEl = document.getElementById('dispatch-results');

            if (!monitorData.edge_congestion) {
                monitorDataEl.innerHTML = '<div class="loading">正在加载监控数据...</div>';
                return;
            }

            let congestedRoads = Object.keys(monitorData.edge_congestion)
                .filter(edgeId => monitorData.edge_congestion[edgeId] > 1.5);

            let closedRoads = Object.keys(monitorData.edge_available)
                .filter(edgeId => !monitorData.edge_available[edgeId]);

            let maxQueue = Math.max(...Object.values(monitorData.entrance_queue || {}), 0);

            monitorDataEl.innerHTML = `
                <div class="status-card"><strong>拥堵道路:</strong> ${congestedRoads.length > 0 ? congestedRoads.join(', ') : '无'}</div>
                <div class="status-card"><strong>封闭道路:</strong> ${closedRoads.length > 0 ? closedRoads.join(', ') : '无'}</div>
                <div class="status-card"><strong>进场口排队峰值:</strong> ${maxQueue}辆</div>
            `;

            // 调度结果：显示每车路径文本与效率分
            dispatchResultsEl.innerHTML = '';
            vehicles.forEach(vehicle => {
                if (vehicle.assigned_entrance || vehicle.current_path) {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'status-card';

                    let pathText = '';
                    if (vehicle.current_path && vehicle.current_path.length > 0) {
                        pathText = vehicle.current_path.map(edge => {
                            const startNode = nodes.find(n => n.id === edge.start_node);
                            return startNode ? startNode.name : edge.start_node;
                        }).join(' → ');

                        const lastEdge = vehicle.current_path[vehicle.current_path.length - 1];
                        const endNode = nodes.find(n => n.id === lastEdge.end_node);
                        if (endNode) {
                            pathText += ' → ' + endNode.name;
                        }
                    }

                    const eff = vehicle.efficiency_score !== undefined && vehicle.efficiency_score !== null
                        ? `${vehicle.efficiency_score.toFixed(1)}`
                        : 'N/A';

                    const estimatedTime = vehicle.estimated_time !== undefined && vehicle.estimated_time !== null
                        ? `${parseFloat(vehicle.estimated_time).toFixed(1)}分钟`
                        : '计算中...';

                    resultItem.innerHTML = `
                        <strong>${vehicle.id}</strong> - ${vehicle.type}<br>
                        起点: ${getNodeName(vehicle.start_node)} | 目标: ${getNodeName(vehicle.target_node)}<br>
                        路径: ${pathText || '未规划'}<br>
                        预计通行时间: ${estimatedTime}<br>
                        效率评分: ${eff}
                    `;
                    dispatchResultsEl.appendChild(resultItem);
                }
            });

            if (dispatchResultsEl.children.length === 0) {
                dispatchResultsEl.innerHTML = '<div class="loading">暂无调度结果</div>';
            }

            const arrivalSummaryEl = document.getElementById('arrival-summary');
            const routeStatsEl = document.getElementById('route-stats-list');
            const arrivalListEl = document.getElementById('arrival-list');
            const arrivalRecords = monitorData.arrival_records || [];
            const routeStats = monitorData.route_time_stats || {};

            if (arrivalSummaryEl) {
                if (arrivalRecords.length === 0) {
                    arrivalSummaryEl.innerHTML = '暂无到达数据';
                } else {
                    const latest = arrivalRecords[arrivalRecords.length - 1];
                    const latestDistance = formatDistance(latest.distance_m);
                    const latestAvgSpeed = formatSpeed(latest.avg_speed_kmph);
                    const routeLabel = `${latest.start_node} → ${latest.target_node}`;
                    arrivalSummaryEl.innerHTML = `
                        <strong>累计到达:</strong> ${arrivalRecords.length} 次<br>
                        <strong>最新:</strong> ${escapeHtml(latest.driver_name || latest.driver_id)} | ${escapeHtml(routeLabel)}<br>
                        <strong>耗时:</strong> ${latest.duration_minutes} 分钟<br>
                        <strong>距离:</strong> ${latestDistance} | <strong>平均速度:</strong> ${latestAvgSpeed}
                    `;
                }
            }

            if (routeStatsEl) {
                const entries = Object.entries(routeStats);
                if (entries.length === 0) {
                    routeStatsEl.innerHTML = '<div class="loading">暂无路线统计</div>';
                } else {
                    routeStatsEl.innerHTML = entries
                        .sort((a, b) => (b[1].last_updated || '').localeCompare(a[1].last_updated || ''))
                        .map(([key, stats]) => {
                            const [start, target] = key.split('->');
                            const avgDistance = stats.distance_summary && Number(stats.distance_summary.average_distance_m);
                            const avgSpeed = stats.avg_speed_summary && Number(stats.avg_speed_summary.average_speed_kmph);
                            const distanceLabel = avgDistance && avgDistance > 0 ? formatDistance(avgDistance) : '-';
                            const speedLabel = avgSpeed && avgSpeed > 0 ? `${avgSpeed.toFixed(2)} km/h` : '-';
                            let vehicleTypeHtml = '';
                            if (stats.vehicle_type_stats) {
                                const typeEntries = Object.entries(stats.vehicle_type_stats)
                                    .sort((a, b) => (b[1].count || 0) - (a[1].count || 0))
                                    .slice(0, 3)
                                    .map(([type, info]) => `${escapeHtml(type)}: ${info.average_minutes} 分钟 (${info.count} 次)`);
                                if (typeEntries.length) {
                                    vehicleTypeHtml = `<div class="vehicle-info">按车辆类型: ${typeEntries.join(' | ')}</div>`;
                                }
                            }
                            return `
                                <div class="route-stats-item">
                                    <strong>${escapeHtml(start)} → ${escapeHtml(target)}</strong><br>
                                    平均用时: ${stats.average_minutes} 分钟<br>
                                    平均距离: ${distanceLabel}<br>
                                    平均速度: ${speedLabel}<br>
                                    样本数: ${stats.count}
                                    ${vehicleTypeHtml}
                                </div>
                            `;
                        }).join('');
                }
            }

            if (arrivalListEl) {
                if (arrivalRecords.length === 0) {
                    arrivalListEl.innerHTML = '<div class="loading">暂无到达记录</div>';
                } else {
                    const latestRecords = arrivalRecords.slice(-10).reverse();
                    arrivalListEl.innerHTML = latestRecords.map(record => `
                        <div class="arrival-item">
                            <div class="arrival-item-header">
                                <span>${escapeHtml(record.driver_name || record.driver_id)}</span>
                                <span>${record.duration_minutes} 分钟</span>
                            </div>
                            <div>路线: ${escapeHtml(record.start_node)} → ${escapeHtml(record.target_node)}</div>
                            <div>出发时间: ${record.start_time ? record.start_time.replace('T', ' ') : '-'}</div>
                            <div>到达时间: ${record.arrival_time ? record.arrival_time.replace('T', ' ') : '-'}</div>
                            <div>距离: ${formatDistance(record.distance_m)} | 平均速度: ${formatSpeed(record.avg_speed_kmph)}</div>
                            <div>速度设定: ${record.custom_speed_kmph ? record.custom_speed_kmph + ' km/h' : '-'}</div>
                        </div>
                    `).join('');
                }
            }
            
            // 更新图表（传递数据）
            if (typeof updateAllCharts === 'function') {
                updateAllCharts({ vehicles: vehicles || [], edges: edges || [] });
            }
        }

        // 获取地图背景
        async function fetchMapLabels() {
            try {
                const result = await apiCall('/map-labels');
                if (result.success) {
                    mapTextLabels = result.labels || [];
                    updateMapLabelsList();
                    safeRenderMap();
                }
            } catch (error) {
                logError('获取地图文字框失败:', error);
            }
        }

        async function fetchMapBackground() {
            try {
                const result = await apiCall('/map-background');
                const removeBtn = document.getElementById('remove-map-background');
                if (result.success && result.map_background) {
                    mapBackground = result.map_background;
                    updateMapUploadMessage(MAP_UPLOAD_SUCCESS_HTML);
                    resetMapFileInput();
                    const mapUploadArea = document.getElementById('map-upload-area');
                    if (mapUploadArea) {
                        mapUploadArea.style.background = '#f8f9fa';
                    }
                    if (removeBtn) {
                        removeBtn.style.display = 'block';
                    }
                    log('已从服务器加载地图背景');
                    return true;
                } else {
                    mapBackground = null;
                    updateMapUploadMessage(MAP_UPLOAD_DEFAULT_HTML);
                    resetMapFileInput();
                    const mapUploadArea = document.getElementById('map-upload-area');
                    if (mapUploadArea) {
                        mapUploadArea.style.background = '#f8f9fa';
                    }
                    if (removeBtn) {
                        removeBtn.style.display = 'none';
                    }
                }
            } catch (error) {
                logWarn('无法从服务器加载地图背景:', error);
                updateMapUploadMessage(MAP_UPLOAD_DEFAULT_HTML);
                resetMapFileInput();
                const mapUploadArea = document.getElementById('map-upload-area');
                if (mapUploadArea) {
                    mapUploadArea.style.background = '#f8f9fa';
                }
                const removeBtn = document.getElementById('remove-map-background');
                if (removeBtn) {
                    removeBtn.style.display = 'none';
                }
            }
            return false;
        }

        // 保存地图背景到服务器
        async function saveMapBackground(backgroundData) {
            try {
                const result = await apiCall('/map-background', {
                    method: 'POST',
                    body: JSON.stringify({ map_background: backgroundData })
                });
                if (result.success) {
                    mapBackground = backgroundData;
                    updateMapUploadMessage(MAP_UPLOAD_SUCCESS_HTML);
                    resetMapFileInput();
                    const removeBtn = document.getElementById('remove-map-background');
                    if (removeBtn) {
                        removeBtn.style.display = 'block';
                    }
                    const mapUploadArea = document.getElementById('map-upload-area');
                    if (mapUploadArea) {
                        mapUploadArea.style.background = '#f8f9fa';
                    }
                    log('地图背景已保存到服务器');
                    return true;
                }
            } catch (error) {
                logError('保存地图背景失败:', error);
                showError('保存地图背景失败: ' + (error.message || '网络错误'));
            }
            return false;
        }

        // 删除地图背景
        async function deleteMapBackground() {
            try {
                const result = await apiCall('/map-background', {
                    method: 'DELETE'
                });
                if (result.success) {
                    mapBackground = null;
                    updateMapUploadMessage(MAP_UPLOAD_DEFAULT_HTML);
                    resetMapFileInput();
                    const removeBtn = document.getElementById('remove-map-background');
                    if (removeBtn) {
                        removeBtn.style.display = 'none';
                    }
                    safeRenderMap();
                    showSuccess('地图背景已清除');
                    return true;
                }
            } catch (error) {
                console.error('删除地图背景失败:', error);
                showError('删除地图背景失败: ' + (error.message || '网络错误'));
            }
            return false;
        }

        // 导入 DXF 路网
        async function importDxfFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const apiBase = window.API_BASE || 'http://localhost:5000/api';
                const response = await fetch(`${apiBase}/import-dxf`, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    throw new Error(data.message || `HTTP ${response.status}`);
                }
                showSuccess(data.message || 'DXF 导入成功');
                await loadSystemData();
                return true;
            } catch (error) {
                console.error('导入 DXF 失败:', error);
                showError('导入 DXF 失败：' + (error.message || '未知错误'));
                return false;
            }
        }

        async function convertDxfToJson(file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const apiBase = window.API_BASE || 'http://localhost:5000/api';
                const response = await fetch(`${apiBase}/dxf-to-json`, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    throw new Error(data.message || `HTTP ${response.status}`);
                }
                const downloadFn = window.downloadJsonFile || getDownloadJsonFile();
                downloadFn({ nodes: data.nodes, edges: data.edges }, `roadnet_${Date.now()}.json`);
                showSuccess(`DXF 转 JSON 成功（节点: ${data.node_count}, 道路: ${data.edge_count}）`);
                return true;
            } catch (error) {
                console.error('DXF 转 JSON 失败:', error);
                showError('DXF 转 JSON 失败：' + (error.message || '未知错误'));
                return false;
            }
        }

        async function importJsonRoadnet(jsonData) {
            const result = await apiCall('/import-roadnet', {
                method: 'POST',
                body: JSON.stringify(jsonData)
            });
            if (result.success) {
                await loadSystemData();
                showSuccess(result.message || 'JSON 路网导入成功');
                return true;
            }
            showError(result.message || 'JSON 路网导入失败');
            return false;
        }

        async function exportJsonRoadnet() {
            const result = await apiCall('/export-roadnet');
            if (result.success && result.nodes && result.edges) {
                const downloadFn = window.downloadJsonFile || getDownloadJsonFile();
                downloadFn({ nodes: result.nodes, edges: result.edges }, `roadnet_export_${Date.now()}.json`);
                showSuccess(`成功导出 JSON：节点 ${result.node_count}，道路 ${result.edge_count}`);
                return true;
            }
            showError(result.message || '导出 JSON 失败');
            return false;
        }

        // 初始化函数
        async function init() {
            try {
                log('🚀 页面加载完成，开始初始化...');
                
                // 初始化 WebSocket（使用 try-catch 确保错误不会阻止后续初始化）
                try {
                    if (typeof window.initWebSocket === 'function') {
                        // initWebSocket 现在是异步函数，需要使用 await
                        await window.initWebSocket();
                    } else {
                        logWarn('⚠️ initWebSocket 函数未找到，跳过 WebSocket 初始化');
                    }
                } catch (wsError) {
                    logError('WebSocket 初始化失败:', wsError);
                }
                
                // 初始化图表（使用 try-catch 确保错误不会阻止后续初始化）
                try {
                    if (typeof window.initCharts === 'function') {
                        initCharts();
                    } else {
                        logWarn('⚠️ initCharts 函数未找到，跳过图表初始化');
                    }
                } catch (chartError) {
                    logError('图表初始化失败:', chartError);
                }
            
            // 从服务器加载地图背景
            await fetchMapBackground();

                // 获取数据但不重置系统（只获取当前状态）
                try {
                    const success = await loadSystemData();
                    if (!success) {
                        console.error('❌ 数据加载失败，继续初始化以便手动操作');
                        showError('无法加载最新路网数据，请检查后端服务或网络连接');
                    }
                } catch (dataError) {
                    logError('数据加载失败:', dataError);
                    showError('数据加载失败，但可以继续使用');
                }
                
                // 地图加载完成后，居中显示内容
                // 使用多个延迟确保地图完全渲染
                setTimeout(() => {
                    try {
                        centerMapContent(true); // 首次加载时强制居中
                    } catch (err) {
                        logError('居中地图失败:', err);
                    }
                }, 300);
                setTimeout(() => {
                    try {
                        centerMapContent(true); // 首次加载时强制居中
                    } catch (err) {
                        logError('居中地图失败:', err);
                    }
                }, 600);

                // 标签切换
                try {
                    document.querySelectorAll('.tab').forEach(tab => {
                        tab.addEventListener('click', function () {
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                    this.classList.add('active');
                    document.getElementById(this.getAttribute('data-tab')).classList.add('active');

                            if (this.getAttribute('data-tab') === 'driver-portal') {
                                try {
                                    updateDriverSummary();
                                    updateDriverHistory();
                                } catch (err) {
                                    logError('更新司机信息失败:', err);
                                }
                            }
                            if (this.getAttribute('data-tab') === 'travel-time-db') {
                                try {
                                    fetchTravelTimeDatabase();
                                    fetchDqnStatus();
                                } catch (err) {
                                    logError('获取行驶时间数据库失败:', err);
                                }
                            }
                            if (this.getAttribute('data-tab') === 'monitor') {
                                // 切换到监控标签时更新图表
                                setTimeout(() => {
                                    try {
                                        if (typeof updateAllCharts === 'function') {
                                            updateAllCharts({ vehicles: vehicles || [], edges: edges || [] });
                                        }
                                    } catch (err) {
                                        logError('更新图表失败:', err);
                                    }
                                }, 100);
                            }
                        });
                    });
                } catch (tabError) {
                    logError('标签切换事件绑定失败:', tabError);
                }

            const refreshTravelDbBtn = document.getElementById('refresh-travel-db');
            if (refreshTravelDbBtn) {
                refreshTravelDbBtn.addEventListener('click', async () => {
                    await fetchTravelTimeDatabase();
                    showSuccess('行驶时间数据库已刷新');
                });
            }

            const exportTravelDbBtn = document.getElementById('export-travel-db');
            if (exportTravelDbBtn) {
                exportTravelDbBtn.addEventListener('click', async () => {
                    await exportTravelTimeDatabase();
                });
            }

            const exportTravelDbExcelBtn = document.getElementById('export-travel-db-excel');
            if (exportTravelDbExcelBtn) {
                exportTravelDbExcelBtn.addEventListener('click', async () => {
                    await exportTravelTimeDatabaseExcel();
                });
            }

            const importTravelDbBtn = document.getElementById('import-travel-db');
            const travelDbFileInput = document.getElementById('travel-db-file');
            if (importTravelDbBtn) {
                importTravelDbBtn.addEventListener('click', () => {
                    if (travelDbFileInput) {
                        travelDbFileInput.click();
                    } else {
                        showError('找不到导入控件，请刷新页面后重试');
                    }
                });
            }
            if (travelDbFileInput) {
                travelDbFileInput.addEventListener('change', handleTravelDbFileChange);
            }

            // 保存训练数据到文件
            const saveTravelDbBtn = document.getElementById('save-travel-db');
            if (saveTravelDbBtn) {
                saveTravelDbBtn.addEventListener('click', async () => {
                    try {
                        const result = await apiCall('/travel-time-database/save', {
                            method: 'POST'
                        });
                        if (result.success) {
                            showSuccess(result.message || '训练数据已保存到文件');
                        } else {
                            showError(result.message || '保存失败');
                        }
                    } catch (error) {
                        showError(`保存失败: ${error.message || error}`);
                    }
                });
            }

            // 清除训练数据
            const clearTravelDbBtn = document.getElementById('clear-travel-db');
            const clearDbDialog = document.getElementById('clear-db-dialog');
            const confirmClearDbBtn = document.getElementById('confirm-clear-db');
            const cancelClearDbBtn = document.getElementById('cancel-clear-db');
            const clearFiltersDiv = document.getElementById('clear-filters');
            const clearModeRadios = document.querySelectorAll('input[name="clear-mode"]');

            // 显示/隐藏清除对话框
            if (clearTravelDbBtn && clearDbDialog) {
                clearTravelDbBtn.addEventListener('click', () => {
                    clearDbDialog.style.display = clearDbDialog.style.display === 'none' ? 'block' : 'none';
                });
            }

            // 切换清除模式
            if (clearModeRadios.length > 0) {
                clearModeRadios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        if (clearFiltersDiv) {
                            clearFiltersDiv.style.display = radio.value === 'filter' ? 'block' : 'none';
                        }
                    });
                });
            }

            // 取消清除
            if (cancelClearDbBtn && clearDbDialog) {
                cancelClearDbBtn.addEventListener('click', () => {
                    clearDbDialog.style.display = 'none';
                });
            }

            // 确认清除
            if (confirmClearDbBtn) {
                confirmClearDbBtn.addEventListener('click', async () => {
                    const selectedMode = document.querySelector('input[name="clear-mode"]:checked')?.value || 'all';
                    const payload = {
                        confirm: 'yes',
                        mode: selectedMode
                    };

                    if (selectedMode === 'filter') {
                        const filters = {};
                        const beforeDate = document.getElementById('clear-before-date')?.value;
                        const afterDate = document.getElementById('clear-after-date')?.value;
                        const driverId = document.getElementById('clear-driver-id')?.value?.trim();
                        const vehicleType = document.getElementById('clear-vehicle-type')?.value;

                        if (beforeDate) {
                            filters.before_date = new Date(beforeDate).toISOString();
                        }
                        if (afterDate) {
                            filters.after_date = new Date(afterDate).toISOString();
                        }
                        if (driverId) {
                            filters.driver_id = driverId;
                        }
                        if (vehicleType) {
                            filters.vehicle_type = vehicleType;
                        }

                        if (Object.keys(filters).length === 0) {
                            showError('请至少设置一个过滤条件');
                            return;
                        }

                        payload.filters = filters;
                    }

                    // 二次确认
                    const confirmMessage = selectedMode === 'all' 
                        ? `确定要清除所有训练数据吗？此操作不可恢复！\n\n建议先导出数据备份。`
                        : `确定要按条件清除训练数据吗？\n条件：${JSON.stringify(payload.filters || {}, null, 2)}`;
                    
                    if (!confirm(confirmMessage)) {
                        return;
                    }

                    try {
                        confirmClearDbBtn.disabled = true;
                        confirmClearDbBtn.textContent = '清除中...';
                        
                        const result = await apiCall('/travel-time-database/clear', {
                            method: 'POST',
                            body: JSON.stringify(payload)
                        });

                        if (result.success) {
                            showSuccess(result.message || '清除成功');
                            if (clearDbDialog) {
                                clearDbDialog.style.display = 'none';
                            }
                            // 刷新数据
                            await fetchTravelTimeDatabase();
                            await fetchMonitorData();
                        } else {
                            showError(result.message || '清除失败');
                        }
                    } catch (error) {
                        showError(`清除失败: ${error.message || error}`);
                    } finally {
                        if (confirmClearDbBtn) {
                            confirmClearDbBtn.disabled = false;
                            confirmClearDbBtn.textContent = '确认清除';
                        }
                    }
                });
            }

            const dqnStatusBtn = document.getElementById('dqn-check-status');
            if (dqnStatusBtn) {
                dqnStatusBtn.addEventListener('click', () => fetchDqnStatus(true));
            }
            const dqnTrainBtn = document.getElementById('dqn-train-btn');
            if (dqnTrainBtn) {
                dqnTrainBtn.addEventListener('click', () => trainDqnModel());
            }
            const dqnRouteBtn = document.getElementById('dqn-route-btn');
            if (dqnRouteBtn) {
                dqnRouteBtn.addEventListener('click', () => runDqnRoutePlanner());
            }

            // 添加车辆
            const addVehicleBtn = document.getElementById('add-vehicle');
            if (addVehicleBtn) {
                addVehicleBtn.addEventListener('click', async function () {
                    setButtonLoading(addVehicleBtn, true);
                    
                    try {
                        const vehicleId = document.getElementById('vehicle-id').value || `V${vehicleCounter++}`;
                        const vehicleType = document.getElementById('vehicle-type').value;
                        const vehicleWeight = parseFloat(document.getElementById('vehicle-weight').value);
                        const vehicleWidth = parseFloat(document.getElementById('vehicle-width').value);
                        const targetNode = document.getElementById('target-node').value;
                        const startNode = document.getElementById('start-node-vehicle').value; // 新增

                        if (!vehicleId) {
                            showToast('请输入车辆ID', 'warning');
                            return;
                        }

                        if (!startNode) {
                            showToast('请选择起点节点', 'warning');
                            return;
                        }

                        if (!targetNode) {
                            showToast('请选择目标节点', 'warning');
                            return;
                        }

                        const success = await addVehicleToBackend({
                            id: vehicleId,
                            type: vehicleType,
                            weight: vehicleWeight,
                            width: vehicleWidth,
                            target_node: targetNode,
                            start_node: startNode  // 新增
                        });

                        if (success) {
                            document.getElementById('vehicle-id').value = '';
                            showToast(`车辆 ${vehicleId} 添加成功！起点: ${getNodeName(startNode)}, 目标: ${getNodeName(targetNode)}`, 'success');
                            // 兼容旧的showSuccess函数
                            if (typeof showSuccess === 'function') {
                                showSuccess(`车辆 ${vehicleId} 添加成功！起点: ${getNodeName(startNode)}, 目标: ${getNodeName(targetNode)}`);
                            }
                        }
                    } catch (error) {
                        showToast('添加车辆失败: ' + (error.message || '未知错误'), 'error');
                    } finally {
                        setButtonLoading(addVehicleBtn, false);
                    }
                });
            } else {
                logWarn('⚠️ 添加车辆按钮不存在');
            }

            // 获取服务器信息
            async function fetchServerInfo() {
                // 优先使用当前页面的网络地址
                const currentOrigin = window.location.origin;
                const driverUrl = `${currentOrigin}/driver`;
                
                // 更新URL输入框
                const urlInput = document.getElementById('driver-url');
                if (urlInput) {
                    urlInput.value = driverUrl;
                }
                
                try {
                    const result = await apiCall('/server-info');
                    if (result.success) {
                        const infoDiv = document.getElementById('server-info');
                        if (infoDiv) {
                            let html = '<strong>服务器信息：</strong><br>';
                            html += `当前访问地址: <strong style="color: #27ae60;">${currentOrigin}/driver</strong><br>`;
                            
                            // 如果有服务器返回的额外信息，也显示出来
                            if (result.urls && result.urls.localhost) {
                            html += `本地地址: ${result.urls.localhost}`;
                            }
                            if (result.local_ip) {
                                html += `<br>局域网IP: ${result.local_ip} (仅本地网络可用)`;
                            }
                            
                            infoDiv.innerHTML = html;
                        }
                        
                        // 如果服务器返回了driver_url且与当前地址不同，可以作为备选显示
                        // 但优先使用当前页面的地址
                        if (urlInput && result.urls && result.urls.driver_url && result.urls.driver_url !== driverUrl) {
                            // 仅在用户未手动修改时才考虑使用服务器返回的URL
                            if (urlInput.value === driverUrl) {
                                // 可以根据需要选择是否使用服务器返回的URL
                                // urlInput.value = result.urls.driver_url;
                            }
                        }
                    }
                } catch (error) {
                    console.error('获取服务器信息失败:', error);
                    const infoDiv = document.getElementById('server-info');
                    if (infoDiv) {
                        infoDiv.innerHTML = `<strong>服务器信息：</strong><br>当前访问地址: <strong style="color: #27ae60;">${currentOrigin}/driver</strong><br><span style="color: #e74c3c;">⚠️ 无法获取服务器详细信息</span>`;
                    }
                }
            }

            // 生成司机界面URL
            function generateDriverUrl() {
                const urlInput = document.getElementById('driver-url');
                if (urlInput && urlInput.value && urlInput.value.trim()) {
                    return urlInput.value.trim();
                }
                // 备用：使用当前页面的origin
                const baseUrl = window.location.origin;
                return `${baseUrl}/driver`;
            }

            // 手动更新URL
            function updateDriverUrl() {
                const manualUrlInput = document.getElementById('manual-url');
                if (!manualUrlInput) {
                    showError('找不到输入框');
                    return;
                }
                
                const manualUrl = manualUrlInput.value.trim();
                if (!manualUrl) {
                    showError('请输入完整地址');
                    return;
                }
                
                // 验证URL格式（简单验证）
                try {
                    // 尝试创建URL对象来验证格式
                    const testUrl = new URL(manualUrl);
                    // 如果URL有效，检查是否包含/driver路径
                    let finalUrl = manualUrl;
                    if (!finalUrl.endsWith('/driver')) {
                        // 如果URL以/结尾，直接拼接driver，否则拼接/driver
                        finalUrl = finalUrl.endsWith('/') ? `${finalUrl}driver` : `${finalUrl}/driver`;
                }
                
                const urlInput = document.getElementById('driver-url');
                if (urlInput) {
                        urlInput.value = finalUrl;
                    showSuccess('地址已更新');
                    }
                } catch (error) {
                    // 如果不是完整URL，可能是IP地址，尝试构造URL
                    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/;
                    if (ipPattern.test(manualUrl)) {
                        // 是IP地址格式，使用当前协议和端口（如果有）
                        const currentProtocol = window.location.protocol;
                        const currentPort = window.location.port;
                        const portStr = currentPort ? `:${currentPort}` : (currentProtocol === 'https:' ? '' : ':5000');
                        const finalUrl = `${currentProtocol}//${manualUrl}${portStr}/driver`;
                        
                        const urlInput = document.getElementById('driver-url');
                        if (urlInput) {
                            urlInput.value = finalUrl;
                            showSuccess('地址已更新');
                        }
                    } else {
                        showError('地址格式不正确，请输入完整URL（如 https://example.com/driver）或IP地址（如 192.168.1.100:5000）');
                    }
                }
            }

            // 初始化二维码URL
            async function initQrcodeUrl() {
                await fetchServerInfo();
            }

            // 生成二维码
            function generateQRCode() {
                const url = generateDriverUrl();
                if (!url || !url.trim()) {
                    showError('请先设置司机界面访问地址！');
                    return;
                }
                
                // 检查是否是localhost或127.0.0.1，这种情况下手机无法访问
                if (url.includes('localhost') || url.includes('127.0.0.1')) {
                    showError('⚠️ 当前地址为localhost，手机无法访问。请使用局域网IP或公网地址。');
                    return;
                }
                
                const container = document.getElementById('qrcode-container');
                const qrcodeDiv = document.getElementById('qrcode');
                
                if (!container || !qrcodeDiv) return;

                // 使用在线API生成二维码
                qrcodeDiv.innerHTML = '';
                const img = document.createElement('img');
                img.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
                img.alt = '司机界面二维码';
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                qrcodeDiv.appendChild(img);
                
                // 根据URL类型显示不同的提示信息
                const hintDiv = document.getElementById('qrcode-hint');
                if (hintDiv) {
                    try {
                        const urlObj = new URL(url);
                        const isPublicUrl = !urlObj.hostname.match(/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/);
                        
                        if (isPublicUrl) {
                            hintDiv.innerHTML = '💡 使用公网地址，手机可通过互联网直接访问';
                            hintDiv.style.color = '#27ae60';
                        } else {
                            hintDiv.innerHTML = '⚠️ 使用局域网地址，请确保手机和服务器在同一网络';
                            hintDiv.style.color = '#e74c3c';
                        }
                    } catch (e) {
                        hintDiv.innerHTML = '';
                    }
                }
                
                container.style.display = 'block';
                showSuccess('二维码已生成！');
            }

            // 复制URL
            function copyDriverUrl() {
                const urlInput = document.getElementById('driver-url');
                if (urlInput) {
                    urlInput.select();
                    document.execCommand('copy');
                    showSuccess('URL已复制到剪贴板');
                }
            }

            // 司机注册与路径计算
            document.getElementById('driver-register').addEventListener('click', async () => {
                await registerDriverInfo();
            });

            document.getElementById('driver-plan-route').addEventListener('click', async () => {
                await previewDriverRoute();
            });
            
            // 关闭司机详细信息弹窗
            const closeDriverDetailBtn = document.getElementById('close-driver-detail');
            const driverDetailModal = document.getElementById('driver-detail-modal');
            if (closeDriverDetailBtn && driverDetailModal) {
                closeDriverDetailBtn.addEventListener('click', () => {
                    driverDetailModal.style.display = 'none';
                });
                // 点击背景关闭
                driverDetailModal.addEventListener('click', (e) => {
                    if (e.target === driverDetailModal) {
                        driverDetailModal.style.display = 'none';
                    }
                });
            }

            // 二维码相关事件
            if (document.getElementById('generate-qrcode')) {
                document.getElementById('generate-qrcode').addEventListener('click', generateQRCode);
            }
            if (document.getElementById('copy-url')) {
                document.getElementById('copy-url').addEventListener('click', copyDriverUrl);
            }
            if (document.getElementById('update-url')) {
                document.getElementById('update-url').addEventListener('click', updateDriverUrl);
            }
            
            // 初始化URL
            initQrcodeUrl();

            document.getElementById('driver-id').addEventListener('change', () => {
                const driverId = (document.getElementById('driver-id')?.value || '').trim();
                if (driverId && drivers[driverId]) {
                    activeDriverId = driverId;
                    populateDriverForm(drivers[driverId]);
                    updateDriverSummary();
                    updateDriverHistory();
                } else {
                    renderDriverRouteResult(null);
                    updateDriverSummary();
                    updateDriverHistory();
                }
            });

            // 开始/停止调度按钮
            document.getElementById('start-dispatch').addEventListener('click', async function () {
                setButtonLoading(this, true);
                
                try {
                    if (!window.dispatchInterval) {
                        // 开始调度前先同步节点位置
                        const syncSuccess = await syncAllNodePositions();
                        if (!syncSuccess) {
                            showToast('节点位置同步失败，请检查网络连接', 'error');
                            // 兼容旧的showError函数
                            if (typeof showError === 'function') {
                                showError('节点位置同步失败，请检查网络连接');
                            }
                            return;
                        }

                        // 重新获取最新的道路数据
                        await fetchRoads();

                        const success = await startDispatchBackend();
                        if (!success) return;

                        window.dispatchInterval = setInterval(async () => {
                            await fetchVehicles();
                            await fetchMonitorData();
                            try {
                                safeRenderMap();
                            } catch (err) {
                                console.error('renderMap 执行出错:', err);
                            }
                        }, 2000);

                        this.textContent = '停止调度';
                        this.style.background = '#e74c3c';
                        showToast('调度已开始', 'success');
                    } else {
                        clearInterval(window.dispatchInterval);
                        window.dispatchInterval = null;

                        await stopDispatchBackend();

                        this.textContent = '开始调度';
                        this.style.background = '#3498db';
                        showToast('调度已停止', 'info');
                    }
                } catch (error) {
                    showToast('操作失败: ' + (error.message || '未知错误'), 'error');
                } finally {
                    setButtonLoading(this, false);
                }
            });

            // 重置系统
            document.getElementById('reset-system').addEventListener('click', async function () {
                if (!confirm('确定要重置系统吗？此操作将清除所有车辆和调度数据。')) {
                    return;
                }
                
                setButtonLoading(this, true);
                
                try {
                    if (window.dispatchInterval) {
                        clearInterval(window.dispatchInterval);
                        window.dispatchInterval = null;
                        document.getElementById('start-dispatch').textContent = '开始调度';
                        document.getElementById('start-dispatch').style.background = '#3498db';

                        await stopDispatchBackend();
                    }

                    await resetSystemBackend();
                    showToast('系统已重置', 'success');
                } catch (error) {
                    showToast('重置系统失败: ' + (error.message || '未知错误'), 'error');
                } finally {
                    setButtonLoading(this, false);
                }
            });

            // 手动重算路径（全部）
            document.getElementById('manual-reroute').addEventListener('click', async () => {
                await manualReroute(null);
            });

            // 按效率排序
            document.getElementById('sort-eff').addEventListener('click', () => {
                updateVehicleList(true);
            });

            // 地图上传
            const mapUploadArea = document.getElementById('map-upload-area');
            const mapFileInput = document.getElementById('map-file-input');
            const dxfUploadArea = document.getElementById('dxf-upload-area');
            const dxfFileInput = document.getElementById('dxf-file-input');
            const importDxfBtn = document.getElementById('import-dxf-btn');
            const dxfToJsonBtn = document.getElementById('dxf-to-json-btn');
            const jsonUploadArea = document.getElementById('json-upload-area');
            const jsonFileInput = document.getElementById('json-file-input');
            const importJsonBtn = document.getElementById('import-json-btn');
            const exportJsonBtn = document.getElementById('export-json-btn');
            let pendingDxfAction = 'import';

            mapUploadArea.addEventListener('click', (e) => {
                if (e.target === mapFileInput) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                if (mapFileInput) {
                    mapFileInput.click();
                }
            });
            mapUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                mapUploadArea.style.background = '#e8f4fc';
            });
            mapUploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                mapUploadArea.style.background = '#f8f9fa';
            });
            mapUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                mapUploadArea.style.background = '#f8f9fa';
                if (e.dataTransfer.files.length > 0) {
                    handleMapFile(e.dataTransfer.files[0]);
                }
            });
            mapFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleMapFile(e.target.files[0]);
                }
            });

            function handleDxfSelection(file) {
                const action = pendingDxfAction || 'import';
                pendingDxfAction = 'import';
                if (!file) {
                    return;
                }
                if (!file.name.toLowerCase().endsWith('.dxf')) {
                    showError('请上传 DXF 文件');
                    if (dxfFileInput) {
                        dxfFileInput.value = '';
                    }
                    return;
                }
                const promise = action === 'json' ? convertDxfToJson(file) : importDxfFile(file);
                Promise.resolve(promise).finally(() => {
                    if (dxfFileInput) {
                        dxfFileInput.value = '';
                    }
                    if (dxfUploadArea) {
                        dxfUploadArea.style.background = '#f8f9fa';
                    }
                });
            }

            if (dxfUploadArea && dxfFileInput) {
                dxfUploadArea.addEventListener('click', () => {
                    pendingDxfAction = 'import';
                    dxfFileInput.click();
                });
                dxfUploadArea.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    dxfUploadArea.style.background = '#e8f4fc';
                });
                dxfUploadArea.addEventListener('dragleave', (e) => {
                    e.preventDefault();
                    dxfUploadArea.style.background = '#f8f9fa';
                });
                dxfUploadArea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dxfUploadArea.style.background = '#f8f9fa';
                    if (e.dataTransfer.files.length > 0) {
                        pendingDxfAction = 'import';
                        handleDxfSelection(e.dataTransfer.files[0]);
                    }
                });
                dxfFileInput.addEventListener('change', (e) => {
                    if (e.target.files.length > 0) {
                        handleDxfSelection(e.target.files[0]);
                    }
                });
            }

            if (importDxfBtn && dxfFileInput) {
                importDxfBtn.addEventListener('click', () => {
                    if (dxfFileInput.files && dxfFileInput.files.length > 0) {
                        pendingDxfAction = 'import';
                        handleDxfSelection(dxfFileInput.files[0]);
                    } else {
                        pendingDxfAction = 'import';
                        dxfFileInput.click();
                    }
                });
            }

            if (dxfToJsonBtn && dxfFileInput) {
                dxfToJsonBtn.addEventListener('click', () => {
                    if (dxfFileInput.files && dxfFileInput.files.length > 0) {
                        pendingDxfAction = 'json';
                        handleDxfSelection(dxfFileInput.files[0]);
                    } else {
                        pendingDxfAction = 'json';
                        dxfFileInput.click();
                    }
                });
            }

            if (jsonUploadArea && jsonFileInput) {
                jsonUploadArea.addEventListener('click', () => {
                    jsonFileInput.click();
                });
                jsonUploadArea.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    jsonUploadArea.style.background = '#e8f4fc';
                });
                jsonUploadArea.addEventListener('dragleave', (e) => {
                    e.preventDefault();
                    jsonUploadArea.style.background = '#f8f9fa';
                });
                jsonUploadArea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    jsonUploadArea.style.background = '#f8f9fa';
                    if (e.dataTransfer.files.length > 0) {
                        handleJsonFile(e.dataTransfer.files[0]);
                    }
                });
                jsonFileInput.addEventListener('change', (e) => {
                    if (e.target.files.length > 0) {
                        handleJsonFile(e.target.files[0]);
                    }
                });
            }

            if (importJsonBtn && jsonFileInput) {
                importJsonBtn.addEventListener('click', () => {
                    if (jsonFileInput.files && jsonFileInput.files.length > 0) {
                        handleJsonFile(jsonFileInput.files[0]);
                    } else {
                        jsonFileInput.click();
                    }
                });
            }

            if (exportJsonBtn) {
                exportJsonBtn.addEventListener('click', () => {
                    exportJsonRoadnet();
                });
            }

            function handleMapFile(file) {
                if (!file.type.match('image.*')) { 
                    alert('请上传图片文件'); 
                    resetMapFileInput();
                    return; 
                }
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const backgroundData = e.target.result;
                    // 保存到服务器
                    const success = await saveMapBackground(backgroundData);
                    if (success) {
                        try {
                            safeRenderMap();
                        } catch (err) {
                            console.error('renderMap 执行出错:', err);
                        }
                        updateMapUploadMessage(MAP_UPLOAD_SUCCESS_HTML);
                        showSuccess('地图上传成功');
                    } else {
                        resetMapFileInput();
                    }
                    mapUploadArea.style.background = '#f8f9fa';
                };
                reader.onerror = () => {
                    alert('地图文件读取失败');
                    resetMapFileInput();
                    mapUploadArea.style.background = '#f8f9fa';
                };
                reader.readAsDataURL(file);
            }

            function handleJsonFile(file) {
                if (!file) return;
                if (!file.name.toLowerCase().endsWith('.json')) {
                    showError('请上传 JSON 文件');
                    if (jsonFileInput) jsonFileInput.value = '';
                    if (jsonUploadArea) jsonUploadArea.style.background = '#f8f9fa';
                    return;
                }
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const jsonData = JSON.parse(e.target.result);
                        await importJsonRoadnet(jsonData);
                    } catch (err) {
                        console.error('解析 JSON 失败:', err);
                        showError('解析 JSON 失败：' + (err.message || '格式不正确'));
                    } finally {
                        if (jsonFileInput) jsonFileInput.value = '';
                        if (jsonUploadArea) jsonUploadArea.style.background = '#f8f9fa';
                    }
                };
                reader.onerror = () => {
                    showError('读取 JSON 文件失败');
                    if (jsonFileInput) jsonFileInput.value = '';
                    if (jsonUploadArea) jsonUploadArea.style.background = '#f8f9fa';
                };
                reader.readAsText(file, 'utf-8');
            }
            
            // 清除自定义地图
            const removeMapBtn = document.getElementById('remove-map-background');
            if (removeMapBtn) {
                removeMapBtn.addEventListener('click', async () => {
                    if (confirm('确定要清除自定义地图吗？')) {
                        await deleteMapBackground();
                    }
                });
            }

            // 地图缩放和平移控制（CAD风格）
            let mapScale = 1.0;
            let mapTranslateX = 0;
            let mapTranslateY = 0;
            const map = document.getElementById('map');
            const mapWrapper = document.querySelector('.map-wrapper');
            const zoomLevelEl = document.getElementById('zoom-level');
            
            // 使用 requestAnimationFrame 优化地图变换更新，避免过度调用
            let updateMapTransformRafId = null;
            
            // 更新地图变换（缩放 + 平移）
            function updateMapTransform() {
                if (!map) return;
                
                // 取消之前的动画帧请求（防抖）
                if (updateMapTransformRafId !== null) {
                    cancelAnimationFrame(updateMapTransformRafId);
                }
                
                // 使用 requestAnimationFrame 优化性能，限制在 ~60fps
                updateMapTransformRafId = requestAnimationFrame(() => {
                const transform = `translate(${mapTranslateX}px, ${mapTranslateY}px) scale(${mapScale})`;
                map.style.transform = transform;
                if (zoomLevelEl) {
                    zoomLevelEl.textContent = Math.round(mapScale * 100) + '%';
                }
                // 同步全局状态
                if (typeof window !== 'undefined' && window.mapZoomState) {
                    window.mapZoomState.scale = mapScale;
                    window.mapZoomState.translateX = mapTranslateX;
                    window.mapZoomState.translateY = mapTranslateY;
                }
                    
                    updateMapTransformRafId = null;
                });
            }
            
            // 将缩放和平移状态保存到全局，供地图渲染后恢复
            window.mapZoomState = {
                get scale() { return mapScale; },
                set scale(v) { mapScale = v; },
                get translateX() { return mapTranslateX; },
                set translateX(v) { mapTranslateX = v; },
                get translateY() { return mapTranslateY; },
                set translateY(v) { mapTranslateY = v; },
                update: updateMapTransform
            };
            
            function updateMapScale(scale, mouseX = null, mouseY = null) {
                const oldScale = mapScale;
                const oldTranslateX = mapTranslateX;
                const oldTranslateY = mapTranslateY;
                
                mapScale = Math.max(0.1, Math.min(10.0, scale)); // 限制在 10% 到 1000% 之间（CAD风格，更大的缩放范围）
                
                // 如果提供了鼠标位置，基于鼠标位置进行缩放（CAD风格）
                if (mouseX !== null && mouseY !== null && mapWrapper && map) {
                    const wrapperRect = mapWrapper.getBoundingClientRect();
                    // 鼠标相对于地图容器的坐标
                    const relativeX = mouseX - wrapperRect.left;
                    const relativeY = mouseY - wrapperRect.top;
                    
                    // 计算鼠标指向的地图内容坐标（在旧缩放比例下的地图坐标）
                    // 由于transform-origin是0 0，地图上的点(mapX, mapY)在容器中的位置是：
                    // containerX = mapTranslateX + mapX * oldScale
                    // 所以：mapX = (containerX - mapTranslateX) / oldScale
                    const mapX = (relativeX - oldTranslateX) / oldScale;
                    const mapY = (relativeY - oldTranslateY) / oldScale;
                    
                    // 缩放后，我们希望鼠标仍然指向同一个地图点
                    // 所以：relativeX = mapTranslateX_new + mapX * mapScale
                    // 因此：mapTranslateX_new = relativeX - mapX * mapScale
                    mapTranslateX = relativeX - mapX * mapScale;
                    mapTranslateY = relativeY - mapY * mapScale;
                }
                
                updateMapTransform();
            }
            
            // 鼠标滚轮缩放（基于鼠标位置）
            if (mapWrapper) {
                mapWrapper.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 阻止自动居中干扰
                    isMapPanning = true;
                    setTimeout(() => { isMapPanning = false; }, 100);
                    
                    const rect = mapWrapper.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    
                    const delta = e.deltaY > 0 ? 0.9 : 1.1; // 向下滚动缩小，向上滚动放大
                    updateMapScale(mapScale * delta, mouseX, mouseY);
                }, { passive: false });
            }
            
            // 鼠标中键拖拽平移（CAD风格）
            let isPanning = false;
            let panStartX = 0;
            let panStartY = 0;
            let panStartTranslateX = 0;
            let panStartTranslateY = 0;
            
            if (mapWrapper) {
                // 鼠标中键按下
                mapWrapper.addEventListener('mousedown', (e) => {
                    if (e.button === 1) { // 中键
                        e.preventDefault();
                        e.stopPropagation();
                        isPanning = true;
                        isMapPanning = true; // 设置全局拖拽标志，防止自动居中
                        mapWrapper.classList.add('panning');
                        panStartX = e.clientX;
                        panStartY = e.clientY;
                        panStartTranslateX = mapTranslateX;
                        panStartTranslateY = mapTranslateY;
                        // 改变鼠标样式
                        mapWrapper.style.cursor = 'grabbing';
                        document.body.style.cursor = 'grabbing';
                        document.body.style.userSelect = 'none'; // 防止拖动时选中文本
                    }
                }, { passive: false });
                
                // 鼠标移动
                const handleMouseMove = (e) => {
                    if (isPanning) {
                        e.preventDefault();
                        const deltaX = e.clientX - panStartX;
                        const deltaY = e.clientY - panStartY;
                        mapTranslateX = panStartTranslateX + deltaX;
                        mapTranslateY = panStartTranslateY + deltaY;
                        updateMapTransform();
                    }
                };
                document.addEventListener('mousemove', handleMouseMove, { passive: false });
                
                // 鼠标中键释放
                const handleMouseUp = (e) => {
                    if (e.button === 1 && isPanning) {
                        e.preventDefault();
                        e.stopPropagation();
                        isPanning = false;
                        isMapPanning = false; // 清除全局拖拽标志
                        mapWrapper.classList.remove('panning');
                        // 恢复鼠标样式
                        mapWrapper.style.cursor = '';
                        document.body.style.cursor = '';
                        document.body.style.userSelect = '';
                    }
                };
                document.addEventListener('mouseup', handleMouseUp, { passive: false });
                
                // 处理 auxclick 事件（某些浏览器中键会触发这个）
                mapWrapper.addEventListener('auxclick', (e) => {
                    if (e.button === 1) { // 中键
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }, { passive: false });
                
                // 防止中键在窗口外释放时卡住
                document.addEventListener('mouseleave', () => {
                    if (isPanning) {
                        isPanning = false;
                        isMapPanning = false;
                        if (mapWrapper) {
                            mapWrapper.classList.remove('panning');
                            mapWrapper.style.cursor = '';
                        }
                        document.body.style.cursor = '';
                        document.body.style.userSelect = '';
                    }
                });
                
                // 处理窗口失去焦点时的情况
                window.addEventListener('blur', () => {
                    if (isPanning) {
                        isPanning = false;
                        isMapPanning = false;
                        if (mapWrapper) {
                            mapWrapper.classList.remove('panning');
                            mapWrapper.style.cursor = '';
                        }
                        document.body.style.cursor = '';
                        document.body.style.userSelect = '';
                    }
                });
            }
            
            // 按钮缩放
            const zoomInBtn = document.getElementById('zoom-in');
            const zoomOutBtn = document.getElementById('zoom-out');
            const zoomResetBtn = document.getElementById('zoom-reset');
            if (zoomInBtn && zoomOutBtn && zoomResetBtn) {
                zoomInBtn.addEventListener('click', () => {
                    if (mapWrapper) {
                        const rect = mapWrapper.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;
                        updateMapScale(mapScale + 0.1, centerX, centerY);
                    } else {
                    updateMapScale(mapScale + 0.1);
                    }
                });
                
                zoomOutBtn.addEventListener('click', () => {
                    if (mapWrapper) {
                        const rect = mapWrapper.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;
                        updateMapScale(mapScale - 0.1, centerX, centerY);
                    } else {
                    updateMapScale(mapScale - 0.1);
                    }
                });
                
                zoomResetBtn.addEventListener('click', () => {
                    // 重置缩放和平移，然后居中显示
                    mapScale = 1.0;
                    mapTranslateX = 0;
                    mapTranslateY = 0;
                    updateMapTransform();
                    // 延迟一下确保地图已更新，然后居中显示
                    setTimeout(() => {
                        centerMapContent(true);
                    }, 100);
                });
                console.log('✅ 缩放按钮事件已绑定');
            } else {
                console.warn('⚠️ 未找到缩放控制按钮', {
                    zoomIn: !!zoomInBtn,
                    zoomOut: !!zoomOutBtn,
                    zoomReset: !!zoomResetBtn
                });
            }
            
            // 初始化缩放显示
            if (zoomLevelEl) {
                zoomLevelEl.textContent = '100%';
            }
            
            // 导出更新函数供其他地方使用（如重置时）
            window.resetMapView = function() {
                mapScale = 1.0;
                mapTranslateX = 0;
                mapTranslateY = 0;
                updateMapTransform();
                // 延迟一下确保地图已更新，然后居中显示
                setTimeout(() => {
                    centerMapContent(true);
                }, 100);
            };
            
            // 地图设置
            // 添加节点
            const addNodeBtn = document.getElementById('add-node');
            if (addNodeBtn) {
                addNodeBtn.addEventListener('click', async () => {
                    console.log('✅ 添加节点按钮被点击');
                    const nodeType = document.getElementById('node-type')?.value;
                    const nodeName = document.getElementById('node-name')?.value;

                    if (!nodeName) { 
                        alert('请输入节点名称'); 
                        return; 
                    }

                    const map = document.getElementById('map');
                    if (!map) {
                        console.error('未找到地图元素');
                        alert('地图未加载，无法添加节点');
                        return;
                    }

                    const mapRect = map.getBoundingClientRect();
                    const x = Math.floor(Math.random() * (mapRect.width - 100)) + 50;
                    const y = Math.floor(Math.random() * (mapRect.height - 100)) + 50;

                    console.log('准备添加节点:', { name: nodeName, type: nodeType, x, y });
                    const success = await addNodeToBackend({ name: nodeName, type: nodeType, x: x, y: y });
                    if (success) {
                        const nodeNameInput = document.getElementById('node-name');
                        if (nodeNameInput) {
                            nodeNameInput.value = '';
                        }
                        // 添加成功后重新获取数据，确保前端使用后端确认的坐标
                        await fetchRoads();
                        console.log('✅ 节点添加成功');
                    } else {
                        console.error('❌ 节点添加失败');
                    }
                });
                console.log('✅ 添加节点按钮事件已绑定');
            } else {
                console.error('❌ 未找到 add-node 按钮');
            }

            // 手动同步节点位置
            document.getElementById('sync-positions').addEventListener('click', async () => {
                const success = await syncAllNodePositions();
                if (success) {
                    showSuccess('节点位置同步成功！');
                    await fetchRoads(); // 重新获取数据确保一致性
                } else {
                    showError('节点位置同步失败');
                }
            });

            // 清除所有节点（逐个调用后端删除）
            document.getElementById('clear-nodes').addEventListener('click', async () => {
                if (confirm('确定要清除所有节点吗？此操作不可撤销。')) {
                    for (const node of [...nodes]) {
                        await deleteNodeFromBackend(node.id);
                    }
                }
            });

            // 添加道路
           // 添加道路
            document.getElementById('add-road').addEventListener('click', async () => {
                const startNodeId = document.getElementById('start-node').value;
                const endNodeId = document.getElementById('end-node').value;
                const roadLength = document.getElementById('road-length').value;
                const roadDirection = document.getElementById('road-direction').value; // 新增：获取方向

                if (!startNodeId || !endNodeId) { alert('请选择起点和终点节点'); return; }
                if (startNodeId === endNodeId) { alert('起点和终点不能相同'); return; }

                const success = await addEdgeToBackend({
                    start_node: startNodeId,
                    end_node: endNodeId,
                    length: roadLength,
                    direction: roadDirection  // 新增：传递方向参数
                });
                if (!success) showError('添加道路失败');
            });

            // 清除道路（前端临时）
            document.getElementById('clear-roads').addEventListener('click', () => {
                if (confirm('确定要清除所有道路吗？此操作不可撤销。')) {
                    edges = [];
                        try {
                            safeRenderMap();
                        } catch (err) {
                            console.error('renderMap 执行出错:', err);
                        }
                    updateRoadInfo();
                }
            });

            // 切换编辑模式
            const toggleEditModeBtn = document.getElementById('toggle-edit-mode');
            if (toggleEditModeBtn) {
                console.log('✅ 找到编辑模式按钮，准备绑定事件');
                toggleEditModeBtn.addEventListener('click', function (e) {
                    console.log('✅ 编辑模式按钮被点击，当前状态:', editMode);
                    e.stopPropagation(); // 阻止事件冒泡，避免触发拖动
                    e.preventDefault(); // 防止默认行为
                    editMode = !editMode;
                    this.textContent = `编辑模式: ${editMode ? '开启' : '关闭'}`;
                    this.style.background = editMode ? '#2ecc71' : '#3498db';
                    // 更新提示文本
                    if (editMode) {
                        this.title = '编辑模式：可以拖动节点调整位置';
                    } else {
                        this.title = '点击模式：点击节点设置拥堵，点击道路设置状态';
                    }
                    try {
                            safeRenderMap();
                        safeRenderMap();
                        console.log('✅ 编辑模式切换成功，新状态:', editMode);
                    } catch (err) {
                        console.error('❌ renderMap 执行出错:', err);
                    }
                });
                console.log('✅ 编辑模式按钮事件已绑定');
            } else {
                console.error('❌ 未找到 toggle-edit-mode 按钮，请检查HTML结构');
            }

            // 标签显示控制
            let labelMode = 'all'; // 'all', 'edges-only', 'nodes-only', 'hidden'
            const toggleLabelsBtn = document.getElementById('toggle-labels');
            if (toggleLabelsBtn) {
                console.log('✅ 找到标签切换按钮，准备绑定事件');
                toggleLabelsBtn.addEventListener('click', function (e) {
                    console.log('✅ 标签切换按钮被点击，当前模式:', labelMode);
                    e.stopPropagation(); // 阻止事件冒泡，避免触发拖动
                    e.preventDefault(); // 防止默认行为
                    const map = document.getElementById('map');
                    if (!map) {
                        console.error('❌ 未找到地图元素');
                        return;
                    }
                    // 移除所有标签模式类
                    map.classList.remove('map-labels-hidden', 'map-labels-edges-only', 'map-labels-nodes-only');
                    
                    // 切换模式
                    switch (labelMode) {
                        case 'all':
                            labelMode = 'edges-only';
                            map.classList.add('map-labels-edges-only');
                            this.textContent = '标签: 仅道路';
                            break;
                        case 'edges-only':
                            labelMode = 'nodes-only';
                            map.classList.add('map-labels-nodes-only');
                            this.textContent = '标签: 仅节点';
                            break;
                        case 'nodes-only':
                            labelMode = 'hidden';
                            map.classList.add('map-labels-hidden');
                            this.textContent = '标签: 隐藏';
                            break;
                        case 'hidden':
                            labelMode = 'all';
                            this.textContent = '标签: 全部显示';
                            break;
                    }
                    console.log('✅ 标签模式切换成功，新模式:', labelMode);
                });
                console.log('✅ 标签切换按钮事件已绑定');
            } else {
                console.error('❌ 未找到 toggle-labels 按钮，请检查HTML结构');
            }
            
            // 图例折叠/展开
            const legendToggle = document.getElementById('legend-toggle');
            const legend = document.getElementById('map-legend');
            if (legendToggle && legend) {
                console.log('✅ 找到图例元素，准备绑定折叠功能');
                legendToggle.style.cursor = 'pointer';
                legendToggle.addEventListener('click', (e) => {
                    console.log('✅ 图例标题被点击');
                    e.stopPropagation();
                    e.preventDefault();
                    const isCollapsed = legend.classList.contains('collapsed');
                    legend.classList.toggle('collapsed');
                    const toggleIcon = legendToggle.querySelector('.legend-toggle');
                    if (toggleIcon) {
                        toggleIcon.textContent = legend.classList.contains('collapsed') ? '▶' : '▼';
                    }
                    console.log('✅ 图例折叠状态切换:', !isCollapsed ? '折叠' : '展开');
                });
                console.log('✅ 图例折叠功能已绑定');
            } else {
                console.error('❌ 未找到图例元素:', { legendToggle: !!legendToggle, legend: !!legend });
            }

            // 设置道路拥堵状态
            document.getElementById('set-congested').addEventListener('click', async () => {
                const edgeId = document.getElementById('congestion-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeCongestion(edgeId, true);
            });

            document.getElementById('set-normal').addEventListener('click', async () => {
                const edgeId = document.getElementById('congestion-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeCongestion(edgeId, false);
            });

            // 新增：设置道路方向
            document.getElementById('set-two-way').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'two-way');
            });

            document.getElementById('set-north').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'north');
            });

            document.getElementById('set-south').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'south');
            });

            document.getElementById('set-east').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'east');
            });

            document.getElementById('set-west').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'west');
            });

            document.getElementById('set-northeast').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'northeast');
            });

            document.getElementById('set-northwest').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'northwest');
            });

            document.getElementById('set-southeast').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'southeast');
            });

            document.getElementById('set-southwest').addEventListener('click', async () => {
                const edgeId = document.getElementById('direction-edge').value;
                if (!edgeId) {
                    alert('请选择道路');
                    return;
                }
                await setEdgeDirection(edgeId, 'southwest');
            });

            // 新增：添加车辆类型
            document.getElementById('add-vehicle-type').addEventListener('click', async () => {
                const vehicleType = document.getElementById('new-vehicle-type').value;
                const speedKmph = parseFloat(document.getElementById('new-speed-kmph').value);
                const canUseOneWay = document.getElementById('new-can-use-one-way').value === 'true';
                const canUseTwoWay = document.getElementById('new-can-use-two-way').value === 'true';

                if (!vehicleType) {
                    alert('请输入车辆类型名称');
                    return;
                }

                const success = await addVehicleTypeToBackend({
                    type: vehicleType,
                    speed_kmph: Number.isNaN(speedKmph) ? 30 : speedKmph,
                    can_use_one_way: canUseOneWay,
                    can_use_two_way: canUseTwoWay
                });

                if (success) {
                    document.getElementById('new-vehicle-type').value = '';
                    document.getElementById('new-speed-kmph').value = '30';
                    showSuccess(`车辆类型 ${vehicleType} 添加成功！`);
                }
            });

            // 侧边栏拖动功能
            const resizer = document.getElementById('drag-resizer');
            const sidebar = document.querySelector('.sidebar');
            const container = document.querySelector('.container');
            
            if (resizer && sidebar && container) {
                let isResizing = false;
                let startX = 0;
                let startWidth = 0;
                
                resizer.addEventListener('mousedown', function(e) {
                    // 如果是移动端布局，不启用拖动
                    if (window.innerWidth <= 1024) return;
                    
                    isResizing = true;
                    startX = e.clientX;
                    startWidth = sidebar.getBoundingClientRect().width;
                    
                    resizer.classList.add('active');
                    document.body.classList.add('resizing');
                    
                    e.preventDefault(); // 防止选中文字
                });
                
                document.addEventListener('mousemove', function(e) {
                    if (!isResizing) return;
                    
                    // 计算新宽度
                    const diffX = e.clientX - startX;
                    let newWidth = startWidth + diffX;
                    
                    // 限制最小和最大宽度
                    const containerWidth = container.getBoundingClientRect().width;
                    const minWidth = 250;
                    const maxWidth = Math.min(600, containerWidth * 0.6);
                    
                    if (newWidth < minWidth) newWidth = minWidth;
                    if (newWidth > maxWidth) newWidth = maxWidth;
                    
                    sidebar.style.flex = `0 0 ${newWidth}px`;
                });
                
                document.addEventListener('mouseup', function() {
                    if (isResizing) {
                        isResizing = false;
                        resizer.classList.remove('active');
                        document.body.classList.remove('resizing');
                        
                        // 拖动结束，触发 resize 事件以更新地图和图表
                        window.dispatchEvent(new Event('resize'));
                        
                        // 稍微延迟再次触发，确保布局完全稳定
                        setTimeout(() => {
                            if (typeof centerMapContent === 'function') {
                                // centerMapContent(); // 可选：是否需要重新居中
                            }
                            safeRenderMap();
                        }, 100);
                    }
                });
            }
            
            // 验证关键元素是否存在
            console.log('🔍 验证关键元素:');
            console.log('  - 编辑模式按钮:', !!document.getElementById('toggle-edit-mode'));
            console.log('  - 标签切换按钮:', !!document.getElementById('toggle-labels'));
            console.log('  - 添加节点按钮:', !!document.getElementById('add-node'));
            console.log('  - 图例元素:', !!document.getElementById('map-legend'));
            console.log('  - 图例标题:', !!document.getElementById('legend-toggle'));
            console.log('  - 地图元素:', !!document.getElementById('map'));

                console.log('✅ 前端初始化完成');
                try {
                    fetchDqnStatus();
                } catch (err) {
                    logError('获取 DQN 状态失败:', err);
                }
            } catch (initError) {
                logError('❌ 初始化过程中发生严重错误:', initError);
                logError('错误堆栈:', initError.stack);
                // 即使初始化失败，也尝试绑定基本的事件监听器
                console.error('初始化失败，但尝试继续运行...');
                alert('页面初始化时发生错误，部分功能可能不可用。请查看控制台了解详情。');
            }
        }

        // 页面加载后初始化
        document.addEventListener('DOMContentLoaded', function() {
            log('🚀 DOMContentLoaded 事件触发，开始初始化...');
            
            // 等待 Socket.IO 库加载完成（如果使用 CDN）
            if (typeof io === 'undefined') {
                logWarn('⚠️ Socket.IO 库未加载，将在 500ms 后重试...');
                setTimeout(() => {
                    if (typeof io !== 'undefined') {
                        log('✅ Socket.IO 库已加载，开始初始化');
                        try {
                            init();
                        } catch (error) {
                            logError('❌ 初始化过程中发生错误:', error);
                            logError('错误堆栈:', error.stack);
                        }
                    } else {
                        logWarn('⚠️ Socket.IO 库仍未加载，继续初始化（WebSocket 功能将不可用）');
                        try {
                            init();
                        } catch (error) {
                            logError('❌ 初始化过程中发生错误:', error);
                            logError('错误堆栈:', error.stack);
                        }
                    }
                }, 500);
            } else {
                try {
                    init();
                } catch (error) {
                    logError('❌ 初始化过程中发生错误:', error);
                    logError('错误堆栈:', error.stack);
                }
            }
        });
