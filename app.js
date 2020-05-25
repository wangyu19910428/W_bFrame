const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const serve = require('koa-static');
const app = new Koa();

const port = 3000;

const main = serve(path.join(__dirname));

app.use(main);

app.use(async (ctx, next) => {
    // 如果路由以 '/api' 开头，进入路由匹配; 否则返回 'index.html'
    if ((/^\/api/.test(ctx.url))) {
        return next();
    }
    ctx.type = "html";
    ctx.body = fs.createReadStream(path.join(__dirname, "index.html"));

    await next();
})

router.get('/api/about', async (ctx, next) => {
    ctx.type = 'json';
    ctx.body = {
        status: 0,
        data: {
            name: "jaakko",
            age: 21
        }
    };
    await next();
})

app.use(router.routes());


app.listen(port);