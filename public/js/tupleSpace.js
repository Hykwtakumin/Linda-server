$(function() {
  const watchTuple = $("#main").data("watch");
  const tupleSpaceName = $("#main").data("tsname");
  const ts = new LindaClient();
  const url = "https://" + location.hostname + "/" + tupleSpaceName;
  console.log(url);
  ts.connect(
    url,
    () => {
      ts.onDisconnected(() => {
        location.reload();
      });

      ts.watch(watchTuple, res => {
        $("<li>" + JSON.stringify(res._payload) + "</li>")
          .prependTo("#content")
          .hide()
          .fadeIn(500);
      });
    }
  );
  $("#write-button").on("click", () => {
    ts.write(watchTuple, res => {
      console.log(JSON.stringify(res));
    });
  });
});
