from flask import Flask, request, jsonify, send_from_directory, send_file

# 尝试导入 flask_cors
try:
    from flask_cors import CORS
    cors_available = True
except ImportError:
    cors_available = False
    # 定义一个空的 CORS 类作为占位符
    class CORS:
        def __init__(self, *args, **kwargs):
            pass

try:
    from flask_socketio import SocketIO, emit
    socketio_available = True
except ImportError:
    socketio_available = False
    SocketIO = None
    emit = None

# 导入新的 Blueprint（如果可用）
try:
    from backend.blueprints import (
        health_bp, vehicles_bp, drivers_bp, nodes_bp,
        edges_bp, monitor_bp, dispatch_bp,
        dqn_bp, travel_time_bp, map_import_bp, system_bp, map_labels_bp
    )
    blueprints_available = True
except ImportError:
    blueprints_available = False
    health_bp = None
    vehicles_bp = None
    drivers_bp = None
    nodes_bp = None
    edges_bp = None
    monitor_bp = None
    dispatch_bp = None
    dqn_bp = None
    travel_time_bp = None
    map_import_bp = None
    system_bp = None
    map_labels_bp = None
import json
import time
import threading
import random
from datetime import datetime
import os

# 项目根目录（必须在使用 BASE_DIR 之前定义）
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

import heapq
import math
import tempfile
import io
import logging
import traceback
import gc
import sys
from collections import deque
from functools import wraps
from typing import Dict, Any, List, Tuple, Optional
from uuid import uuid4

# 初始化日志（用于调试）
_init_log = []

try:
    import torch  # type: ignore
    from torch import nn  # type: ignore
except ImportError:  # pragma: no cover - 允许在未安装torch的环境运行
    torch = None  # type: ignore
    nn = None  # type: ignore

try:
    os.environ["EZDXF_DISABLE_FONT_MANAGER"] = "1"
    os.environ["EZDXF_USE_INTERNAL_FONT_MONO"] = "1"
    import ezdxf  # type: ignore
except ImportError:  # pragma: no cover - 在未安装库的环境中提供友好错误
    ezdxf = None

try:
    import openpyxl  # type: ignore
except ImportError:  # pragma: no cover
    openpyxl = None

app = Flask(__name__)

# CORS 配置（支持环境变量配置）
# 注意：logger 在后面定义，这里先不记录日志
from backend.config import Config
if cors_available:
    if Config.CORS_ALLOWED_ORIGINS:
        # 生产环境：限制允许的来源
        CORS(app, 
             origins=Config.CORS_ALLOWED_ORIGINS,
             supports_credentials=Config.CORS_ALLOW_CREDENTIALS,
             methods=Config.CORS_ALLOW_METHODS,
             allow_headers=Config.CORS_ALLOW_HEADERS)
        # logger 在后面定义，启动后会记录
    else:
        # 开发环境：允许所有来源
        CORS(app)
        # logger 在后面定义，启动后会记录警告
else:
    # flask_cors 未安装，跳过 CORS 配置
    pass

# 注册新的 Blueprint（如果可用）
if blueprints_available:
    if health_bp: app.register_blueprint(health_bp)
    if vehicles_bp: app.register_blueprint(vehicles_bp)
    if drivers_bp: app.register_blueprint(drivers_bp)
    if nodes_bp: app.register_blueprint(nodes_bp)
    if edges_bp: app.register_blueprint(edges_bp)
    if monitor_bp: app.register_blueprint(monitor_bp)
    if dispatch_bp: app.register_blueprint(dispatch_bp)
    if dqn_bp: app.register_blueprint(dqn_bp)
    if travel_time_bp: app.register_blueprint(travel_time_bp)
    if map_import_bp: app.register_blueprint(map_import_bp)
    if system_bp: app.register_blueprint(system_bp)
    if map_labels_bp: app.register_blueprint(map_labels_bp)
    # 注意：logger 在第 165 行初始化，这里可以安全使用
    # 但由于 logger 初始化在 Blueprint 注册之后，这里暂时不记录日志
    # 可以在应用启动完成后统一记录

# 判断是否运行在 PythonAnywhere 环境
ON_PYTHONANYWHERE = 'PYTHONANYWHERE_DOMAIN' in os.environ

# 检测是否支持 WebSocket（PythonAnywhere 免费账户不支持 WebSocket）
# 可以通过环境变量强制禁用 WebSocket：DISABLE_WEBSOCKET=1
DISABLE_WEBSOCKET = os.environ.get('DISABLE_WEBSOCKET', '').lower() in ('1', 'true', 'yes')
WEBSOCKET_ENABLED = socketio_available and not DISABLE_WEBSOCKET

# WebSocket 支持（logger 在后面定义，这里先不记录日志）
if WEBSOCKET_ENABLED:
    # 在 PythonAnywhere 上，只使用轮询模式（免费账户不支持 WebSocket）
    if ON_PYTHONANYWHERE:
        # PythonAnywhere 免费账户：只使用轮询
        socketio = SocketIO(
            app, 
            cors_allowed_origins="*", 
            async_mode='threading',  # PythonAnywhere 上使用 threading 模式
            ping_timeout=300,  # ping 超时时间（秒）- 增加到300秒（5分钟），避免长时间无活动断开
            ping_interval=60,  # ping 间隔（秒）- 增加到60秒，保持连接活跃但不过于频繁
            max_http_buffer_size=1e6,
            logger=False,
            engineio_logger=False,
            allow_upgrades=False,  # 不允许升级到 WebSocket
            transports=['polling']  # 只使用轮询
        )
    else:
        # 本地开发或其他环境：优先使用 WebSocket，失败时降级到轮询
        # 注意：Windows 上使用 threading 模式更稳定，eventlet 在 Windows 上可能导致连接问题
        socketio = SocketIO(
            app, 
            cors_allowed_origins="*", 
            async_mode='threading',  # Windows 上使用 threading 更稳定
            ping_timeout=60,  # ping 超时时间（秒）- 1分钟
            ping_interval=25,  # ping 间隔（秒）- 每25秒发送心跳
            max_http_buffer_size=1e6,  # 最大 HTTP 缓冲区大小（1MB）
            logger=False,  # 禁用 SocketIO 内部日志（使用我们的 logger）
            engineio_logger=False,  # 禁用 EngineIO 日志
            allow_upgrades=True,  # 允许协议升级
            transports=['websocket', 'polling'],  # 允许的传输方式
            cors_credentials=True,  # 允许携带凭证
            manage_session=False  # 禁用服务器端会话管理，避免 400 错误
        )
else:
    socketio = None

