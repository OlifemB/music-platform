import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from "next/link";

const pages = [{
    title: 'Tracks',
    link: '/tracks'
}, {
    title: 'Albums',
    link: '/albums'
}]


interface MenuItemProps {
    title: string,
    link: string
}

interface MenuProps {
    item: MenuItemProps[]
}


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href={'/'} style={{display: 'flex', flexDirection: 'row'}} className={'link'}>
                        <Typography variant="h6" noWrap>
                            Music App
                        </Typography>
                    </Link>

                    <Box sx={{flexGrow: 1, display: 'flex', pl: '20px'}}>
                        {pages.map(({title, link}) =>
                            <Link href={link} key={title}>
                                <Button className={'link'} onClick={handleCloseNavMenu}>
                                    {title}
                                </Button>
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
