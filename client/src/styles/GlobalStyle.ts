import colors from '@/constants/colors'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @media print {
    .hp {
      display: none !important;
    }
  }
  
  .data-table {
    height: 100%;
    overflow-y: auto;
  }
  
  * {
    font-family: Satoshi-Light, sans-serif;
  }
  
  #side-drawer-root {
    height: 100%;
    background: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 30%;
    z-index: 9999999999;
    box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
    &.open {
      transform: translateX(0);
    }
  }
  * {
    /* font-family: 'Satoshi-Regular';
    font-size: 16px;
    text-decoration: none; */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.tooltip-z-index{
  z-index: 999999999999999!important;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
    font-size: calc(100vw / 1920 * 20); 
  @media (max-height: 750px) {
    font-size: calc(100vw / 750 * 10);
  } 
}

body {
  margin: 0;
}

main {
  display: block;
}

h1 {
  font-size: 2em;
  margin: 0;
}


hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}


pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

a {
  background-color: transparent;
}

abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}


small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

img {
  border-style: none;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;

}


button,
input {
  overflow: visible;
  border: none;
}

button,
select {
  text-transform: none;
}


button,
[type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type=button]::-moz-focus-inner,
[type=reset]::-moz-focus-inner,
[type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type=button]:-moz-focusring,
[type=reset]:-moz-focusring,
[type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}


fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}

progress {
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type=checkbox],
[type=radio] {
  box-sizing: border-box;
  padding: 0;
}

[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

[type=search] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

details {
  display: block;
}

summary {
  display: list-item;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px transparent inset !important;
}

input:-webkit-autofill {
  -webkit-background-clip: text;
}

ul{
  list-style: none;
}

::-webkit-scrollbar {
  width: 4px !important;
  height: 4px !important;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  -webkit-box-shadow: inset 0 0 6px ${colors.primary.light} !important;
}
`

export default GlobalStyle
