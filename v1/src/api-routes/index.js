import UserRoutes from "./Users.js";

export default function loadRoutes(app) {
  app.use("/users", UserRoutes);
}

// export default {ProjectRoutes, UserRoutes, SectionRoutes}
