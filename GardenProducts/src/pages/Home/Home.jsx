import Sales from '../../components/Sales/Sales';
import SaleForm from '../../components/SaleForm/SaleForm';
import Banner from '../../components/Banner/Banner';
import CategoriesMainPage from '../../components/CategoriesMainPage/CategoriesMainPage';

export default function Home() {
  return (
    <div>
      <Banner/>
      <CategoriesMainPage />
      <SaleForm />
      <Sales />
    </div>
  );
}