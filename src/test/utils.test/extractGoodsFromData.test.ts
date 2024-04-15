import { extractGoodsFromData } from '../../utils/extractGoodsFromData';

describe('extractGoodsFromData', () => {
  test('returns an empty array if data is null', () => {
    const result = extractGoodsFromData(null);
    expect(result).toEqual([]);
  });

  test('returns an empty array if data has an empty category object', () => {
    const result = extractGoodsFromData({ Spinning: {} });
    expect(result).toEqual([]);
  });

  test('returns an array with one item if data has a category with valid item', () => {
    const data = {
      Spinning: {
        "01": {
          Producer: "Golden Catch",
          article: "01",
          casting: "3.5 lbs",
          img: "https://i.imgur.com/hsO739y.png",
          length: "3.7",
          material: "Carbon",
          name: "GC X-3 Carp Evolution 3.60m 3.5 lbs",
          "number of sections": "3",
          price: "50",
          rating: ['4'],
          reviews: [{}],
          weigth: "430"
        }
      }
    };

    const result = extractGoodsFromData(data);
    expect(result).toEqual([{
      Producer: "Golden Catch",
      article: "01",
      casting: "3.5 lbs",
      img: "https://i.imgur.com/hsO739y.png",
      length: "3.7",
      material: "Carbon",
      name: "GC X-3 Carp Evolution 3.60m 3.5 lbs",
      "number of sections": "3",
      price: "50",
      rating: ['4'],
      reviews: [{}],
      weigth: "430"
    }]);
  });
});
