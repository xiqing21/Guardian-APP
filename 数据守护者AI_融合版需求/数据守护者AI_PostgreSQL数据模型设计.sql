-- =====================================================
-- 数据守护者AI (Guardian APP) - PostgreSQL数据模型设计
-- 版本: V3.1 (删除绩效管理和激励体系，聚焦AI核心功能)
-- 创建日期: 2025-01-17
-- 设计说明: 基于修正版功能清单，支持AI驱动的数据治理功能
-- =====================================================

-- 设置数据库编码和时区
SET CLIENT_ENCODING TO 'UTF8';
SET timezone = 'Asia/Shanghai';

-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- =====================================================
-- 1. 用户管理系统
-- =====================================================

-- 1.1 组织架构表
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('province', 'city', 'county', 'substation')),
    parent_id UUID REFERENCES organizations(id),
    level INTEGER NOT NULL DEFAULT 1,
    address TEXT,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 组织架构表注释
COMMENT ON TABLE organizations IS '组织架构表 - 存储省市县供电所等组织层级信息';
COMMENT ON COLUMN organizations.id IS '主键ID';
COMMENT ON COLUMN organizations.code IS '组织编码 - 唯一标识';
COMMENT ON COLUMN organizations.name IS '组织名称';
COMMENT ON COLUMN organizations.type IS '组织类型 - province:省级, city:市级, county:县级, substation:供电所';
COMMENT ON COLUMN organizations.parent_id IS '上级组织ID - 自引用外键';
COMMENT ON COLUMN organizations.level IS '组织层级 - 1:省 2:市 3:县 4:供电所';
COMMENT ON COLUMN organizations.address IS '组织地址';
COMMENT ON COLUMN organizations.contact_phone IS '联系电话';
COMMENT ON COLUMN organizations.contact_email IS '联系邮箱';
COMMENT ON COLUMN organizations.is_active IS '是否启用';
COMMENT ON COLUMN organizations.created_at IS '创建时间';
COMMENT ON COLUMN organizations.updated_at IS '更新时间';

-- 1.2 角色表
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 角色表注释
COMMENT ON TABLE roles IS '角色表 - 存储系统角色和权限配置';
COMMENT ON COLUMN roles.id IS '主键ID';
COMMENT ON COLUMN roles.code IS '角色编码 - 唯一标识';
COMMENT ON COLUMN roles.name IS '角色名称';
COMMENT ON COLUMN roles.description IS '角色描述';
COMMENT ON COLUMN roles.permissions IS '权限列表 - JSON数组格式';
COMMENT ON COLUMN roles.is_active IS '是否启用';
COMMENT ON COLUMN roles.created_at IS '创建时间';
COMMENT ON COLUMN roles.updated_at IS '更新时间';

-- 1.3 用户表（集成i国网）
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    avatar_url TEXT,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    roles JSONB NOT NULL DEFAULT '[]',
    current_role VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- i国网同步信息
    i_state_user_id VARCHAR(100),
    i_state_sync_at TIMESTAMP WITH TIME ZONE,
    i_state_sync_status VARCHAR(20) DEFAULT 'pending'
);

-- 用户表注释
COMMENT ON TABLE users IS '用户表 - 存储系统用户信息，集成i国网';
COMMENT ON COLUMN users.id IS '主键ID';
COMMENT ON COLUMN users.employee_id IS '员工工号 - 唯一标识';
COMMENT ON COLUMN users.name IS '用户姓名';
COMMENT ON COLUMN users.phone IS '手机号码';
COMMENT ON COLUMN users.email IS '邮箱地址';
COMMENT ON COLUMN users.avatar_url IS '头像URL';
COMMENT ON COLUMN users.organization_id IS '所属组织ID';
COMMENT ON COLUMN users.roles IS '用户角色列表 - JSON数组';
COMMENT ON COLUMN users.current_role IS '当前激活角色';
COMMENT ON COLUMN users.status IS '用户状态 - active:正常, inactive:停用, suspended:暂停';
COMMENT ON COLUMN users.last_login_at IS '最后登录时间';
COMMENT ON COLUMN users.created_at IS '创建时间';
COMMENT ON COLUMN users.updated_at IS '更新时间';
COMMENT ON COLUMN users.i_state_user_id IS 'i国网用户ID';
COMMENT ON COLUMN users.i_state_sync_at IS 'i国网最后同步时间';
COMMENT ON COLUMN users.i_state_sync_status IS 'i国网同步状态';

-- 1.4 用户会话表
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    token_hash VARCHAR(255) NOT NULL,
    refresh_token_hash VARCHAR(255),
    device_info JSONB,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. 任务管理系统
-- =====================================================

-- 2.1 任务类别表
CREATE TABLE task_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    priority_weight DECIMAL(3,2) DEFAULT 1.0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.2 任务表
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    category_id UUID NOT NULL REFERENCES task_categories(id),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
    difficulty INTEGER DEFAULT 3 CHECK (difficulty BETWEEN 1 AND 5),
    
    -- 分配信息
    creator_id UUID NOT NULL REFERENCES users(id),
    assignee_id UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    
    -- 时间信息
    estimated_duration INTEGER, -- 预估耗时(分钟)
    actual_duration INTEGER,    -- 实际耗时(分钟)
    deadline TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- 地理位置
    location_address TEXT,
    location_coordinates POINT,
    location_radius INTEGER DEFAULT 100, -- 任务有效范围(米)
    
    -- AI相关
    ai_recommended BOOLEAN DEFAULT false,
    ai_confidence_score DECIMAL(5,2),
    ai_recommendation_reason TEXT,
    
    -- 数据质量相关
    data_before JSONB, -- 任务执行前的数据
    data_after JSONB,  -- 任务执行后的数据
    quality_improvement DECIMAL(5,2), -- 质量提升分数
    
    -- 审核信息
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    review_status VARCHAR(20) CHECK (review_status IN ('pending', 'approved', 'rejected')),
    review_comment TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.3 任务执行记录表
CREATE TABLE task_execution_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    details JSONB,
    location_coordinates POINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.4 任务附件表
CREATE TABLE task_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size BIGINT,
    file_url TEXT NOT NULL,
    upload_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. AI智能功能系统
-- =====================================================

-- 3.1 OCR识别记录表
CREATE TABLE ocr_recognition_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id),
    user_id UUID NOT NULL REFERENCES users(id),
    
    -- 识别类型和输入
    recognition_type VARCHAR(50) NOT NULL CHECK (recognition_type IN ('id_card', 'business_license', 'contract', 'handwriting')),
    original_image_url TEXT NOT NULL,
    image_quality_score DECIMAL(5,2),
    
    -- OCR结果
    recognition_result JSONB NOT NULL,
    raw_text TEXT,
    structured_data JSONB,
    
    -- 置信度评分详细信息
    confidence_score DECIMAL(5,2) NOT NULL,
    confidence_details JSONB NOT NULL, -- 包含模型概率、清晰度、上下文一致性等详细评分
    
    -- 处理时间
    processing_start_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processing_end_at TIMESTAMP WITH TIME ZONE,
    processing_duration INTEGER, -- 毫秒
    
    -- 验证和修正
    is_verified BOOLEAN DEFAULT false,
    verification_result JSONB,
    manual_corrections JSONB,
    final_result JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3.2 智能推荐记录表
