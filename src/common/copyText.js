import { Message } from "element-ui";
/* eslint-disable import/prefer-default-export */
export const copyToClipboard = (str) => {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", str);
  input.setSelectionRange(0, input.value.length);
  input.select();
  if (document.execCommand) {
    document.execCommand("copy");
    Message({
      message: "复制成功",
      type: "success",
    });
  } else {
    Message({
      message: "复制失败",
      type: "error",
    });
  }
  document.body.removeChild(input);
};
