import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <div>
    <head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous"
      />
    </head>
    <App />
  </div>,
  document.getElementById('root')
)
