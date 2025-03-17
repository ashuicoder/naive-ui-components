import type { ButtonProps, SpaceProps } from 'naive-ui';

export type { ButtonProps };

export type BtnItem = Omit<ButtonProps, 'onClick' | 'disabled'> & {
  label?: string;
  icon?: string | any;
  vif?: boolean | ((...arg: any[]) => boolean);
  disabled?: boolean | ((...arg: any[]) => boolean);
  auth?: string[];
  eventName?: string;
  btnType?: 'tableBtn' | 'other';
  onClick?: (param: any, e?: MouseEvent) => void;
};

export interface Props {
  config: BtnItem[]; // 按钮配置列表
  btnType?: 'tableBtn' | 'other'; // 按钮类型，默认是other（无按钮配置）
  param?: any; // eventName的函数参数
  spaceProps?: SpaceProps;
  [key: string]: any;
}

export type Recordable = Record<string, any>
