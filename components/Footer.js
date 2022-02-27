export default function Footer() {
  return (
    <footer className="footer has-background-info-light mt-4">
      <div className="content has-text-centered" style={{margin: '80px auto'}}>
        <p>
          <strong>foocaptcha</strong> by <a href="https://github.com/marcelhaerle" target="_blank">Marcel</a>.
          The source code is licensed <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
        </p>
        <p>
          <a href="https://bulma.io" target="_blank">
            <img
              src="https://bulma.io/images/made-with-bulma.png"
              alt="Made with Bulma"
              width="128"
              height="24"/>
          </a>
        </p>
      </div>
    </footer>
  )
}