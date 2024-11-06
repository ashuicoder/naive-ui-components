import { checkbox, select } from '@inquirer/prompts';
import { execSync } from 'child_process';
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
    console.log(`正在更新包: ${packageNameItem}`);
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

    try {
      // 同步执行 pnpm version 命令
      execSync(`cd components/${packageNameItem} && pnpm version ${versionAnswer}`, { stdio: 'inherit' });
      console.log(colors('green', `更新 ${packageNameItem} 成功`));
    } catch (error) {
      console.log(colors('red', `更新 ${packageNameItem} 失败: ${error.message}`));
    }
  }
}


main()
