const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  // const isSafari =
  //   navigator.userAgent &&
  //   navigator.userAgent.indexOf("CriOS") == -1 &&
  //   navigator.userAgent.indexOf("FxiOS") == -1;

  // return isSafari;
};

export default isSafari;
