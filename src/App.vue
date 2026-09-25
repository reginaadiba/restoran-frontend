<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

export default {
  components: { RouterView, NavBar },
}
</script>

<template>
  <div class="app-shell">
    <NavBar v-if="$route.name !== 'login'" />
    <main class="page-content" :class="{ 'page-content--login': $route.name === 'login' }">
      <RouterView />
    </main>

    <footer v-if="$route.name !== 'login'" class="app-footer">
      <div class="app-footer__inner">
        <div class="app-footer__brand">
          <span class="app-footer__logo">eR</span>
          <div>
            <h3>eNae Resto</h3>
            <p>Rasa hangat untuk setiap momen.</p>
          </div>
        </div>

        <div class="app-footer__section">
          <!-- <h4>Menu</h4>
          <ul>
            <li>Beranda</li>
            <li>Pesanan</li>
            <li>Reservasi</li>
          </ul> -->
        </div>

        <div class="app-footer__section">
          <h4>Kontak</h4>
          <ul>
            <li>Jl. Melati No. 25</li>
            <li>+62 812-3456-7890</li>
            <li>09:00 - 21:00</li>
          </ul>
        </div>
      </div>

      <div class="app-footer__bottom">
        <span>© 2026 eNae Resto</span>
        <span>Made by Regina Adiba</span>
      </div>
    </footer>
  </div>
</template>

<style>
html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  background: #f4f9ff;
  overflow-x: hidden;
  overflow-y: auto;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  min-height: 0;
  padding: 2rem 1rem 3rem;
}

.page-content--login {
  padding: 0;
}

.app-footer {
  background: linear-gradient(135deg, #0f172a, #1e3a5f);
  color: #e2e8f0;
  padding: 1.25rem 1.25rem 0.75rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.app-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.app-footer__brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.app-footer__logo {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #f8fafc;
  font-weight: 700;
  font-size: 1.1rem;
}

.app-footer__brand h3,
.app-footer__section h4 {
  margin: 0 0 0.35rem;
  color: #f8fafc;
}

.app-footer__brand p,
.app-footer__section li {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.9rem;
}

.app-footer__section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.4rem;
}

.app-footer__bottom {
  max-width: 1200px;
  margin: 1rem auto 0;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: center;
  color: #cbd5e1;
  font-size: 0.8rem;
}

@media (min-width: 768px) {
  .page-content {
    padding: 2.5rem 2rem 4rem;
  }

  .app-footer {
    padding: 1.5rem 2rem 0.9rem;
  }

  .app-footer__inner {
    grid-template-columns: 1.5fr 1fr 1fr;
    align-items: start;
  }

  .app-footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>
