import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { useState } from 'react';
import { extractGoodsFromData } from '../../../utils/extractGoodsFromData'
import { setFilter } from '../../../store/slice/goodsSlice'

import UniqueElements from './AdditionalFilterUniqueElement/UniqueElements'; 

const AdditionalFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.goods.data);
    const [selectPrice, setSelectPrice] = useState<{ min: string|null; max: string | null}>({ min: null, max: null });
    const [activeAdditionalFilter, setActiveAdditionalFilter] = useState<{ key: string, value: string }[]>([]);
    let allGoods = extractGoodsFromData(data);
    let additionalFilter: string[] = [];

    if (allGoods && Array.isArray(allGoods) && allGoods.length > 0) {
        let allPossibleKeys: string[] = [];
        const excludedKeys = ['price', 'reviews', 'rating', 'img', 'desc', 'article','description', 'name'];
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
    }   

    const handleCheckboxChange = (key: any, value: any, min?: any, max?: any) => {
        let updatedMin = min;
        let updatedMax = max;

        if (min === null && max !== null) {
            updatedMin = '1';
        }

        if (max === null && min !== null) {
            updatedMax = '9999';
        }

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
            setActiveAdditionalFilter(updatedFilter);
            dispatch(setFilter({ min: updatedMin, max: updatedMax, updatedFilter }));
        } else {
            dispatch(setFilter({ min: updatedMin, max: updatedMax, updatedFilter: activeAdditionalFilter }));
        }
    };

    const [activeItems, setActiveItems] = useState<number[]>([]);

    const toggleActive = (index: number) => {
        if (activeItems.includes(index)) {
            setActiveItems(activeItems.filter((item) => item !== index));
        } else {
            setActiveItems([...activeItems, index]);
        }
    };

    return (
        <>
        <div className="additional-filter price-filter">
            <p>Price Range</p>
            <input
                type="number"
                value={selectPrice.min !== null ? selectPrice.min : ""}
                onChange={(e) => setSelectPrice({ ...selectPrice, min: e.target.value })}
            />
            <span> to </span>
            <input
                type="number"
                value={selectPrice.max !== null ? selectPrice.max : ""}
                onChange={(e) => setSelectPrice({ ...selectPrice, max: e.target.value })}
            />
            <button onClick={() => handleCheckboxChange(null, null, selectPrice.min, selectPrice.max)}>Apply</button>
        </div>
        
            {additionalFilter.map((key, index) => {
                const displayKey = key.replace(/_/g, ' ');
                const isActive = activeItems.includes(index);

                return (
                    <div className="additional-filter" key={index}>
                        <button className={isActive ? 'button-active' : 'button-default'} onClick={() => toggleActive(index)}>{displayKey}</button>
                        <div className={isActive ? 'filter-active' : 'filter-hide'}>
                            <UniqueElements
                                allGoods={allGoods}
                                filterKey={key}
                                handleCheckboxChange={handleCheckboxChange}
                                selectPriceMin={selectPrice.min}
                                selectPriceMax={selectPrice.max}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default AdditionalFilter;
