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
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorLoginMessage, setErrorLoginMessage] = useState(null);
  const [errorRegisterMessage, setErrorRegisterMessage] = useState(null);
  const [errorLogoutMessage, setErrorLogoutMessage] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        storageUser(user);
      } else {
        setUser(null);
      }
    });
    (async () => {
      const storageUser = AsyncStorage.getItem('Auth_user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    })();
    setLoading(false);
  }, []);

  const updateProfileFunc = async () => {
    await updateProfile(auth.currentUser, {})
      .then(() => {
        console.log('yes, profile is update');
      })
      .catch((error) => {
        setErrorLoginMessage(error.message);
      });
  };

  const register = async (email, password, name) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        set(ref(database, 'users/' + uid), {
          name,
          email,
        })
          .then(() => {
            setUser(value.user);
            storageUser(value.user);
          })
          .catch((error) => {
            setErrorRegisterMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorRegisterMessage(error.message);
      });
    setLoading(false);
  };

  const login = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        setUser(value.user);
        storageUser(value.user);
      })
      .catch((error) => {
        setErrorLoginMessage(error.message);
      });
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
        storageUser(null);
      })
      .catch((error) => {
        setErrorLogoutMessage(error.message);
      });
    setLoading(false);
  };

  const storageUser = async (data) => {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
