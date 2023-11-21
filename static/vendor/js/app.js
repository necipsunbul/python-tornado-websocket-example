$(document).ready(function () {
  let ws = new WebSocket("ws://localhost:8888/chat");
  ws.onopen = function () {
    // ws.send("Hello, world");
  };
  ws.onmessage = function (res) {
    appendMessage(res.data, "me");
  };

  const button = $("button");
  const messageBox = $("input");
  const listContainer = $("ul");
  function scrollEnd() {
    $("#chatArea").scrollTop($("#chatArea")[0].scrollHeight);
  }

  function appendMessage(message, type = "to") {
    const time = moment(new Date()).format("HH:mm - DD.MM.YYYY");
    const messageItem = [
      '<li class="' + type + '">',
      '<div class="bubble">',
      message,
      "<div class='time'>" + time + "</div>",
      "</<div>",
      "<li>",
    ].join("");
    listContainer.append(messageItem);
  }
  scrollEnd();
  button.click(() => {
    const message = messageBox.val();
    if (!message) return false;
    ws.send(message);
    appendMessage(message);
    messageBox.val("");
    scrollEnd();
  });
});
