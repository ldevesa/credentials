"use client";

import { Menu, Button } from "@material-tailwind/react";

export function Dropdown() {
  return (
    <Menu>
      <Menu.Trigger as={Button}>Open</Menu.Trigger>

      <Menu.Content>
        <Menu.Item>Add Team</Menu.Item>

        <Menu.Item>Add Project</Menu.Item>

        <Menu.Item>My Profile</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
