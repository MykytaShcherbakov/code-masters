import { useRouteError, Link } from 'react-router-dom';
import './ErrorPage.scss';

function ErrorPage() {
  const error = useRouteError();
  console.error('An error occurred:', error);

  let errorMessage = 'Error';

  if (error && typeof error === 'object') {
    if (error.message) {
      errorMessage = error.message;
    } else if (error.data && error.data.message) {
      errorMessage = error.data.message;
    }
  }

  return (
    <div className="error-page-container">
      <h1>Somethong went wrong</h1>
      <p>{errorMessage}</p>
      <Link to="/" className="error-page-link">
        Back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;