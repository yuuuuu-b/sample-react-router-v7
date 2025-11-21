import { logout } from "~/sessions.server";

export async function action() {
  return await logout();
}
