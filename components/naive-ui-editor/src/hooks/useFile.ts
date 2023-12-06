import { findImgFromHtml, extractImgFromRtf, transAsImgToFile, replaceAsUpdSrc } from '../utils/file'
import to from 'await-to-js'

import type { IEditorConfig, IDomEditor } from '@wangeditor/editor';
import type { InsertFnType, UseFile, UseFileProps } from '../types'

/**
 * @name 富文本文件相关处理方法
 * @param loading
 * @param requestFunc
 * @returns 
 */
export const useFile: UseFile = ({
  loading,
  requestFunc,
}: UseFileProps) => {
  /**
   * 获取图片、视频、链接标签数
   * @param editor 
   * @returns 
   */
  const getElementLen = (editor: IDomEditor) => {
    return ['image', 'link', 'video']
      .map((tag) => editor.getElemsByType(tag).length)
      .reduce((a, b) => a + b, 0);
  };

  /**
   * 自定义上传
   */
  const customUpload = async (file: File, insertFn?: InsertFnType) => {
    const [err, url] = await to(requestFunc(file));
    if (err) return '';
    insertFn && insertFn(url);
    return url;
  };

  /**
   * 自定义配置
   */
  const formatConfig = (editorConfig: Partial<IEditorConfig> | undefined) => {
    return {
      placeholder: '请输入内容...',
      ...(editorConfig || {}),
      MENU_CONF: {
        ...(editorConfig?.MENU_CONF || {}),
        uploadImage: {
          customUpload,
        },
        uploadVideo: {
          customUpload,
        }
      }
    }
  }

  /**
   * 自定义复制粘贴
   * @description 获取word里的图片上传到服务器并替换图片地址
   * @param editor
   * @param event
   * @returns 
   */
  const customPaste = async (editor: IDomEditor, event: ClipboardEvent): Promise<boolean | void> => {
    // 获取粘贴的html部分，该部分包含了图片img标签
    let html = event.clipboardData?.getData('text/html') || '';
  
    // 获取rtf数据（从word、wps复制粘贴时有），复制粘贴过程中图片的数据就保存在rtf中
    const rtf = event.clipboardData?.getData('text/rtf') || '';
  
    if (html && rtf) {
      // 该条件分支即表示要自定义word粘贴
  
      // 列表缩进会超出边框，直接过滤掉
      html = html.replace(/text\-indent:\-(.*?)pt/gi, '');
  
      // 从html内容中查找粘贴内容中是否有图片元素，并返回img标签的属性src值的集合
      const imgSrcs = findImgFromHtml(html);
  
      // 如果有
      if (imgSrcs.length) {
        // 从rtf内容中查找图片数据
        const rtfImageData = extractImgFromRtf(rtf);
        if (rtfImageData.length) {
          // 阻止默认的粘贴行为
          event.preventDefault();
          try {
            loading.value = true;
            // 将图片转为file上传
            const imgs = transAsImgToFile(imgSrcs, rtfImageData);
            const urls = await Promise.all(imgs.map((file) => requestFunc(file)));
            // 替换为上传后的url
            html = replaceAsUpdSrc(html, imgSrcs, rtfImageData, urls);
            editor.dangerouslyInsertHtml(html);
            return Promise.resolve();
          } catch (e) {
            return Promise.reject(e);
          } finally {
            loading.value = false;
          }
        }
      }
      return false;
    } else {
      // 从html内容中查找粘贴内容中是否有图片元素，并返回img标签的属性src值的集合
      const imgSrcs = findImgFromHtml(html);
      // 清除html当中的img标签（单独复制某一张图片没问题）
      if (imgSrcs.length && !html.includes('StartFragment--><img')) {
        // 阻止默认的粘贴行为
        event.preventDefault();
        html = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, '');
        editor.dangerouslyInsertHtml(html);
        return false;
      }
      return true;
    }
  };

  return {
    getElementLen,
    formatConfig,
    customPaste,
  }
}