# ========== 服务层函数导入 ==========
# 以下函数已迁移到服务层，从服务层导入
try:
    from backend.services.path_planning_service import (
        calculate_direction as _calculate_direction,
        is_direction_allowed as _is_direction_allowed,
        get_node_by_id as _get_node_by_id,
        get_edge_length_m as _get_edge_length_m,
        get_vehicle_speed_kmph as _get_vehicle_speed_kmph,
        get_edges_connected_to_node as _get_edges_connected_to_node,
        refresh_edge_geometry as _refresh_edge_geometry,
        build_graph as _build_graph,
        calculate_efficient_path as _calculate_efficient_path,
        estimate_efficiency_score as _estimate_efficiency_score,
        serialize_path_edges as _serialize_path_edges,
        build_node_sequence_from_path as _build_node_sequence_from_path,
        estimate_travel_minutes as _estimate_travel_minutes
    )
    from backend.services.system_service import (
        init_monitor_data as _init_monitor_data,
        initialize_system as _initialize_system,
        apply_node_congestion_to_edges as _apply_node_congestion_to_edges,
        current_vehicle_location_node as _current_vehicle_location_node,
        reroute_vehicles as _reroute_vehicles,
        update_monitor_data as _update_monitor_data,
        _apply_map_data as __apply_map_data
    )
    from backend.services.vehicle_service import (
        update_vehicle_positions as _update_vehicle_positions
    )
    from backend.services.dqn_service import (
        ensure_dqn_planner as _ensure_dqn_planner,
        RoadEnvironment as _RoadEnvironment,
        DeepQLearningPlanner as _DeepQLearningPlanner
    )
    from backend.services.map_import_service import (
        parse_dxf_file as _parse_dxf_file
    )
    from backend.services.travel_time_service import (
        parse_travel_time_excel as _parse_travel_time_excel,
        build_travel_time_excel as _build_travel_time_excel,
        normalize_travel_time_records as _normalize_travel_time_records,
        calculate_average_speed_kmph as _calculate_average_speed_kmph,
    )
except ImportError as e:
    # 服务层导入失败，记录错误并抛出异常（因为我们已经删除了所有后备实现）
    import logging
    logger = logging.getLogger(__name__)
    logger.error(f"服务层导入失败: {str(e)}")
    raise

# ========== 稳定性增强模块 ==========

# 1. 线程锁保护共享状态
system_lock = threading.RLock()  # 可重入锁，支持嵌套调用
dqn_lock = threading.Lock()  # DQN操作专用锁

