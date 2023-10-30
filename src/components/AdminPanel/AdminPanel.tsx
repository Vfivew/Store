import React from 'react';
import { useFetchDocumentsQuery } from '../../store/slice/fireStoreApi'
import AddGoods from './AddGoods';
import AddGoodsType from './AddGoodsType';
import AddGoodsCategory from './AddGoodsCategory';

const AdminPanel = () => {
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    console.log(data)
    
    return (
        <main className='main-admin-panel'>
            <AddGoodsType />
            <AddGoodsCategory />
            <AddGoods />
        </main>
    );
};

export default AdminPanel;