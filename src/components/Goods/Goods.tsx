import { useFetchDocumentByIdQuery } from "../../store/slice/fireStoreApi";
import { useParams } from "react-router-dom";

import StatusDetermine from "../../utils/StatusDetermine/StatusDetermine";
import NavigationMiniBar from "./NavigationMiniBar";

const Goods = () => {
    const { itemId } = useParams();
    const { data, isLoading, isError } = useFetchDocumentByIdQuery(`${itemId}`);
    console.log(data)

    return (
        <main>
            <NavigationMiniBar routes={['Goods', itemId?itemId:'']} />
            <StatusDetermine isLoading={isLoading} isError={isError} data={data} />
        </main>
    );
};

export default Goods;