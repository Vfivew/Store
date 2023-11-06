import React from 'react';

type Good = {
    [key: string]: any;
};

type UniqueElementsProps = {
    allGoods: Good[];
    filterKey: string;
    handleCheckboxChange: (key: any, value: any, min?: any, max?: any) => void;
    selectPriceMin: string | null;
    selectPriceMax: string | null;
};

const UniqueElements: React.FC<UniqueElementsProps> = ({
    allGoods,
    filterKey,
    handleCheckboxChange,
    selectPriceMin,
    selectPriceMax
}) => {
    let uniqueValuesSet = new Set();
    const uniqueElements: JSX.Element[] = [];

    allGoods.forEach((good: Good, idx: number) => {
        if (good[filterKey] && !uniqueValuesSet.has(good[filterKey])) {
            uniqueValuesSet.add(good[filterKey]);
            uniqueElements.push(
                <div key={idx}>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(filterKey, good[filterKey], selectPriceMin, selectPriceMax)}
                        />
                        {good[filterKey]}
                    </label>
                </div>
            );
        }
    });

    uniqueValuesSet.clear();

    return <>{uniqueElements}</>;
};

export default UniqueElements;