CREATE TABLE ai_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recommendation_type VARCHAR(50) NOT NULL CHECK (recommendation_type IN ('task_assignment', 'function_usage', 'best_practice')),
    target_user_id UUID NOT NULL REFERENCES users(id),
    
    -- 推荐内容
    content JSONB NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL,
    algorithm_used VARCHAR(100),
    
    -- 推荐理由和依据
    reasoning TEXT,
    data_sources JSONB, -- 推荐依据的数据来源
    
    -- 用户反馈
    user_feedback VARCHAR(20) CHECK (user_feedback IN ('accepted', 'rejected', 'ignored')),
    feedback_comment TEXT,
    feedback_at TIMESTAMP WITH TIME ZONE,
    
    -- 推荐效果
    effectiveness_score DECIMAL(5,2),
    measured_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3.3 智能派单记录表
CREATE TABLE intelligent_dispatch_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    
    -- 候选人员列表和评分
    candidate_users JSONB NOT NULL, -- [{"user_id": "xxx", "score": 85.5, "reasons": [...]}]
    selected_user_id UUID REFERENCES users(id),
    
    -- 算法详情
    algorithm_version VARCHAR(50),
    scoring_factors JSONB NOT NULL, -- 评分因子权重和详细计算
    
    -- 派单决策
    auto_assigned BOOLEAN DEFAULT false,
    manual_override BOOLEAN DEFAULT false,
    override_reason TEXT,
    dispatch_decision_by UUID REFERENCES users(id),
    
    -- 执行效果
    actual_completion_time INTEGER, -- 实际完成用时(分钟)
    predicted_completion_time INTEGER, -- 预测完成用时(分钟)
    prediction_accuracy DECIMAL(5,2), -- 预测准确度
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. 数据质量管理系统
-- =====================================================

-- 4.1 数据质量维度配置表
CREATE TABLE data_quality_dimensions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    weight DECIMAL(5,2) NOT NULL DEFAULT 1.0,
    calculation_formula TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4.2 数据质量评分表
CREATE TABLE data_quality_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    
    -- 总体评分
    overall_score DECIMAL(5,2) NOT NULL,
    previous_score DECIMAL(5,2),
    score_change DECIMAL(5,2),
    
    -- 各维度评分
    completeness_score DECIMAL(5,2) NOT NULL,
    accuracy_score DECIMAL(5,2) NOT NULL,
    consistency_score DECIMAL(5,2) NOT NULL,
    timeliness_score DECIMAL(5,2) NOT NULL,
    compliance_score DECIMAL(5,2) NOT NULL,
    uniqueness_score DECIMAL(5,2) NOT NULL,
    
    -- 评分详情
    score_details JSONB, -- 详细的计算过程和依据
    improvement_suggestions JSONB, -- AI生成的改进建议
    
    -- 评分周期
    score_period VARCHAR(20) DEFAULT 'daily' CHECK (score_period IN ('daily', 'weekly', 'monthly')),
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. GIS地理数据系统
-- =====================================================

-- 5.1 行政区域表
CREATE TABLE administrative_regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    level INTEGER NOT NULL, -- 1:省 2:市 3:县 4:乡镇
    parent_id UUID REFERENCES administrative_regions(id),
    boundary GEOMETRY(MULTIPOLYGON, 4326),
    center_point GEOMETRY(POINT, 4326),
    area_km2 DECIMAL(12,2),
    population INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.2 网格区域表
CREATE TABLE grid_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    region_id UUID NOT NULL REFERENCES administrative_regions(id),
    boundary GEOMETRY(POLYGON, 4326) NOT NULL,
    center_point GEOMETRY(POINT, 4326) NOT NULL,
    area_km2 DECIMAL(10,4),
    
    -- 网格员配置
    max_grid_workers INTEGER DEFAULT 1,
    current_grid_workers INTEGER DEFAULT 0,
    
    -- 数据质量统计
    avg_quality_score DECIMAL(5,2),
    task_density INTEGER DEFAULT 0, -- 任务密度(每平方公里任务数)
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.3 用户网格关联表
CREATE TABLE user_grid_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    grid_area_id UUID NOT NULL REFERENCES grid_areas(id),
    assignment_type VARCHAR(20) DEFAULT 'primary' CHECK (assignment_type IN ('primary', 'backup', 'temporary')),
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, grid_area_id, assignment_type, start_date)
);

-- 5.4 位置轨迹表
CREATE TABLE location_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    location_point GEOMETRY(POINT, 4326) NOT NULL,
    accuracy_meters INTEGER,
    altitude_meters DECIMAL(8,2),
    heading_degrees INTEGER,
    speed_kmh DECIMAL(5,2),
    
    -- 上下文信息
    context_type VARCHAR(50), -- 'task_execution', 'patrol', 'office'
    related_task_id UUID REFERENCES tasks(id),
    
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 6. 智能助手系统
-- =====================================================

-- 6.1 对话会话表
CREATE TABLE ai_chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    session_name VARCHAR(200),
    context_type VARCHAR(50), -- 'general', 'task_help', 'data_analysis', 'problem_solving'
    related_task_id UUID REFERENCES tasks(id),
    
    -- 会话状态
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'ended', 'archived')),
    total_messages INTEGER DEFAULT 0,
    last_message_at TIMESTAMP WITH TIME ZONE,
    
    -- 会话元数据
    metadata JSONB DEFAULT '{}',
    tags VARCHAR[] DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6.2 对话消息表
CREATE TABLE ai_chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES ai_chat_sessions(id),
    message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('user', 'assistant', 'system')),
    
    -- 消息内容
    content TEXT NOT NULL,
    content_type VARCHAR(20) DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'audio', 'file')),
    attachments JSONB DEFAULT '[]',
    
    -- AI处理信息
    ai_model_used VARCHAR(100),
    ai_processing_time INTEGER, -- 毫秒
    ai_confidence_score DECIMAL(5,2),
    ai_intent_detected VARCHAR(100),
    ai_entities_extracted JSONB,
    
    -- 用户反馈
    user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
    user_feedback TEXT,
    is_helpful BOOLEAN,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6.3 知识库表
CREATE TABLE knowledge_base (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    keywords VARCHAR[] DEFAULT '{}',
    tags VARCHAR[] DEFAULT '{}',
    
    -- 内容元数据
    content_type VARCHAR(50) CHECK (content_type IN ('faq', 'guide', 'policy', 'best_practice')),
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
    target_roles VARCHAR[] DEFAULT '{}',
    
    -- 使用统计
    view_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    unhelpful_count INTEGER DEFAULT 0,
    avg_rating DECIMAL(3,2),
    
    -- 版本控制
    version VARCHAR(20) DEFAULT '1.0',
    source_reference TEXT,
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id),
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 7. 消息通知系统
-- =====================================================

