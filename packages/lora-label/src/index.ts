#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import enquirer from 'enquirer'

const prompt = enquirer.prompt
const directoryPath = process.cwd()

interface promptOptions {
  option?: string
  customPrompt?: string
}

async function main() {
  const { option } = (await prompt({
    type: 'select',
    name: 'option',
    message: 'Please select your operation（请选择你的操作）：',
    choices: [
      {
        message:
          'Create a .txt description file for the image（为图片创建 .txt 描述文件）',
        name: 'create'
      },
      {
        message:
          'Append a description to each .txt file（在每个 .txt 文件里面追加描述）',
        name: 'add'
      },
      {
        message:
          'Delete the specified description in each .txt file（在每个 .txt 文件里面删除指定描述）',
        name: 'delete'
      },
      {
        message: 'Delete all .txt files（删除所有的 .txt 文件）',
        name: 'empty'
      },
      { message: 'Exit（退出）', name: 'exit' }
    ]
  })) as promptOptions
  if (option === 'create') {
    try {
      await generateTextFilesForImages()
      console.log('Done（完成）')
    } catch (error) {
      console.error(error)
    }
  } else if (option === 'add') {
    try {
      await addStringToFiles()
      console.log('Done（完成）')
    } catch (error) {
      console.error(error)
    }
  } else if (option === 'delete') {
    try {
      await deleteStringInTxtFiles()
      console.log('Done（完成）')
    } catch (error) {
      console.error(error)
    }
  } else if (option === 'empty') {
    try {
      await deleteTxtFiles()
      console.log('Done（完成）')
    } catch (error) {
      console.error(error)
    }
  } else if (option === 'exit') {
    process.exit(0)
  }
}

async function generateTextFilesForImages() {
  const files = await fs.promises.readdir(directoryPath)

  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stats = await fs.promises.stat(filePath)

    if (
      !stats.isDirectory() &&
      stats.isFile() &&
      ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file)) > -1
    ) {
      const txtFilePath = path.join(
        directoryPath,
        path.basename(file, path.extname(file)) + '.txt'
      )
      await fs.promises.writeFile(txtFilePath, '')
      console.log(`${txtFilePath} added（已添加）`)
    }
  }
}

async function addStringToFiles() {
  const { customPrompt } = (await prompt({
    type: 'input',
    name: 'customPrompt',
    message:
      'Please enter the description you want to add（请输入你要追加的描述）：'
  })) as promptOptions

  const files = await fs.promises.readdir(directoryPath)
  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stats = await fs.promises.stat(filePath)
    if (!stats.isDirectory() && path.extname(file) === '.txt') {
      const fileContent = await fs.promises.readFile(filePath, 'utf8')
      const newContent = customPrompt + fileContent
      await fs.promises.writeFile(filePath, newContent, 'utf8')
      console.log(`${file} updated（已更新）`)
    }
  }
}

async function deleteStringInTxtFiles() {
  const { customPrompt } = (await prompt({
    type: 'input',
    name: 'customPrompt',
    message:
      'Please enter the description you want to delete（请输入你要删除的描述）：'
  })) as promptOptions

  const files = await fs.promises.readdir(directoryPath)

  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stat = await fs.promises.stat(filePath)

    if (!stat.isDirectory() && path.extname(file) === '.txt') {
      let content = await fs.promises.readFile(filePath, 'utf-8')
      if (content) content = content.replace(String(customPrompt), '')
      await fs.promises.writeFile(filePath, content)
      console.log(`${file} updated（已更新）`)
    }
  }
}

async function deleteTxtFiles() {
  const files = await fs.promises.readdir(directoryPath)
  for (const file of files) {
    if (file.endsWith('.txt')) {
      await fs.promises.unlink(file)
      console.log(`${file} deleted（已删除）`)
    }
  }
}

main().catch(console.error)