# 2. 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        logging.FileHandler('traffic_system.log', encoding='utf-8') if not ON_PYTHONANYWHERE else logging.StreamHandler(),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 3. 请求限流（基于时间窗口）
class RateLimiter:
    def __init__(self, max_requests: int = 100, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = deque()
        self.lock = threading.Lock()
    
    def is_allowed(self) -> bool:
        with self.lock:
            now = time.time()
            # 清理过期请求
            while self.requests and self.requests[0] < now - self.window_seconds:
                self.requests.popleft()
            
            if len(self.requests) >= self.max_requests:
                return False
            
            self.requests.append(now)
            return True

# 全局限流器
rate_limiter = RateLimiter(max_requests=1000, window_seconds=60)

# 4. 异常处理和自动重试装饰器
def safe_execute(max_retries: int = 3, retry_delay: float = 0.5, default_return=None):
    """安全执行装饰器：自动重试和异常捕获"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_retries - 1:
                        logger.warning(f"{func.__name__} 执行失败 (尝试 {attempt + 1}/{max_retries}): {str(e)}，{retry_delay}秒后重试")
                        time.sleep(retry_delay * (attempt + 1))  # 指数退避
                    else:
                        logger.error(f"{func.__name__} 执行失败，已重试{max_retries}次: {str(e)}\n{traceback.format_exc()}")
            
            if default_return is not None:
                return default_return
            raise last_exception
        return wrapper
    return decorator

# 5. 线程安全的状态访问装饰器
def with_lock(lock: threading.Lock = None):
    """线程安全装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            target_lock = lock or system_lock
            with target_lock:
                return func(*args, **kwargs)
        return wrapper
    return decorator

# 6. 内存管理
def cleanup_memory():
    """清理内存：限制列表大小，清理已到达车辆，触发垃圾回收
    
    注意：不会清理 travel_time_database（训练数据），该数据由 append_travel_time_record 管理
    """
    with system_lock:
        # 限制 arrival_records 大小（仅用于界面显示，不影响训练）
        max_arrival_records = 5000
        if len(system_state.get('arrival_records', [])) > max_arrival_records:
            system_state['arrival_records'] = system_state['arrival_records'][-max_arrival_records:]
            logger.info(f"清理 arrival_records，保留最近 {max_arrival_records} 条")
        
        # travel_time_database 不在这里清理，由 append_travel_time_record 管理
        # 该数据库用于DQN训练，限制为100万条（足够大，不会影响训练）
        
        # 限制 driver_routes 历史记录（仅用于界面显示，不影响训练）
        # 注意：driver_routes 只是用于司机界面显示历史路线，训练使用的是 travel_time_database
        for driver_id in list(system_state.get('driver_routes', {}).keys()):
            routes = system_state['driver_routes'][driver_id]
            if len(routes) > 20:  # 每个司机最多保留20条历史
                system_state['driver_routes'][driver_id] = routes[-20:]
        
        # 清理已到达的车辆（保留时间超过1小时）
        now = datetime.now()
        vehicles_before = len(system_state.get('vehicles', []))
        vehicles_to_keep = []
        removed_count = 0
        
        for vehicle in system_state.get('vehicles', []):
            status = vehicle.get('status', '')
            arrival_time_str = vehicle.get('arrival_time')
            
            # 保留所有非"已到达"状态的车辆
            if status != 'arrived':
                vehicles_to_keep.append(vehicle)
                continue
            
            # 对于已到达的车辆，检查到达时间
            if arrival_time_str:
                try:
                    arrival_time = datetime.fromisoformat(arrival_time_str)
                    hours_since_arrival = (now - arrival_time).total_seconds() / 3600.0
                    # 保留到达时间在1小时内的车辆（用于统计和显示）
                    if hours_since_arrival <= 1.0:
                        vehicles_to_keep.append(vehicle)
                    else:
                        removed_count += 1
                except (ValueError, TypeError):
                    # 时间格式错误，保留车辆（避免误删）
                    vehicles_to_keep.append(vehicle)
            else:
                # 没有到达时间，但状态是已到达，可能是旧数据，保留但记录
                vehicles_to_keep.append(vehicle)
        
        if removed_count > 0:
            system_state['vehicles'] = vehicles_to_keep
            logger.info(f"清理已到达车辆: 删除 {removed_count} 辆（保留 {len(vehicles_to_keep)} 辆）")
        
        # 触发垃圾回收
        collected = gc.collect()
        if collected > 0:
            logger.debug(f"垃圾回收清理了 {collected} 个对象")

# 7. 健康检查
def health_check() -> Dict[str, Any]:
    """系统健康检查"""
    health_status = {
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'checks': {}
    }
    
    try:
        # 使用 system_state 的锁
        with system_state.lock:
            # 检查系统状态完整性
            required_keys = ['nodes', 'edges', 'vehicles', 'monitor_data']
            for key in required_keys:
                health_status['checks'][f'{key}_exists'] = key in system_state
            
            # 检查数据量
            health_status['checks']['node_count'] = len(system_state.get('nodes', []))
            health_status['checks']['edge_count'] = len(system_state.get('edges', []))
            health_status['checks']['vehicle_count'] = len(system_state.get('vehicles', []))
            health_status['checks']['database_size'] = len(system_state.get('travel_time_database', []))
            health_status['checks']['arrival_records_count'] = len(system_state.get('arrival_records', []))
            health_status['checks']['driver_count'] = len(system_state.get('drivers', {}))
            
            # 检查内存使用（如果可用）
            try:
                import psutil  # type: ignore
                process = psutil.Process(os.getpid())
                mem_info = process.memory_info()
                health_status['checks']['memory_mb'] = round(mem_info.rss / 1024 / 1024, 2)
                
                # 内存使用率警告（超过500MB）
                if health_status['checks']['memory_mb'] > 500:
                    health_status['status'] = 'degraded'
                    health_status['checks']['memory_warning'] = f"内存使用较高: {health_status['checks']['memory_mb']} MB"
            except ImportError:
                health_status['checks']['memory_mb'] = None
            
            # 检查调度状态
            health_status['checks']['dispatch_running'] = system_state.get('dispatch_running', False)
            
            # 检查训练数据持久化状态
            if TRAVEL_DB_FILE:
                health_status['checks']['travel_db_file_exists'] = os.path.exists(TRAVEL_DB_FILE)
                if os.path.exists(TRAVEL_DB_FILE):
                    try:
                        file_size = os.path.getsize(TRAVEL_DB_FILE)
                        health_status['checks']['travel_db_file_size_mb'] = round(file_size / 1024 / 1024, 2)
                    except:
                        pass
            
            # 检查是否有异常数据
            health_status['checks']['data_validity'] = True
            if not system_state.get('nodes') or not system_state.get('edges'):
                health_status['checks']['data_validity'] = False
                health_status['status'] = 'degraded'
            
            # 检查车辆状态分布
            vehicles = system_state.get('vehicles', [])
            status_counts = {}
            for v in vehicles:
                status = v.get('status', 'unknown')
                status_counts[status] = status_counts.get(status, 0) + 1
            health_status['checks']['vehicle_status_distribution'] = status_counts
            
    except Exception as e:
        logger.error(f"健康检查失败: {str(e)}")
        health_status['status'] = 'unhealthy'
        health_status['error'] = str(e)
    
    return health_status

# 8. 数据持久化（定期保存检查点）
# 使用绝对路径，确保 WSGI 环境下能正确找到文件（工作目录可能不是项目目录）
# BASE_DIR 在文件开头定义为 os.path.dirname(os.path.abspath(__file__))
CHECKPOINT_FILE = os.path.join(BASE_DIR, 'system_checkpoint.json')
TRAVEL_DB_FILE = os.path.join(BASE_DIR, 'travel_time_database.json')
TRAVEL_DB_BACKUP_DIR = os.path.join(BASE_DIR, 'travel_db_backups')

# 训练数据自动保存计数器
_travel_db_save_counter = 0
TRAVEL_DB_SAVE_INTERVAL = 50  # 每50条记录自动保存一次

def ensure_backup_dir():
    """确保备份目录存在"""
    if TRAVEL_DB_BACKUP_DIR and not os.path.exists(TRAVEL_DB_BACKUP_DIR):
        try:
            os.makedirs(TRAVEL_DB_BACKUP_DIR, exist_ok=True)
        except Exception as e:
            logger.warning(f"无法创建备份目录: {str(e)}")

def save_travel_time_database(force=False):
    """保存训练数据到文件"""
    if TRAVEL_DB_FILE is None:
        return False
    
    global _travel_db_save_counter
    if not force:
        _travel_db_save_counter += 1
        if _travel_db_save_counter < TRAVEL_DB_SAVE_INTERVAL:
            return False
    
    try:
        with system_lock:
            db = system_state.get('travel_time_database', [])
            if not db:
                return False
            
            # 保存到主文件
            temp_file = TRAVEL_DB_FILE + '.tmp'
            with open(temp_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'version': 1,
                    'timestamp': datetime.now().isoformat(),
                    'record_count': len(db),
                    'records': db
                }, f, ensure_ascii=False, indent=2)
            
            # 原子性替换
            if os.path.exists(TRAVEL_DB_FILE):
                os.replace(temp_file, TRAVEL_DB_FILE)
            else:
                os.rename(temp_file, TRAVEL_DB_FILE)
            
            _travel_db_save_counter = 0
            logger.info(f"训练数据已保存: {len(db)} 条记录 -> {TRAVEL_DB_FILE}")
            
            # 定期创建备份（每天一次）
            ensure_backup_dir()
            if TRAVEL_DB_BACKUP_DIR:
                backup_file = os.path.join(
                    TRAVEL_DB_BACKUP_DIR,
                    f"travel_db_backup_{datetime.now().strftime('%Y%m%d')}.json"
                )
                if not os.path.exists(backup_file):
                    import shutil
                    shutil.copy2(TRAVEL_DB_FILE, backup_file)
                    logger.info(f"训练数据备份已创建: {backup_file}")
            
            return True
    except Exception as e:
        logger.error(f"保存训练数据失败: {str(e)}")
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except:
                pass
        return False

