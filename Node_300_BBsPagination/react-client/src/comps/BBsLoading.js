import ClipLoader from "react-spinners/ClipLoader";

const loadingBox = {
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const BBsLoading = () => {
  return (
    <div style={loadingBox}>
      <ClipLoader size={100} />
    </div>
  );
};

export default BBsLoading;
