import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

export default function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e); // Save the event for later use
      setIsInstallable(true); // Show install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null); // Reset the deferred prompt
      });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        bgcolor: "inherit",
        px: "60px",
      }}
    >
      <Divider
        component="div"
        sx={{
          "::before, ::after": { top: "0%" },
        }}
      >
        <Typography color="grey.700" variant="h6" component="span">
          Developed by{" "}
          <Link
            target="_blank"
            underline="none"
            sx={{ color: "text.primary" }}
            href="https://x.com/THE_SANDF"
          >
            @THE_SANDF
          </Link>
        </Typography>
      </Divider>
      {isInstallable && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleInstallClick}
          sx={{ mt: 2 }}
        >
          Install App
        </Button>
      )}
    </Box>
  );
}
