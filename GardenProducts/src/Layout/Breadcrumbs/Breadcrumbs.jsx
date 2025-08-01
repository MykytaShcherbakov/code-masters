import { Link, useLocation, useMatches } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  const matches = useMatches();
  const location = useLocation();

  console.log(matches);
  console.log(location);
  
  

  // Мы скрываем в этом месте кода крошки на главной стринице и в корзине
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
          // Берём лейбл из handle.breadcrumb (функция или строка)
          const label =
            typeof match.handle?.breadcrumb === 'function'
              ? match.handle?.breadcrumb(match.params, match.data)
              : match.handle?.breadcrumb;
          if (!label) return null;
          const href = match.pathname || '/';
          return { label, href };
        })
        .filter(Boolean) // удаляем null-ы если label не был найден
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
