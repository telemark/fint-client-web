exports.Header = ({ username = 'Not logged in' }) => (
  <header>
    <div className='nav-left'>
      <img src='/static/header-logo.png' />
    </div>
    <div className='nav-right'>
      { username }
    </div>
    <style jsx>
      {`
      header {
        grid-area: header;
        background: #d1202e;
        color: white;
        margin-bottom: 15px;
      }
      .nav-left {
        margin-left: 5px;
        float: left;
      }
      .nav-right {
        margin-right: 5px;
        float: right;
      }
    `}
    </style>
  </header>
)
