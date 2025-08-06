import "../App.css";

export const EditField = () => {
  return (
    <input
      type="text"
      autoFocus
      style={{
        width: "96%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlock: "0.5rem",
        border: "1px solid gray",
        padding: "0.25rem",
        minHeight: "40.2px",
      }}
    />
  );
};
