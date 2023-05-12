import "../styles/globals.css";
import "../styles/previews.css";
import { useEffect, useState } from "react";
import swr from "swr";
import Tracker from "@openreplay/tracker/cjs";

const tracker = new Tracker({
  projectKey: "NbZyGdEMAdOhULY4SL73",
});

function MyApp({ Component, pageProps }) {
  let [user, setUser] = useState(null);
  useEffect(() => tracker.start(), []);
  useEffect(() => {
    async function fetchUser() {
      let user = await fetch("/api/me").then((res) => res.json());
      setUser(user);
    }
    fetchUser();
  }, []);
  pageProps.user = user;
  return <Component {...pageProps} />;
}

export default MyApp;
