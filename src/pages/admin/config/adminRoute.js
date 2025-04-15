
import { admin_path } from "../../../utils/path";
import { AlbumAdd, AlbumEdit, Albums, AlbumView, ArtistAdd, ArtistEdit, Artists, ArtistView, GenreAdd, GenreEdit, Genres, GenreView, Home, Login, PlaylistAdd, PlaylistEdit, Playlists, PlaylistView, SongAdd, SongEdit, Songs, SongView } from "../index.jsx";

export const layoutAdminRoute = [
    {
        path: admin_path.HOME,
        component: Home,
        isHeader: true,
        isSidebar: true,
        title: "Home",
    },
    {
        path: admin_path.LOGIN,
        component: Login,
        isHeader: false,
        isSidebar: false,
        title: "Login",
    },

    // Genres
    {
        path: admin_path.GENRES_ALL,
        component: Genres,
        isHeader: true,
        isSidebar: true,
        title: "Genres",
    },
    {
        path: admin_path.GENRES_ADD,
        component: GenreAdd,
        isHeader: true,
        isSidebar: true,
        title: "Add Genre",
    },
    {
        path: admin_path.GENRES_EDIT,
        component: GenreEdit,
        isHeader: true,
        isSidebar: true,
        title: "Edit Genre",
    },
    {
        path: admin_path.GENRES_VIEW,
        component: GenreView,
        isHeader: true,
        isSidebar: true,
        title: "View Genre",
    },

    // Albums
    {
        path: admin_path.ALBUMS_ALL,
        component: Albums,
        isHeader: true,
        isSidebar: true,
        title: "Albums",
    },
    {
        path: admin_path.ALBUMS_ADD,
        component: AlbumAdd,
        isHeader: true,
        isSidebar: true,
        title: "Add Album",
    },
    {
        path: admin_path.ALBUMS_EDIT,
        component: AlbumEdit,
        isHeader: true,
        isSidebar: true,
        title: "Edit Album",
    },
    {
        path: admin_path.ALBUMS_VIEW,
        component: AlbumView,
        isHeader: true,
        isSidebar: true,
        title: "View Album",
    },

    // Artists
    {
        path: admin_path.ARTISTS_ALL,
        component: Artists,
        isHeader: true,
        isSidebar: true,
        title: "Artists",
    },
    {
        path: admin_path.ARTISTS_ADD,
        component: ArtistAdd,
        isHeader: true,
        isSidebar: true,
        title: "Add Artist",
    },
    {
        path: admin_path.ARTISTS_EDIT,
        component: ArtistEdit,
        isHeader: true,
        isSidebar: true,
        title: "Edit Artist",
    },
    {
        path: admin_path.ARTISTS_VIEW,
        component: ArtistView,
        isHeader: true,
        isSidebar: true,
        title: "View Artist",
    },

    // Songs
    {
        path: admin_path.SONGS_ALL,
        component: Songs,
        isHeader: true,
        isSidebar: true,
        title: "Songs",

    },
    {
        path: admin_path.SONGS_ADD,
        component: SongAdd,
        isHeader: true,
        isSidebar: true,
        title: "Add Song",
    },
    {
        path: admin_path.SONGS_EDIT,
        component: SongEdit,
        isHeader: true,
        isSidebar: true,
        title: "Edit Song",
    },
    {
        path: admin_path.SONGS_VIEW,
        component: SongView,
        isHeader: true,
        isSidebar: true,
        title: "View Song",
    },

    // Playlists
    {
        path: admin_path.PLAYLISTS_ALL,
        component: Playlists,
        isHeader: true,
        isSidebar: true,
        title: "Playlists",
    },
    {
        path: admin_path.PLAYLISTS_ADD,
        component: PlaylistAdd,
        isHeader: true,
        isSidebar: true,
        title: "Add Playlist",
    },
    {
        path: admin_path.PLAYLISTS_EDIT,
        component: PlaylistEdit,
        isHeader: true,
        isSidebar: true,
        title: "Edit Playlist",
    },
    {
        path: admin_path.PLAYLISTS_VIEW,
        component: PlaylistView,
        isHeader: true,
        isSidebar: true,
        title: "View Playlist",
    }
]