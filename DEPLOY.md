# GitHub Pages 部署指南

> 仓库名已设定为 `yu-shuwen-portfolio`，发布后的网址为：  
> `https://你的GitHub用户名.github.io/yu-shuwen-portfolio/`

## 事前提醒

- GitHub Pages 免费版要求仓库是 **Public（公开）**，代码和简历内容都会被公开；
- 请确认 `src/data/siteData.ts` 里没有你不想公开的信息（目前手机号、住址已刻意移除）。

## 第一步：在 GitHub 创建空仓库

1. 登录 https://github.com ，点击右上角 **+ → New repository**；
2. Repository name 填 `yu-shuwen-portfolio`；
3. 选择 **Public**；
4. **不要勾选** "Add a README file"；
5. 点击 **Create repository**。

## 第二步：推送本地代码到 GitHub

在项目目录 `C:\Users\25895\Desktop\MIS3011\个人网站\portfolio-site` 下打开 Git Bash 或 PowerShell，执行：

```bash
# 把「你的GitHub用户名」替换成你的真实用户名
git remote add origin https://github.com/你的GitHub用户名/yu-shuwen-portfolio.git
git branch -M main
git push -u origin main
```

或者在 Windows 下直接双击 `推送到GitHub仓库.bat`，按提示输入用户名即可。

## 第三步：开启 GitHub Pages

1. 打开仓库页面 `https://github.com/你的GitHub用户名/yu-shuwen-portfolio`；
2. 点击顶部 **Settings** → 左侧 **Pages**；
3. 在 **Build and deployment → Source** 中选择 **GitHub Actions**；
4. 回到仓库首页，点击顶部 **Actions**；
5. 等待名为 "Deploy to GitHub Pages" 的 workflow 跑完（第一次约 1-2 分钟）；
6. 完成后访问 `https://你的GitHub用户名.github.io/yu-shuwen-portfolio/`。

## 第四步：以后更新网站

每次修改内容后，在项目目录执行：

```bash
git add .
git commit -m "更新内容"
git push
```

GitHub Actions 会自动重新构建并发布，约 1 分钟后线上内容就会更新。
