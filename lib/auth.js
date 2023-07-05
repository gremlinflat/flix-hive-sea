import React, { useState, useEffect, useContext, createContext } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import { createUser } from "./firestore";
import cookie from "js-cookie";
import Router from "next/router";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);

      setLoading(false);
      setUser(user);
      cookie.set("FlixHive-auth", true, {
        expires: 1,
      });
      return user;
    } else {
      setLoading(false);
      setUser(false);
      cookie.remove("FlixHive-auth");
      return false;
    }
  };

  const signinWithGitHub = () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider).then((response) => {
      handleUser(response.user);
    });
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then((response) => {
      handleUser(response.user);
      if (redirect) {
        Router.push(redirect);
      }
    });
  };

  const signout = () => {
    Router.push("/");
    return signOut(auth).then(() => handleUser(false, false));
  };

  const getUserToken = () => {
    if (auth.currentUser == null) {
      return null;
    } else {
      return auth.currentUser.getIdToken(true);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signinWithGoogle,
    signout,
    getUserToken,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
  };
};
