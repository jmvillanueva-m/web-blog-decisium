import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p>Cargando artículos...</p>
    </div>
  );
};

export default LoadingSpinner;