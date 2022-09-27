export function randomList(min: number, max: number) {
  let erro = false;
  let list: number[] = [];
  let number1 = Math.floor(Math.random() * (max - min)) + min;
  let number2 = Math.floor(Math.random() * (max - min)) + min;
  let number3 = Math.floor(Math.random() * (max - min)) + min;

  while (!erro) {
    if (number1 === number2 || number1 === number3 || number3 === number2) {
      number1 = Math.floor(Math.random() * (max - min)) + min;
      number2 = Math.floor(Math.random() * (max - min)) + min;
      number2 = Math.floor(Math.random() * (max - min)) + min;
    } else {
      list.push(number1);
      list.push(number2);
      list.push(number3);
      erro = true;
      return list;
    }
  }
}