-- 7.1 消息模板表
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    
    -- 模板内容
    title_template TEXT NOT NULL,
    content_template TEXT NOT NULL,
    action_template JSONB, -- 行动按钮配置
    
    -- 发送配置
    channels VARCHAR[] DEFAULT '{"app"}', -- app, sms, email, wechat
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    
    -- 条件配置
    trigger_conditions JSONB,
    target_roles VARCHAR[] DEFAULT '{}',
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7.2 消息通知表
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES notification_templates(id),
    recipient_id UUID NOT NULL REFERENCES users(id),
    
    -- 消息内容
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    data JSONB DEFAULT '{}', -- 附加数据
    actions JSONB DEFAULT '[]', -- 行动按钮
    
    -- 发送信息
    channels VARCHAR[] NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal',
    category VARCHAR(50),
    
    -- 状态跟踪
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- 用户操作
    user_action VARCHAR(50), -- clicked, dismissed, ignored
    action_data JSONB,
    action_at TIMESTAMP WITH TIME ZONE,
    
    -- 过期时间
    expires_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 8. 系统日志和配置
-- =====================================================

-- 8.1 系统配置表
CREATE TABLE system_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(200) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    category VARCHAR(100),
    
    -- 配置属性
    is_sensitive BOOLEAN DEFAULT false,
    is_readonly BOOLEAN DEFAULT false,
    validation_rule JSONB,
    
    -- 版本控制
    version INTEGER DEFAULT 1,
    previous_value JSONB,
    changed_by UUID REFERENCES users(id),
    change_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8.2 操作日志表
CREATE TABLE operation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    
    -- 操作信息
    operation_type VARCHAR(100) NOT NULL,
    operation_target VARCHAR(100),
    target_id UUID,
    
    -- 请求信息
    request_method VARCHAR(10),
    request_path TEXT,
    request_params JSONB,
    request_body JSONB,
    
    -- 响应信息
    response_status INTEGER,
    response_data JSONB,
    response_time INTEGER, -- 毫秒
    
    -- 环境信息
    ip_address INET,
    user_agent TEXT,
    device_info JSONB,
    
    -- 结果信息
    is_success BOOLEAN,
    error_message TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8.3 系统错误日志表
CREATE TABLE error_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    error_code VARCHAR(100),
    error_message TEXT NOT NULL,
    error_stack TEXT,
    
    -- 上下文信息
    user_id UUID REFERENCES users(id),
    request_id UUID,
    session_id UUID,
    
    -- 错误详情
    component VARCHAR(100),
    function_name VARCHAR(200),
    file_path TEXT,
    line_number INTEGER,
    
    -- 环境信息
    environment VARCHAR(50),
    version VARCHAR(50),
    
    -- 处理状态
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'investigating', 'resolved', 'ignored')),
    assigned_to UUID REFERENCES users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 9. 索引创建
-- =====================================================

-- 用户表索引
CREATE INDEX idx_users_employee_id ON users(employee_id);
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_current_role ON users(current_role);

-- 任务表索引
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_tasks_creator_id ON tasks(creator_id);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_deadline ON tasks(deadline);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);
CREATE INDEX idx_tasks_location ON tasks USING GIST(location_coordinates);
CREATE INDEX idx_tasks_ai_recommended ON tasks(ai_recommended);

-- 数据质量评分表索引
CREATE INDEX idx_data_quality_scores_user_id ON data_quality_scores(user_id);
CREATE INDEX idx_data_quality_scores_organization_id ON data_quality_scores(organization_id);
CREATE INDEX idx_data_quality_scores_period ON data_quality_scores(score_period, period_start_date, period_end_date);
CREATE INDEX idx_data_quality_scores_calculated_at ON data_quality_scores(calculated_at);

-- OCR识别记录表索引
CREATE INDEX idx_ocr_records_task_id ON ocr_recognition_records(task_id);
CREATE INDEX idx_ocr_records_user_id ON ocr_recognition_records(user_id);
CREATE INDEX idx_ocr_records_type ON ocr_recognition_records(recognition_type);
CREATE INDEX idx_ocr_records_created_at ON ocr_recognition_records(created_at);

-- 地理数据索引
CREATE INDEX idx_grid_areas_boundary ON grid_areas USING GIST(boundary);
CREATE INDEX idx_grid_areas_center_point ON grid_areas USING GIST(center_point);
CREATE INDEX idx_location_tracks_point ON location_tracks USING GIST(location_point);
CREATE INDEX idx_location_tracks_user_time ON location_tracks(user_id, recorded_at);

-- 智能助手索引
CREATE INDEX idx_chat_sessions_user_id ON ai_chat_sessions(user_id);
CREATE INDEX idx_chat_messages_session_id ON ai_chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON ai_chat_messages(created_at);

-- 通知索引
CREATE INDEX idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- 全文搜索索引
CREATE INDEX idx_knowledge_base_content_search ON knowledge_base USING GIN(to_tsvector('chinese', title || ' ' || content));
CREATE INDEX idx_tasks_text_search ON tasks USING GIN(to_tsvector('chinese', title || ' ' || description));

-- =====================================================
-- 10. 触发器和函数
-- =====================================================

-- 自动更新时间戳触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有有updated_at字段的表创建触发器
DO $$
DECLARE
    table_name TEXT;
    tables TEXT[] := ARRAY[
        'organizations', 'roles', 'users', 'task_categories', 'tasks',
        'ocr_recognition_records', 'ai_recommendations', 'intelligent_dispatch_records',
        'data_quality_dimensions', 'administrative_regions', 'grid_areas',
        'ai_chat_sessions', 'knowledge_base', 'notification_templates',
        'notifications', 'system_configs', 'error_logs'
    ];
