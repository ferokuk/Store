<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/book">Book of complaints and suggestions</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Montserrat;
  text-align: center;
  font-size:1.2rem;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #9999FF;
}
*{
  font-family: Montserrat;
}
input{
  background-color:#CCCCFF;
  font-family: Montserrat;
  font-weight: 600;
}
input::placeholder{
  color: gray;
  font-family: Montserrat;
}
</style>
