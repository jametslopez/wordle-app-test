export const dictionary = async () => {
  const dataAry: any = [];
  const response = await fetch(`/words.txt`);
  const data = await response.text();
  const dataTmp = data.split("\n");
  dataTmp.forEach((element) => {
    if (element.length === 5) {
      dataAry.push(element.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }
  });
  return dataAry;
};
