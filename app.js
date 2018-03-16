var vm = new Vue({
  el:'#app',
  data: {
    tokens: [0, 1, 2, 3],
    showNewPost: false,
    token: null,
    currentUser: null,
    currentFriend: null,
    users: [],
    posts: [],
    newPost: {title: ''}
  },
  methods: {
    loadAllUsers() {
      this.$http.get(`http://localhost:3001/users`)
      .then(response=>{this.users = response.body;})
    },
    me: function() {
      this.$http.get(`http://localhost:3001/users/me?token=${this.token}`)
      .then(response=>{this.currentUser = response.body;})
    },
    setToken: function(token) {
        this.token = token;
        this.me();
    },
    createPost: function() {
        this.$http.post(`http://localhost:3001/posts?token=${this.token}`, this.newPost)
        .then(response=>{
          this.me();
          this.newPost.title = "";
          this.showNewPost = !this.showNewPost;
        });
    },
    deletePost: function(id) {
        this.$http.delete(`http://localhost:3001/posts/${id}?token=${this.token}`)
        .then(response=>{
          this.me();
        });
    },
    relationship: function (id) {
      if (this.currentUser.friends.includes(id)) return 'friends';
      if (this.currentUser.pending.includes(id)) return 'pending';
      if (this.currentUser.requests.includes(id)) return 'requests';
      return null;
    },
    sendFriendRequest: function(id) {
      this.$http.post(`http://localhost:3001/friends/${id}?token=${this.token}`, {})
      .then(this.me);
    },
    acceptFriendRequest: function(id) {
      this.$http.put(`http://localhost:3001/friends/accept/${id}?token=${this.token}`, {})
      .then(this.me);
    },
    declineFriendRequest: function(id) {
      this.$http.put(`http://localhost:3001/friends/decline/${id}?token=${this.token}`, {})
      .then(this.me);
    },
    showFriendPosts: function(id) {
      this.$http.get(`http://localhost:3001/users/${id}/posts?token=${this.token}`)
      .then(function(response) {
          this.currentFriend = {
            posts: response.body
          }
      })
    }
  },
  created: function() {
    if (localStorage.getItem('token')) {
      this.token = parseInt(localStorage.getItem('token'));
      this.me();
      this.loadAllUsers();
    }
  },
  watch: {
    'token': function(newValue, oldValue) {
      if (newValue !== null) {
        localStorage.setItem('token', parseInt(newValue));
      }
    }
  }
})
