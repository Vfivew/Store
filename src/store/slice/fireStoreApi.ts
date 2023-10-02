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

    fetchDocumentById: builder.query({
      async queryFn(itemId) {
        try {
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
    fetchDocumentsByItemIdAndType: builder.query({
      async queryFn({ itemId, type }: { itemId: string, type: string }) {
        try {
          const goodsCollectionRef = collection(db, "Goods", itemId, type);
          const querySnapshot = await getDocs(goodsCollectionRef);
          console.log(querySnapshot);
          const documentsData: Record<string, GoodsItem> = {}; 

          querySnapshot.forEach((doc) => {
            const itemData: any = doc.data();
            documentsData[doc.id] = itemData; 
          });

          return { data: documentsData };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchDocumentsQuery, useFetchDocumentByIdQuery, useFetchDocumentsByItemIdAndTypeQuery  } = firebaseApi;
