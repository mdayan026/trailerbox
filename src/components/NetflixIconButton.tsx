import { forwardRef } from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

const NetflixIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, sx, ...others }, ref) => {
    return (
      <IconButton
        sx={{
          color: "white",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "grey.700",
          "&:hover, &:focus": {
            borderColor: "grey.200",
          },
          width: { xs: 40, sm: 48, md: 56 }, // Adjusting size for different screens
          height: { xs: 40, sm: 48, md: 56 },
          padding: { xs: 1, sm: 1.5, md: 2 }, // Adjusting padding
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }, // Adjusting icon size
          ...sx,
        }}
        {...others}
        ref={ref}
      >
        {children}
      </IconButton>
    );
  }
);

export default NetflixIconButton;
