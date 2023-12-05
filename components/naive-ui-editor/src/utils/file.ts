/**
 * base64转buffer
 * @param base64 文件base64 file
 * @returns
 */
const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};

/**
 * base64转file
 * @param reportName 文件名称
 * @param byte byte[]字节码
 */
const transAsB64ToFile = (base64: string, reportName: string, type = 'image/png') => {
  const byte = base64ToArrayBuffer(base64);
  const blob: any = new Blob([byte], { type });
  const filename = reportName + type.replace(type.split('/')[0] + '/', '.');
  blob.lastModifiedDate = new Date();
  blob.name = filename;
  blob.filename = filename;
  return blob;
};

/**
 * 从html代码中匹配返回图片标签img的属性src的值的集合
 * @param htmlData
 * @return Array
 */
export const findImgFromHtml = (htmlData) => {
  const imgReg = /<img.*?(?:>|\/>)/gi; //匹配图片中的img标签
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; // 匹配图片中的src

  const arr = htmlData.match(imgReg); //筛选出所有的img
  if (!arr || (Array.isArray(arr) && !arr.length)) {
    return [];
  }

  const srcArr: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    const src: string[] = arr[i].match(srcReg);
    // 获取图片地址
    srcArr.push(src[1]);
  }

  return srcArr;
}

/**
 * 从rtf内容中匹配返回图片数据的集合
 * @param rtfData
 * @return Array
 */
export const extractImgFromRtf = (rtfData) => {
  if (!rtfData) {
    return [];
  }

  const regexPictureHeader = /{\\pict[\s\S]+?({\\\*\\blipuid\s?[\da-fA-F]+)[\s}]*/;
  const regexPicture = new RegExp(
    '(?:(' + regexPictureHeader.source + '))([\\da-fA-F\\s]+)\\}',
    'g'
  );
  const images = rtfData.match(regexPicture);
  const result: any[] = [];

  if (images) {
    for (const i in images) {
      const image = images[i];
      const name = `${new Date().getTime()}${i}`;
      let imageType = '';
      if (image.includes('\\pngblip')) {
        imageType = 'image/png';
      } else if (image.includes('\\jpegblip')) {
        imageType = 'image/jpeg';
      }

      if (imageType) {
        result.push({
          hex: image.replace(regexPictureHeader, '').replace(/[^\da-fA-F]/g, ''),
          type: imageType,
          name,
        });
      }
    }
  }

  return result;
}

/**
 * 将html内容中img标签的属性值替换
 * @param imageSrcs html中img的属性src的值的集合
 * @param imagesHexSources rtf中图片数据的集合，与html内容中的img标签对应
 * @param isBase64Data 是否是Base64的图片数据
 * @return File
 */
export const transAsImgToFile = (imageSrcs, imagesHexSources, isBase64Data = true) => {
  const imgs: File[] = [];
  if (imageSrcs.length === imagesHexSources.length) {
    for (let i = 0; i < imageSrcs.length; i++) {
      const img = imagesHexSources[i];
      const b64 = `${transAsHexToB64(img.hex)}`;
      const newSrc = isBase64Data
        ? new File(
            [transAsB64ToFile(b64, img.name, img.type)],
            img.name + img.type.replace('image/', '.'),
            { type: img.type }
          )
        : img;
      imgs.push(newSrc);
    }
  }

  return imgs;
}

/**
 * 将html内容中img标签的属性值替换为上传后的地址
 * @param htmlData html
 * @param imageSrcs html中img的属性src的值的集合
 * @return String
 */
export const replaceAsUpdSrc = (htmlData, imageSrcs, imagesHexSources, newImgs) => {
  if (imageSrcs.length === imagesHexSources.length) {
    for (let i = 0; i < imageSrcs.length; i++) {
      htmlData = htmlData.replace(imageSrcs[i], newImgs[i]);
    }
  }

  return htmlData;
}

/**
 * 十六进制转base64
 */
const transAsHexToB64 = (hexStr) => {
  return window.btoa(
    hexStr
      .match(/\w{2}/g)
      .map((char) => {
        return String.fromCharCode(parseInt(char, 16));
      })
      .join('')
  );
}
