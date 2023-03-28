import { createRequire } from 'node:module'

const pkg = createRequire(import.meta.url)('../package.json')
const packageManager = pkg?.config?.packageManager

if(packageManager){
  if (packageManager === 'pnpm' && !/pnpm/.test(process.env.npm_execpath || '')) {
    console.warn(
      `\u001b[33mThis repository requires using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`
    )
    process.exit(1)
  }else if (packageManager === 'yarn' && !/yarn\.js$/.test(process.env.npm_execpath || '')) {
    console.warn(
      '\u001b[33mThis repository requires Yarn 1.x for scripts to work properly.\u001b[39m\n'
    )
    process.exit(1)
  }
}
