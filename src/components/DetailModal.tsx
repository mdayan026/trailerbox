import { forwardRef, useCallback, useRef, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Stack,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Player from "video.js/dist/types/player";

import MaxLineTypography from "./MaxLineTypography";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { useGetSimilarVideosQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import VideoJSPlayer from "./watch/VideoJSPlayer";

/**
 * Defines a transition effect for opening/closing the modal.
 * Uses Slide animation from Material-UI.
 */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * DetailModal Component
 * This modal displays detailed information about a selected media item (movie/show).
 */
export default function DetailModal() {
  // Retrieve detail state from context provider
  const { detail, setDetailType } = useDetailModal();

  // Fetch similar videos based on the current media type and ID
  const { data: similarVideos } = useGetSimilarVideosQuery(
    { mediaType: detail.mediaType ?? MEDIA_TYPE.Movie, id: detail.id ?? 0 },
    { skip: !detail.id } // Skip fetching if there's no valid media ID
  );

  // Reference to the video player instance
  const playerRef = useRef<Player | null>(null);

  // State to manage whether the video is muted
  const [muted, setMuted] = useState(true);

  /**
   * Callback function triggered when the video player is ready.
   * Stores the player instance and syncs the mute state.
   */
  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);

  /**
   * Toggles the mute state of the video player.
   */
  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  // If there is no media detail available, do not render the modal
  if (!detail.mediaDetail) return null;

  return (
    <Dialog
      fullWidth
      scroll="body"
      maxWidth="md"
      open={!!detail.mediaDetail}
      id="detail_dialog"
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
        <Box sx={{ position: "relative", mb: 3 }}>
          {/* Video Player */}
          <Box sx={{ width: "100%", height: "calc(9 / 16 * 100%)", position: "relative" }}>
            <VideoJSPlayer
              options={{
                loop: true,
                autoplay: true,
                controls: false,
                responsive: true,
                fluid: true,
                techOrder: ["youtube"],
                sources: [
                  {
                    type: "video/youtube",
                    src: `https://www.youtube.com/watch?v=${
                      detail.mediaDetail?.videos.results[0]?.key || "L3oOldViIgY"
                    }`,
                  },
                ],
              }}
              onReady={handleReady}
            />

            {/* Close Button */}
            <IconButton
              onClick={() => setDetailType({ mediaType: undefined, id: undefined })}
              sx={{
                position: "absolute",
                top: { xs: 10, sm: 15 },
                right: { xs: 10, sm: 15 },
                bgcolor: "#181818",
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
                zIndex: 9999,
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              <CloseIcon sx={{ color: "red", fontSize: { xs: 18, sm: 24 } }} />
            </IconButton>

            {/* Overlay Gradients */}
            <Box sx={{ background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`, position: "absolute", top: 0, left: 0, bottom: 0, right: "26.09%", opacity: 1, transition: "opacity .5s" }} />
            <Box sx={{ backgroundImage: "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)", position: "absolute", bottom: 0, width: "100%", height: "14.7vw" }} />
          </Box>

          {/* Movie Details */}
          <Container sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
            <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
              {detail.mediaDetail?.title}
            </MaxLineTypography>

            {/* Action Buttons (Add to List, Like, Mute/Unmute) */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <NetflixIconButton><AddIcon /></NetflixIconButton>
              <NetflixIconButton><ThumbUpOffAltIcon /></NetflixIconButton>
              <Box flexGrow={1} />
              <NetflixIconButton size="large" onClick={() => handleMute(muted)} sx={{ zIndex: 2 }}>
                {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
              </NetflixIconButton>
            </Stack>

            {/* Movie Information */}
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={8}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
                  {/* Random match percentage */}
                  <Typography variant="subtitle1" sx={{ color: "success.main" }}>
                    {`${getRandomNumber(100)}% Match`}
                  </Typography>
                  <Typography variant="body2">
                    {detail.mediaDetail?.release_date.substring(0, 4)}
                  </Typography>
                  <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                  <Typography variant="subtitle2">
                    {formatMinuteToReadable(getRandomNumber(180))}
                  </Typography>
                  <QualityChip label="HD" />
                </Stack>

                {/* Movie Description */}
                <MaxLineTypography maxLine={3} variant="body1" sx={{ mt: 2 }}>
                  {detail.mediaDetail?.overview}
                </MaxLineTypography>
              </Grid>

              {/* Genres and Available Languages */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" sx={{ my: 1 }}>
                  {`Genres: ${detail.mediaDetail?.genres.map((g) => g.name).join(", ")}`}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  {`Available in: ${detail.mediaDetail?.spoken_languages.map((l) => l.name).join(", ")}`}
                </Typography>
              </Grid>
            </Grid>
          </Container>

          {/* Similar Videos Section */}
          {similarVideos && similarVideos.results.length > 0 && (
              <Container sx={{ py: 2, px: { xs: 2, sm: 3, md: 5 } }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  More Like This
                </Typography>
                <Grid container spacing={2}>
                  {similarVideos.results.map((sm) => (
                    <Grid item xs={6} sm={4} key={sm.id}>
                      <SimilarVideoCard video={sm} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
