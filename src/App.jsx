import { useState } from "react";
import { Login } from "./pages/public";
import path from "./utils/path";
import {
  Home,
  Public,
  Genres,
  GenreAdd,
  GenreEdit,
  GenreView,
  Albums,
  AlbumAdd,
  AlbumEdit,
  AlbumView,
  Artists,
  ArtistAdd,
  ArtistEdit,
  ArtistView,
  Songs,
  SongAdd,
  SongEdit,
  SongView,
  Playlists,
  PlaylistAdd,
  PlaylistEdit,
  PlaylistView,
} from "./pages/public";

import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />

          {/* Genres */}
          <Route path={path.GENRES_ALL} element={<Genres />} />
          <Route path={path.GENRES_ADD} element={<GenreAdd />} />
          <Route path={path.GENRES_EDIT} element={<GenreEdit />} />
          <Route path={path.GENRES_VIEW} element={<GenreView />} />

          {/* Albums */}
          <Route path={path.ALBUMS_ALL} element={<Albums />} />
          <Route path={path.ALBUMS_ADD} element={<AlbumAdd />} />
          <Route path={path.ALBUMS_EDIT} element={<AlbumEdit />} />
          <Route path={path.ALBUMS_VIEW} element={<AlbumView />} />

          {/* Artists */}
          <Route path={path.ARTISTS_ALL} element={<Artists />} />
          <Route path={path.ARTISTS_ADD} element={<ArtistAdd />} />
          <Route path={path.ARTISTS_EDIT} element={<ArtistEdit />} />
          <Route path={path.ARTISTS_VIEW} element={<ArtistView />} />

          {/* Songs */}
          <Route path={path.SONGS_ALL} element={<Songs />} />
          <Route path={path.SONGS_ADD} element={<SongAdd />} />
          <Route path={path.SONGS_EDIT} element={<SongEdit />} />
          <Route path={path.SONGS_VIEW} element={<SongView />} />

          {/* Playlists */}
          <Route path={path.PLAYLISTS_ALL} element={<Playlists />} />
          <Route
            path={path.PLAYLISTS_ADD}
            element={<PlaylistAdd />}
          />
          <Route
            path={path.PLAYLISTS_EDIT}
            element={<PlaylistEdit />}
          />
          <Route
            path={path.PLAYLISTS_VIEW}
            element={<PlaylistView />}
          />
        </Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
