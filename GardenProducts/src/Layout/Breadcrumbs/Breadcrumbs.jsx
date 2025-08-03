import { Link, useLocation, useMatches } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  const matches = useMatches();
  const location = useLocation();

  const categoryProductsMatch = matches.find((m) =>
    Array.isArray(m.data?.category?.products)
  );
  const directProductsMatch = matches.find((m) =>
    Array.isArray(m.data?.products)
  );

  let products = [];
  if (categoryProductsMatch) {
    products = categoryProductsMatch.data.category.products;
  } else if (directProductsMatch) {
    products = directProductsMatch.data.products;
  }

  const match = location.pathname.match(/^\/categories\/\d+\/product\/(\d+)$/);
  if (match) {
    const productId = Number(match[1]);
    const productExists = products.some((p) => p.id === productId);

    if (!productExists) {
      return null;
    }
  }

  if (
    location.pathname === '/' ||
    location.pathname === '/cart' ||
    matches.length <= 1
  ) {
    return null;
  }

  return (
    <nav className="breadcrumbs">
      {matches
        .map((match) => {
          const label =
            typeof match.handle?.breadcrumb === 'function'
              ? match.handle?.breadcrumb(match.params, match.data)
              : match.handle?.breadcrumb;
          if (!label) return null;
          const href = match.pathname || '/';
          return { label, href };
        })
        .filter(Boolean)
        .map(({ label, href }, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div className="breadcrumb-wrapper" key={href}>
              <Link
                to={href}
                className={`breadcrumb-link${isLast ? ' active' : ''}`}
              >
                {label}
              </Link>
              {index < array.length - 1 && (
                <div className="breadcrumb-separator" />
              )}
            </div>
          );
        })}
    </nav>
  );
};

export default Breadcrumbs;
