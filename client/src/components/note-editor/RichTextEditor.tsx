import React from 'react'
import SunEditor from 'suneditor-react'
import SetOptions from 'suneditor-react/dist/types/SetOptions'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import '../../styles/vendors/sun-editor.css'
import mergeTag from './custom-plugin'
// const options = {

//   showPathLabel: false,
//   defaultStyle: 'text-align:left',
//   buttonList: [
//     ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
//     ['paragraphStyle', 'blockquote'],
//     ['fontColor', 'hiliteColor', 'textStyle'],
//     ['removeFormat'],
//     ['font', 'fontSize', 'formatBlock'],
//     ['list'],
//     ['undo', 'redo']
//   ],

//
//   minHeight: 100,
//   attributesWhitelist: [
//     {
//       all: 'style', // Apply to all tags
//       span: ''
//     }
//   ]
// }

const options: SetOptions = {
  mode: 'classic',
  rtl: false,
  katex: 'window.katex',
  imageGalleryUrl: 'https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo',
  videoFileInput: false,
  tabDisable: false,
  font: ['Arial', 'Comic Sans MS', 'Courier New', 'Impact', 'Georgia', 'tahoma', 'Trebuchet MS', 'Verdana'],
  fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
  buttonList: [
    [
      'undo',
      'redo',
      'font',
      'fontSize',
      'formatBlock',
      'paragraphStyle',
      'blockquote',
      'bold',
      'underline',
      'italic',
      'strike',
      'subscript',
      'superscript',
      'fontColor',
      'hiliteColor',
      'textStyle',
      'removeFormat',
      'outdent',
      'indent',
      'align',
      'horizontalRule',
      'list',
      'lineHeight',
      'table',
      'link',
      'image',
      'video',
      'audio',
      'math',
      'imageGallery',
      'fullScreen',
      'showBlocks',
      'codeView',
      'preview',
      'print',
      'save',
      'template'
    ]
  ],
  colorList: [
    'rgb(0,0,0)',
    'rgb(97,189,109)',
    'rgb(26,188,156)',
    'rgb(84,172,210)',
    'rgb(44,130,201)',
    'rgb(147,101,184)',
    'rgb(71,85,119)',
    'rgb(204,204,204)',
    'rgb(65,168,95)',
    'rgb(0,168,133)',
    'rgb(61,142,185)',
    'rgb(41,105,176)',
    'rgb(85,57,130)',
    'rgb(40,50,78)',
    'rgb(247,218,100)',
    'rgb(251,160,38)',
    'rgb(235,107,86)',
    'rgb(226,80,65)',
    'rgb(163,143,132)',
    'rgb(239,239,239)',
    'rgb(255,255,255)',
    'rgb(250,197,28)',
    'rgb(243,121,52)',
    'rgb(209,72,65)',
    'rgb(184,49,47)',
    'rgb(124,112,107)',
    'rgb(209,213,216)',
    'rgb(255, 255, 255, 0)'
  ],
  height: '100%'
}

const withoutToolbarOptions: SetOptions = {
  mode: 'balloon',
  rtl: false,
  katex: 'window.katex',
  imageGalleryUrl: 'https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo',
  videoFileInput: false,
  tabDisable: false,
  buttonList: [],
  height: '100%'
}

function setContent(value) {
  let html = ''
  if (isEmpty(value)) {
    html = getStyledHtml('&nbsp;')
  } else {
    html = value
  }
  return html
}
function getStyledHtml(value) {
  return `<p><span style="font-family: 'Comic Sans MS';font-size:18px">${value}</span></p>`
}
function isEmpty(value) {
  return value.trim()?.length === 0 || value === '<p></p>' || value === '<p><br></p>'
}
const RichTextEditor = ({ config, value, onChange, appendContent, showToolbar = true }) => {
  // @ts-ignore
  return (
    <SunEditor
      onChange={onChange}
      setContents={setContent(value)}
      setOptions={showToolbar ? options : withoutToolbarOptions}
      appendContents={appendContent}
    />
  )
}
export default RichTextEditor
