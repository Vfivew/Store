import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { useState } from 'react';
import { extractGoodsFromData } from '../../../utils/extractGoodsFromData'
import { setFilter } from '../../../store/slice/goodsSlice'

type Good = {
    [key: string]: any;
};

const AdditionalFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.goods.data);
    const [selectPrice, setSelectPrice] = useState<{ min: string|null; max: string | null}>({ min: null, max: null });
    const [activeAdditionalFilter, setActiveAdditionalFilter] = useState<{ key: string, value: string }[]>([]);
    let allGoods = extractGoodsFromData(data);
    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxPrice = 0;
    let additionalFilter: string[] = [];
    console.log(allGoods)
    if (allGoods && Array.isArray(allGoods) && allGoods.length > 0) {
        let allPossibleKeys: string[] = [];
        const excludedKeys = ['reviews', 'rating', 'img', 'desc', 'article','description', 'name'];
        if (allGoods && Array.isArray(allGoods) && allGoods.length > 0) {
            allGoods.forEach(good => {
                for (const key in good) {
                    if (!excludedKeys.includes(key) && !allPossibleKeys.includes(key)) {
                        allPossibleKeys.push(key);
                    }
                }
            });
        }
        additionalFilter = allPossibleKeys.map(key => key);
        allGoods.forEach(good => {
            const price = parseInt(good["price"]);
            if (!isNaN(price)) {
                if (price < minPrice) {
                    minPrice = price;
                }
                if (price > maxPrice) {
                    maxPrice = price;
                }
            }
        });
    }   

    const handleCheckboxChange = (key: any, value: any, min?: any, max?: any) => {
        if (key !== null && value !== null) {
            const existingFilterIndex = activeAdditionalFilter.findIndex(
                (filter) => filter.key === key && filter.value === value
            );

            let updatedFilter: { key: string; value: string }[];

            if (existingFilterIndex !== -1) {
                updatedFilter = activeAdditionalFilter.filter(
                    (filter, index) => index !== existingFilterIndex
                );
            } else {
                updatedFilter = [...activeAdditionalFilter, { key, value }];
            }
            console.log(updatedFilter);
            setActiveAdditionalFilter(updatedFilter);
            dispatch(setFilter({ min, max, updatedFilter, }))
        } else {
            dispatch(setFilter({ min, max, updatedFilter:activeAdditionalFilter, }))
        }
    };

    return (
        <>
            {additionalFilter.map((key, index) => {
                const displayKey = key.replace(/_/g, ' ');
                if (key === 'price') {
                    return (
                        <div className="additional-filter" key={index}>
                            <p>Price Range</p>
                            <input
                                type="number"
                                min={minPrice}
                                max={maxPrice}
                                value={selectPrice.min !== null ? selectPrice.min : ""}
                                onChange={(e) => setSelectPrice({ ...selectPrice, min: e.target.value })}
                            />
                            <span> to </span>
                            <input
                                type="number"
                                min={minPrice}
                                max={maxPrice}
                                value={selectPrice.max !== null ? selectPrice.max : ""}
                                onChange={(e) => setSelectPrice({ ...selectPrice, max: e.target.value })}
                            />
                            <button onClick={() => handleCheckboxChange(null, null, selectPrice.min, selectPrice.max)}>Apply</button>
                        </div>
                    );
                }
                return (
                    <div className="additional-filter" key={index}>
                        <p>{displayKey}</p>
                        {allGoods.map((good: Good, idx: number) => (
                            <div key={idx}>
                                {good[key] && (
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(key, good[key], selectPrice.min, selectPrice.max)}
                                        />
                                        {good[key]}
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
};

export default AdditionalFilter;
