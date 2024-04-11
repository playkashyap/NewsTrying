"use client";
import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './components/AppAppBar';
import CircularProgress from '@mui/material/CircularProgress';
import Highlights from './components/Highlights';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import getLPTheme from './theme';
import apiService from './Shared/service';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
interface ToggleCustomThemeProps {
    showCustomTheme: Boolean;
    toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
    showCustomTheme,
    toggleCustomTheme,
}: ToggleCustomThemeProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                    Custom theme
                </ToggleButton>
                <ToggleButton value={false}>Material Design 2</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [dtaReceived, setDtaReceived] = React.useState(false);

    const [gotData, setGotData] = React.useState([]);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };


    React.useEffect(() => {
        setDtaReceived(false);
        apiService('news', 'POST').subscribe(
            (res: any) => {
                setGotData(res.response.news);
                setDtaReceived(true);
            }
        );
    }, []);


    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ bgcolor: 'background.default' }}>

                {dtaReceived ?
                    <>
                        {gotData.map((data: any, index: number) => { return (<Features key={index} data={data} />); })}
                    </> :
                    <Container id="features" sx={{ pt: { xs: 8, sm: 16 } }}>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Stack>
                    </Container>
                }

                {/* <Divider />
                <Testimonials />
                <Divider />
                <Highlights />
                <Divider />
                <Divider />
                <FAQ /> */}
                <Divider />
                <Footer />
            </Box>
        </ThemeProvider>
    );
}