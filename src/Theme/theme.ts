import { createTheme } from "@mui/material";
 
const primary = "#000000"
const secondary = "#f8ccc3"
const theme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: secondary
        },
        background:{
            paper: "#fafafa"
        }
    },
});

export default theme;