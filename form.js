Vue.component('custom-form', {
  props:['post', 'fn'],
  template: `
  <div class="form-group">
    <label for="exampleInputEmail1">Title</label>
    <input v-model='post.title' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your title">
    <small id="emailHelp" class="form-text text-muted">Add your title.</small>
    <button type="button" @click='fn()' class="btn btn-primary">Submit</button>
  </div>
  `
})
