---
pubDatetime: 2024-09-06
title: PostGIS 小记
description: "PostGIS 是一个 PostgreSQL 的扩展，允许在数据库中存储、查询和分析空间数据。"
---

# PostGIS

PostGIS 是一个 PostgreSQL 的扩展，允许在数据库中存储、查询和分析空间数据。

PostGIS 支持多种空间数据类型，包括点、线、面和多边形。它还支持空间索引、空间查询和空间分析功能。

PostGIS 的主要功能包括：

- 空间数据类型：PostGIS 支持多种空间数据类型，包括点、线、面和多边形。
- 空间索引：PostGIS 支持多种空间索引，包括 R-tree、Quadtree 和 Hilbert R-tree。
- 空间查询：PostGIS 支持多种空间查询，包括空间连接、空间过滤和空间聚合。
- 空间分析：PostGIS 支持多种空间分析，包括空间距离计算、空间距离分析和空间距离聚合。

PostGIS 的主要用途包括：

- 地理信息系统（GIS）：PostGIS 可以用于创建和维护地理信息系统。
- 位置服务：PostGIS 可以用于创建和维护位置服务。
- 位置分析：PostGIS 可以用于创建和维护位置分析。

## 术语

- OGC(Open Geospatial Consortium 开放地理空间联盟)
- OGC SFA(Simple Feature Access) 简单特征访问
- SQL/MM(SQL/Spatial and Spatio-Temporal Metadata) 一种用于表示空间数据的标准格式
- WKT(Well-Known Text) 一种用于表示空间数据的标准格式
- WKB(Well-Known Binary) 一种用于表示空间数据的标准格式
- SRS(Spatial Reference System) 空间参考系统。如 WGS84, GCJ02, BD09
- SRID(Spatial Reference System Identifier) 空间参考系统标识符
- Geometry(几何体) 空间数据类型
- Geography(地理) 空间数据类型
- atomic 原子
  - Point(点) 空间数据类型
  - LineString(线) 空间数据类型
  - LinearRing(线环) 空间数据类型
  - Polygon(多边形) 空间数据类型，由一个外环（shell）和零个或多个内环（holes）组成
- collection 集合
  - MultiPoint(多点) 空间数据类型
  - MultiLineString(多线) 空间数据类型
  - MultiPolygon(多面) 空间数据类型
  - GeometryCollection(几何体集合) 空间数据类型
- coordinate 坐标
  - x coordinate: easting
  - y coordinate: northing
  - z coordinate: elevation
  - m measure value: measure
- dimension 维度
  - 0 点
  - 1 线
  - 2 面
- envelope 包络

## Spatial Data Model 空间数据模型

```sql
POINT (1 2)
POINT Z (1 2 3)
POINT ZM (1 2 3 4)

LINESTRING (0 0, 1 1, 2 1, 2 2)

--- 封闭的 LINESTRING
LINEARRING (0 0, 1 1, 2 1, 2 2, 0 0)

POLYGON ((0 0, 4 0, 4 4, 0 4, 0 0), (1 1, 1 2, 2 2, 2 1, 1 1))

MULTIPOINT ( (0 0), (1 2) )

MULTILINESTRING ((0 0, 1 1, 2 1, 2 2), (3 3, 3 4, 4 4))

MULTIPOLYGON (((0 0, 4 0, 4 4, 0 4, 0 0), (1 1, 1 2, 2 2, 2 1, 1 1)), ((5 5, 5 6, 6 6, 6 5, 5 5)))

--- 还有一堆 SQL/MM 的类型，比如 CircularString, CompoundCurve, CurvePolygon, MultiCurve, MultiSurface
```

## Geometry 数据类型

`geometry` 数据类型是 PostGIS 中的一种数据类型，用于表示空间数据。

```sql
SELECT 'SRID=4;POINT(0 0)'::geometry

SELECT ST_GeomFromEWKT('SRID=312;POINTM(-126.4 45.32 15)')

INSERT INTO geotable ( geom, name )
  VALUES ( ST_GeomFromEWKT('SRID=312;POINTM(-126.4 45.32 15)'), 'A Place' )
```

## Geography 数据类型

`geography` 数据类型是 PostGIS 中的一种数据类型，用于表示地理数据。

```sql
CREATE TABLE global_points (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    location geography(POINT,4326)
  );

INSERT INTO global_points (name, location) VALUES ('Town', 'SRID=4326;POINT(-110 30)');
INSERT INTO global_points (name, location) VALUES ('Forest', 'SRID=4326;POINT(-109 29)');
INSERT INTO global_points (name, location) VALUES ('London', 'SRID=4326;POINT(0 49)');

-- A distance query using a 1000km tolerance
SELECT name FROM global_points WHERE ST_DWithin(location, 'SRID=4326;POINT(-110 29)'::geography, 1000000);
```

## SRID

SRID 是 `Spatial Reference System Identifier` 的缩写，表示空间参考系统标识符。

SRID 是一个整数，用于标识空间数据的地理坐标系。

```sql
SELECT ST_SetSRID(ST_Point(1, 1), 4326);

SELECT ST_SRID(geom) FROM geotable;

SELECT ST_GeomFromText('POINT(1 1)', 4326);

-- 1. 查看可用的空间参考系统
SELECT srid, auth_name, auth_srid, srtext FROM spatial_ref_sys LIMIT 5;

-- 2. 为几何对象指定 SRID
SELECT ST_SetSRID(ST_MakePoint(-122.33, 47.61), 4326);

-- 3. 查看几何对象的 SRID
SELECT ST_SRID(geom) FROM my_spatial_table LIMIT 1;

-- 4. 转换坐标系
SELECT ST_Transform(
    ST_SetSRID(ST_MakePoint(-122.33, 47.61), 4326),  -- WGS84
    3857  -- Web Mercator
);

-- 5. 在不同坐标系间进行空间操作
SELECT ST_Distance(
    ST_Transform(point_a, 3857),
    ST_Transform(point_b, 3857)
) AS distance_meters
FROM (
    SELECT
        ST_SetSRID(ST_MakePoint(-122.33, 47.61), 4326) AS point_a,
        ST_SetSRID(ST_MakePoint(-122.34, 47.62), 4326) AS point_b
) AS points;
```

## Functions and Operators

- [PostGIS Reference](https://postgis.net/docs/manual-3.4/reference.html)

```sql
SELECT ST_Within(A, B)

SELECT ST_DWithin(A, B, distance)

--- 通过情况下 ST_DWithin 更快，因为它是基于空间索引的，因此基本上使用 ST_DWithin 而不是 ST_Distance
SELECT ST_Distance(A, B)

SELECT ST_Intersection(A, B)
```

## Indexing

```sql
CREATE INDEX idx_geom ON mytable USING GIST (geom);

CREATE INDEX idx_gix ON mytable USING GIST (geom gist_geometry_ops_nd);
```
