const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const eachOfSeries = require("async/eachOfSeries");
const moment = require("moment");

const baseUrl = "http://chedet.cc";
const axiosConfig = {
  timeout: 60000
};

/**
 * Get post content by css selector
 *
 * @param {*} element
 * @returns
 */
var postContentSelector = function name(el) {
  if (el("div.post-bodycopy > div > p").text() != "") {
    return el("div.post-bodycopy > div > p").text().trim();
  }
  if (el("div.post-bodycopy > div > span").text() != "") {
    return el("div.post-bodycopy > div > span").text().trim();
  }
  if (el("div.post-bodycopy").text() != "") {
    return el("div.post-bodycopy").text().trim();
  }
  return "";
};

/**
 * Get post listing by page number
 *
 * @param {number} [pageNumber=1]
 * @returns
 */
var getPostListingByPage = function name(pageNumber = 1) {
  return new Promise(function (resolve, reject) {
    axios
      .get(`${baseUrl}/?paged=${pageNumber}`, axiosConfig)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        var postList = [];
        $(".type-post").each((id, el) => {
          var post = {};
          post.title = $(el).find("h2 > a[title]").text();
          post.url = $(el).find("h2 > a[title]").attr("href");
          post.category = $(el).find("p.post-categories").text();

          postList.push(post);
        });
        resolve(postList);
      })
      .catch(function (error) {
        reject(error);
      })
      .finally(function () {});
  });
};

/**
 * Get post content
 *
 * @param {*} postList
 * @returns
 */
var getPostContentByUrl = function name(postList) {
  return new Promise(function (resolve, reject) {
    var promiseArray = [];

    postList.forEach((post, index) => {
      promiseArray.push(
        new Promise((resolve, reject) => {
          axios
            .get(post.url, axiosConfig)
            .then(function (response) {
              const $ = cheerio.load(response.data);
              post.id = post.url.split("p=")[1];
              post.content = postContentSelector($);
              post.date = $("div.post-footer").text().trim();
              resolve(post);
            })
            .catch(function (error) {
              reject(error);
            })
            .finally(function () {});
        })
      );
    });
    resolve(Promise.all(promiseArray));
  });
};

/**
 * Script execution starts here
 *
 */
(function () {
  console.time("Completed in");

  var fullContent = [];
  var totalPageNumber = Array.from({ length: 100 }, (x, i) => i + 1);

  eachOfSeries(
    totalPageNumber,
    function (value, key, callback) {
      getPostListingByPage(value)
        .then((resultPostListing) => {
          return getPostContentByUrl(resultPostListing);
        })
        .then((resultWithPostContent) => {
          fullContent.push(resultWithPostContent.map((x) => x));
          console.log(`Content for page ${value} added`);
          callback();
        })
        .catch((error) => {
          callback(error);
        });
    },
    (error) => {
      if (error) {
        console.log(error);
      }

      fs.writeFile(
        `${moment().format("DDMMYYYYHHmmss")}_chedex_raw.json`,
        JSON.stringify(fullContent),
        function (err) {
          if (err) return console.log(err);
          console.log(`Full chedet blog posts saved!`);
          console.timeEnd("Completed in");
        }
      );
    }
  );
})();
