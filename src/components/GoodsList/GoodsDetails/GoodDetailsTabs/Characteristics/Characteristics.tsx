import { useAppSelector } from '../../../../../hooks/redux-hooks';

const Characteristics = () => {
    const item = useAppSelector((state) => state.item.selectedItem);

    const excludedFields = ['img', 'name', 'price', 'rating', 'reviews'];

    if (!item) {
        return <div>Loading...</div>;
    }

    const renderFields = () => {
        return Object.keys(item).map((key) => {
            if (!excludedFields.includes(key)) {
            return (
                <li key={key}>
                <strong>{key}: </strong>
                {item[key]}
                </li>
            );
            }
            return null;
        });
    };

    return (
        <section className='characteristics-section'>
            <h3>Characteristics</h3>
            <ul>{renderFields()}</ul>
        </section>
    );
};

export default Characteristics;