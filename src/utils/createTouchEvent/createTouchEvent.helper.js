const createClientXY = (x, y) => ({ clientX: x, clientY: y });

const createTouchEvent = ({ x = 0, y = 0 }) => ({touches: [createClientXY(x, y)]});

export default createTouchEvent;