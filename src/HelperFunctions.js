var toDecimal = function (number) {
  return number[0].numerator + number[1].numerator /
    (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
};

const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
     const reader = new FileReader();
     reader.onload = () => {
       resolve(reader.result);
      };
     reader.onerror = error => reject(error);
     reader.readAsDataURL(file);
  });
} 

const getBase = (img) => {
  return getBase64(img).then(base64=>{
    return base64;
  })
}

export { toDecimal, getBase };