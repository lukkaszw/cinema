import isObjEmpty from './isObjEmpty';

const emptyObject = {};
const notEmptyObject = {
  value: null,
};

describe('isObjEmpty function', () => {
  it('returns true when object has no properties', () => {
    expect(isObjEmpty(emptyObject)).toBe(true);
  });

  it('returns false when object has some property', () => {
    expect(isObjEmpty(notEmptyObject)).toBe(false);
  });
});