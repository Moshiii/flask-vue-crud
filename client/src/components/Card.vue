<template>
<div>
  <b-card
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <code>
      import pandas as pd
      pd.DataFrame({column1:[],column2:[]})
      this is some code to test
    </code>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'Card',
};
</script>
