class HeroComponent extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class="hero">
        <div class="hero-overlay">
          <div class="hero-inner">
          <h1 class="hero-title">Puaskan rasa laparmu di Jakarta</h1>
          <p class="hero-tag">Anda berada di surga makanan dan minuman</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-component', HeroComponent);
