'use client'

import '../../globals.css'
import React from 'react';
import { Button, Link, makeStyles } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FloatingButton = ({path, text}: {path: string, text: string}) => {
  return (
    <Button
      sx={{
        position: 'fixed',
        top: 36,
        left: 36,
        zIndex: 1
      }}
      startIcon={<ArrowBackIcon />}
    >
      <Link href={path ?? "/"} variant="body2">
        {text ?? "Voltar"}
      </Link>
    </Button>
  );
};

export default FloatingButton;
