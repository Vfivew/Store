import { useAppSelector } from "../../../hooks/redux-hooks";
import { useState } from 'react';

type Good = {
    [key: string]: any;
};

const AdditionalFilter: React.FC = () => {
    const allGoods = useAppSelector((state) => state.sort.allGoods) as Good[];
    const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxPrice = 0;
    let additionalFilter: string[] = [];
    console.log(allGoods);
    if (allGoods && Array.isArray(allGoods) && allGoods.length > 0) {
        const allPossibleKeys: string[] = ["price", "weight", "producer", "length", "transport_length", "material", "number_of_sections"];
        console.log(allPossibleKeys);
        additionalFilter = allPossibleKeys.map(key => key);
        console.log(additionalFilter);

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

    const handleCheckboxChange = (key: string, value: string) => {
        setSelectedValues(prevState => ({ ...prevState, [key]: value }));
    };

    return (
        <>
            {additionalFilter.map((key, index) => {
                const displayKey = key.replace(/_/g, ' ');
                if (key === 'price') {
                    return (
                        <div key={index}>
                            <p>{displayKey}</p>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={selectedValues[key] || minPrice}
                                onChange={(e) => handleCheckboxChange(key, e.target.value)}
                            />
                            <span>{selectedValues[key] || minPrice}</span>
                        </div>
                    );
                }
                return (
                    <div key={index}>
                        <p>{displayKey}</p>
                        {allGoods.map((good: Good, idx: number) => (
                            <div key={idx}>
                                {good[key] && (
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedValues[key] === good[key]}
                                            onChange={() => handleCheckboxChange(key, good[key])}
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
