<script setup lang="tsx">
import { useAttrs, computed } from 'vue';
import { useAuth, useSvgIcon } from './utils';
import type { BtnItem, ButtonProps, Props, Recordable } from './types';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<Props>(), {
  btnType: 'other',
  spaceProps: () => ({})
});

const attrs: Recordable = useAttrs();
const { hasAuth } = useAuth();
const { SvgIconVNode } = useSvgIcon();

// 按钮类型
const typeObj: Partial<Record<Props['btnType'] & string, ButtonProps>> = {
  tableBtn: {
    ghost: true,
    size: 'small'
  }
};

// 双大写
function toPascalCase(str: string) {
  return str
    .split(/-|_/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const globalBtnProps = computed<ButtonProps>(() => {
  const funcList: string[] = props.config.reduce((arr: string[], item: BtnItem) => {
    if (item.eventName) {
      const func: string = `on${toPascalCase(item.eventName)}`;
      return arr.concat(func);
    }
    return arr;
  }, []);
  return Object.keys(attrs).reduce((obj, key: string) => {
    if (!funcList.includes(key)) return { ...obj, [key]: attrs[key] };
    return obj;
  }, {});
});

function checkIfShow(action: BtnItem): boolean {
  if (typeof action.vif === 'boolean') return action.vif;
  if (typeof action.vif === 'function') return action.vif(props.param);
  return true;
}

function checkDisabled(action: BtnItem): boolean {
  if (typeof action.disabled === 'boolean') return action.disabled;
  if (typeof action.disabled === 'function') return action.disabled(props.param);
  return false;
}

const btnList = computed(() => {
  return props.config
    .filter((action: BtnItem) => (action.auth ? hasAuth(action.auth) && checkIfShow(action) : checkIfShow(action)))
    .map((item: BtnItem) => {
      /* eslint-disable-next-line */
      const { vif, auth, eventName, btnType, icon, onClick, disabled, ...arg } = item
      const btnProps = {
        disabled: checkDisabled(item),
        ...((btnType ? typeObj[btnType] : typeObj[props.btnType]) || {}),
        ...arg
      };
      if (icon && !btnProps.renderIcon) {
        btnProps.renderIcon = SvgIconVNode({ icon });
      }

      if (eventName) {
        const func: string = `on${toPascalCase(eventName)}`;
        if (typeof attrs[func] === 'function') {
          btnProps.onClick = (e: MouseEvent) => {
            const args = props.param === undefined ? [e] : [props.param, e];
            attrs[func](...args);
          };
        }
      }

      if (onClick) {
        btnProps.onClick =
          props.param === undefined
            ? (onClick as (e: MouseEvent) => void)
            : (e: MouseEvent) => {
                onClick(props.param, e);
              };
      }

      return btnProps;
    });
});
</script>

<template>
  <NSpace :justify="btnType === 'tableBtn' ? 'center' : 'start'" v-bind="spaceProps">
    <NButton v-for="{ label, ...item } in btnList" v-bind="{ ...globalBtnProps, ...item }" :key="label">
      {{ label }}
    </NButton>
  </NSpace>
</template>

<style scoped></style>
