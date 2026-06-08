import React,
{
  createContext,

  useContext,

  useEffect,

  useMemo,

  useState,
} from "react";

/*
========================================
AUTH CONTEXT
========================================
*/

const AuthContext =
  createContext();

/*
========================================
AUTH PROVIDER
========================================
*/

export const AuthProvider =
  ({ children }) => {

    /*
    ========================================
    STATES
    ========================================
    */

    const [

      user,

      setUser,

    ] = useState(null);

    const [

      token,

      setToken,

    ] = useState(null);

    const [

      loading,

      setLoading,

    ] = useState(true);

    /*
    ========================================
    HYDRATE AUTH
    ========================================
    */

    useEffect(() => {

      try {

        const storedUser =

          localStorage.getItem(
            "user"
          );

        const storedToken =

          localStorage.getItem(
            "token"
          );

        /*
        ========================================
        RESTORE SESSION
        ========================================
        */

        if (
          storedUser &&
          storedToken
        ) {

          setUser(
            JSON.parse(
              storedUser
            )
          );

          setToken(
            storedToken
          );
        }

      } catch (error) {

        console.error(
          "AUTH HYDRATION ERROR:",
          error
        );

        /*
        ========================================
        CLEAN INVALID STORAGE
        ========================================
        */

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "token"
        );

      } finally {

        setLoading(false);
      }

    }, []);

    /*
    ========================================
    LOGIN
    ========================================
    */

    const login =
      (

        userData,

        accessToken
      ) => {

        /*
        ========================================
        SAVE STORAGE
        ========================================
        */

        localStorage.setItem(
          "user",

          JSON.stringify(
            userData
          )
        );

        localStorage.setItem(
          "token",

          accessToken
        );

        /*
        ========================================
        UPDATE STATE
        ========================================
        */

        setUser(
          userData
        );

        setToken(
          accessToken
        );
      };

    /*
    ========================================
    LOGOUT
    ========================================
    */

    const logout =
      () => {

        /*
        ========================================
        CLEAR STORAGE
        ========================================
        */

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "token"
        );

        /*
        ========================================
        RESET STATE
        ========================================
        */

        setUser(null);

        setToken(null);
      };

    /*
    ========================================
    AUTH CHECK
    ========================================
    */

    const isAuthenticated =
      !!token;

    /*
    ========================================
    MEMOIZED VALUE
    ========================================
    */

    const value =
      useMemo(
        () => ({

          user,

          token,

          loading,

          login,

          logout,

          isAuthenticated,
        }),

        [

          user,

          token,

          loading,
        ]
      );

    /*
    ========================================
    PROVIDER
    ========================================
    */

    return (

      <AuthContext.Provider
        value={value}
      >

        {children}

      </AuthContext.Provider>
    );
  };

/*
========================================
USE AUTH
========================================
*/

export const useAuth =
  () => {

    const context =
      useContext(
        AuthContext
      );

    /*
    ========================================
    SAFETY CHECK
    ========================================
    */

    if (!context) {

      throw new Error(

        "useAuth must be used inside AuthProvider"
      );
    }

    return context;
  };