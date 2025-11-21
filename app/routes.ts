import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layouts/topbar.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("sigin", "routes/siginIn.tsx"),
    route("dashboard", "routes/dashBoard.tsx"),
    route("user", "routes/admin/user.tsx"),
    route("logout", "routes/logout.tsx"),
    route("reset/:userId", "routes/admin/resetPassword.tsx"),
    route("topic/add", "routes/admin/addTopic.tsx"),
    route("topic", "routes/admin/topic.tsx"),
    route("topic/downloard/:id", "routes/admin/downloardTopic.tsx"),
    route("topic/delete/:id", "routes/admin/deleteTopic.tsx"),
  ]),
] satisfies RouteConfig;
