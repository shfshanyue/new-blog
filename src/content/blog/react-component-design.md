---
title: React 组件设计全攻略：15+ 个核心 UI 组件设计模式与最佳实践
description: 深度解析 React 组件设计原则与实践，涵盖 Select、Modal、Table、Form 等 15+ 个核心 UI 组件的完整设计方案，包含 API 设计、交互逻辑和代码实现的最佳实践。
pubDatetime: 2020-08-15T00:00:00.000Z
tags:
  [
    "react",
    "component-design",
    "ui-library",
    "frontend-architecture",
    "design-patterns",
  ]
---

## 设计一个 Select 组件

```jsx
<Select value="about" onChange={handleChange} placeholder="请选择">
  <Select.Option value="home">Home</Select.Option>
  <Select.Option value="about">About</Select.Option>
  <Select.Option value="blog">Blog</Select.Option>
</Select>

// 支持多选
<Select mode="multiple" value={['home', 'about']} onChange={handleChange}>
  <Select.Option value="home">Home</Select.Option>
  <Select.Option value="about">About</Select.Option>
  <Select.Option value="blog">Blog</Select.Option>
</Select>
```

**设计要点：**

- 支持受控和非受控模式
- 支持单选、多选模式
- 键盘导航支持
- 虚拟滚动（大数据量场景）

## 设计一个 Icon 组件

```jsx
<Icon type="right" />
<Icon type="loading" spin />
<Icon type="heart" style={{ color: 'red', fontSize: '20px' }} />

// 支持自定义图标
<Icon component={CustomSvg} />
```

**设计要点：**

- 支持内置图标库和自定义图标
- 支持旋转、动画效果
- 可配置大小、颜色等样式属性

## 设计一个 Layout 组件

```jsx
<Layout>
  <Layout.Header>Header</Layout.Header>
  <Layout.Content>
    <Layout.Sider width={200}>Sider</Layout.Sider>
    <Layout.Content>Main Content</Layout.Content>
  </Layout.Content>
  <Layout.Footer>Footer</Layout.Footer>
</Layout>

// 响应式布局
<Layout responsive breakpoints={{ md: 768, lg: 1024 }}>
  <Layout.Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
  >
    Sidebar
  </Layout.Sider>
  <Layout.Content>Content</Layout.Content>
</Layout>
```

**设计要点：**

- 支持经典的上中下、左中右布局
- 侧边栏可折叠
- 响应式设计
- 灵活的嵌套组合

## 设计一个 Avatar 组件

```jsx
<Avatar size="large" src="/user.jpg" />
<Avatar size={64} icon="user" />
<Avatar style={{ backgroundColor: '#87d068' }}>张</Avatar>

// 头像组
<Avatar.Group maxCount={3} size="large">
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
  <Avatar src="/user4.jpg" />
</Avatar.Group>
```

**设计要点：**

- 支持图片、图标、文字显示
- 可配置大小、形状（圆形/方形）
- 头像组支持最大显示数量
- 图片加载失败时的降级处理

## 设计一个 Button 组件

```jsx
<Button type="primary" size="large" onClick={handleClick}>
  Primary Button
</Button>

<Button type="default" loading={isLoading}>
  <Icon type="download" />
  Download
</Button>

<Button type="link" href="/about">
  Link Button
</Button>

// 按钮组
<Button.Group>
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</Button.Group>
```

**设计要点：**

- 多种类型：primary、default、dashed、text、link
- 支持加载状态、禁用状态
- 可配置大小、形状
- 支持图标按钮和按钮组

## 设计一个 Input 组件

```jsx
<Input
  placeholder="请输入用户名"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

<Input.Password
  placeholder="请输入密码"
  visibilityToggle
/>

<Input.Search
  placeholder="搜索"
  enterButton
  onSearch={handleSearch}
/>

<Input.TextArea
  rows={4}
  placeholder="请输入描述"
  maxLength={200}
  showCount
/>
```

**设计要点：**

- 支持不同类型：text、password、search、textarea
- 前缀后缀插槽
- 字符计数、最大长度限制
- 清除按钮、密码可见性切换

## 设计一个 Modal 组件

```jsx
<Modal
  title="确认删除"
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
  okText="删除"
  cancelText="取消"
  okButtonProps={{ danger: true }}
>
  <p>确定要删除这个项目吗？此操作不可恢复。</p>
</Modal>;

// 函数式调用
Modal.confirm({
  title: "确认删除",
  content: "此操作不可恢复",
  onOk: () => handleDelete(),
});
```

**设计要点：**

- 支持声明式和函数式两种调用方式
- 可配置标题、内容、按钮文本
- 支持拖拽、全屏模式
- 键盘 ESC 关闭、点击遮罩关闭

## 设计一个 Table 组件

```jsx
<Table
  dataSource={dataSource}
  columns={[
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => <a>{text}</a>,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>
      ),
    },
  ]}
  pagination={{
    current: currentPage,
    pageSize: 10,
    total: total,
    onChange: handlePageChange,
  }}
  rowSelection={{
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  }}
/>
```

**设计要点：**

- 支持排序、筛选、分页
- 行选择功能
- 自定义列渲染
- 固定列、表头
- 虚拟滚动（大数据量）

## 设计一个 Tabs 组件

