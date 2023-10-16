import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

import {GoodsItem, GoodsKind} from '../../models/fireStoreModels'

export const firebaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    fetchDocuments: builder.query({
      async queryFn() {
        try {
          const goodsCollectionRef = collection(db, "Goods");
          const querySnapshot = await getDocs(goodsCollectionRef);
          const goodsData: GoodsItem[] = [];
          querySnapshot.forEach((doc) => {
            goodsData.push({
              id: doc.id,
            });
          });

          return { data: goodsData };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Document"],
    }),
  fetchBasket: builder.query({
    async queryFn(email) {
      console.log(email);
      try {
        const docRef = doc(db, 'UserBasket', email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const basketData: any = docSnap.data();
          console.log(basketData);
          return { data: basketData };
        } else {
          console.log('No such document!');
          return { data: null };
        }
      } catch (error) {
        console.error('Error getting document:', error);
        return { error };
      }
    },
    providesTags: ["Document"],
  }),
    fetchDocumentById: builder.query({
      async queryFn(itemId) {
        try {
          console.log('fetchDocumentById')
          const goodsDocRef = doc(db, "Goods", itemId);
          const goodsDocSnapshot = await getDoc(goodsDocRef);

          if (goodsDocSnapshot.exists()) {
            const itemData = goodsDocSnapshot.data() as GoodsKind;
            return { data: itemData };
          } else {
            return { data: null };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchDocumentsQuery,useFetchBasketQuery, useFetchDocumentByIdQuery } = firebaseApi;