def load_travel_time_database():
    """从文件加载训练数据"""
    if TRAVEL_DB_FILE is None or not os.path.exists(TRAVEL_DB_FILE):
        return False
    
    try:
        with open(TRAVEL_DB_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        with system_lock:
            if isinstance(data, dict) and 'records' in data:
                records = data['records']
                system_state['travel_time_database'] = records
                logger.info(f"训练数据已加载: {len(records)} 条记录从 {TRAVEL_DB_FILE}")
            elif isinstance(data, list):
                # 兼容旧格式
                system_state['travel_time_database'] = data
                logger.info(f"训练数据已加载（旧格式）: {len(data)} 条记录从 {TRAVEL_DB_FILE}")
            else:
                logger.warning(f"训练数据文件格式不正确: {TRAVEL_DB_FILE}")
                return False
        
        return True
    except Exception as e:
        logger.error(f"加载训练数据失败: {str(e)}")
        return False

def save_checkpoint():
    """保存系统状态检查点（不包含训练数据，训练数据单独保存）"""
    if CHECKPOINT_FILE is None:
        return
    
    try:
        with system_lock:
            checkpoint_data = {
                'version': 4,  # 升级版本号，包含 map_rotation
                'timestamp': datetime.now().isoformat(),
                'nodes': system_state.get('nodes', []),
                'edges': system_state.get('edges', []),
                'vehicle_types': system_state.get('vehicle_types', {}),
                'edge_directions': system_state.get('edge_directions', {}),
                'vehicle_counter': system_state.get('vehicle_counter', 1),
                'route_time_stats': system_state.get('route_time_stats', {}),
                'map_background': system_state.get('map_background'),
                'map_rotation': system_state.get('map_rotation', 0),  # 添加地图旋转角度
                # 不保存运行时数据（vehicles, drivers等），这些是临时状态
                # 训练数据单独保存到 travel_time_database.json
            }
            
            temp_file = CHECKPOINT_FILE + '.tmp'
            with open(temp_file, 'w', encoding='utf-8') as f:
                json.dump(checkpoint_data, f, ensure_ascii=False, indent=2)
            
            # 原子性替换
            if os.path.exists(CHECKPOINT_FILE):
                os.replace(temp_file, CHECKPOINT_FILE)
            else:
                os.rename(temp_file, CHECKPOINT_FILE)
            
            logger.info(f"系统检查点已保存: {CHECKPOINT_FILE}")
    except Exception as e:
        logger.error(f"保存检查点失败: {str(e)}")
        if 'temp_file' in locals() and os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except:
                pass

def load_checkpoint():
    """加载系统状态检查点"""
    if CHECKPOINT_FILE is None or not os.path.exists(CHECKPOINT_FILE):
        return False
    
    try:
        with open(CHECKPOINT_FILE, 'r', encoding='utf-8') as f:
            checkpoint_data = json.load(f)
        
        with system_lock:
            if 'nodes' in checkpoint_data:
                system_state['nodes'] = checkpoint_data['nodes']
            if 'edges' in checkpoint_data:
                system_state['edges'] = checkpoint_data['edges']
            if 'vehicle_types' in checkpoint_data:
                system_state['vehicle_types'].update(checkpoint_data['vehicle_types'])
            if 'edge_directions' in checkpoint_data:
                system_state['edge_directions'].update(checkpoint_data['edge_directions'])
            if 'vehicle_counter' in checkpoint_data:
                system_state['vehicle_counter'] = checkpoint_data['vehicle_counter']
            if 'route_time_stats' in checkpoint_data:
                system_state['route_time_stats'] = checkpoint_data['route_time_stats']
            if 'map_background' in checkpoint_data:
                system_state['map_background'] = checkpoint_data['map_background']
            if 'map_rotation' in checkpoint_data:
                system_state['map_rotation'] = checkpoint_data['map_rotation']
        
        logger.info(f"系统检查点已加载: {CHECKPOINT_FILE}")
        return True
    except Exception as e:
        logger.error(f"加载检查点失败: {str(e)}")
        return False

# 9. 定期维护任务
def maintenance_worker():
    """定期维护任务：清理内存、保存检查点、保存训练数据、健康检查"""
    while True:
        try:
            time.sleep(300)  # 每5分钟执行一次
            cleanup_memory()
            save_checkpoint()
            # 强制保存训练数据（确保定期持久化）
            save_travel_time_database(force=True)
            health = health_check()
            if health['status'] != 'healthy':
                logger.warning(f"系统健康状态: {health['status']}")
        except Exception as e:
            logger.error(f"维护任务执行失败: {str(e)}")

# 启动维护线程
if not ON_PYTHONANYWHERE:
    maintenance_thread = threading.Thread(target=maintenance_worker, daemon=True)
    maintenance_thread.start()

# ========== 系统状态 ==========

# 使用 backend.models.system_state 的单例，确保与 backend 模块共享同一个状态
# 注意：不要在这里重新定义 system_state，否则会导致 app.py 和 backend 使用不同的状态对象
from backend.models.system_state import system_state

# 为了兼容旧代码中直接访问 system_state['key'] 的方式，
# SystemState 类已实现 __getitem__ 和 __setitem__ 方法

# DQN 规划器已迁移到 backend.services.dqn_service，不再使用全局变量




# 行驶时间数据库相关常量（已迁移到 backend.services.travel_time_service）
# 如需使用这些常量，请直接从 backend.services.travel_time_service 导入


def normalize_travel_time_records(raw_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """对导入的行驶时间记录进行字段规范化（已迁移到 backend.services.travel_time_service）"""
    return _normalize_travel_time_records(raw_records)


def parse_travel_time_excel(file_storage) -> List[Dict[str, Any]]:
    """从 Excel 中解析行驶时间记录（已迁移到 backend.services.travel_time_service）"""
    return _parse_travel_time_excel(file_storage)


def build_travel_time_excel(records: List[Dict[str, Any]]) -> io.BytesIO:
    """将行驶时间记录导出为 Excel 工作簿（已迁移到 backend.services.travel_time_service）"""
    return _build_travel_time_excel(records)

# 节点类型配置      
node_types = {
    'entrance': {'name': '进场口', 'color': '#2ecc71'},
    'crossroad': {'name': '交叉口', 'color': '#3498db'},
    'work-area': {'name': '作业区', 'color': '#e74c3c'},
    'start': {'name': '场外起点', 'color': '#9b59b6'}
}

# 新增：地理方向配置
DIRECTION_TYPES = {
    'two-way': {'name': '双向通行', 'description': '允许双向行驶'},
    'north': {'name': '北向单行', 'description': '只允许从南向北行驶'},
    'south': {'name': '南向单行', 'description': '只允许从北向南行驶'},
    'east': {'name': '东向单行', 'description': '只允许从西向东行驶'},
    'west': {'name': '西向单行', 'description': '只允许从东向西行驶'},
    'northeast': {'name': '东北向单行', 'description': '只允许从西南向东北行驶'},
    'northwest': {'name': '西北向单行', 'description': '只允许从东南向西北行驶'},
    'southeast': {'name': '东南向单行', 'description': '只允许从西北向东南行驶'},
    'southwest': {'name': '西南向单行', 'description': '只允许从东北向西南行驶'}
}

def calculate_direction(start_node, end_node):
    """计算两个节点之间的地理方向（已迁移到 backend.services.path_planning_service）"""
    return _calculate_direction(start_node, end_node)

def is_direction_allowed(edge_direction, start_node, end_node):
    """检查给定的行驶方向是否被允许（已迁移到 backend.services.path_planning_service）"""
    return _is_direction_allowed(edge_direction, start_node, end_node)

def initialize_system():
    """初始化系统数据（已迁移到 backend.services.system_service）"""
    return _initialize_system()

def init_monitor_data():
    """初始化监控数据（已迁移到 backend.services.system_service）"""
    return _init_monitor_data()

def build_graph(vehicle_type=None):
    """构建邻接表（考虑道路方向和车辆限制）（已迁移到 backend.services.path_planning_service）"""
    return _build_graph(vehicle_type)

def calculate_efficient_path(start_node_id, target_node_id, vehicle=None):
    """使用 Dijkstra（基于优先队列）计算最小代价路径（已迁移到 backend.services.path_planning_service）"""
    return _calculate_efficient_path(start_node_id, target_node_id, vehicle)

def estimate_efficiency_score(path):
    """计算一条路径的"效率分"：数值越小越高效（已迁移到 backend.services.path_planning_service）"""
    return _estimate_efficiency_score(path)

def serialize_path_edges(path):
    """将路径中的边转换为可序列化的数据结构（已迁移到 backend.services.path_planning_service）"""
    return _serialize_path_edges(path)

def build_node_sequence_from_path(start_node_id, path):
    """根据路径生成节点序列（已迁移到 backend.services.path_planning_service）"""
    return _build_node_sequence_from_path(start_node_id, path)

def estimate_travel_minutes(path, vehicle_type, custom_speed_kmph=None, start_node=None, target_node=None):
    """估算行驶时间（分钟）（已迁移到 backend.services.path_planning_service）"""
    return _estimate_travel_minutes(path, vehicle_type, custom_speed_kmph, start_node, target_node)

def remember_driver_route(driver_id, route_data):
    """缓存司机最近的路线请求"""
    history = system_state['driver_routes'].setdefault(driver_id, [])
    history.append(route_data)
    # 仅保留最近10条
    if len(history) > 10:
        system_state['driver_routes'][driver_id] = history[-10:]

def record_route_duration(
    start_node: str,
    target_node: str,
    duration_minutes: float,
    vehicle_type: Optional[str] = None,
    custom_speed_kmph: Optional[float] = None,
    distance_m: Optional[float] = None,
    avg_speed_kmph: Optional[float] = None
) -> None:
    """记录路线耗时统计（支持多维度分析）"""
    key = f'{start_node}->{target_node}'
    stats = system_state['route_time_stats'].setdefault(key, {
        'count': 0,
        'total_minutes': 0.0,
        'average_minutes': 0.0,
        'last_updated': None
    })
    stats['count'] += 1
    stats['total_minutes'] += duration_minutes
    stats['average_minutes'] = round(stats['total_minutes'] / stats['count'], 2)
    stats['last_updated'] = datetime.now().isoformat()

    if distance_m is not None:
        distance_summary = stats.setdefault('distance_summary', {
            'count': 0,
            'total_distance_m': 0.0,
            'average_distance_m': 0.0
        })
        distance_summary['count'] += 1
        distance_summary['total_distance_m'] += float(distance_m)
        distance_summary['average_distance_m'] = round(
            distance_summary['total_distance_m'] / distance_summary['count'], 2
        )

    if avg_speed_kmph is not None:
        speed_summary = stats.setdefault('avg_speed_summary', {
            'count': 0,
            'total_speed': 0.0,
            'average_speed_kmph': 0.0
        })
        speed_summary['count'] += 1
        speed_summary['total_speed'] += float(avg_speed_kmph)
        speed_summary['average_speed_kmph'] = round(
            speed_summary['total_speed'] / speed_summary['count'], 2
        )

    if vehicle_type:
        vt_stats = stats.setdefault('vehicle_type_stats', {})
        vt_entry = vt_stats.setdefault(vehicle_type, {
            'count': 0,
            'total_minutes': 0.0,
            'average_minutes': 0.0,
            'last_updated': None
        })
        vt_entry['count'] += 1
        vt_entry['total_minutes'] += duration_minutes
        vt_entry['average_minutes'] = round(vt_entry['total_minutes'] / vt_entry['count'], 2)
        vt_entry['last_updated'] = stats['last_updated']

    if custom_speed_kmph is not None:
        speed_bucket = int(round(float(custom_speed_kmph)))
        custom_speed_stats = stats.setdefault('custom_speed_stats', {})
        bucket_key = f'{speed_bucket}kmh'
        bucket_entry = custom_speed_stats.setdefault(bucket_key, {
            'count': 0,
            'total_minutes': 0.0,
            'average_minutes': 0.0,
            'last_updated': None
        })
        bucket_entry['count'] += 1
        bucket_entry['total_minutes'] += duration_minutes
        bucket_entry['average_minutes'] = round(bucket_entry['total_minutes'] / bucket_entry['count'], 2)
        bucket_entry['last_updated'] = stats['last_updated']

def append_arrival_record(record: Dict[str, Any]) -> None:
    """记录最新到达记录，保留最近200条"""
    system_state['arrival_records'].append(record)
    if len(system_state['arrival_records']) > 200:
        system_state['arrival_records'] = system_state['arrival_records'][-200:]


def append_travel_time_record(record: Dict[str, Any]) -> None:
    """保存行驶时间数据库记录，保留最近1000000条
    
    注意：此数据库用于DQN训练，限制为100万条以确保有足够的训练数据。
    如果数据量超过限制，会保留最近的数据（FIFO策略）。
    数据会自动持久化到文件（每50条记录保存一次）。
    """
    db = system_state.setdefault('travel_time_database', [])
    db.append(record)
    max_records = 1000000  # 增加到100万条，确保有足够的训练数据
    if len(db) > max_records:
        # 只保留最近的数据，但会记录日志提醒用户
        removed_count = len(db) - max_records
        system_state['travel_time_database'] = db[-max_records:]
        logger.warning(f"travel_time_database 超过限制，已删除最旧的 {removed_count} 条记录。"
                      f"建议定期导出数据到Excel进行备份。")
    
    # 自动保存到文件（每50条记录保存一次，或强制保存）
    save_travel_time_database(force=False)


def calculate_average_speed_kmph(distance_m: Optional[float], duration_minutes: Optional[float]) -> Optional[float]:
    """根据距离和耗时计算平均速度（km/h）（已迁移到 backend.services.travel_time_service）"""
    return _calculate_average_speed_kmph(distance_m, duration_minutes)

# ---------------- 深度强化学习（DQN）集成（已迁移到 backend.services.dqn_service）---------------- #
RoadEnvironment = _RoadEnvironment
DeepQLearningPlanner = _DeepQLearningPlanner

def ensure_dqn_planner():
    """懒加载 DQN 规划器（已迁移到 backend.services.dqn_service）"""
    return _ensure_dqn_planner()

def get_node_by_id(node_id):
    """获取节点（已迁移到 backend.services.path_planning_service）"""
    return _get_node_by_id(node_id)

def current_vehicle_location_node(vehicle):
    """推断车辆当前位于哪个节点（用于从当前点重路由）（已迁移到 backend.services.system_service）"""
    return _current_vehicle_location_node(vehicle)

def reroute_vehicles(affected_edges_ids=None):
    """对所有正在移动或等待的车辆进行重路由（已迁移到 backend.services.system_service）"""
    return _reroute_vehicles(affected_edges_ids)

@with_lock()
def update_vehicle_positions():
    """更新车辆位置（根据实际距离与速度计算）（已迁移到 backend.services.vehicle_service）"""
    return _update_vehicle_positions()


def get_edge_length_m(edge: Dict[str, Any]) -> float:
    """获取边的长度（米）（已迁移到 backend.services.path_planning_service）"""
    return _get_edge_length_m(edge)

def get_vehicle_speed_kmph(vehicle_type: str) -> float:
    """获取车辆类型的默认速度（km/h）（已迁移到 backend.services.path_planning_service）"""
    return _get_vehicle_speed_kmph(vehicle_type)

def refresh_edge_geometry():
    """根据当前节点坐标刷新道路的显示长度，但保持 length_m（真实米数）不变（已迁移到 backend.services.path_planning_service）"""
    return _refresh_edge_geometry()

def get_edges_connected_to_node(node_id):
    """获取与指定节点相连的所有道路（已迁移到 backend.services.path_planning_service）"""
    return _get_edges_connected_to_node(node_id)

def apply_node_congestion_to_edges():
    """应用节点拥堵状态到相关道路（已迁移到 backend.services.system_service）"""
    return _apply_node_congestion_to_edges()

@with_lock()
def update_monitor_data():
    """更新监控数据（处理节点拥堵、道路状态、自定义拥堵和施工）（已迁移到 backend.services.system_service）"""
    return _update_monitor_data()

# 使用新的 dispatch_worker（从 backend/workers 导入）
try:
    from backend.workers.dispatch_worker import start_dispatch_worker, set_socketio
    if socketio:
        set_socketio(socketio)
    dispatch_thread = start_dispatch_worker()
except ImportError:
    # 如果导入失败，使用旧的实现作为后备
    logger.warning("无法导入新的 dispatch_worker，使用旧实现")
    @safe_execute(max_retries=1, default_return=None)
    def dispatch_worker():
        """调度工作线程（增强稳定性）- 后备实现"""
        consecutive_errors = 0
        max_consecutive_errors = 10
        
        while True:
            try:
                with system_lock:
                    dispatch_running = system_state.get('dispatch_running', False)
                
                if dispatch_running:
                    try:
                        update_vehicle_positions()  # 更新车辆位置
                        update_monitor_data()  # 更新监控数据
                        
                        # WebSocket 广播实时数据
                        if socketio:
                            try:
                                with system_lock:
                                    socketio.emit('vehicle_update', {
                                        'vehicles': system_state.get('vehicles', []),
                                        'monitor_data': system_state.get('monitor_data', {}),
                                        'timestamp': datetime.now().isoformat()
                                    }, namespace='/')
                            except Exception as ws_error:
                                logger.warning(f"WebSocket 广播失败: {str(ws_error)}")
                        
                        consecutive_errors = 0
                    except Exception as e:
                        consecutive_errors += 1
                        logger.error(f"调度工作线程执行失败 (连续错误 {consecutive_errors}/{max_consecutive_errors}): {str(e)}\n{traceback.format_exc()}")
                        
                        if consecutive_errors >= max_consecutive_errors:
                            logger.critical("调度工作线程连续错误过多，暂停调度")
                            with system_lock:
                                system_state['dispatch_running'] = False
                            consecutive_errors = 0
                            time.sleep(5)
                            continue
                    
                    time.sleep(0.1)
                else:
                    consecutive_errors = 0
                    time.sleep(1)
            except Exception as e:
                logger.critical(f"调度工作线程发生严重错误: {str(e)}\n{traceback.format_exc()}")
                time.sleep(5)
    
    dispatch_thread = None
    if not ON_PYTHONANYWHERE:
        dispatch_thread = threading.Thread(target=dispatch_worker, daemon=True)
        dispatch_thread.start()

# ---------------- API 中间件 ----------------

# API异常处理和限流装饰器
def api_handler(func):
    """API路由装饰器：限流、异常处理、日志记录"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 请求限流
        if not rate_limiter.is_allowed():
            logger.warning(f"请求限流触发: {request.path}")
            return jsonify({
                'success': False,
                'message': '请求过于频繁，请稍后再试'
            }), 429
        
        try:
            start_time = time.time()
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            
            # 记录慢请求
            if duration > 1.0:
                logger.warning(f"慢请求: {request.path} 耗时 {duration:.2f}秒")
            
            return result
        except Exception as e:
            logger.error(f"API错误 {request.path}: {str(e)}\n{traceback.format_exc()}")
            return jsonify({
                'success': False,
                'message': f'服务器内部错误: {str(e)}'
            }), 500
    return wrapper

# ---------------- WebSocket 事件处理 ----------------

if socketio:
    # 连接管理
    active_connections = set()
    
    @socketio.on('connect')
    def handle_connect():
        """客户端连接时"""
        client_id = request.sid
        active_connections.add(client_id)
        logger.info(f"WebSocket 客户端已连接: {client_id} (当前连接数: {len(active_connections)})")
        emit('connected', {'message': '已连接到服务器'})
    
    @socketio.on('disconnect')
    def handle_disconnect():
        """客户端断开连接时"""
        client_id = request.sid
        if client_id in active_connections:
            active_connections.discard(client_id)
        logger.info(f"WebSocket 客户端已断开: {client_id} (当前连接数: {len(active_connections)})")
    
    @socketio.on_error_default
    def default_error_handler(e):
        """默认错误处理"""
        logger.error(f"WebSocket 错误: {str(e)}")
        return {'error': '服务器内部错误'}
    
    @socketio.on('request_update')
    def handle_request_update():
        """客户端请求更新数据"""
        try:
            with system_lock:
                emit('vehicle_update', {
                    'vehicles': system_state.get('vehicles', []),
                    'monitor_data': system_state.get('monitor_data', {}),
                    'timestamp': datetime.now().isoformat()
                }, namespace='/')
        except Exception as e:
            logger.error(f"处理更新请求失败: {str(e)}")

# ---------------- API ----------------

# ========== 路由已迁移到 Blueprint ==========
# 以下路由已迁移到对应的 Blueprint：
# - /api/health -> backend.blueprints.health
# - /api/vehicles -> backend.blueprints.vehicles
# - /api/drivers -> backend.blueprints.drivers
# - /api/nodes -> backend.blueprints.nodes
# - /api/edges -> backend.blueprints.edges
# - /api/monitor -> backend.blueprints.monitor
# - /api/dispatch/* -> backend.blueprints.dispatch
#
# 如果 Blueprint 不可用，保留旧的路由作为后备
# ========== 已迁移到 Blueprint 的路由 ==========
# 以下路由已迁移到对应的 Blueprint：
# - /api/health -> backend.blueprints.health
# - /api/initialize -> backend.blueprints.system
# - /api/vehicles -> backend.blueprints.vehicles
# - /api/drivers -> backend.blueprints.drivers
# - /api/nodes -> backend.blueprints.nodes
# - /api/edges -> backend.blueprints.edges
# - /api/monitor -> backend.blueprints.monitor
# - /api/dispatch/* -> backend.blueprints.dispatch
# - /api/dqn/* -> backend.blueprints.dqn
# - /api/travel-time-database/* -> backend.blueprints.travel_time
# - /api/import-dxf, /api/dxf-to-json, /api/import-roadnet, /api/export-roadnet -> backend.blueprints.map_import
# - /api/roads -> backend.blueprints.edges
# - /api/system/reset -> backend.blueprints.system
# - /api/server-info -> backend.blueprints.system
# - /api/reroute -> backend.blueprints.system

# 所有路由已迁移到 Blueprint，不再需要后备实现


# ---------------- DXF 导入工具函数 ---------------- #

def _round_point(point: Tuple[float, float], ndigits: int = 3) -> Tuple[float, float]:
    return round(point[0], ndigits), round(point[1], ndigits)


def _point_on_segment(point: Tuple[float, float], start: Tuple[float, float], end: Tuple[float, float],
                      tol: float = 1e-3) -> bool:
    """判断点是否位于线段上（包含端点）"""
    px, py = point
    x1, y1 = start
    x2, y2 = end
    # 叉乘判断共线
    cross = (px - x1) * (y2 - y1) - (py - y1) * (x2 - x1)
    if abs(cross) > tol:
        return False
    # 使用点乘判断投影是否位于线段范围
    dot = (px - x1) * (px - x2) + (py - y1) * (py - y2)
    return dot <= tol


def _segment_intersection(seg1: Tuple[Tuple[float, float], Tuple[float, float]],
                          seg2: Tuple[Tuple[float, float], Tuple[float, float]],
                          tol: float = 1e-3) -> Tuple[float, float] | None:
    """计算两条线段的交点"""
    (x1, y1), (x2, y2) = seg1
    (x3, y3), (x4, y4) = seg2
    denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if abs(denom) <= tol:
        return None
    px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom
    py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom
    if _point_on_segment((px, py), (x1, y1), (x2, y2), tol) and _point_on_segment((px, py), (x3, y3), (x4, y4), tol):
        return px, py
    return None


def _line_direction(start: Tuple[float, float], end: Tuple[float, float], tol: float = 1e-3) -> str:
    dx = end[0] - start[0]
    dy = end[1] - start[1]
    if abs(dx) <= tol:
        return 'vertical'
    if abs(dy) <= tol:
        return 'horizontal'
    return 'oblique'


def _point_to_line_distance(point: Tuple[float, float], line_start: Tuple[float, float], line_end: Tuple[float, float]) -> float:
    """计算点到直线的距离"""
    px, py = point
    x1, y1 = line_start
    x2, y2 = line_end
    
    # 如果线段长度为0，返回点到点的距离
    line_length_sq = (x2 - x1) ** 2 + (y2 - y1) ** 2
    if line_length_sq < 1e-6:
        return math.dist(point, line_start)
    
    # 计算投影点
    t = max(0.0, min(1.0, ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / line_length_sq))
    proj_x = x1 + t * (x2 - x1)
    proj_y = y1 + t * (y2 - y1)
    
    return math.dist(point, (proj_x, proj_y))


def _are_parallel(seg1: Tuple[Tuple[float, float], Tuple[float, float]], 
                  seg2: Tuple[Tuple[float, float], Tuple[float, float]], 
                  angle_tol: float = 0.1) -> bool:
    """判断两条线段是否平行"""
    (x1, y1), (x2, y2) = seg1
    (x3, y3), (x4, y4) = seg2
    
    dx1 = x2 - x1
    dy1 = y2 - y1
    dx2 = x4 - x3
    dy2 = y4 - y3
    
    # 计算方向向量长度
    len1 = math.hypot(dx1, dy1)
    len2 = math.hypot(dx2, dy2)
    
    if len1 < 1e-6 or len2 < 1e-6:
        return False
    
    # 归一化方向向量
    u1 = (dx1 / len1, dy1 / len1)
    u2 = (dx2 / len2, dy2 / len2)
    
    # 计算点积（平行时接近1或-1）
    dot = u1[0] * u2[0] + u1[1] * u2[1]
    return abs(abs(dot) - 1.0) < angle_tol


def _calculate_road_width(center_seg: Tuple[Tuple[float, float], Tuple[float, float]], 
                          boundary_segments: List[Tuple[Tuple[float, float], Tuple[float, float]]],
                          tol: float = 1e-3, max_search_distance: float = 50.0) -> Optional[float]:
    """计算道路宽度：找到与中心线平行且距离合理的边界线，计算宽度"""
    parallel_segments = []
    (cx1, cy1), (cx2, cy2) = center_seg
    center_mid = ((cx1 + cx2) / 2, (cy1 + cy2) / 2)
    
    for boundary_seg in boundary_segments:
        if not _are_parallel(center_seg, boundary_seg):
            continue
        
        # 计算边界线中点到中心线的距离
        (bx1, by1), (bx2, by2) = boundary_seg
        boundary_mid = ((bx1 + bx2) / 2, (by1 + by2) / 2)
        distance = _point_to_line_distance(boundary_mid, center_seg[0], center_seg[1])
        
        # 只考虑距离合理的边界线（避免匹配到其他道路的边界）
        if 0.5 <= distance <= max_search_distance:
            # 检查边界线是否与中心线在同一个道路段上（投影重叠）
            # 计算边界线两端点到中心线的距离，如果都在合理范围内，认为是同一道路
            dist1 = _point_to_line_distance((bx1, by1), center_seg[0], center_seg[1])
            dist2 = _point_to_line_distance((bx2, by2), center_seg[0], center_seg[1])
            
            # 如果边界线两端点到中心线的距离相近，认为是同一道路的边界
            if abs(dist1 - distance) < max_search_distance and abs(dist2 - distance) < max_search_distance:
                parallel_segments.append((boundary_seg, distance))
    
    if not parallel_segments:
        return None
    
    # 按距离排序
    parallel_segments.sort(key=lambda x: x[1])
    
    # 如果有两条或更多平行边界线，取距离中心线最近的两条
    if len(parallel_segments) >= 2:
        # 取距离最近的两条，计算它们之间的距离作为道路宽度
        dist1 = parallel_segments[0][1]
        dist2 = parallel_segments[1][1]
        width = dist1 + dist2  # 中心线两侧的距离之和
    else:
        # 只有一条边界线，假设对称，宽度是距离的两倍
        width = parallel_segments[0][1] * 2
    
    return float(round(width, 3))


def parse_dxf_file(file_path: str) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    """解析 DXF 文件，生成节点和道路数据（已迁移到 backend.services.map_import_service）"""
    return _parse_dxf_file(file_path)

def _apply_map_data(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> None:
    """使用给定的节点和道路数据更新系统状态（已迁移到 backend.services.system_service）"""
    return __apply_map_data(nodes, edges)


# 提供静态文件服务
# BASE_DIR 已在文件开头定义

@app.route('/')
def serve_index():
    """主界面"""
    return send_from_directory(BASE_DIR, 'traffic_system.html')

@app.route('/favicon.ico')
def favicon():
    """返回 favicon（避免 404 错误）"""
    return '', 204  # No Content

@app.route('/driver')
def serve_driver():
    """司机界面"""
    return send_from_directory(BASE_DIR, 'driver.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """静态文件服务"""
    return send_from_directory(BASE_DIR, filename)

# ========== 模块加载时初始化（WSGI 兼容） ==========
def _init_on_import():
    """
    模块被导入时执行初始化
    
    PythonAnywhere 使用 WSGI 启动应用，会直接 import app 模块，
    而不执行 if __name__ == '__main__' 块。
    因此必须在模块级别执行初始化，确保检查点被加载。
    """
    global _init_log
    _init_log = []
    
    _init_log.append(f"开始初始化 at {datetime.now().isoformat()}")
    _init_log.append(f"CHECKPOINT_FILE = {CHECKPOINT_FILE}")
    _init_log.append(f"文件存在: {os.path.exists(CHECKPOINT_FILE) if CHECKPOINT_FILE else 'N/A'}")
    
    # 尝试加载检查点
    checkpoint_loaded = load_checkpoint()
    _init_log.append(f"load_checkpoint() 返回: {checkpoint_loaded}")
    
    # 尝试加载训练数据
    travel_db_loaded = load_travel_time_database()
    _init_log.append(f"load_travel_time_database() 返回: {travel_db_loaded}")
    
    # 初始化系统（如果检查点加载失败）
    if not checkpoint_loaded:
        _init_log.append("检查点加载失败，执行 initialize_system()")
        logger.info("未找到检查点，执行系统初始化")
        initialize_system()
    else:
        node_count = len(system_state.get('nodes', []))
        edge_count = len(system_state.get('edges', []))
        _init_log.append(f"检查点加载成功: {node_count} 节点, {edge_count} 道路")
        logger.info(f"检查点加载成功，包含 {node_count} 个节点，{edge_count} 条道路")
        refresh_edge_geometry()
        init_monitor_data()
    
    if travel_db_loaded:
        db_count = len(system_state.get('travel_time_database', []))
        _init_log.append(f"训练数据加载成功: {db_count} 条记录")
        logger.info(f"训练数据加载成功，包含 {db_count} 条记录")
    else:
        logger.info("未找到训练数据文件，将使用空数据库")

# 模块导入时自动初始化
_init_on_import()

if __name__ == '__main__':
    # 注意：初始化逻辑已在 _init_on_import() 中处理（模块级别）
    # 这确保了 WSGI 模式下（如 PythonAnywhere）也能正确初始化
    
    # 记录 CORS 配置状态
    if Config.CORS_ALLOWED_ORIGINS:
        logger.info(f"CORS 已配置，允许的来源: {Config.CORS_ALLOWED_ORIGINS}")
    else:
        logger.warning("CORS 允许所有来源（开发模式），生产环境请设置 CORS_ALLOWED_ORIGINS 环境变量")
    
    # 启动信息（保留 print 用于控制台输出，同时记录到日志）
    startup_msg = '🚀 工地交通调度系统后端启动中...'
    print(startup_msg)
    logger.info(startup_msg)
    
    logger.info("系统启动完成")
    
    start_time = f'⏰ 开始时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}'
    print(start_time)
    logger.info(start_time)
    
    # 检查SSL证书是否存在
    ssl_dir = os.path.join(BASE_DIR, "ssl")
    ssl_key = os.path.join(ssl_dir, "server.key")
    ssl_cert = os.path.join(ssl_dir, "server.crt")
    use_https = os.path.exists(ssl_key) and os.path.exists(ssl_cert)
    
    # 调试信息：检查证书文件
    if not use_https:
        logger.debug(f"SSL目录: {ssl_dir} (存在: {os.path.exists(ssl_dir)})")
        logger.debug(f"SSL密钥文件: {ssl_key} (存在: {os.path.exists(ssl_key)})")
        logger.debug(f"SSL证书文件: {ssl_cert} (存在: {os.path.exists(ssl_cert)})")
    
    if use_https:
        logger.info("🔐 检测到SSL证书，启用HTTPS")
        print("🔐 SSL证书已检测到，启用HTTPS模式")
        protocol = "https"
    else:
        logger.info("ℹ️  未检测到SSL证书，使用HTTP模式")
        print("ℹ️  提示: 使用 python generate_ssl_cert.py 生成SSL证书以启用HTTPS")
        protocol = "http"
    
    # 更新服务地址显示
    if use_https:
        service_url = f'📡 服务地址: https://localhost:5000'
        print(service_url)
        logger.info(service_url)
        
        # 更新局域网访问地址
        try:
            import socket
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
            s.close()
            lan_access = f'📱 局域网访问: https://{local_ip}:5000'
            driver_interface = f'📱 司机界面: https://{local_ip}:5000/driver'
            tip_msg = '💡 提示: 首次访问会显示"不安全"警告，点击"高级" -> "继续访问"即可'
            print(lan_access)
            print(driver_interface)
            print(tip_msg)
            logger.info(f"局域网HTTPS: {local_ip}")
        except Exception:
            pass
    
    # 启动Flask应用（支持WebSocket和HTTPS）
    if socketio:
        if use_https:
            # threading 模式下使用 ssl_context 而不是 keyfile/certfile
            ssl_context = (ssl_cert, ssl_key)
            socketio.run(
                app, 
                debug=True, 
                host='0.0.0.0', 
                port=5000, 
                allow_unsafe_werkzeug=True,
                ssl_context=ssl_context
            )
        else:
            socketio.run(app, debug=True, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
    else:
        if use_https:
            app.run(debug=True, host='0.0.0.0', port=5000, ssl_context=(ssl_cert, ssl_key))
        else:
            app.run(debug=True, host='0.0.0.0', port=5000)