<div align="center">
  <h1>LoRA-label</h1>
</div>

<div align="center">

这个项目提供了 LoRA 训练时，描述词文件的生成与编辑功能，如为每张图片生成同名 `.txt` 文件等功能。项目模板使用的 [repo-temp](https://github.com/ningbonb/repo-temp) 。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ningbonb/repo-temp/blob/main/LICENSE)

</div>

<div align="center">

[English](./README.en.md) | 简体中文

</div>

## 功能

- 为每张图片生成一个同名的 `.txt` 描述文件；
- 批量为图片追加相同的描述；
- 批量为图片删除相同的描述；
- 批量删除 `.txt` 文件，以重新开始；

## 用法

```bash
$ npx lora-label start
```

![截图](./img/demo.png)

