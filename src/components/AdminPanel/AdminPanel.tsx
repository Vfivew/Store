import GoodsManagement from "./GoodsManagment/GoodsManagement";
import TypeManagment from "./TypeManagment/TypeManagment";
import CategoryManagement from "./CategoryManagement/CategoryManagement";
import UpdateDiscount from "./DiscountManagment/UpdateDiscount";

const AdminPanel = () => {
  return (
    <main className="main-admin-panel">
      <TypeManagment />
      <CategoryManagement />
      <GoodsManagement />
      <UpdateDiscount />
    </main>
  );
};

export default AdminPanel;
