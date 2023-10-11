
export const waitForNewFullData = async (newFullData: any, updateReview: any, itemId: any) => {
    console.log(newFullData)
  if (newFullData === null) {
    await new Promise((resolve) => {
      const checkNewFullData = () => {
        if (newFullData !== null) {
            console.log('first')
          resolve(undefined); 
        } else {
            console.log('second')
          setTimeout(checkNewFullData, 1000);
        }
      };
      checkNewFullData();
    });
  }
  console.log(waitForNewFullData)
  updateReview(itemId, newFullData);
};
