const sortObjKeysAlphabetically = (obj: { [key: string]: any }) => {
  const newObj: { [key: string]: any } = {};

  Object.keys(obj)
    .sort()
    .forEach((key) => {
      newObj[key] = obj[key];
    });

  return newObj;
};

export default sortObjKeysAlphabetically;
