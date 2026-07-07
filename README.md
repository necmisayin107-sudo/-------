# Jiaxian Wang Portfolio

这是一个可直接发布到 GitHub Pages / Vercel 的静态个人作品网站版本。

## 内容

- `index.html`：单页作品集结构
- `styles.css`：Codrops Intro Trail 风格视觉样式
- `script.js`：鼠标图片轨迹与作品入口互动
- `assets/`：作品图片、视频、PDF 素材
- `.nojekyll`：用于 GitHub Pages 正常发布静态资源

## 发布到 GitHub Pages

1. 新建 GitHub repository。
2. 上传本文件夹内全部内容。
3. 进入 repository 的 Settings → Pages。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`。

## 发布到 Vercel

1. 将该文件夹上传到 GitHub。
2. 在 Vercel 中导入 repository。
3. Framework Preset 选择 `Other`。
4. Build Command 留空，Output Directory 留空或填写 `.`。

## 本地预览

直接打开 `index.html` 即可预览。视频文件较大时，线上部署加载速度取决于托管平台和网络环境。
