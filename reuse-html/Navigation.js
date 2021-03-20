import { createTemplate } from './createTemplate.js'

const template = createTemplate(`
  <template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Homepage</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/index.html">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/links.html">Links</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
`)

export class Navigation extends HTMLElement {
  constructor() {
    super()
    const templateContent = template.content
    const node = templateContent.cloneNode(true)
    this.highlightActiveLinks(node)
    this.appendChild(node)
  }

  highlightActiveLinks(node) {
    const links = Array.from(node.querySelectorAll('.nav-link'))
    for (const link of links) {
      if (link.getAttribute('href') === location.pathname) {
        link.classList.add('active')
      }
    }
  }
}
