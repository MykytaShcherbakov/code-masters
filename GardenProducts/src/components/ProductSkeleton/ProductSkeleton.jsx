import Skeleton from 'react-loading-skeleton'; 
import './ProductSkeleton.scss' 
 
const ProductSkeleton = () => { 
  return ( 
    <> 
      {Array(11)
        .fill(null) 
        .map((value, index) => ( 
          <div key={index} className="product-skeleton-item"> 
            <Skeleton className="skeleton-custom" /> 
          </div> 
        ))} 
    </> 
  ); 
} 
 
export default ProductSkeleton