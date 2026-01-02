import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import postsReducer from "./reducers/PostsSlice";
import zodiacsReducer from "./reducers/ZodiacsSlice";
import packagesReducer from "./reducers/PackagesSlice";
import appointmentReducer from "./reducers/AppointmentSlice";
import infoReducer from "./reducers/InfoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    zodiacs: zodiacsReducer,
    packages: packagesReducer,
    appointment: appointmentReducer,
    info: infoReducer,
  },
});

export default store;
