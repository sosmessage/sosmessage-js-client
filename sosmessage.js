var sosmessage = {};

sosmessage.SosMessageClient = function(serverUrl) {
  if (!/\/$/.test(serverUrl)) {
    serverUrl += '/'
  }

  function doGet(url, settings) {
    doAjaxCall(url, "GET", settings)
  }

  function doPost(url, settings) {
    doAjaxCall(url, "POST", settings)
  }

  function doAjaxCall(url, type, settings) {
    var data = settings.data || {}

    $.ajax({
      type: type,
      url: url,
      dataType: 'json',
      data: settings.data,
      success: function(data) {
        if(data.meta.code === 200) {
          settings.success && settings.success.call(self, data.response)
        } else {
          settings.error && settings.error.call(self, data)
        }
      },
      error: function(data) {
        settings.error && settings.error.call(self, data)
      }
    });
  }

  var client = {}

  // categories
  client.categories = function(settings) {
    var url = serverUrl + 'categories'
    doGet(url, settings)
  }

  // messages
  client.messages = function(categoryId, settings) {
    var url = serverUrl + 'categories/' + categoryId + '/messages'
    doGet(url, settings)
  }

  client.randomMessage = function(categoryId, settings) {
    var url = serverUrl + 'categories/' + categoryId + '/message'
    doGet(url, settings)
  }

  client.bestMessages = function(categoryId, settings) {
    var url = serverUrl + 'categories/' + categoryId + '/best'
    doGet(url, settings)
  }

  client.worstMessages = function(categoryId, settings) {
    var url = serverUrl + 'categories/' + categoryId + '/worst'
    doGet(url, settings)
  }

  client.postMessage = function(categoryId, settings) {
    var url = serverUrl + 'categories/' + categoryId + '/message'
    doPost(url, settings)
  }

  client.voteMessage = function(messageId, settings) {
    var url = serverUrl + 'messages/' + messageId + '/vote'
    doPost(url, settings)
  }

  // comments
  client.commentsForMessage = function(messageId, settings) {
    var url = serverUrl + 'messages/' + messageId + '/comments'
    doGet(url, settings)
  }

  client.postComment = function(messageId, settings) {
    var url = serverUrl + 'messages/' + messageId + '/comment'
    doPost(url, settings)
  }

  // announcements
  client.announcements = function(settings) {
    var url = serverUrl + 'announcements'
    doGet(url, settings)
  }

  return client;
}
