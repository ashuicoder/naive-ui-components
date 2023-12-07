# naive-ui-table文档

## 介绍

naive-ui-table是基于naive-ui的表格组件，主要用于展示大量结构化的数据，配置简单，功能齐全，且支持naive-ui所有属性。

功能如下：
- 表格列`columns`配置与`naive-ui`完全一致，且自定义列增加了插槽配置
- 自带分页，只需要传入异步请求接口api，即可实现分页查询功能
- 自带搜索，只需要传入`search`配置，即可实现搜索功能
- 自带列设置，可设置列显隐，列固定，拖拽排序列顺序
- 表格高度自适应，避免数据过多时页面出现滚动条

::: info 提示

`naive-ui-table`支持`naive-ui`的所有属性，因此可在`naive-ui-table`传递`naive-ui`属性，将其传递到`naive-ui`组件上，覆盖内部封装的属性。

:::

# 安装

```bash
pnpm add naive-ui-table
```
> 也可以使用`npm`、`yarn`等安装。

## 基础用法
只需传入两个参数`columns`和`requestApi`，即可实现表格展示。


## 顶部带查询表单

## 功能按钮插槽

## 可勾选

## 表格列设置

## 表格列自定义

## 表格高度自适应