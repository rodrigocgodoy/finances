import React, { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  updateProfile,
  onAuthStateChanged,
  signOut,
  database,
  set,
  ref,
} from '../services/firebase';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorLoginMessage, setErrorLoginMessage] = useState(null);
  const [errorRegisterMessage, setErrorRegisterMessage] = useState(null);
  const [errorLogoutMessage, setErrorLogoutMessage] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const updateProfile = async () => {
    await updateProfile(auth.currentUser, {})
      .then(() => {
        console.log('yes, profile is update');
      })
      .catch((error) => {
        setErrorLoginMessage(error.message);
      });
  };

  const register = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        set(ref(database, 'users/' + uid), {
          name,
          email,
        })
          .then(() => {
            setUser(value.user);
          })
          .catch((error) => {
            setErrorRegisterMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorRegisterMessage(error.message);
      });
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        setUser(value.user);
      })
      .catch((error) => {
        setErrorLoginMessage(error.message);
      });
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setErrorLogoutMessage(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!user,
        user,
        register,
        login,
        logout,
        errorLoginMessage,
        errorRegisterMessage,
        errorLogoutMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