```jsx
<Tabs activeKey={activeKey} onChange={setActiveKey} type="card">
  <Tabs.TabPane tab="用户管理" key="users">
    <UserList />
  </Tabs.TabPane>
  <Tabs.TabPane tab="角色管理" key="roles">
    <RoleList />
  </Tabs.TabPane>
  <Tabs.TabPane
    tab={<span><Icon type="setting" />设置</span>}
    key="settings"
  >
    <Settings />
  </Tabs.TabPane>
</Tabs>

// 可编辑标签页
<Tabs
  type="editable-card"
  onEdit={(targetKey, action) => {
    if (action === 'add') {
      handleAddTab();
    } else {
      handleRemoveTab(targetKey);
    }
  }}
>
  {tabPanes}
</Tabs>
```

**设计要点：**

- 支持多种样式：line、card、editable-card
- 标签页可编辑（新增、删除）
- 支持图标、自定义标签内容
- 懒加载内容

## 设计一个 Form 组件

```jsx
<Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  initialValues={{ username: "", email: "" }}
>
  <Form.Item
    name="username"
    label="用户名"
    rules={[
      { required: true, message: "请输入用户名" },
      { min: 3, message: "用户名至少3个字符" },
    ]}
  >
    <Input placeholder="请输入用户名" />
  </Form.Item>

  <Form.Item
    name="email"
    label="邮箱"
    rules={[
      { required: true, message: "请输入邮箱" },
      { type: "email", message: "邮箱格式不正确" },
    ]}
  >
    <Input placeholder="请输入邮箱" />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      提交
    </Button>
  </Form.Item>
</Form>
```

**设计要点：**

- 字段验证、错误提示
- 支持同步和异步验证
- 多种布局方式
- 字段联动、动态字段

## 设计一个 Card 组件

```jsx
<Card
  title="卡片标题"
  extra={<Button type="link">更多</Button>}
  actions={[
    <Icon type="setting" />,
    <Icon type="edit" />,
    <Icon type="ellipsis" />
  ]}
>
  <p>卡片内容</p>
</Card>

<Card
  hoverable
  cover={<img src="/image.jpg" alt="cover" />}
  style={{ width: 300 }}
>
  <Card.Meta
    avatar={<Avatar src="/avatar.jpg" />}
    title="标题"
    description="描述信息"
  />
</Card>
```

**设计要点：**

- 支持标题、额外操作、底部操作
- 可配置封面图片
- 悬浮效果
- 加载状态

## 设计一个 DatePicker 组件

```jsx
<DatePicker
  placeholder="选择日期"
  onChange={handleDateChange}
  format="YYYY-MM-DD"
/>

<DatePicker.RangePicker
  placeholder={['开始日期', '结束日期']}
  onChange={handleRangeChange}
/>

<DatePicker
  showTime
  placeholder="选择日期时间"
  format="YYYY-MM-DD HH:mm:ss"
/>
```

**设计要点：**

- 支持日期、日期时间、日期范围选择
- 可配置日期格式
- 禁用日期、快捷选择
- 国际化支持

## 设计一个 Upload 组件

```jsx
<Upload
  action="/api/upload"
  listType="text"
  multiple
  onChange={handleUploadChange}
  beforeUpload={beforeUpload}
>
  <Button icon={<Icon type="upload" />}>上传文件</Button>
</Upload>

<Upload
  action="/api/upload"
  listType="picture-card"
  fileList={fileList}
  onPreview={handlePreview}
  onChange={handleChange}
>
  <div>
    <Icon type="plus" />
    <div style={{ marginTop: 8 }}>上传</div>
  </div>
</Upload>

// 拖拽上传
<Upload.Dragger
  action="/api/upload"
  multiple
  onChange={handleChange}
>
  <p><Icon type="inbox" style={{ fontSize: 48 }} /></p>
  <p>点击或拖拽文件到此区域上传</p>
</Upload.Dragger>
```

**设计要点：**

- 支持点击、拖拽上传
- 多种显示样式：文本、图片、卡片
- 文件预览、进度显示
- 上传前校验、自定义上传逻辑

## 设计一个 Tooltip 组件

```jsx
<Tooltip title="这是一个提示信息">
  <Button>悬浮显示提示</Button>
</Tooltip>

<Tooltip
  title="自定义内容"
  placement="topLeft"
  trigger="click"
  overlayStyle={{ maxWidth: 300 }}
>
  <span>点击显示提示</span>
</Tooltip>
```

**设计要点：**

- 多种触发方式：hover、click、focus
- 可配置显示位置
- 支持自定义样式和内容
- 自动调整位置避免边界溢出

## 设计一个 Loading 组件

```jsx
<Loading spinning={isLoading}>
  <div>加载中的内容</div>
</Loading>

<Loading
  spinning={isLoading}
  tip="数据加载中..."
  size="large"
>
  <Table dataSource={data} columns={columns} />
</Loading>

// 独立的加载指示器
<Loading indicator={<Icon type="loading" spin />} />
```

**设计要点：**

- 支持包裹内容和独立使用
- 可配置加载文本、大小
- 自定义加载指示器
- 延迟显示避免闪烁

## 设计一个 Pagination 组件

```jsx
<Pagination
  current={currentPage}
  total={500}
  pageSize={20}
  onChange={handlePageChange}
  showSizeChanger
  showQuickJumper
  showTotal={(total, range) =>
    `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
  }
/>

<Pagination
  simple
  current={currentPage}
  total={100}
  onChange={handlePageChange}
/>
```

**设计要点：**

- 支持完整模式和简单模式
- 页码跳转、每页条数选择
- 总数显示、自定义文本
- 键盘导航支持
