import React from "react";

interface IAvatarProps {
  isUserAvatar?: boolean;
  disableCustomSize?: boolean;
}

export default function Avatar({
  disableCustomSize,
  isUserAvatar = false,
}: IAvatarProps) {
  const userAvatar =
    "https://react.semantic-ui.com/images/avatar/small/elliot.jpg";

  const plusIcon =
    "data:image/jpeg;base64,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";

  return (
    <img
      alt=""
      className="ui avatar image"
      style={disableCustomSize ? {} : { height: 40, width: 40 }}
      src={isUserAvatar ? userAvatar : plusIcon}
    />
  );
}
