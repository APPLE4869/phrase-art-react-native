export const replaceDateStringForIOS = (dateString: string): string => {
  return dateString.replace(/-/g, "/").replace("T", " ");
};
