interface MyObject {
  [key: string]: any;
}

function cloneDeep(obj: MyObject): MyObject {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copyArr = [];
    for (let i = 0; i < obj.length; i++) {
      copyArr[i] = cloneDeep(obj[i]);
    }
    return copyArr;
  }

  const copyObj: MyObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copyObj[key] = cloneDeep(obj[key]);
    }
  }
  return copyObj;
}

export default cloneDeep;
