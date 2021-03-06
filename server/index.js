const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'danmaku',
    port: 3306
})
conn.connect();

class GameController {

    // 获取弹幕
    static async getDanmaku(ctx, next) {
        let content;
        await queryDatabase('select * from data').then((data) => {
            content = data;
        });

        ctx.status = 200;
        ctx.type = 'text/plain; charset=utf-8';
        ctx.body = content;
    }

    // 添加弹幕
    static async postDanmaku(ctx, next) {
        let data = ctx.request.body;
        ctx.status = 200;
        ctx.type = "text/plain;charset=utf-8";
        ctx.body = {status: "success"};
        console.log(data);
    }

    static async getInputLimit(ctx, next) {
        let content;
        await queryDatabase('select * from inputLimit').then((data) => {
            content = data;
        })

        ctx.status = 200;
        ctx.type = 'text/plain; charset=utf-8';
        ctx.body = content;
    }
}

function queryDatabase(query) {
    return new Promise((resolve, reject) => {
        conn.query(query, function(err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(JSON.stringify(data));
            }
        })
    })
}

module.exports = GameController;