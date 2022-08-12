# Leaderboard 9 前端

在 Linux 练习和 PyTorch 练习中，我们使用过一个前后端耦合的 [Leaderboard](http://121.5.165.232:14000/)。在 Django 课程中，我们已经为前后端分离的 LeaderBoard 实现了单独的后端，现在我们希望为其实现前端部分。

## 功能简介

与我们之前使用的 PyTorch Leaderboard 一样，我们需要完成的基本功能包括：
  - 用户提交内容 ，后端对内容进行评定后在排行榜中按一定规则显示用户的排名
  - 用户可以提交一个 Avatar，作为用户在排行榜中的标识
此外我们还希望包括：
  - 投票。用户可以给排行榜中的指定用户点赞。
    - 你可能会感觉奇怪，用户没有除了点数之外的任何信息，将如何完成投票？其实这没有什么关系，毕竟投票通常是按用户名称来投的
我们为大家提供了样例的前端实现与后端实现供大家部署后练习对接，或者在实现过程中参考（但不包括进行攻击练习
  - 前端 http://front.sast2022.lmd.red/
    - 输入后端的部署地址进行对接
  - 后端 http://back.sast2022.lmd.red/
（都是玩具，还请大家手下留情

## Part 0: 代码介绍与准备工作

由于我们希望能够练习完整编写和使用 React 组件，本次作业相比于后端作业工作量稍大，除 `create-react-app` 脚手架提供的内容外，我们只提供了访问后端接口所需的函数（借助 `axios` 实现，也可以尝试自己使用 `fetch` 等方式实现），这些接口的具体定义可以参考 [Btlmd/sast2022-django-training](https://github.com/Btlmd/sast2022-django-training)，也可以参考所提供函数的类型标注。你需要自己实现所需要的组件，并借助已经写好的 API 请求函数正确完成功能。当然，也可以不按文档的提示自行设计完成。

本次作业的包含的文件有：
```bash
> tree -I node_modules
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── history.ts
│   │   ├── index.ts
│   │   ├── leaderboard.ts
│   │   ├── submit.ts
│   │   ├── url.ts
│   │   └── vote.ts
│   └── index.tsx
├── tsconfig.json
└── yarn.lock

3 directories, 18 files
```
其中 `src/api` 文件夹导出了函数 `getLeaderBoard` `getHistory` `submit` `vote` 分别对应于后端的四个 API，其中后端地址在 `src/api/url.ts` 中指定。

### 准备工作

clone 作业 repo 到本地后，使用 yarn 安装依赖，并尝试运行开发服务器：
```bash
git clone git@github.com:ayf19/sast2022-react-training.git
cd sast2022-react-training
yarn
yarn start
```

## Part 1: 参考组件设计

这部分介绍前端所需要实现的功能，和简单的组件划分，你可以参考这部分内容，也可以略过，只要能够实现等同于参考前端实现的功能即可。在课程中已经提及，建议尝试使用 [Ant Design](https://ant.design/) 来降低实现具体组件的难度。

### 排行榜

对应于函数 `getLeaderBoard`，该函数（异步）返回一个包含排名信息的数组，需要将这一数组渲染为表格展示，一种实现方式是使用 Ant Design 中的 `Table` 组件。

其中表格的每一行应当包含投票按钮并能够使用 `vote` 函数正确处理投票事件。

#### 历史信息

当点击用户名称时，应当以适当方式展示用户历史提交信息，例如在参考实现中，使用 `Modal` 组件展示对话框并在其中渲染了一个 `Timeline` 组件展示历次提交信息。

### 提交

应当使用一个组件处理提交信息这一功能，至少应该允许用户输入文本信息和提交文件，在适当检查信息合法性（也可以不检查合法性而检查后端是否报错，但一般而言，最好是检查合法性）后使用 `submit` 函数提交信息。

## Part 2: 部署

在开发服务器中测试完成后，可以使用 `yarn build` 构建项目，可以看到在项目文件夹下多出了 `build` 文件夹，使用适当的服务器软件（例如 Django 或 Nginx）映射静态文件即可在浏览器中访问。

## 提交

在代码仓库中提出 Issue，于 Issue 中注明部署地址和代码仓库地址。

如果你没有部署的条件或者不想部署，也可以只提交代码仓库。

如果提交的部署地址不是 59.66.131.240:XXXXX 的形式（如自己的域名），可以在 Issue 中进行说明或者将 Issue 编号和学号发至 me@anyi.fan ，便于我们统计大家的提交情况。
