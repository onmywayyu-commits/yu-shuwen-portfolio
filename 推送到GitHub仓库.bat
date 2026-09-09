@echo off
chcp 65001 >nul
setlocal

echo ====================================================
echo  推送到 GitHub 仓库：yu-shuwen-portfolio
echo ====================================================
echo.
echo 提醒：请先在 GitHub 上创建名为 yu-shuwen-portfolio 的空仓库，
echo       并选择 Public（GitHub Pages 免费版需要公开仓库）。
echo.

set /p USERNAME=请输入你的 GitHub 用户名: 

if "%USERNAME%"=="" (
    echo 用户名不能为空。
    pause
    exit /b 1
)

cd /d "C:\Users\25895\Desktop\MIS3011\个人网站\portfolio-site"
if errorlevel 1 (
    echo 找不到项目目录。
    pause
    exit /b 1
)

git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/yu-shuwen-portfolio.git
git branch -M main

echo.
echo 正在推送到 https://github.com/%USERNAME%/yu-shuwen-portfolio.git ...
git push -u origin main

if errorlevel 1 (
    echo.
    echo 推送失败。常见原因：
    echo 1. GitHub 用户名输错；
    echo 2. 仓库还没创建；
    echo 3. 没有登录 GitHub（浏览器里先登录）。
    pause
    exit /b 1
)

echo.
echo ====================================================
echo  推送成功！
echo  仓库地址：https://github.com/%USERNAME%/yu-shuwen-portfolio
echo  下一步：到仓库 Settings ^> Pages 里选择 GitHub Actions。
echo ====================================================
pause
