<template>
  <div>
    <child />
  </div>
</template>

<script>
import Child from './Child';

export default {
  components: { Child },
  async mounted() {
    const response = await fetch(
      'https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=NULL&order=name&keys=name,code',
      {
        headers: {
          'X-Parse-Application-Id': '8jzJSkRodmiNCleHBImkpD4g4XyEm1yPcDbfQi0N', // This is your app's application id
          'X-Parse-REST-API-Key': 'BdIz64CLtlkcE0MJ81Hnk41agBiIuEZfL07w3JCm', // This is your app's REST API key
        },
      }
    );
    const data = await response.json(); // Here you have the data that you need
    console.log(data);
  },
  methods: {
    test() {
      console.log(1);
    },
  },
};
</script>
