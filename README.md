# Genie+Vue3+Plotly+Babylon playground / Quasar side

This repo is a playground of mixing Vue3 / Babylon as packaged by `Quasar`, along with Julia `Genie.jl` REST API end points delivering `PlotlyJS` plots.

This is to be used with the partner repo `Genie_Vue3_Plotly_Babylon_playground__Genie_side`


### Start the app in development mode (hot-code reloading, error reporting, etc.)

Install Quasar if not yet done (as `sudo` if necessary):

```bash
npm -g install @quasar/cli
```

## Install the dependencies
```bash
yarn install
```


## Run the development server

From a terminal tabe, run

```bash
quasar dev
```

The site will be served on the port specified in `./quasar.conf.js` line c.87, which is currently 9001.


### Build the app for production
```bash
quasar build
```


### Customize the configuration

See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).


# Sources

Vue3 Plotly component: https://github.com/inys/covid-dashboard-js
