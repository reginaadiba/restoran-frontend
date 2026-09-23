<template>
  <header class="site-header">
    <nav class="navbar navbar-expand-lg site-navbar">
      <div class="container-fluid site-navbar__inner">
        <RouterLink class="navbar-brand site-brand" to="/">
          <span class="site-brand__mark">R</span>
          <span>Restoran</span>
        </RouterLink>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navigation"
          aria-controls="main-navigation" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="main-navigation" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 site-navigation">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li v-if="role == 4 || role == 1" class="nav-item">
              <RouterLink class="nav-link" to="/order">Order</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/order-list">Order List</RouterLink>
            </li>
            <li v-if="role == 4" class="nav-item">
              <RouterLink class="nav-link" to="/order-report">Order Report</RouterLink>
            </li>
            <li v-if="role == 4" class="nav-item">
              <RouterLink class="nav-link" to="/product">Products</RouterLink>
            </li>
            <li class="nav-item">
              <button class="nav-link nav-link--logout" type="button" @click="logout">Logout</button>
            </li>
          </ul>
          <span class="user-greeting">Hi, {{ name }}</span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from 'axios';
import router from '@/router';

export default {
  data() {
    return {
      name: localStorage.getItem('name') || '',
      role: localStorage.getItem('role_id') || '',
    }
  },
  methods: {
    logout() {
      axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      })
        .then(function (response) {
          console.log(response);
          localStorage.removeItem('email')
          localStorage.removeItem('name')
          localStorage.removeItem('role_id')
          localStorage.removeItem('token')
          router.push({ name: 'login' })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 18px rgba(41, 93, 145, 0.12);
}

.site-navbar {
  min-height: 76px;
  background: #dff1ff;
  border-bottom: 1px solid #c4e5fb;
}

.site-navbar__inner {
  max-width: 1440px;
  padding: 0.7rem 1rem;
}

.site-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: #124c78;
  font-size: 1.15rem;
  font-weight: 700;
}

.site-brand:hover {
  color: #0a3556;
}

.site-brand__mark {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 10px;
  color: #fff;
  background: #2f86c8;
  font-weight: 800;
}

.site-navigation {
  gap: 0.25rem;
  margin-left: 1.5rem;
}

.site-navigation .nav-link {
  border-radius: 8px;
  color: #245574;
  padding: 0.55rem 0.8rem;
  font-weight: 600;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.site-navigation .nav-link:hover,
.site-navigation .nav-link.router-link-active {
  color: #0d4169;
  background: #b9e1fb;
}

.nav-link--logout {
  border: 0;
  background: transparent;
  font: inherit;
  cursor: pointer;
}

.user-greeting {
  padding: 0.5rem 0;
  color: #245574;
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 991.98px) {
  .site-navigation {
    margin: 0.75rem 0 0;
  }

  .user-greeting {
    display: block;
    padding-bottom: 0.25rem;
  }
}
</style>
