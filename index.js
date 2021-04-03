let address = $("#address").val('wss://test.mosquitto.org:8081/mqtt')
let connectBtn = $("#connectBtn");
let status = $("#status");
connectBtn.click(function () {
  address = $("#address").val();
  var client = mqtt.connect(address);
  status.val("Connecting...");
  client.on('connect', function () {
    console.log('Connected')
    status.val("Connected!");
  })

  client.on('message', function (topic, message) {
    console.log(message.toString())
    let values = $("#incomingMessage");
    appendResult(topic,message,values);
  })

  // function to publish a topic
  let publishBtn = $("#publishBtn");
  publishBtn.click(function () {
    let topic = $("#publishTopic");
    let payload = $("#publishPayload");
    let values = $("#publishedMessage")
    appendResult(topic.val(), payload.val(), values);
    client.publish(topic.val(), payload.val());
  })

  // function to subscribe a topic
  let subscribeBtn = $("#subscribeBtn");
  subscribeBtn.click(function () {
    let topic = $("#subscribeTopic");
    let values = $("#subscribedMessage");
    appendResult(topic.val(), undefined, values);
    client.subscribe(topic.val());
  });

});

//function to append topic and payload
function appendResult(topic, payload = undefined, values) {
  let date = new Date();
  let result;
  if (payload == undefined) {
    result = "<tr><td>" + topic + "</td><td>" + date.toGMTString() + "</td></tr>"
  } else {
    result = "<tr><td>" + topic + "</td><td>" + payload + "</td><td>"+date.toGMTString() + "</td></tr>"
  }
  values.append(result);
}
