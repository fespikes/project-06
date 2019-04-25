# Guardian Federation FrontEnd

This is the front end application for Guardian Federation.

### Dev
```bash
npm install 
npm start
```

### Unit Test
```bash
npm test
```

### Scripts
```
# 编译国际化文本
npm run i18n
```

### Code scaffolding
To generate a new component: 
```bash
ng generate component component-name
```
To generate more:
```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Collaboration
#### _MUST DO_
Before submitting a merge request:
1. Pass all unit tests locally. (`npm test`)
2. Pass all lint requirements. (`ng lint`)

#### _NICE TO HAVE_
- Follow [karma commit rule](http://karma-runner.github.io/0.10/dev/git-commit-msg.html) to make a commit. <br>
- When creating a merge request, attach relevant jira number if possible.<br>
- 请检查编辑器是否加载了editorconfig里面的配置

### Release

```bash
npm run build:prod
```

### 制作CI build image

当node依赖更新时，需重新制作image。在项目根目录下运行

```
docker build . -f ci/Dockerfile -t guardian-federation/federation-ci-8
docker tag guardian-federation/federation-ci-7 172.16.1.99/frontend/guardian-federation/build/federation-ci-8
docker push 172.16.1.99/frontend/guardian-federation/build/federation-ci-8
```

