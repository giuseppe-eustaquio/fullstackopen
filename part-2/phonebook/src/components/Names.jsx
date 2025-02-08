const Names = ({ name, number, handleDelete }) => {
  return (
    <div>
      <p>
        {name} {number}
      </p>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Names;
