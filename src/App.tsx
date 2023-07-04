import React, { useMemo, useState, useCallback } from 'react';
import { Global } from '@emotion/react'
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthLayout from './auth/AuthLayout';
import PagesWrapper from './PagesWrapper/PagesWrapper';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import News from './PagesWrapper/News';

const ApplicationContainer = styled("div")({
  height: "100vh",
  width: "100%"
})
const { PUBLIC_URL } = process.env

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
      <Global styles={{
        "html, body": {
          boxSizing: 'border-box',
          fontFamily: "roboto",
          margin: 0
        },
        "*, *:before, *:after": {
          boxSizing: "inherit"
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
              <Route path="*" element={<Navigate to="/news" />} />
            </Route>
          </AuthLayout>
        </ApplicationContainer>
      </ThemeProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
}

export default App;
