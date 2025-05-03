
const ErrorPage = ({ message }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-lg">{message}</p>
      </div>
    );
  };
  
  export default ErrorPage;
  