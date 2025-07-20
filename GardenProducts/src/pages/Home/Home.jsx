import React from 'react';
import Sales from '../../components/Sales/Sales';
import DiscountForm from '../../components/DiscountForm/DiscountForm';
import Categories from '../../components/Categories/Categories';
import Banner from '../../components/Banner/Banner';

export default function Home() {
  return (
    <div>
      <Banner/>
      <Categories />
      <DiscountForm />
      <Sales />
    </div>
  );
}
