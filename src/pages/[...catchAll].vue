<template>
  <div class="container">
    <div>
      <h1>404</h1>
      <h2>UH OH! You're lost.</h2>
      <p>
        The page you are looking for does not exist. How you got here is a mystery. But you can
        click the button below to go back to the homepage.
      </p>
      <router-link to="/">
        <button class="btn green">HOME</button>
      </router-link>
    </div>
  </div>
</template>

<style>
:root {
  --blue: #0e0620;
  --white: #fff;
  --green: #2ccf6d;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blue);
  font-size: 1em;
}

/* .row {
  display: flex;
} */

ul {
  list-style-type: none;
  -webkit-padding-start: 35px;
  padding-inline-start: 35px;
}

h1 {
  font-size: 7.5em;
  margin: 15px 0px;
  font-weight: bold;
}

h2 {
  font-weight: bold;
}

.btn {
  z-index: 1;
  overflow: hidden;
  background: transparent;
  position: relative;
  padding: 8px 50px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  letter-spacing: 2px;
  transition: 0.2s ease;
  font-weight: bold;
  margin: 5px 0px;
}
.btn.green {
  border: 4px solid var(--green);
  color: var(--blue);
}
.btn.green:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0%;
  height: 100%;
  background: var(--green);
  z-index: -1;
  transition: 0.2s ease;
}
.btn.green:hover {
  color: var(--white);
  background: var(--green);
  transition: 0.2s ease;
}
.btn.green:hover:before {
  width: 100%;
}

@media screen and (max-width: 768px) {
  body {
    display: block;
  }
}
</style>
