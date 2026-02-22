const LoadingSpinner = ({ size = 'default', text = 'Loading...' }) => {
  const getSizeClass = () => {
    if (size === 'small') return 'w-6 h-6';
    if (size === 'large') return 'w-16 h-16';
    return 'w-10 h-10';
  };

  return (
    <div className="flex flex-col items-center justify-center py-12" data-testid="loading-spinner">
      <div className={`${getSizeClass()} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
      </div>
      {text && (
        <p className="mt-4 font-body text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
