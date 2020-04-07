export const timesToObject = array => {
  let objArray = [];
  array.forEach((item, index) => {
    const obj = scheduleItem(item);
    objArray.push(obj);
  });
  return objArray;
};

export const scheduleItem = item => {
  const splitTime = item.replace(" ", "").split("-");
  const firstHour = parseInt(splitTime[0].split(":")[0], 10);
  const firstMin = parseInt(splitTime[0].split(":")[1], 10);
  const lastHour = parseInt(splitTime[1].split(":")[0], 10);
  const lastMin = parseInt(splitTime[1].split(":")[1], 10);
  return {
    firstHour: firstHour,
    firstMin: firstMin,
    lastHour: lastHour,
    lastMin: lastMin
  };
};

export const scheduleValidate = (array, item) => {
  let isValid = false;
  const selectedSchedule = scheduleItem(item);
  timesToObject(array).forEach((item, index) => {
    if (
      selectedSchedule.firstHour >= item.firstHour &&
      selectedSchedule.lastHour <= item.lastHour &&
      !isValid
    ) {
      isValid = true;
    }
  });
  return isValid;
};
