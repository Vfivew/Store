import documentsReducer, { setData } from "../../store/slice/documentsSlice";
import { GoodsItem } from "../../types/types";

describe("Documents Slice Reducers", () => {
  it("should set data", () => {
    const initialState: GoodsItem[] = [];

    const newData: GoodsItem[] = [{ id: "Coils" }, { id: "Rods" }];

    const action = setData(newData);
    const state = documentsReducer(initialState, action);

    expect(state).toEqual(newData);
  });
});
