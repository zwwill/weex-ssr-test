const path = require('path');
const { fork } = require('child_process');
const inquirer = require('inquirer');
const dir = {
    server: path.resolve(__dirname, '../server'),
    base: path.resolve(__dirname, '..')
};

class DevTool {
    get envChoices() {
        return require('./group.json');
    }

    constructor(options) {
        this.options = options;
    }
    
    get questions() {
        return [
            {
                type: 'list',
                name: 'type',
                message: '你要以什么模式启动应用？',
                choices: [
                    'Mock',
                    '调试接口'
                ]
            },
            {
                type: 'list',
                name: 'env',
                message: '需要连接哪个环境呢？',
                choices: this.envChoices,
                async when(answers) {
                    if (answers.type === '调试接口') {
                        return true;
                    }
                }
            }
        ];
    }

    async launch() {
        const answers = await this.quest();
        let kaolaEnv;

        if (answers.type === 'Mock') {
            kaolaEnv = 'local';
        } else {
            kaolaEnv = answers.env;
        }

        fork(
            path.join(
                dir.server, './node_modules/egg-bin/bin/egg-bin.js'
            ), [
                'dev'
            ], {
                cwd: dir.server,
                env: Object.assign({}, process.env, {
                    KAOLA_ENV: kaolaEnv
                })
            });
    }
    async quest() {
        return await inquirer.prompt(this.questions);
    }
}

new DevTool()
    .launch()
    .catch(console.error);
