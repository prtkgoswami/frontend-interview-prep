const events = [
    { userId: "u1", type: "click", timestamp: 100 },
    { userId: "u2", type: "view", timestamp: 105 },
    { userId: "u1", type: "scroll", timestamp: 110 },
    { userId: "u1", type: "click", timestamp: 120 },
    { userId: "u2", type: "click", timestamp: 125 },
];

/*
TARGET:
{
  u1: {
    click: 2,
    scroll: 1
  },
  u2: {
    view: 1,
    click: 1
  }
}
*/

const formatData = () => {
    const newObj = {};

    for (const event of events) {
        const { userId, type } = event;

        if (!Object.hasOwn(newObj, userId)) {
            newObj[userId] = {};
        }

        if (Object.hasOwn(newObj[userId], type)) {
            newObj[userId][type]++;
        } else {
            newObj[userId][type] = 1;
        }
    }

    return newObj;
}

console.log(formatData());