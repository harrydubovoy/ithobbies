import React from "react";
import { Button } from "antd";

function BackButton(props) {
  return (
    <Button
      type="primary"
      icon="arrow-left"
      onClick={() => { handleBack(props) }}
      block>Back</Button>
    )
}

function handleBack(props) {
  props.history.go(-1)
}

export default BackButton;