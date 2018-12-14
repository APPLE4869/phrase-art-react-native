export const replaceDateStringForIOS = (string: string): string => {
  return string.replace(/-/g, "/").replace("T", " ");
};
