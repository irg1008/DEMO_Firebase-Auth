// App component.
import App from "./App";
export default App;

// => TODO & FIXME LIST
// TODO: Ver si pasamos los mensajes con las rutas de log y sign y si lo hacemos cambiando las rutas en plan sign => sign/email
// TODO: Añadir el forgot password y el change username.
// TODO: Revisar si algún componente se puede convertir a functional y limpiar tipos..
// TODO: Hide navbar on certain routes. (Importance level 0)
// FIXME: Google sign overrides normal sign and the password is forgotten. Save password or something?? => Solution: fetchSignInMethodsForEmail
// TODO: Personalize verify and email log and sign emails and check how to redirect to page directly (Importance level 0)
// TODO: Add animations like navbar up on phone or floating message out. (Importance level 0)
// TODO: Finish log in with email link. And send sign or log in email checking if user already exist value in user.
// TODO: Remove all overlays and show every time hidden. i.e loading gif
// TODO: Change all context to useContext => Remove consumer and import context and get al values with useContext. This gets rides of almost all props and high order component. Also use useMemo to export the provider value.
