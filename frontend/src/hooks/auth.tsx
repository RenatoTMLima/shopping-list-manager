// import React, { createContext, useCallback, useState, useContext } from 'react';
// // import da api do backend

// interface AuthContextData {
  // // interface de acordo com os estados e métodos que deseja exportar
// }

// const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// export const AuthProvider: React.FC = ({ children }) => {
//   const [data, setData] = useState<AuthState>(() => {
//     const token = localStorage.getItem('chave localstorage');
//     const user = localStorage.getItem('chave localstorage');

//     if (token && user) {
//       api.defaults.headers.authorization = `Bearer ${token}`;

//       return {
//         token,
//         user: JSON.parse(user),
//       };
//     }

//     return {} as AuthState;
//   });

//   const signIn = useCallback(async ({ email, password }) => {
//     const response = await api.post('sessions', {
//       email,
//       password,
//     });

//     const { user, token } = response.data;

//     localStorage.setItem('chave localstorage', token);
//     localStorage.setItem('chave localstorage', JSON.stringify(user));

//     api.defaults.headers.authorization = `Bearer ${token}`;

//     setData({ token, user });
//   }, []);

//   const signOut = useCallback(() => {
//     localStorage.removeItem('chave localstorage');
//     localStorage.removeItem('chave localstorage');

//     setData({} as AuthState);
//   }, []);

//   const updateUser = useCallback(
//     (user: User) => {
//       localStorage.setItem('chave localstorage', JSON.stringify(user));

//       setData({
//         token: data.token,
//         user,
//       });
//     },
//     [data.token],
//   );

//   return (
//     <AuthContext.Provider
//       value={{ user: data.user, signIn, signOut, updateUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth(): AuthContextData {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// }
