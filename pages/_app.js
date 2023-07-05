import { AuthProvider } from "@/lib/auth";
import { AlertProvider } from "@/lib/alert";
import "@/styles/globals.css";
import Alert from "@/components/Alert";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AlertProvider>
        <Component {...pageProps} />
        <Alert />
      </AlertProvider>
    </AuthProvider>
  );
}

export default MyApp;
