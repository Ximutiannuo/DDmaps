// ========== 多语言支持 (i18n) ==========
        let currentLang = 'zh'; // 默认语言：中文
        
        const i18n = {
            zh: {
                // 系统标题
                system_title: '工地交通调度系统 - 增强版（含路径优化）',
                // 标签页
                tab_vehicle_input: '车辆调度',
                tab_map_settings: '地图设置',
                tab_road_info: '路网信息',
                tab_monitor: '实时监控',
                tab_vehicle_config: '车辆配置',
                tab_travel_time_db: '行驶时间库',
                tab_driver_portal: '司机入口',
                // 车辆调度
                vehicle_info_input: '车辆信息输入',
                vehicle_id: '车辆ID',
                vehicle_id_placeholder: '留空则自动编号',
                vehicle_type: '车辆类型',
                vehicle_type_truck: '渣土车',
                vehicle_type_material: '材料车',
                vehicle_type_construction: '工程车',
                vehicle_type_special: '特种车',
                vehicle_weight: '载重 (吨)',
                vehicle_width: '宽度 (米)',
                start_node: '起点节点',
                target_node: '目标区域',
                add_vehicle: '添加车辆',
                current_vehicles: '当前车辆',
                manual_reroute: '手动重算路径（所有）',
                sort_by_efficiency: '按效率排序',
                loading_vehicle_data: '正在加载车辆数据...',
                dispatch_control: '调度控制',
                start_dispatch: '开始调度',
                reset_system: '重置系统',
                // 地图设置
                map_settings: '地图设置',
                custom_map: '自定义地图',
                upload_map_hint: '点击或拖拽图片到这里上传',
                upload_map_format: '支持 JPG、PNG 格式，建议尺寸 800x600 以上',
                remove_map_background: '清除自定义地图',
                map_background_hint: '提示：仅替换底图，不会修改路网节点。',
                import_dxf: '导入 DXF 路网',
                dxf_upload_hint: '点击或拖拽 DXF 文件到这里导入',
                dxf_requirements: '要求：道路中心线图层为"道路中心线"或线型为 JIS_08_50',
                import_dxf_btn: '导入 DXF 路网',
                dxf_to_json_btn: 'DXF 转 JSON 并下载',
                dxf_warning: '导入后将覆盖现有节点与道路，请提前备份数据。',
                json_map_management: 'JSON 路网管理',
                json_upload_hint: '点击或拖拽 JSON 文件到这里导入',
                json_format_hint: '支持由系统导出的路网 JSON 格式。',
                import_json_btn: '导入 JSON 路网',
                export_json_btn: '导出当前路网为 JSON',
                json_hint: '提示：可将当前路网导出为 JSON 备份或分享。',
                map_drag_control: '地图拖动控制',
                toggle_map_drag: '地图拖动: 关闭',
                map_drag_hint: '提示：开启后，可以拖动整个地图（包括节点、道路等所有元素）',
                map_zoom_control: '地图缩放控制',
                zoom_in: '放大 (+)',
                zoom_out: '缩小 (-)',
                zoom_reset: '重置',
                current_zoom: '当前缩放:',
                node_management: '节点管理',
                show_hidden_nodes: '显示隐藏的节点（高亮显示）',
                show_hidden_nodes_hint: '开启后，所有隐藏的节点会以特殊样式显示在地图上，方便您重新设置它们的显示状态',
                show_branch_nodes: '显示支路节点（JIS_08_50）',
                show_branch_nodes_hint: '开启后，会显示支路与支路相交的节点（线型为JIS_08_50的道路）',
                node_type: '节点类型',
                node_type_entrance: '进场口',
                node_type_crossroad: '交叉口',
                node_type_work_area: '作业区',
                node_type_start: '场外起点',
                node_name: '节点名称',
                node_name_placeholder: '例如: 进场口1',
                add_node: '添加节点',
                sync_positions: '同步节点位置到后端',
                clear_nodes: '清除所有节点',
                gps_management: 'GPS坐标管理',
                export_gps: '📥 导出GPS坐标 (XLSX)',
                import_gps: '📤 导入GPS坐标 (XLSX)',
                gps_instructions: '使用说明：',
                gps_export_hint: '导出：将所有节点的GPS坐标导出为Excel文件',
                gps_import_hint: '导入：从Excel文件批量导入GPS坐标',
                gps_format_hint: '格式：节点ID、名称、纬度、经度',
                map_text_boxes: '地图文字框',
                text_box_instructions: '使用说明：',
                text_box_1: '1. 开启编辑模式后，双击节点可编辑节点名称',
                text_box_2: '2. 双击道路可编辑道路名称',
                text_box_3: '3. 点击地图空白处可添加文字框',
                text_box_4: '4. 双击文字框可编辑格式，拖动可移动位置',
                road_management: '道路管理',
                road_length: '道路长度 (米)',
                road_direction: '道路方向',
                road_direction_two_way: '双向通行',
                road_direction_north: '北向单行',
                road_direction_south: '南向单行',
                road_direction_east: '东向单行',
                road_direction_west: '西向单行',
                road_direction_northeast: '东北向单行',
                road_direction_northwest: '西北向单行',
                road_direction_southeast: '东南向单行',
                road_direction_southwest: '西南向单行',
                add_road: '添加道路',
                clear_roads: '清除所有道路',
                // 路网信息
                road_info: '路网信息',
                road_overview: '路网概览',
                loading_road_data: '正在加载路网数据...',
                node_congestion_control: '节点拥堵控制',
                select_node: '选择节点',
                select_node_placeholder: '请选择节点',
                set_normal: '正常',
                set_light_congestion: '轻微拥堵',
                set_medium_congestion: '中度拥堵',
                set_severe_congestion: '严重拥堵',
                node_congestion_hint: '提示：节点拥堵会影响所有与该节点相连的道路，拥堵级别越高影响越大',
                road_status_control: '道路状态控制',
                select_road: '选择道路',
                select_road_placeholder: '请选择道路',
                set_congested: '拥堵',
                set_construction: '占道施工',
                set_closed: '封闭',
                road_status_hint: '提示：',
                road_status_normal: '正常：道路可正常通行',
                road_status_congested: '拥堵：道路可用但拥堵，车辆会尝试绕行',
                road_status_construction: '占道施工：道路可用但高拥堵，通行缓慢',
                road_status_closed: '封闭：道路不可通行，车辆必须绕行',
                custom_congestion_control_old: '自定义拥堵控制（旧版）',
                set_congested_old: '设为拥堵',
                old_congestion_hint: '提示：此功能已升级为"道路状态控制"，建议使用新版功能',
                road_direction_control: '道路方向控制',
                direction_control_hint: '💡 提示：现在可以直接点击地图上的道路来设置方向和状态，无需在此选择。',
                old_direction_settings: '旧版方向设置（已弃用，点击展开）',
                road_direction_hint: '提示：单向道路只允许指定方向行驶',
                road_info_list: '道路信息',
                loading_road_list: '正在加载道路数据...',
                // 实时监控
                real_time_monitoring: '实时监控',
                ws_status_polling: '🔴 轮询模式',
                ws_status_connected: '🟢 WebSocket 已连接',
                loading_monitor_data: '正在加载监控数据...',
                data_visualization: '数据可视化',
                efficiency_trend: '效率趋势',
                vehicle_type_distribution: '车辆类型分布',
                road_congestion_top10: '道路拥堵情况（Top 10）',
                dispatch_results: '调度结果',
                no_dispatch_results: '暂无调度结果',
                arrival_statistics: '到达统计',
                no_arrival_data: '暂无到达数据',
                route_statistics: '路线统计',
                no_route_statistics: '暂无路线统计',
                latest_arrival_records: '最新到达记录',
                no_arrival_records: '暂无到达记录',
                // 车辆配置
                vehicle_type_config: '车辆类型配置',
                loading_vehicle_types: '正在加载车辆类型配置...',
                add_new_vehicle_type: '添加新车辆类型',
                new_vehicle_type_name: '车辆类型名称',
                new_vehicle_type_placeholder: '例如: 消防车',
                new_speed_kmph: '速度 (km/h)',
                speed_range_hint: '建议范围 5-80 km/h，根据车辆类型调整',
                can_use_one_way: '可使用单向道路',
                can_use_two_way: '可使用双向道路',
                yes: '是',
                no: '否',
                // 行驶时间数据库
                travel_time_database: '行驶时间数据库',
                refresh: '刷新',
                export_json: '导出 JSON',
                export_excel: '导出 Excel',
                import_json_excel: '导入 JSON/Excel',
                save_to_file: '保存到文件',
                import_mode_append: '追加导入',
                import_mode_replace: '覆盖导入',
                clear_data: '清除数据',
                import_export_hint: '支持 JSON 与 Excel (.xlsx) 文件导入/导出，用于分析路线耗时数据',
                clear_db_dialog_title: '清除行驶时间数据库',
                clear_all_data: '清除所有数据',
                clear_by_filter: '按条件清除',
                clear_before_date: '清除此日期之前的记录',
                clear_after_date: '清除此日期之后的记录',
                clear_by_driver: '清除指定司机的记录（司机ID）',
                clear_by_driver_placeholder: '留空则不限制',
                clear_by_vehicle_type: '清除指定车辆类型的记录',
                all_types: '全部',
                confirm_clear: '确认清除',
                cancel: '取消',
                no_data: '暂无数据',
                driver_column: '司机',
                vehicle_type_column: '车辆类型',
                route_column: '起点 → 终点',
                time_column: '用时 (分钟)',
                distance_column: '距离',
                avg_speed_column: '平均速度',
                speed_setting_column: '速度设定',
                departure_time_column: '出发时间',
                arrival_time_column: '到达时间',
                route_nodes_column: '路线节点数',
                // DQN
                dqn_path_optimization: '深度学习路径优化（DQN）请使用JSON格式导入',
                dqn_status: '状态：',
                dqn_status_not_checked: '尚未检测',
                dqn_status_hint: '需先训练后才能调用深度学习路径。',
                refresh_status: '刷新状态',
                training_params: '训练参数',
                training_epochs: '训练轮次',
                batch_size: '批量大小',
                discount_factor: '折扣系数 (0-1)',
                start_training: '开始训练',
                training_not_started: '训练未开始',
                dqn_route_planning: 'DQN 路径规划',
                start_node: '起点节点',
                target_node: '目标节点',
                exploration_rate: '探索率 ε (0-1)',
                use_dqn_plan: '使用 DQN 规划',
                not_called: '尚未调用',
                // 司机入口
                driver_portal: '司机入口',
                qrcode_generation: '二维码生成',
                getting_server_info: '正在获取服务器信息...',
                driver_interface_url: '司机界面访问地址',
                copy: '复制',
                manual_url_input: '或手动输入完整地址（如果需要自定义）',
                manual_url_placeholder: '例如: https://example.com/driver 或 http://192.168.1.100:5000/driver',
                update_url: '更新地址',
                generate_qrcode: '生成二维码',
                qrcode_hint: '司机可使用手机扫描此二维码进入路线规划界面',
                driver_management: '司机管理',
                registered_drivers: '已注册司机:',
                drivers_count: '人',
                driver_management_hint: '💡 提示：司机可以通过司机界面规划路线并提交为实际车辆，提交的车辆会显示在"车辆调度"标签页中',
                registered_drivers_list: '已注册司机列表',
                loading_drivers: '加载中...',
                driver_id: '司机ID',
                driver_id_placeholder: '例如: D001',
                driver_name: '姓名',
                driver_name_placeholder: '司机姓名',
                license_plate: '车牌号',
                license_plate_placeholder: '请输入车牌号',
                driver_contact: '联系方式',
                driver_contact_placeholder: '手机号或其他联系方式',
                register_update_driver: '注册 / 更新司机信息',
                driver_details: '司机详细信息',
                close: '关闭',
                route_prediction: '路径预测',
                calculate_recommended_route: '计算推荐路线',
                route_planning_not_done: '尚未进行路线规划',
                history: '历史记录',
                no_history: '尚无历史记录',
                drag_resizer_title: '拖动调整宽度',
                map_controls_title: '点击按钮使用功能',
                // 地图控制
                map_controls: '控制面板',
                edit_mode_off: '编辑模式: 关闭',
                edit_mode_on: '编辑模式: 开启',
                labels_all: '标签: 全部显示',
                labels_edges_only: '标签: 仅道路',
                labels_nodes_only: '标签: 仅节点',
                labels_hidden: '标签: 隐藏',
                gps_icons_show: 'GPS图标: 显示',
                gps_icons_hide: 'GPS图标: 隐藏',
                map_rotation: '地图旋转',
                degrees: '°',
                apply: '应用',
                reset: '重置',
                construction_site_map: '工地路网地图',
                legend: '图例',
                legend_end_point: '尽头点',
                legend_crossroad: '交叉口',
                legend_work_area: '作业区',
                legend_external_start: '场外起点',
                legend_truck: '渣土车',
                legend_material: '材料车',
                legend_construction: '工程车',
                legend_special: '特种车',
                legend_one_way: '单向道路',
                legend_congested_road: '拥堵道路',
                legend_construction_road: '占道施工',
                legend_closed_road: '封闭道路',
                legend_light_congestion: '轻微拥堵节点',
                legend_medium_congestion: '中度拥堵节点',
                legend_severe_congestion: '严重拥堵节点',
                // 通用
                no_nodes: '暂无节点，请添加节点',
                no_text_boxes: '暂无文字框',
                end_node: '终点节点',
                // 节点状态菜单
                node_status_menu_title: '节点状态',
                current_status: '当前状态:',
                set_direction: '设置方向:',
                set_status: '设置状态:',
                visibility_settings: '显示设置:',
                show_node: '显示节点',
                hide_node: '显示',
                hide: '隐藏',
                show: '显示',
                // 道路状态菜单
                road_status_menu_title: '道路',
                current_direction: '当前方向:',
                direction_two_way: '双向',
                direction_reverse: '反向',
                direction_north: '北向',
                direction_south: '南向',
                direction_east: '东向',
                direction_west: '西向',
                direction_northeast: '东北',
                direction_northwest: '西北',
                direction_southeast: '东南',
                direction_southwest: '西南',
                // GPS对话框
                gps_calibration: 'GPS坐标校准',
                node_info: '节点信息:',
                name_label: '名称:',
                id_label: 'ID:',
                type_label: '类型:',
                unknown: '未知',
                current_gps_coords: '当前GPS坐标:',
                latitude: '纬度',
                longitude: '经度',
                decimal_format: '十进制',
                gps_not_set: '未设置GPS坐标',
                gps_not_set_hint: '请为节点设置GPS坐标以启用定位功能',
                latitude_label: '纬度 (Latitude)',
                longitude_label: '经度 (Longitude)',
                degrees: '度',
                minutes: '分',
                seconds: '秒',
                format_example: '格式: 度°分\'秒"方向 (例如: 59°37\'28.0"N) 或直接输入完整格式: 59°36\'23.0"N 28°16\'06.8"E',
                quick_input_hint: '快速输入: 59°36\'23.0"N 或 59 36 23.0 N',
                quick_input_hint_full: '快速输入: 28°16\'06.8"E 或完整: 59°36\'23.0"N 28°16\'06.8"E',
                quick_input_tip: '提示: 在快速输入框中输入完整坐标，系统会自动解析并填充到上方字段',
                quick_input_tip_blur: '提示: 在快速输入框中输入坐标后点击其他地方，系统会自动解析并填充到上方字段',
                get_current_location: '获取当前位置',
                save: '保存',
                cancel: '取消',
                node_not_exists: '节点不存在',
                // 浏览器安全限制对话框
                browser_security_restriction: '浏览器安全限制',
                current_access: '当前访问方式：',
                browser_security_msg: '现代浏览器（Chrome/Edge等）出于安全考虑，不允许在HTTP协议的局域网IP上使用定位功能。即使系统位置服务已开启，浏览器也会拒绝定位权限请求。',
                solutions: '解决方案：',
                solution1_title: '方案1：配置HTTPS（推荐）',
                solution1_desc: '1. 安装SSL证书（可使用自签名证书用于内网）\n2. 修改Flask应用启用HTTPS\n3. 使用 https://[hostname]:5000 访问',
                solution2_title: '方案2：使用localhost（仅本机）',
                solution2_desc: '1. 在本机使用 http://localhost:5000 访问\n2. localhost 允许使用HTTP协议进行定位\n3. 注意：局域网其他设备无法访问',
                solution3_title: '方案3：手动输入GPS坐标（当前可用）',
                solution3_desc: '1. 使用手机或其他设备获取GPS坐标\n2. 在下方"快速输入"框中输入坐标\n3. 格式：59°36\'23.0"N 28°16\'06.8"E\n4. 系统会自动解析并填充',
                solution4_title: '方案4：使用其他浏览器（临时方案）',
                solution4_desc: '某些浏览器（如Firefox）可能对HTTP+局域网IP的限制较宽松，可以尝试使用Firefox浏览器。',
                got_it: '我知道了，使用手动输入',
                // 错误提示
                error_occurred: '发生错误',
                set_gps_error: '设置GPS坐标失败',
                gps_set_success: 'GPS坐标已保存',
                set_node_status_error: '设置节点状态失败',
                set_node_status_success: '节点状态已更新',
                set_edge_status_error: '设置道路状态失败',
                set_edge_status_success: '道路状态已更新',
                set_edge_direction_error: '设置道路方向失败',
                set_edge_direction_success: '道路方向已更新',
                update_node_error: '更新节点失败',
                update_node_success: '节点名称和格式已更新',
                click_gps_set: '点击设置GPS坐标',
                // 道路名称
                road_label: '道路:',
                road_direction: '道路方向',
                // 定位相关
                getting_location: '定位中...',
                location_failed: '定位失败',
                location_permission_denied: '定位权限被拒绝',
                location_permission_denied_detail: '浏览器拒绝了定位权限请求',
                location_unavailable: '位置信息不可用',
                location_unavailable_detail: '无法获取当前位置信息',
                location_timeout: '定位超时',
                location_timeout_detail: '定位请求超时，请重试',
                location_error_detail: '未知错误',
                got_it_short: '我知道了',
                // GPS输入验证
                gps_input_incomplete: '请输入完整的GPS坐标（度、分、秒）',
                gps_lat_format_error: '纬度格式错误：度(0-90)，分(0-59)，秒(0-59.9)',
                gps_lon_format_error: '经度格式错误：度(0-180)，分(0-59)，秒(0-59.9)',
                gps_lat_range_error: '纬度超出范围（-90到90）',
                gps_lon_range_error: '经度超出范围（-180到180）',
                save_failed: '保存失败',
                unknown_error: '未知错误',
                // 定位错误帮助信息
                location_unavailable_help: '可能的原因：\n1. GPS信号弱或设备未连接GPS\n2. 设备定位服务已关闭\n3. 网络定位服务不可用\n\n解决方法：\n- 检查设备定位服务是否开启\n- 尝试在室外或信号较好的地方\n- 检查网络连接',
                location_timeout_help: '解决方法：\n1. 检查网络连接\n2. 确保GPS信号良好\n3. 稍后重试',
                location_error_help: '请检查浏览器是否支持定位功能，或尝试刷新页面',
                // 编辑节点/道路名称
                edit_node_name: '编辑节点名称',
                edit_edge_name: '编辑道路名称',
                node_name_label: '节点名称:',
                edge_name_label: '道路名称:',
                font_size: '字体大小:',
                font_family: '字体:',
                font_weight: '字体粗细:',
                font_weight_normal: '正常',
                font_weight_bold: '粗体',
                padding: '内边距:',
                label_text: '文字内容:',
                label_color: '文字颜色:',
                label_bg_color: '背景颜色:',
                label_border_color: '边框颜色:',
                opacity: '透明度:',
                rotation_angle: '旋转角度:',
                text_box_updated: '文字框已更新',
                text_box_update_failed: '更新文字框失败',
                text_box_update_error: '更新文字框时发生错误',
                text_box_deleted: '文字框已删除',
                text_box_delete_failed: '删除文字框失败',
                text_box_delete_error: '删除文字框时发生错误',
                confirm_delete_text_box: '确定要删除这个文字框吗？',
                node_name_input_label: '节点名称:',
                update_node_success: '节点名称和格式已更新',
                update_node_error: '更新节点失败',
                update_node_error_msg: '更新节点时发生错误',
                // 道路编辑
                edge_name_label: '道路名称:',
                border_width: '边框宽度:',
                update_edge_success: '道路名称和格式已更新',
                update_edge_error: '更新道路失败',
                update_edge_error_msg: '更新道路时发生错误',
                edge_name_updated: '道路名称已更新',
                // 文字框
                enter_text_content: '请输入文字内容:',
                position_label: '位置:',
                edit_text_box: '编辑',
                delete_text_box: '删除',
                text_box_added: '文字框添加成功',
                text_box_add_failed: '添加文字框失败',
                text_box_add_error: '添加文字框时发生错误',
                edit_text_box_title: '编辑文字框',
                // 提示信息
                please_enter_driver_id: '请输入司机ID',
                please_register_driver: '请先输入司机ID并完成注册',
                please_select_start_node: '请选择起点节点',
                please_select_target_node: '请选择目标节点',
                start_target_same: '起点和目标节点不能相同',
                confirm_delete_node: '确定要删除这个节点吗？所有连接到这个节点的道路也会被删除。',
                confirm_reset_system: '确定要重置系统吗？此操作将清除所有车辆和调度数据。',
                please_upload_image: '请上传图片文件',
                map_file_read_failed: '地图文件读取失败',
                confirm_clear_map: '确定要清除自定义地图吗？',
                please_enter_node_name: '请输入节点名称',
                map_not_loaded: '地图未加载，无法添加节点',
                confirm_clear_nodes: '确定要清除所有节点吗？此操作不可撤销。',
                please_select_start_end: '请选择起点和终点节点',
                // 车辆信息
                vehicle_start: '起点:',
                vehicle_target: '目标:',
                vehicle_driver: '司机:',
                vehicle_path: '路径:',
                vehicle_edges: '条边',
                vehicle_arrival_time: '到达时间:',
                success_render_vehicles: '成功渲染 {count} 辆车到地图'
            },
            ru: {
                // 系统标题
                system_title: 'Система управления движением на строительной площадке - Усиленная версия (с оптимизацией маршрута)',
                // 标签页
                tab_vehicle_input: 'Управление транспортными средствами',
                tab_map_settings: 'Настройки карты',
                tab_road_info: 'Информация о дорожной сети',
                tab_monitor: 'Мониторинг в реальном времени',
                tab_vehicle_config: 'Конфигурация ТС',
                tab_travel_time_db: 'База данных времени в пути',
                tab_driver_portal: 'Портал водителей',
                // 车辆调度
                vehicle_info_input: 'Ввод информации о ТС',
                vehicle_id: 'ID транспортного средства',
                vehicle_id_placeholder: 'Оставить пустым для автоматической нумерации',
                vehicle_type: 'Тип транспортного средства',
                vehicle_type_truck: 'Самосвал',
                vehicle_type_material: 'Материальный грузовик',
                vehicle_type_construction: 'Строительная техника',
                vehicle_type_special: 'Специальная техника',
                vehicle_weight: 'Грузоподъемность (тонны)',
                vehicle_width: 'Ширина (метры)',
                start_node: 'Начальная точка',
                target_node: 'Целевая область',
                add_vehicle: 'Добавить ТС',
                current_vehicles: 'Текущие ТС',
                manual_reroute: 'Ручной пересчет маршрута (все)',
                sort_by_efficiency: 'Сортировать по эффективности',
                loading_vehicle_data: 'Загрузка данных о ТС...',
                dispatch_control: 'Управление диспетчеризацией',
                start_dispatch: 'Начать диспетчеризацию',
                reset_system: 'Сбросить систему',
                // 地图设置
                map_settings: 'Настройки карты',
                custom_map: 'Пользовательская карта',
                upload_map_hint: 'Нажмите или перетащите изображение сюда для загрузки',
                upload_map_format: 'Поддерживаются форматы JPG, PNG, рекомендуемый размер 800x600 и более',
                remove_map_background: 'Удалить пользовательскую карту',
                map_background_hint: 'Подсказка: заменяет только фоновое изображение, не изменяет узлы дорожной сети.',
                import_dxf: 'Импорт дорожной сети DXF',
                dxf_upload_hint: 'Нажмите или перетащите файл DXF сюда для импорта',
                dxf_requirements: 'Требование: слой центральной линии дороги должен называться "道路中心线" или тип линии JIS_08_50',
                import_dxf_btn: 'Импортировать дорожную сеть DXF',
                dxf_to_json_btn: 'DXF в JSON и скачать',
                dxf_warning: 'Импорт перезапишет существующие узлы и дороги, пожалуйста, создайте резервную копию данных заранее.',
                json_map_management: 'Управление дорожной сетью JSON',
                json_upload_hint: 'Нажмите или перетащите файл JSON сюда для импорта',
                json_format_hint: 'Поддерживается формат JSON дорожной сети, экспортированный системой.',
                import_json_btn: 'Импортировать дорожную сеть JSON',
                export_json_btn: 'Экспортировать текущую дорожную сеть в JSON',
                json_hint: 'Подсказка: можно экспортировать текущую дорожную сеть в JSON для резервного копирования или обмена.',
                map_drag_control: 'Управление перемещением карты',
                toggle_map_drag: 'Перемещение карты: выключено',
                map_drag_hint: 'Подсказка: после включения можно перемещать всю карту (включая узлы, дороги и все элементы)',
                map_zoom_control: 'Управление масштабом карты',
                zoom_in: 'Увеличить (+)',
                zoom_out: 'Уменьшить (-)',
                zoom_reset: 'Сбросить',
                current_zoom: 'Текущий масштаб:',
                node_management: 'Управление узлами',
                show_hidden_nodes: 'Показать скрытые узлы (выделить)',
                show_hidden_nodes_hint: 'После включения все скрытые узлы будут отображаться на карте особым стилем для удобства изменения их статуса отображения',
                show_branch_nodes: 'Показать узлы ответвлений (JIS_08_50)',
                show_branch_nodes_hint: 'После включения будут отображаться узлы пересечения ответвлений (дороги с типом линии JIS_08_50)',
                node_type: 'Тип узла',
                node_type_entrance: 'Вход',
                node_type_crossroad: 'Перекресток',
                node_type_work_area: 'Рабочая зона',
                node_type_start: 'Внешняя начальная точка',
                node_name: 'Название узла',
                node_name_placeholder: 'Например: Вход 1',
                add_node: 'Добавить узел',
                sync_positions: 'Синхронизировать позиции узлов с сервером',
                clear_nodes: 'Удалить все узлы',
                gps_management: 'Управление GPS-координатами',
                export_gps: '📥 Экспорт GPS-координат (XLSX)',
                import_gps: '📤 Импорт GPS-координат (XLSX)',
                gps_instructions: 'Инструкция по использованию:',
                gps_export_hint: 'Экспорт: экспортировать GPS-координаты всех узлов в файл Excel',
                gps_import_hint: 'Импорт: импортировать GPS-координаты из файла Excel пакетно',
                gps_format_hint: 'Формат: ID узла, название, широта, долгота',
                map_text_boxes: 'Текстовые поля карты',
                text_box_instructions: 'Инструкция по использованию:',
                text_box_1: '1. После включения режима редактирования дважды щелкните узел для редактирования названия узла',
                text_box_2: '2. Дважды щелкните дорогу для редактирования названия дороги',
                text_box_3: '3. Нажмите на пустое место карты для добавления текстового поля',
                text_box_4: '4. Дважды щелкните текстовое поле для редактирования формата, перетащите для перемещения',
                road_management: 'Управление дорогами',
                road_length: 'Длина дороги (метры)',
                road_direction: 'Направление дороги',
                road_direction_two_way: 'Двустороннее движение',
                road_direction_north: 'Одностороннее на север',
                road_direction_south: 'Одностороннее на юг',
                road_direction_east: 'Одностороннее на восток',
                road_direction_west: 'Одностороннее на запад',
                road_direction_northeast: 'Одностороннее на северо-восток',
                road_direction_northwest: 'Одностороннее на северо-запад',
                road_direction_southeast: 'Одностороннее на юго-восток',
                road_direction_southwest: 'Одностороннее на юго-запад',
                add_road: 'Добавить дорогу',
                clear_roads: 'Удалить все дороги',
                // 路网信息
                road_info: 'Информация о дорожной сети',
                road_overview: 'Обзор дорожной сети',
                loading_road_data: 'Загрузка данных дорожной сети...',
                node_congestion_control: 'Управление перегрузкой узлов',
                select_node: 'Выбрать узел',
                select_node_placeholder: 'Пожалуйста, выберите узел',
                set_normal: 'Нормально',
                set_light_congestion: 'Легкая перегрузка',
                set_medium_congestion: 'Средняя перегрузка',
                set_severe_congestion: 'Сильная перегрузка',
                node_congestion_hint: 'Подсказка: перегрузка узла влияет на все дороги, связанные с этим узлом, чем выше уровень перегрузки, тем больше влияние',
                road_status_control: 'Управление статусом дорог',
                select_road: 'Выбрать дорогу',
                select_road_placeholder: 'Пожалуйста, выберите дорогу',
                set_congested: 'Перегружена',
                set_construction: 'Дорожные работы',
                set_closed: 'Закрыта',
                road_status_hint: 'Подсказка:',
                road_status_normal: 'Нормально: дорога доступна для нормального движения',
                road_status_congested: 'Перегружена: дорога доступна, но перегружена, транспортные средства попытаются объехать',
                road_status_construction: 'Дорожные работы: дорога доступна, но сильно перегружена, движение медленное',
                road_status_closed: 'Закрыта: дорога недоступна для движения, транспортные средства должны объехать',
                custom_congestion_control_old: 'Пользовательское управление перегрузкой (старая версия)',
                set_congested_old: 'Установить перегруженной',
                old_congestion_hint: 'Подсказка: эта функция обновлена до "Управление статусом дорог", рекомендуется использовать новую версию',
                road_direction_control: 'Управление направлением дорог',
                direction_control_hint: '💡 Подсказка: теперь можно напрямую щелкнуть дорогу на карте для настройки направления и статуса, не нужно выбирать здесь.',
                old_direction_settings: 'Старые настройки направления (устарело, нажмите для развертывания)',
                road_direction_hint: 'Подсказка: односторонние дороги разрешают движение только в указанном направлении',
                road_info_list: 'Информация о дорогах',
                loading_road_list: 'Загрузка данных о дорогах...',
                // 实时监控
                real_time_monitoring: 'Мониторинг в реальном времени',
                ws_status_polling: '🔴 Режим опроса',
                ws_status_connected: '🟢 WebSocket подключен',
                loading_monitor_data: 'Загрузка данных мониторинга...',
                data_visualization: 'Визуализация данных',
                efficiency_trend: 'Тренд эффективности',
                vehicle_type_distribution: 'Распределение типов ТС',
                road_congestion_top10: 'Перегрузка дорог (Топ 10)',
                dispatch_results: 'Результаты диспетчеризации',
                no_dispatch_results: 'Нет результатов диспетчеризации',
                arrival_statistics: 'Статистика прибытия',
                no_arrival_data: 'Нет данных о прибытии',
                route_statistics: 'Статистика маршрутов',
                no_route_statistics: 'Нет статистики маршрутов',
                latest_arrival_records: 'Последние записи о прибытии',
                no_arrival_records: 'Нет записей о прибытии',
                // 车辆配置
                vehicle_type_config: 'Конфигурация типов ТС',
                loading_vehicle_types: 'Загрузка конфигурации типов ТС...',
                add_new_vehicle_type: 'Добавить новый тип ТС',
                new_vehicle_type_name: 'Название типа ТС',
                new_vehicle_type_placeholder: 'Например: Пожарная машина',
                new_speed_kmph: 'Скорость (км/ч)',
                speed_range_hint: 'Рекомендуемый диапазон 5-80 км/ч, настройте в соответствии с типом ТС',
                can_use_one_way: 'Можно использовать односторонние дороги',
                can_use_two_way: 'Можно использовать двусторонние дороги',
                yes: 'Да',
                no: 'Нет',
                // 行驶时间数据库
                travel_time_database: 'База данных времени в пути',
                refresh: 'Обновить',
                export_json: 'Экспорт JSON',
                export_excel: 'Экспорт Excel',
                import_json_excel: 'Импорт JSON/Excel',
                save_to_file: 'Сохранить в файл',
                import_mode_append: 'Добавить при импорте',
                import_mode_replace: 'Заменить при импорте',
                clear_data: 'Очистить данные',
                import_export_hint: 'Поддерживается импорт/экспорт файлов JSON и Excel (.xlsx) для анализа данных времени в пути',
                clear_db_dialog_title: 'Очистить базу данных времени в пути',
                clear_all_data: 'Очистить все данные',
                clear_by_filter: 'Очистить по условию',
                clear_before_date: 'Очистить записи до этой даты',
                clear_after_date: 'Очистить записи после этой даты',
                clear_by_driver: 'Очистить записи указанного водителя (ID водителя)',
                clear_by_driver_placeholder: 'Оставить пустым, если без ограничений',
                clear_by_vehicle_type: 'Очистить записи указанного типа ТС',
                all_types: 'Все',
                confirm_clear: 'Подтвердить очистку',
                cancel: 'Отмена',
                no_data: 'Нет данных',
                driver_column: 'Водитель',
                vehicle_type_column: 'Тип ТС',
                route_column: 'Начало → Конец',
                time_column: 'Время (минуты)',
                distance_column: 'Расстояние',
                avg_speed_column: 'Средняя скорость',
                speed_setting_column: 'Установленная скорость',
                departure_time_column: 'Время отправления',
                arrival_time_column: 'Время прибытия',
                route_nodes_column: 'Количество узлов маршрута',
                // DQN
                dqn_path_optimization: 'Оптимизация маршрута с глубоким обучением (DQN) Пожалуйста, используйте формат JSON для импорта',
                dqn_status: 'Статус:',
                dqn_status_not_checked: 'Еще не проверено',
                dqn_status_hint: 'Сначала необходимо обучить модель, прежде чем вызывать маршрут с глубоким обучением.',
                refresh_status: 'Обновить статус',
                training_params: 'Параметры обучения',
                training_epochs: 'Количество эпох обучения',
                batch_size: 'Размер пакета',
                discount_factor: 'Коэффициент скидки (0-1)',
                start_training: 'Начать обучение',
                training_not_started: 'Обучение не начато',
                dqn_route_planning: 'Планирование маршрута DQN',
                start_node: 'Начальный узел',
                target_node: 'Целевой узел',
                exploration_rate: 'Параметр исследования ε (0-1)',
                use_dqn_plan: 'Использовать планирование DQN',
                not_called: 'Еще не вызвано',
                // 司机入口
                driver_portal: 'Портал водителей',
                qrcode_generation: 'Генерация QR-кода',
                getting_server_info: 'Получение информации о сервере...',
                driver_interface_url: 'Адрес интерфейса водителя',
                copy: 'Копировать',
                manual_url_input: 'Или введите полный адрес вручную (если нужно настроить)',
                manual_url_placeholder: 'Например: https://example.com/driver или http://192.168.1.100:5000/driver',
                update_url: 'Обновить адрес',
                generate_qrcode: 'Сгенерировать QR-код',
                qrcode_hint: 'Водитель может отсканировать этот QR-код на телефоне для входа в интерфейс планирования маршрута',
                driver_management: 'Управление водителями',
                registered_drivers: 'Зарегистрированные водители:',
                drivers_count: 'человек',
                driver_management_hint: '💡 Подсказка: водители могут планировать маршруты через интерфейс водителя и отправлять их как фактические транспортные средства, отправленные ТС будут отображаться на вкладке "Управление транспортными средствами"',
                registered_drivers_list: 'Список зарегистрированных водителей',
                loading_drivers: 'Загрузка...',
                driver_id: 'ID водителя',
                driver_id_placeholder: 'Например: D001',
                driver_name: 'Имя',
                driver_name_placeholder: 'Имя водителя',
                license_plate: 'Номерной знак',
                license_plate_placeholder: 'Введите номерной знак',
                driver_contact: 'Контактная информация',
                driver_contact_placeholder: 'Номер телефона или другой способ связи',
                register_update_driver: 'Зарегистрировать / Обновить информацию о водителе',
                driver_details: 'Подробная информация о водителе',
                close: 'Закрыть',
                route_prediction: 'Прогнозирование маршрута',
                calculate_recommended_route: 'Рассчитать рекомендуемый маршрут',
                route_planning_not_done: 'Планирование маршрута еще не выполнено',
                history: 'История',
                no_history: 'Истории пока нет',
                drag_resizer_title: 'Перетащите для изменения ширины',
                map_controls_title: 'Нажмите кнопку для использования функции',
                // 地图控制
                map_controls: 'Панель управления',
                edit_mode_off: 'Режим редактирования: выключен',
                edit_mode_on: 'Режим редактирования: включен',
                labels_all: 'Метки: показать все',
                labels_edges_only: 'Метки: только дороги',
                labels_nodes_only: 'Метки: только узлы',
                labels_hidden: 'Метки: скрыть',
                gps_icons_show: 'Иконки GPS: показать',
                gps_icons_hide: 'Иконки GPS: скрыть',
                map_rotation: 'Поворот карты',
                degrees: '°',
                apply: 'Применить',
                reset: 'Сбросить',
                construction_site_map: 'Карта дорожной сети строительной площадки',
                legend: 'Легенда',
                legend_end_point: 'Конечная точка',
                legend_crossroad: 'Перекресток',
                legend_work_area: 'Рабочая зона',
                legend_external_start: 'Внешняя начальная точка',
                legend_truck: 'Самосвал',
                legend_material: 'Материальный грузовик',
                legend_construction: 'Строительная техника',
                legend_special: 'Специальная техника',
                legend_one_way: 'Односторонняя дорога',
                legend_congested_road: 'Перегруженная дорога',
                legend_construction_road: 'Дорожные работы',
                legend_closed_road: 'Закрытая дорога',
                legend_light_congestion: 'Узел с легкой перегрузкой',
                legend_medium_congestion: 'Узел со средней перегрузкой',
                legend_severe_congestion: 'Узел с сильной перегрузкой',
                // 通用
                no_nodes: 'Нет узлов, пожалуйста, добавьте узлы',
                no_text_boxes: 'Нет текстовых полей',
                end_node: 'Конечная точка',
                // 节点状态菜单
                node_status_menu_title: 'Статус узла',
                current_status: 'Текущий статус:',
                set_direction: 'Установить направление:',
                set_status: 'Установить статус:',
                visibility_settings: 'Настройки отображения:',
                show_node: 'Показать узел',
                hide_node: 'Показать',
                hide: 'Скрыть',
                show: 'Показать',
                // 道路状态菜单
                road_status_menu_title: 'Дорога',
                current_direction: 'Текущее направление:',
                direction_two_way: 'Двустороннее',
                direction_reverse: 'Обратное',
                direction_north: 'Северное',
                direction_south: 'Южное',
                direction_east: 'Восточное',
                direction_west: 'Западное',
                direction_northeast: 'Северо-восточное',
                direction_northwest: 'Северо-западное',
                direction_southeast: 'Юго-восточное',
                direction_southwest: 'Юго-западное',
                // GPS对话框
                gps_calibration: 'Калибровка GPS координат',
                node_info: 'Информация об узле:',
                name_label: 'Название:',
                id_label: 'ID:',
                type_label: 'Тип:',
                unknown: 'Неизвестно',
                current_gps_coords: 'Текущие GPS координаты:',
                latitude: 'Широта',
                longitude: 'Долгота',
                decimal_format: 'Десятичный формат',
                gps_not_set: 'GPS координаты не установлены',
                gps_not_set_hint: 'Пожалуйста, установите GPS координаты для узла, чтобы включить функцию локации',
                latitude_label: 'Широта (Latitude)',
                longitude_label: 'Долгота (Longitude)',
                degrees: 'Градусы',
                minutes: 'Минуты',
                seconds: 'Секунды',
                format_example: 'Формат: градусы°минуты\'секунды"направление (например: 59°37\'28.0"N) или введите полный формат: 59°36\'23.0"N 28°16\'06.8"E',
                quick_input_hint: 'Быстрый ввод: 59°36\'23.0"N или 59 36 23.0 N',
                quick_input_hint_full: 'Быстрый ввод: 28°16\'06.8"E или полный: 59°36\'23.0"N 28°16\'06.8"E',
                quick_input_tip: 'Подсказка: введите полные координаты в поле быстрого ввода, система автоматически распарсит и заполнит поля выше',
                quick_input_tip_blur: 'Подсказка: после ввода координат в поле быстрого ввода, нажмите в другом месте, система автоматически распарсит и заполнит поля выше',
                get_current_location: 'Получить текущее местоположение',
                save: 'Сохранить',
                cancel: 'Отмена',
                node_not_exists: 'Узел не существует',
                // 浏览器安全限制对话框
                browser_security_restriction: 'Ограничение безопасности браузера',
                current_access: 'Текущий способ доступа：',
                browser_security_msg: 'Современные браузеры (Chrome/Edge и др.) из соображений безопасности не разрешают использовать функцию локации на HTTP-протоколе с IP-адресом локальной сети. Даже если служба определения местоположения системы включена, браузер откажет в запросе разрешения на локацию.',
                solutions: 'Решения:',
                solution1_title: 'Решение 1: Настройка HTTPS (рекомендуется)',
                solution1_desc: '1. Установите SSL-сертификат (можно использовать самоподписанный сертификат для локальной сети)\n2. Измените приложение Flask для включения HTTPS\n3. Используйте https://[hostname]:5000 для доступа',
                solution2_title: 'Решение 2: Использование localhost (только на этом компьютере)',
                solution2_desc: '1. На этом компьютере используйте http://localhost:5000 для доступа\n2. localhost позволяет использовать HTTP-протокол для локации\n3. Внимание: другие устройства в локальной сети не смогут получить доступ',
                solution3_title: 'Решение 3: Ручной ввод GPS координат (доступно сейчас)',
                solution3_desc: '1. Используйте телефон или другое устройство для получения GPS координат\n2. Введите координаты в поле "Быстрый ввод" ниже\n3. Формат：59°36\'23.0"N 28°16\'06.8"E\n4. Система автоматически распарсит и заполнит',
                solution4_title: 'Решение 4: Использование другого браузера (временное решение)',
                solution4_desc: 'Некоторые браузеры (например, Firefox) могут иметь более мягкие ограничения для HTTP+IP локальной сети, можно попробовать использовать браузер Firefox.',
                got_it: 'Понятно, использую ручной ввод',
                // 错误提示
                error_occurred: 'Произошла ошибка',
                set_gps_error: 'Не удалось установить GPS координаты',
                gps_set_success: 'GPS координаты сохранены',
                set_node_status_error: 'Не удалось установить статус узла',
                set_node_status_success: 'Статус узла обновлен',
                set_edge_status_error: 'Не удалось установить статус дороги',
                set_edge_status_success: 'Статус дороги обновлен',
                set_edge_direction_error: 'Не удалось установить направление дороги',
                set_edge_direction_success: 'Направление дороги обновлено',
                update_node_error: 'Не удалось обновить узел',
                update_node_success: 'Название и формат узла обновлены',
                click_gps_set: 'Нажмите для установки GPS координат',
                // 道路名称
                road_label: 'Дорога:',
                road_direction: 'Направление дороги',
                // 定位相关
                getting_location: 'Определение местоположения...',
                location_failed: 'Не удалось определить местоположение',
                location_permission_denied: 'Разрешение на локацию отклонено',
                location_permission_denied_detail: 'Браузер отклонил запрос разрешения на локацию',
                location_unavailable: 'Информация о местоположении недоступна',
                location_unavailable_detail: 'Не удалось получить текущую информацию о местоположении',
                location_timeout: 'Тайм-аут локации',
                location_timeout_detail: 'Запрос локации превысил время ожидания, попробуйте снова',
                location_error_detail: 'Неизвестная ошибка',
                got_it_short: 'Понятно',
                // GPS输入验证
                gps_input_incomplete: 'Пожалуйста, введите полные GPS координаты (градусы, минуты, секунды)',
                gps_lat_format_error: 'Ошибка формата широты: градусы(0-90), минуты(0-59), секунды(0-59.9)',
                gps_lon_format_error: 'Ошибка формата долготы: градусы(0-180), минуты(0-59), секунды(0-59.9)',
                gps_lat_range_error: 'Широта вне диапазона (-90 до 90)',
                gps_lon_range_error: 'Долгота вне диапазона (-180 до 180)',
                save_failed: 'Не удалось сохранить',
                unknown_error: 'Неизвестная ошибка',
                // 定位错误帮助信息
                location_unavailable_help: 'Возможные причины：\n1. Слабый сигнал GPS или устройство не подключено к GPS\n2. Служба определения местоположения устройства отключена\n3. Служба сетевого определения местоположения недоступна\n\nРешения：\n- Проверьте, включена ли служба определения местоположения устройства\n- Попробуйте на улице или в месте с хорошим сигналом\n- Проверьте сетевое подключение',
                location_timeout_help: 'Решения：\n1. Проверьте сетевое подключение\n2. Убедитесь, что сигнал GPS хороший\n3. Попробуйте позже',
                location_error_help: 'Пожалуйста, проверьте, поддерживает ли браузер функцию определения местоположения, или попробуйте обновить страницу',
                // 编辑节点/道路名称
                edit_node_name: 'Редактировать название узла',
                edit_edge_name: 'Редактировать название дороги',
                node_name_label: 'Название узла:',
                edge_name_label: 'Название дороги:',
                font_size: 'Размер шрифта:',
                font_family: 'Шрифт:',
                font_weight: 'Толщина шрифта:',
                font_weight_normal: 'Обычный',
                font_weight_bold: 'Жирный',
                padding: 'Внутренние отступы:',
                label_text: 'Текстовое содержимое:',
                label_color: 'Цвет текста:',
                label_bg_color: 'Цвет фона:',
                label_border_color: 'Цвет границы:',
                opacity: 'Прозрачность:',
                rotation_angle: 'Угол поворота:',
                text_box_updated: 'Текстовое поле обновлено',
                text_box_update_failed: 'Не удалось обновить текстовое поле',
                text_box_update_error: 'Произошла ошибка при обновлении текстового поля',
                text_box_deleted: 'Текстовое поле удалено',
                text_box_delete_failed: 'Не удалось удалить текстовое поле',
                text_box_delete_error: 'Произошла ошибка при удалении текстового поля',
                confirm_delete_text_box: 'Вы уверены, что хотите удалить это текстовое поле?',
                node_name_input_label: 'Название узла:',
                update_node_success: 'Название и формат узла обновлены',
                update_node_error: 'Не удалось обновить узел',
                update_node_error_msg: 'Произошла ошибка при обновлении узла',
                // 道路编辑
                edge_name_label: 'Название дороги:',
                border_width: 'Ширина границы:',
                update_edge_success: 'Название и формат дороги обновлены',
                update_edge_error: 'Не удалось обновить дорогу',
                update_edge_error_msg: 'Произошла ошибка при обновлении дороги',
                edge_name_updated: 'Название дороги обновлено',
                // 文字框
                enter_text_content: 'Пожалуйста, введите текстовое содержимое:',
                position_label: 'Позиция:',
                edit_text_box: 'Редактировать',
                delete_text_box: 'Удалить',
                text_box_added: 'Текстовое поле успешно добавлено',
                text_box_add_failed: 'Не удалось добавить текстовое поле',
                text_box_add_error: 'Произошла ошибка при добавлении текстового поля',
                edit_text_box_title: 'Редактировать текстовое поле',
                // 提示信息
                please_enter_driver_id: 'Пожалуйста, введите ID водителя',
                please_register_driver: 'Пожалуйста, сначала введите ID водителя и завершите регистрацию',
                please_select_start_node: 'Пожалуйста, выберите начальный узел',
                please_select_target_node: 'Пожалуйста, выберите целевой узел',
                start_target_same: 'Начальный и целевой узлы не могут быть одинаковыми',
                confirm_delete_node: 'Вы уверены, что хотите удалить этот узел? Все дороги, подключенные к этому узлу, также будут удалены.',
                confirm_reset_system: 'Вы уверены, что хотите сбросить систему? Эта операция удалит все данные о транспортных средствах и диспетчеризации.',
                please_upload_image: 'Пожалуйста, загрузите файл изображения',
                map_file_read_failed: 'Не удалось прочитать файл карты',
                confirm_clear_map: 'Вы уверены, что хотите удалить пользовательскую карту?',
                please_enter_node_name: 'Пожалуйста, введите название узла',
                map_not_loaded: 'Карта не загружена, невозможно добавить узел',
                confirm_clear_nodes: 'Вы уверены, что хотите удалить все узлы? Эта операция не может быть отменена.',
                please_select_start_end: 'Пожалуйста, выберите начальный и конечный узлы',
                // 车辆信息
                vehicle_start: 'Начало:',
                vehicle_target: 'Цель:',
                vehicle_driver: 'Водитель:',
                vehicle_path: 'Путь:',
                vehicle_edges: 'дорог',
                vehicle_arrival_time: 'Время прибытия:',
                success_render_vehicles: 'Успешно отрисовано {count} транспортных средств на карте'
            }
        };

        // 获取翻译文本的辅助函数
        function t(key, defaultValue = '') {
            const texts = i18n[currentLang];
            return texts && texts[key] ? texts[key] : (i18n['zh'][key] || defaultValue || key);
        }

        // 语言切换函数
        function loadLanguage(lang) {
            currentLang = lang;
            const texts = i18n[lang];
            if (!texts) {
                console.warn('Language not found:', lang);
                return;
            }

            // 更新所有带有 data-i18n 属性的元素
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (texts[key]) {
                    element.textContent = texts[key];
                }
            });

            // 更新所有带有 data-i18n-placeholder 属性的输入框
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (texts[key]) {
                    element.placeholder = texts[key];
                }
            });

            // 更新所有带有 data-i18n-title 属性的元素的 title 属性
            document.querySelectorAll('[data-i18n-title]').forEach(element => {
                const key = element.getAttribute('data-i18n-title');
                if (texts[key]) {
                    element.title = texts[key];
                }
            });

            // 更新所有带有 data-i18n 属性的 option 元素
            document.querySelectorAll('option[data-i18n]').forEach(option => {
                const key = option.getAttribute('data-i18n');
                if (texts[key]) {
                    option.textContent = texts[key];
                }
            });

            // 更新语言切换按钮的激活状态
            document.querySelectorAll('.lang-btn').forEach(btn => {
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // 更新 HTML lang 属性
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'ru';

            // 保存语言偏好到 localStorage
            localStorage.setItem('preferred_language', lang);

            // 更新动态按钮状态（编辑模式、标签、GPS图标等）
            updateDynamicButtonTexts();
        }

        // 更新动态按钮文本的函数
        function updateDynamicButtonTexts() {
            // 更新编辑模式按钮
            const toggleEditModeBtn = document.getElementById('toggle-edit-mode');
            if (toggleEditModeBtn && typeof editMode !== 'undefined') {
                toggleEditModeBtn.textContent = editMode ? t('edit_mode_on') : t('edit_mode_off');
            }

            // 更新标签按钮
            const toggleLabelsBtn = document.getElementById('toggle-labels');
            if (toggleLabelsBtn && typeof labelMode !== 'undefined') {
                const labelTexts = {
                    'all': t('labels_all'),
                    'edges-only': t('labels_edges_only'),
                    'nodes-only': t('labels_nodes_only'),
                    'hidden': t('labels_hidden')
                };
                toggleLabelsBtn.textContent = labelTexts[labelMode] || t('labels_all');
            }

            // 更新GPS图标按钮
            const toggleGpsIconsBtn = document.getElementById('toggle-gps-icons');
            if (toggleGpsIconsBtn && typeof window.showGpsIcons !== 'undefined') {
                toggleGpsIconsBtn.textContent = window.showGpsIcons ? t('gps_icons_show') : t('gps_icons_hide');
            }
        }

        // 初始化语言（从 localStorage 读取或使用默认值）
        function initLanguage() {
            const savedLang = localStorage.getItem('preferred_language') || 'zh';
            loadLanguage(savedLang);
        }

        // 绑定语言切换按钮事件
        function initLanguageSwitcher() {
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    loadLanguage(lang);
                });
            });
        }

