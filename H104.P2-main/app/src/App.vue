<template>
<div>
 <h3>Current Data Values: {{measurements.length}}</h3>
 <ul id="example-1">
   <div v-for="measurement in measurements" :key="measurement" class="data">
    <p>Temperature: {{ measurement.temp }}</p>
    <p>Humidity: {{ measurement.humidity}}</p>
    <p>Water Level: {{ measurement.waterLevel}}</p>
    <p>Date: {{ measurement.timestamp}}</p>
  </div>
</ul>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',
  data(){
    return {
      time: undefined, 
      measurements: []
    }
  },
  methods:{
    getMeasurements: async function(){
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      var data = await axios.get('http://api.thedamagecontrol.com/measurements',config);
      this.measurements = data.data.reverse();
    }
  },
  mounted() {
    this.getMeasurements();
    this.time = setInterval(this.getMeasurements, 10000);
  },
}
</script>

<style scoped>
 .data {
   margin: 2%;
   border: 1px solid black;
 }
</style>