BEGIN
    FOREACH table_name IN ARRAY tables
    LOOP
        EXECUTE format('
            CREATE TRIGGER trigger_update_%I_updated_at
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        ', table_name, table_name);
    END LOOP;
END $$;

-- 任务状态变更记录触发器
CREATE OR REPLACE FUNCTION log_task_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO task_execution_logs (task_id, user_id, action, details)
        VALUES (
            NEW.id,
            NEW.assignee_id,
            'status_change',
            jsonb_build_object(
                'old_status', OLD.status,
                'new_status', NEW.status,
                'changed_at', CURRENT_TIMESTAMP
            )
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_task_status_change
    AFTER UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION log_task_status_change();

-- 数据质量评分计算函数
CREATE OR REPLACE FUNCTION calculate_data_quality_score(
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE
) RETURNS DECIMAL(5,2) AS $$
DECLARE
    completeness_score DECIMAL(5,2);
    accuracy_score DECIMAL(5,2);
    consistency_score DECIMAL(5,2);
    timeliness_score DECIMAL(5,2);
    compliance_score DECIMAL(5,2);
    uniqueness_score DECIMAL(5,2);
    overall_score DECIMAL(5,2);
BEGIN
    -- 这里实现具体的评分算法
    -- 完整性评分 (30%)
    SELECT COALESCE(AVG(
        CASE 
            WHEN (data_after->>'completeness_rate')::DECIMAL >= 95 THEN 100
            WHEN (data_after->>'completeness_rate')::DECIMAL >= 90 THEN 85
            WHEN (data_after->>'completeness_rate')::DECIMAL >= 80 THEN 70
            ELSE 50
        END
    ), 70) INTO completeness_score
    FROM tasks 
    WHERE assignee_id = p_user_id 
    AND completed_at BETWEEN p_start_date AND p_end_date + INTERVAL '1 day'
    AND status = 'completed';
    
    -- 准确性评分 (25%) - 基于OCR置信度
    SELECT COALESCE(AVG(confidence_score), 80) INTO accuracy_score
    FROM ocr_recognition_records ocr
    JOIN tasks t ON ocr.task_id = t.id
    WHERE t.assignee_id = p_user_id
    AND ocr.created_at BETWEEN p_start_date AND p_end_date + INTERVAL '1 day';
    
    -- 其他维度暂时设置默认值
    consistency_score := 85.0;
    timeliness_score := 90.0;
    compliance_score := 95.0;
    uniqueness_score := 88.0;
    
    -- 计算总分
    overall_score := (
        completeness_score * 0.30 +
        accuracy_score * 0.25 +
        consistency_score * 0.20 +
        timeliness_score * 0.15 +
        compliance_score * 0.10
    );
    
    RETURN overall_score;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 11. 基础数据初始化
-- =====================================================

-- 插入基础角色
INSERT INTO roles (code, name, description, permissions) VALUES
('province_admin', '省级管理员', '省级数据管理和决策', '["view_all", "manage_all", "admin_config"]'),
('city_admin', '市级管理员', '市级数据管理和监督', '["view_city", "manage_city", "report_generate"]'),
('county_admin', '县级管理员', '县级数据管理和协调', '["view_county", "manage_county", "task_assign"]'),
('substation_manager', '供电所管理员', '供电所管理和任务分配', '["view_substation", "manage_workers", "task_dispatch"]'),
('grid_worker', '网格员', '数据采集和任务执行', '["view_tasks", "execute_tasks", "data_input"]');

-- 插入数据质量维度
INSERT INTO data_quality_dimensions (code, name, description, weight) VALUES
('completeness', '数据完整性', '数据字段填写完整程度', 0.30),
('accuracy', '数据准确性', '数据与实际情况匹配程度', 0.25),
('consistency', '数据一致性', '数据内部逻辑一致性', 0.20),
('timeliness', '数据时效性', '数据更新及时性', 0.15),
('compliance', '数据规范性', '数据格式标准化程度', 0.10);

-- 插入任务类别
INSERT INTO task_categories (code, name, description, icon, color, priority_weight) VALUES
('phone_verify', '手机号核实', '核实客户手机号码信息', 'phone', '#3B82F6', 1.0),
('address_verify', '地址核实', '核实客户地址信息', 'map-pin', '#10B981', 1.0),
('id_verify', '身份证核实', '核实客户身份证信息', 'credit-card', '#F59E0B', 1.2),
('contract_review', '合同审核', '审核各类合同文件', 'file-text', '#EF4444', 1.5),
('data_cleanup', '数据清理', '清理重复和错误数据', 'trash-2', '#6B7280', 0.8);

-- 插入消息模板
INSERT INTO notification_templates (code, name, category, title_template, content_template, channels) VALUES
('task_assigned', '任务分配通知', 'task', '您有新的任务待处理', '任务【{{task_title}}】已分配给您，请及时处理。截止时间：{{deadline}}', '{"app", "sms"}'),
('task_overdue', '任务逾期提醒', 'task', '任务即将逾期', '任务【{{task_title}}】将在{{hours}}小时后逾期，请尽快完成。', '{"app", "sms"}'),
('quality_score_update', '数据质量评分更新', 'quality', '您的数据质量评分已更新', '您本周的数据质量评分为{{score}}分，{{trend}}{{change}}分。', '{"app"}'),
('ai_recommendation', 'AI推荐通知', 'ai', 'AI为您推荐了{{type}}', '{{content}}', '{"app"}');

-- 插入系统配置
INSERT INTO system_configs (key, value, description, category) VALUES
('ocr.confidence_threshold', '0.80', 'OCR识别置信度阈值', 'ai'),
('task.auto_assign_enabled', 'true', '是否启用智能派单', 'task'),
('notification.push_enabled', 'true', '是否启用推送通知', 'notification'),
('quality.calculation_period', '"daily"', '数据质量评分计算周期', 'quality'),
('ai.recommendation_enabled', 'true', '是否启用AI推荐功能', 'ai');

-- =====================================================
-- 12. 数据库优化配置
-- =====================================================

-- 设置数据库参数优化
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements,auto_explain';
ALTER SYSTEM SET track_activity_query_size = 4096;
ALTER SYSTEM SET log_min_duration_statement = 1000;
ALTER SYSTEM SET auto_explain.log_min_duration = 2000;

-- 创建分区表函数（为大数据量表准备）
CREATE OR REPLACE FUNCTION create_monthly_partition(
    table_name TEXT,
    start_date DATE
) RETURNS VOID AS $$
DECLARE
    partition_name TEXT;
    end_date DATE;
BEGIN
    partition_name := table_name || '_' || to_char(start_date, 'YYYY_MM');
    end_date := start_date + INTERVAL '1 month';
    
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I PARTITION OF %I
        FOR VALUES FROM (%L) TO (%L)
    ', partition_name, table_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 数据模型设计完成
-- =====================================================

-- =====================================================
-- 13. 补充所有表的中文注释
-- =====================================================

-- 用户会话表注释
COMMENT ON TABLE user_sessions IS '用户会话表 - 存储用户登录会话信息';
COMMENT ON COLUMN user_sessions.id IS '主键ID';
COMMENT ON COLUMN user_sessions.user_id IS '用户ID';
COMMENT ON COLUMN user_sessions.token_hash IS '访问令牌哈希值';
COMMENT ON COLUMN user_sessions.refresh_token_hash IS '刷新令牌哈希值';
COMMENT ON COLUMN user_sessions.device_info IS '设备信息 - JSON格式';
COMMENT ON COLUMN user_sessions.ip_address IS 'IP地址';
COMMENT ON COLUMN user_sessions.user_agent IS '用户代理信息';
COMMENT ON COLUMN user_sessions.expires_at IS '过期时间';
COMMENT ON COLUMN user_sessions.created_at IS '创建时间';
COMMENT ON COLUMN user_sessions.last_used_at IS '最后使用时间';

-- 任务类别表注释
COMMENT ON TABLE task_categories IS '任务类别表 - 存储任务分类配置';
COMMENT ON COLUMN task_categories.id IS '主键ID';
COMMENT ON COLUMN task_categories.code IS '类别编码 - 唯一标识';
COMMENT ON COLUMN task_categories.name IS '类别名称';
COMMENT ON COLUMN task_categories.description IS '类别描述';
COMMENT ON COLUMN task_categories.icon IS '图标名称';
COMMENT ON COLUMN task_categories.color IS '显示颜色';
COMMENT ON COLUMN task_categories.priority_weight IS '优先级权重';
COMMENT ON COLUMN task_categories.is_active IS '是否启用';
COMMENT ON COLUMN task_categories.created_at IS '创建时间';
COMMENT ON COLUMN task_categories.updated_at IS '更新时间';

-- 任务表注释
COMMENT ON TABLE tasks IS '任务表 - 存储数据治理任务信息';
COMMENT ON COLUMN tasks.id IS '主键ID';
COMMENT ON COLUMN tasks.title IS '任务标题';
COMMENT ON COLUMN tasks.description IS '任务描述';
COMMENT ON COLUMN tasks.category_id IS '任务类别ID';
COMMENT ON COLUMN tasks.priority IS '优先级 - low:低, medium:中, high:高, urgent:紧急';
COMMENT ON COLUMN tasks.status IS '任务状态 - pending:待处理, assigned:已分配, in_progress:进行中, completed:已完成, cancelled:已取消';
COMMENT ON COLUMN tasks.difficulty IS '难度等级 - 1到5级';
COMMENT ON COLUMN tasks.creator_id IS '创建人ID';
COMMENT ON COLUMN tasks.assignee_id IS '执行人ID';
COMMENT ON COLUMN tasks.assigned_at IS '分配时间';
COMMENT ON COLUMN tasks.estimated_duration IS '预估耗时(分钟)';
COMMENT ON COLUMN tasks.actual_duration IS '实际耗时(分钟)';
COMMENT ON COLUMN tasks.deadline IS '截止时间';
COMMENT ON COLUMN tasks.started_at IS '开始时间';
COMMENT ON COLUMN tasks.completed_at IS '完成时间';
COMMENT ON COLUMN tasks.location_address IS '任务地址';
COMMENT ON COLUMN tasks.location_coordinates IS '地理坐标';
COMMENT ON COLUMN tasks.location_radius IS '任务有效范围(米)';
COMMENT ON COLUMN tasks.ai_recommended IS '是否AI推荐';
COMMENT ON COLUMN tasks.ai_confidence_score IS 'AI推荐置信度';
COMMENT ON COLUMN tasks.ai_recommendation_reason IS 'AI推荐理由';
COMMENT ON COLUMN tasks.data_before IS '任务执行前数据 - JSON格式';
COMMENT ON COLUMN tasks.data_after IS '任务执行后数据 - JSON格式';
COMMENT ON COLUMN tasks.quality_improvement IS '数据质量提升分数';
COMMENT ON COLUMN tasks.reviewed_by IS '审核人ID';
COMMENT ON COLUMN tasks.reviewed_at IS '审核时间';
COMMENT ON COLUMN tasks.review_status IS '审核状态 - pending:待审核, approved:通过, rejected:拒绝';
COMMENT ON COLUMN tasks.review_comment IS '审核意见';
COMMENT ON COLUMN tasks.created_at IS '创建时间';
COMMENT ON COLUMN tasks.updated_at IS '更新时间';

-- 任务执行记录表注释
COMMENT ON TABLE task_execution_logs IS '任务执行记录表 - 记录任务执行过程';
COMMENT ON COLUMN task_execution_logs.id IS '主键ID';
COMMENT ON COLUMN task_execution_logs.task_id IS '任务ID';
COMMENT ON COLUMN task_execution_logs.user_id IS '用户ID';
COMMENT ON COLUMN task_execution_logs.action IS '操作类型';
COMMENT ON COLUMN task_execution_logs.details IS '操作详情 - JSON格式';
COMMENT ON COLUMN task_execution_logs.location_coordinates IS '操作位置坐标';
COMMENT ON COLUMN task_execution_logs.created_at IS '创建时间';

-- 任务附件表注释
COMMENT ON TABLE task_attachments IS '任务附件表 - 存储任务相关文件';
COMMENT ON COLUMN task_attachments.id IS '主键ID';
COMMENT ON COLUMN task_attachments.task_id IS '任务ID';
COMMENT ON COLUMN task_attachments.file_name IS '文件名';
COMMENT ON COLUMN task_attachments.file_type IS '文件类型';
COMMENT ON COLUMN task_attachments.file_size IS '文件大小(字节)';
COMMENT ON COLUMN task_attachments.file_url IS '文件URL';
COMMENT ON COLUMN task_attachments.upload_by IS '上传人ID';
COMMENT ON COLUMN task_attachments.created_at IS '创建时间';

-- OCR识别记录表注释
COMMENT ON TABLE ocr_recognition_records IS 'OCR识别记录表 - 存储文字识别结果';
COMMENT ON COLUMN ocr_recognition_records.id IS '主键ID';
COMMENT ON COLUMN ocr_recognition_records.task_id IS '关联任务ID';
COMMENT ON COLUMN ocr_recognition_records.user_id IS '用户ID';
COMMENT ON COLUMN ocr_recognition_records.recognition_type IS '识别类型 - id_card:身份证, business_license:营业执照, contract:合同, handwriting:手写';
COMMENT ON COLUMN ocr_recognition_records.original_image_url IS '原始图片URL';
COMMENT ON COLUMN ocr_recognition_records.image_quality_score IS '图片质量评分';
COMMENT ON COLUMN ocr_recognition_records.recognition_result IS 'OCR识别结果 - JSON格式';
COMMENT ON COLUMN ocr_recognition_records.raw_text IS '原始识别文本';
COMMENT ON COLUMN ocr_recognition_records.structured_data IS '结构化数据 - JSON格式';
COMMENT ON COLUMN ocr_recognition_records.confidence_score IS '置信度评分';
COMMENT ON COLUMN ocr_recognition_records.confidence_details IS '置信度详细信息 - JSON格式';
COMMENT ON COLUMN ocr_recognition_records.processing_start_at IS '处理开始时间';
COMMENT ON COLUMN ocr_recognition_records.processing_end_at IS '处理结束时间';
COMMENT ON COLUMN ocr_recognition_records.processing_duration IS '处理耗时(毫秒)';
COMMENT ON COLUMN ocr_recognition_records.is_verified IS '是否已验证';
COMMENT ON COLUMN ocr_recognition_records.verification_result IS '验证结果 - JSON格式';
COMMENT ON COLUMN ocr_recognition_records.manual_corrections IS '人工修正 - JSON格式';
COMMENT ON COLUMN ocr_recognition_records.final_result IS '最终结果 - JSON格式';
COMMENT ON COLUMN ocr_recognition_records.created_at IS '创建时间';
COMMENT ON COLUMN ocr_recognition_records.updated_at IS '更新时间';

-- 智能推荐记录表注释
COMMENT ON TABLE ai_recommendations IS 'AI推荐记录表 - 存储智能推荐信息';
COMMENT ON COLUMN ai_recommendations.id IS '主键ID';
COMMENT ON COLUMN ai_recommendations.recommendation_type IS '推荐类型 - task_assignment:任务分配, function_usage:功能使用, best_practice:最佳实践';
COMMENT ON COLUMN ai_recommendations.target_user_id IS '目标用户ID';
COMMENT ON COLUMN ai_recommendations.content IS '推荐内容 - JSON格式';
COMMENT ON COLUMN ai_recommendations.confidence_score IS '推荐置信度';
COMMENT ON COLUMN ai_recommendations.algorithm_used IS '使用的算法';
COMMENT ON COLUMN ai_recommendations.reasoning IS '推荐理由';
COMMENT ON COLUMN ai_recommendations.data_sources IS '数据来源 - JSON格式';
COMMENT ON COLUMN ai_recommendations.user_feedback IS '用户反馈 - accepted:接受, rejected:拒绝, ignored:忽略';
COMMENT ON COLUMN ai_recommendations.feedback_comment IS '反馈意见';
COMMENT ON COLUMN ai_recommendations.feedback_at IS '反馈时间';
COMMENT ON COLUMN ai_recommendations.effectiveness_score IS '推荐有效性评分';
COMMENT ON COLUMN ai_recommendations.measured_at IS '效果测量时间';
COMMENT ON COLUMN ai_recommendations.created_at IS '创建时间';
COMMENT ON COLUMN ai_recommendations.updated_at IS '更新时间';

-- 智能派单记录表注释
COMMENT ON TABLE intelligent_dispatch_records IS '智能派单记录表 - 存储AI派单决策过程';
COMMENT ON COLUMN intelligent_dispatch_records.id IS '主键ID';
COMMENT ON COLUMN intelligent_dispatch_records.task_id IS '任务ID';
COMMENT ON COLUMN intelligent_dispatch_records.candidate_users IS '候选用户列表 - JSON格式';
COMMENT ON COLUMN intelligent_dispatch_records.selected_user_id IS '选中用户ID';
COMMENT ON COLUMN intelligent_dispatch_records.algorithm_version IS '算法版本';
COMMENT ON COLUMN intelligent_dispatch_records.scoring_factors IS '评分因子 - JSON格式';
COMMENT ON COLUMN intelligent_dispatch_records.auto_assigned IS '是否自动分配';
COMMENT ON COLUMN intelligent_dispatch_records.manual_override IS '是否人工干预';
COMMENT ON COLUMN intelligent_dispatch_records.override_reason IS '干预原因';
COMMENT ON COLUMN intelligent_dispatch_records.dispatch_decision_by IS '派单决策人ID';
COMMENT ON COLUMN intelligent_dispatch_records.actual_completion_time IS '实际完成用时(分钟)';
COMMENT ON COLUMN intelligent_dispatch_records.predicted_completion_time IS '预测完成用时(分钟)';
COMMENT ON COLUMN intelligent_dispatch_records.prediction_accuracy IS '预测准确度';
COMMENT ON COLUMN intelligent_dispatch_records.created_at IS '创建时间';
COMMENT ON COLUMN intelligent_dispatch_records.updated_at IS '更新时间';

-- 数据质量维度配置表注释
COMMENT ON TABLE data_quality_dimensions IS '数据质量维度配置表 - 定义质量评估维度';
COMMENT ON COLUMN data_quality_dimensions.id IS '主键ID';
COMMENT ON COLUMN data_quality_dimensions.code IS '维度编码 - 唯一标识';
COMMENT ON COLUMN data_quality_dimensions.name IS '维度名称';
COMMENT ON COLUMN data_quality_dimensions.description IS '维度描述';
COMMENT ON COLUMN data_quality_dimensions.weight IS '权重';
COMMENT ON COLUMN data_quality_dimensions.calculation_formula IS '计算公式';
COMMENT ON COLUMN data_quality_dimensions.is_active IS '是否启用';
COMMENT ON COLUMN data_quality_dimensions.created_at IS '创建时间';
COMMENT ON COLUMN data_quality_dimensions.updated_at IS '更新时间';

-- 数据质量评分表注释
COMMENT ON TABLE data_quality_scores IS '数据质量评分表 - 存储用户数据质量评分';
COMMENT ON COLUMN data_quality_scores.id IS '主键ID';
COMMENT ON COLUMN data_quality_scores.user_id IS '用户ID';
COMMENT ON COLUMN data_quality_scores.organization_id IS '组织ID';
COMMENT ON COLUMN data_quality_scores.overall_score IS '总体评分';
COMMENT ON COLUMN data_quality_scores.previous_score IS '上期评分';
COMMENT ON COLUMN data_quality_scores.score_change IS '评分变化';
COMMENT ON COLUMN data_quality_scores.completeness_score IS '完整性评分';
COMMENT ON COLUMN data_quality_scores.accuracy_score IS '准确性评分';
COMMENT ON COLUMN data_quality_scores.consistency_score IS '一致性评分';
COMMENT ON COLUMN data_quality_scores.timeliness_score IS '时效性评分';
COMMENT ON COLUMN data_quality_scores.compliance_score IS '合规性评分';
COMMENT ON COLUMN data_quality_scores.uniqueness_score IS '唯一性评分';
COMMENT ON COLUMN data_quality_scores.score_details IS '评分详情 - JSON格式';
COMMENT ON COLUMN data_quality_scores.improvement_suggestions IS '改进建议 - JSON格式';
COMMENT ON COLUMN data_quality_scores.score_period IS '评分周期 - daily:日度, weekly:周度, monthly:月度';
COMMENT ON COLUMN data_quality_scores.period_start_date IS '周期开始日期';
COMMENT ON COLUMN data_quality_scores.period_end_date IS '周期结束日期';
COMMENT ON COLUMN data_quality_scores.calculated_at IS '计算时间';
COMMENT ON COLUMN data_quality_scores.created_at IS '创建时间';

-- 行政区域表注释
COMMENT ON TABLE administrative_regions IS '行政区域表 - 存储省市县乡镇区域信息';
COMMENT ON COLUMN administrative_regions.id IS '主键ID';
COMMENT ON COLUMN administrative_regions.code IS '区域编码 - 唯一标识';
COMMENT ON COLUMN administrative_regions.name IS '区域名称';
COMMENT ON COLUMN administrative_regions.level IS '行政层级 - 1:省 2:市 3:县 4:乡镇';
COMMENT ON COLUMN administrative_regions.parent_id IS '上级区域ID';
COMMENT ON COLUMN administrative_regions.boundary IS '行政边界 - 多边形几何';
COMMENT ON COLUMN administrative_regions.center_point IS '中心点坐标';
COMMENT ON COLUMN administrative_regions.area_km2 IS '面积(平方公里)';
COMMENT ON COLUMN administrative_regions.population IS '人口数量';
COMMENT ON COLUMN administrative_regions.is_active IS '是否启用';
COMMENT ON COLUMN administrative_regions.created_at IS '创建时间';
COMMENT ON COLUMN administrative_regions.updated_at IS '更新时间';

-- 网格区域表注释
COMMENT ON TABLE grid_areas IS '网格区域表 - 存储网格化管理区域';
COMMENT ON COLUMN grid_areas.id IS '主键ID';
COMMENT ON COLUMN grid_areas.code IS '网格编码 - 唯一标识';
COMMENT ON COLUMN grid_areas.name IS '网格名称';
COMMENT ON COLUMN grid_areas.organization_id IS '所属组织ID';
COMMENT ON COLUMN grid_areas.region_id IS '所属行政区域ID';
COMMENT ON COLUMN grid_areas.boundary IS '网格边界 - 多边形几何';
COMMENT ON COLUMN grid_areas.center_point IS '中心点坐标';
COMMENT ON COLUMN grid_areas.area_km2 IS '面积(平方公里)';
COMMENT ON COLUMN grid_areas.max_grid_workers IS '最大网格员数量';
COMMENT ON COLUMN grid_areas.current_grid_workers IS '当前网格员数量';
COMMENT ON COLUMN grid_areas.avg_quality_score IS '平均数据质量评分';
COMMENT ON COLUMN grid_areas.task_density IS '任务密度(每平方公里任务数)';
COMMENT ON COLUMN grid_areas.is_active IS '是否启用';
COMMENT ON COLUMN grid_areas.created_at IS '创建时间';
COMMENT ON COLUMN grid_areas.updated_at IS '更新时间';

-- 用户网格关联表注释
COMMENT ON TABLE user_grid_assignments IS '用户网格关联表 - 存储网格员分配信息';
COMMENT ON COLUMN user_grid_assignments.id IS '主键ID';
COMMENT ON COLUMN user_grid_assignments.user_id IS '用户ID';
COMMENT ON COLUMN user_grid_assignments.grid_area_id IS '网格区域ID';
COMMENT ON COLUMN user_grid_assignments.assignment_type IS '分配类型 - primary:主要, backup:备用, temporary:临时';
COMMENT ON COLUMN user_grid_assignments.start_date IS '开始日期';
COMMENT ON COLUMN user_grid_assignments.end_date IS '结束日期';
COMMENT ON COLUMN user_grid_assignments.is_active IS '是否有效';
COMMENT ON COLUMN user_grid_assignments.created_at IS '创建时间';

-- 位置轨迹表注释
COMMENT ON TABLE location_tracks IS '位置轨迹表 - 存储用户位置轨迹信息';
COMMENT ON COLUMN location_tracks.id IS '主键ID';
COMMENT ON COLUMN location_tracks.user_id IS '用户ID';
COMMENT ON COLUMN location_tracks.location_point IS '位置坐标';
COMMENT ON COLUMN location_tracks.accuracy_meters IS '定位精度(米)';
COMMENT ON COLUMN location_tracks.altitude_meters IS '海拔高度(米)';
COMMENT ON COLUMN location_tracks.heading_degrees IS '方向角度';
COMMENT ON COLUMN location_tracks.speed_kmh IS '移动速度(公里/小时)';
COMMENT ON COLUMN location_tracks.context_type IS '上下文类型 - task_execution:执行任务, patrol:巡查, office:办公';
COMMENT ON COLUMN location_tracks.related_task_id IS '关联任务ID';
COMMENT ON COLUMN location_tracks.recorded_at IS '记录时间';
COMMENT ON COLUMN location_tracks.created_at IS '创建时间';

-- AI对话会话表注释
COMMENT ON TABLE ai_chat_sessions IS 'AI对话会话表 - 存储用户与AI助手的对话会话';
COMMENT ON COLUMN ai_chat_sessions.id IS '主键ID';
COMMENT ON COLUMN ai_chat_sessions.user_id IS '用户ID';
COMMENT ON COLUMN ai_chat_sessions.session_name IS '会话名称';
COMMENT ON COLUMN ai_chat_sessions.context_type IS '会话类型 - general:通用, task_help:任务帮助, data_analysis:数据分析, problem_solving:问题解决';
COMMENT ON COLUMN ai_chat_sessions.related_task_id IS '关联任务ID';
COMMENT ON COLUMN ai_chat_sessions.status IS '会话状态 - active:活跃, ended:结束, archived:已归档';
COMMENT ON COLUMN ai_chat_sessions.total_messages IS '消息总数';
COMMENT ON COLUMN ai_chat_sessions.last_message_at IS '最后消息时间';
COMMENT ON COLUMN ai_chat_sessions.metadata IS '会话元数据 - JSON格式';
COMMENT ON COLUMN ai_chat_sessions.tags IS '标签数组';
COMMENT ON COLUMN ai_chat_sessions.created_at IS '创建时间';
COMMENT ON COLUMN ai_chat_sessions.updated_at IS '更新时间';

-- AI对话消息表注释
COMMENT ON TABLE ai_chat_messages IS 'AI对话消息表 - 存储对话消息内容';
COMMENT ON COLUMN ai_chat_messages.id IS '主键ID';
COMMENT ON COLUMN ai_chat_messages.session_id IS '会话ID';
COMMENT ON COLUMN ai_chat_messages.message_type IS '消息类型 - user:用户, assistant:助手, system:系统';
COMMENT ON COLUMN ai_chat_messages.content IS '消息内容';
COMMENT ON COLUMN ai_chat_messages.content_type IS '内容类型 - text:文本, image:图片, audio:音频, file:文件';
COMMENT ON COLUMN ai_chat_messages.attachments IS '附件列表 - JSON格式';
COMMENT ON COLUMN ai_chat_messages.ai_model_used IS '使用的AI模型';
COMMENT ON COLUMN ai_chat_messages.ai_processing_time IS 'AI处理时间(毫秒)';
COMMENT ON COLUMN ai_chat_messages.ai_confidence_score IS 'AI回复置信度';
COMMENT ON COLUMN ai_chat_messages.ai_intent_detected IS 'AI检测到的意图';
COMMENT ON COLUMN ai_chat_messages.ai_entities_extracted IS 'AI提取的实体 - JSON格式';
COMMENT ON COLUMN ai_chat_messages.user_rating IS '用户评分 - 1到5分';
COMMENT ON COLUMN ai_chat_messages.user_feedback IS '用户反馈';
COMMENT ON COLUMN ai_chat_messages.is_helpful IS '是否有帮助';
COMMENT ON COLUMN ai_chat_messages.created_at IS '创建时间';

-- 知识库表注释
COMMENT ON TABLE knowledge_base IS '知识库表 - 存储AI助手知识内容';
COMMENT ON COLUMN knowledge_base.id IS '主键ID';
COMMENT ON COLUMN knowledge_base.category IS '知识分类';
COMMENT ON COLUMN knowledge_base.title IS '知识标题';
COMMENT ON COLUMN knowledge_base.content IS '知识内容';
COMMENT ON COLUMN knowledge_base.keywords IS '关键词数组';
COMMENT ON COLUMN knowledge_base.tags IS '标签数组';
COMMENT ON COLUMN knowledge_base.content_type IS '内容类型 - faq:常见问题, guide:指南, policy:政策, best_practice:最佳实践';
COMMENT ON COLUMN knowledge_base.difficulty_level IS '难度等级 - 1到5级';
COMMENT ON COLUMN knowledge_base.target_roles IS '目标角色数组';
COMMENT ON COLUMN knowledge_base.view_count IS '查看次数';
COMMENT ON COLUMN knowledge_base.helpful_count IS '有用数量';
COMMENT ON COLUMN knowledge_base.unhelpful_count IS '无用数量';
COMMENT ON COLUMN knowledge_base.avg_rating IS '平均评分';
COMMENT ON COLUMN knowledge_base.version IS '版本号';
COMMENT ON COLUMN knowledge_base.source_reference IS '来源引用';
COMMENT ON COLUMN knowledge_base.last_reviewed_at IS '最后审核时间';
COMMENT ON COLUMN knowledge_base.reviewed_by IS '审核人ID';
COMMENT ON COLUMN knowledge_base.is_active IS '是否启用';
COMMENT ON COLUMN knowledge_base.created_at IS '创建时间';
COMMENT ON COLUMN knowledge_base.updated_at IS '更新时间';

-- 消息模板表注释
COMMENT ON TABLE notification_templates IS '消息模板表 - 存储通知消息模板';
COMMENT ON COLUMN notification_templates.id IS '主键ID';
COMMENT ON COLUMN notification_templates.code IS '模板编码 - 唯一标识';
COMMENT ON COLUMN notification_templates.name IS '模板名称';
COMMENT ON COLUMN notification_templates.category IS '模板分类';
COMMENT ON COLUMN notification_templates.title_template IS '标题模板';
COMMENT ON COLUMN notification_templates.content_template IS '内容模板';
COMMENT ON COLUMN notification_templates.action_template IS '操作按钮模板 - JSON格式';
COMMENT ON COLUMN notification_templates.channels IS '发送渠道数组 - app:应用内, sms:短信, email:邮件, wechat:微信';
COMMENT ON COLUMN notification_templates.priority IS '优先级 - low:低, normal:正常, high:高, urgent:紧急';
COMMENT ON COLUMN notification_templates.trigger_conditions IS '触发条件 - JSON格式';
COMMENT ON COLUMN notification_templates.target_roles IS '目标角色数组';
COMMENT ON COLUMN notification_templates.is_active IS '是否启用';
COMMENT ON COLUMN notification_templates.created_at IS '创建时间';
COMMENT ON COLUMN notification_templates.updated_at IS '更新时间';

-- 消息通知表注释
COMMENT ON TABLE notifications IS '消息通知表 - 存储用户通知消息';
COMMENT ON COLUMN notifications.id IS '主键ID';
COMMENT ON COLUMN notifications.template_id IS '模板ID';
COMMENT ON COLUMN notifications.recipient_id IS '接收人ID';
COMMENT ON COLUMN notifications.title IS '消息标题';
COMMENT ON COLUMN notifications.content IS '消息内容';
COMMENT ON COLUMN notifications.data IS '附加数据 - JSON格式';
COMMENT ON COLUMN notifications.actions IS '操作按钮 - JSON格式';
COMMENT ON COLUMN notifications.channels IS '发送渠道数组';
COMMENT ON COLUMN notifications.priority IS '优先级';
COMMENT ON COLUMN notifications.category IS '消息分类';
COMMENT ON COLUMN notifications.status IS '消息状态 - pending:待发送, sent:已发送, delivered:已送达, read:已读, failed:失败';
COMMENT ON COLUMN notifications.sent_at IS '发送时间';
COMMENT ON COLUMN notifications.delivered_at IS '送达时间';
COMMENT ON COLUMN notifications.read_at IS '阅读时间';
COMMENT ON COLUMN notifications.user_action IS '用户操作 - clicked:点击, dismissed:忽略, ignored:未操作';
COMMENT ON COLUMN notifications.action_data IS '操作数据 - JSON格式';
COMMENT ON COLUMN notifications.action_at IS '操作时间';
COMMENT ON COLUMN notifications.expires_at IS '过期时间';
COMMENT ON COLUMN notifications.created_at IS '创建时间';
COMMENT ON COLUMN notifications.updated_at IS '更新时间';

-- 系统配置表注释
COMMENT ON TABLE system_configs IS '系统配置表 - 存储系统参数配置';
COMMENT ON COLUMN system_configs.id IS '主键ID';
COMMENT ON COLUMN system_configs.key IS '配置键 - 唯一标识';
COMMENT ON COLUMN system_configs.value IS '配置值 - JSON格式';
COMMENT ON COLUMN system_configs.description IS '配置描述';
COMMENT ON COLUMN system_configs.category IS '配置分类';
COMMENT ON COLUMN system_configs.is_sensitive IS '是否敏感信息';
COMMENT ON COLUMN system_configs.is_readonly IS '是否只读';
COMMENT ON COLUMN system_configs.validation_rule IS '验证规则 - JSON格式';
COMMENT ON COLUMN system_configs.version IS '版本号';
COMMENT ON COLUMN system_configs.previous_value IS '上一个值 - JSON格式';
COMMENT ON COLUMN system_configs.changed_by IS '修改人ID';
COMMENT ON COLUMN system_configs.change_reason IS '修改原因';
COMMENT ON COLUMN system_configs.created_at IS '创建时间';
COMMENT ON COLUMN system_configs.updated_at IS '更新时间';

-- 操作日志表注释
COMMENT ON TABLE operation_logs IS '操作日志表 - 记录用户操作行为';
COMMENT ON COLUMN operation_logs.id IS '主键ID';
COMMENT ON COLUMN operation_logs.user_id IS '用户ID';
COMMENT ON COLUMN operation_logs.operation_type IS '操作类型';
COMMENT ON COLUMN operation_logs.operation_target IS '操作目标';
COMMENT ON COLUMN operation_logs.target_id IS '目标对象ID';
COMMENT ON COLUMN operation_logs.request_method IS '请求方法';
COMMENT ON COLUMN operation_logs.request_path IS '请求路径';
COMMENT ON COLUMN operation_logs.request_params IS '请求参数 - JSON格式';
COMMENT ON COLUMN operation_logs.request_body IS '请求体 - JSON格式';
COMMENT ON COLUMN operation_logs.response_status IS '响应状态码';
COMMENT ON COLUMN operation_logs.response_data IS '响应数据 - JSON格式';
COMMENT ON COLUMN operation_logs.response_time IS '响应时间(毫秒)';
COMMENT ON COLUMN operation_logs.ip_address IS 'IP地址';
COMMENT ON COLUMN operation_logs.user_agent IS '用户代理';
COMMENT ON COLUMN operation_logs.device_info IS '设备信息 - JSON格式';
COMMENT ON COLUMN operation_logs.is_success IS '是否成功';
COMMENT ON COLUMN operation_logs.error_message IS '错误信息';
COMMENT ON COLUMN operation_logs.created_at IS '创建时间';

-- 系统错误日志表注释
COMMENT ON TABLE error_logs IS '系统错误日志表 - 记录系统错误信息';
COMMENT ON COLUMN error_logs.id IS '主键ID';
COMMENT ON COLUMN error_logs.error_code IS '错误代码';
COMMENT ON COLUMN error_logs.error_message IS '错误信息';
COMMENT ON COLUMN error_logs.error_stack IS '错误堆栈';
COMMENT ON COLUMN error_logs.user_id IS '用户ID';
COMMENT ON COLUMN error_logs.request_id IS '请求ID';
COMMENT ON COLUMN error_logs.session_id IS '会话ID';
COMMENT ON COLUMN error_logs.component IS '组件名称';
COMMENT ON COLUMN error_logs.function_name IS '函数名称';
COMMENT ON COLUMN error_logs.file_path IS '文件路径';
COMMENT ON COLUMN error_logs.line_number IS '行号';
COMMENT ON COLUMN error_logs.environment IS '运行环境';
COMMENT ON COLUMN error_logs.version IS '版本号';
COMMENT ON COLUMN error_logs.status IS '处理状态 - new:新增, investigating:调查中, resolved:已解决, ignored:已忽略';
COMMENT ON COLUMN error_logs.assigned_to IS '分配给谁处理';
COMMENT ON COLUMN error_logs.resolved_at IS '解决时间';
COMMENT ON COLUMN error_logs.resolution_notes IS '解决方案说明';
COMMENT ON COLUMN error_logs.created_at IS '创建时间';
COMMENT ON COLUMN error_logs.updated_at IS '更新时间';

-- 数据库版本信息
INSERT INTO system_configs (key, value, description, category) VALUES
('database.version', '"3.1.0"', '数据库模型版本', 'system'),
('database.created_at', to_jsonb(CURRENT_TIMESTAMP), '数据库创建时间', 'system'),
('database.description', '"数据守护者AI PostgreSQL数据模型 - 删除绩效管理和激励体系，聚焦AI核心功能"', '数据库描述', 'system');

COMMIT; 