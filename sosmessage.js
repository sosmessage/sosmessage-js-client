var sosmessage = {};

sosmessage.SosMessageClient = function(serverUrl) {
  if (!/\/$/.test(serverUrl)) {
    serverUrl += '/'
  }

  function doGetJSON(url, data, callback) {
    $.ajax({
      url: url,
      dataType: 'json',
      data: data,
      success: function(data) {
        callback && callback.call(self, data)
      }
    });
  }

  function doPost(url, data, callback) {
    $.ajax({
      type: "POST",
      url: url,
      dataType: 'json',
      data: data,
      success: function(data) {
        callback && callback.call(self, data)
      }
    });
  }

  var client = {}

  // categories
  client.categories = function(callback) {
    var url = serverUrl + 'categories'
    doGetJSON(url, {}, callback)
  }

  // messages
  client.messages = function(categoryId, callback) {
    var url = serverUrl + 'categories/' + categoryId + '/messages'
    doGetJSON(url, {}, callback)
  }

  client.randomMessage = function(categoryId, callback) {
    var url = serverUrl + 'categories/' + categoryId + '/message'
    doGetJSON(url, {}, callback)
  }

  client.bestMessages = function(categoryId, callback) {
    var url = serverUrl + 'categories/' + categoryId + '/best'
    doGetJSON(url, {}, callback)
  }

  client.worstMessages = function(categoryId, callback) {
    var url = serverUrl + 'categories/' + categoryId + '/worst'
    doGetJSON(url, {}, callback)
  }

  client.postMessage = function(categoryId, data, callback) {
    var url = serverUrl + 'categories/' + categoryId + '/message'
    doPost(url, data, callback)
  }

  client.voteMessage = function(messageId, data, callback) {
    var url = serverUrl + 'messages/' + messageId + '/vote'
    doPost(url, data, callback)
  }

  // comments
  client.commentsForMessage = function(messageId, data, callback) {
    var url = serverUrl + 'messages/' + messageId + '/comments'
    doGetJSON(url, data, callback)
  }

  client.postComment = function(messageId, data, callback) {
    var url = serverUrl + 'messages/' + messageId + '/comment'
    doPost(url, data, callback)
  }

  // announcements
  client.announcements = function(callback) {
    var url = serverUrl + 'announcements'
    doGetJSON(url, {}, callback)
  }

  return client;
}
