import { Button } from "primereact/button";

import * as Styled from "./Navigation.styles";

export interface NavItemProps {
  to?: string;
  active?: boolean;
  handleClick?: () => void;
  label: string;
  icon: JSX.Element;
  bottomIcon?: JSX.Element;
}

export default function NavItem({
  to,
  active,
  handleClick,
  label,
  icon,
  bottomIcon,
}: NavItemProps) {
  if (to) {
    return (
      <Styled.NavItem $active={active}>
        <Styled.StyledLink style={{ height: "100%" }} href={to}>
          <Button icon={icon} label={label} />
        </Styled.StyledLink>

        {bottomIcon}
      </Styled.NavItem>
    );
  }
  return (
    <Styled.NavItem $isButton>
      <Button label={label} onClick={handleClick} icon={icon} />
    </Styled.NavItem>
  );
}
