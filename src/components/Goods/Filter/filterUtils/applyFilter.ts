export const applyFilter = ({ min, max, updatedFilter, chekedData }: {
  min: any | null,
  max: any | null,
  updatedFilter: any[], 
  chekedData: any 
}) => {
    const priceFilterData: { [key: string]: any } = {};
    let additionalFilterData: { [category: string]: { [article: string]: any } } = {};
    console.log(updatedFilter)
    if (min !== null || max !== null) {
        if (chekedData) {
            Object.keys(chekedData).forEach((category) => {
              if (chekedData) {
                const categoryGoods = chekedData[category];
                  Object.keys(categoryGoods).forEach((article) => {
                    const articleData = categoryGoods[article];
                    console.log(JSON.stringify(articleData.price, null, 2))
                    const price = articleData.price;
                    if (min && max) {
                      if (!isNaN(price) && price >= parseInt(min) && price <= parseInt(max)) {
                      if(!priceFilterData[category]){
                          priceFilterData[category] = {}
                      }
                        priceFilterData[category][article] = articleData;
                      }
                    }
                  //console.log(JSON.stringify(priceFilterData, null, 2))
                });
              }
            });
            }
        chekedData = priceFilterData
    } 
    console.log('price', chekedData)
    if (updatedFilter.length>0) {
      updatedFilter.forEach((filter:any) => {
        const { key, value } = filter;
          if (chekedData) {
            Object.keys(chekedData).forEach((category) => {
              if (chekedData) {
                const categoryGoods = chekedData[category];
                if (categoryGoods) {
                  Object.keys(categoryGoods).forEach((article) => {
                    const articleData = categoryGoods[article];
                    if (articleData[key] && articleData[key] === value) {
                      if (!additionalFilterData[category]) {
                        additionalFilterData[category] = {};
                      }
                      additionalFilterData[category][article] = articleData;
                    }
                  });
                }
              }
            });
          }
        });
        chekedData = additionalFilterData;
        console.log('filter', chekedData)
    }
    console.log('finish', chekedData)
    return chekedData
}


