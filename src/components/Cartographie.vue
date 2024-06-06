<template>
  <div>
    <h1>Cartographie</h1>
    <ComposantMap :lat="49.871144" :lng="2.2641492"/>
  </div>
</template>

<script>
import ComposantMap from './ComposantMap';

export default {
  components: { ComposantMap },
};
</script>
