import React, { useMemo, useState, useCallback } from 'react';
import { Global } from '@emotion/react'
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthLayout from './auth/AuthLayout';
import PagesWrapper from './PagesWrapper/PagesWrapper';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import News from './pages/News';
import Addresses from './pages/Addresses';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const ApplicationContainer = styled("div")({
  height: "100vh",
  width: "100%"
})
const { PUBLIC_URL } = process.env
const queryClient = new QueryClient()
const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>("light")
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    }
  }), [mode])
  const switchMode = useCallback(() => setMode(prev => prev === "light" ? "dark" : "light"), [])
  return <>
    <BrowserRouter basename={PUBLIC_URL}>
      <QueryClientProvider client={queryClient}>
        <Global styles={{
          "html, body": {
            boxSizing: 'border-box',
            fontFamily: "roboto",
            margin: 0
          },
          "*, *:before, *:after": {
            boxSizing: "inherit",
          },
          "*::-webkit-scrollbar": {
            width: "4px",
            height: "4px",
            backgroundColor: "transparent",
            borderRadius: "0.5rem",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "4rem"
          },
          "*::-webkit-scrollbar-corner": {
            backgroundColor: "transparent"
          },
          "@keyframes animate": {
            "0%": {
              transform: "rotate(0deg)"
            },
            "100%": {
              transform: "rotate(360deg)"
            }
          }
        }} />
        <ThemeProvider theme={theme}>
          <ApplicationContainer>
            <AuthLayout>
              <Route element={<PagesWrapper switchMode={switchMode} />}>
                <Route path="news" element={<News />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="*" element={<Navigate to="/news" />} />
              </Route>
            </AuthLayout>
          </ApplicationContainer>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
}

export default App;
