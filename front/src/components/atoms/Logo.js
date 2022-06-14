import { experimentalStyled } from '@mui/material'

const LogoRoot = experimentalStyled('svg')``

const Logo = props => (
  <LogoRoot height="52" version="1.1" viewBox="0 0 52 52" width="52" {...props}>
    <title>MKP</title>
    <defs>
      <filter id="filter">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0 0 0 0 0.262745 0 0 0 0 0.329412 0 0 0 0 0.866667 0 0 0 1.000000 0"
        />
      </filter>
    </defs>
    <g fill="none" stroke="none">
      <g filter="url(#filter)">
        <g>
          <rect height="52" width="52" x="0" y="4.26325641e-14" />
          <path
            d="M23.2968,26.3643 L11.87,19.9731 C11.606,19.8255 11.3864,19.6106 11.2335,19.3506 C11.0806,19.0905 11,18.7947 11,18.4934 C11,18.1921 11.0806,17.8963 11.2335,17.6362 C11.3864,17.3762 11.606,17.1613 11.87,17.0137 L23.2967,10.6222 C24.026,10.2143 24.8484,10 25.6849,10 C26.5215,10 27.3439,10.2143 28.0731,10.6222 L39.4999,17.0137 C39.7638,17.1613 39.9835,17.3762 40.1364,17.6362 C40.2893,17.8963 40.3699,18.1921 40.3699,18.4934 C40.3699,18.7947 40.2893,19.0905 40.1364,19.3506 C39.9835,19.6106 39.7638,19.8255 39.4999,19.9731 L28.0731,26.3643 C27.3439,26.7722 26.5215,26.9864 25.6849,26.9864 C24.8484,26.9864 24.026,26.7722 23.2968,26.3643 Z"
            fill="#2196F3"
            fillRule="nonzero"
            transform="translate(25.684950, 18.493200) rotate(180.000000) translate(-25.684950, -18.493200) "
          />
          <path
            d="M23.2349,37.8879 L6.87,28.7347 C6.6061,28.5871 6.3864,28.3722 6.2335,28.1122 C6.0806,27.8521 6,27.5563 6,27.255 C6,26.9537 6.0806,26.6578 6.2335,26.3978 C6.3864,26.1377 6.6061,25.9229 6.87,25.7752 L23.2349,16.6221 C23.9641,16.2143 24.7865,16 25.623,16 C26.4595,16 27.2819,16.2143 28.0111,16.6221 L44.376,25.7752 C44.6399,25.9229 44.8596,26.1377 45.0125,26.3978 C45.1654,26.6578 45.246,26.9537 45.246,27.255 C45.246,27.5563 45.1654,27.8521 45.0125,28.1122 C44.8596,28.3722 44.6399,28.5871 44.376,28.7347 L28.0111,37.8879 C27.2819,38.2957 26.4595,38.5099 25.623,38.5099 C24.7865,38.5099 23.9641,38.2957 23.2349,37.8879 Z"
            fill="#2196F3"
            fillRule="nonzero"
            opacity="0.7"
            transform="translate(25.623000, 27.254950) rotate(180.000000) translate(-25.623000, -27.254950) "
          />
          <path
            d="M23.6157447,51.02171 L0.86859567,38.2985735 C0.605087772,38.1511153 0.385747448,37.9366669 0.233097764,37.6769927 C0.0804480806,37.4174184 0,37.1220028 0,36.8211961 C0,36.5203894 0.0804480806,36.2250736 0.233097764,35.9653994 C0.385747448,35.7058251 0.605087772,35.4912769 0.86859567,35.3439185 L23.6158446,22.6210616 C24.3438508,22.2138793 25.1649044,22 26.0000349,22 C26.8351655,22 27.6562191,22.2138793 28.3842253,22.6210616 L51.1314243,35.3439185 C51.3948923,35.4912769 51.6142326,35.7058251 51.7668823,35.9653994 C51.919532,36.2250736 52,36.5203894 52,36.8211961 C52,37.1220028 51.919532,37.4174184 51.7668823,37.6769927 C51.6142326,37.9366669 51.3948923,38.1511153 51.1314243,38.2985735 L28.3842253,51.02171 C27.6562191,51.4288424 26.8351655,51.6427915 26.0000349,51.6427915 C25.1649044,51.6427915 24.3438508,51.4288424 23.6157447,51.02171 Z"
            fill="#2196F3"
            fillRule="nonzero"
            opacity="0.4"
            transform="translate(26.000000, 36.821396) rotate(180.000000) translate(-26.000000, -36.821396) "
          />
        </g>
      </g>
    </g>
  </LogoRoot>
)

export default Logo
