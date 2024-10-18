import { checkbox, select } from '@inquirer/prompts';
import { exec } from 'child_process';
import colors from 'colors-console'
const packagesList = ['naive-ui-form', 'naive-ui-table', 'naive-ui-upload', 'naive-ui-editor'];

const versionList = ['patch', 'minor', 'major'];

async function main() {
  const answers = await checkbox({
    message: '选择要更新的包',
    choices: packagesList.map(item => ({
      name: item,
      value: item,
    })),
    validate: (selectedOptions) => {
      if (selectedOptions.length === 0) {
        return '至少选择一个包';
      }
      return true;
    }
  });


  for (const packageNameItem of answers) {
    console.log(`正在构建包: ${packageNameItem}`);
    const versionAnswer = await select({
      message: `${packageNameItem}：选择要更新的版本`,
      choices: versionList.map(item => ({
        name: item,
        value: item,
      })),
      validate: (selectedOptions) => {
        if (selectedOptions.length === 0) {
          return '至少选择一个版本';
        }
        return true;
      }
    });
    exec(`cd components/${packageNameItem} && pnpm version ${versionAnswer}`, (error, stdout, stderr) => {
      if (error) {
        console.log(colors('red', `更新 ${packageNameItem} 失败: ${error.message}`));
        return;
      }
      if (stderr) {
        console.error(colors('red', `更新 ${packageNameItem} 时发生错误: ${stderr}`));
        return;
      }
      console.log(colors('green', `更新 ${packageNameItem} 成功`));
    });
  }
}


main()
