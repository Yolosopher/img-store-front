import { useDetectClickOutside } from "react-detect-click-outside";

import React from "react";

interface OutsideClickProps extends React.HTMLAttributes<HTMLElement> {
  onClose: () => void;
  children?: React.ReactNode;
  disableClick?: boolean;
  as?: React.ElementType;
}

const OutsideClick = ({
  as,
  onClose,
  children,
  disableClick,
  ...args
}: OutsideClickProps) => {
  const As = as || "div";
  const ref = useDetectClickOutside({
    onTriggered: onClose,
    allowAnyKey: true,
    disableClick,
  });
  return (
    <As ref={ref} {...args}>
      {children ?? ""}
    </As>
  );
};

export default OutsideClick;