// ========== 全局错误处理 ==========
        // 捕获并忽略浏览器扩展相关的错误（这些错误不影响应用功能）
        window.addEventListener('unhandledrejection', function(event) {
            const error = event.reason;
            const errorMessage = error?.message || String(error);
            
            // 忽略浏览器扩展相关的错误
            if (errorMessage.includes('message channel closed') || 
                errorMessage.includes('listener indicated an asynchronous response') ||
                errorMessage.includes('Extension context invalidated')) {
                event.preventDefault(); // 阻止错误在控制台显示
                return;
            }
            
            // 其他错误正常处理
            console.error('未处理的Promise拒绝:', error);
        });
        
        // 捕获全局错误（可选，用于调试）
        window.addEventListener('error', function(event) {
            const errorMessage = event.message || '';
            
            // 忽略浏览器扩展相关的错误
            if (errorMessage.includes('message channel closed') || 
                errorMessage.includes('listener indicated an asynchronous response') ||
                errorMessage.includes('Extension context invalidated')) {
                event.preventDefault();
                return;
            }
        });
        
        // ========== UI 增强功能 ==========
        
        // Toast 通知系统
        function showToast(message, type = 'info', duration = 3000) {
            const container = document.getElementById('toast-container');
            if (!container) return;
            
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ'
            };
            
            toast.innerHTML = `
                <span class="toast-icon">${icons[type] || icons.info}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.remove()">×</button>
            `;
            
            container.appendChild(toast);
            
            // 自动移除
            setTimeout(() => {
                toast.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (toast.parentElement) {
                        toast.remove();
                    }
                }, 300);
            }, duration);
        }
        
        // 按钮加载状态管理
        function setButtonLoading(button, loading = true) {
            if (typeof button === 'string') {
                button = document.getElementById(button);
            }
            if (!button) return;
            
            if (loading) {
                button.classList.add('loading');
                button.disabled = true;
                button.dataset.originalText = button.textContent;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
                if (button.dataset.originalText) {
                    button.textContent = button.dataset.originalText;
                }
            }
        }
        
        // 增强的按钮点击处理（带加载状态和Toast反馈）
        function enhanceButton(buttonId, handler, options = {}) {
            const button = document.getElementById(buttonId);
            if (!button) return;
            
            const {
                successMessage = null,
                errorMessage = '操作失败，请重试',
                loadingMessage = '处理中...',
                showLoading = true
            } = options;
            
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                if (showLoading) {
                    setButtonLoading(button, true);
                    if (loadingMessage) {
                        button.textContent = loadingMessage;
                    }
                }
                
                try {
                    const result = await handler(e);
                    if (successMessage) {
                        showToast(successMessage, 'success');
                    }
                    return result;
                } catch (error) {
                    console.error('Button handler error:', error);
                    showToast(errorMessage || error.message || '操作失败', 'error');
                    throw error;
                } finally {
                    if (showLoading) {
                        setButtonLoading(button, false);
                    }
                }
            });
        }
        
        // 表单验证增强
        function validateForm(formElement) {
            const inputs = formElement.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#2ecc71';
                }
            });
            
            return isValid;
        }
        
        // 全局变量
        let nodes = [];
        let edges = [];
        let vehicles = [];
        let mapTextLabels = [];  // 地图文字框列表
        let vehicleCounter = 1;
        let monitorData = {};
        let showHiddenNodes = false; // 是否显示隐藏的节点（用于管理）
        let showBranchNodes = false; // 是否显示支路节点（JIS_08_50）
        let labelMode = 'all'; // 标签显示模式：'all', 'edges-only', 'nodes-only', 'hidden'
        
        // 判断节点是否应该显示（只显示主路与主路或主路与支路相交的节点）
        function shouldShowNode(node) {
            // 如果启用了"显示隐藏节点"模式，隐藏的节点也会返回 true（用于高亮显示）
            if (showHiddenNodes && node.hasOwnProperty('is_visible') && node.is_visible === false) {
                return true; // 在显示隐藏节点模式下，隐藏的节点也会显示（用于高亮）
            }
            
            // 优先检查自定义显示状态（如果设置了 is_visible，则直接使用）
            if (node.hasOwnProperty('is_visible')) {
                return node.is_visible !== false; // false 表示隐藏，其他都表示显示
            }
            
            // 如果没有edges数据，显示所有节点（向后兼容）
            if (!edges || edges.length === 0) {
                return true;
            }
            
            // 查找与该节点连接的所有道路
            const connectedEdges = edges.filter(edge => 
                edge.start_node === node.id || edge.end_node === node.id
            );
            
            // 如果节点没有连接任何道路，默认显示（可能是特殊节点，如入口）
            if (connectedEdges.length === 0) {
                return true;
            }
            
            // 检查是否所有连接的道路都有road_type字段
            // 如果没有road_type字段，说明可能是旧数据或手动创建的，默认显示所有节点
            const allEdgesHaveRoadType = connectedEdges.every(edge => edge.hasOwnProperty('road_type'));
            if (!allEdgesHaveRoadType) {
                // 向后兼容：如果部分道路没有road_type，显示所有节点
                return true;
            }
            
            // 检查是否至少有一条主路（road_type === 'main'）
            const hasMainRoad = connectedEdges.some(edge => edge.road_type === 'main');
            
            // 如果启用了"显示支路节点"选项，显示所有节点（包括只连接支路的节点）
            if (showBranchNodes) {
                return true;
            }
            
            // 只显示连接了主路的节点（主路与主路或主路与支路相交）
            // 不显示只连接支路的节点（支路与支路相交）
            return hasMainRoad;
        }
        let travelTimeRecords = [];
        let editMode = false;
        let mapBackground = null;
        let vehicleTypes = {};
        let directionTypes = {};
        let drivers = {};
        let driverRoutes = {};
        let activeDriverId = null;
        let mapRotation = 0; // 当前地图旋转角度（全局变量）
        
        // 应用地图旋转（全局函数）
        // 只旋转地图内容（#map），不旋转背景（.map-wrapper）
        // 以坐标(0,0)为旋转中心
        function applyMapRotation(rotation) {
            // 更新全局旋转角度（必须在调用 updateMapTransform 之前更新）
            mapRotation = rotation;
            
            // 同时更新 window.mapZoomState.rotation（如果存在）
            if (typeof window !== 'undefined' && window.mapZoomState) {
                window.mapZoomState.rotation = rotation;
            }
            
            const map = document.getElementById('map');
            if (!map) return;
            
            // 如果有缩放和平移状态，通过 updateMapTransform 来组合所有变换
            if (typeof window !== 'undefined' && window.mapZoomState && window.mapZoomState.update) {
                // 确保 mapRotation 已更新后再调用 updateMapTransform
                window.mapZoomState.update();
            } else {
                // 如果没有缩放和平移，只应用旋转
                map.style.transform = `rotate(${rotation}deg)`;
                map.style.transformOrigin = '0 0'; // 以(0,0)为旋转中心
            }
            
            // 生产环境移除调试日志以提升性能
            // console.log('应用地图旋转:', rotation, '当前 mapRotation:', mapRotation);
        }
        
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
                // 如果是 file:// 协议或无效的 origin，使用 localhost
                if (origin === 'null' || origin.startsWith('file://') || !origin) {
                    return 'http://localhost:5000/api';
                }
                // 如果 origin 是局域网IP但可能无法访问，尝试使用 localhost
                // 注意：这里保持使用 origin，让用户可以通过配置覆盖
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

        function updateMapUploadMessage(html) {
            const messageEl = document.getElementById('map-upload-message');
            if (messageEl) {
                messageEl.innerHTML = html.trim();
            }
        }

        function resetMapFileInput() {
            const inputEl = document.getElementById('map-file-input');
            if (inputEl) {
                inputEl.value = '';
            }
        }

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
                
                // 使用 AbortController 替代 AbortSignal.timeout（更好的兼容性）
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);
                
                try {
                    const response = await fetch(`${apiBase}/health`, {
                        method: 'GET',
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (response.ok) {
                        const health = await response.json();
                        connectionStatus.healthStatus = health.status || 'healthy';
                        connectionStatus.consecutiveFailures = 0;
                        connectionStatus.lastCheck = Date.now();
                    } else {
                        connectionStatus.healthStatus = 'unhealthy';
                        connectionStatus.consecutiveFailures++;
                    }
                } catch (fetchError) {
                    clearTimeout(timeoutId);
                    // 静默处理健康检查错误，不输出到控制台
                    connectionStatus.healthStatus = 'unreachable';
                    connectionStatus.consecutiveFailures++;
                }
            } catch (error) {
                // 静默处理所有错误，健康检查失败不应该影响主功能
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
                        // 尝试读取错误响应体
                        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                        try {
                            const errorData = await response.clone().json();
                            if (errorData && errorData.message) {
                                errorMessage = errorData.message;
                            }
                        } catch (e) {
                            // 如果无法解析JSON，使用默认错误消息
                        }
                        
                        // 429 限流错误，等待后重试
                        if (response.status === 429 && attempt < maxRetries) {
                            const retryAfter = response.headers.get('Retry-After');
                            // 对于429错误，使用更长的延迟时间（指数退避）
                            const delay = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay * Math.pow(2, attempt + 1);
                            logWarn(`请求过于频繁 (${endpoint})，${delay}ms后重试 (尝试 ${attempt + 1}/${maxRetries})`);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue;
                        }
                        
                        // 429错误且没有重试机会，抛出包含详细消息的错误
                        const error = new Error(errorMessage);
                        error.status = response.status;
                        throw error;
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
                        try {
                            await fetchVehicles();
                        } catch (err) {
                            // 静默处理错误，避免未捕获的Promise
                            console.debug('定时刷新车辆列表失败:', err);
                        }
                        try {
                            await fetchMonitorData();
                        } catch (err) {
                            // 静默处理错误，避免未捕获的Promise
                            console.debug('定时刷新监控数据失败:', err);
                        }
                        try {
                            requestRender();
                        } catch (err) {
                            // 静默处理错误，避免未捕获的Promise
                            console.debug('定时渲染失败:', err);
                        }
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
                            try {
                                await fetchVehicles();
                            } catch (err) {
                                // 静默处理错误，避免未捕获的Promise
                                console.debug('定期刷新车辆列表失败:', err);
                            }
                            try {
                                await fetchMonitorData();
                            } catch (err) {
                                // 静默处理错误，避免未捕获的Promise
                                console.debug('定期刷新监控数据失败:', err);
                            }
                            try {
                                requestRender();
                            } catch (err) {
                                // 静默处理错误，避免未捕获的Promise
                                console.debug('定期渲染失败:', err);
                            }
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
        function showError(message, errorType = ErrorType.UNKNOWN, retryFn = null, details = null) {
            // 同时使用Toast通知
            const toastMessage = details ? `${message}\n${details}` : message;
            showToast(toastMessage, 'error', 5000);
            
            // 限制同时显示的错误数量
            if (errorQueue.length >= errorConfig.maxErrors) {
                const oldestError = errorQueue.shift();
                if (oldestError && oldestError.parentNode) {
                    oldestError.parentNode.removeChild(oldestError);
                }
            }
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            
            // 根据错误类型添加图标和样式
            let icon = '⚠️';
            if (errorType === ErrorType.NETWORK) {
                icon = '🌐';
                errorDiv.style.borderLeft = '4px solid #e74c3c';
            } else if (errorType === ErrorType.VALIDATION) {
                icon = '✏️';
                errorDiv.style.borderLeft = '4px solid #f39c12';
            } else if (errorType === ErrorType.SERVER) {
                icon = '🔧';
                errorDiv.style.borderLeft = '4px solid #e67e22';
            }
            
            errorDiv.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="flex: 1;">
                        <strong>${icon} ${message}</strong>
                        ${details ? `<div style="font-size: 12px; margin-top: 5px; color: #7f8c8d;">${details}</div>` : ''}
                    </div>
                    <div style="display: flex; gap: 5px; margin-left: 10px;">
                        ${retryFn && errorConfig.retryable ? 
                            `<button style="padding: 4px 8px; font-size: 12px; background: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer;" onclick="this.parentElement.parentElement.parentElement.remove(); (${retryFn.toString()})();">重试</button>` : 
                            ''
                        }
                        <button style="padding: 4px 8px; font-size: 12px; background: #95a5a6; color: white; border: none; border-radius: 3px; cursor: pointer;" onclick="this.parentElement.parentElement.parentElement.remove();">关闭</button>
                    </div>
                </div>
            `;
            
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                const tabContainer = document.querySelector('.tab-container');
                if (tabContainer) {
                    sidebar.insertBefore(errorDiv, tabContainer);
                } else {
                    sidebar.insertBefore(errorDiv, sidebar.firstChild);
                }
            }
            
            errorQueue.push(errorDiv);
            
            // 自动移除
            if (errorConfig.autoHide) {
                setTimeout(() => {
                    if (errorDiv.parentNode) {
                        errorDiv.parentNode.removeChild(errorDiv);
                        const index = errorQueue.indexOf(errorDiv);
                        if (index > -1) {
                            errorQueue.splice(index, 1);
                        }
                    }
                }, errorConfig.hideDelay);
            }
            
            // 记录错误日志
            logError(`[${errorType}] ${message}`, details);
        }
        
        // 错误处理包装器
        function handleError(error, context = '') {
            let errorType = ErrorType.UNKNOWN;
            let message = '发生未知错误';
            let details = null;
            
            if (error instanceof TypeError && error.message.includes('fetch')) {
                errorType = ErrorType.NETWORK;
                message = '网络连接失败';
                details = '请检查网络连接或服务器状态';
            } else if (error.response) {
                errorType = ErrorType.SERVER;
                message = `服务器错误 (${error.response.status})`;
                details = error.response.statusText || error.message;
            } else if (error.message) {
                message = error.message;
                details = context ? `上下文: ${context}` : null;
            }
            
            showError(message, errorType, null, details);
            return { errorType, message, details };
        }

        // 显示成功信息
        function showSuccess(message) {
            // 同时使用Toast通知
            showToast(message, 'success', 3000);
            
            const successDiv = document.createElement('div');
            successDiv.className = 'status-card';
            successDiv.style.background = '#d4edda';
            successDiv.style.borderLeftColor = '#28a745';
            successDiv.textContent = message;
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                const tabContainer = document.querySelector('.tab-container');
                if (tabContainer) {
                    sidebar.insertBefore(successDiv, tabContainer);
                } else {
                    sidebar.insertBefore(successDiv, sidebar.firstChild);
                }
            }

            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 3000);
        }

        function formatDistance(distance) {
            const value = Number(distance);
            if (Number.isNaN(value) || value <= 0) {
                return '-';
            }
            if (value >= 1000) {
                return `${(value / 1000).toFixed(2)} km`;
            }
            return `${value.toFixed(0)} m`;
        }

        function formatSpeed(speed) {
            const value = Number(speed);
            if (Number.isNaN(value) || value <= 0) {
                return '-';
            }
            return `${value.toFixed(1)} km/h`;
        }

        function formatDateTime(isoString) {
            if (!isoString || typeof isoString !== 'string') {
                return '-';
            }
            return isoString.replace('T', ' ').replace('Z', '');
        }

        function escapeHtml(value) {
            if (value === undefined || value === null) {
                return '';
            }
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        // 获取车辆列表
        async function fetchVehicles() {
            try {
                const result = await apiCall('/vehicles');
                if (result && result.success) {
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
                    return true;
                } else {
                    // API 返回了数据但 success 为 false
                    const errorMsg = result?.message || '获取车辆列表失败';
                    logWarn('获取车辆列表失败:', errorMsg);
                    return false;
                }
            } catch (error) {
                // 捕获异常（网络错误、解析错误等）
                console.error('fetchVehicles 异常:', error);
                
                // 检查是否是网络连接问题
                if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
                    const apiBase = window.API_BASE || 'http://localhost:5000/api';
                    logError(`无法连接到服务器: ${apiBase}`);
                    logError('请检查：');
                    logError('1. 后端服务是否正在运行（运行 python app.py）');
                    logError('2. 服务器地址是否正确');
                    logError('3. 防火墙是否阻止了连接');
                    showError('无法连接到服务器，请检查后端服务是否运行');
                } else {
                    logError('获取车辆列表失败:', error.message || error);
                    showError('获取车辆列表失败: ' + (error.message || '未知错误'));
                }
                return false;
            }
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

        // 缓存历史记录渲染结果
        let lastTravelDbHash = '';
        let lastTravelDbHtml = '';

        function renderTravelTimeDatabase(records = travelTimeRecords) {
            const summaryEl = document.getElementById('travel-db-summary');
            const tbody = document.getElementById('travel-db-tbody');
            if (!summaryEl || !tbody) {
                return;
            }

            if (!records || records.length === 0) {
                if (summaryEl.innerHTML !== '暂无数据') summaryEl.innerHTML = '暂无数据';
                const emptyRow = '<tr><td colspan="10" style="text-align:center; padding: 12px;">暂无数据</td></tr>';
                if (tbody.innerHTML !== emptyRow) tbody.innerHTML = emptyRow;
                return;
            }

            // 计算是否需要整体重新渲染的历史记录哈希
            const currentHash = records.length + '_' + (records[records.length - 1]?.start_time || '');
            if (currentHash === lastTravelDbHash && lastTravelDbHtml) {
                // 如果数据条数和最后一条更新时间不变，直接跳过全表 DOM 构建，极大节省高频滚动卡顿
                return; 
            }
            lastTravelDbHash = currentHash;

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

            const summaryHtml = `
                <strong>记录总数:</strong> ${totalCount} 条<br>
                <strong>平均耗时:</strong> ${avgDuration ? avgDuration.toFixed(2) + ' 分钟' : '-'}<br>
                <strong>平均速度:</strong> ${avgSpeed ? avgSpeed.toFixed(2) + ' km/h' : '-'}<br>
                <strong>累计距离:</strong> ${formatDistance(totalDistance)}
            `;
            if (summaryEl.innerHTML !== summaryHtml) summaryEl.innerHTML = summaryHtml;

            const displayRecords = records.slice(-100).reverse();
            const newTbodyHtml = displayRecords.map(record => {
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
            
            lastTravelDbHtml = newTbodyHtml;
            if (tbody.innerHTML !== newTbodyHtml) {
                tbody.innerHTML = newTbodyHtml;
            }
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
        // 更新司机列表显示 - 性能优化版(DOM Diffing)
        function updateDriverList() {
            const listEl = document.getElementById('driver-list');
            if (!listEl) return;
            
            const driverArray = Object.values(drivers);
            if (driverArray.length === 0) {
                if (!listEl.querySelector('.loading')) {
                    listEl.innerHTML = '<div class="loading">暂无已注册司机</div>';
                }
                return;
            }
            
            // 清理旧的 loading 提示
            const loadingEl = listEl.querySelector('.loading');
            if (loadingEl) listEl.innerHTML = '';

            const currentIds = new Set(driverArray.map(d => String(d.id || d.driver_id || '未知')));

            Array.from(listEl.children).forEach(item => {
                const id = item.dataset.id;
                if (id && !currentIds.has(id)) {
                    item.remove();
                }
            });
            
            driverArray.forEach((driver, index) => {
                const driverId = String(driver.id || driver.driver_id || '未知');
                let item = listEl.querySelector(`.node-item[data-id="${driverId}"]`);

                const innerHtmlContent = `
                    <strong>${escapeHtml(driver.name || driverId)}</strong>
                    <span style="color:#888;font-size:12px;"> (ID: ${escapeHtml(driverId)})</span><br>
                    ${driver.license_plate ? `<span style="color:#3498db;">车牌: ${escapeHtml(driver.license_plate)}</span><br>` : ''}
                    ${driver.phone || driver.contact ? `<span style="color:#27ae60;">电话: ${escapeHtml(driver.phone || driver.contact)}</span><br>` : ''}
                    <span style="color:#7f8c8d;font-size:12px;">车辆类型: ${escapeHtml(driver.vehicle_type || '未设置')}</span>
                `;

                if (!item) {
                    item = document.createElement('div');
                    item.className = 'node-item';
                    item.dataset.id = driverId;
                    item.style.cssText = 'padding:10px;margin-bottom:5px;border:1px solid #ddd;border-radius:5px;display:flex;justify-content:space-between;align-items:flex-start;gap:8px;';

                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'driver-info-content';
                    infoDiv.style.flex = '1';
                    infoDiv.style.cursor = 'pointer';
                    infoDiv.innerHTML = innerHtmlContent;
                    infoDiv.addEventListener('click', () => showDriverDetail(driver));

                    const delBtn = document.createElement('button');
                    delBtn.textContent = '删除';
                    delBtn.title = `删除司机 ${driver.name || driverId}`;
                    delBtn.style.cssText = 'background:#e74c3c;color:#fff;border:none;border-radius:4px;padding:4px 10px;font-size:12px;cursor:pointer;flex-shrink:0;white-space:nowrap;line-height:1.6;align-self:center;';
                    delBtn.addEventListener('mouseenter', () => { delBtn.style.background = '#c0392b'; });
                    delBtn.addEventListener('mouseleave', () => { delBtn.style.background = '#e74c3c'; });
                    delBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteDriver(driverId, driver.name || driverId);
                    });

                    item.appendChild(infoDiv);
                    item.appendChild(delBtn);

                    if (index >= listEl.children.length) {
                        listEl.appendChild(item);
                    } else {
                        listEl.insertBefore(item, listEl.children[index]);
                    }
                } else {
                    // 已存在，比对更新内容
                    const infoDiv = item.querySelector('.driver-info-content');
                    if (infoDiv && infoDiv.innerHTML !== innerHtmlContent) {
                        infoDiv.innerHTML = innerHtmlContent;
                    }
                    if (listEl.children[index] !== item) {
                        listEl.insertBefore(item, listEl.children[index]);
                    }
                }
            });
        }

        // 删除司机
        async function deleteDriver(driverId, driverName) {
            const confirmed = confirm(`确认删除司机「${driverName}」(${driverId}) ？\n\n该司机将从系统中注销，地图上的关联车辆也将同步移除。`);
            if (!confirmed) return;

            const result = await apiCall(`/drivers/${encodeURIComponent(driverId)}`, { method: 'DELETE' });
            if (result.success) {
                showSuccess(result.message || `司机 ${driverId} 已删除`);
                if (activeDriverId === driverId) {
                    activeDriverId = null;
                }
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
                alert(t('please_enter_driver_id'));
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
                alert(t('please_register_driver'));
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
                showError(result.message || t('set_node_status_error'));
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
                showSuccess(result.message || t('set_edge_status_success'));
            } else {
                showError(result.message || t('set_edge_status_error'));
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
                showSuccess(result.message || t('set_edge_direction_success'));
            } else {
                showError(result.message || t('set_edge_direction_error'));
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
        // Canvas 渲染器（高性能版本）
        let mapCanvas = null;
        let mapCtx = null;
        let canvasInitialized = false;
        
        function initCanvas() {
            if (canvasInitialized) return;
            
            mapCanvas = document.getElementById('map-canvas');
            if (!mapCanvas) {
                console.warn('Canvas 元素未找到，使用 DOM 渲染');
                return false;
            }
            
            mapCtx = mapCanvas.getContext('2d');
            if (!mapCtx) {
                console.warn('无法获取 Canvas 上下文，使用 DOM 渲染');
                return false;
            }
            
            // 设置 Canvas 尺寸（支持高分辨率显示）
            const map = document.getElementById('map');
            if (map) {
                // 获取设备像素比（支持 Retina 等高分辨率屏幕）
                const dpr = window.devicePixelRatio || 1;
                
                const updateCanvasSize = () => {
                    const rect = map.getBoundingClientRect();
                    // 显示尺寸（CSS 像素）
                    let displayWidth = map.scrollWidth || rect.width || 2000;
                    let displayHeight = map.scrollHeight || rect.height || 1500;
                    
                    // 确保最小分辨率，提高地图质量
                    const minWidth = 2000;
                    const minHeight = 1500;
                    displayWidth = Math.max(displayWidth, minWidth);
                    displayHeight = Math.max(displayHeight, minHeight);
                    
                    // 实际绘制尺寸（物理像素，考虑高分辨率）
                    // 使用设备像素比，但至少为 1.5 以确保较高分辨率
                    const effectiveDpr = Math.max(dpr, 1.5);
                    const actualWidth = displayWidth * effectiveDpr;
                    const actualHeight = displayHeight * effectiveDpr;
                    
                    // 设置 Canvas 的实际尺寸（高分辨率）
                    // 注意：设置 width/height 会重置 Canvas 上下文，包括变换矩阵
                    mapCanvas.width = actualWidth;
                    mapCanvas.height = actualHeight;
                    
                    // 设置 Canvas 的显示尺寸（CSS 像素）
                    mapCanvas.style.width = displayWidth + 'px';
                    mapCanvas.style.height = displayHeight + 'px';
                    
                    // 重新获取上下文（因为设置尺寸会重置上下文）
                    mapCtx = mapCanvas.getContext('2d');
                    
                    // 启用图像平滑，提高绘制质量
                    mapCtx.imageSmoothingEnabled = true;
                    mapCtx.imageSmoothingQuality = 'high';
                    
                    // 缩放绘图上下文以匹配设备像素比
                    // 这样绘图时使用 CSS 像素坐标，但实际渲染在高分辨率下
                    mapCtx.scale(effectiveDpr, effectiveDpr);
                    
                    // 记录显示尺寸和设备像素比，供后续绘制使用
                    mapCanvas._displayWidth = displayWidth;
                    mapCanvas._displayHeight = displayHeight;
                    mapCanvas._dpr = effectiveDpr;
                };
                updateCanvasSize();
                // 监听地图尺寸变化
                const resizeObserver = new ResizeObserver(updateCanvasSize);
                resizeObserver.observe(map);
            }
            
            canvasInitialized = true;
            return true;
        }
        
        // 屏幕坐标转地图坐标
        function screenToMap(screenX, screenY) {
            const zoomState = window.mapZoomState;
            if (!zoomState) return { x: screenX, y: screenY };
            const wrapperRect = document.querySelector('.map-wrapper')?.getBoundingClientRect();
            if (!wrapperRect) return { x: screenX, y: screenY };
            
            const relativeX = screenX - wrapperRect.left;
            const relativeY = screenY - wrapperRect.top;
            
            const mapX = (relativeX - zoomState.translateX) / zoomState.scale;
            const mapY = (relativeY - zoomState.translateY) / zoomState.scale;
            
            return { x: mapX, y: mapY };
        }
        
        // 地图坐标转屏幕坐标
        function mapToScreen(mapX, mapY) {
            const zoomState = window.mapZoomState;
            if (!zoomState) return { x: mapX, y: mapY };
            
            const screenX = zoomState.translateX + mapX * zoomState.scale;
            const screenY = zoomState.translateY + mapY * zoomState.scale;
            
            return { x: screenX, y: screenY };
        }
        
        // 检查点是否在视口内（视口剔除优化）
        function isInViewport(mapX, mapY, radius = 50) {
            const zoomState = window.mapZoomState;
            if (!zoomState) return true;
            const wrapperRect = document.querySelector('.map-wrapper')?.getBoundingClientRect();
            if (!wrapperRect) return true;
            
            const screen = mapToScreen(mapX, mapY);
            return screen.x >= -radius && screen.x <= wrapperRect.width + radius &&
                   screen.y >= -radius && screen.y <= wrapperRect.height + radius;
        }
        
        function renderMapCanvas() {
            if (!initCanvas() || !mapCtx) {
                // Canvas 初始化失败，回退到 DOM 渲染
                return renderMapDOM();
            }
            
            const map = document.getElementById('map');
            if (!map) return;
            
            // 清空 Canvas（使用显示尺寸，因为上下文已经缩放）
            const displayWidth = mapCanvas._displayWidth || mapCanvas.width / (mapCanvas._dpr || 1);
            const displayHeight = mapCanvas._displayHeight || mapCanvas.height / (mapCanvas._dpr || 1);
            mapCtx.clearRect(0, 0, displayWidth, displayHeight);
            
            // 设置高质量渲染（抗锯齿）
            mapCtx.imageSmoothingEnabled = true;
            mapCtx.imageSmoothingQuality = 'high';
            
            // 设置 Canvas 背景（优化后的颜色）
            if (mapBackground) {
                mapCtx.fillStyle = 'transparent';
            } else {
                // 使用更柔和的背景色，与CSS变量一致
                mapCtx.fillStyle = '#f0f4f8';
                mapCtx.fillRect(0, 0, displayWidth, displayHeight);
            }
            
            // 应用旋转、缩放和平移变换
            // 先应用旋转（以(0,0)为旋转中心），然后应用缩放和平移
            mapCtx.save();
            const zoomState = window.mapZoomState;
            if (zoomState) {
                mapCtx.translate(zoomState.translateX, zoomState.translateY);
                mapCtx.scale(zoomState.scale, zoomState.scale);
            }
            // 应用旋转（以(0,0)为旋转中心）
            if (mapRotation !== 0) {
                mapCtx.rotate(mapRotation * Math.PI / 180);
            }
            
            // ========== 优化后的道路渲染（高质量抗锯齿） ==========
            const edgesByStyle = {};
            
            // 道路颜色配置（与CSS变量一致）
            const roadColors = {
                normal: '#64748b',      // 普通道路 - 石板灰
                main: '#475569',        // 主路 - 深石板灰
                oneway: '#ea580c',      // 单向道路 - 橙色
                congested: '#dc2626',   // 拥堵 - 红色
                construction: '#d97706', // 施工 - 琥珀色
                closed: '#9ca3af'       // 关闭 - 浅灰色
            };
            
            edges.forEach(edge => {
                const startNode = nodes.find(n => n.id === edge.start_node);
                const endNode = nodes.find(n => n.id === edge.end_node);
                
                if (!startNode || !endNode) return;
                
                // 视口剔除
                const midX = (startNode.x + endNode.x) / 2;
                const midY = (startNode.y + endNode.y) / 2;
                if (!isInViewport(midX, midY, Math.max(Math.abs(endNode.x - startNode.x), Math.abs(endNode.y - startNode.y)) / 2)) {
                    return;
                }
                
                // 获取道路状态和样式（优化后的颜色和宽度）
                const edgeStatus = monitorData.edge_status && monitorData.edge_status[edge.id] || 'normal';
                let lineWidth = 3;  // 增加默认线宽
                let strokeColor = roadColors.normal;
                let dashPattern = [];
                let alpha = 1.0;
                let isMainRoad = edge.road_type === 'main';
                
                // 主路使用更粗的线条
                if (isMainRoad) {
                    lineWidth = 4;
                    strokeColor = roadColors.main;
                }
                
                if (!edge.is_available || edgeStatus === 'closed') {
                    strokeColor = roadColors.closed;
                    alpha = 0.5;
                    lineWidth = 2;
                } else if (edgeStatus === 'construction') {
                    strokeColor = roadColors.construction;
                    lineWidth = 5;
                    dashPattern = [12, 6];
                } else if (edgeStatus === 'congested' || edge.congestion_coeff > 2.0) {
                    strokeColor = roadColors.congested;
                    lineWidth = 5;
                } else if (edge.congestion_coeff > 1.5) {
                    strokeColor = roadColors.congested;
                    lineWidth = 3;
                } else if (edge.direction !== 'two-way') {
                    strokeColor = roadColors.oneway;
                    lineWidth = 4;
                }
                
                // 生成样式键
                const styleKey = `${strokeColor}|${lineWidth}|${dashPattern.join(',')}|${alpha}`;
                if (!edgesByStyle[styleKey]) {
                    edgesByStyle[styleKey] = {
                        strokeColor, lineWidth, dashPattern, alpha, segments: []
                    };
                }
                
                // 存储线段信息
                edgesByStyle[styleKey].segments.push({
                    start: {x: startNode.x, y: startNode.y},
                    end: {x: endNode.x, y: endNode.y},
                    edge: edge
                });
            });
            
            // ========== 高质量批量绘制 ==========
            // 设置高质量渲染参数
            mapCtx.lineCap = 'round';
            mapCtx.lineJoin = 'round';
            
            // 先绘制道路阴影层（增加立体感）
            mapCtx.save();
            mapCtx.shadowColor = 'rgba(0, 0, 0, 0.15)';
            mapCtx.shadowBlur = 3;
            mapCtx.shadowOffsetX = 1;
            mapCtx.shadowOffsetY = 1;
            
            Object.values(edgesByStyle).forEach(style => {
                mapCtx.strokeStyle = style.strokeColor;
                mapCtx.lineWidth = style.lineWidth;
                mapCtx.setLineDash(style.dashPattern);
                mapCtx.globalAlpha = style.alpha;
                
                mapCtx.beginPath();
                style.segments.forEach(seg => {
                    mapCtx.moveTo(seg.start.x, seg.start.y);
                    mapCtx.lineTo(seg.end.x, seg.end.y);
                });
                mapCtx.stroke();
            });
            mapCtx.restore();
                
            // 绘制单向箭头（优化后更美观）
            mapCtx.globalAlpha = 1.0;
                mapCtx.setLineDash([]);
                
            Object.values(edgesByStyle).forEach(style => {
                style.segments.forEach(seg => {
                    if (seg.edge.direction !== 'two-way') {
                        const dx = seg.end.x - seg.start.x;
                        const dy = seg.end.y - seg.start.y;
                        const length = Math.sqrt(dx * dx + dy * dy);
                        
                        // 只在道路足够长时绘制箭头
                        if (length < 30) return;
                        
                        const angle = Math.atan2(dy, dx);
                        const midX = seg.start.x + dx * 0.5;
                        const midY = seg.start.y + dy * 0.5;
                        
                        // 绘制更美观的箭头
                        mapCtx.save();
                        mapCtx.translate(midX, midY);
                        mapCtx.rotate(angle);
                        
                        // 箭头背景（白色边框增加可见性）
                        mapCtx.fillStyle = '#ffffff';
                        mapCtx.beginPath();
                        mapCtx.moveTo(11, 0);
                        mapCtx.lineTo(-7, -7);
                        mapCtx.lineTo(-4, 0);
                        mapCtx.lineTo(-7, 7);
                        mapCtx.closePath();
                        mapCtx.fill();
                        
                        // 箭头主体
                        mapCtx.fillStyle = style.strokeColor;
                        mapCtx.beginPath();
                        mapCtx.moveTo(9, 0);
                        mapCtx.lineTo(-5, -5);
                        mapCtx.lineTo(-2, 0);
                        mapCtx.lineTo(-5, 5);
                        mapCtx.closePath();
                        mapCtx.fill();
                        
                        mapCtx.restore();
                    }
                });
            });
            
            // 重置状态
            mapCtx.globalAlpha = 1.0;
            mapCtx.setLineDash([]);
            
            // ========== 优化后的节点渲染（渐变+阴影） ==========
            // 节点颜色配置（与CSS变量一致）
            const nodeColors = {
                entrance: { main: '#10b981', dark: '#059669' },    // 绿色
                'work-area': { main: '#ef4444', dark: '#dc2626' }, // 红色
                crossroad: { main: '#3b82f6', dark: '#2563eb' },   // 蓝色
                start: { main: '#8b5cf6', dark: '#7c3aed' }        // 紫色
            };
            
            nodes.forEach(node => {
                // 根据道路类型过滤节点显示
                if (!shouldShowNode(node)) return;
                
                // 视口剔除
                if (!isInViewport(node.x, node.y, 25)) return;
                
                // 获取节点拥堵状态
                const nodeCongestionData = monitorData.node_congestion && monitorData.node_congestion[node.id];
                let nodeCongestion = 0;
                if (nodeCongestionData !== undefined && nodeCongestionData !== null) {
                    nodeCongestion = typeof nodeCongestionData === 'object' && nodeCongestionData.level !== undefined
                        ? nodeCongestionData.level 
                        : nodeCongestionData;
                    nodeCongestion = parseInt(nodeCongestion) || 0;
                }
                
                // 根据节点类型设置颜色和大小
                const colors = nodeColors[node.type] || nodeColors.crossroad;
                let nodeRadius = 10;  // 略微增大
                
                if (node.type === 'entrance') {
                    nodeRadius = 12;
                }
                
                // 检查是否是隐藏的节点
                const isHiddenNode = showHiddenNodes && node.hasOwnProperty('is_visible') && node.is_visible === false;
                
                // 绘制节点阴影
                mapCtx.save();
                if (!isHiddenNode) {
                    mapCtx.shadowColor = 'rgba(0, 0, 0, 0.25)';
                    mapCtx.shadowBlur = 6;
                    mapCtx.shadowOffsetX = 1;
                    mapCtx.shadowOffsetY = 2;
                }
                
                // 绘制节点外圈（拥堵或施工标识）
                if (nodeCongestion > 0) {
                    const congestionColors = ['#fbbf24', '#f97316', '#ef4444'];
                    mapCtx.strokeStyle = congestionColors[Math.min(nodeCongestion - 1, 2)];
                    mapCtx.lineWidth = 3;
                    mapCtx.setLineDash([]);
                    mapCtx.beginPath();
                    mapCtx.arc(node.x, node.y, nodeRadius + 4, 0, Math.PI * 2);
                    mapCtx.stroke();
                }
                
                // 检查是否是施工点
                if ((monitorData.work_zones || []).includes(node.id)) {
                    mapCtx.strokeStyle = '#ef4444';
                    mapCtx.lineWidth = 2;
                    mapCtx.beginPath();
                    mapCtx.arc(node.x, node.y, nodeRadius + 4, 0, Math.PI * 2);
                    mapCtx.stroke();
                }
                
                // 绘制节点主体（使用渐变）
                if (isHiddenNode) {
                    mapCtx.globalAlpha = 0.6;
                }
                
                // 创建径向渐变（高光效果）
                const gradient = mapCtx.createRadialGradient(
                    node.x - nodeRadius * 0.3, node.y - nodeRadius * 0.3, 0,
                    node.x, node.y, nodeRadius
                );
                gradient.addColorStop(0, colors.main);
                gradient.addColorStop(1, colors.dark);
                
                mapCtx.fillStyle = gradient;
                mapCtx.beginPath();
                mapCtx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                mapCtx.fill();
                
                // 绘制边框
                if (isHiddenNode) {
                    mapCtx.strokeStyle = '#f87171';
                    mapCtx.lineWidth = 3;
                    mapCtx.setLineDash([4, 4]);
                } else {
                    mapCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                    mapCtx.lineWidth = 2;
                    mapCtx.setLineDash([]);
                }
                mapCtx.stroke();
                
                mapCtx.restore();
                
                // 重置透明度和虚线
                    mapCtx.globalAlpha = 1.0;
                    mapCtx.setLineDash([]);
                
                // 绘制节点编号（优化字体渲染）
                const nodeNum = node.id.toString().replace(/^node_?/i, '');
                if (nodeNum.length <= 3) {  // 只显示短编号
                    mapCtx.save();
                    mapCtx.font = `600 ${node.type === 'entrance' ? 11 : 10}px 'JetBrains Mono', monospace`;
                    mapCtx.textAlign = 'center';
                    mapCtx.textBaseline = 'middle';
                    mapCtx.fillStyle = '#ffffff';
                    // 文字阴影效果
                    mapCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                    mapCtx.shadowBlur = 2;
                    mapCtx.fillText(nodeNum, node.x, node.y + 0.5);
                    mapCtx.restore();
                }
            });
            
            // ========== 优化后的道路标签渲染 ==========
            edges.forEach(edge => {
                const startNode = nodes.find(n => n.id === edge.start_node);
                const endNode = nodes.find(n => n.id === edge.end_node);
                if (!startNode || !endNode) return;
                
                const dx = endNode.x - startNode.x;
                const dy = endNode.y - startNode.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                
                // 只在道路足够长时显示标签
                if (length < 50) return;
                
                const midX = startNode.x + dx * 0.5;
                const midY = startNode.y + dy * 0.5;
                
                if (!isInViewport(midX, midY, 40)) return;
                
                const labelText = edge.name || edge.id;
                let offsetX = 0, offsetY = 0;
                const absDx = Math.abs(dx);
                const absDy = Math.abs(dy);
                
                // 智能偏移计算
                if (absDx > absDy) {
                    const offset = Math.max(20, Math.min(30, length * 0.15));
                    offsetY = dy >= 0 ? -offset : offset;
                } else {
                    const offset = Math.max(20, Math.min(30, length * 0.15));
                    offsetX = dx >= 0 ? -offset : offset;
                }
                
                // 优化后的字体样式
                const fontSize = edge.label_font_size || 11;
                mapCtx.save();
                mapCtx.font = `500 ${fontSize}px 'Noto Sans SC', sans-serif`;
                mapCtx.textAlign = 'center';
                mapCtx.textBaseline = 'middle';
                
                // 绘制标签背景（带圆角效果）
                    const metrics = mapCtx.measureText(labelText);
                const padding = 4;
                const bgWidth = metrics.width + padding * 2;
                const bgHeight = fontSize + padding * 2;
                const bgX = midX + offsetX - bgWidth / 2;
                const bgY = midY + offsetY - bgHeight / 2;
                
                // 半透明白色背景
                mapCtx.fillStyle = edge.label_background_color || 'rgba(255, 255, 255, 0.85)';
                mapCtx.shadowColor = 'rgba(0, 0, 0, 0.1)';
                mapCtx.shadowBlur = 4;
                mapCtx.shadowOffsetY = 1;
                
                // 绘制圆角矩形
                const radius = 3;
                mapCtx.beginPath();
                mapCtx.moveTo(bgX + radius, bgY);
                mapCtx.lineTo(bgX + bgWidth - radius, bgY);
                mapCtx.quadraticCurveTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + radius);
                mapCtx.lineTo(bgX + bgWidth, bgY + bgHeight - radius);
                mapCtx.quadraticCurveTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - radius, bgY + bgHeight);
                mapCtx.lineTo(bgX + radius, bgY + bgHeight);
                mapCtx.quadraticCurveTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - radius);
                mapCtx.lineTo(bgX, bgY + radius);
                mapCtx.quadraticCurveTo(bgX, bgY, bgX + radius, bgY);
                mapCtx.closePath();
                mapCtx.fill();
                
                // 绘制文字
                mapCtx.shadowColor = 'transparent';
                mapCtx.fillStyle = edge.label_color || '#1e293b';
                mapCtx.fillText(labelText, midX + offsetX, midY + offsetY);
                mapCtx.restore();
            });
            
            // ========== 优化后的车辆渲染（带渐变和动画效果） ==========
            const vehicleColors = {
                '渣土车': { main: '#f59e0b', dark: '#d97706' },
                '材料车': { main: '#a855f7', dark: '#7c3aed' },
                '工程车': { main: '#14b8a6', dark: '#0d9488' },
                '特种车': { main: '#ef4444', dark: '#dc2626' }
            };
            
            vehicles.forEach(vehicle => {
                if (!vehicle.current_position) return;
                const x = vehicle.current_position.x;
                const y = vehicle.current_position.y;
                if (typeof x === 'undefined' || typeof y === 'undefined' || isNaN(x) || isNaN(y)) return;
                
                if (!isInViewport(x, y, 20)) return;
                
                const colors = vehicleColors[vehicle.type] || vehicleColors['渣土车'];
                const vehicleRadius = 9;
                
                mapCtx.save();
                
                // 车辆阴影
                mapCtx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                mapCtx.shadowBlur = 6;
                mapCtx.shadowOffsetX = 1;
                mapCtx.shadowOffsetY = 2;
                
                // 创建渐变
                const gradient = mapCtx.createRadialGradient(
                    x - vehicleRadius * 0.3, y - vehicleRadius * 0.3, 0,
                    x, y, vehicleRadius
                );
                gradient.addColorStop(0, colors.main);
                gradient.addColorStop(1, colors.dark);
                
                mapCtx.fillStyle = gradient;
                mapCtx.beginPath();
                mapCtx.arc(x, y, vehicleRadius, 0, Math.PI * 2);
                mapCtx.fill();
                
                // 白色边框
                mapCtx.shadowColor = 'transparent';
                mapCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                mapCtx.lineWidth = 2;
                mapCtx.stroke();
                
                // 如果有司机ID，添加绿色外圈
                if (vehicle.driver_id) {
                    mapCtx.strokeStyle = '#10b981';
                    mapCtx.lineWidth = 2;
                    mapCtx.beginPath();
                    mapCtx.arc(x, y, vehicleRadius + 3, 0, Math.PI * 2);
                    mapCtx.stroke();
                }
                
                mapCtx.restore();
            });
            
            // 恢复变换（包括旋转、缩放和平移）
            mapCtx.restore();
        }
        
        // 主渲染函数：优先使用 Canvas，失败则回退到 DOM
        function renderMap() {
            // 优先使用 Canvas 渲染（高性能）
            if (canvasInitialized && mapCanvas && mapCtx) {
                try {
                    renderMapCanvas();
                    return;
                } catch (err) {
                    console.error('Canvas 渲染失败，回退到 DOM 渲染:', err);
                    canvasInitialized = false;
                }
            }
            
            // 回退到 DOM 渲染
            renderMapDOM();
        }
        
        // GPS坐标转换工具函数
        // 十进制度数转度分秒 (Decimal Degrees to Degrees Minutes Seconds)
        function decimalToDMS(decimal, isLatitude) {
            const absolute = Math.abs(decimal);
            const degrees = Math.floor(absolute);
            const minutesFloat = (absolute - degrees) * 60;
            const minutes = Math.floor(minutesFloat);
            const seconds = (minutesFloat - minutes) * 60;
            
            let direction = '';
            if (isLatitude) {
                direction = decimal >= 0 ? 'N' : 'S';
            } else {
                direction = decimal >= 0 ? 'E' : 'W';
            }
            
            return {
                degrees: degrees,
                minutes: minutes,
                seconds: seconds.toFixed(1),
                direction: direction,
                formatted: `${degrees}°${minutes}'${seconds.toFixed(1)}"${direction}`
            };
        }
        
        // 度分秒转十进制度数 (DMS to Decimal Degrees)
        function dmsToDecimal(degrees, minutes, seconds, direction) {
            let decimal = degrees + minutes / 60 + seconds / 3600;
            if (direction === 'S' || direction === 'W') {
                decimal = -decimal;
            }
            return decimal;
        }
        
        // 解析度分秒字符串 (如: "59°37'28.0"N" 或 "116°23'45.6"E" 或完整格式 "59°36'23.0"N 28°16'06.8"E")
        function parseDMSString(dmsString) {
            if (!dmsString || typeof dmsString !== 'string') return null;
            
            // 尝试解析完整格式 (纬度 经度)
            const fullPattern = /(\d+)°\s*(\d+)['′]\s*([\d.]+)["″]?\s*([NS])\s+(\d+)°\s*(\d+)['′]\s*([\d.]+)["″]?\s*([EW])/i;
            const fullMatch = dmsString.trim().match(fullPattern);
            if (fullMatch) {
                return {
                    latitude: {
                        degrees: parseInt(fullMatch[1]),
                        minutes: parseInt(fullMatch[2]),
                        seconds: parseFloat(fullMatch[3]),
                        direction: fullMatch[4].toUpperCase(),
                        decimal: dmsToDecimal(parseInt(fullMatch[1]), parseInt(fullMatch[2]), parseFloat(fullMatch[3]), fullMatch[4].toUpperCase())
                    },
                    longitude: {
                        degrees: parseInt(fullMatch[5]),
                        minutes: parseInt(fullMatch[6]),
                        seconds: parseFloat(fullMatch[7]),
                        direction: fullMatch[8].toUpperCase(),
                        decimal: dmsToDecimal(parseInt(fullMatch[5]), parseInt(fullMatch[6]), parseFloat(fullMatch[7]), fullMatch[8].toUpperCase())
                    },
                    isFull: true
                };
            }
            
            // 移除空格并转换为大写
            const cleaned = dmsString.trim().toUpperCase();
            
            // 匹配格式: 数字度数字分数字秒方向
            // 例如: 59°37'28.0"N 或 59 37 28.0 N
            const patterns = [
                /^(\d+)°\s*(\d+)['′]\s*([\d.]+)["″]?\s*([NSWE])$/,
                /^(\d+)\s+(\d+)\s+([\d.]+)\s*([NSWE])$/,
                /^(\d+)D\s*(\d+)M\s*([\d.]+)S\s*([NSWE])$/i,
                /^(\d+)°\s*(\d+)['′]\s*([\d.]+)\s*([NSWE])$/,
                /^(\d+)\s*度\s*(\d+)\s*分\s*([\d.]+)\s*秒\s*([北南东西])$/
            ];
            
            for (const pattern of patterns) {
                const match = cleaned.match(pattern);
                if (match) {
                    const degrees = parseInt(match[1]);
                    const minutes = parseInt(match[2]);
                    const seconds = parseFloat(match[3]);
                    let direction = match[4];
                    
                    // 支持中文字符
                    if (direction === '北') direction = 'N';
                    else if (direction === '南') direction = 'S';
                    else if (direction === '东') direction = 'E';
                    else if (direction === '西') direction = 'W';
                    
                    return {
                        degrees: degrees,
                        minutes: minutes,
                        seconds: seconds,
                        direction: direction,
                        decimal: dmsToDecimal(degrees, minutes, seconds, direction),
                        isFull: false
                    };
                }
            }
            
            return null;
        }
        
        // 处理快速坐标输入
        function handleFullCoordinateInput(type) {
            const inputId = type === 'lat' ? 'gps-lat-full-input' : 'gps-lon-full-input';
            const input = document.getElementById(inputId);
            if (!input || !input.value) return;
            
            const value = input.value.trim();
            const parsed = parseDMSString(value);
            
            if (parsed && parsed.isFull) {
                // 完整格式（包含纬度和经度）
                if (parsed.latitude && parsed.longitude) {
                    // 填充纬度字段
                    document.getElementById('gps-lat-degrees').value = parsed.latitude.degrees;
                    document.getElementById('gps-lat-minutes').value = parsed.latitude.minutes;
                    document.getElementById('gps-lat-seconds').value = parsed.latitude.seconds;
                    document.getElementById('gps-lat-direction').value = parsed.latitude.direction;
                    
                    // 填充经度字段
                    document.getElementById('gps-lon-degrees').value = parsed.longitude.degrees;
                    document.getElementById('gps-lon-minutes').value = parsed.longitude.minutes;
                    document.getElementById('gps-lon-seconds').value = parsed.longitude.seconds;
                    document.getElementById('gps-lon-direction').value = parsed.longitude.direction;
                    
                    // 清空输入框
                    input.value = '';
                    input.style.borderColor = '#27ae60';
                    setTimeout(() => {
                        input.style.borderColor = '#3498db';
                    }, 2000);
                    return;
                }
            } else if (parsed && !parsed.isFull) {
                // 单个坐标格式
                if (type === 'lat' && (parsed.direction === 'N' || parsed.direction === 'S')) {
                    document.getElementById('gps-lat-degrees').value = parsed.degrees;
                    document.getElementById('gps-lat-minutes').value = parsed.minutes;
                    document.getElementById('gps-lat-seconds').value = parsed.seconds;
                    document.getElementById('gps-lat-direction').value = parsed.direction;
                    input.value = '';
                    input.style.borderColor = '#27ae60';
                    setTimeout(() => {
                        input.style.borderColor = '#3498db';
                    }, 2000);
                } else if (type === 'lon' && (parsed.direction === 'E' || parsed.direction === 'W')) {
                    document.getElementById('gps-lon-degrees').value = parsed.degrees;
                    document.getElementById('gps-lon-minutes').value = parsed.minutes;
                    document.getElementById('gps-lon-seconds').value = parsed.seconds;
                    document.getElementById('gps-lon-direction').value = parsed.direction;
                    input.value = '';
                    input.style.borderColor = '#27ae60';
                    setTimeout(() => {
                        input.style.borderColor = '#3498db';
                    }, 2000);
                } else {
                    input.style.borderColor = '#e74c3c';
                    setTimeout(() => {
                        input.style.borderColor = '#3498db';
                    }, 2000);
                }
            } else {
                input.style.borderColor = '#e74c3c';
                setTimeout(() => {
                    input.style.borderColor = '#3498db';
                }, 2000);
            }
        }

        // GPS校准对话框函数（全局作用域）
        async function showGpsCalibrationDialog(nodeId) {
            // 获取节点信息
            const node = nodes.find(n => n.id === nodeId);
            if (!node) {
                alert(t('node_not_exists'));
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
                    📍 ${t('gps_calibration')}
                </h3>
                <div style="margin-bottom: 15px; padding: 10px; background: #ecf0f1; border-radius: 6px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">${t('node_info')}</div>
                    <div style="font-size: 14px; color: #555;">
                        <strong>${t('name_label')}</strong> ${node.name}<br>
                        <strong>${t('id_label')}</strong> ${node.id}<br>
                        <strong>${t('type_label')}</strong> ${node.type || t('unknown')}
                    </div>
                </div>
                ${hasGps ? (() => {
                    const latDMS = decimalToDMS(node.latitude, true);
                    const lonDMS = decimalToDMS(node.longitude, false);
                    return `
                        <div style="margin-bottom: 15px; padding: 10px; background: #d5f4e6; border-left: 4px solid #27ae60; border-radius: 4px;">
                            <div style="font-weight: bold; color: #27ae60; margin-bottom: 5px;">${t('current_gps_coords')}</div>
                            <div style="font-size: 14px; color: #555;">
                                ${t('latitude')}: ${latDMS.formatted}<br>
                                ${t('longitude')}: ${lonDMS.formatted}<br>
                                <div style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">
                                    (${t('decimal_format')}: ${node.latitude.toFixed(6)}, ${node.longitude.toFixed(6)})
                                </div>
                            </div>
                        </div>
                    `;
                })() : `
                    <div style="margin-bottom: 15px; padding: 10px; background: #fadbd8; border-left: 4px solid #e74c3c; border-radius: 4px;">
                        <div style="font-weight: bold; color: #e74c3c; margin-bottom: 5px;">⚠️ ${t('gps_not_set')}</div>
                        <div style="font-size: 13px; color: #555;">
                            ${t('gps_not_set_hint')}
                        </div>
                    </div>
                `}
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #2c3e50;">
                        ${t('latitude_label')} <span style="color: #e74c3c;">*</span>
                    </label>
                    <div style="display: flex; gap: 10px; margin-bottom: 5px;">
                        <input 
                            type="number" 
                            id="gps-lat-degrees" 
                            min="0" 
                            max="90"
                            placeholder="${t('degrees')}"
                            value="${hasGps ? decimalToDMS(node.latitude, true).degrees : ''}"
                            style="flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                        <span style="align-self: center; font-size: 18px;">°</span>
                        <input 
                            type="number" 
                            id="gps-lat-minutes" 
                            min="0" 
                            max="59"
                            placeholder="${t('minutes')}"
                            value="${hasGps ? decimalToDMS(node.latitude, true).minutes : ''}"
                            style="flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                        <span style="align-self: center; font-size: 18px;">'</span>
                        <input 
                            type="number" 
                            id="gps-lat-seconds" 
                            step="0.1"
                            min="0" 
                            max="59.9"
                            placeholder="${t('seconds')}"
                            value="${hasGps ? decimalToDMS(node.latitude, true).seconds : ''}"
                            style="flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                        <span style="align-self: center; font-size: 18px;">"</span>
                        <select 
                            id="gps-lat-direction"
                            style="flex: 0.8; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                            <option value="N" ${hasGps && node.latitude >= 0 ? 'selected' : ''}>N</option>
                            <option value="S" ${hasGps && node.latitude < 0 ? 'selected' : ''}>S</option>
                        </select>
                    </div>
                    <div style="font-size: 11px; color: #7f8c8d; margin-top: 5px; margin-bottom: 8px;">
                        ${t('format_example')}
                    </div>
                    <input 
                        type="text" 
                        id="gps-lat-full-input" 
                        placeholder="${t('quick_input_hint')}"
                        style="width: 100%; padding: 8px; border: 2px dashed #3498db; border-radius: 6px; font-size: 13px; box-sizing: border-box; margin-bottom: 5px;"
                        onchange="handleFullCoordinateInput('lat')"
                    >
                    <div style="font-size: 11px; color: #3498db; margin-bottom: 10px;">
                        💡 ${t('quick_input_tip')}
                    </div>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #2c3e50;">
                        ${t('longitude_label')} <span style="color: #e74c3c;">*</span>
                    </label>
                    <div style="display: flex; gap: 10px; margin-bottom: 5px;">
                        <input 
                            type="number" 
                            id="gps-lon-degrees" 
                            min="0" 
                            max="180"
                            placeholder="${t('degrees')}"
                            value="${hasGps ? decimalToDMS(node.longitude, false).degrees : ''}"
                            style="flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                        <span style="align-self: center; font-size: 18px;">°</span>
                        <input 
                            type="number" 
                            id="gps-lon-minutes" 
                            min="0" 
                            max="59"
                            placeholder="${t('minutes')}"
                            value="${hasGps ? decimalToDMS(node.longitude, false).minutes : ''}"
                            style="flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                        <span style="align-self: center; font-size: 18px;">'</span>
                        <input 
                            type="number" 
                            id="gps-lon-seconds" 
                            step="0.1"
                            min="0" 
                            max="59.9"
                            placeholder="${t('seconds')}"
                            value="${hasGps ? decimalToDMS(node.longitude, false).seconds : ''}"
                            style="flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                        <span style="align-self: center; font-size: 18px;">"</span>
                        <select 
                            id="gps-lon-direction"
                            style="flex: 0.8; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                        >
                            <option value="E" ${hasGps && node.longitude >= 0 ? 'selected' : ''}>E</option>
                            <option value="W" ${hasGps && node.longitude < 0 ? 'selected' : ''}>W</option>
                        </select>
                    </div>
                    <div style="font-size: 11px; color: #7f8c8d; margin-top: 5px; margin-bottom: 8px;">
                        ${t('format_example')}
                    </div>
                    <input 
                        type="text" 
                        id="gps-lon-full-input" 
                        placeholder="${t('quick_input_hint_full')}"
                        style="width: 100%; padding: 8px; border: 2px dashed #3498db; border-radius: 6px; font-size: 13px; box-sizing: border-box; margin-bottom: 5px; transition: border-color 0.3s;"
                        onblur="handleFullCoordinateInput('lon')"
                    >
                    <div style="font-size: 11px; color: #3498db; margin-bottom: 10px;">
                        💡 ${t('quick_input_tip_blur')}
                    </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button 
                        id="gps-get-location-btn"
                        style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold; flex: 1;"
                    >
                        📍 ${t('get_current_location')}
                    </button>
                    <button 
                        id="gps-cancel-btn"
                        style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;"
                    >
                        ${t('cancel')}
                    </button>
                    <button 
                        id="gps-save-btn"
                        style="padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;"
                    >
                        ${t('save')}
                    </button>
                </div>
            `;

            dialog.appendChild(content);
            document.body.appendChild(dialog);

            // 获取当前位置按钮
            const getLocationBtn = document.getElementById('gps-get-location-btn');
            if (getLocationBtn && navigator.geolocation) {
                getLocationBtn.addEventListener('click', async () => {
                    // 检查协议和主机名
                    const protocol = window.location.protocol;
                    const hostname = window.location.hostname;
                    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
                    const isLanIP = /^10\.|^172\.(1[6-9]|2[0-9]|3[01])\.|^192\.168\./.test(hostname);
                    
                    // HTTP + 局域网IP 的情况，浏览器会拒绝定位权限
                    if (protocol !== 'https:' && !isLocalhost && isLanIP) {
                        const protocolError = document.createElement('div');
                        protocolError.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0,0,0,0.5);
                            z-index: 30000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 20px;
                        `;
                        protocolError.innerHTML = `
                            <div style="background: white; border-radius: 10px; padding: 25px; max-width: 600px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.3); max-height: 90vh; overflow-y: auto;">
                                <h3 style="margin-top: 0; color: #e74c3c; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
                                    ⚠️ ${t('browser_security_restriction')}
                                </h3>
                                <div style="margin: 15px 0; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                                    <p style="margin: 0 0 10px 0; font-weight: bold; color: #856404;">
                                        ${t('current_access')}<code>${protocol}//${hostname}:${window.location.port || ''}</code>
                                    </p>
                                    <p style="margin: 0; line-height: 1.6; color: #856404;">
                                        ${t('browser_security_msg')}
                                    </p>
                                </div>
                                
                                <div style="margin: 20px 0;">
                                    <h4 style="color: #2c3e50; margin-bottom: 10px;">${t('solutions')}</h4>
                                    
                                    <div style="margin-bottom: 15px; padding: 12px; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
                                        <strong style="color: #2e7d32;">${t('solution1_title')}</strong>
                                        <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.6; color: #555; white-space: pre-line;">
                                            ${t('solution1_desc')}
                                        </p>
                                    </div>
                                    
                                    <div style="margin-bottom: 15px; padding: 12px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
                                        <strong style="color: #1565c0;">${t('solution2_title')}</strong>
                                        <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.6; color: #555; white-space: pre-line;">
                                            ${t('solution2_desc')}
                                        </p>
                                    </div>
                                    
                                    <div style="margin-bottom: 15px; padding: 12px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
                                        <strong style="color: #e65100;">${t('solution3_title')}</strong>
                                        <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.6; color: #555; white-space: pre-line;">
                                            ${t('solution3_desc')}
                                        </p>
                                    </div>
                                    
                                    <div style="margin-bottom: 15px; padding: 12px; background: #f3e5f5; border-left: 4px solid #9c27b0; border-radius: 4px;">
                                        <strong style="color: #6a1b9a;">${t('solution4_title')}</strong>
                                        <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.6; color: #555;">
                                            ${t('solution4_desc')}
                                        </p>
                                    </div>
                                </div>
                                
                                <div style="text-align: right; margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                    <button onclick="this.parentElement.parentElement.remove()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;">
                                        ${t('got_it')}
                                    </button>
                                </div>
                            </div>
                        `;
                        document.body.appendChild(protocolError);
                        return;
                    }
                    
                    getLocationBtn.disabled = true;
                    getLocationBtn.textContent = t('getting_location');
                    
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            // 获取到位置后，填充到度分秒输入框
                            const latDeg = document.getElementById('gps-lat-degrees');
                            const latMin = document.getElementById('gps-lat-minutes');
                            const latSec = document.getElementById('gps-lat-seconds');
                            const latDir = document.getElementById('gps-lat-direction');
                            
                            const lonDeg = document.getElementById('gps-lon-degrees');
                            const lonMin = document.getElementById('gps-lon-minutes');
                            const lonSec = document.getElementById('gps-lon-seconds');
                            const lonDir = document.getElementById('gps-lon-direction');
                            
                            if (latDeg && latMin && latSec && latDir) {
                                const latDMS = decimalToDMS(position.coords.latitude, true);
                                latDeg.value = latDMS.degrees;
                                latMin.value = latDMS.minutes;
                                latSec.value = latDMS.seconds;
                                latDir.value = latDMS.direction;
                            }
                            
                            if (lonDeg && lonMin && lonSec && lonDir) {
                                const lonDMS = decimalToDMS(position.coords.longitude, false);
                                lonDeg.value = lonDMS.degrees;
                                lonMin.value = lonDMS.minutes;
                                lonSec.value = lonDMS.seconds;
                                lonDir.value = lonDMS.direction;
                            }
                            
                            getLocationBtn.disabled = false;
                            getLocationBtn.textContent = '📍 获取当前位置';
                            
                            // 显示成功提示
                            const successMsg = `GPS位置已获取\n纬度: ${position.coords.latitude.toFixed(6)}\n经度: ${position.coords.longitude.toFixed(6)}\n精度: ±${position.coords.accuracy ? position.coords.accuracy.toFixed(0) : '未知'}米`;
                            if (typeof showSuccess !== 'undefined') {
                                showSuccess(successMsg);
                            } else {
                                alert(successMsg);
                            }
                        },
                        (error) => {
                            let errorMsg = t('location_failed');
                            let detailMsg = '';
                            let helpMsg = '';
                            
                            switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    errorMsg = t('location_permission_denied');
                                    detailMsg = t('location_permission_denied_detail');
                                    
                                    // 检查是否是HTTPS问题
                                    const isHttps = window.location.protocol === 'https:';
                                    const isLocal = window.location.hostname === 'localhost' || 
                                                   window.location.hostname === '127.0.0.1' || 
                                                   window.location.hostname === '::1';
                                    
                                    let helpMsg = '详细解决步骤：\n\n';
                                    
                                    if (!isHttps && !isLocal) {
                                        helpMsg += '⚠️ 重要：定位功能需要HTTPS连接（localhost除外）\n';
                                        helpMsg += `当前协议: ${window.location.protocol}\n`;
                                        helpMsg += `当前地址: ${window.location.hostname}\n\n`;
                                    }
                                    
                                    helpMsg += '方法1 - 通过地址栏（推荐）：\n';
                                    helpMsg += '1. 点击浏览器地址栏左侧的锁图标 🔒 或信息图标 ℹ️\n';
                                    helpMsg += '2. 找到"位置"或"定位"权限\n';
                                    helpMsg += '3. 选择"允许"或"询问"\n';
                                    helpMsg += '4. 刷新页面后重试\n\n';
                                    
                                    helpMsg += '方法2 - Chrome/Edge浏览器：\n';
                                    helpMsg += '1. 点击地址栏右侧的三个点菜单 ⋮\n';
                                    helpMsg += '2. 选择"设置"\n';
                                    helpMsg += '3. 左侧菜单选择"隐私和安全"\n';
                                    helpMsg += '4. 点击"网站设置"\n';
                                    helpMsg += '5. 找到"位置"选项\n';
                                    helpMsg += '6. 确保该网站被允许，或添加例外\n\n';
                                    
                                    helpMsg += '方法3 - 检查网站权限：\n';
                                    helpMsg += '1. 在地址栏输入: chrome://settings/content/location\n';
                                    helpMsg += '2. 查看"允许"列表，确保您的网站在其中\n';
                                    helpMsg += '3. 如果不在，点击"添加"并输入网站地址\n\n';
                                    
                                    helpMsg += '方法4 - 清除并重新授权：\n';
                                    helpMsg += '1. 在地址栏输入: chrome://settings/content/location\n';
                                    helpMsg += '2. 找到您的网站，点击右侧的删除图标\n';
                                    helpMsg += '3. 刷新页面，重新点击"获取当前位置"\n';
                                    helpMsg += '4. 在弹出的权限请求中选择"允许"\n\n';
                                    
                                    helpMsg += '如果以上方法都不行：\n';
                                    helpMsg += '- 检查Windows位置服务是否开启（已开启）\n';
                                    helpMsg += '- 尝试使用其他浏览器\n';
                                    helpMsg += '- 或手动输入GPS坐标';
                                    
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    errorMsg = t('location_unavailable');
                                    detailMsg = t('location_unavailable_detail');
                                    helpMsg = t('location_unavailable_help');
                                    break;
                                case error.TIMEOUT:
                                    errorMsg = t('location_timeout');
                                    detailMsg = t('location_timeout_detail');
                                    helpMsg = t('location_timeout_help');
                                    break;
                                default:
                                    errorMsg = t('location_failed');
                                    detailMsg = t('location_error_detail');
                                    helpMsg = t('location_error_help');
                            }
                            
                            // 显示详细的错误信息
                            const fullErrorMsg = `${errorMsg}\n\n${detailMsg}\n\n${helpMsg}`;
                            
                            // 创建更友好的错误提示对话框
                            const errorDialog = document.createElement('div');
                            errorDialog.style.cssText = `
                                position: fixed;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: rgba(0,0,0,0.5);
                                z-index: 30000;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                padding: 20px;
                            `;
                            
                            const errorContent = document.createElement('div');
                            errorContent.style.cssText = `
                                background: white;
                                border-radius: 10px;
                                padding: 25px;
                                max-width: 500px;
                                width: 100%;
                                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                                max-height: 80vh;
                                overflow-y: auto;
                            `;
                            
                            errorContent.innerHTML = `
                                <h3 style="margin-top: 0; color: #e74c3c; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
                                    ⚠️ ${errorMsg}
                                </h3>
                                <div style="margin-bottom: 15px; padding: 10px; background: #fadbd8; border-left: 4px solid #e74c3c; border-radius: 4px;">
                                    <div style="font-weight: bold; margin-bottom: 5px;">${detailMsg}</div>
                                </div>
                                <div style="margin-bottom: 15px; padding: 10px; background: #ebf5fb; border-left: 4px solid #3498db; border-radius: 4px; white-space: pre-line; font-size: 13px; line-height: 1.6;">
                                    ${helpMsg}
                                </div>
                                <div style="text-align: right;">
                                    <button id="error-dialog-ok" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;">
                                        ${t('got_it_short')}
                                    </button>
                                </div>
                            `;
                            
                            errorDialog.appendChild(errorContent);
                            document.body.appendChild(errorDialog);
                            
                            document.getElementById('error-dialog-ok').addEventListener('click', () => {
                                document.body.removeChild(errorDialog);
                            });
                            
                            // 点击背景关闭
                            errorDialog.addEventListener('click', (e) => {
                                if (e.target === errorDialog) {
                                    document.body.removeChild(errorDialog);
                                }
                            });
                            
                            getLocationBtn.disabled = false;
                            getLocationBtn.textContent = '📍 获取当前位置';
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 15000, // 增加到15秒
                            maximumAge: 0
                        }
                    );
                });
            } else if (getLocationBtn) {
                // 浏览器不支持定位功能
                getLocationBtn.style.display = 'none';
            } else {
                // 检查是否使用HTTPS（某些浏览器要求HTTPS才能使用定位）
                if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                    console.warn('定位功能可能需要HTTPS连接。当前协议:', window.location.protocol);
                }
            }

            // 保存按钮
            document.getElementById('gps-save-btn').addEventListener('click', async () => {
                // 从度分秒输入框读取值
                const latDeg = parseInt(document.getElementById('gps-lat-degrees').value);
                const latMin = parseInt(document.getElementById('gps-lat-minutes').value);
                const latSec = parseFloat(document.getElementById('gps-lat-seconds').value);
                const latDir = document.getElementById('gps-lat-direction').value;
                
                const lonDeg = parseInt(document.getElementById('gps-lon-degrees').value);
                const lonMin = parseInt(document.getElementById('gps-lon-minutes').value);
                const lonSec = parseFloat(document.getElementById('gps-lon-seconds').value);
                const lonDir = document.getElementById('gps-lon-direction').value;
                
                // 验证输入
                if (isNaN(latDeg) || isNaN(latMin) || isNaN(latSec) || 
                    isNaN(lonDeg) || isNaN(lonMin) || isNaN(lonSec)) {
                    alert(t('gps_input_incomplete'));
                    return;
                }
                
                if (latDeg < 0 || latDeg > 90 || latMin < 0 || latMin >= 60 || latSec < 0 || latSec >= 60) {
                    alert(t('gps_lat_format_error'));
                    return;
                }
                
                if (lonDeg < 0 || lonDeg > 180 || lonMin < 0 || lonMin >= 60 || lonSec < 0 || lonSec >= 60) {
                    alert(t('gps_lon_format_error'));
                    return;
                }
                
                // 转换为十进制度数（保留高精度）
                const latitude = dmsToDecimal(latDeg, latMin, latSec, latDir);
                const longitude = dmsToDecimal(lonDeg, lonMin, lonSec, lonDir);
                
                // 验证转换后的值
                if (latitude < -90 || latitude > 90) {
                    alert(t('gps_lat_range_error'));
                    return;
                }
                
                if (longitude < -180 || longitude > 180) {
                    alert(t('gps_lon_range_error'));
                    return;
                }
                
                try {
                    const result = await apiCall(`/nodes/${nodeId}/gps`, {
                        method: 'POST',
                        body: JSON.stringify({
                            latitude: latitude,
                            longitude: longitude
                        })
                    });
                    
                    if (result.success) {
                        const latDMS = decimalToDMS(latitude, true);
                        const lonDMS = decimalToDMS(longitude, false);
                        const successMsg = t('gps_set_success');
                        if (typeof showSuccess !== 'undefined') {
                            showSuccess(successMsg);
                        } else {
                            alert(successMsg);
                        }
                        dialog.remove();
                        // 刷新节点数据并重新渲染
                        if (typeof fetchRoads !== 'undefined') {
                            await fetchRoads();
                        }
                        if (typeof renderMap !== 'undefined') {
                            renderMap();
                        } else if (typeof safeRenderMap !== 'undefined') {
                            safeRenderMap();
                        }
                    } else {
                        alert(result.message || t('save_failed'));
                    }
                } catch (error) {
                    alert(t('save_failed') + ': ' + (error.message || t('unknown_error')));
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

        // 原有的 DOM 渲染函数（作为备用）
        function renderMapDOM() {
            const map = document.getElementById('map');

            // 自动恢复 Canvas 元素：如果 Canvas 丢失，重新创建它
            // 这确保了即使因为某些原因回退到 DOM 渲染，下次也有机会恢复到高性能的 Canvas 渲染
            let canvas = document.getElementById('map-canvas');
            if (!canvas && map) {
                canvas = document.createElement('canvas');
                canvas.id = 'map-canvas';
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.pointerEvents = 'auto';
                // 插入到 map 的第一个子元素位置（作为背景层）
                if (map.firstChild) {
                    map.insertBefore(canvas, map.firstChild);
                } else {
                    map.appendChild(canvas);
                }
                // 重置初始化标志，以便下次尝试初始化 Canvas
                canvasInitialized = false;
            }

            // 只有在确实没有任何数据且没有背景图时才显示提示
            // 如果数据正在加载中（比如刚上传了DXF文件），不显示这个提示
            if (nodes.length === 0 && edges.length === 0 && !mapBackground) {
                const loading = map.querySelector('.loading');
                // 检查是否有数据正在加载的标志（通过检查是否有其他内容来判断）
                const hasOtherContent = map.children.length > 0 && Array.from(map.children).some(
                    child => child.id === 'map-canvas' || child.className !== 'loading'
                );
                
                // 如果已经有其他内容（比如Canvas），说明可能正在渲染，不显示提示
                if (!hasOtherContent) {
                    if (!loading) {
                        const loadingDiv = document.createElement('div');
                        loadingDiv.className = 'loading';
                        loadingDiv.textContent = '请上传自定义地图或使用默认地图';
                        map.appendChild(loadingDiv);
                    }
                    return;
                }
            }
            
            // 如果有数据，清除所有 loading 提示
            if (nodes.length > 0 || edges.length > 0 || mapBackground) {
                const loadingElements = map.querySelectorAll('.loading');
                loadingElements.forEach(el => el.remove());
            }
            
            // 清除除 Canvas 外的所有元素
            Array.from(map.children).forEach(child => {
                if (child !== canvas && child.className !== 'loading') {
                    child.remove();
                }
            });

            // 注意：不要使用 map.innerHTML = ''，这会清除包括 Canvas 在内的所有内容
            // 我们只移除特定的子元素，或者如果在上面已经移除了，这里就不需要做什么了
            // map.innerHTML = ''; 
            
            // 确保 Canvas 仍然在 map 中（如果不在，添加回去）
            if (canvas && !map.contains(canvas)) {
                if (map.firstChild) {
                    map.insertBefore(canvas, map.firstChild);
                } else {
                    map.appendChild(canvas);
                }
            }

            // 将背景设置到 .map-wrapper 上，而不是 #map 上，这样旋转时背景不会跟着旋转
            const mapWrapper = document.querySelector('.map-wrapper');
            if (mapWrapper) {
                if (mapBackground) {
                    mapWrapper.style.backgroundImage = `url(${mapBackground})`;
                    mapWrapper.style.backgroundSize = 'contain';
                    mapWrapper.style.backgroundRepeat = 'no-repeat';
                    mapWrapper.style.backgroundPosition = 'center center';
                } else {
                    mapWrapper.style.backgroundImage = '';
                    mapWrapper.style.backgroundSize = '';
                    mapWrapper.style.backgroundRepeat = '';
                    mapWrapper.style.backgroundPosition = '';
                }
            }
            
            // #map 保持透明，让背景显示
            map.style.backgroundImage = '';
            map.style.backgroundColor = 'transparent';

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
                    } else {
                        // 默认颜色（确保恢复显示）
                        edgeEl.style.background = '#7f8c8d';
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
                // 根据道路类型过滤节点显示（只显示主路与主路或主路与支路相交的节点）
                if (!shouldShowNode(node)) {
                    // 尝试修复DOM模式下的断开问题：在隐藏节点处添加关节
                    // 仅当节点连接了道路时添加
                    const connectedEdges = edges.filter(e => e.start_node === node.id || e.end_node === node.id);
                    if (connectedEdges.length > 0) {
                        const joint = document.createElement('div');
                        joint.className = 'joint';
                        joint.style.left = `${node.x}px`;
                        joint.style.top = `${node.y}px`;
                        
                        // 尝试根据连接道路的状态设置颜色
                        // 这里简单取第一条连接道路的状态，虽然不一定完美，但比断开好
                        const firstEdge = connectedEdges[0];
                        const edgeStatus = monitorData.edge_status && monitorData.edge_status[firstEdge.id];
                        let jointColor = '#7f8c8d'; // 默认
                        let jointSize = '2px';

                        if (edgeStatus === 'construction') {
                            jointColor = '#f39c12';
                            jointSize = '5px';
                        } else if (edgeStatus === 'congested' || (firstEdge.congestion_coeff > 2.0)) {
                            jointColor = '#e74c3c';
                            jointSize = '4px';
                        } else if (firstEdge.congestion_coeff > 1.5) {
                            jointColor = '#e74c3c';
                        } else if (firstEdge.direction !== 'two-way') {
                            jointColor = '#e67e22';
                        }

                        joint.style.background = jointColor;
                        joint.style.width = jointSize;
                        joint.style.height = jointSize;
                        
                        map.appendChild(joint);
                    }
                    return;
                }
                
                const nodeEl = document.createElement('div');
                nodeEl.className = `node ${node.type}`;
                nodeEl.style.left = `${node.x}px`;
                nodeEl.style.top = `${node.y}px`;
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
                
                // 检查是否是隐藏的节点（在显示隐藏节点模式下）
                const isHiddenNode = showHiddenNodes && node.hasOwnProperty('is_visible') && node.is_visible === false;
                
                // 先重置样式（清除之前的拥堵样式）
                nodeEl.style.boxShadow = '';
                nodeEl.style.border = '';
                
                // 如果是隐藏节点，添加高亮样式
                if (isHiddenNode) {
                    nodeEl.classList.add('hidden-node');
                    nodeEl.style.opacity = '0.6'; // 半透明
                    nodeEl.style.border = '3px dashed #ff6b6b'; // 红色虚线边框
                    nodeEl.style.boxShadow = '0 0 15px rgba(255,107,107,0.8), 0 0 30px rgba(255,107,107,0.4)'; // 红色高亮
                    titleText += ' [已隐藏]';
                }
                
                if (nodeCongestion > 0) {
                    titleText += ` - ${congestionNames[nodeCongestion]}`;
                    // 根据拥堵级别添加视觉标识（隐藏节点的样式优先级更高）
                    if (!isHiddenNode) {
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
                }
                nodeEl.title = titleText;

                // 在圆形节点内部显示节点编号（只显示数字，去除"节点"前缀）
                const nodeNumber = node.name || node.id;
                if (nodeNumber) {
                    // 提取纯数字部分，去除"节点"等文字前缀
                    let displayNumber = String(nodeNumber);
                    // 移除"节点"前缀（如果存在）
                    displayNumber = displayNumber.replace(/^节点\s*/i, '').trim();
                    // 如果去除前缀后为空，或者需要进一步提取数字
                    // 尝试提取所有数字
                    const numberMatch = displayNumber.match(/\d+/);
                    if (numberMatch) {
                        displayNumber = numberMatch[0];
                    }
                    
                    // 创建文字元素
                    const numberSpan = document.createElement('span');
                    numberSpan.className = 'node-number';
                    numberSpan.textContent = displayNumber;
                    nodeEl.appendChild(numberSpan);
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
                }
                
                // 检查节点是否有GPS坐标
                const nodeHasGps = node.latitude !== undefined && node.latitude !== null && 
                                  node.longitude !== undefined && node.longitude !== null &&
                                  !isNaN(node.latitude) && !isNaN(node.longitude);
                
                // 在节点上添加GPS设置按钮（小图标）
                const gpsBtn = document.createElement('div');
                gpsBtn.className = 'node-gps-btn';
                gpsBtn.innerHTML = '📍';
                if (nodeHasGps && typeof decimalToDMS !== 'undefined') {
                    const latDMS = decimalToDMS(node.latitude, true);
                    const lonDMS = decimalToDMS(node.longitude, false);
                    gpsBtn.title = `GPS: ${latDMS.formatted}, ${lonDMS.formatted}`;
                } else if (nodeHasGps) {
                    gpsBtn.title = `GPS: ${node.latitude.toFixed(6)}, ${node.longitude.toFixed(6)}`;
                } else {
                    gpsBtn.title = t('click_gps_set');
                }
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
                    gpsBtn.style.filter = 'brightness(1.2)';
                    gpsBtn.style.boxShadow = '0 3px 6px rgba(0,0,0,0.6)';
                });
                
                gpsBtn.addEventListener('mouseleave', () => {
                    gpsBtn.style.filter = 'none';
                    gpsBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.4)';
                });
                
                gpsBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    await showGpsCalibrationDialog(node.id);
                });
                
                // 确保节点元素有正确的定位和overflow设置，以便GPS按钮能显示
                nodeEl.style.position = 'absolute';
                nodeEl.style.overflow = 'visible';
                
                // 根据全局显示状态设置GPS按钮的显示
                if (typeof window.showGpsIcons !== 'undefined' && !window.showGpsIcons) {
                    gpsBtn.style.display = 'none';
                }
                
                nodeEl.appendChild(gpsBtn);
                
                // 非编辑模式下，点击节点显示状态菜单（但排除GPS按钮）
                if (!editMode) {
                    nodeEl.style.cursor = 'pointer';
                    nodeEl.addEventListener('click', (e) => {
                        // 如果点击的是GPS按钮或其子元素，不显示菜单
                        if (e.target === gpsBtn || gpsBtn.contains(e.target)) {
                            return;
                        }
                        e.stopPropagation();
                        showNodeCongestionMenu(e, node, nodeCongestion);
                    });
                    // 添加悬停效果（已通过CSS实现，移除JS冲突代码）
                    /*
                    nodeEl.addEventListener('mouseenter', () => {
                        if (!editMode) {
                            nodeEl.style.transform = 'scale(1.3)';
                            nodeEl.style.transition = 'transform 0.2s';
                        }
                    });
                    nodeEl.addEventListener('mouseleave', () => {
                        if (!editMode) {
                            nodeEl.style.transform = 'scale(1)';
                        }
                    });
                    */
                }

                map.appendChild(nodeEl);
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
                let title = `${vehicle.id} - ${vehicle.type}\n状态: ${vehicle.status || 'moving'}`;
                if (vehicle.status === 'arrived' || vehicle.arrival_time) {
                    title += ' (已到达)';
                    // 已到达的车辆使用不同的样式（灰色边框）
                    vehicleEl.style.border = '2px solid #95a5a6';
                    vehicleEl.style.opacity = '0.7';
                }
                title += `\n${t('vehicle_start')} ${getNodeName(vehicle.start_node)}\n${t('vehicle_target')} ${getNodeName(vehicle.target_node)}`;
                if (vehicle.driver_id) {
                    title += `\n${t('vehicle_driver')} ${vehicle.driver_name || vehicle.driver_id}`;
                }
                if (vehicle.current_path && vehicle.current_path.length > 0) {
                    title += `\n${t('vehicle_path')} ${vehicle.current_path.length} ${t('vehicle_edges')}`;
                }
                if (vehicle.arrival_time) {
                    title += `\n${t('vehicle_arrival_time')} ${new Date(vehicle.arrival_time).toLocaleString()}`;
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
                log(t('success_render_vehicles').replace('{count}', renderedCount));
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

        let pendingRenderMap = false;
        function safeRenderMap() {
            if (pendingRenderMap) return;
            pendingRenderMap = true;
            
            requestAnimationFrame(() => {
                pendingRenderMap = false;
                try {
                    renderMap();
                    // 应用地图旋转和恢复缩放和平移状态
                    applyMapRotation(mapRotation);
                } catch (err) {
                    logError('renderMap 执行出错:', err);
                }
            });
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

                // 节点编号现在显示在圆形内部，拖动时会自动跟随节点移动，无需单独更新标签位置

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
            const congestionNames = {0: t('set_normal'), 1: t('set_light_congestion'), 2: t('set_medium_congestion'), 3: t('set_severe_congestion')};
            // 获取节点显示状态（默认显示）
            const isVisible = node.is_visible !== false;
            menu.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 10px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    ${node.name} (${node.id})
                </div>
                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 12px;">
                    ${t('current_status')} <strong style="color: #e67e22;">${congestionNames[congestionLevel] || t('set_normal')}</strong>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <button class="status-menu-btn" data-level="0" style="background: #2ecc71; ${congestionLevel === 0 ? 'border: 2px solid #27ae60; font-weight: bold;' : ''}">${t('set_normal')}</button>
                    <button class="status-menu-btn" data-level="1" style="background: #f39c12; ${congestionLevel === 1 ? 'border: 2px solid #e67e22; font-weight: bold;' : ''}">${t('set_light_congestion')}</button>
                    <button class="status-menu-btn" data-level="2" style="background: #e67e22; ${congestionLevel === 2 ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('set_medium_congestion')}</button>
                    <button class="status-menu-btn" data-level="3" style="background: #e74c3c; ${congestionLevel === 3 ? 'border: 2px solid #c0392b; font-weight: bold;' : ''}">${t('set_severe_congestion')}</button>
                </div>
                <div style="border-top: 1px solid #eee; margin: 12px 0; padding-top: 12px;">
                    <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 8px;">
                        ${t('visibility_settings')} <strong style="color: ${isVisible ? '#27ae60' : '#95a5a6'};">${isVisible ? t('show') : t('hide')}</strong>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <button class="visibility-menu-btn" data-visible="true" style="background: ${isVisible ? '#3498db' : '#95a5a6'}; ${isVisible ? 'border: 2px solid #2980b9; font-weight: bold;' : ''}">${t('show_node')}</button>
                        <button class="visibility-menu-btn" data-visible="false" style="background: ${!isVisible ? '#e74c3c' : '#95a5a6'}; ${!isVisible ? 'border: 2px solid #c0392b; font-weight: bold;' : ''}">${t('hide_node')}</button>
                    </div>
                </div>
            `;
            
            // 添加按钮样式（如果还没有）
            if (!document.getElementById('status-menu-style')) {
                const style = document.createElement('style');
                style.id = 'status-menu-style';
                style.textContent = `
                    .status-menu-btn, .visibility-menu-btn {
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
                    .status-menu-btn:hover, .visibility-menu-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
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
                    const level = parseInt(btn.getAttribute('data-level'));
                    await setNodeCongestion(node.id, level);
                    menu.remove();
                });
            });

            // 添加显示/隐藏按钮事件
            menu.querySelectorAll('.visibility-menu-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const isVisible = btn.getAttribute('data-visible') === 'true';
                    await toggleNodeVisibility(node.id, isVisible);
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
                    ${t('road_label')} ${edge.id}
                </div>
                <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 8px;">
                    ${startName} → ${endName}
                </div>
                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
                    ${t('current_direction')} <strong style="color: #3498db;">${directionNames[currentDirection] || currentDirection}</strong><br>
                    ${t('current_status')} <strong style="color: #e67e22;">${statusNames[currentStatus] || currentStatus}</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    <div style="font-size: 12px; font-weight: bold; margin-bottom: 6px; color: #2c3e50;">${t('set_direction')}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                        <button class="direction-menu-btn" data-direction="two-way" style="background: #3498db; ${currentDirection === 'two-way' ? 'border: 2px solid #2980b9; font-weight: bold;' : ''}">${t('direction_two_way')}</button>
                        <button class="direction-menu-btn" data-direction="reverse" style="background: #9b59b6; ${currentDirection === 'reverse' ? 'border: 2px solid #8e44ad; font-weight: bold;' : ''}">${t('direction_reverse')}</button>
                        <button class="direction-menu-btn" data-direction="north" style="background: #e67e22; ${currentDirection === 'north' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_north')}</button>
                        <button class="direction-menu-btn" data-direction="south" style="background: #e67e22; ${currentDirection === 'south' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_south')}</button>
                        <button class="direction-menu-btn" data-direction="east" style="background: #e67e22; ${currentDirection === 'east' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_east')}</button>
                        <button class="direction-menu-btn" data-direction="west" style="background: #e67e22; ${currentDirection === 'west' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_west')}</button>
                        <button class="direction-menu-btn" data-direction="northeast" style="background: #e67e22; ${currentDirection === 'northeast' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_northeast')}</button>
                        <button class="direction-menu-btn" data-direction="northwest" style="background: #e67e22; ${currentDirection === 'northwest' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_northwest')}</button>
                        <button class="direction-menu-btn" data-direction="southeast" style="background: #e67e22; ${currentDirection === 'southeast' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_southeast')}</button>
                        <button class="direction-menu-btn" data-direction="southwest" style="background: #e67e22; ${currentDirection === 'southwest' ? 'border: 2px solid #d35400; font-weight: bold;' : ''}">${t('direction_southwest')}</button>
                    </div>
                </div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
                    <div style="font-size: 12px; font-weight: bold; margin-bottom: 6px; color: #2c3e50;">${t('set_status')}</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <button class="status-menu-btn" data-status="normal" style="background: #2ecc71; ${currentStatus === 'normal' ? 'border: 2px solid #27ae60; font-weight: bold;' : ''}">${t('set_normal')}</button>
                        <button class="status-menu-btn" data-status="congested" style="background: #e74c3c; ${currentStatus === 'congested' ? 'border: 2px solid #c0392b; font-weight: bold;' : ''}">${t('set_congested')}</button>
                        <button class="status-menu-btn" data-status="construction" style="background: #f39c12; ${currentStatus === 'construction' ? 'border: 2px solid #e67e22; font-weight: bold;' : ''}">${t('set_construction')}</button>
                        <button class="status-menu-btn" data-status="closed" style="background: #95a5a6; ${currentStatus === 'closed' ? 'border: 2px solid #7f8c8d; font-weight: bold;' : ''}">${t('set_closed')}</button>
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
                'normal': t('set_normal'),
                'congested': t('set_congested'),
                'construction': t('set_construction'),
                'closed': t('set_closed')
            };

            menu.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 10px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    ${t('road_label')} ${edge.id}
                </div>
                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 12px;">
                    ${t('current_status')} <strong style="color: #e67e22;">${statusNames[currentStatus]}</strong>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <button class="status-menu-btn" data-status="normal" style="background: #2ecc71; ${currentStatus === 'normal' ? 'border: 2px solid #27ae60; font-weight: bold;' : ''}">${t('set_normal')}</button>
                    <button class="status-menu-btn" data-status="congested" style="background: #e74c3c; ${currentStatus === 'congested' ? 'border: 2px solid #c0392b; font-weight: bold;' : ''}">${t('set_congested')}</button>
                    <button class="status-menu-btn" data-status="construction" style="background: #f39c12; ${currentStatus === 'construction' ? 'border: 2px solid #e67e22; font-weight: bold;' : ''}">${t('set_construction')}</button>
                    <button class="status-menu-btn" data-status="closed" style="background: #95a5a6; ${currentStatus === 'closed' ? 'border: 2px solid #7f8c8d; font-weight: bold;' : ''}">${t('set_closed')}</button>
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
                console.warn(`⚠️ [前端渲染] 车辆 ${vehicle.id}: current_path为空，planned_path_edges数量=${vehicle.planned_path_edges?.length || 0}`);
                return;
            }
            
            // 调试信息已移除
            
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
                const edgeId = edge.id || edge.edge_id || `边${i}`;
                const startNode = nodes.find(n => n.id === startNodeId);
                const endNode = nodes.find(n => n.id === endNodeId);

                if (!startNode || !endNode) {
                    console.warn(`⚠️ [前端渲染] 车辆 ${vehicle.id}: 边 ${i+1} (${edgeId}): 无法找到节点，startNode=${startNodeId}, endNode=${endNodeId}`);
                    continue; // 跳过无法找到节点的边
                }

                const dx = endNode.x - startNode.x;
                const dy = endNode.y - startNode.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                const isVertical = Math.abs(dx) < Math.abs(dy);
                const length_m = edge.length_m || edge.length || 0;
                
                // 调试信息已移除
                
                // 如果长度为0或太小，跳过这条边
                if (length < 0.1) {
                    console.warn(`  ⚠️ [前端渲染] 车辆 ${vehicle.id}: 跳过长度过短的边 ${edgeId}: ${startNodeId} -> ${endNodeId}, 长度: ${length}`);
                    continue;
                }

                const pathEl = document.createElement('div');
                pathEl.className = 'path';
                // 确保路径样式正确（防止变粗）
                pathEl.style.height = '3px';
                pathEl.style.background = '#f39c12';
                pathEl.style.opacity = '0.8';
                pathEl.style.zIndex = '15';
                pathEl.style.pointerEvents = 'none'; /* 允许点击事件穿透到道路，不影响道路状态编辑 */
                pathEl.style.transformOrigin = '0 50%'; // 设置旋转原点为左边中心，确保旋转正确
                
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

        // 更新车辆列表 - 性能优化版(DOM Diffing)
        function updateVehicleList(sortByEfficiency = false) {
            const vehicleList = document.getElementById('vehicle-list');
            if (!vehicleList) return;

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

            // 清理旧的 loading 提示
            const loadingEl = vehicleList.querySelector('.loading');
            if (loadingEl) vehicleList.innerHTML = '';

            // 用于快速查找当前批次的车辆
            const currentIds = new Set(displayVehicles.map(v => String(v.id)));

            // 移除已经不存在的车辆DOM
            Array.from(vehicleList.children).forEach(item => {
                const id = item.dataset.id;
                if (id && !currentIds.has(id)) {
                    item.remove();
                }
            });

            // 增量更新或新建
            displayVehicles.forEach((vehicle, index) => {
                const vid = String(vehicle.id);
                let vehicleItem = vehicleList.querySelector(`.vehicle-item[data-id="${vid}"]`);

                let driverInfo = '';
                if (vehicle.driver_id) {
                    driverInfo = `<div class="vehicle-info" style="color: #27ae60;">👤 司机: ${vehicle.driver_name || vehicle.driver_id}</div>`;
                }
                
                const eff = vehicle.efficiency_score !== undefined && vehicle.efficiency_score !== null
                    ? `${vehicle.efficiency_score.toFixed(1)}`
                    : 'N/A';

                const leftHtml = `<strong>${vehicle.id}</strong> - ${vehicle.type}
                    <div class="vehicle-info">载重: ${vehicle.weight}吨 | 宽度: ${vehicle.width}米</div>
                    ${driverInfo}
                    <div class="vehicle-info">状态: ${vehicle.status || 'moving'}</div>`;

                const rightHtml = `起点: ${getNodeName(vehicle.start_node)}<br>目标: ${getNodeName(vehicle.target_node)}<br><small>效率: ${eff}</small>`;

                if (!vehicleItem) {
                    vehicleItem = document.createElement('div');
                    vehicleItem.className = 'vehicle-item';
                    vehicleItem.dataset.id = vid;

                    const leftDiv = document.createElement('div');
                    leftDiv.className = 'v-left';
                    leftDiv.innerHTML = leftHtml;

                    const rightDiv = document.createElement('div');
                    rightDiv.className = 'v-right';
                    rightDiv.innerHTML = rightHtml;

                    vehicleItem.appendChild(leftDiv);
                    vehicleItem.appendChild(rightDiv);
                } else {
                    // 更新已存在节点
                    const leftDiv = vehicleItem.querySelector('.v-left') || vehicleItem.children[0];
                    const rightDiv = vehicleItem.querySelector('.v-right') || vehicleItem.children[1];
                    
                    // 仅当内容改变时才触发 innerHTML
                    if (leftDiv.innerHTML !== leftHtml) leftDiv.innerHTML = leftHtml;
                    if (rightDiv.innerHTML !== rightHtml) rightDiv.innerHTML = rightHtml;
                }

                // 修正排序位置
                if (vehicleList.children[index] !== vehicleItem) {
                    vehicleList.insertBefore(vehicleItem, vehicleList.children[index]);
                }
            });
        }

        // 根据节点ID获取节点名称
        function getNodeName(nodeId) {
            const node = nodes.find(n => n.id === nodeId);
            return node ? node.name : nodeId;
        }

        // 更新节点列表 - 性能优化版(DOM Diffing)
        function updateNodeList() {
            const nodeList = document.getElementById('node-list');
            if (!nodeList) return;

            if (nodes.length === 0) {
                if (!nodeList.querySelector('.loading')) {
                    nodeList.innerHTML = '<div class="loading">暂无节点，请添加节点</div>';
                }
                return;
            }

            // 清理旧的 loading 提示
            const loadingEl = nodeList.querySelector('.loading');
            if (loadingEl) nodeList.innerHTML = '';

            // 快速查找当前批次的节点
            const currentIds = new Set(nodes.map(n => String(n.id)));

            // 移除已删除的节点 DOM
            Array.from(nodeList.children).forEach(item => {
                const id = item.dataset.id;
                if (id && !currentIds.has(id)) {
                    item.remove();
                }
            });

            // 增量更新或新建
            nodes.forEach((node, index) => {
                const nid = String(node.id);
                let nodeItem = nodeList.querySelector(`.node-item[data-id="${nid}"]`);

                const nodeTypeObj = nodeTypes[node.type] || {name: node.type, color: '#999'};
                
                // 为了防止覆盖用户正在输入的名称，此处把不需要强行覆盖的动态输入框独立出去
                const infoHtml = `${nodeTypeObj.name} - (${Math.round(node.x)}, ${Math.round(node.y)})`;

                if (!nodeItem) {
                    nodeItem = document.createElement('div');
                    nodeItem.className = 'node-item';
                    nodeItem.dataset.id = nid;
                    nodeItem.innerHTML = `
                        <div style="display:flex; align-items:center;">
                            <div class="node-item-color" style="background: ${nodeTypeObj.color}"></div>
                            <div class="node-item-info" style="flex:1;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <input type="text" class="node-name-input" data-id="${nid}" 
                                           value="${escapeHtml(node.name)}" 
                                           style="flex:1; padding:4px 8px; border:1px solid #ddd; border-radius:4px; font-weight:bold;"
                                           placeholder="节点名称">
                                    <span style="color:#999; font-size:12px;">(${nid})</span>
                                </div>
                                <span class="vehicle-info node-info-text">${infoHtml}</span>
                            </div>
                        </div>
                        <div class="node-item-actions" style="display:flex; gap:5px;">
                            <button class="save-node-name" data-id="${nid}" style="background:#27ae60; padding:4px 8px; font-size:12px;">保存</button>
                            <button class="delete-node" data-id="${nid}" style="background:#e74c3c; padding:4px 8px; font-size:12px;">删除</button>
                        </div>
                    `;

                    // 绑定事件
                    const input = nodeItem.querySelector('.node-name-input');
                    input.addEventListener('keypress', function(e) {
                        if (e.key === 'Enter') saveNodeName(nid, this.value);
                    });
                    input.addEventListener('blur', function() {
                        const n = nodes.find(nn => String(nn.id) === nid);
                        if (n && this.value !== n.name) saveNodeName(nid, this.value);
                    });

                    const saveBtn = nodeItem.querySelector('.save-node-name');
                    saveBtn.addEventListener('click', function() {
                        const inputEl = nodeItem.querySelector('.node-name-input');
                        if (inputEl) saveNodeName(nid, inputEl.value);
                    });

                    const delBtn = nodeItem.querySelector('.delete-node');
                    delBtn.addEventListener('click', function() {
                        if (confirm(`确定要删除此节点吗？该操作同时会删除连接该节点的所有道路。`)) {
                            deleteNode(nid);
                        }
                    });

                    // 插入到列表的正确位置
                    if (index >= nodeList.children.length) {
                        nodeList.appendChild(nodeItem);
                    } else {
                        nodeList.insertBefore(nodeItem, nodeList.children[index]);
                    }
                } else {
                    // 已存在，仅更新受系统改动的只读信息
                    const infoTextNode = nodeItem.querySelector('.node-info-text');
                    if (infoTextNode && infoTextNode.innerHTML !== infoHtml) {
                        infoTextNode.innerHTML = infoHtml;
                    }
                    const colorDiv = nodeItem.querySelector('.node-item-color');
                    if (colorDiv && colorDiv.style.background !== nodeTypeObj.color) {
                        colorDiv.style.background = nodeTypeObj.color;
                    }
                    // 特别地：如果在程序内部改变了节点的名称，但目前输入框未处于焦点，则静默更新它
                    const inputEl = nodeItem.querySelector('.node-name-input');
                    if (inputEl && document.activeElement !== inputEl && inputEl.value !== node.name) {
                        inputEl.value = node.name;
                    }

                    // 修正排序位置
                    if (nodeList.children[index] !== nodeItem) {
                        nodeList.insertBefore(nodeItem, nodeList.children[index]);
                    }
                }
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

        // 切换节点显示/隐藏状态
        async function toggleNodeVisibility(nodeId, isVisible) {
            try {
                const result = await apiCall(`/nodes/${nodeId}/visibility`, {
                    method: 'POST',
                    body: JSON.stringify({ is_visible: isVisible })
                });

                if (result.success) {
                    // 更新本地节点数据
                    const node = nodes.find(n => n.id === nodeId);
                    if (node) {
                        node.is_visible = isVisible;
                    }
                    // 重新渲染地图
                    safeRenderMap();
                    // 更新节点列表显示
                    updateNodeList();
                    showSuccess(isVisible ? '节点已显示' : '节点已隐藏');
                } else {
                    showError(result.message || '更新节点显示状态失败');
                }
            } catch (error) {
                logError('切换节点显示状态失败:', error);
                showError('切换节点显示状态时发生错误');
            }
        }

        // 删除节点（调用后端）
        async function deleteNode(nodeId) {
            if (confirm(t('confirm_delete_node'))) {
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

        // 缓存路网结构哈希，避免不必要的重新渲染引发下拉框闪缩失去焦点
        let lastRoadTopologyHash = '';

        // 更新路网信息 - 性能优化版(DOM Diffing)
        function updateRoadInfo() {
            const roadStats = document.getElementById('road-stats');
            const roadList = document.getElementById('road-list');
            const congestionNodeSelect = document.getElementById('congestion-node');
            const statusEdgeSelect = document.getElementById('status-edge');
            const congestionEdgeSelect = document.getElementById('congestion-edge');
            const directionEdgeSelect = document.getElementById('direction-edge');

            if (edges.length === 0) {
                if (roadStats && !roadStats.querySelector('.loading')) {
                    roadStats.innerHTML = '<div class="loading">正在加载路网数据...</div>';
                }
                if (roadList && !roadList.querySelector('.loading')) {
                    roadList.innerHTML = '<div class="loading">正在加载道路数据...</div>';
                }
                return;
            }

            // 计算拓扑结构哈希，如果不变则跳过下拉菜单重绘
            const currentTopologyHash = edges.map(e => e.id).join(',') + '|' + nodes.map(n => n.id).join(',');
            const topologyChanged = currentTopologyHash !== lastRoadTopologyHash;
            lastRoadTopologyHash = currentTopologyHash;

            if (topologyChanged) {
                // 填充节点选择框（用于节点拥堵控制）
                if (congestionNodeSelect) {
                    const currentVal = congestionNodeSelect.value;
                    congestionNodeSelect.innerHTML = '<option value="">请选择节点</option>';
                    nodes.forEach(node => {
                        const option = document.createElement('option');
                        option.value = node.id;
                        option.textContent = `${node.name} (${node.id})`;
                        congestionNodeSelect.appendChild(option);
                    });
                    if (currentVal) congestionNodeSelect.value = currentVal;
                }

                const populateEdgeSelect = (selectEl) => {
                    if (!selectEl) return;
                    const currentVal = selectEl.value;
                    selectEl.innerHTML = '<option value="">请选择道路</option>';
                    edges.forEach(edge => {
                        const option = document.createElement('option');
                        option.value = edge.id;
                        option.textContent = edge.id;
                        selectEl.appendChild(option);
                    });
                    if (currentVal) selectEl.value = currentVal;
                };

                populateEdgeSelect(statusEdgeSelect);
                populateEdgeSelect(congestionEdgeSelect);
                populateEdgeSelect(directionEdgeSelect);
            }

            const totalEdges = edges.length;
            const congestedEdges = edges.filter(edge => edge.congestion_coeff > 1.5).length;
            const closedEdges = edges.filter(edge => !edge.is_available).length;
            const oneWayEdges = edges.filter(edge => edge.direction !== 'two-way').length;
            const constructionEdges = edges.filter(edge => {
                const status = monitorData.edge_status && monitorData.edge_status[edge.id];
                return status === 'construction';
            }).length;

            const statsHtml = `
                <div class="status-card"><strong>总道路数:</strong> ${totalEdges}</div>
                <div class="status-card ${congestedEdges > 0 ? 'congested' : ''}"><strong>拥堵道路:</strong> ${congestedEdges}</div>
                <div class="status-card ${constructionEdges > 0 ? 'construction' : ''}"><strong>占道施工:</strong> ${constructionEdges}</div>
                <div class="status-card ${closedEdges > 0 ? 'closed' : ''}"><strong>封闭道路:</strong> ${closedEdges}</div>
                <div class="status-card"><strong>单向道路:</strong> ${oneWayEdges}</div>
            `;
            if (roadStats && roadStats.innerHTML !== statsHtml) {
                roadStats.innerHTML = statsHtml;
            }

            if (!roadList) return;

            const loadingEl = roadList.querySelector('.loading');
            if (loadingEl) roadList.innerHTML = '';

            const currentIds = new Set(edges.map(e => String(e.id)));
            Array.from(roadList.children).forEach(item => {
                const id = item.dataset.id;
                if (id && !currentIds.has(id)) {
                    item.remove();
                }
            });

            edges.forEach((edge, index) => {
                const eid = String(edge.id);
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
                
                const className = `status-card road-item ${congestion > 1.5 ? 'congested' : ''} ${!available ? 'closed' : ''} ${edgeStatus === 'construction' ? 'construction' : ''}`;
                const edgeName = edge.name || edge.id;
                
                const infoHtml = `
                    ${startNode ? startNode.name : edge.start_node} → ${endNode ? endNode.name : edge.end_node}<br>
                    长度: ${edge.length}m | 最大承重: ${edge.max_weight}t | 最大宽度: ${edge.max_width}m<br>
                    拥堵系数: ${congestion.toFixed(2)} | 方向: ${directionName} | 状态: ${statusName}
                `;

                let roadItem = roadList.querySelector(`.road-item[data-id="${eid}"]`);
                if (!roadItem) {
                    roadItem = document.createElement('div');
                    roadItem.className = className;
                    roadItem.dataset.id = eid;
                    roadItem.innerHTML = `
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                            <input type="text" class="edge-name-input" data-id="${eid}" 
                                   value="${escapeHtml(edgeName)}" 
                                   style="flex:1; padding:4px 8px; border:1px solid #ddd; border-radius:4px; font-weight:bold;"
                                   placeholder="道路名称">
                            <span style="color:#999; font-size:12px;">(${eid})</span>
                            <button class="save-edge-name" data-id="${eid}" style="background:#27ae60; padding:4px 8px; font-size:12px;">保存</button>
                        </div>
                        <div class="edge-info-text" style="font-size:12px; color:#666;">
                            ${infoHtml}
                        </div>
                    `;
                    
                    const saveBtn = roadItem.querySelector('.save-edge-name');
                    const inputEl = roadItem.querySelector('.edge-name-input');
                    
                    const doSave = () => {
                        if (inputEl) saveEdgeName(eid, inputEl.value);
                    };
                    
                    if (saveBtn) saveBtn.addEventListener('click', doSave);
                    if (inputEl) {
                        inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') doSave(); });
                        inputEl.addEventListener('blur', () => {
                            const eObj = edges.find(ee => String(ee.id) === eid);
                            if (eObj && inputEl.value !== (eObj.name || eObj.id)) doSave();
                        });
                    }

                    if (index >= roadList.children.length) {
                        roadList.appendChild(roadItem);
                    } else {
                        roadList.insertBefore(roadItem, roadList.children[index]);
                    }
                } else {
                    if (roadItem.className !== className) {
                        roadItem.className = className;
                    }
                    const infoTextNode = roadItem.querySelector('.edge-info-text');
                    if (infoTextNode && infoTextNode.innerHTML !== infoHtml) {
                        infoTextNode.innerHTML = infoHtml;
                    }
                    const inputEl = roadItem.querySelector('.edge-name-input');
                    if (inputEl && document.activeElement !== inputEl && inputEl.value !== edgeName) {
                        inputEl.value = edgeName;
                    }

                    if (roadList.children[index] !== roadItem) {
                        roadList.insertBefore(roadItem, roadList.children[index]);
                    }
                }
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
                            <small style="color:#666;">${t('position_label')} (${Math.round(label.x)}, ${Math.round(label.y)})</small>
                        </div>
                        <div style="display:flex; gap:5px;">
                            <button class="edit-map-label" data-id="${label.id}" style="background:#3498db; padding:4px 8px; font-size:12px;">${t('edit_text_box')}</button>
                            <button class="delete-map-label" data-id="${label.id}" style="background:#e74c3c; padding:4px 8px; font-size:12px;">${t('delete_text_box')}</button>
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
            const text = prompt(t('enter_text_content'));
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
                    showSuccess(t('text_box_added'));
                } else {
                    showError(result.message || t('text_box_add_failed'));
                }
            } catch (error) {
                logError('添加地图文字框失败:', error);
                showError(t('text_box_add_error'));
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
                <h3 style="margin-top:0;">${t('edit_text_box_title')}</h3>
                <div style="margin-bottom:10px;">
                    <label>${t('label_text')}</label>
                    <input type="text" id="label-text" value="${escapeHtml(label.text)}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>${t('font_size')}</label>
                        <input type="number" id="label-font-size" value="${label.font_size || 14}" min="8" max="72" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('font_family')}</label>
                        <select id="label-font-family" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="Arial" ${label.font_family === 'Arial' ? 'selected' : ''}>Arial</option>
                            <option value="Microsoft YaHei" ${label.font_family === 'Microsoft YaHei' ? 'selected' : ''}>微软雅黑</option>
                            <option value="SimSun" ${label.font_family === 'SimSun' ? 'selected' : ''}>宋体</option>
                            <option value="SimHei" ${label.font_family === 'SimHei' ? 'selected' : ''}>黑体</option>
                        </select>
                    </div>
                    <div>
                        <label>${t('font_weight')}</label>
                        <select id="label-font-weight" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="normal" ${label.font_weight === 'normal' ? 'selected' : ''}>${t('font_weight_normal')}</option>
                            <option value="bold" ${label.font_weight === 'bold' ? 'selected' : ''}>${t('font_weight_bold')}</option>
                        </select>
                    </div>
                    <div>
                        <label>${t('rotation_angle')}</label>
                        <input type="number" id="label-rotation" value="${label.rotation || 0}" min="0" max="360" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>${t('label_color')}</label>
                        <input type="color" id="label-color" value="${label.color || '#000000'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('label_bg_color')}</label>
                        <input type="color" id="label-bg-color" value="${label.background_color && label.background_color !== 'transparent' ? label.background_color : '#ffffff'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('label_border_color')}</label>
                        <input type="color" id="label-border-color" value="${label.border_color && label.border_color !== 'transparent' ? label.border_color : '#cccccc'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('opacity')}</label>
                        <input type="range" id="label-opacity" value="${(label.opacity !== undefined ? label.opacity : 1.0) * 100}" min="0" max="100" style="width:100%;">
                        <span id="opacity-value">${Math.round((label.opacity !== undefined ? label.opacity : 1.0) * 100)}%</span>
                    </div>
                </div>
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <button id="save-label-btn" style="flex:1; padding:10px; background:#27ae60; color:white; border:none; border-radius:4px; cursor:pointer;">${t('save')}</button>
                    <button id="cancel-label-btn" style="flex:1; padding:10px; background:#95a5a6; color:white; border:none; border-radius:4px; cursor:pointer;">${t('cancel')}</button>
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
                        showSuccess(t('text_box_updated'));
                        document.body.removeChild(form);
                    } else {
                        showError(result.message || t('text_box_update_failed'));
                    }
                } catch (error) {
                    logError('更新地图文字框失败:', error);
                    showError(t('text_box_update_error'));
                }
            });

            // 取消
            document.getElementById('cancel-label-btn').addEventListener('click', () => {
                document.body.removeChild(form);
            });
        }

        // 删除地图文字框
        async function deleteMapLabel(labelId) {
            if (!confirm(t('confirm_delete_text_box'))) return;

            try {
                const result = await apiCall(`/map-labels/${labelId}`, {
                    method: 'DELETE'
                });

                if (result.success) {
                    mapTextLabels = mapTextLabels.filter(l => l.id !== labelId);
                    updateMapLabelsList();
                    safeRenderMap();
                    showSuccess(t('text_box_deleted'));
                } else {
                    showError(result.message || t('text_box_delete_failed'));
                }
            } catch (error) {
                logError('删除地图文字框失败:', error);
                showError(t('text_box_delete_error'));
            }
        }

        // 在地图上编辑节点名称和格式
        function editNodeNameOnMap(node) {
            const currentName = node.name || node.id;
            
            // 创建编辑表单
            const form = document.createElement('div');
            form.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.3); z-index:10000; min-width:400px; max-height:80vh; overflow-y:auto;';
            form.innerHTML = `
                <h3 style="margin-top:0;">${t('edit_node_name')} (${node.id})</h3>
                <div style="margin-bottom:10px;">
                    <label>${t('node_name_label')}</label>
                    <input type="text" id="node-name-input" value="${escapeHtml(currentName)}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>${t('font_size')}</label>
                        <input type="number" id="node-font-size" value="${node.label_font_size || 10}" min="8" max="72" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('font_family')}</label>
                        <select id="node-font-family" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="Arial" ${(node.label_font_family || 'Arial') === 'Arial' ? 'selected' : ''}>Arial</option>
                            <option value="Microsoft YaHei" ${node.label_font_family === 'Microsoft YaHei' ? 'selected' : ''}>微软雅黑</option>
                            <option value="SimSun" ${node.label_font_family === 'SimSun' ? 'selected' : ''}>宋体</option>
                            <option value="SimHei" ${node.label_font_family === 'SimHei' ? 'selected' : ''}>黑体</option>
                        </select>
                    </div>
                    <div>
                        <label>${t('font_weight')}</label>
                        <select id="node-font-weight" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="normal" ${(node.label_font_weight || 'normal') === 'normal' ? 'selected' : ''}>${t('font_weight_normal')}</option>
                            <option value="bold" ${node.label_font_weight === 'bold' ? 'selected' : ''}>${t('font_weight_bold')}</option>
                        </select>
                    </div>
                    <div>
                        <label>${t('padding')}</label>
                        <input type="number" id="node-padding" value="${node.label_padding || 2}" min="0" max="20" step="1" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>${t('label_color')}</label>
                        <input type="color" id="node-color" value="${node.label_color || '#000000'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('label_bg_color')}</label>
                        <input type="color" id="node-bg-color" value="${node.label_background_color && node.label_background_color !== 'transparent' ? node.label_background_color : '#ffffff'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('label_border_color')}</label>
                        <input type="color" id="node-border-color" value="${node.label_border_color && node.label_border_color !== 'transparent' ? node.label_border_color : '#cccccc'}" style="width:100%; padding:4px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('border_width')}</label>
                        <input type="number" id="node-border-width" value="${node.label_border_width || 0}" min="0" max="5" step="1" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                </div>
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <button id="save-node-btn" style="flex:1; padding:10px; background:#27ae60; color:white; border:none; border-radius:4px; cursor:pointer;">${t('save')}</button>
                    <button id="cancel-node-btn" style="flex:1; padding:10px; background:#95a5a6; color:white; border:none; border-radius:4px; cursor:pointer;">${t('cancel')}</button>
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
                        showSuccess(t('update_node_success'));
                        document.body.removeChild(form);
                    } else {
                        showError(result.message || t('update_node_error'));
                    }
                } catch (error) {
                    logError('更新节点失败:', error);
                    showError(t('update_node_error_msg'));
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
                <h3 style="margin-top:0;">${t('edit_edge_name')} (${edge.id})</h3>
                <div style="margin-bottom:10px;">
                    <label>${t('edge_name_label')}</label>
                    <input type="text" id="edge-name-input" value="${escapeHtml(currentName)}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                        <label>${t('font_size')}</label>
                        <input type="number" id="edge-font-size" value="${edge.label_font_size || 7}" min="6" max="72" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                    </div>
                    <div>
                        <label>${t('font_family')}</label>
                        <select id="edge-font-family" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="Arial" ${(edge.label_font_family || 'Arial') === 'Arial' ? 'selected' : ''}>Arial</option>
                            <option value="Microsoft YaHei" ${edge.label_font_family === 'Microsoft YaHei' ? 'selected' : ''}>微软雅黑</option>
                            <option value="SimSun" ${edge.label_font_family === 'SimSun' ? 'selected' : ''}>宋体</option>
                            <option value="SimHei" ${edge.label_font_family === 'SimHei' ? 'selected' : ''}>黑体</option>
                        </select>
                    </div>
                    <div>
                        <label>${t('font_weight')}</label>
                        <select id="edge-font-weight" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <option value="normal" ${(edge.label_font_weight || 'normal') === 'normal' ? 'selected' : ''}>${t('font_weight_normal')}</option>
                            <option value="bold" ${edge.label_font_weight === 'bold' ? 'selected' : ''}>${t('font_weight_bold')}</option>
                        </select>
                    </div>
                    <div>
                        <label>${t('padding')}</label>
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
                    <button id="save-edge-btn" style="flex:1; padding:10px; background:#27ae60; color:white; border:none; border-radius:4px; cursor:pointer;">${t('save')}</button>
                    <button id="cancel-edge-btn" style="flex:1; padding:10px; background:#95a5a6; color:white; border:none; border-radius:4px; cursor:pointer;">${t('cancel')}</button>
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
                        showSuccess(t('update_edge_success'));
                        document.body.removeChild(form);
                    } else {
                        showError(result.message || t('update_edge_error'));
                    }
                } catch (error) {
                    logError('更新道路失败:', error);
                    showError(t('update_edge_error_msg'));
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

        // 更新监控数据区与调度结果展示（显示效率分） - 性能优化版
        function updateMonitorData() {
            const monitorDataEl = document.getElementById('monitor-data');
            const dispatchResultsEl = document.getElementById('dispatch-results');

            if (!monitorData.edge_congestion) {
                // 仅初始加载时覆盖
                if (!monitorDataEl.querySelector('.loading') && !monitorDataEl.children.length) {
                    monitorDataEl.innerHTML = '<div class="loading">正在加载监控数据...</div>';
                }
                return;
            }

            let congestedRoads = Object.keys(monitorData.edge_congestion)
                .filter(edgeId => monitorData.edge_congestion[edgeId] > 1.5);

            let closedRoads = Object.keys(monitorData.edge_available)
                .filter(edgeId => !monitorData.edge_available[edgeId]);

            let maxQueue = Math.max(...Object.values(monitorData.entrance_queue || {}), 0);

            const newMonitorHtml = `
                <div class="status-card"><strong>拥堵道路:</strong> ${congestedRoads.length > 0 ? congestedRoads.join(', ') : '无'}</div>
                <div class="status-card"><strong>封闭道路:</strong> ${closedRoads.length > 0 ? closedRoads.join(', ') : '无'}</div>
                <div class="status-card"><strong>进场口排队峰值:</strong> ${maxQueue}辆</div>
            `;
            if (monitorDataEl.innerHTML !== newMonitorHtml) {
                monitorDataEl.innerHTML = newMonitorHtml;
            }

            // 调度结果：DOM Diff 增量更新
            const validVehicles = vehicles.filter(v => v.assigned_entrance || v.current_path);

            if (validVehicles.length === 0) {
                if (!dispatchResultsEl.querySelector('.loading')) {
                    dispatchResultsEl.innerHTML = '<div class="loading">暂无调度结果</div>';
                }
            } else {
                // 清理 Loading 或不相关的结构
                if (dispatchResultsEl.querySelector('.loading')) {
                    dispatchResultsEl.innerHTML = '';
                }

                const currentIds = new Set(validVehicles.map(v => String(v.id)));
                Array.from(dispatchResultsEl.children).forEach(item => {
                    const id = item.dataset.id;
                    if (id && !currentIds.has(id)) item.remove();
                });

                validVehicles.forEach((vehicle, index) => {
                    const vid = String(vehicle.id);
                    let resultItem = dispatchResultsEl.querySelector(`.status-card[data-id="${vid}"]`);

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

                    const newContent = `
                        <strong>${vehicle.id}</strong> - ${vehicle.type}<br>
                        起点: ${getNodeName(vehicle.start_node)} | 目标: ${getNodeName(vehicle.target_node)}<br>
                        路径: ${pathText || '未规划'}<br>
                        预计通行时间: ${estimatedTime}<br>
                        效率评分: ${eff}
                    `;

                    if (!resultItem) {
                        resultItem = document.createElement('div');
                        resultItem.className = 'status-card';
                        resultItem.dataset.id = vid;
                        resultItem.innerHTML = newContent;
                    } else {
                        if (resultItem.innerHTML !== newContent) {
                            resultItem.innerHTML = newContent;
                        }
                    }

                    if (dispatchResultsEl.children[index] !== resultItem) {
                        dispatchResultsEl.insertBefore(resultItem, dispatchResultsEl.children[index]);
                    }
                });
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
                
                // 清除地图上的加载提示
                const map = document.getElementById('map');
                if (map) {
                    const loadingElements = map.querySelectorAll('.loading');
                    loadingElements.forEach(el => el.remove());
                }
                
                // 加载系统数据（包括nodes和edges）
                const loadSuccess = await loadSystemData();
                
                if (loadSuccess) {
                    // 验证数据是否加载成功
                    if ((nodes && nodes.length > 0) || (edges && edges.length > 0)) {
                        log(`DXF 导入成功，加载了 ${nodes?.length || 0} 个节点，${edges?.length || 0} 条道路`);
                        // 再次确保地图渲染（数据加载完成后）
                        setTimeout(() => {
                            safeRenderMap();
                            centerMapContent(true);
                        }, 100);
                    } else {
                        logWarn('DXF 导入成功，但加载的数据为空，请检查后端是否正确保存数据');
                        showError('地图数据加载为空，请刷新页面重试');
                    }
                } else {
                    logWarn('DXF 导入成功，但数据加载失败');
                    showError('地图数据加载失败，请刷新页面重试');
                }
                
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
        // 初始化 Canvas 和点击检测
        function initCanvasInteraction() {
            if (!mapCanvas) return;
            
            // 点击检测：将 Canvas 点击转换为地图坐标并触发相应事件
            mapCanvas.addEventListener('click', (e) => {
                const mapCoord = screenToMap(e.clientX, e.clientY);
                
                // 检查是否点击了节点
                let clickedNode = null;
                let minDist = Infinity;
                nodes.forEach(node => {
                    const dist = Math.sqrt(
                        Math.pow(mapCoord.x - node.x, 2) + 
                        Math.pow(mapCoord.y - node.y, 2)
                    );
                    if (dist < 15 && dist < minDist) { // 15px 点击范围
                        minDist = dist;
                        clickedNode = node;
                    }
                });
                
                if (clickedNode) {
                    // 触发节点点击事件
                    if (editMode) {
                        // 编辑模式：双击编辑名称（这里简化为单击）
                        editNodeNameOnMap(clickedNode);
                    } else {
                        // 非编辑模式：显示拥堵菜单
                        const nodeCongestionData = monitorData.node_congestion && monitorData.node_congestion[clickedNode.id];
                        let nodeCongestion = 0;
                        if (nodeCongestionData !== undefined && nodeCongestionData !== null) {
                            nodeCongestion = typeof nodeCongestionData === 'object' && nodeCongestionData.level !== undefined
                                ? nodeCongestionData.level 
                                : nodeCongestionData;
                            nodeCongestion = parseInt(nodeCongestion) || 0;
                        }
                        showNodeCongestionMenu(e, clickedNode, nodeCongestion);
                    }
                    return;
                }
                
                // 检查是否点击了道路
                let clickedEdge = null;
                minDist = Infinity;
                edges.forEach(edge => {
                    const startNode = nodes.find(n => n.id === edge.start_node);
                    const endNode = nodes.find(n => n.id === edge.end_node);
                    if (!startNode || !endNode) return;
                    
                    // 计算点到线段的距离
                    const A = { x: startNode.x, y: startNode.y };
                    const B = { x: endNode.x, y: endNode.y };
                    const P = mapCoord;
                    
                    const AB = { x: B.x - A.x, y: B.y - A.y };
                    const AP = { x: P.x - A.x, y: P.y - A.y };
                    const AB_squared = AB.x * AB.x + AB.y * AB.y;
                    
                    if (AB_squared === 0) return;
                    
                    const t = Math.max(0, Math.min(1, (AP.x * AB.x + AP.y * AB.y) / AB_squared));
                    const proj = { x: A.x + t * AB.x, y: A.y + t * AB.y };
                    const dist = Math.sqrt(
                        Math.pow(P.x - proj.x, 2) + 
                        Math.pow(P.y - proj.y, 2)
                    );
                    
                    if (dist < 10 && dist < minDist) { // 10px 点击范围
                        minDist = dist;
                        clickedEdge = edge;
                    }
                });
                
                if (clickedEdge) {
                    const edgeStatus = monitorData.edge_status && monitorData.edge_status[clickedEdge.id] || 'normal';
                    if (editMode) {
                        editEdgeNameOnMap(clickedEdge);
                    } else {
                        showEdgeDirectionMenu(e, clickedEdge, edgeStatus);
                    }
                    return;
                }
                
                // 编辑模式下，点击空白处添加文字标签
                if (editMode) {
                    addMapLabelAtPosition(mapCoord.x, mapCoord.y);
                }
            });
            
            // 悬停效果（可选，用于高亮）
            mapCanvas.addEventListener('mousemove', (e) => {
                const mapCoord = screenToMap(e.clientX, e.clientY);
                // 可以在这里添加悬停高亮逻辑
                // 为了性能，可以节流处理
            });
        }
        
        // 设置事件监听器（在 init 函数之前定义，确保可以立即绑定）
        function setupEventListeners() {
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
            
            // 其他事件监听器在 init 函数中继续绑定
            // 这里只绑定最关键的事件，确保用户可以立即交互
        }
        
        async function init() {
            try {
                log('🚀 页面加载完成，开始初始化...');
                
                // 首先设置事件监听器，确保用户可以立即交互
                setupEventListeners();
                
                // 初始化 Canvas 渲染器（高性能）- 同步操作，快速完成
                try {
                    if (initCanvas()) {
                        log('✅ Canvas 渲染器初始化成功');
                        initCanvasInteraction(); // 初始化点击检测
                    } else {
                        logWarn('⚠️ Canvas 初始化失败，将使用 DOM 渲染');
                    }
                } catch (canvasError) {
                    logError('Canvas 初始化错误:', canvasError);
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
                
                // 异步加载数据，不阻塞 UI
                // 使用 setTimeout 让浏览器有机会渲染初始 UI
                setTimeout(async () => {
                    try {
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
                    } catch (initError) {
                        logError('初始化过程异常:', initError);
                    }
                }, 0); // 使用 setTimeout(0) 让浏览器先渲染 UI，再执行异步加载
                
                // 继续绑定其他事件监听器（在数据加载后）
                // 这些事件监听器在 init 函数中继续绑定
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
            // 服务器信息缓存
            let serverInfoCache = null;
            let serverInfoCacheTime = 0;
            const SERVER_INFO_CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存
            
            // 防抖定时器
            let fetchServerInfoTimer = null;
            
            async function fetchServerInfo(forceRefresh = false) {
                // 优先使用当前页面的网络地址
                const currentOrigin = window.location.origin;
                const driverUrl = `${currentOrigin}/driver`;
                
                // 更新URL输入框（即使从缓存读取，也要更新UI）
                const urlInput = document.getElementById('driver-url');
                if (urlInput) {
                    urlInput.value = driverUrl;
                }
                
                // 检查缓存（服务器信息变化不频繁，可以缓存）
                const now = Date.now();
                if (!forceRefresh && serverInfoCache && (now - serverInfoCacheTime) < SERVER_INFO_CACHE_TTL) {
                    // 使用缓存数据更新UI
                    updateServerInfoUI(serverInfoCache, currentOrigin, driverUrl, urlInput);
                    return;
                }
                
                try {
                    // 启用缓存，减少对服务器的请求
                    const result = await apiCall('/server-info', { 
                        cache: true,
                        cacheTTL: SERVER_INFO_CACHE_TTL 
                    });
                    if (result.success) {
                        // 更新缓存
                        serverInfoCache = result;
                        serverInfoCacheTime = now;
                        
                        // 更新UI
                        updateServerInfoUI(result, currentOrigin, driverUrl, urlInput);
                    }
                } catch (error) {
                    // 如果是429错误，使用缓存数据（如果有）
                    if (error.message && error.message.includes('请求过于频繁')) {
                        if (serverInfoCache) {
                            console.warn('请求过于频繁，使用缓存的服务器信息');
                            updateServerInfoUI(serverInfoCache, currentOrigin, driverUrl, urlInput);
                            return;
                        }
                        // 即使没有缓存，也显示基本URL信息
                        showBasicServerInfo(currentOrigin);
                        return;
                    }
                    
                    console.error('获取服务器信息失败:', error);
                    // 如果有缓存，使用缓存；否则显示基本信息和错误提示
                    if (serverInfoCache) {
                        updateServerInfoUI(serverInfoCache, currentOrigin, driverUrl, urlInput);
                    } else {
                        showBasicServerInfo(currentOrigin, true);
                    }
                }
            }
            
            // 更新服务器信息UI的辅助函数
            function updateServerInfoUI(result, currentOrigin, driverUrl, urlInput) {
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
                if (urlInput && result.urls && result.urls.driver_url && result.urls.driver_url !== driverUrl) {
                    // 仅在用户未手动修改时才考虑使用服务器返回的URL
                    if (urlInput.value === driverUrl) {
                        // 可以根据需要选择是否使用服务器返回的URL
                        // urlInput.value = result.urls.driver_url;
                    }
                }
            }
            
            // 显示基本服务器信息（当无法获取详细信息时）
            function showBasicServerInfo(currentOrigin, showError = false) {
                const infoDiv = document.getElementById('server-info');
                if (infoDiv) {
                    let html = '<strong>服务器信息：</strong><br>';
                    html += `当前访问地址: <strong style="color: #27ae60;">${currentOrigin}/driver</strong><br>`;
                    if (showError) {
                        html += `<span style="color: #e74c3c;">⚠️ 无法获取服务器详细信息</span>`;
                    }
                    infoDiv.innerHTML = html;
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

            // 初始化二维码URL（带防抖，避免重复调用）
            let initQrcodeUrlInProgress = false;
            async function initQrcodeUrl() {
                // 如果已经在初始化中，等待完成
                if (initQrcodeUrlInProgress) {
                    return;
                }
                
                // 清除之前的防抖定时器
                if (fetchServerInfoTimer) {
                    clearTimeout(fetchServerInfoTimer);
                }
                
                // 设置防抖延迟（300ms）
                return new Promise((resolve) => {
                    fetchServerInfoTimer = setTimeout(async () => {
                        if (initQrcodeUrlInProgress) {
                            resolve();
                            return;
                        }
                        
                        initQrcodeUrlInProgress = true;
                        try {
                            await fetchServerInfo();
                        } catch (error) {
                            console.error('初始化二维码URL失败:', error);
                        } finally {
                            initQrcodeUrlInProgress = false;
                            resolve();
                        }
                    }, 300);
                });
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
                            try {
                                await fetchVehicles();
                            } catch (err) {
                                // 静默处理错误，避免未捕获的Promise
                                console.debug('定时刷新车辆列表失败:', err);
                            }
                            try {
                                await fetchMonitorData();
                            } catch (err) {
                                // 静默处理错误，避免未捕获的Promise
                                console.debug('定时刷新监控数据失败:', err);
                            }
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
                if (!confirm(t('confirm_reset_system'))) {
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
                    alert(t('please_upload_image')); 
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
                    alert(t('map_file_read_failed'));
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
                    if (confirm(t('confirm_clear_map'))) {
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
            // 注意：只改变 #map 的 transform，背景（.map-wrapper）保持固定
            function updateMapTransform() {
                if (!map) return;
                
                // 取消之前的动画帧请求（防抖）
                if (updateMapTransformRafId !== null) {
                    cancelAnimationFrame(updateMapTransformRafId);
                }
                
                // 使用 requestAnimationFrame 优化性能，限制在 ~60fps
                updateMapTransformRafId = requestAnimationFrame(() => {
                // 组合旋转、缩放和平移变换
                // 注意：旋转应该在缩放和平移之前应用（以(0,0)为旋转中心）
                // 从全局变量或 window.mapZoomState 读取旋转角度
                let rotation = 0;
                if (typeof mapRotation !== 'undefined') {
                    rotation = mapRotation;
                } else if (typeof window !== 'undefined' && window.mapZoomState && window.mapZoomState.rotation !== undefined) {
                    rotation = window.mapZoomState.rotation;
                }
                
                let transform = '';
                if (rotation !== 0) {
                    transform += `rotate(${rotation}deg) `;
                }
                transform += `translate(${mapTranslateX}px, ${mapTranslateY}px) scale(${mapScale})`;
                map.style.transform = transform;
                map.style.transformOrigin = '0 0'; // 确保旋转中心是(0,0)
                
                    // 生产环境移除调试日志以提升性能
                    // if (rotation !== 0) {
                    //     console.log('updateMapTransform - 应用旋转:', rotation, '完整 transform:', transform);
                    // }
                
                if (zoomLevelEl) {
                    zoomLevelEl.textContent = Math.round(mapScale * 100) + '%';
                }
                // 同步全局状态
                if (typeof window !== 'undefined' && window.mapZoomState) {
                    window.mapZoomState.scale = mapScale;
                    window.mapZoomState.translateX = mapTranslateX;
                    window.mapZoomState.translateY = mapTranslateY;
                    window.mapZoomState.rotation = rotation; // 同步旋转角度
                }
                    
                    updateMapTransformRafId = null;
                });
            }
            
            // 将缩放、平移和旋转状态保存到全局，供地图渲染后恢复
            window.mapZoomState = {
                get scale() { return mapScale; },
                set scale(v) { mapScale = v; },
                get translateX() { return mapTranslateX; },
                set translateX(v) { mapTranslateX = v; },
                get translateY() { return mapTranslateY; },
                set translateY(v) { mapTranslateY = v; },
                get rotation() { return typeof mapRotation !== 'undefined' ? mapRotation : 0; },
                set rotation(v) { if (typeof mapRotation !== 'undefined') mapRotation = v; },
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
            
            // 地图拖动功能（左键拖动，作为中键拖动的补充）
            let mapDragEnabled = true; // 左键拖动功能开关（默认开启）
            let isDraggingMapWithLeftButton = false; // 左键拖动状态标志
            
            // 地图拖动开关按钮
            const toggleMapDragBtn = document.getElementById('toggle-map-drag');
            if (toggleMapDragBtn && mapWrapper && map) {
                // 初始化按钮状态为开启
                toggleMapDragBtn.textContent = `地图拖动: 开启`;
                toggleMapDragBtn.style.background = '#2ecc71';
                mapWrapper.style.cursor = 'grab';
                mapWrapper.title = '可以拖动地图（左键拖动，中键也可以拖动）';
                
                // 开关按钮
                toggleMapDragBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    mapDragEnabled = !mapDragEnabled;
                    this.textContent = `地图拖动: ${mapDragEnabled ? '开启' : '关闭'}`;
                    this.style.background = mapDragEnabled ? '#2ecc71' : '#3498db';
                    
                    // 更新地图包装器的样式
                    if (mapDragEnabled) {
                        mapWrapper.style.cursor = 'grab';
                        mapWrapper.title = '可以拖动地图（左键拖动，中键也可以拖动）';
                    } else {
                        mapWrapper.style.cursor = '';
                        mapWrapper.title = '';
                    }
                });
            }
            
            // 鼠标中键拖拽平移（CAD风格）
            let isPanning = false;
            let panStartX = 0;
            let panStartY = 0;
            let panStartTranslateX = 0;
            let panStartTranslateY = 0;
            
            if (mapWrapper) {
                // 鼠标按下（同时支持中键和左键拖动）
                mapWrapper.addEventListener('mousedown', (e) => {
                    // 中键拖动（原有功能，始终可用）
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
                    // 左键拖动（新增功能，仅在开启时可用）
                    else if (e.button === 0 && mapDragEnabled) { // 左键
                        // 如果点击的是按钮、节点、道路等交互元素，不触发拖动
                        if (e.target.closest('button, .node, .edge, .vehicle')) {
                            return;
                        }
                        
                        e.preventDefault();
                        e.stopPropagation();
                        isDraggingMapWithLeftButton = true;
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
                
                // 鼠标移动（同时支持中键和左键拖动）
                const handleMouseMove = (e) => {
                    // 中键拖动
                    if (isPanning) {
                        e.preventDefault();
                        const deltaX = e.clientX - panStartX;
                        const deltaY = e.clientY - panStartY;
                        
                        // 考虑旋转角度：将屏幕坐标系的移动转换为地图坐标系的移动
                        // 因为transform顺序是 rotate() translate()，translate是在旋转后的坐标系中
                        // 所以需要将鼠标移动按旋转角度反向旋转
                        const rotation = typeof mapRotation !== 'undefined' ? mapRotation : 0;
                        const rad = -rotation * Math.PI / 180; // 反向旋转
                        const adjustedDeltaX = deltaX * Math.cos(rad) - deltaY * Math.sin(rad);
                        const adjustedDeltaY = deltaX * Math.sin(rad) + deltaY * Math.cos(rad);
                        
                        mapTranslateX = panStartTranslateX + adjustedDeltaX;
                        mapTranslateY = panStartTranslateY + adjustedDeltaY;
                        updateMapTransform();
                    }
                    // 左键拖动
                    else if (isDraggingMapWithLeftButton && mapDragEnabled) {
                        e.preventDefault();
                        const deltaX = e.clientX - panStartX;
                        const deltaY = e.clientY - panStartY;
                        
                        // 考虑旋转角度：将屏幕坐标系的移动转换为地图坐标系的移动
                        const rotation = typeof mapRotation !== 'undefined' ? mapRotation : 0;
                        const rad = -rotation * Math.PI / 180; // 反向旋转
                        const adjustedDeltaX = deltaX * Math.cos(rad) - deltaY * Math.sin(rad);
                        const adjustedDeltaY = deltaX * Math.sin(rad) + deltaY * Math.cos(rad);
                        
                        mapTranslateX = panStartTranslateX + adjustedDeltaX;
                        mapTranslateY = panStartTranslateY + adjustedDeltaY;
                        updateMapTransform();
                    }
                };
                document.addEventListener('mousemove', handleMouseMove, { passive: false });
                
                // 鼠标释放（同时支持中键和左键拖动）
                const handleMouseUp = (e) => {
                    // 中键释放
                    if (e.button === 1 && isPanning) {
                        e.preventDefault();
                        e.stopPropagation();
                        isPanning = false;
                        isMapPanning = false; // 清除全局拖拽标志
                        mapWrapper.classList.remove('panning');
                        // 恢复鼠标样式
                        mapWrapper.style.cursor = mapDragEnabled ? 'grab' : '';
                        document.body.style.cursor = '';
                        document.body.style.userSelect = '';
                    }
                    // 左键释放
                    else if (e.button === 0 && isDraggingMapWithLeftButton) {
                        e.preventDefault();
                        e.stopPropagation();
                        isDraggingMapWithLeftButton = false;
                        isMapPanning = false; // 清除全局拖拽标志
                        mapWrapper.classList.remove('panning');
                        // 恢复鼠标样式
                        mapWrapper.style.cursor = mapDragEnabled ? 'grab' : '';
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
                
                // 防止在窗口外释放时卡住（同时处理中键和左键）
                document.addEventListener('mouseleave', () => {
                    if (isPanning || isDraggingMapWithLeftButton) {
                        isPanning = false;
                        isDraggingMapWithLeftButton = false;
                        isMapPanning = false;
                        if (mapWrapper) {
                            mapWrapper.classList.remove('panning');
                            mapWrapper.style.cursor = mapDragEnabled ? 'grab' : '';
                        }
                        document.body.style.cursor = '';
                        document.body.style.userSelect = '';
                    }
                });
                
                // 处理窗口失去焦点时的情况（同时处理中键和左键）
                window.addEventListener('blur', () => {
                    if (isPanning || isDraggingMapWithLeftButton) {
                        isPanning = false;
                        isDraggingMapWithLeftButton = false;
                        isMapPanning = false;
                        if (mapWrapper) {
                            mapWrapper.classList.remove('panning');
                            mapWrapper.style.cursor = mapDragEnabled ? 'grab' : '';
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
                        alert(t('please_enter_node_name')); 
                        return; 
                    }

                    const map = document.getElementById('map');
                    if (!map) {
                        console.error('未找到地图元素');
                        alert(t('map_not_loaded'));
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
                if (confirm(t('confirm_clear_nodes'))) {
                    for (const node of [...nodes]) {
                        await deleteNodeFromBackend(node.id);
                    }
                }
            });

            // GPS坐标导出功能
            document.getElementById('export-gps').addEventListener('click', async () => {
                try {
                    // 获取所有节点
                    const result = await apiCall('/nodes');
                    if (!result.success || !result.nodes) {
                        showError('获取节点数据失败');
                        return;
                    }

                    const nodesData = result.nodes;
                    
                    // 准备Excel数据
                    const excelData = [];
                    excelData.push(['节点ID', '节点名称', '纬度 (Latitude)', '经度 (Longitude)', '类型', '地图X', '地图Y']);
                    
                    nodesData.forEach(node => {
                        excelData.push([
                            node.id || '',
                            node.name || '',
                            node.latitude !== null && node.latitude !== undefined ? node.latitude : '',
                            node.longitude !== null && node.longitude !== undefined ? node.longitude : '',
                            node.type || '',
                            node.x || '',
                            node.y || ''
                        ]);
                    });

                    // 创建工作簿
                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.aoa_to_sheet(excelData);
                    
                    // 设置列宽
                    ws['!cols'] = [
                        { wch: 12 }, // 节点ID
                        { wch: 20 }, // 节点名称
                        { wch: 18 }, // 纬度
                        { wch: 18 }, // 经度
                        { wch: 12 }, // 类型
                        { wch: 10 }, // 地图X
                        { wch: 10 }  // 地图Y
                    ];
                    
                    XLSX.utils.book_append_sheet(wb, ws, 'GPS坐标');
                    
                    // 导出文件
                    const fileName = `节点GPS坐标_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.xlsx`;
                    XLSX.writeFile(wb, fileName);
                    
                    showSuccess(`GPS坐标已导出：${fileName}`);
                } catch (error) {
                    console.error('导出GPS坐标失败:', error);
                    showError('导出GPS坐标失败: ' + (error.message || '未知错误'));
                }
            });

            // GPS坐标导入功能
            const gpsFileInput = document.getElementById('gps-file-input');
            document.getElementById('import-gps').addEventListener('click', () => {
                gpsFileInput.click();
            });

            gpsFileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                try {
                    // 读取Excel文件
                    const data = await file.arrayBuffer();
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

                    if (jsonData.length < 2) {
                        showError('Excel文件格式错误：至少需要包含表头和数据行');
                        gpsFileInput.value = '';
                        return;
                    }

                    // 解析表头，支持多种可能的列名
                    const headerRow = jsonData[0];
                    const nodeIdIndex = findColumnIndex(headerRow, ['节点ID', '节点id', 'node_id', 'id', 'ID']);
                    const latIndex = findColumnIndex(headerRow, ['纬度', 'latitude', 'lat', 'Latitude', '纬度 (Latitude)']);
                    const lonIndex = findColumnIndex(headerRow, ['经度', 'longitude', 'lon', 'Longitude', '经度 (Longitude)']);

                    if (nodeIdIndex === -1 || latIndex === -1 || lonIndex === -1) {
                        showError('Excel文件格式错误：缺少必要的列（节点ID、纬度、经度）');
                        gpsFileInput.value = '';
                        return;
                    }

                    // 解析数据行
                    const importData = [];
                    let successCount = 0;
                    let failCount = 0;
                    const errors = [];

                    for (let i = 1; i < jsonData.length; i++) {
                        const row = jsonData[i];
                        if (!row || row.length === 0) continue;

                        const nodeId = String(row[nodeIdIndex] || '').trim();
                        const latStr = String(row[latIndex] || '').trim();
                        const lonStr = String(row[lonIndex] || '').trim();

                        if (!nodeId) {
                            failCount++;
                            errors.push(`第${i + 1}行：节点ID为空`);
                            continue;
                        }

                        if (!latStr || !lonStr) {
                            failCount++;
                            errors.push(`第${i + 1}行（${nodeId}）：GPS坐标为空，跳过`);
                            continue;
                        }

                        const lat = parseFloat(latStr);
                        const lon = parseFloat(lonStr);

                        if (isNaN(lat) || isNaN(lon)) {
                            failCount++;
                            errors.push(`第${i + 1}行（${nodeId}）：GPS坐标格式错误`);
                            continue;
                        }

                        if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
                            failCount++;
                            errors.push(`第${i + 1}行（${nodeId}）：GPS坐标超出有效范围`);
                            continue;
                        }

                        importData.push({ nodeId, latitude: lat, longitude: lon });
                    }

                    if (importData.length === 0) {
                        showError('没有有效的数据可以导入');
                        gpsFileInput.value = '';
                        return;
                    }

                    // 确认导入
                    const confirmMsg = `准备导入 ${importData.length} 个节点的GPS坐标\n\n` +
                        `成功: ${importData.length} 个\n` +
                        (failCount > 0 ? `失败: ${failCount} 个\n` : '') +
                        (errors.length > 0 && errors.length <= 5 ? `\n错误详情:\n${errors.join('\n')}` : '') +
                        (errors.length > 5 ? `\n（还有 ${errors.length - 5} 个错误）` : '') +
                        `\n\n确定要继续吗？`;

                    if (!confirm(confirmMsg)) {
                        gpsFileInput.value = '';
                        return;
                    }

                    // 批量导入GPS坐标
                    showSuccess('开始导入GPS坐标，请稍候...');
                    let importedCount = 0;

                    for (const item of importData) {
                        try {
                            const result = await apiCall(`/nodes/${item.nodeId}/gps`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    latitude: item.latitude,
                                    longitude: item.longitude
                                })
                            });

                            if (result.success) {
                                importedCount++;
                            } else {
                                failCount++;
                                errors.push(`${item.nodeId}: ${result.message || '导入失败'}`);
                            }
                        } catch (error) {
                            failCount++;
                            errors.push(`${item.nodeId}: ${error.message || '网络错误'}`);
                        }
                    }

                    // 显示导入结果
                    let resultMsg = `导入完成！\n成功: ${importedCount} 个`;
                    if (failCount > 0) {
                        resultMsg += `\n失败: ${failCount} 个`;
                        if (errors.length > 0 && errors.length <= 10) {
                            resultMsg += `\n\n错误详情:\n${errors.slice(0, 10).join('\n')}`;
                        }
                    }
                    alert(resultMsg);

                    // 刷新节点数据
                    await fetchRoads();
                    safeRenderMap();

                    showSuccess(`GPS坐标导入完成：成功 ${importedCount} 个，失败 ${failCount} 个`);
                } catch (error) {
                    console.error('导入GPS坐标失败:', error);
                    showError('导入GPS坐标失败: ' + (error.message || '未知错误'));
                } finally {
                    gpsFileInput.value = '';
                }
            });

            // 辅助函数：查找列索引
            function findColumnIndex(headerRow, possibleNames) {
                for (const name of possibleNames) {
                    const index = headerRow.findIndex(col => 
                        String(col || '').trim().toLowerCase() === name.toLowerCase()
                    );
                    if (index !== -1) return index;
                }
                return -1;
            }

            // 添加道路
           // 添加道路
            document.getElementById('add-road').addEventListener('click', async () => {
                const startNodeId = document.getElementById('start-node').value;
                const endNodeId = document.getElementById('end-node').value;
                const roadLength = document.getElementById('road-length').value;
                const roadDirection = document.getElementById('road-direction').value; // 新增：获取方向

                if (!startNodeId || !endNodeId) { alert(t('please_select_start_end')); return; }
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
                    this.textContent = editMode ? t('edit_mode_on') : t('edit_mode_off');
                    this.style.background = editMode ? '#2ecc71' : '#3498db';
                    // 更新提示文本（可以后续添加到 i18n）
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
            
            // 显示隐藏节点复选框
            const showHiddenNodesCheckbox = document.getElementById('show-hidden-nodes');
            if (showHiddenNodesCheckbox) {
                showHiddenNodesCheckbox.addEventListener('change', function (e) {
                    showHiddenNodes = this.checked;
                    console.log('✅ 显示隐藏节点状态已更改:', showHiddenNodes);
                    try {
                        safeRenderMap(); // 重新渲染地图以显示/隐藏隐藏的节点
                    } catch (err) {
                        console.error('❌ renderMap 执行出错:', err);
                    }
                });
                console.log('✅ 显示隐藏节点复选框事件已绑定');
            } else {
                console.error('❌ 未找到 show-hidden-nodes 复选框，请检查HTML结构');
            }
            
            // 显示支路节点复选框
            const showBranchNodesCheckbox = document.getElementById('show-branch-nodes');
            if (showBranchNodesCheckbox) {
                showBranchNodesCheckbox.addEventListener('change', function (e) {
                    showBranchNodes = this.checked;
                    console.log('✅ 显示支路节点状态已更改:', showBranchNodes);
                    try {
                        safeRenderMap(); // 重新渲染地图以显示/隐藏支路节点
                    } catch (err) {
                        console.error('❌ renderMap 执行出错:', err);
                    }
                });
                console.log('✅ 显示支路节点复选框事件已绑定');
            } else {
                console.error('❌ 未找到 show-branch-nodes 复选框，请检查HTML结构');
            }

            // 标签显示控制
            window.showGpsIcons = true; // GPS图标显示状态（全局变量）
            const toggleLabelsBtn = document.getElementById('toggle-labels');
            if (toggleLabelsBtn) {
                toggleLabelsBtn.addEventListener('click', function (e) {
                    e.stopPropagation(); // 阻止事件冒泡，避免触发拖动
                    e.preventDefault(); // 防止默认行为
                    const map = document.getElementById('map');
                    if (!map) {
                        return;
                    }
                    // 移除所有标签模式类
                    map.classList.remove('map-labels-hidden', 'map-labels-edges-only', 'map-labels-nodes-only');
                    
                    // 切换模式
                    switch (labelMode) {
                        case 'all':
                            labelMode = 'edges-only';
                            map.classList.add('map-labels-edges-only');
                            this.textContent = t('labels_edges_only');
                            break;
                        case 'edges-only':
                            labelMode = 'nodes-only';
                            map.classList.add('map-labels-nodes-only');
                            this.textContent = t('labels_nodes_only');
                            break;
                        case 'nodes-only':
                            labelMode = 'hidden';
                            map.classList.add('map-labels-hidden');
                            this.textContent = t('labels_hidden');
                            break;
                        case 'hidden':
                            labelMode = 'all';
                            this.textContent = t('labels_all');
                            break;
                    }
                });
            }
            
            // GPS图标显示/隐藏切换
            const toggleGpsIconsBtn = document.getElementById('toggle-gps-icons');
            if (toggleGpsIconsBtn) {
                toggleGpsIconsBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.showGpsIcons = !window.showGpsIcons;
                    this.textContent = window.showGpsIcons ? t('gps_icons_show') : t('gps_icons_hide');
                    
                    // 切换所有GPS按钮的显示状态
                    const allGpsButtons = document.querySelectorAll('.node-gps-btn');
                    allGpsButtons.forEach(btn => {
                        btn.style.display = window.showGpsIcons ? 'flex' : 'none';
                    });
                });
            }
            
            // 地图旋转功能（使用全局变量和函数）
            // mapRotation 和 applyMapRotation 已在全局作用域定义
            
            // 加载地图旋转角度
            async function loadMapRotation() {
                try {
                    const apiBase = window.API_BASE || 'http://localhost:5000/api';
                    const response = await fetch(`${apiBase}/map-rotation`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.rotation !== undefined) {
                            mapRotation = parseFloat(data.rotation) || 0;
                            const rotationInput = document.getElementById('map-rotation-input');
                            if (rotationInput) {
                                rotationInput.value = mapRotation;
                            }
                            applyMapRotation(mapRotation);
                        }
                    }
                } catch (error) {
                    console.warn('加载地图旋转角度失败:', error);
                }
            }
            
            // 保存地图旋转角度
            async function saveMapRotation(rotation) {
                try {
                    const apiBase = window.API_BASE || 'http://localhost:5000/api';
                    const response = await fetch(`${apiBase}/map-rotation`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ rotation: rotation })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success) {
                            showToast(data.message || '地图旋转角度已保存', 'success');
                            return true;
                        }
                    }
                    showToast('保存地图旋转角度失败', 'error');
                    return false;
                } catch (error) {
                    console.error('保存地图旋转角度失败:', error);
                    showToast('保存地图旋转角度失败: ' + error.message, 'error');
                    return false;
                }
            }
            
            // 应用旋转按钮
            const applyRotationBtn = document.getElementById('apply-map-rotation');
            if (applyRotationBtn) {
                applyRotationBtn.addEventListener('click', async function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    const rotationInput = document.getElementById('map-rotation-input');
                    if (rotationInput) {
                        let rotation = parseFloat(rotationInput.value) || 0;
                        // 标准化到 -180 到 180 度之间
                        rotation = rotation % 360;
                        if (rotation > 180) rotation -= 360;
                        else if (rotation < -180) rotation += 360;
                        
                        // 更新全局旋转角度
                        mapRotation = rotation;
                        rotationInput.value = rotation;
                        
                        // 立即应用旋转
                        applyMapRotation(rotation);
                        
                        // 保存到后端
                        await saveMapRotation(rotation);
                        
                        // 确保旋转在保存后仍然应用（防止被其他代码覆盖）
                        setTimeout(() => {
                            applyMapRotation(mapRotation);
                        }, 100);
                    }
                });
            }
            
            // 重置旋转按钮
            const resetRotationBtn = document.getElementById('reset-map-rotation');
            if (resetRotationBtn) {
                resetRotationBtn.addEventListener('click', async function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    mapRotation = 0;
                    const rotationInput = document.getElementById('map-rotation-input');
                    if (rotationInput) {
                        rotationInput.value = 0;
                    }
                    applyMapRotation(0);
                    await saveMapRotation(0);
                });
            }
            
            // 页面加载时加载旋转角度
            loadMapRotation();
            
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
            
            // 初始化语言系统
            initLanguage();
            initLanguageSwitcher();
            
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