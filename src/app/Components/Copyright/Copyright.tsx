import { Link, Typography } from "@mui/material";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        Eventy©{' '}
        <Link color="inherit" href="https://github.com/matheussanton" target="_blank">
          Matheus Santon{' '}
          <OpenInNewIcon sx={{fontSize: 14}}/>
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
