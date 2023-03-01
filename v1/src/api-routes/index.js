import ProjectRoutes from "./Projects.js";
import UserRoutes from "./Users.js";
import SectionRoutes from "./Sections.js";
import TaskRoutes from "./Tasks.js";

export default function loadRoutes(app) {
  app.use("/projects", ProjectRoutes);
  app.use("/users", UserRoutes);
  app.use("/sections", SectionRoutes);
  app.use("/tasks", TaskRoutes);
}

// export default {ProjectRoutes, UserRoutes, SectionRoutes}
