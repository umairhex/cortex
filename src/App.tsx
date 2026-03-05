import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useRef } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
import Layout from "./components/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { useTheme } from "./components/use-theme";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CollectionsProvider } from "./contexts/CollectionsContext.tsx";
import { LenisProvider } from "./contexts/LenisContext";
import ApiIntegration from "./pages/ApiIntegration.tsx";
import CollectionTypesBuilder from "./pages/CollectionTypesBuilder.tsx";
import CollectionWrapper from "./pages/CollectionWrapper.tsx";
import ContentCreate from "./pages/ContentCreate.tsx";
import ContentManager from "./pages/ContentManager.tsx";
import CreateCollection from "./pages/CreateCollection.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Docs from "./pages/Docs";
import ErrorBoundary from "./components/ErrorBoundary";
import MediaLibrary from "./pages/MediaLibrary.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Landing from "./pages/Landing.tsx";

const queryClient = new QueryClient();

function AppContent() {
  const loadingBarRef = useRef<LoadingBarRef | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    loadingBarRef.current?.continuousStart?.();

    const timer = setTimeout(() => {
      loadingBarRef.current?.complete?.();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const loadingBarColor = theme === "dark" ? "#64b5f6" : "#64b5f6";

  return (
    <>
      <LoadingBar
        ref={loadingBarRef}
        color={loadingBarColor}
        height={3}
        shadow={true}
        loaderSpeed={500}
        waitingTime={200}
        transitionTime={300}
      />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/docs" element={<Docs />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/content-manager"
              element={
                <ProtectedRoute>
                  <ContentManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/content-manager/:collectionId/create"
              element={
                <ProtectedRoute>
                  <ContentCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/media-library"
              element={
                <ProtectedRoute>
                  <MediaLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/collection-types-builder"
              element={
                <ProtectedRoute>
                  <CollectionTypesBuilder />
                </ProtectedRoute>
              }
            >
              <Route index element={<CreateCollection />} />
              <Route path=":id" element={<CollectionWrapper />} />
            </Route>
            <Route
              path="/api-integration"
              element={
                <ProtectedRoute>
                  <ApiIntegration />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
          <CollectionsProvider>
            <LenisProvider>
              <Router>
                <AppContent />
              </Router>
            </LenisProvider>
          </CollectionsProvider>
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
