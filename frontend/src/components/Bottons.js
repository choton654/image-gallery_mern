import React from "react";

function Bottons() {
  return (
    <div>
      <button onClick={() => openModal(image)} className="btn btn-primary">
        Edit
      </button>
      <button onClick={deleteImg} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
}

export default Bottons;
