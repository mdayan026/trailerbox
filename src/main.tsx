// Importing necessary styles for the Slick Carousel (used for sliders)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom class name setup (likely for Tailwind or other styling)
import "./CustomClassNameSetup";

// Importing React and ReactDOM for rendering the app
import React from "react";
import ReactDOM from "react-dom/client";

// Redux provider to integrate the Redux store with the application
import { Provider } from "react-redux";

// RouterProvider for handling navigation in the app
import { RouterProvider } from "react-router-dom";

// Material-UI theme provider for global styling
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Importing the Redux store for state management
import store from "./store";

// Importing an API slice to fetch configuration data on app load
import { extendedApi } from "./store/slices/configuration";

// Importing the color palette configuration for Material-UI theme
import palette from "./theme/palette";

// Importing the application's routes configuration
import router from "./routes";

// A loading screen that shows up while the app is initializing
import MainLoadingScreen from "./components/MainLoadingScreen";

// Pre-fetching the configuration settings from the API when the app starts
store.dispatch(extendedApi.endpoints.getConfiguration.initiate(undefined));

// Creating the root element where the app will be rendered
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Rendering the application inside the root element
root.render(
  <Provider store={store}> {/* Providing the Redux store to the entire application */}
    <React.StrictMode> {/* Helps identify potential problems in development mode */}
      <ThemeProvider theme={createTheme({ palette })}> {/* Applying Material-UI theme */}
        <RouterProvider
          router={router} // Setting up routing for navigation
          fallbackElement={<MainLoadingScreen />} // Displays loading screen while routes are being loaded
        />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
