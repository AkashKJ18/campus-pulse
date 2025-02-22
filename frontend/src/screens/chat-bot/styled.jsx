import { Box, styled } from "@mui/material";

export const ChatBox = styled(Box)`
    height: 82vh;
    display: flex;
    flex-direction: column;
    .MuiPaper-root {
        padding: 16px;
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 8px;
        max-height: 63vh;
        overflow-y: auto;
    }
`;

export const TypingOverlay = styled(Box)`
    position: absolute;
    bottom: 18vh;
    left: 44%;
    background-color: rgba(0,0,0,0.6);
    color: #FFFFFF;
    padding: 8px;
    border-radius: 8px;
`;