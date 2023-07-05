import { useState, useEffect, useContext, createContext } from "react";
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
  const [userToken, setUserToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

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
      setUserToken(null);
      setUserProfile(null);
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

  const refreshUserProfile = async () => {
    if (user && userToken) {
      try {
        const response = await fetch("/api/userProfile", {
          headers: {
            "Content-Type": "application/json",
            token: userToken,
          },
        });
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await getUserToken();
        setUserToken(token);
      } catch (error) {
        console.error("Failed to get user token:", error);
        // Handle token expiration or any other error
        signout();
      }
    };

    if (user) {
      fetchUserToken();
    }
  }, [getUserToken, user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && userToken) {
        try {
          const response = await fetch("/api/userProfile", {
            headers: {
              "Content-Type": "application/json",
              token: userToken,
            },
          });
          const data = await response.json();
          setUserProfile(data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user, userToken]);

  return {
    user,
    loading,
    userProfile,
    userToken,
    signinWithGitHub,
    signinWithGoogle,
    signout,
    getUserToken,
    setUserProfile,
    refreshUserProfile,
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
