import loadable from "@loadable/component";
import { Spin } from "antd";

// Home & Auth
export const Home = loadable(() => import("./Home/Home.jsx"), {
  fallback: <Spin />,
});
export const Login = loadable(() => import("../Auth/Login.jsx"), {
  fallback: <Spin />,
});

// Genres
export const Genres = loadable(() => import("./Genres/Genres.jsx"), {
  fallback: <Spin />,
});
export const GenreAdd = loadable(
  () => import("./Genres/GenreAdd.jsx"),
  {
    fallback: <Spin />,
  }
);
export const GenreEdit = loadable(
  () => import("./Genres/GenreEdit.jsx"),
  {
    fallback: <Spin />,
  }
);
export const GenreView = loadable(
  () => import("./Genres/GenreView.jsx"),
  {
    fallback: <Spin />,
  }
);

// Albums
export const Albums = loadable(() => import("./Albums/Albums.jsx"), {
  fallback: <Spin />,
});
export const AlbumAdd = loadable(
  () => import("./Albums/AlbumAdd.jsx"),
  {
    fallback: <Spin />,
  }
);
export const AlbumEdit = loadable(
  () => import("./Albums/AlbumEdit.jsx"),
  {
    fallback: <Spin />,
  }
);
export const AlbumView = loadable(
  () => import("./Albums/AlbumView.jsx"),
  {
    fallback: <Spin />,
  }
);

// Artists
export const Artists = loadable(
  () => import("./Artists/Artist.jsx"),
  {
    fallback: <Spin />,
  }
);
export const ArtistAdd = loadable(
  () => import("./Artists/ArtistAdd.jsx"),
  {
    fallback: <Spin />,
  }
);
export const ArtistEdit = loadable(
  () => import("./Artists/ArtistEdit.jsx"),
  {
    fallback: <Spin />,
  }
);
export const ArtistView = loadable(
  () => import("./Artists/ArtistView.jsx"),
  {
    fallback: <Spin />,
  }
);

// Songs
export const Songs = loadable(() => import("./Songs/Songs.jsx"), {
  fallback: <Spin />,
});
export const SongAdd = loadable(() => import("./Songs/SongAdd.jsx"), {
  fallback: <Spin />,
});
export const SongEdit = loadable(
  () => import("./Songs/SongEdit.jsx"),
  {
    fallback: <Spin />,
  }
);
export const SongView = loadable(
  () => import("./Songs/SongView.jsx"),
  {
    fallback: <Spin />,
  }
);

// Playlists
export const Playlists = loadable(
  () => import("./Playlists/Playlists.jsx"),
  {
    fallback: <Spin />,
  }
);
export const PlaylistAdd = loadable(
  () => import("./Playlists/PlaylistAdd.jsx"),
  {
    fallback: <Spin />,
  }
);
export const PlaylistEdit = loadable(
  () => import("./Playlists/PlaylistEdit.jsx"),
  {
    fallback: <Spin />,
  }
);
export const PlaylistView = loadable(
  () => import("./Playlists/PlaylistView.jsx"),
  {
    fallback: <Spin />,
  }
);
