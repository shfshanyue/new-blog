---
title: "PostgreSQL WAL 日志详解：预写式日志原理与配置实战指南"
description: "深入了解 PostgreSQL WAL (Write Ahead Logging) 预写式日志机制，包含配置方法、文件结构、备份恢复和主从复制应用"
pubDatetime: 2020-09-10T14:20:00+08:00
modDatetime: 2020-09-10T14:20:00+08:00
author: "山月"
featured: false
draft: false
tags:
  - postgresql
  - wal
  - database
  - backup
  - replication
  - logging
  - data-integrity
---

## 什么是 WAL (Write Ahead Logging)

**简而言之，postgres 会对每次写操作记一次日志，日志的集合。**

WAL (Write Ahead Logging) 是 PostgreSQL 中的预写式日志机制，它是数据库保证数据完整性和一致性的核心技术。在任何数据页面被修改之前，相关的日志记录必须先被写入到持久化存储中。

WAL 用于保证数据的完整性 (Integrity)，根据它的完整性特点，它可以用作以下方面：

- **备份恢复**：通过 WAL 日志可以实现数据库的备份和恢复操作
- **主从复制**：WAL 日志是 PostgreSQL 流复制的基础，用于主从数据库之间的数据同步
- **崩溃恢复**：系统崩溃后可以通过重放 WAL 日志来恢复数据库到一致状态
- **时间点恢复 (PITR)**：可以恢复数据库到任意指定的时间点

## 开启 WAL

要启用 WAL 归档功能，需要在 `postgresql.conf` 配置文件中设置以下参数：

```shell
# 设置 WAL 级别为 archive，启用归档功能
wal_level = archive

# 开启归档模式
archive_mode = on

# 设置归档命令（可选，用于自动归档）
archive_command = 'cp %p /path/to/archive/%f'
```

配置完成后需要重启 PostgreSQL 服务使配置生效。

## 查看 WAL

WAL 日志位于 PostgreSQL 数据目录的 `pg_wal` 目录下（在 PostgreSQL 10 之前的版本中为 `pg_xlog`），每个文件名以时间线和序列号组成的 16 进制数字命名，表示 WAL 日志的序列号。

```shell
$ cd /var/lib/postgresql/data
$ ls -la pg_wal/
total 225M
drwx------  3 polkitd ssh_keys 4.0K Apr  6 19:27 .
drwx------ 19 polkitd ssh_keys 4.0K Jan 22 14:22 ..
-rw-------  1 polkitd ssh_keys  16M Apr  9 16:56 0000000100000001000000DC
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000DD
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000DE
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000DF
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E0
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E1
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E2
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E3
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E4
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:59 0000000100000001000000E5
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E6
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E7
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E8
-rw-------  1 polkitd ssh_keys  16M Dec 19 15:57 0000000100000001000000E9
drwx------  2 polkitd ssh_keys 4.0K Sep 25  2018 archive_status
```

### WAL 文件命名规则

WAL 文件名格式：`TTTTTTTTXXXXXXXXYYYYYYYY`

- `TTTTTTTT`：时间线 ID（8位16进制）
- `XXXXXXXX`：日志文件号（8位16进制）
- `YYYYYYYY`：段号（8位16进制）

每个 WAL 文件默认大小为 16MB，当文件写满后会创建新的 WAL 文件。

### 监控 WAL 日志

可以使用以下 SQL 命令查看当前 WAL 的状态：

```sql
-- 查看当前 WAL 位置
SELECT pg_current_wal_lsn();

-- 查看 WAL 接收和重放状态（主要用于从库）
SELECT * FROM pg_stat_wal_receiver;

-- 查看归档状态
SELECT * FROM pg_stat_archiver;
```

## WAL 配置优化

一些重要的 WAL 相关配置参数：

```shell
# WAL 缓冲区大小，影响写入性能
wal_buffers = 16MB

# 检查点间隔时间
checkpoint_timeout = 5min

# 检查点完成目标时间占间隔的比例
checkpoint_completion_target = 0.9

# WAL 段文件的最小数量
min_wal_size = 80MB

# WAL 段文件的最大数量
max_wal_size = 1GB
```

## 参考

- [PostgreSQL 官方文档 - Continuous Archiving and Point-in-Time Recovery (PITR)](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [PostgreSQL 官方文档 - Write-Ahead Logging (WAL)](https://www.postgresql.org/docs/current/wal.html)
- [PostgreSQL 官方文档 - WAL Configuration](https://www.postgresql.org/docs/current/wal-configuration.html)
