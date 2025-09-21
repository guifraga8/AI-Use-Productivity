import { Typography, Card, CardMedia, CardContent } from "@mui/material";

export default function ImagesCardContent({ image, caption }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="500"
        image={`/images/${image}`}
        sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
      />
      <CardContent>
        <Typography
          height="1px"
          textAlign="center"
          variant="body2"
          color="text.secondary"
        >
          {caption}
        </Typography>
      </CardContent>
    </Card>
  );
}
