"use client";

import React from "react";

import { signOut, useSession } from "next-auth/react";

import DevotLogo from "/public/devot-logo.png";

import * as Styled from "./Navigation.styles.ts";
import NavItem, { NavItemProps } from "./NavItem.tsx";
import * as Icon from "../shared/icons.ts";
import { Flex } from "../shared/Flex/Flex.styles.ts";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();

  const session = useSession();

  return (
    <>
      <Styled.Navigation>
        <Flex $gap={9} style={{ marginTop: "34px", marginBottom: "34px" }}>
          <Image
            src={DevotLogo}
            alt="Devot logo"
            width={162}
            height={44}
            priority
          />
          <Styled.Title $alignItems="center">Tracking tool</Styled.Title>
        </Flex>
        {session.data?.user ? (
          <Flex>
            {navigationItems(pathname).map((item) => {
              return <NavItem key={item.label} {...item} />;
            })}
          </Flex>
        ) : undefined}
      </Styled.Navigation>
    </>
  );
}

function navigationItems(pathname: string | null): NavItemProps[] {
  return [
    {
      label: "Trackers",
      icon: <Icon.TrackersIcon />,
      to: "/trackers",
      bottomIcon: <Icon.LineLeftBottomIcon />,
      active: pathname === "/trackers",
    },
    {
      label: "History",
      icon: <Icon.HistoryIcon />,
      to: "/history",
      bottomIcon: <Icon.LineRightBottomIcon />,
      active: pathname === "/history",
    },
    {
      label: "Logout",
      icon: <Icon.LogoutIcon />,
      handleClick: () => signOut(),
    },
  ];
}
