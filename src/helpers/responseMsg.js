const response = (res, msg, results, pageInfo, status = 200) => {
  let success = true;

  if (status >= 400) {
    success = false;
  }

  const data = {
    success,
    message: msg,
  };

  if (results) {
    data.results = results;
  }

  if (pageInfo) {
    data.pageInfo = pageInfo;
  }

  return res.status(status).json(data);
};

module.exports = response;
