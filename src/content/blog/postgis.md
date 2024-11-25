---
pubDatetime: 2024-09-06
title: PostGIS 小记
description: "PostGIS 是一个 PostgreSQL 的扩展，允许在数据库中存储、查询和分析空间数据。"
updated: 2024-11-25
---

# PostGIS

PostGIS 是一个 PostgreSQL 的扩展，允许在数据库中存储、查询和分析空间数据。

PostGIS 支持多种空间数据类型，包括点、线、面和多边形。它还支持空间索引、空间查询和空间分析功能。

PostGIS 的主要功能包括：

- 空间数据类型：PostGIS 支持多种空间数据类型，包括点、线、面和多边形。
- 空间索引：PostGIS 支持多种空间索引，包括 R-tree、Quadtree 和 Hilbert R-tree。
- 空间查询：PostGIS 支持多种空间查询，包括空间连接、空间过滤和空间聚合。
- 空间分析：PostGIS 支持多种空间分析，包括空间距离计算、空间距离分析和空间距离聚合。如两个地铁站之间的路线，一个小区旁边有多少家便利店。

在刚开始学习 `PostGIS` 时，可以结合 python 的 [shapely](https://shapely.readthedocs.io/en/stable/) 与前端的 [turf](https://turfjs.org/) 一起学习。如果仅仅涉及到数据类型，则可与 `GeoJSON` 一起学习。

## 术语

- OGC(Open Geospatial Consortium 开放地理空间联盟)
- OGC SFA(Simple Feature Access) 简单特征访问
- SQL/MM(SQL/Spatial and Spatio-Temporal Metadata) 一种用于表示空间数据的标准格式
- **WKT(Well-Known Text)** 一种用于表示空间数据的标准格式
- **WKB(Well-Known Binary)** 一种用于表示空间数据的标准格式
- **SRS(Spatial Reference System)** 空间参考系统。如 WGS84, GCJ02, BD09
- **SRID(Spatial Reference System Identifier)** 空间参考系统标识符
- **Geometry(几何体)** 空间数据类型
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

## Spatial Data Model 空间数据模型

以下使用 `WKT` 格式表示空间数据，包含 `POINT`, `LINESTRING`, `POLYGON` 等。

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

- EWKT(Extended Well-Known Text) 是一种包含 SRID 的 WKT 格式，如 `SRID=4;POINT(0 0)`

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

SRID 是 `Spatial Reference System Identifier` 的缩写，表示空间参考系统标识符。各个 SRID 介绍可见 [EPSG](https://epsg.io/)，`EPSG` 是欧洲石油勘探组织（European Petroleum Survey Group）的缩写，`EPSG` 官网提供了全球的空间参考系统数据。

常见的 SRID 有以下几种：

- 4326: WGS84，World Geodetic System 1984，最常用的地理坐标系统，使用经纬度表示位置，GPS 设备通常使用这个坐标系
- 3857: Web Mercator，网络地图常用投影，如 Google Maps、OpenStreetMap 等使用的投影系统
- 4490: CGCS2000，China Geodetic Coordinate System 2000，国内采用的地理坐标系统
- 4547: CGCS2000 / 3-degree Gauss-Kruger CM 114E，基于 CGCS2000 的投影坐标系统，适用于中国东部地区，以东经 114 度为中央经线的高斯克吕格投影

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

在 `PostGIS` 中，空间操作函数和运算符用于处理和分析空间数据，其**分析功能甚至比 `shapely` 等专业库还要强大，且性能高**。以下是一些常见的空间操作函数和运算符：

```sql
SELECT ST_Within(A, B)

SELECT ST_DWithin(A, B, distance)

--- 通过情况下 ST_DWithin 更快，因为它是基于空间索引的，因此基本上使用 ST_DWithin 而不是 ST_Distance
SELECT ST_Distance(A, B)

SELECT ST_Intersection(A, B)

SELECT ST_Union(A, B)

--- 返回几何对象的 Point 个数，如果数量过多，可以使用 ST_Simplify 简化图形，优化数量
SELECT ST_NPoints(geom)

--- 简化几何对象，tolerance 参数表示简化的容差值
--- 数值越大简化程度越高，但精度损失也越大
SELECT ST_Simplify(geom, tolerance)

--- 使用保持拓扑关系的方式简化几何对象
SELECT ST_SimplifyPreserveTopology(geom, tolerance)

--- 返回几何对象的第 n 个点
SELECT ST_PointN(geom, n)

--- 返回几何对象的边界
SELECT ST_Boundary(geom)

--- 返回几何对象的质心
SELECT ST_Centroid(geom)
```

## Indexing

通过添加索引 `GIST`，可以提高空间查询的性能。`GIST (Generalized Search Tree)` 索引使用 R-tree 算法实现，它通过将空间对象划分为最小边界矩形(MBR, Minimum Bounding Rectangle)的层次结构来组织数据。

这种索引结构特别适合空间数据，因为它可以快速定位特定区域内的对象，显著提升以下操作的性能：

- ST_Contains
- ST_Intersects
- ST_DWithin
- ST_Distance

创建空间索引的语法如下：

```sql
CREATE INDEX idx_geom ON mytable USING GIST (geom);

CREATE INDEX idx_gix ON mytable USING GIST (geom gist_geometry_ops_nd);
```
