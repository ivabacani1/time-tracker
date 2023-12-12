import styles from "./PageWrapper.module.css";

import { StyledPageWrap } from "./PageWrap.styles";

export const PageWrap = ({ children }: { children: any }) => {
  return (
    <>
      <StyledPageWrap>{children}</StyledPageWrap>
    </>
  );
};
