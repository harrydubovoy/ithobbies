import React from "react";
import { Spin } from "antd";

function Loader({ loading }) {
  if(loading) {
    return (
      <div className='overlay-spiner'>
        <Spin size="large" />
      </div>
    )
  } else {
    return null;
  }
}

export default Loader;