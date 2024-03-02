import { doc, setDoc } from "firebase/firestore/lite";
import {
  FirebaseDB,
  logOutFirebase,
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../firebase";
import { checkingCredential, logout, login } from "./authSlice";
import { clearNotesLogout, noteUpdated, setSaving } from "../journal";

export const checkingAuthentication = () => {
  return async (dispacth) => {
    dispacth(checkingCredential());
  };
};
export const startGoogleSingIn = () => {
  return async (dispacth) => {
    dispacth(checkingCredential());
    const result = await singInWithGoogle();
    if (!result.ok) return dispacth(logout(result.errorMessage));

    dispacth(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispacth) => {
    dispacth(checkingCredential());
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });
    if (!ok) return dispacth(logout({ errorMessage }));

    dispacth(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispacth) => {
    dispacth(checkingCredential());
    const respuesta = await loginWithEmailPassword({
      email,
      password,
    });
    console.log(respuesta);

    if (!respuesta.ok) return dispacth(logout(respuesta));
    dispacth(login(respuesta));
  };
};

export const startLogout = () => {
  return async (dispacth) => {
    await logOutFirebase();
    dispacth(clearNotesLogout());
    dispacth(logout({ errorMessage: null }));
  };
};

export const startSaveNote = () => {
  return async (dispacth, getState) => {
    dispacth(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    //esto sirve para borrar una propiedad en JavaScript
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispacth(noteUpdated(note));
  };
};
