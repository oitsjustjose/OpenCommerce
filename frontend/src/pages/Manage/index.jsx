import React, { useState } from 'react';

export default () => {
  const [data, setData] = useState(null);

  const getBase64 = (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (ev) => {
        resolve(ev.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const onChange = async (evt) => {
    const encoded = await Promise.all(Array.from(evt.target.files).map(getBase64));
    setData(encoded);
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={onChange} />

      <hr />
      { data && (
      <div>
        <b>Output</b>
        <p>{data}</p>
      </div>
      )}

    </div>
  );
};
