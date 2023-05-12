// import path from 'path';
import { TagEmbeds } from "../utils/funcs.web";
import Head from "next/head";

const filetypes = {
  images: ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"],
  videos: ["mp4", "webm", "mkv", "flv", "vob", "ogv", "ogg"],
};
export function RenderFile({ url }) {
  let ext = url.split(".").pop().split("?")[0];
  switch (ext) {
    default: {
      if (filetypes.images.includes(ext)) return <img src={url} className='shanara-visual noselect' style={{ maxHeight: "70vh", maxWidth: "90vw" }} />;
      if (filetypes.videos.includes(ext))
        return (
          <video autoPlay className='shanara-visual noselect' style={{ maxHeight: "70vh", maxWidth: "90vw" }} controls>
            <source src={url} type='video/mp4' />
            <source src='movie.ogg' type='video/ogg' />
            Your browser does not support the video tag.
          </video>
        );
    }
  }
}

export function RenderMeta({ fileData, user }) {
  let ext = fileData?.file?.url?.split(".").pop().split("?")[0];
  return (
    <Head>
      <title>Shanara Upload | {user?.userName}</title>
      <meta name='twitter:card' content='summary_large_image' />
      {fileData?.user?.embed?.enabled ? (
        <>
          <meta name='theme-color' content={fileData?.user?.embed?.color} />
          <meta property='og:title' content={TagEmbeds(fileData?.user?.embed?.title, user)} />
          <meta property='og:description' content={TagEmbeds(fileData?.user?.embed?.description, user)} />
          <link type='application/json+oembed' href={`https://shanara.host/api/j/${fileData?.uid}`} />
        </>
      ) : null}
      {filetypes.images.includes(ext) ? (
        <>
          <meta property='og:image' content={fileData?.file.url} />
        </>
      ) : filetypes.videos.includes(ext) ? (
        <>
          <meta property='og:video:type' content='video/mp4' />
          <meta property='og:video' content={fileData?.file?.url} />
          <meta property='og:type' content='video' />
          <meta property='og:image' content={fileData?.file.url} />

          <meta property='og:video:width' content='1280' />
          <meta property='og:video:height' content='720' />
        </>
      ) : null}
    </Head>
  );
}
