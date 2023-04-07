function SendResponse(res, success, data = {}, message = "") {
  return res.send({
    success,
    data,
    message,
  });
}
module.exports = SendResponse;
