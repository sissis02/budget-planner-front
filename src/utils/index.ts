const convertPercToNum = (total: number, perc: number) => {
  return (total * (perc/100)).toFixed(2);
}

const convertToLocalDate = (date: string) => {
  return date.split('-').reverse().toString().replaceAll(',', '/');
}

export {
  convertPercToNum,
  convertToLocalDate,
}