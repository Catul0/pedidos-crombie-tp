const Spinner = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce" style={{ animationDelay: '.7s' }}></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce" style={{ animationDelay: '.3s' }}></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce" style={{ animationDelay: '.7s' }}></div>
    </div>
  );
};

export default Spinner;
