const fs = require('fs')
const path = require('path')
const readline = require('readline')
const shell = require('shelljs')
const originJson = path.join(__dirname, '../package.json')
const projectRoot = path.join(__dirname, '..')

class Publish {
  constructor () {
    this.rl = null
    this.version = null
    this.package = null
  }

  /** 设置新的版本号 */
  setVersion (version) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `请输入发布的版本号(当前版本为${version})>`
    })

    this.rl.prompt()

    this.rl.on('line', (line) => {
      if (line.trim()) {
        this.version = line.trim()
        this.rl.close()
        this.confirm()
      }
    })
  }

  /** 确认发布 */
  confirm () {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `确定发布版本：${this.package.version} --> ${this.version} (y/n)>`
    })

    this.rl.prompt()

    this.rl.on('line', (line) => {
      if (line.trim() === 'y') {
        this.writePackage()
        this.rl.close()
      } else if (line.trim() === 'n') {
        console.log('取消发布.')
        this.rl.close()
        process.exit(0)
      }
    })
  }

  /** 获取当前的package.json */
  getPackage () {
    try {
      const temp = JSON.parse(fs.readFileSync(originJson, {
        encoding: 'utf-8'
      }))
      const hold = ['vue', 'vue-router']
      const dependencies = {}

      hold.forEach(item => {
        if (temp.dependencies[item]) {
          dependencies[item] = temp.dependencies[item]
        }
      })

      this.package = Object.assign({}, temp, {
        main: 'index.js',
        scripts: {},
        dependencies: dependencies,
        devDependencies: {}
      })

      const version = shell.exec(`npm view ${this.package.name} version`).stdout.trim()
      this.package.version = version
      this.setVersion(version)
    } catch (error) {
      console.log(error)
    }
  }

  /** 重写版本号 */
  writePackage () {
    this.package.version = this.version
    fs.writeFileSync(path.join(projectRoot, `lib/package.json`), JSON.stringify(this.package, null, 2))
    fs.copyFileSync(path.join(projectRoot, 'README.md'), path.join(projectRoot, 'lib/README.md'))
    shell.exec('npm publish lib')
  }

  /** 发布 */
  publish () {
    this.getPackage()
  }
}

new Publish().publish()
