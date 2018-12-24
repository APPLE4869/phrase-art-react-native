export const replaceDateStringForIOS = (dateString: string): string => {
  return dateString.replace(/-/g, "/").replace("T", " ");
};

// 全角・半角スペースを削除
export const deleteAllHalfAndFullSpace = (text: string): string => {
  return text.replace(/\s|　/g, "");
};

// 3つ以上の空行を2つに変換
export const replaceMoreThreeBlankLineToTwo = (text: string): string => {
  return text.replace(/(\r\n)(\r\n)+|\n\n+/g, "\n\n");
};
