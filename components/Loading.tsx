const Loading = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="col">Loading...</div>
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};
export default Loading;
