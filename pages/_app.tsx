import { useEffect, useState } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function getActiveTheme(themeMode: 'light' | 'dark') {
  return themeMode === 'light' ? lightTheme : darkTheme;
}

const PREFERENCE_COOKIE_NAME = 'theme-preference'

function MyApp({ Component, pageProps }: AppProps) {
  const userSystemThemePreferenceDark = useMediaQuery('(prefers-color-scheme: dark)');
  
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

  const defaultInitialTheme = userSystemThemePreferenceDark ? 'dark' : 'light';
  const preferredTheme = cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME] ? cookieTheme[PREFERENCE_COOKIE_NAME] : defaultInitialTheme;

  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(preferredTheme);

  const toggleTheme: React.MouseEventHandler<HTMLAnchorElement> = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
    setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme);
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);
  
  return (
    <ThemeProvider theme={activeTheme}>
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>
  )
}

export default MyApp
